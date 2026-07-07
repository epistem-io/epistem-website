"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { LumaNavBar } from "./components/luma-nav-bar";
import { LumaHero } from "./components/luma-hero";
import { LumaPlatform } from "./components/luma-platform";
import { LumaCapabilities } from "./components/luma-capabilities";
import { LumaCta } from "./components/luma-cta";
import { LumaFooter } from "./components/luma-footer";

// Variabel animasi untuk efek masuk (fade-up)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function LumaLandingPage() {
  const t = useTranslations("LumaPage");

  // Aksen/Pink color dari Epistem
  const accentPink = "#cc4778";
  // Warna teks gelap utama
  const textDark = "#1A1D1A";
  // Warna teks sekunder (abu-abu)
  const textSecondary = "#555";

  return (
    <>
      <style>{`
        .luma-hero-bg {
          position: relative;
          width: 100%;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(253, 242, 246, 0.45) 0%, rgba(255, 255, 255, 0.55) 65%, #ffffff 100%),
            url("/images/hero-image.webp");
          background-size: cover, auto 100%;        /* gradient=cover, image zoomed out */
          background-position: center top, center 65px;
          background-repeat: no-repeat, no-repeat;
        }

        .luma-hero-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 110px 24px 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .luma-hero-title {
          font-size: clamp(56px, 12vw, 112px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.04em;
          color: ${accentPink};
          margin: 0;
        }

        .luma-hero-subtitle {
          font-size: clamp(18px, 3.2vw, 30px);
          font-weight: 400;
          color: ${accentPink};
          margin: 12px 0 0;
        }

        .luma-hero-cta {
          margin-top: 40px;
          border: none;
          cursor: pointer;
          background: ${accentPink};
          color: #fff;
          font-size: 17px;
          font-weight: 600;
          padding: 16px 34px;
          border-radius: 999px;
          box-shadow: 0 10px 24px rgba(204, 71, 120, 0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .luma-hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(204, 71, 120, 0.36);
        }

        /* ── Carousel kartu preview tak terbatas (loop kiri/kanan) ── */
        .luma-carousel {
          margin-top: 64px;
          width: 100%;
          max-width: 1360px;
          margin-left: auto;
          margin-right: auto;
          /* cegah scrollbar horizontal, tapi kartu tepi tetap tampil penuh di layar lebar */
          overflow-x: hidden;
        }

        .luma-carousel__stage {
          position: relative;
          min-height: 520px;
          cursor: grab;
          touch-action: pan-y;
        }
        .luma-carousel__stage:active { cursor: grabbing; }

        .luma-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 20px 45px rgba(120, 40, 70, 0.14);
          padding: 20px;
          text-align: left;
          overflow: hidden;
          user-select: none;
          -webkit-user-select: none;
        }

        /* indikator titik */
        .luma-carousel__dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
        }
        .luma-carousel__dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: none;
          border-radius: 999px;
          background: rgba(204, 71, 120, 0.28);
          cursor: pointer;
          transition: width 0.25s ease, background 0.25s ease;
        }
        .luma-carousel__dot.is-active {
          width: 22px;
          background: ${accentPink};
        }
        .luma-card__eyebrow {
          font-size: 13px;
          font-weight: 600;
          color: ${accentPink};
          margin: 0 0 6px;
        }
        .luma-card__title {
          font-size: 20px;
          font-weight: 700;
          color: ${textDark};
          line-height: 1.25;
          margin: 0;
        }
        .luma-card__caption {
          font-size: 13px;
          color: ${accentPink};
          margin: 14px 0 0;
        }
        .luma-card__media {
          margin-top: 14px;
          border-radius: 10px;
          height: 128px;
          background-size: cover;
          background-position: center;
        }

        /* tag pills */
        .luma-pill {
          display: inline-block;
          font-size: 12px;
          color: ${accentPink};
          border: 1px solid rgba(204, 71, 120, 0.4);
          border-radius: 999px;
          padding: 5px 12px;
          margin: 4px 6px 0 0;
        }
        .luma-stat { font-size: 44px; font-weight: 700; color: ${accentPink}; margin: 8px 0; }

        .luma-alert {
          margin-top: 12px;
          background: rgba(253, 240, 245, 0.7);
          border-radius: 10px;
          padding: 12px;
          font-size: 11px;
          color: ${textDark};
        }
        .luma-avatars { display: flex; gap: -6px; }
        .luma-avatars span {
          width: 30px; height: 30px; border-radius: 50%;
          display: grid; place-items: center;
          font-size: 11px; font-weight: 700; color: #fff;
          background: #7a1f45; border: 2px solid #fff; margin-left: -8px;
        }

        @media (max-width: 480px) {
          .luma-carousel__stage { min-height: 460px; }
        }
        
        /* Pembungkus konten di tengah (max-width) */
        .luma-hero-section {
          padding: 120px 24px 100px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media (min-width: 992px) {
          .luma-hero-section {
            padding: 160px 24px 120px;
          }
        }

        .luma-section {
          padding: 100px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .luma-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 56px;
        }
        
        @media (min-width: 768px) {
          .luma-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .luma-grid-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Cegah scroll horizontal dari elemen yang sedikit melewati tepi layar */
        .luma-page-wrapper {
          overflow-x: clip;
        }

        /* Base font reset untuk halaman ini agar Plus Jakarta Sans diterapkan menyeluruh */
        .luma-page-wrapper * {
          font-family: var(--font-pjs), "Plus Jakarta Sans", sans-serif;
        }
      `}</style>

      <div className="luma-page-wrapper">
        <LumaNavBar />
        {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
        <LumaHero />

        {/* ─── PLATFORM SECTION ───────────────────────────────────────────────────── */}
        <LumaPlatform />

        {/* ─── CAPABILITIES SECTION ───────────────────────────────────────────────── */}
        <LumaCapabilities />

        {/* ─── CTA SECTION (sebelum footer) ───────────────────────────────────────── */}
        <LumaCta />

        {/* ─── FOOTER ─────────────────────────────────────────────────────────────── */}
        <LumaFooter />
      </div>
    </>
  );
}
