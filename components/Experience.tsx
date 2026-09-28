"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-line py-20 md:py-28 scroll-mt-16">
      <div className="container-grid">
        <p className="label text-muted mb-10">Experience</p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-line pt-10"
        >
          <div className="lg:col-span-5">
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink">
              {experience.company}
            </h3>
            <p className="mt-2 text-muted">{experience.role}</p>
            <p className="mt-5 label text-muted">{experience.location}</p>
            <p className="mt-1 label text-muted">{experience.period}</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line">
            {experience.metrics.map((metric) => (
              <div key={metric.label} className="bg-base p-6">
                <div className="font-mono text-xl text-ink">{metric.value}</div>
                <div className="mt-2 label text-muted leading-relaxed">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
