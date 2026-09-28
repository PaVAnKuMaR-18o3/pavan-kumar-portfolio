"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import SignalField from "./SignalField";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-28 md:pb-16 border-b border-line overflow-hidden">
      {/* Full-bleed signal composition — sits behind the text on large screens */}
      <div
        className="hidden lg:block absolute top-16 bottom-0 right-0 w-[52%]"
        aria-hidden="true"
      >
        <SignalField />
      </div>

      <div className="container-grid relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl relative z-10"
        >
          <motion.p variants={item} className="label text-accent mb-6">
            Security engineering / detection / investigation
          </motion.p>

          <motion.h1
            variants={item}
            className="text-display-mobile md:text-display-md font-medium tracking-tight"
          >
            Building systems
            <br />
            that detect,
            <br />
            investigate &amp;
            <br />
            protect.
          </motion.h1>

          <motion.p variants={item} className="mt-8 max-w-md text-base md:text-lg text-muted leading-relaxed">
            Entry-level cybersecurity analyst focused on security operations,
            detection engineering and secure systems.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-accent text-base px-5 py-3 text-[13px] font-medium tracking-tight hover:bg-ink transition-colors duration-200"
            >
              Explore the investigation
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a
              href={profile.resume}
              className="inline-flex items-center gap-2 border border-line px-5 py-3 text-[13px] font-medium tracking-tight text-ink hover:border-ink transition-colors duration-200"
            >
              Download resume
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-2 label text-muted">
            <MapPin className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
            {profile.location}
            <span className="mx-2 text-line">/</span>
            <span className="text-accent">{profile.status}</span>
          </motion.div>
        </motion.div>

        {/* Mobile / tablet: signal field sits in normal flow below the text */}
        <div className="lg:hidden mt-16">
          <SignalField />
        </div>
      </div>
    </section>
  );
}
