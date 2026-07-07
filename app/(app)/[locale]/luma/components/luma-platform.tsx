"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Layers, Search, Share2 } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type Tab = {
  id: string;
  label: string;
  icon: ReactNode;
  heading: string;
  description: string;
  image?: string; // jika ada → tampilkan gambar; jika tidak → "Coming Soon"
};

const TABS: Tab[] = [
  {
    id: "generate",
    label: "Generate LULC Map",
    icon: <Layers size={18} />,
    heading: "Turn raw satellite data into a classified land cover map",
    description:
      "Define your area of interest, choose your classification scheme, train your model, and let LUMA produce a publication-ready LULC map, powered by Random Forest classification on cloud-free Sentinel-2 composites.",
    image: "/images/generate-lulc-map.webp",
  },
  {
    id: "analyze",
    label: "Analyze Map",
    icon: <Search size={18} />,
    heading: "Read the story your map is telling",
    description:
      "Once a LULC map exists, yours or one you upload, Analyze Map turns pixels into insight. Run time-series comparisons to detect change, or use Zonal Statistics to quantify what's inside any boundary you care about.",
  },
  {
    id: "share",
    label: "Share Map",
    icon: <Share2 size={18} />,
    heading: "Turn your map into a participatory campaign",
    description:
      "Publish a map as a public or private campaign and invite others to contribute. Define questions, set feedback locations, and collect ground truth from the community closing the loop between mapping and validation.",
  },
];

export function LumaPlatform() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="luma-plat">
      <p className="luma-plat__eyebrow">The Platform</p>
      <h2 className="luma-plat__title">Three modules, one mapping workflow</h2>

      <div className="luma-plat__tabs" role="tablist" aria-label="Platform modules">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`luma-plat__tab ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {t.icon}
            <span className="luma-plat__tab-label">{t.label}</span>
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
            <p className="luma-plat__soon-label">Coming Soon</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
