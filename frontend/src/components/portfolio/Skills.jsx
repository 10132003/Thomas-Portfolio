import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import {
  Code,
  Server,
  Database,
  Wrench,
  Cpu,
} from "lucide-react";

const iconFor = {
  Languages: Code,
  Backend: Server,
  Databases: Database,
  Tools: Wrench,
  "Core CS": Cpu,
};

export default function Skills() {
  const entries = Object.entries(skills);
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section id="skills" data-testid="skills-section" className="relative section-pad">
      <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading eyebrow="Tech Stack" title="Tools I" accent="Ship With" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(([group, items], i) => {
            const Icon = iconFor[group] || Code;
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition"
                data-testid={`skill-group-${group.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FF88]/10 text-[#00FF88]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-white">{group}</h3>
                  </div>
                  <span className="font-mono-accent text-[10px] text-white/30">
                    0{i + 1}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/75 transition hover:border-[#00FF88]/40 hover:bg-[#00FF88]/10 hover:text-[#00FF88]"
                      data-testid={`skill-item-${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-[#00FF88]/[0.05] blur-3xl transition group-hover:bg-[#00FF88]/15" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
