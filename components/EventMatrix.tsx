"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventMatrix } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function EventMatrix() {
  const [selected, setSelected] = useState(1);
  const event = eventMatrix[selected];

  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Detection matrix / Event 02"
          title="Windows security events under investigation"
          supporting="Select an event ID to inspect the fields and correlation chain used to investigate it."
        />

        {/* Instrument strip — event IDs as selectable objects, not accordion rows */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border border-line divide-x divide-y md:divide-y-0 divide-line">
          {eventMatrix.map((item, i) => {
            const isActive = selected === i;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={isActive}
                className={`relative text-left px-5 py-6 md:py-8 transition-colors duration-200 ${
                  isActive ? "bg-surface" : "hover:bg-surface/50"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="event-indicator"
                    className="absolute inset-x-0 top-0 h-[2px] bg-investigate"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span
                  className={`font-mono text-3xl md:text-4xl tracking-tight block transition-colors duration-200 ${
                    isActive ? "text-investigate" : "text-ink"
                  }`}
                >
                  {item.id}
                </span>
                <span className="label text-muted mt-2 block">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Single detail panel — updates as an instrument reading, not an expanding card */}
        <div className="border-x border-b border-line min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 p-6 md:p-10"
            >
              <div className="md:col-span-7">
                <p className="text-sm text-muted leading-relaxed max-w-md">{event.context}</p>

                <p className="label text-muted mt-8 mb-4">Investigation chain</p>
                <div className="flex flex-col">
                  {event.chain.map((step, si) => (
                    <div key={step}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-muted w-4">
                          {String(si + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-ink">{step}</span>
                      </div>
                      {si < event.chain.length - 1 && (
                        <div className="pl-[7px]">
                          <div className="h-3 w-px bg-line" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {event.interpreters && (
                  <>
                    <p className="label text-muted mt-8 mb-3">Interpreters observed</p>
                    <div className="flex flex-wrap gap-2">
                      {event.interpreters.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[11px] text-muted border border-line px-2.5 py-1.5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="md:col-span-5 md:border-l border-line md:pl-8">
                <p className="label text-muted mb-4">Fields reviewed</p>
                <div className="flex flex-wrap gap-2">
                  {event.fields.map((field) => (
                    <span
                      key={field}
                      className="font-mono text-[11px] text-ink border border-line px-2.5 py-1.5"
                    >
                      {field}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                  <span className="label text-muted">MITRE ATT&amp;CK</span>
                  {event.mitre ? (
                    <span className="font-mono text-sm text-investigate">{event.mitre}</span>
                  ) : (
                    <span className="label text-muted/50">Not mapped</span>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
