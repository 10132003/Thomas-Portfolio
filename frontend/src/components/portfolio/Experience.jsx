import { motion } from "framer-motion";
import { Building2, Calendar, Globe } from "lucide-react";
import { experience } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const ease = [0.22, 1, 0.36, 1];
  return (
    <section id="experience" data-testid="experience-section" className="relative section-pad">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading eyebrow="Experience" title="Where I've" accent="Built" />

        <div className="relative mt-14">
          <div className="absolute left-3.5 top-2 bottom-2 hidden w-px bg-gradient-to-b from-[#00FF88]/40 via-white/5 to-transparent sm:block" />

          <div className="space-y-6">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="relative pl-0 sm:pl-12"
                data-testid={`experience-${i}`}
              >
                <span className="absolute left-2 top-6 hidden h-3 w-3 rounded-full bg-[#00FF88] sm:block">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#00FF88]/60" />
                </span>

                <div className="rounded-2xl glass p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-white">
                        <Building2 className="h-4 w-4 text-[#00FF88]" />
                        <span className="font-display text-lg font-bold">{job.company}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-white/65">
                        <span className="font-medium text-[#00FF88]">{job.role}</span>
                        <span className="inline-flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5" /> {job.mode}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono-accent text-xs text-white/55">
                      <Calendar className="h-3.5 w-3.5" /> {job.period}
                    </span>
                  </div>

                  <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {job.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm leading-relaxed text-white/70"
                      >
                        <span className="mt-2 h-1 w-3 flex-none rounded-full bg-[#00FF88]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
