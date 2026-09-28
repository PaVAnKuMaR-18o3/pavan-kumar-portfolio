"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  supporting,
}: {
  eyebrow?: string;
  title: string;
  supporting?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl"
    >
      {eyebrow && <p className="label text-accent mb-4">{eyebrow}</p>}
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-ink">{title}</h2>
      {supporting && <p className="mt-5 text-muted text-base md:text-lg leading-relaxed">{supporting}</p>}
    </motion.div>
  );
}
