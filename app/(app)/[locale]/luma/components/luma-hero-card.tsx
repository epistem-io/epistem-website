"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, type PanInfo } from "motion/react";
import { useTranslations } from "next-intl";

const textDark = "#1A1D1A";

// ── Media image (rounded, responsif) ─────────────────────────
// fit="cover" (default) → isi kotak 260/173 (bisa terpotong).
// fit="contain" → tampilkan gambar utuh pada rasio aslinya (tidak terpotong).
function LumaCardMedia({
  src,
  alt,
  fit = "cover",
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
}) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{
        width: "100%",
        height: "auto",
        borderRadius: 14,
        margin: "12px 0 0",
        display: "block",
        pointerEvents: "none",
        ...(fit === "cover"
          ? { aspectRatio: "260 / 173", objectFit: "cover" }
          : {}),
      }}
    />
  );
}

// ── Isi tiap kartu ───────────────────────────────────────────
type Translator = (key: string) => string;

type Card = { eyebrow: string; title: string; caption?: string; body: ReactNode };

function buildCards(t: Translator): Card[] {
  return [
    {
      eyebrow: t("mosaicEyebrow"),
      title: t("mosaicTitle"),
      caption: t("mosaicCaption"),
      body: <LumaCardMedia src="/images/card-5.png" alt={t("mosaicAlt")} />,
    },
    {
      eyebrow: t("changeEyebrow"),
      title: t("changeTitle"),
      body: (
        <>
          <LumaCardMedia src="/images/card-1.png" alt={t("changeAlt")} />
          <div>
            <span className="luma-pill">{t("changePill1")}</span>
            <span className="luma-pill">{t("changePill2")}</span>
          </div>
        </>
      ),
    },
    {
      eyebrow: t("classifiedEyebrow"),
      title: t("classifiedTitle"),
      caption: t("classifiedCaption"),
      body: <LumaCardMedia src="/images/card-3.png" alt={t("classifiedAlt")} />,
    },
    {
      eyebrow: t("shareEyebrow"),
      title: t("shareTitle"),
      body: (
        <>
          <LumaCardMedia src="/images/card-2.png" alt={t("shareAlt")} />
          <p className="luma-card__community-note" style={{ color: textDark }}>
            {t("shareNote")}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#777" }}>{t("shareCampaign")}</span>
            <div className="luma-avatars">
              <span>AT</span>
              <span>MI</span>
              <span>OL</span>
            </div>
          </div>
        </>
      ),
    },
    {
      eyebrow: t("qualityEyebrow"),
      title: t("qualityTitle"),
      caption: t("qualityCaption"),
      body: <LumaCardMedia src="/images/card-4.png" alt={t("qualityAlt")} fit="contain" />,
    },
  ];
}

// ── Carousel kartu tak terbatas (loop kiri/kanan) ────────────
export function LumaHeroCards({ className = "" }: { className?: string }) {
  const t = useTranslations("LumaHeroCards");
  const CARDS = buildCards(t);
  const count = CARDS.length;
  const [active, setActive] = useState(Math.floor(count / 2)); // mulai dari tengah

  // Ukuran kartu & jarak antar-pusat menyesuaikan lebar layar
  const [vw, setVw] = useState(1200);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const CARD_WIDTH = vw < 480 ? 240 : vw < 768 ? 270 : 300;
  const STEP = vw < 480 ? 196 : vw < 768 ? 224 : 250;

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, 4000);
    return () => clearInterval(id);
  }, [count]);

  // pindah aktif secara melingkar (tak terbatas)
  function go(dir: number) {
    setActive((a) => (a + dir + count) % count);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = 60;
    const { offset, velocity } = info;
    if (offset.x < -threshold || velocity.x < -400) go(1);
    else if (offset.x > threshold || velocity.x > 400) go(-1);
  }

  return (
    <div className={`luma-carousel ${className}`.trim()}>
      <motion.div
        className="luma-carousel__stage"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={handleDragEnd}
      >
        {CARDS.map((card, i) => {
          // jarak melingkar terpendek dari kartu aktif → selalu ada kartu di kedua sisi
          let offset = i - active;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const dist = Math.abs(offset);
          const opacity = dist === 0 ? 1 : dist === 1 ? 0.95 : 0.6;
          const scale = dist === 0 ? 1 : dist === 1 ? 0.88 : 0.78;
          const isActive = dist === 0;

          return (
            <motion.article
              key={card.title}
              className="luma-card"
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: CARD_WIDTH,
                marginLeft: -CARD_WIDTH / 2,
                transformOrigin: "top center",
                cursor: isActive ? "grab" : "pointer",
                zIndex: 30 - dist * 10,
              }}
              animate={{ x: offset * STEP, y: dist * 24, scale, opacity }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              onClick={() => !isActive && setActive(i)}
            >
              <p className="luma-card__eyebrow">{card.eyebrow}</p>
              <h3 className="luma-card__title">{card.title}</h3>
              {card.body}
              {card.caption && <p className="luma-card__caption">{card.caption}</p>}
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}
