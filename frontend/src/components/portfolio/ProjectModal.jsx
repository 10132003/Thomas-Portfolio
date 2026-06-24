import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ChevronRight, CheckCircle2, Layers } from "lucide-react";
import { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    if (project) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-stretch justify-end bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          data-testid="project-modal-backdrop"
        >
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative ml-auto h-full w-full max-w-3xl overflow-y-auto bg-[#070707] shadow-2xl"
            data-testid={`project-modal-${project.id}`}
          >
            {/* Banner */}
            <div
              className="relative h-56 w-full overflow-hidden"
              style={{
                background: `
                  radial-gradient(70% 90% at 80% 10%, ${project.accent}33 0%, transparent 60%),
                  radial-gradient(60% 80% at 20% 110%, ${project.accent}22 0%, transparent 60%),
                  linear-gradient(135deg, #0b0b0b 0%, #0a0a0a 100%)
                `,
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.45]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(ellipse at 70% 40%, rgba(0,0,0,1), transparent 75%)",
                }}
              />
              <button
                onClick={onClose}
                data-testid="project-modal-close"
                className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/40 p-2 text-white/80 backdrop-blur transition hover:border-[#00FF88]/40 hover:text-[#00FF88]"
                aria-label="Close project"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      color: project.accent,
                      borderColor: `${project.accent}55`,
                      background: `${project.accent}11`,
                    }}
                  >
                    {project.badge}
                  </span>
                  <span className="font-mono-accent text-[10px] text-white/40">case-study/{project.id}</span>
                </div>
                <h3
                  className="mt-2 font-display text-4xl font-extrabold"
                  style={{ color: project.accent }}
                >
                  {project.name}
                </h3>
                <p className="mt-1 max-w-xl text-sm text-white/70">{project.short}</p>
              </div>
            </div>

            <div className="px-6 py-8 sm:px-10">
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                Overview
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-white/75">
                {project.description}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                    Key Features
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#00FF88]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                    Architecture
                  </h4>
                  <div className="mt-3 rounded-2xl border border-white/5 bg-[#0a0a0a] p-4">
                    <ol className="space-y-2">
                      {project.architecture.map((node, i) => (
                        <li key={node} className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#00FF88]/10 font-mono-accent text-[11px] text-[#00FF88]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-white/80">{node}</span>
                          {i < project.architecture.length - 1 && (
                            <ChevronRight className="ml-auto h-3.5 w-3.5 text-white/30" />
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                  Highlights
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/[0.06] px-3 py-1 text-xs text-[#00FF88]"
                    >
                      <Layers className="h-3 w-3" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                  Tech Stack
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`project-modal-github-${project.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-4 py-2.5 text-sm font-semibold text-[#050505] transition hover:bg-[#00CC66] glow-green"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
