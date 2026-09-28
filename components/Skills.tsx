"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/lib/data";

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = skillCategories[activeIndex];

  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="container-grid">
        <p className="label text-muted mb-10">Capability system</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible border border-line">
              {skillCategories.map((category, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={isActive}
                    className={`shrink-0 lg:shrink text-left px-5 py-4 label whitespace-nowrap lg:whitespace-normal border-b border-line lg:border-b lg:last:border-b-0 border-r lg:border-r-0 last:border-r-0 transition-colors duration-200 ${
                      isActive ? "bg-accent text-base" : "text-muted hover:text-ink hover:bg-surface"
                    }`}
                  >
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border border-line min-h-[280px] p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="label text-accent mb-6">{active.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {active.items.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                        className="text-sm text-ink border border-line px-4 py-2.5"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
