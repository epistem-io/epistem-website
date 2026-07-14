"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Layers, Search, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type Translator = (key: string) => string;

type Tab = {
  id: string;
  label: string;
  icon: ReactNode;
  heading: string;
  description: string;
  image?: string; // jika ada → tampilkan gambar; jika tidak → "Coming Soon"
};

function buildTabs(t: Translator): Tab[] {
  return [
    {
      id: "generate",
      label: t("generateLabel"),
      icon: <Layers size={18} />,
      heading: t("generateHeading"),
      description: t("generateDescription"),
      image: "/images/generate-lulc-map.webp",
    },
    {
      id: "analyze",
      label: t("analyzeLabel"),
      icon: <Search size={18} />,
      heading: t("analyzeHeading"),
      description: t("analyzeDescription"),
    },
    {
      id: "share",
      label: t("shareLabel"),
      icon: <Share2 size={18} />,
      heading: t("shareHeading"),
      description: t("shareDescription"),
    },
  ];
}

export function LumaPlatform() {
  const t = useTranslations("LumaPlatform");
  const TABS = buildTabs(t);

  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="luma-plat">
      <p className="luma-plat__eyebrow">{t("eyebrow")}</p>
      <h2 className="luma-plat__title">{t("title")}</h2>

      <div className="luma-plat__tabs" role="tablist" aria-label={t("tablistLabel")}>
        {TABS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`luma-plat__tab ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {item.icon}
            <span className="luma-plat__tab-label">{item.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab.image ? (
          <motion.div
            key={tab.id}
            className="luma-plat__body"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
          >
            <div>
              <h3 className="luma-plat__heading">{tab.heading}</h3>
              <p className="luma-plat__desc">{tab.description}</p>
            </div>
            <div>
              <img src={tab.image} alt={tab.heading} className="luma-plat__img" draggable={false} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={tab.id}
            className="luma-plat__soon"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
          >
            <h3 className="luma-plat__heading">{tab.heading}</h3>
            <p className="luma-plat__desc">{tab.description}</p>
            <p className="luma-plat__soon-label">{t("comingSoon")}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
