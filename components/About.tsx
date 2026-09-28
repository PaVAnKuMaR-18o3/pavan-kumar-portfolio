"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="border-b border-line py-20 md:py-28 scroll-mt-16">
      <div className="container-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="label text-accent lg:col-span-3"
          >
            Profile
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <p className="text-xl md:text-2xl text-ink leading-relaxed max-w-2xl">
              Entry-level cybersecurity candidate focused on security
              operations, detection engineering, security monitoring and
              secure systems.
            </p>
            <p className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
              My work is hands-on: investigating Windows Security Events and
              writing KQL detections in an Azure SOC lab, building a
              full-stack Mini-SIEM for real-time alerting, and engineering a
              secure cloud file-sharing system with RBAC and persistent audit
              logging.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
