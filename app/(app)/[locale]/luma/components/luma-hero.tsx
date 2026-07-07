"use client";

import {useTranslations} from "next-intl";
import {motion, type Variants} from "motion/react";
import { LumaHeroCards } from "./luma-hero-card";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardsStagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function LumaHero() {
  const t = useTranslations("LumaHero");

  return (
    <>
      <div className="luma-hero-bg">
        <div className="luma-hero-inner">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="luma-hero-title">Luma</h1>
            <p className="luma-hero-subtitle">Land Use Mapping for All</p>
            {/* TODO: tambahkan key "Hero.cta" di messages/en.json & id.json */}
            <button type="button" className="luma-hero-cta">
              Start Mapping
            </button>
          </motion.div>

          <LumaHeroCards className="mt-[60px]" />
        </div>
      </div>
    </>
  )

}