// frontend/src/components/background/AnimatedPaper.jsx
// ────────────────────────────────────────────────────
// Subtle animated paper-fold / depth background.
// Inspired by Google Material Design 3 elevation system,
// Samsung One UI layered surfaces, and Apple's frosted layers.

import { motion } from "framer-motion";

const layers = [
  {
    rotate: -3,
    x: "-8%",
    y: "-5%",
    w: "75%",
    h: "65%",
    color: "99,102,241",
    opacity: 0.03,
    animate: { rotate: [-3, -1, -3], y: ["-5%", "-3%", "-5%"] },
    dur: 18,
  },
  {
    rotate: 2,
    x: "25%",
    y: "15%",
    w: "70%",
    h: "60%",
    color: "139,92,246",
    opacity: 0.025,
    animate: { rotate: [2, 4, 2], y: ["15%", "18%", "15%"] },
    dur: 22,
  },
  {
    rotate: -1.5,
    x: "5%",
    y: "40%",
    w: "60%",
    h: "55%",
    color: "6,182,212",
    opacity: 0.02,
    animate: { rotate: [-1.5, 0.5, -1.5], x: ["5%", "8%", "5%"] },
    dur: 20,
  },
  {
    rotate: 1,
    x: "35%",
    y: "-10%",
    w: "55%",
    h: "50%",
    color: "192,193,255",
    opacity: 0.02,
    animate: { rotate: [1, 3, 1], x: ["35%", "32%", "35%"] },
    dur: 24,
  },
];

const folds = [
  { angle: 15, x: "20%", y: "30%", w: 400, color: "99,102,241", dur: 14, delay: 0 },
  { angle: -10, x: "60%", y: "50%", w: 350, color: "139,92,246", dur: 16, delay: 4 },
  { angle: 8, x: "40%", y: "70%", w: 300, color: "6,182,212", dur: 18, delay: 2 },
];

/**
 * AnimatedPaper
 * Renders layered, slightly rotated translucent paper sheets
 * with fold-creases and soft shadows — creating a tactile,
 * Material-Design-inspired depth effect.
 *
 * @param {object}  props
 * @param {boolean} props.contained – absolute vs fixed
 * @param {string}  props.className – extra classes
 */
export default function AnimatedPaper({ contained = false, className = "" }) {
  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Floating paper layers */}
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute rounded-3xl"
          style={{
            left: layer.x,
            top: layer.y,
            width: layer.w,
            height: layer.h,
            background: `linear-gradient(
              135deg,
              rgba(${layer.color},${layer.opacity * 2}) 0%,
              rgba(${layer.color},${layer.opacity}) 40%,
              rgba(${layer.color},${layer.opacity * 0.5}) 100%
            )`,
            border: `1px solid rgba(${layer.color},0.04)`,
            backdropFilter: "blur(1px)",
            boxShadow: `
              0 4px 30px rgba(${layer.color},0.02),
              inset 0 1px 0 rgba(255,255,255,0.02)
            `,
          }}
          animate={layer.animate}
          transition={{
            duration: layer.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Fold crease lines */}
      {folds.map((fold, i) => (
        <motion.div
          key={`fold-${i}`}
          className="absolute"
          style={{
            left: fold.x,
            top: fold.y,
            width: fold.w,
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(${fold.color},0.06) 30%, rgba(${fold.color},0.1) 50%, rgba(${fold.color},0.06) 70%, transparent)`,
            transform: `rotate(${fold.angle}deg)`,
            transformOrigin: "center",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleX: [1, 1.1, 1],
          }}
          transition={{
            duration: fold.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: fold.delay,
          }}
        />
      ))}

      {/* Ambient light gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 30% 20%, rgba(99,102,241,0.04), transparent),
            radial-gradient(ellipse 40% 35% at 70% 70%, rgba(139,92,246,0.03), transparent)
          `,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--bg-primary) 90%)",
        }}
      />
    </div>
  );
}
