"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSignalStages } from "@/lib/data";

// Normalized (0-100) positions for each stage node along the flow path.
const nodePositions = [
  { x: 78, y: 8 },
  { x: 46, y: 34 },
  { x: 82, y: 60 },
  { x: 40, y: 88 },
];

const pathD = `M ${nodePositions[0].x} ${nodePositions[0].y}
  C ${nodePositions[0].x} ${nodePositions[0].y + 12}, ${nodePositions[1].x} ${nodePositions[1].y - 12}, ${nodePositions[1].x} ${nodePositions[1].y}
  C ${nodePositions[1].x} ${nodePositions[1].y + 12}, ${nodePositions[2].x} ${nodePositions[2].y - 12}, ${nodePositions[2].x} ${nodePositions[2].y}
  C ${nodePositions[2].x} ${nodePositions[2].y + 12}, ${nodePositions[3].x} ${nodePositions[3].y - 12}, ${nodePositions[3].x} ${nodePositions[3].y}`;

// Fixed (non-random) faint background particles so server/client markup matches.
const particles = [
  { x: 12, y: 14 }, { x: 92, y: 22 }, { x: 6, y: 46 }, { x: 64, y: 6 },
  { x: 30, y: 72 }, { x: 88, y: 78 }, { x: 18, y: 92 }, { x: 58, y: 48 },
  { x: 96, y: 52 }, { x: 8, y: 66 }, { x: 40, y: 20 }, { x: 70, y: 94 },
];

export default function SignalField() {
  const [active, setActive] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const activeStage = active !== null ? heroSignalStages[active] : null;

  // Signature entrance moment: on load, the signal travels once through
  // Signal → Analyze → Correlate → Detect, then releases control to hover.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    setLocked(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    heroSignalStages.forEach((_, i) => {
      timers.push(setTimeout(() => setActive(i), 700 + i * 650));
    });
    timers.push(
      setTimeout(() => {
        setActive(null);
        setLocked(false);
      }, 700 + heroSignalStages.length * 650 + 500)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = (i: number) => {
    if (locked) return;
    setActive(i);
  };
  const handleLeave = (i: number) => {
    if (locked) return;
    setActive((a) => (a === i ? null : a));
  };

  return (
    <div className="relative w-full h-[420px] md:h-[560px] select-none">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="0.35" className="fill-line" />
        ))}

        <motion.path
          d={pathD}
          fill="none"
          stroke="#292825"
          strokeWidth="0.35"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke="#C8FF4D"
          strokeWidth="0.35"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: active !== null ? (active + 1) / heroSignalStages.length : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {heroSignalStages.map((stage, i) => {
        const pos = nodePositions[i];
        const isActive = active === i;
        return (
          <button
            key={stage.id}
            type="button"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            onFocus={() => handleEnter(i)}
            onBlur={() => handleLeave(i)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex h-2.5 w-2.5 items-center justify-center rounded-full border transition-colors duration-200 ${
                isActive ? "border-accent bg-accent" : "border-muted bg-base group-hover:border-ink"
              }`}
            >
              {isActive && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-40 animate-ping" />
              )}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              className={`label whitespace-nowrap transition-colors duration-200 ${
                isActive ? "text-accent" : "text-muted group-hover:text-ink"
              }`}
            >
              {stage.label}
            </motion.span>
          </button>
        );
      })}

      <div className="absolute bottom-0 left-0 right-0 md:right-auto md:w-72 min-h-[64px]">
        <AnimatePresence mode="wait">
          {activeStage ? (
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="border-t border-line pt-3"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-lg text-accent">{activeStage.value}</span>
              </div>
              <p className="mt-1 text-xs text-muted leading-relaxed max-w-xs">{activeStage.detail}</p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-t border-line pt-3 label text-muted"
            >
              Hover a stage to trace the investigation
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
