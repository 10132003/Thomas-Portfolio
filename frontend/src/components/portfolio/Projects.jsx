import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";

const ProjectThumb = ({ project }) => {
  // Generated abstract banner with the project name + tech glyphs
  return (
    <div
      className="relative h-44 w-full overflow-hidden rounded-xl"
      style={{
        background: `
          radial-gradient(60% 80% at 80% 10%, ${project.accent}22 0%, transparent 60%),
          radial-gradient(50% 70% at 20% 100%, ${project.accent}1a 0%, transparent 60%),
          linear-gradient(135deg, #0b0b0b 0%, #0a0a0a 100%)
        `,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at 70% 30%, rgba(0,0,0,1), transparent 70%)",
        }}
      />
      <div className="absolute right-3 top-3 rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono-accent text-[10px] text-white/60 backdrop-blur">
        {project.id}.module
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <div className="font-mono-accent text-[10px] uppercase tracking-[0.2em] text-white/40">
          {project.tech.slice(0, 3).join(" · ")}
        </div>
        <div
          className="font-display text-3xl font-extrabold leading-none"
          style={{ color: project.accent }}
        >
          {project.name}
        </div>
      </div>
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl" style={{ background: `${project.accent}33` }} />
    </div>
  );
};

export default function Projects() {
  const [active, setActive] = useState(null);
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section id="projects" data-testid="projects-section" className="relative section-pad">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Projects" title="Featured" accent="Work" />
          <div className="hidden font-mono-accent text-xs text-white/40 sm:block">
            // production-grade · backend-heavy
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <motion.button
              type="button"
              key={p.id}
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              data-testid={`project-card-${p.id}`}
              data-cursor="pointer"
              className="group relative overflow-hidden rounded-2xl gradient-border p-5 text-left transition"
            >
              <ProjectThumb project={p} />

              <div className="mt-5 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    color: p.accent,
                    borderColor: `${p.accent}55`,
                    background: `${p.accent}11`,
                  }}
                  data-testid={`project-badge-${p.id}`}
                >
                  {p.badge === "FLAGSHIP" && <Sparkles className="h-3 w-3" />}
                  {p.badge}
                </span>
                <span className="font-mono-accent text-[11px] text-white/40">
                  · {p.tech.length} techs
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.short}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/65"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-xs text-white/45">Click to view case study</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#00FF88]/10 text-[#00FF88] transition group-hover:bg-[#00FF88] group-hover:text-[#050505]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition group-hover:ring-[#00FF88]/30" />
            </motion.button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://github.com/10132003"
            target="_blank"
            rel="noreferrer"
            data-testid="projects-github-cta"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/80 transition hover:border-[#00FF88]/40 hover:text-[#00FF88]"
          >
            <Github className="h-4 w-4" />
            See more on GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
