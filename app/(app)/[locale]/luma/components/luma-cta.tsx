"use client";

import { motion, type Variants } from "motion/react";

const accentPink = "#cc4778";
const textDark = "#1A1D1A";

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
      <style>{`
        .luma-cta {
          background: linear-gradient(180deg, #ffffff 0%, #fdeef4 100%);
          padding: clamp(80px, 12vw, 150px) 24px;
        }
        .luma-cta__inner {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .luma-cta__title {
          font-size: clamp(44px, 8vw, 84px);
          font-weight: 500;
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: ${textDark};
          margin: 0;
        }
        .luma-cta__title span { color: ${accentPink}; }
        .luma-cta__subtitle {
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.6;
          color: ${textDark};
          max-width: 560px;
          margin: 24px 0 0;
        }
        .luma-cta__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          margin-top: 56px;
        }
        .luma-cta__btn {
          border: none;
          cursor: pointer;
          font-size: 17px;
          font-weight: 600;
          padding: 16px 44px;
          border-radius: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
        }
        .luma-cta__btn--primary {
          background: ${accentPink};
          color: #fff;
          box-shadow: 0 10px 24px rgba(204, 71, 120, 0.28);
        }
        .luma-cta__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(204, 71, 120, 0.36);
        }
        .luma-cta__btn--ghost {
          background: transparent;
          color: ${accentPink};
          border: 1.5px solid ${accentPink};
        }
        .luma-cta__btn--ghost:hover {
          background: rgba(204, 71, 120, 0.08);
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .luma-cta__actions { flex-direction: column; width: 100%; max-width: 320px; }
          .luma-cta__btn { width: 100%; }
        }
      `}</style>

      <motion.div
        className="luma-cta__inner"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 className="luma-cta__title" variants={fadeInUp}>
          Your Landscape,
          <br />
          <span>classified by you.</span>
        </motion.h2>

        <motion.p className="luma-cta__subtitle" variants={fadeInUp}>
          Generate your first LULC map today. No coding, no licenses, just satellite data and your
          decisions.
        </motion.p>

        <motion.div className="luma-cta__actions" variants={fadeInUp}>
          <button type="button" className="luma-cta__btn luma-cta__btn--primary">
            Start Mapping
          </button>
          <button type="button" className="luma-cta__btn luma-cta__btn--ghost">
            Sign In
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
