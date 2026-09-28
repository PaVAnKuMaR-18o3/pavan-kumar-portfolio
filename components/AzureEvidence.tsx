"use client";

import { motion } from "framer-motion";
import { azureProject } from "@/lib/data";
import EvidenceFrame from "./EvidenceFrame";

export default function AzureEvidence() {
  const [primary, ...rest] = azureProject.evidence;

  const primaryMetadata = [
    { label: "Event", value: primary.eventId ?? "—" },
    { label: "Source", value: primary.source },
    { label: "Analysis", value: primary.analysis },
    { label: "MITRE", value: primary.mitre ?? "Not mapped" },
  ];

  return (
    <div className="border-b border-line py-16 md:py-20">
      <div className="container-grid">
        <p className="label text-investigate mb-8">Evidence / Sequential investigation</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Primary artifact — the evidence under active examination */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <EvidenceFrame
              number={primary.number}
              title={primary.title}
              source={primary.source}
              eventId={primary.eventId}
              metadata={primaryMetadata}
              aspect="aspect-[16/10]"
              accent="investigate"
            />
          </motion.div>

          {/* The investigation continues — smaller, clearly secondary stages, not equal cards */}
          <div className="lg:col-span-4 flex flex-col">
            <p className="label text-muted mb-4">Investigation continues</p>
            <div className="flex flex-col gap-4 flex-1">
              {rest.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  <EvidenceFrame
                    number={item.number}
                    title={item.title}
                    source={item.source}
                    eventId={item.eventId}
                    aspect="aspect-[16/9]"
                    accent="investigate"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
