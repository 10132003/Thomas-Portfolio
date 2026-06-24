from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend (optional — only sends if RESEND_API_KEY is configured)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'thomasmicheal9601@gmail.com')

resend_client = None
if RESEND_API_KEY:
    try:
        import resend as _resend
        _resend.api_key = RESEND_API_KEY
        resend_client = _resend
    except Exception:
        resend_client = None

app = FastAPI(title="Thomas M Portfolio API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    email_sent: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Thomas M Portfolio API", "status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    obj = StatusCheck(**payload.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for d in docs:
        if isinstance(d.get('timestamp'), str):
            d['timestamp'] = datetime.fromisoformat(d['timestamp'])
    return docs


def _build_contact_email_html(name: str, email: str, message: str) -> str:
    safe_msg = message.replace('<', '&lt;').replace('>', '&gt;').replace('\n', '<br>')
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:32px;font-family:Arial,sans-serif;color:#ffffff;">
      <tr><td>
        <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#101010;border:1px solid #1a1a1a;border-radius:16px;overflow:hidden;">
          <tr><td style="padding:24px 28px;border-bottom:1px solid #1f1f1f;">
            <div style="color:#00FF88;font-size:12px;letter-spacing:2px;">NEW CONTACT MESSAGE</div>
            <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:6px;">Portfolio — Thomas M</div>
          </td></tr>
          <tr><td style="padding:24px 28px;">
            <div style="color:#a0a0a0;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">From</div>
            <div style="color:#ffffff;font-size:16px;margin-top:4px;">{name} &lt;{email}&gt;</div>
            <div style="height:18px;"></div>
            <div style="color:#a0a0a0;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Message</div>
            <div style="color:#e7e7e7;font-size:15px;line-height:1.6;margin-top:6px;">{safe_msg}</div>
          </td></tr>
          <tr><td style="padding:18px 28px;border-top:1px solid #1f1f1f;color:#666;font-size:12px;">
            Sent from thomasm portfolio · {datetime.now(timezone.utc).strftime('%b %d, %Y %H:%M UTC')}
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


@api_router.post("/contact")
async def submit_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())

    email_sent = False
    if resend_client is not None:
        try:
            params = {
                "from": SENDER_EMAIL,
                "to": [RECIPIENT_EMAIL],
                "reply_to": payload.email,
                "subject": f"Portfolio contact from {payload.name}",
                "html": _build_contact_email_html(payload.name, payload.email, payload.message),
            }
            await asyncio.to_thread(resend_client.Emails.send, params)
            email_sent = True
        except Exception as e:
            logger.error(f"Resend send failed: {e}")
            email_sent = False

    msg.email_sent = email_sent
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)

    return {"ok": True, "id": msg.id, "email_sent": email_sent}


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
