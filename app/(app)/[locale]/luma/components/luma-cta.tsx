"use client";

import { motion, type Variants } from "motion/react";
import { useLocale } from "next-intl";
import { getLumaUrl } from "@/lib/luma";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Hardcode sampai key Tolgee bisa di-push.
const COPY = {
  en: {
    titleLine1: "Map past trends,",
    titleLine2: "plan future action.",
    subtitle:
      "Intuitive no-coding interface for creating, analysing, and collectively acting on customizable land use and land cover map data.",
    startMapping: "Start Mapping",
    signIn: "Sign In",
  },
  id: {
    titleLine1: "Petakan penggunaan lahan,",
    titleLine2: "rencanakan solusi pelestarian",
    subtitle:
      "Aplikasi intuitif untuk membuat, menganalisis, dan beraksi bersama menggunakan data tata guna lahan yang sesuai kebutuhan.",
    startMapping: "Mulai Memetakan",
    signIn: "Masuk",
  },
} as const;

export function LumaCta() {
  const locale = useLocale();
  const t = COPY[locale as keyof typeof COPY] ?? COPY.en;
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
          {t.titleLine1}
          <br />
          <span>{t.titleLine2}</span>
        </motion.h2>

        <motion.p className="luma-cta__subtitle" variants={fadeInUp}>
          {t.subtitle}
        </motion.p>

        <motion.div className="luma-cta__actions" variants={fadeInUp}>
          <a
            href={getLumaUrl(locale)}
            className="luma-cta__btn luma-cta__btn--primary"
          >
            {t.startMapping}
          </a>
          <button type="button" className="luma-cta__btn luma-cta__btn--ghost">
            {t.signIn}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
