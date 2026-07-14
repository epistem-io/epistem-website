"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Layers, Search, Share2 } from "lucide-react";
import { useLocale } from "next-intl";

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

// Hardcode sampai key Tolgee bisa di-push.
type PlatformCopy = {
  eyebrow: string;
  title: string;
  tablistLabel: string;
  comingSoon: string;
  generateLabel: string;
  generateHeading: string;
  generateDescription: string;
  analyzeLabel: string;
  analyzeHeading: string;
  analyzeDescription: string;
  shareLabel: string;
  shareHeading: string;
  shareDescription: string;
};

const COPY: Record<"en" | "id", PlatformCopy> = {
  en: {
    eyebrow: "The Platform",
    title: "Three features, one mapping workflow",
    tablistLabel: "Platform modules",
    comingSoon: "Coming Soon",
    generateLabel: "Generate LULC Map",
    generateHeading: "From Satellite Data to Decision-Ready Maps",
    generateDescription:
      "Luma simplifies land use and land cover mapping into a guided workflow. From specifying your area of interest and modifying readily available satellite imagery, to creating a classification scheme, preparing input data, setting mapping parameters, and assessing map quality, Luma supports the entire process from start to finish.",
    analyzeLabel: "Identify Change",
    analyzeHeading: "Compare landscapes across time and reveal meaningful landscape change",
    analyzeDescription:
      "Luma makes it easier to detect and interpret changes in land use and land cover over time. With time-series analysis and change detection workflows, you can explore landscape dynamics, monitor transitions, and support evidence-based decision-making.",
    shareLabel: "Collaborative Mapping",
    shareHeading:
      "Turn individual mapping efforts into shared information that others can review, use, and adapt",
    shareDescription:
      "Luma is designed to make land use and land cover mapping more collaborative and accessible. It goes beyond a single user or a single project by supporting workflows that make it easier to share results, build on reference data from other platform users, and strengthen collective landscape monitoring.",
  },
  id: {
    eyebrow: "Platform",
    title: "Tiga fitur, satu alur kerja pemetaan",
    tablistLabel: "Modul platform",
    comingSoon: "Segera Hadir",
    generateLabel: "Buat Peta",
    generateHeading:
      "Dari data satelit ke peta yang siap digunakan untuk pengambilan keputusan",
    generateDescription:
      "Luma menyederhanakan pemetaan penggunaan dan tutupan lahan melalui alur kerja yang terpandu. Mulai dari menentukan area yang ingin dipetakan dan mengolah citra satelit yang tersedia, hingga membuat skema klasifikasi, menyiapkan data sampel, mengatur parameter pemetaan, dan menilai kualitas peta, Luma memudahkan seluruh proses dari awal hingga akhir.",
    analyzeLabel: "Identifikasi Perubahan",
    analyzeHeading:
      "Bandingkan bentang lahan dari waktu ke waktu dan temukan perubahan yang bermakna",
    analyzeDescription:
      "Luma memudahkan Anda mendeteksi dan memahami perubahan penggunaan dan tutupan lahan dari waktu ke waktu. Dengan alur kerja indetifikasi perubahan, Anda dapat menelusuri dinamika bentang lahan, memantau transisi, dan mendukung pengambilan keputusan berbasis data.",
    shareLabel: "Pemetaan Kolaboratif",
    shareHeading:
      "Lengkapi informasi secara gotong royong untuk menguji, mendalami, dan menggunakan peta secara saksama",
    shareDescription:
      "Luma dirancang untuk menjadikan pemetaan penggunaan dan tutupan lahan lebih kolaboratif dan mudah diakses. Tidak terbatas pada satu pengguna atau satu kegiatan, Luma mendukung alur kerja yang memudahkan berbagi hasil, memanfaatkan data referensi yang dikumpulkan bersama, serta memperkuat pemantauan lanskap secara bersama-sama.",
  },
};

function buildTabs(t: PlatformCopy): Tab[] {
  return [
    {
      id: "generate",
      label: t.generateLabel,
      icon: <Layers size={18} />,
      heading: t.generateHeading,
      description: t.generateDescription,
      image: "/images/generate-lulc-map.webp",
    },
    {
      id: "analyze",
      label: t.analyzeLabel,
      icon: <Search size={18} />,
      heading: t.analyzeHeading,
      description: t.analyzeDescription,
    },
    {
      id: "share",
      label: t.shareLabel,
      icon: <Share2 size={18} />,
      heading: t.shareHeading,
      description: t.shareDescription,
    },
  ];
}

export function LumaPlatform() {
  const locale = useLocale();
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const TABS = buildTabs(copy);

  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="luma-plat">
      <p className="luma-plat__eyebrow">{copy.eyebrow}</p>
      <h2 className="luma-plat__title">{copy.title}</h2>

      <div className="luma-plat__tabs" role="tablist" aria-label={copy.tablistLabel}>
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
            <p className="luma-plat__soon-label">{copy.comingSoon}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
