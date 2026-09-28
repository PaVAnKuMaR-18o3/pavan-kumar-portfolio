"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ArchitectureFlow({
  label,
  steps,
}: {
  label?: string;
  steps: string[];
}) {
  return (
    <div>
      {label && <p className="label text-muted mb-6">{label}</p>}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-3 border border-line p-3 md:p-4">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2 border border-line px-4 py-2.5">
              <span className="font-mono text-[11px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-ink whitespace-nowrap">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-muted shrink-0" strokeWidth={1.5} aria-hidden="true" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
