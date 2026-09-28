"use client";

import { motion } from "framer-motion";
import { systemTransition } from "@/lib/data";

const titleColor: Record<string, string> = {
  investigate: "group-hover:text-investigate",
  system: "group-hover:text-system",
  protect: "group-hover:text-protect",
};

const barColor: Record<string, string> = {
  investigate: "bg-investigate",
  system: "bg-system",
  protect: "bg-protect",
};

export default function SystemTransition() {
  return (
    <section className="border-b border-line bg-surface py-24 md:py-32 overflow-hidden">
      <div className="container-grid">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-6xl font-medium tracking-tight text-center max-w-3xl mx-auto"
        >
          Three systems.
          <br />
          Three problems.
          <br />
          One engineering approach.
        </motion.h2>

        {/* A single connecting line runs beneath all three states — one narrative, not three cards */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="absolute left-0 right-0 top-[13px] hidden md:block h-px bg-line" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-investigate via-system to-protect"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            {systemTransition.systems.map((system, i) => (
              <motion.div
                key={system.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center md:px-6 group"
              >
                <span className={`relative z-10 mx-auto block h-[7px] w-[7px] rounded-full ${barColor[system.accent]}`} />
                <span className="mt-6 block font-mono text-xs text-muted">{system.index}</span>
                <h3
                  className={`mt-3 text-2xl md:text-3xl font-medium tracking-tight text-ink transition-colors duration-300 ${titleColor[system.accent]}`}
                >
                  {system.title}
                </h3>
                <p className="mt-2 label text-muted">{system.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
