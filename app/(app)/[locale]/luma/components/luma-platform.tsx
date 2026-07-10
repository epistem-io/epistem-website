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
    heading: "From Satellite Data to Decision-Ready Maps",
    description:
      "Luma simplifies land use and land cover mapping into a guided workflow. From selecting or drawing your geographic area and reviewing the generated composite imagery, to creating a classification scheme, preparing sample data, setting model parameters, and assessing map quality, Luma supports the entire process from start to finish.",
    image: "/images/generate-lulc-map.webp",
  },
  {
    id: "analyze",
    label: "Change Analysis",
    icon: <Search size={18} />,
    heading: "Compare land cover across time and reveal meaningful landscape change ",
    description:
      "Luma makes it easier to detect and interpret changes in land cover over time. With time-series analysis and change detection workflows, you can explore landscape dynamics, monitor transitions, and support evidence-based decision-making.",
  },
  {
    id: "share",
    label: "Collaborative Mapping",
    icon: <Share2 size={18} />,
    heading: "Turn individual mapping efforts into outputs that others can review, use, and adapt",
    description:
      "Luma is designed to make land use and land cover mapping more collaborative and accessible. It goes beyond a single user or a single project by supporting workflows that make it easier to share results, build on reference data, and strengthen collective landscape monitoring.",
  },
];

export function LumaPlatform() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="luma-plat">
      <p className="luma-plat__eyebrow">The Platform</p>
      <h2 className="luma-plat__title">Three features, one mapping workflow</h2>

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
