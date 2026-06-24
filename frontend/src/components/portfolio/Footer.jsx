import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useEffect, useState } from "react";

export default function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative border-t border-white/5 bg-[#050505] pt-16">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#00FF88] text-[#050505]">
                <span className="font-display text-sm font-black">T</span>
              </span>
              <span className="font-display text-base font-bold text-white">
                thomas<span className="text-[#00FF88]">.m</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/55">
              Backend engineer building scalable APIs, distributed systems and production-grade
              software.
            </p>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Sections</div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/70">
              {["About", "Skills", "Projects", "Experience", "Achievements", "Contact"].map(
                (l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} className="hover:text-[#00FF88]" data-testid={`footer-link-${l.toLowerCase()}`}>
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Reach Out</div>
            <div className="mt-3 space-y-2 text-sm text-white/70">
              <a href={`mailto:${profile.email}`} className="block hover:text-[#00FF88]" data-testid="footer-email">
                {profile.email}
              </a>
              <div className="flex items-center gap-3">
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#00FF88]" data-testid="footer-github">
                  <Github className="h-4 w-4" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#00FF88]" data-testid="footer-linkedin">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={`mailto:${profile.email}`} className="text-white/60 hover:text-[#00FF88]" data-testid="footer-mail">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 py-6 sm:flex-row sm:items-center">
          <p className="font-mono-accent text-xs text-white/35">
            © {new Date().getFullYear()} Thomas M · Crafted with care.
          </p>
          <p className="font-mono-accent text-xs text-white/35">
            <span className="text-[#00FF88]">●</span> Built with React · Spring of inspiration from Linear, Stripe, Vercel.
          </p>
        </div>
      </div>

      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="back-to-top"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[70] flex h-11 w-11 items-center justify-center rounded-full bg-[#00FF88] text-[#050505] shadow-lg glow-green-strong transition hover:scale-105"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </footer>
  );
}
