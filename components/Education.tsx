"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="border-b border-line py-20 md:py-28 scroll-mt-16">
      <div className="container-grid">
        <p className="label text-muted mb-10">Education</p>

        <div className="divide-y divide-line border-t border-b border-line">
          {education.map((entry, i) => (
            <motion.div
              key={entry.institution}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6"
            >
              <div className="md:col-span-6">
                <h3 className="text-xl md:text-2xl text-ink">{entry.institution}</h3>
                <p className="mt-1 text-muted">{entry.program}</p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="label text-muted">{entry.period}</p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="label text-muted">{entry.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
