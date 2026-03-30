// frontend/src/components/background/LiquidChrome.jsx
// ──────────────────────────────────────────────────
// Liquid chrome / metallic fluid background.
// Inspired by Apple's iPhone Pro titanium reveal,
// Samsung Galaxy Z Fold animations, and Google Pixel's
// adaptive color engine.

import { motion } from "framer-motion";

const blobs = [
  {
    w: 500, h: 500,
    x: "10%", y: "5%",
    borderRadius: "40% 60% 65% 35% / 45% 55% 45% 55%",
    morphTo: [
      "40% 60% 65% 35% / 45% 55% 45% 55%",
      "55% 45% 35% 65% / 60% 40% 55% 45%",
      "45% 55% 50% 50% / 35% 65% 40% 60%",
      "40% 60% 65% 35% / 45% 55% 45% 55%",
    ],
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.15), rgba(6,182,212,0.1))",
    dur: 14,
    delay: 0,
  },
  {
    w: 420, h: 420,
    x: "55%", y: "15%",
    borderRadius: "55% 45% 40% 60% / 50% 50% 55% 45%",
    morphTo: [
      "55% 45% 40% 60% / 50% 50% 55% 45%",
      "45% 55% 60% 40% / 40% 60% 45% 55%",
      "60% 40% 45% 55% / 55% 45% 50% 50%",
      "55% 45% 40% 60% / 50% 50% 55% 45%",
    ],
    gradient: "linear-gradient(225deg, rgba(139,92,246,0.2), rgba(236,72,153,0.12), rgba(99,102,241,0.08))",
    dur: 18,
    delay: 3,
  },
  {
    w: 380, h: 380,
    x: "30%", y: "55%",
    borderRadius: "50% 50% 45% 55% / 55% 45% 50% 50%",
    morphTo: [
      "50% 50% 45% 55% / 55% 45% 50% 50%",
      "40% 60% 55% 45% / 45% 55% 60% 40%",
      "60% 40% 40% 60% / 50% 50% 45% 55%",
      "50% 50% 45% 55% / 55% 45% 50% 50%",
    ],
    gradient: "linear-gradient(315deg, rgba(6,182,212,0.2), rgba(99,102,241,0.12), rgba(192,193,255,0.08))",
    dur: 16,
    delay: 6,
  },
  {
    w: 300, h: 300,
    x: "70%", y: "60%",
    borderRadius: "45% 55% 55% 45% / 60% 40% 45% 55%",
    morphTo: [
      "45% 55% 55% 45% / 60% 40% 45% 55%",
      "55% 45% 45% 55% / 40% 60% 55% 45%",
      "50% 50% 60% 40% / 55% 45% 40% 60%",
      "45% 55% 55% 45% / 60% 40% 45% 55%",
    ],
    gradient: "linear-gradient(180deg, rgba(192,193,255,0.15), rgba(139,92,246,0.08), transparent)",
    dur: 20,
    delay: 2,
  },
];

/**
 * LiquidChrome
 * Renders morphing, fluid blobs with chrome-like gradients.
 * Creates a premium liquid metal aesthetic.
 *
 * @param {object}  props
 * @param {boolean} props.contained – absolute vs fixed
 * @param {string}  props.className – extra classes
 */
export default function LiquidChrome({ contained = false, className = "" }) {
  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: blob.w,
            height: blob.h,
            left: blob.x,
            top: blob.y,
            background: blob.gradient,
            filter: "blur(60px)",
          }}
          animate={{
            borderRadius: blob.morphTo,
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: blob.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}

      {/* Chrome specular highlights */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          top: "25%",
          left: "30%",
          background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.06), transparent 60%)",
          filter: "blur(20px)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 15, 0],
          opacity: [0.5, 0.8, 0.4, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 150,
          height: 150,
          top: "60%",
          left: "65%",
          background: "radial-gradient(circle at 40% 30%, rgba(255,255,255,0.04), transparent 60%)",
          filter: "blur(15px)",
        }}
        animate={{
          x: [0, -25, 35, 0],
          y: [0, 20, -25, 0],
          opacity: [0.4, 0.7, 0.3, 0.4],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 25%, var(--bg-primary) 85%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
