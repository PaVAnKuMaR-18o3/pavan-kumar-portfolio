"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates a numeric-looking string ("1,480+", "4,640+", "4") from 0 up to
 * its final value once it scrolls into view. Non-numeric characters
 * (commas, +) are preserved in their original position.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState<string>(value.replace(/[0-9]/g, "0"));

  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) {
      if (Number.isNaN(numeric)) setDisplay(value);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numeric * eased);
      setDisplay(value.replace(/[0-9,]+/, current.toLocaleString("en-US")));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{display}</span>;
}
