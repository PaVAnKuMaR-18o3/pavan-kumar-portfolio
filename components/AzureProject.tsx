"use client";

import { motion } from "framer-motion";
import { azureProject } from "@/lib/data";
import EvidenceFrame from "./EvidenceFrame";

export default function AzureProject() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <div className="container-grid">
        {/* Case file header — a data register, not a bordered card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="label text-investigate mb-5">
            Case {azureProject.index} / {azureProject.category}
          </p>
          <h3 className="text-4xl md:text-7xl font-medium tracking-tight max-w-3xl">
            {azureProject.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="mt-6 text-muted leading-relaxed max-w-lg text-base md:text-lg">
            {azureProject.description}
          </p>
        </motion.div>

        {/* The case file register: EVENT / TYPE / SOURCE / ANALYSIS / PLATFORM / MAPPING */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 border-t border-b border-line"
        >
          <div className="grid grid-cols-2 md:grid-cols-6">
            {azureProject.caseFile.map((entry, i) => (
              <div
                key={entry.label}
                className={`px-0 md:px-6 py-5 ${i !== 0 ? "md:border-l border-line" : ""} ${
                  i % 2 !== 0 ? "pl-6" : ""
                } ${i < 4 ? "border-b md:border-b-0 border-line" : ""}`}
              >
                <div className="label text-muted mb-2">{entry.label}</div>
                <div
                  className={`font-mono text-sm md:text-base ${
                    entry.label === "Mapping" ? "text-investigate" : "text-ink"
                  }`}
                >
                  {entry.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technologies + metrics, set as quiet reference lines beneath the register */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {azureProject.technologies.map((tech) => (
              <span key={tech} className="label text-muted border border-line px-3 py-1.5">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-8">
            {azureProject.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="font-mono text-xl text-ink">{metric.value}</div>
                <div className="mt-1 label text-muted leading-relaxed max-w-[10rem]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-bleed evidence — the case study's primary visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-14"
        >
          <EvidenceFrame
            number="01"
            title="Authentication investigation"
            source="Azure Sentinel"
            eventId="4625"
            aspect="aspect-[21/9]"
          />
        </motion.div>
      </div>
    </div>
  );
}
