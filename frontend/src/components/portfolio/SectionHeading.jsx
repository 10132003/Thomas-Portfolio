import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, accent, align = "left" }) {
  const ease = [0.22, 1, 0.36, 1];
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        className={`inline-flex items-center gap-2 rounded-full border border-[#00FF88]/25 bg-[#00FF88]/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#00FF88]`}
      >
        <span className="h-1 w-1 rounded-full bg-[#00FF88]" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease, delay: 0.05 }}
        className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
      >
        {title}
        {accent && <span className="gradient-text-green"> {accent}</span>}
      </motion.h2>
    </div>
  );
}
