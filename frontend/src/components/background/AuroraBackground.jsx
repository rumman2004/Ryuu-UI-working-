// frontend/src/components/background/AuroraBackground.jsx
// ────────────────────────────────────────────────────────
// Premium aurora-borealis animated background.
// Inspired by Apple / Linear / Vercel landing pages.
// Usage: <AuroraBackground /> — renders as a full-screen fixed layer behind content.

import { motion } from "framer-motion";

const blobs = [
  {
    gradient:
      "radial-gradient(circle at 30% 40%, rgba(99,102,241,0.45), rgba(99,102,241,0.05) 55%, transparent 70%)",
    size: 700,
    animate: {
      x: [0, 80, -40, 0],
      y: [0, -60, 40, 0],
      scale: [1, 1.25, 0.95, 1],
      opacity: [0.25, 0.4, 0.2, 0.25],
    },
    duration: 18,
    blur: 100,
  },
  {
    gradient:
      "radial-gradient(circle at 70% 60%, rgba(139,92,246,0.4), rgba(139,92,246,0.04) 55%, transparent 70%)",
    size: 600,
    animate: {
      x: [0, -60, 50, 0],
      y: [0, 50, -40, 0],
      scale: [1, 1.15, 1.1, 1],
      opacity: [0.2, 0.35, 0.18, 0.2],
    },
    duration: 22,
    blur: 110,
  },
  {
    gradient:
      "radial-gradient(circle at 50% 20%, rgba(6,182,212,0.3), rgba(6,182,212,0.03) 50%, transparent 70%)",
    size: 500,
    animate: {
      x: [0, 40, -30, 0],
      y: [0, 30, -50, 0],
      scale: [1, 1.1, 1.2, 1],
      opacity: [0.15, 0.28, 0.12, 0.15],
    },
    duration: 16,
    blur: 90,
  },
  {
    gradient:
      "radial-gradient(circle at 80% 30%, rgba(236,72,153,0.2), rgba(236,72,153,0.02) 50%, transparent 70%)",
    size: 420,
    animate: {
      x: [0, -35, 25, 0],
      y: [0, -25, 35, 0],
      scale: [1, 1.18, 0.9, 1],
      opacity: [0.1, 0.22, 0.08, 0.1],
    },
    duration: 20,
    blur: 80,
  },
  {
    gradient:
      "radial-gradient(circle at 20% 70%, rgba(192,193,255,0.18), transparent 60%)",
    size: 380,
    animate: {
      x: [0, 50, -20, 0],
      y: [0, -35, 20, 0],
      scale: [1, 1.08, 1.15, 1],
      opacity: [0.08, 0.18, 0.06, 0.08],
    },
    duration: 24,
    blur: 70,
  },
];

/**
 * AuroraBackground
 * Renders drifting, blurred gradient orbs that create a cinematic aurora effect.
 *
 * @param {object}  props
 * @param {string}  props.className – additional classes for the wrapper
 * @param {boolean} props.contained – if true, uses `absolute` instead of `fixed`
 */
export default function AuroraBackground({ className = "", contained = false }) {
  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Animated blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full will-change-transform"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.gradient,
            filter: `blur(${blob.blur}px)`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 18}%`,
          }}
        />
      ))}

      {/* Base vignette overlay to fade edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, var(--bg-primary) 85%)",
        }}
      />

      {/* Fine noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
