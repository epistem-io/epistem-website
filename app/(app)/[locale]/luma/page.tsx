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
import "./luma.css";

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

  return (
    <>
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
