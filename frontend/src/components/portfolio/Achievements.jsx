import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Brain, Rocket, Network, Code2 } from "lucide-react";
import { achievements } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const icons = [Code2, Brain, Trophy, Rocket];

function Counter({ value, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(value * eased);
      if (t < 1) requestAnimationFrame(animate);
      else setN(value);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold text-white sm:text-5xl">
      {decimals > 0 ? n.toFixed(decimals) : Math.round(n)}
      <span className="text-[#00FF88]">{suffix}</span>
    </span>
  );
}

const extras = [
  { icon: Network, title: "Strong System Design", subtitle: "Foundation built through real projects" },
  { icon: Brain, title: "AI/ML Internship", subtitle: "Real-time CV pipelines @ Hexaind" },
];

export default function Achievements() {
  const ease = [0.22, 1, 0.36, 1];
  return (
    <section id="achievements" data-testid="achievements-section" className="relative section-pad">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading eyebrow="Achievements" title="Numbers That" accent="Matter" />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {achievements.map((a, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl glass p-6"
                data-testid={`achievement-${i}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FF88]/10 text-[#00FF88]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono-accent text-[10px] text-white/30">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-5">
                  <Counter value={a.value} decimals={a.decimals || 0} suffix={a.suffix} />
                </div>
                <div className="mt-1 text-sm text-white/55">{a.label}</div>
                <div className="pointer-events-none absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-[#00FF88]/[0.05] blur-2xl transition group-hover:bg-[#00FF88]/15" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {extras.map(({ icon: Icon, title, subtitle }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-2xl glass p-5"
              data-testid={`achievement-extra-${i}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FF88]/10 text-[#00FF88]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-base font-bold text-white">{title}</div>
                <div className="text-sm text-white/55">{subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
