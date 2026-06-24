import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import { aboutEducation } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function About() {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section id="about" data-testid="about-section" className="relative section-pad">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading eyebrow="About" title="Engineer." accent="Builder. Problem Solver." />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="space-y-6 text-[15px] leading-relaxed text-white/70 sm:text-base"
          >
            <p>
              I'm a <span className="text-white">Computer Science Engineer</span> passionate about{" "}
              <span className="text-[#00FF88]">backend development</span>, distributed systems,
              system design, and scalable software architecture.
            </p>
            <p>
              I enjoy shipping production-grade applications that involve authentication, databases,
              caching, REST APIs and real-world trading systems — turning complex requirements into
              clean, fast, well-tested code.
            </p>
            <p>
              Currently pursuing <span className="text-white">M.Tech in Operations Research</span> at
              NIT Durgapur while continuously sharpening backend engineering and problem-solving
              skills through deep, focused work.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Backend Heavy", "Distributed Systems", "System Design", "Performance"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70"
                  data-testid={`about-tag-${t.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/55">
              <MapPin className="h-4 w-4 text-[#00FF88]" />
              Durgapur, West Bengal · India
              <span className="mx-2 h-1 w-1 rounded-full bg-white/30" />
              <Briefcase className="h-4 w-4 text-[#00FF88]" />
              Open to Backend roles
            </div>
          </motion.div>

          <div className="space-y-4">
            {aboutEducation.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl glass p-6"
                data-testid={`edu-card-${i}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FF88]/10 text-[#00FF88]">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-display text-base font-bold text-white">
                        {edu.degree}
                      </div>
                      <div className="text-sm text-white/55">{edu.school}</div>
                    </div>
                  </div>
                  <span className="font-mono-accent text-xs text-white/40">{edu.period}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-xs text-white/55">{edu.location}</span>
                  <span className="rounded-md bg-[#00FF88]/10 px-2 py-0.5 text-xs font-semibold text-[#00FF88]">
                    {edu.detail}
                  </span>
                </div>
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#00FF88]/[0.06] blur-2xl transition group-hover:bg-[#00FF88]/15" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
