"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";

export default function FinalCTA() {
  return (
    <section id="contact" className="py-24 md:py-32 scroll-mt-16">
      <div className="container-grid">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="label text-accent mb-5"
        >
          System status
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-medium tracking-tight max-w-2xl"
        >
          Ready for the next investigation.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-xl"
        >
          Open to entry-level cybersecurity opportunities in SOC, security
          operations, detection and security analysis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href={profile.email}
            className="inline-flex items-center gap-2 bg-accent text-base px-5 py-3 text-[13px] font-medium tracking-tight hover:bg-ink transition-colors duration-200"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {profile.emailDisplay}
          </a>
          <a
            href={profile.github}
            aria-disabled={profile.githubIsPlaceholder}
            className={`inline-flex items-center gap-2 border border-line px-5 py-3 text-[13px] font-medium tracking-tight text-ink hover:border-ink transition-colors duration-200 ${
              profile.githubIsPlaceholder ? "opacity-50" : ""
            }`}
          >
            <Github className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {profile.githubIsPlaceholder ? "GitHub (link pending)" : "View GitHub"}
          </a>
          <a
            href={profile.linkedin}
            aria-disabled={profile.linkedinIsPlaceholder}
            className={`inline-flex items-center gap-2 border border-line px-5 py-3 text-[13px] font-medium tracking-tight text-ink hover:border-ink transition-colors duration-200 ${
              profile.linkedinIsPlaceholder ? "opacity-50" : ""
            }`}
          >
            <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {profile.linkedinIsPlaceholder ? "LinkedIn (link pending)" : "Connect on LinkedIn"}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-line pt-8"
        >
          <div>
            <p className="text-ink">{profile.name}</p>
            <p className="mt-1 label text-muted">{profile.location}</p>
          </div>
          <p className="label text-muted">{profile.status}</p>
        </motion.div>
      </div>
    </section>
  );
}
