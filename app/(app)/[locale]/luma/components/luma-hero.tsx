"use client";

import {useLocale, useTranslations} from "next-intl";
import {motion, type Variants} from "motion/react";
import { LumaHeroCards } from "./luma-hero-card";
import { getLumaUrl } from "@/lib/luma";

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
  const locale = useLocale();

  return (
    <>
      <div className="luma-hero-bg">
        <div className="luma-hero-inner">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="luma-hero-title" style={{ fontFamily: 'var(--font-degular-display)' }}>Luma</h1>
            <p className="luma-hero-subtitle" style={{ fontFamily: 'var(--font-degular-display)' }}>Land Use Mapping for All</p>
            {/* TODO: tambahkan key "Hero.cta" di messages/en.json & id.json */}
            <a
              href={getLumaUrl(locale)}
              className="luma-hero-cta"
            >
              Start Mapping
            </a>
          </motion.div>

          <LumaHeroCards className="mt-[60px]" />
        </div>
      </div>
    </>
  )

}