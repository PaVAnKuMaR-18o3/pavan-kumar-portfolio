"use client";

import { motion } from "framer-motion";
import { signals } from "@/lib/data";
import CountUp from "./CountUp";

const isSimpleNumber = (value: string) => /^[\d,]+\+?$/.test(value);

export default function SignalMetrics() {
  return (
    <section className="border-b border-line" aria-label="Signal register">
      <div className="container-grid py-10 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="label text-accent">Signal register</p>
          <p className="label text-muted hidden sm:block">Project metrics</p>
        </div>
        <div className="relative border border-line">
          <div
            className="absolute -top-px left-0 right-0 h-px bg-line overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line">
            {signals.map((signal, i) => (
            <motion.div
              key={signal.value + i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="p-5 md:p-6"
            >
              <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="mt-2 font-mono text-2xl md:text-3xl text-ink tracking-tight">
                {isSimpleNumber(signal.value) ? <CountUp value={signal.value} /> : signal.value}
              </div>
              <div className="mt-3 label text-muted leading-relaxed">
                {signal.label.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
