"use client";

import { motion, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function LumaCta() {
  return (
    <section className="luma-cta">
      <motion.div
        className="luma-cta__inner"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 className="luma-cta__title" variants={fadeInUp}>
          Map past trends,
          <br />
          <span>plan future action.</span>
        </motion.h2>

        <motion.p className="luma-cta__subtitle" variants={fadeInUp}>
          Intuitive no-coding interface for creating, analysing, and collectively acting on customizable land use and land cover map data. 
        </motion.p>

        <motion.div className="luma-cta__actions" variants={fadeInUp}>
          <a
            href={process.env.NEXT_PUBLIC_LUMA_URL || "/"}
            className="luma-cta__btn luma-cta__btn--primary"
          >
            Start Mapping
          </a>
          <button type="button" className="luma-cta__btn luma-cta__btn--ghost">
            Sign In
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
