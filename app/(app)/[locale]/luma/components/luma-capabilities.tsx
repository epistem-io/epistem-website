"use client";

import { motion, type Variants } from "motion/react";

const accentPink = "#cc4778";
const textDark = "#1A1D1A";

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

type Cap = { pos: "left" | "right-top" | "right-bottom"; title: string; body: string };

const CAPS: Cap[] = [
  {
    pos: "left",
    title: "Gotong royong data lapangan",
    body: "Lorem Ipsum dor alor simit lorem Ipsum dor alor simit lorem Ipsum dor alor simit lorem Ipsum dor alor simit",
  },
  {
    pos: "right-top",
    title: "Opensource Database",
    body: "Restoration/deforestation monitoring",
  },
  {
    pos: "right-bottom",
    title: "Time series analysis",
    body: "Lorem Ipsum dor alor simit lorem Ipsum dor alor simit lorem Ipsum dor alor simit lorem Ipsum dor alor simit",
  },
];

export function LumaCapabilities() {
  return (
    <section className="luma-cap">
      <style>{`
        .luma-cap {
          max-width: 1080px;
          margin: 40px auto;
          padding: 40px 24px 60px;
        }
        .luma-cap__eyebrow {
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${accentPink};
          margin: 0 0 10px;
        }
        .luma-cap__title {
          text-align: center;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: ${textDark};
          margin: 0 0 24px;
        }

        /* Panggung dengan cincin & lingkaran pusat */
        .luma-cap__stage {
          position: relative;
          height: 560px;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Pusat: cincin + lingkaran inti dikelompokkan agar selalu konsentris */
        .luma-cap__hub {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 640px;
          height: 640px;
        }

        .luma-cap__rings {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .luma-cap__core {
          position: absolute;
          top: 50%;
          left: 50%;
          /* pusatkan via margin, bukan transform, agar tak bentrok dengan animasi scale motion */
          margin-top: -130px;
          margin-left: -130px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #fff;
          font-size: clamp(40px, 5vw, 50px);
          font-weight: 400;
          letter-spacing: -0.01em;
          background: radial-gradient(circle at 50% 35%, #d85a8a 0%, #c73f72 55%, #b23063 100%);
          box-shadow: 0 30px 60px rgba(178, 48, 99, 0.35),
                      0 0 70px 42px rgba(255, 255, 255, 0.9);
          z-index: 3;
        }

        .luma-cap__card {
          position: absolute;
          width: 260px;
          background: rgba(204, 71, 120, 0.06);
          border-radius: 16px;
          padding: 20px 22px;
          z-index: 4;
          transition: background-color 0.25s ease;
        }
        .luma-cap__card:hover {
          background: #EFC6D5;
        }
        .luma-cap__card h3 {
          font-size: 19px;
          font-weight: 700;
          line-height: 1.25;
          color: ${textDark};
          margin: 0 0 8px;
        }
        .luma-cap__card p {
          font-size: 13.5px;
          line-height: 1.6;
          color: #6b6b6b;
          margin: 0;
        }

        .luma-cap__card--left        { left: -5%;   top: 56%; width: 372px; }
        .luma-cap__card--right-top   { right: -10%; top: 40%; width: 410px; }
        .luma-cap__card--right-bottom{ right: -10%;  top: 71%; width: 485px; }

        @media (max-width: 1024px) {
          .luma-cap__stage {
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .luma-cap__hub {
            position: static;
            transform: none;
            width: auto;
            height: auto;
          }
          .luma-cap__rings { display: none; }
          .luma-cap__core {
            position: static;
            margin: 0;
            width: 220px;
            height: 220px;
          }
          .luma-cap__card,
          .luma-cap__card--left,
          .luma-cap__card--right-top,
          .luma-cap__card--right-bottom {
            position: static;
            width: 100%;
            max-width: 440px;
          }
        }
      `}</style>

      <p className="luma-cap__eyebrow">Capabilities</p>
      <h2 className="luma-cap__title">Key Engine Capabilities</h2>

      <motion.div
        className="luma-cap__stage"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Cincin putus-putus konsentris dengan lingkaran inti di dalamnya */}
        <div className="luma-cap__hub">
          <svg
            className="luma-cap__rings"
            viewBox="0 0 640 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="320" cy="320" r="165" stroke={accentPink} strokeOpacity="0.9"strokeWidth="1.5" strokeDasharray="9 8" />
            <circle cx="320" cy="320" r="235" stroke={accentPink} strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="9 8" />
            <circle cx="320" cy="320" r="305" stroke={accentPink} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="9 8" />
          </svg>

          <motion.div className="luma-cap__core" variants={pop}>
            Luma
          </motion.div>
        </div>

        {CAPS.map((cap) => (
          <motion.div
            key={cap.title}
            className={`luma-cap__card luma-cap__card--${cap.pos}`}
            variants={fadeInUp}
          >
            <h3>{cap.title}</h3>
            <p>{cap.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
