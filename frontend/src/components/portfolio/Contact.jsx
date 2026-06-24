import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    setStatus("sending");
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      setStatus("sent");
      toast.success(
        data.email_sent
          ? "Message sent — I'll get back to you soon."
          : "Message received — saved to inbox."
      );
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3200);
    } catch (err) {
      setStatus("error");
      toast.error("Could not send. Please try again.");
      setTimeout(() => setStatus("idle"), 3200);
    }
  };

  const socials = [
    { icon: Github, label: "GitHub", href: profile.github, testid: "social-github" },
    { icon: Linkedin, label: "LinkedIn", href: profile.linkedin, testid: "social-linkedin" },
    { icon: Mail, label: "Email", href: `mailto:${profile.email}`, testid: "social-email" },
  ];

  return (
    <section id="contact" data-testid="contact-section" className="relative section-pad">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading eyebrow="Contact" title="Let's Build" accent="Something" />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl glass p-6 sm:p-8"
          >
            <h3 className="font-display text-2xl font-bold text-white">
              Have an idea or role in mind?
            </h3>
            <p className="mt-2 text-sm text-white/65">
              Open to backend engineer roles, distributed systems projects, and collaborations.
              I read every message.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${profile.email}`}
                data-testid="contact-email-link"
                className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-[#00FF88]/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FF88]/10 text-[#00FF88]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Email</div>
                  <div className="text-sm text-white group-hover:text-[#00FF88]">{profile.email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FF88]/10 text-[#00FF88]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Based In</div>
                  <div className="text-sm text-white">{profile.location}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] uppercase tracking-widest text-white/40">Social</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map(({ icon: Icon, label, href, testid }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={testid}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75 transition hover:border-[#00FF88]/40 hover:text-[#00FF88]"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </a>
                ))}
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="social-leetcode"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono-accent text-xs text-white/75 transition hover:border-[#00FF88]/40 hover:text-[#00FF88]"
                >
                  LeetCode
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            data-testid="contact-form"
            className="gradient-border rounded-2xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] uppercase tracking-widest text-white/45">Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-testid="contact-input-name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#00FF88]/60 focus:ring-2 focus:ring-[#00FF88]/20"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-widest text-white/45">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  data-testid="contact-input-email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#00FF88]/60 focus:ring-2 focus:ring-[#00FF88]/20"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-[11px] uppercase tracking-widest text-white/45">Message</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                data-testid="contact-input-message"
                rows={6}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#00FF88]/60 focus:ring-2 focus:ring-[#00FF88]/20"
                placeholder="Tell me about the role or project…"
                required
              />
            </label>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="font-mono-accent text-[11px] text-white/40">
                // I reply within 24 hours
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                data-testid="contact-submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-semibold text-[#050505] transition hover:scale-[1.02] hover:bg-[#00CC66] glow-green disabled:opacity-60"
              >
                {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === "sent" && <CheckCircle2 className="h-4 w-4" />}
                {status === "error" && <AlertCircle className="h-4 w-4" />}
                {status === "idle" && <Send className="h-4 w-4" />}
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                  ? "Sent"
                  : status === "error"
                  ? "Try again"
                  : "Send Message"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
