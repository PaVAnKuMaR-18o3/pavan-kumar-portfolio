"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { investigationTimeline } from "@/lib/data";
import EvidenceFrame from "./EvidenceFrame";

function Frame({
  data,
  index,
  total,
  scrollYProgress,
}: {
  data: (typeof investigationTimeline)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.03, mid + 0.12, end - 0.02],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [start, mid], [24, 0]);
  const showEvidence = index === 1 || index === 4;

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center max-w-5xl">
        <div className={showEvidence ? "md:col-span-6" : "md:col-span-12"}>
          <p className="label text-investigate mb-5">
            Step {data.step} / {String(total).padStart(2, "0")}
          </p>
          <h3 className="text-3xl md:text-6xl font-medium tracking-tight mb-4">{data.title}</h3>
          <p className="label text-muted">{data.detail}</p>
        </div>

        {showEvidence && (
          <div className="md:col-span-6 max-w-md">
            <EvidenceFrame
              title={index === 1 ? "Source IP correlation" : "Successful login correlation"}
              source="Microsoft Sentinel"
              aspect="aspect-[16/11]"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function InvestigationStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = investigationTimeline.length;
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-grid py-20 md:py-28">
        <p className="label text-investigate mb-4">From event to investigation</p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight max-w-2xl">
          A failed authentication event is only a signal.
        </h2>
        <p className="mt-5 text-muted text-base md:text-lg leading-relaxed max-w-xl">
          The investigation is in the sequence: identifying the source, correlating
          the account, and confirming what happened next.
        </p>
      </div>

      <div
        ref={ref}
        className="relative border-t border-line"
        style={{ height: `${total * 90}vh` }}
        aria-label="Investigation timeline walkthrough"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="container-grid h-full relative">
            <p className="absolute top-10 left-6 md:left-16 label text-muted">
              Investigation timeline
            </p>

            {/* Persistent vertical timeline rail, synced to scroll progress */}
            <div
              className="hidden md:block absolute top-10 bottom-10 left-16 w-px bg-line"
              aria-hidden="true"
            >
              <motion.div
                className="absolute top-0 left-0 w-full bg-investigate"
                style={{ height: railHeight }}
              />
              {investigationTimeline.map((frame, i) => (
                <span
                  key={frame.step}
                  className="absolute left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-line"
                  style={{ top: `${(i / (total - 1)) * 100}%` }}
                  aria-hidden="true"
                />
              ))}
            </div>

            {investigationTimeline.map((frame, i) => (
              <Frame
                key={frame.step}
                data={frame}
                index={i}
                total={total}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
