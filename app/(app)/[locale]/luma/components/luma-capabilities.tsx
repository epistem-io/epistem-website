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

type Cap = { pos: "left-top" | "left" | "right-top" | "right-bottom"; title: string; body: string };

const CAPS: Cap[] = [
  {
    pos: "left-top",
    title: "Guided Mapping in Minutes",
    body: "Map smarter, not harder. Map land use and land cover in a few guided steps. Luma helps users turn satellite imagery into usable maps through a simple browser-based workflow, without requiring advanced technical setup."
  },
  {
    pos: "left",
    title: "Mapping, the Gotong Royong Way",
    body: "Every map you build adds to a shared pool others can draw from, and vice versa. Luma is built so one person's mapping data can be reused by someone else, even on a different project, turning isolated data collection into a growing, crowdsourced resource for landscape monitoring worldwide.",
  },
  {
    pos: "right-top",
    title: "Transparent Analysis",
    body: "Every map Luma produces is backed by a transparent, auditable methodology. Choose your classification scheme, validate against ground-truth or reference data, and generate accuracy assessments automatically, so your results hold up to scrutiny, replication, and peer review.",
  },
  {
    pos: "right-bottom",
    title: "Track Change Over Time (coming soon)",
    body: "Land doesn't stay static, and your maps shouldn't either. Luma is extending its workflow to support time-series analysis: you'll be able to compare maps across dates, detect change, and monitor how landscapes evolve, all within the same platform you already use to build them.",
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
