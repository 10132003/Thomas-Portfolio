import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  const ease = [0.22, 1, 0.36, 1];
  const loop = [...certifications, ...certifications];

  return (
    <section id="certifications" data-testid="certifications-section" className="relative section-pad">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading eyebrow="Certifications" title="Continuously" accent="Learning" />
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent" />

        <motion.div
          className="flex w-max gap-4 animate-marquee"
          aria-hidden={false}
          data-testid="certs-marquee"
        >
          {loop.map((c, i) => (
            <div
              key={`${c.title}-${i}`}
              className="flex w-[280px] items-start gap-3 rounded-2xl glass px-5 py-4"
              data-testid={`cert-card-${i}`}
            >
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#00FF88]/10 text-[#00FF88]">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white leading-tight">
                  {c.title}
                </div>
                <div className="mt-1 font-mono-accent text-[11px] text-white/50">{c.issuer}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
