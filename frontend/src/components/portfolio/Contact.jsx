import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { profile } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Contact() {
const socials = [
{ icon: Github, label: "GitHub", href: profile.github },
{ icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
{ icon: Mail, label: "Email", href: `mailto:${profile.email}` },
];

return ( <section
   id="contact"
   data-testid="contact-section"
   className="relative section-pad"
 > <div className="mx-auto w-full max-w-6xl px-6"> <SectionHeading
       eyebrow="Contact"
       title="Let's Connect"
       accent="Together"
     />

```
    <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl glass p-6 sm:p-8"
      >
        <h3 className="font-display text-2xl font-bold text-white">
          Have an opportunity or project?
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-white/65">
          I'm always open to discussing backend engineering roles,
          software development opportunities, collaborations,
          and interesting technical projects.
        </p>

        <div className="mt-8 space-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-[#00FF88]/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FF88]/10 text-[#00FF88]">
              <Mail className="h-4 w-4" />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Email
              </div>
              <div className="text-sm text-white group-hover:text-[#00FF88]">
                {profile.email}
              </div>
            </div>
          </a>

          <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FF88]/10 text-[#00FF88]">
              <MapPin className="h-4 w-4" />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Location
              </div>
              <div className="text-sm text-white">
                {profile.location}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            Social Links
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75 transition hover:border-[#00FF88]/40 hover:text-[#00FF88]"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}

            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75 transition hover:border-[#00FF88]/40 hover:text-[#00FF88]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              LeetCode
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.08,
        }}
        className="gradient-border flex flex-col items-center justify-center rounded-2xl p-8 text-center"
      >
        <Mail className="h-16 w-16 text-[#00FF88]" />

        <h3 className="mt-6 font-display text-3xl font-bold text-white">
          Get In Touch
        </h3>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
          The fastest way to reach me is via email.
          Click the button below and your email application
          will open automatically.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-6 py-3 text-sm font-semibold text-[#050505] transition hover:scale-[1.02] hover:bg-[#00CC66] glow-green"
        >
          <Mail className="h-4 w-4" />
          Email Me
        </a>

        <p className="mt-4 text-xs text-white/40">
          I usually respond within 24 hours.
        </p>
      </motion.div>
    </div>
  </div>
</section>


);
}
