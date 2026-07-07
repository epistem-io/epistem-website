"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Layers, Search, Share2 } from "lucide-react";

const accentPink = "#cc4778";
const textDark = "#1A1D1A";
const textSecondary = "#555";

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
      <style>{`
        .luma-plat {
          max-width: 1280px;
          margin: 40px auto;
          padding: 56px clamp(24px, 4vw, 64px);
          background: linear-gradient(180deg, #fdeef4 0%, #fbe6ee 100%);
          border-radius: 28px;
        }

        .luma-plat__eyebrow {
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${accentPink};
          margin: 0 0 12px;
        }
        .luma-plat__title {
          text-align: center;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: ${textDark};
          margin: 0 0 40px;
          line-height: 1.1;
        }

        /* Tab bar */
        .luma-plat__tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          background: rgba(204, 71, 120, 0.10);
          border-radius: 16px;
          padding: 8px;
          margin-bottom: 48px;
        }
        .luma-plat__tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          cursor: pointer;
          background: transparent;
          color: rgba(120, 40, 70, 0.55);
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 600;
          padding: 14px 18px;
          border-radius: 11px;
          transition: color 0.2s ease;
        }
        .luma-plat__tab:hover { color: ${accentPink}; }
        .luma-plat__tab.is-active {
          color: #fff;
          background: ${accentPink};
          box-shadow: 0 10px 22px rgba(204, 71, 120, 0.30);
        }

        /* Layout tab dengan gambar (dua kolom) */
        .luma-plat__body {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }
        .luma-plat__heading {
          font-size: clamp(22px, 2.4vw, 30px);
          font-weight: 700;
          line-height: 1.2;
          color: ${accentPink};
          margin: 0 0 20px;
        }
        .luma-plat__desc {
          font-size: 16px;
          line-height: 1.7;
          color: ${textSecondary};
          margin: 0;
          text-align: justify;
        }
        .luma-plat__img {
          width: 100%;
          height: auto;
          border-radius: 18px;
          display: block;
        }

        /* Layout tab "Coming Soon" (satu kolom, tengah) */
        .luma-plat__soon {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
          padding: 8px 0 12px;
        }
        .luma-plat__soon .luma-plat__desc { text-align: center; }
        .luma-plat__soon-label {
          margin: 28px 0 0;
          font-size: 20px;
          font-weight: 600;
          color: ${accentPink};
        }

        @media (max-width: 900px) {
          .luma-plat__body { grid-template-columns: 1fr; }
        }
        /* Tab menumpuk vertikal (label tetap terbaca) di layar sempit */
        @media (max-width: 680px) {
          .luma-plat__tabs { grid-template-columns: 1fr; }
          .luma-plat__tab { justify-content: flex-start; padding: 13px 16px; }
        }
        @media (max-width: 600px) {
          .luma-plat {
            margin: 24px 12px;
            padding: 40px 20px;
            border-radius: 22px;
          }
          .luma-plat__desc { text-align: left; }
        }
      `}</style>

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
