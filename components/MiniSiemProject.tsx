"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { miniSiemProject } from "@/lib/data";
import EvidenceFrame from "./EvidenceFrame";

export default function MiniSiemProject() {
  const [openRule, setOpenRule] = useState<string | null>(null);

  return (
    <div className="border-b border-line py-16 md:py-20">
      <div className="container-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <EvidenceFrame
              number="05"
              title="Mini-SIEM dashboard"
              source="Product interface"
              aspect="aspect-[16/11]"
              accent="system"
            />

            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3 border border-line p-3 md:p-4">
              {miniSiemProject.pipeline.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 border border-line px-4 py-2.5">
                    <span className="font-mono text-[11px] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-ink whitespace-nowrap">{step}</span>
                  </div>
                  {i < miniSiemProject.pipeline.length - 1 && (
                    <span className="text-muted text-xs" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <p className="label text-system mb-5">
              {miniSiemProject.index} / {miniSiemProject.category}
            </p>
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight">
              {miniSiemProject.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <p className="mt-6 text-muted leading-relaxed max-w-sm">{miniSiemProject.description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {miniSiemProject.technologies.map((tech) => (
                <span key={tech} className="label text-muted border border-line px-3 py-1.5">
                  {tech}
                </span>
              ))}
            </div>

            <p className="label text-muted mt-8 mb-2">Detection rules — select to view logic</p>
            <div className="border border-line divide-y divide-line">
              {miniSiemProject.rules.map((rule) => {
                const isOpen = openRule === rule.name;
                return (
                  <div key={rule.name}>
                    <button
                      type="button"
                      onClick={() => setOpenRule(isOpen ? null : rule.name)}
                      aria-expanded={isOpen}
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors duration-200 ${
                        isOpen ? "bg-surface" : "hover:bg-surface/60"
                      }`}
                    >
                      <span className={`text-sm transition-colors duration-200 ${isOpen ? "text-system" : "text-ink"}`}>
                        {rule.name}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted text-right">{rule.threshold}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 text-muted shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden bg-surface"
                        >
                          <div className="px-4 pb-4 flex flex-wrap items-center gap-2">
                            {rule.logic.map((step, si) => (
                              <div key={step} className="flex items-center gap-2">
                                <span className="text-xs text-ink border border-line px-2.5 py-1.5 whitespace-nowrap">
                                  {step}
                                </span>
                                {si < rule.logic.length - 1 && (
                                  <span className="text-muted text-xs" aria-hidden="true">
                                    →
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
