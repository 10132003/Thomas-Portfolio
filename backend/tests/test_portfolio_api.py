"""Backend API tests for Thomas M portfolio."""
import os
import uuid
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://devfolio-thomas.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- root ----
def test_api_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    d = r.json()
    assert d.get("status") == "ok"
    assert "message" in d


# ---- status (regression) ----
def test_status_post_and_get(client):
    name = f"TEST_{uuid.uuid4().hex[:8]}"
    r = client.post(f"{API}/status", json={"client_name": name})
    assert r.status_code == 200
    body = r.json()
    assert body["client_name"] == name
    assert "id" in body and "timestamp" in body

    r2 = client.get(f"{API}/status")
    assert r2.status_code == 200
    arr = r2.json()
    assert isinstance(arr, list)
    assert any(item.get("client_name") == name for item in arr)


# ---- contact ----
def test_contact_create_success_email_not_sent(client):
    name = f"TEST_{uuid.uuid4().hex[:6]}"
    payload = {
        "name": name,
        "email": f"{name.lower()}@example.com",
        "message": "Hello Thomas - automated test message."
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body.get("ok") is True
    assert "id" in body and isinstance(body["id"], str)
    assert body.get("email_sent") is False  # No RESEND_API_KEY configured

    # Verify persistence via GET
    r2 = client.get(f"{API}/contact")
    assert r2.status_code == 200
    items = r2.json()
    assert isinstance(items, list)
    match = [i for i in items if i.get("id") == body["id"]]
    assert len(match) == 1
    m = match[0]
    assert m["name"] == payload["name"]
    assert m["email"] == payload["email"]
    assert m["message"] == payload["message"]
    assert m["email_sent"] is False


def test_contact_invalid_email_rejected(client):
    r = client.post(f"{API}/contact", json={
        "name": "Bad", "email": "not-an-email", "message": "hi"
    })
    assert r.status_code == 422


def test_contact_empty_message_rejected(client):
    r = client.post(f"{API}/contact", json={
        "name": "Bob", "email": "bob@example.com", "message": ""
    })
    assert r.status_code == 422


# ---- resume asset ----
def test_resume_pdf_served(client):
    r = client.get(f"{BASE_URL}/thomas-m-resume.pdf", allow_redirects=True)
    assert r.status_code == 200
    assert len(r.content) > 100
