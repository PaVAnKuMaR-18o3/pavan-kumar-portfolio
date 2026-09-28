"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="container-grid">
        <p className="label text-muted mb-10">Certifications</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="border border-line p-6"
            >
              <h3 className="text-base text-ink leading-snug">{cert.name}</h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted">{cert.issuer}</span>
                <span className="font-mono text-xs text-accent">{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
