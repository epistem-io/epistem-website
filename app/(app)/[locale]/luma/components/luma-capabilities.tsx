"use client";

import { type ReactNode, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useLocale } from "next-intl";

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

type Cap = { pos: "left-top" | "left" | "right-top" | "right-bottom"; title: ReactNode; body: string };

// Hardcode sampai key Tolgee bisa di-push.
type CapCopy = {
  eyebrow: string;
  title: string;
  core: string;
  barrierTitle: string;
  barrierBody: string;
  gotongRoyongTitle: string;
  gotongRoyongBody: string;
  transparentTitle: string;
  transparentBody: string;
  inclusivityTitle: string;
  inclusivityBody: string;
};

const COPY: Record<"en" | "id", CapCopy> = {
  en: {
    eyebrow: "Capabilities",
    title: "Key Engine Capabilities",
    core: "Luma",
    barrierTitle: "Removing Knowledge and Infrastructure Barrier",
    barrierBody:
      "Acquiring specialized expertise and powerful hardware should not take your focus away from the landscape itself. Map land use and land cover in just a few guided steps. Luma helps users turn satellite imagery into usable LULC maps through a simple workflow directly from your browser. No coding or high-performance computer needed!",
    gotongRoyongTitle: "Mapping, the Gotong Royong Way",
    gotongRoyongBody:
      "Luma’s mapping capabilities are strengthened by the collective efforts of its users. Designed to share insights across projects, Luma enables data gathered from one user’s mapping exercise to benefit others. This transforms isolated data collection into a growing, crowdsourced resource for comprehensive landscape monitoring.",
    transparentTitle: "Transparent Analysis",
    transparentBody:
      "Every map Luma produces is transparent, reproducible and backed by a scientifically robust methodology. Choose your classification scheme, validate against ground-truth or reference data, and generate accuracy assessments. All will be done in a transparent manner with full documentation, so your results hold up to scrutiny and replication.",
    inclusivityTitle: "Data Inclusivity",
    inclusivityBody:
      "Ensures that data truly reflects on-the-ground realities by integrating direct input from local communities, leading to more accurate, inclusive, and actionable insights. This approach helps close critical data gaps, reduces the risk of misinterpretation or misuse, and ultimately strengthens the effectiveness and sustainability of implementation efforts.",
  },
  id: {
    eyebrow: "Kemampuan",
    title: "Kemampuan Utama Luma",
    core: "Luma",
    barrierTitle: "Menghilangkan Prasyarat Teknis",
    barrierBody:
      "Untuk memetakan lanskap, Anda tidak perlu lagi dipusingkan dengan keahlian khusus atau keperluan perangkat keras yang mahal. Luma membantu mengubah citra satelit menjadi peta penggunaan dan tutupan lahan siap pakai melalui alur kerja sederhana yang terpandu, langsung dari browser Anda. Tanpa coding, tanpa perlu komputer berspesifikasi tinggi!",
    gotongRoyongTitle: "Memetakan dengan Semangat Gotong Royong",
    gotongRoyongBody:
      "Kemampuan pemetaan Luma diperkuat oleh kontribusi kolektif para penggunanya. Dirancang untuk berbagi wawasan lintas kegiatan, Luma memungkinkan data dari hasil pemetaan satu pengguna juga bermanfaat bagi pengguna-pengguna lain. Dengan begitu, pengumpulan data yang tadinya berdiri sendiri-sendiri berubah menjadi sumber daya kolektif yang terus berkembang untuk pemantauan lanskap yang lebih menyeluruh.",
    transparentTitle: "Analisis yang Transparan",
    transparentBody:
      "Setiap peta yang dihasilkan Luma bersifat transparan, dapat diproduksi ulang, dan didukung oleh metodologi yang teruji secara ilmiah. Pilih skema klasifikasi Anda, validasi dengan data lapangan atau data referensi, lalu hasilkan penilaian akurasi. Semua proses dilakukan secara transparan dengan dokumentasi lengkap, sehingga hasil Anda dapat dipertanggungjawabkan dan diserbaluaskan.",
    inclusivityTitle: "Inklusivitas Data",
    inclusivityBody:
      "Memastikan data benar-benar mencerminkan kondisi di lapangan dengan mengintegrasikan masukan langsung dari masyarakat lokal, sehingga menghasilkan wawasan yang lebih akurat, inklusif, dan ramah implementasi. Pendekatan ini membantu menutup kesenjangan data yang krusial, mengurangi risiko kesalahan interpretasi atau penyalahgunaan, serta pada akhirnya memperkuat efektivitas dan keberlanjutan upaya implementasi di lapangan.",
  },
};

function buildCaps(t: CapCopy): Cap[] {
  return [
    {
      pos: "left-top",
      title: t.barrierTitle,
      body: t.barrierBody,
    },
    {
      pos: "left",
      title: t.gotongRoyongTitle,
      body: t.gotongRoyongBody,
    },
    {
      pos: "right-top",
      title: t.transparentTitle,
      body: t.transparentBody,
    },
    {
      pos: "right-bottom",
      title: t.inclusivityTitle,
      body: t.inclusivityBody,
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
  const locale = useLocale();
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const CAPS = buildCaps(copy);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setExpandedIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="luma-cap">
      <p className="luma-cap__eyebrow">{copy.eyebrow}</p>
      <h2 className="luma-cap__title">{copy.title}</h2>

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
            {copy.core}
          </motion.div>
        </div>

        {CAPS.map((cap, i) => (
          <motion.div
            key={cap.pos}
            className={`luma-cap__card luma-cap__card--${cap.pos}`}
            variants={fadeInUp}
          >
            <button
              className="luma-cap__card-header"
              onClick={() => toggle(i)}
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
