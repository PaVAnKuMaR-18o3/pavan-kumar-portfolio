"use client";

import { motion } from "framer-motion";

const colorClass: Record<string, string> = {
  signal: "text-accent",
  investigate: "text-investigate",
  system: "text-system",
  protect: "text-protect",
};

/**
 * A minimal narrative hand-off between two phases of the signal → system
 * story (e.g. "Detect ↓ Build"). Deliberately tiny — a beat between
 * sections, not a new section of its own.
 */
export default function NarrativeConnector({
  from,
  to,
}: {
  from: { label: string; accent: keyof typeof colorClass };
  to: { label: string; accent: keyof typeof colorClass };
}) {
  return (
    <div className="border-b border-line bg-surface py-10 md:py-14" aria-hidden="true">
      <div className="container-grid flex flex-col items-center gap-2">
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`label ${colorClass[from.accent]}`}
        >
          {from.label}
        </motion.span>
        <motion.span
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="h-5 w-px bg-line"
          style={{ transformOrigin: "top" }}
        />
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`label ${colorClass[to.accent]}`}
        >
          {to.label}
        </motion.span>
      </div>
    </div>
  );
}
