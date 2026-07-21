"use client";

import { type ReactNode, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";

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

type Translator = (key: string) => string;

type Cap = { pos: "left-top" | "left" | "right-top" | "right-bottom"; title: ReactNode; body: string };

function buildCaps(t: Translator): Cap[] {
  return [
    {
      pos: "left-top",
      title: t("barrierTitle"),
      body: t("barrierBody"),
    },
    {
      pos: "left",
      title: t("gotongRoyongTitle"),
      body: t("gotongRoyongBody"),
    },
    {
      pos: "right-top",
      title: t("transparentTitle"),
      body: t("transparentBody"),
    },
    {
      pos: "right-bottom",
      title: t("inclusivityTitle"),
      body: t("inclusivityBody"),
    },
  ];
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`luma-cap__chevron${expanded ? " luma-cap__chevron--open" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#5C2036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LumaCapabilities() {
  const t = useTranslations("LumaCapabilities");
  const CAPS = buildCaps(t);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setExpandedIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="luma-cap">
      <p className="luma-cap__eyebrow">{t("eyebrow")}</p>
      <h2 className="luma-cap__title">{t("title")}</h2>

      <motion.div
        className="luma-cap__stage"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="luma-cap__hub">
          <svg
            className="luma-cap__rings"
            viewBox="0 0 640 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="320" cy="320" r="165" stroke={accentPink} strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="6 5" />
            <circle cx="320" cy="320" r="235" stroke={accentPink} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="6 5" />
            <circle cx="320" cy="320" r="305" stroke={accentPink} strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="6 5" />
          </svg>

          <motion.div className="luma-cap__core" variants={pop}>
            {t("core")}
          </motion.div>
        </div>

        {CAPS.map((cap, i) => (
          <motion.div
            key={cap.pos}
            className={`luma-cap__card luma-cap__card--${cap.pos}`}
            variants={fadeInUp}
            onMouseEnter={() => setExpandedIndex(i)}
            onMouseLeave={() => setExpandedIndex(null)}
          >
            <button
              className="luma-cap__card-header"
              onClick={() => toggle(i)}
              onFocus={() => setExpandedIndex(i)}
              aria-expanded={expandedIndex === i}
            >
              <h3>{cap.title}</h3>
              <Chevron expanded={expandedIndex === i} />
            </button>
            <AnimatePresence initial={false}>
              {expandedIndex === i && (
                <motion.div
                  className="luma-cap__card-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p>{cap.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
