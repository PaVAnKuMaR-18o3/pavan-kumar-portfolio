"use client";

import { motion } from "framer-motion";
import { secureCloudProject } from "@/lib/data";
import EvidenceFrame from "./EvidenceFrame";
import ArchitectureFlow from "./ArchitectureFlow";

export default function SecureCloudProject() {
  return (
    <div className="py-16 md:py-20">
      <div className="container-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="label text-protect mb-5">
              {secureCloudProject.index} / {secureCloudProject.category}
            </p>
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight">
              {secureCloudProject.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>

            <div className="mt-8 flex flex-wrap gap-2">
              {secureCloudProject.technologies.map((tech) => (
                <span key={tech} className="label text-muted border border-line px-3 py-1.5">
                  {tech}
                </span>
              ))}
            </div>

            <ul className="mt-8 border border-line divide-y divide-line">
              {secureCloudProject.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-ink px-4 py-3.5">
                  <span className="mt-2 h-1 w-1 bg-protect shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-7"
          >
            <EvidenceFrame
              number="06"
              title="Secure file sharing evidence"
              source="Application interface"
              aspect="aspect-[16/11]"
              accent="protect"
            />
          </motion.div>
        </div>

        <ArchitectureFlow label="Access & audit workflow" steps={secureCloudProject.workflow} />
      </div>
    </div>
  );
}
