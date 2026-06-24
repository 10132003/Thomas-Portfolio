import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin, Code2 } from "lucide-react";
import { profile } from "@/data/portfolio";

const TypingRoles = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = profile.roles[idx];
    const speed = deleting ? 45 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % profile.roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span className="font-mono-accent text-[#00FF88]" data-testid="hero-role">
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-[#00FF88] align-middle animate-pulse" />
    </span>
  );
};

const CodeWindow = () => (
  <motion.div
    initial={{ opacity: 0, y: 24, rotateX: 12 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="gradient-border relative overflow-hidden rounded-2xl"
    data-testid="hero-code-window"
    style={{ perspective: 1200 }}
  >
    <div className="flex items-center gap-1.5 border-b border-white/5 bg-[#0a0a0a] px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80" />
      <span className="ml-3 font-mono-accent text-[11px] text-white/40">~/portfolio/Engineer.java</span>
    </div>
    <pre className="font-mono-accent text-[12.5px] leading-6 px-5 py-5 text-white/85">
{`public class Engineer {
  String name   = "Thomas M";
  String focus  = "Backend · Distributed Systems";
  String[] stack = { "Java", "Spring Boot",
                     "Redis", "JWT", "MySQL" };

  void build() {
    while (passionate) {
      designAPIs();
      optimizeLatency();
      shipFeatures();
    }
  }
}`}
    </pre>
    <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-[#00FF88]/25 blur-3xl" />
  </motion.div>
);

const Stat = ({ value, label }) => (
  <div className="min-w-[120px]">
    <div className="font-display text-2xl font-bold text-white">{value}</div>
    <div className="mt-0.5 text-xs uppercase tracking-widest text-white/40">{label}</div>
  </div>
);

export default function Hero() {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-32 noise"
    >
      <div className="absolute inset-0 -z-10 gradient-mesh" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -top-32 left-1/3 -z-10 h-[460px] w-[460px] rounded-full bg-[#00FF88]/[0.08] blur-[120px]" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/[0.06] px-3 py-1.5 text-xs"
            data-testid="hero-pill"
          >
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF88]">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#00FF88]/70" />
            </span>
            <span className="text-white/80">Available for Backend Engineer roles</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
            data-testid="hero-name"
          >
            THOMAS <span className="gradient-text-green">M</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
            className="mt-4 flex items-center gap-3 font-display text-xl text-white/85 sm:text-2xl"
          >
            <Code2 className="h-5 w-5 text-[#00FF88]" />
            <span>I build as a&nbsp;</span>
            <TypingRoles />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.28 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-[17px]"
            data-testid="hero-tagline"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.38 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-cta-projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-semibold text-[#050505] transition hover:scale-[1.02] hover:bg-[#00CC66] glow-green"
            >
              Explore Projects
              <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </button>
            <a
              href={profile.resume}
              download
              data-testid="hero-cta-resume"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00FF88]/50 hover:text-[#00FF88]"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-cta-contact"
              className="inline-flex items-center gap-2 rounded-xl border border-transparent px-5 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex items-center gap-5"
          >
            <a href={profile.github} target="_blank" rel="noreferrer" data-testid="hero-github" className="text-white/55 hover:text-[#00FF88] transition">
              <Github className="h-5 w-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-testid="hero-linkedin" className="text-white/55 hover:text-[#00FF88] transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${profile.email}`} data-testid="hero-email" className="text-white/55 hover:text-[#00FF88] transition">
              <Mail className="h-5 w-5" />
            </a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer" data-testid="hero-leetcode" className="text-xs font-mono-accent text-white/55 hover:text-[#00FF88] transition">
              LeetCode →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-8 border-t border-white/5 pt-6"
          >
            <Stat value="440+" label="LeetCode" />
            <Stat value="8.53" label="CGPA" />
            <Stat value="2×" label="GATE Qualified" />
            <Stat value="3+" label="Years Coding" />
          </motion.div>
        </div>

        <div className="relative">
          <div className="animate-floaty">
            <CodeWindow />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="glass absolute -bottom-6 -left-6 hidden rounded-xl px-4 py-3 sm:block"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Now</div>
            <div className="mt-1 font-mono-accent text-xs text-white">
              <span className="text-[#00FF88]">●</span> M.Tech @ NIT Durgapur
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="glass absolute -right-4 -top-4 hidden rounded-xl px-4 py-3 sm:block"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Stack</div>
            <div className="mt-1 font-mono-accent text-xs text-[#00FF88]">Java · Spring · Redis</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
