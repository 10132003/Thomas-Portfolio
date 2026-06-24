import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { profile } from "@/data/portfolio";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-testid="navbar"
      className="fixed left-0 right-0 top-4 z-[80] flex justify-center px-4"
    >
      <div
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        <button
          onClick={() => go("home")}
          data-testid="nav-logo"
          className="group flex items-center gap-2"
        >
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#00FF88] text-[#050505]">
            <span className="font-display text-sm font-black">T</span>
            <span className="absolute inset-0 rounded-lg pulse-ring" />
          </span>
          <span className="font-display text-sm font-bold tracking-wide text-white">
            thomas<span className="text-[#00FF88]">.m</span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                data-testid={`nav-link-${l.id}`}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition ${
                  active === l.id ? "text-[#00FF88]" : "text-white/70 hover:text-white"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-lg bg-[#00FF88]/10 ring-1 ring-inset ring-[#00FF88]/30"
                  />
                )}
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download
            data-testid="nav-resume-btn"
            className="hidden items-center gap-1.5 rounded-lg border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1.5 text-xs font-semibold text-[#00FF88] transition hover:bg-[#00FF88] hover:text-[#050505] md:inline-flex"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-1.5 text-white/80 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            data-testid="mobile-menu"
            className="absolute left-4 right-4 top-[64px] rounded-2xl glass-strong p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    data-testid={`mobile-nav-link-${l.id}`}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                      active === l.id ? "text-[#00FF88] bg-[#00FF88]/10" : "text-white/80"
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="mt-1">
                <a
                  href={profile.resume}
                  download
                  data-testid="mobile-resume-btn"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#00FF88] px-3 py-2 text-sm font-semibold text-[#050505]"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
