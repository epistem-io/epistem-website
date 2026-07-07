"use client";

import { motion, type Variants } from "motion/react";

const accentPink = "#cc4778";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

type Cap = { pos: "left" | "right-top" | "right-bottom"; title: string; body: string };

const CAPS: Cap[] = [
  {
    pos: "left",
    title: "Gotong royong data lapangan",
    body: "Lorem Ipsum dor alor simit lorem Ipsum dor alor simit lorem Ipsum dor alor simit lorem Ipsum dor alor simit",
  },
  {
    pos: "right-top",
    title: "Opensource Database",
    body: "Restoration/deforestation monitoring",
  },
  {
    pos: "right-bottom",
    title: "Time series analysis",
    body: "Lorem Ipsum dor alor simit lorem Ipsum dor alor simit lorem Ipsum dor alor simit lorem Ipsum dor alor simit",
  },
];

export function LumaCapabilities() {
  return (
    <section className="luma-cap">
      <p className="luma-cap__eyebrow">Capabilities</p>
      <h2 className="luma-cap__title">Key Engine Capabilities</h2>

      <motion.div
        className="luma-cap__stage"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Cincin putus-putus konsentris dengan lingkaran inti di dalamnya */}
        <div className="luma-cap__hub">
          <svg
            className="luma-cap__rings"
            viewBox="0 0 640 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="320" cy="320" r="165" stroke={accentPink} strokeOpacity="0.9"strokeWidth="1.5" strokeDasharray="9 8" />
            <circle cx="320" cy="320" r="235" stroke={accentPink} strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="9 8" />
            <circle cx="320" cy="320" r="305" stroke={accentPink} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="9 8" />
          </svg>

          <motion.div className="luma-cap__core" variants={pop}>
            Luma
          </motion.div>
        </div>

        {CAPS.map((cap) => (
          <motion.div
            key={cap.title}
            className={`luma-cap__card luma-cap__card--${cap.pos}`}
            variants={fadeInUp}
          >
            <h3>{cap.title}</h3>
            <p>{cap.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
