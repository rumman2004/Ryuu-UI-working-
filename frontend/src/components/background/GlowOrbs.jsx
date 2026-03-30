// frontend/src/components/background/GlowOrbs.jsx
// ──────────────────────────────────────────────────
// Floating glow orbs with glassmorphic halos.
// Inspired by Google Material You's dynamic color system,
// Apple's AirPods Pro product page, and Samsung One UI.

import { motion } from "framer-motion";

const orbs = [
  {
    size: 320,
    color: "99,102,241",
    x: "10%",
    y: "15%",
    animate: {
      x: [0, 60, -40, 0],
      y: [0, -50, 30, 0],
      scale: [1, 1.2, 0.85, 1],
    },
    dur: 14,
    delay: 0,
  },
  {
    size: 260,
    color: "139,92,246",
    x: "70%",
    y: "10%",
    animate: {
      x: [0, -50, 30, 0],
      y: [0, 40, -25, 0],
      scale: [1, 0.9, 1.15, 1],
    },
    dur: 18,
    delay: 3,
  },
  {
    size: 280,
    color: "6,182,212",
    x: "55%",
    y: "60%",
    animate: {
      x: [0, 35, -45, 0],
      y: [0, -30, 40, 0],
      scale: [1, 1.1, 0.95, 1],
    },
    dur: 16,
    delay: 5,
  },
  {
    size: 200,
    color: "236,72,153",
    x: "20%",
    y: "70%",
    animate: {
      x: [0, -25, 50, 0],
      y: [0, 35, -20, 0],
      scale: [1, 1.15, 0.9, 1],
    },
    dur: 20,
    delay: 2,
  },
  {
    size: 180,
    color: "192,193,255",
    x: "85%",
    y: "50%",
    animate: {
      x: [0, 20, -35, 0],
      y: [0, -20, 30, 0],
      scale: [1, 0.95, 1.1, 1],
    },
    dur: 22,
    delay: 7,
  },
];

/**
 * GlowOrbs
 * Renders floating, breathing orbs with dual-layer glow —
 * an inner core and an outer halo — for extraordinary depth.
 *
 * @param {object}  props
 * @param {boolean} props.contained – absolute vs fixed
 * @param {string}  props.className – extra classes
 */
export default function GlowOrbs({ contained = false, className = "" }) {
  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: orb.x, top: orb.y }}
          animate={orb.animate}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        >
          {/* Outer halo */}
          <div
            className="absolute rounded-full"
            style={{
              width: orb.size * 1.8,
              height: orb.size * 1.8,
              top: -(orb.size * 0.4),
              left: -(orb.size * 0.4),
              background: `radial-gradient(circle, rgba(${orb.color},0.06), transparent 60%)`,
              filter: "blur(40px)",
            }}
          />

          {/* Inner core */}
          <div
            className="rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle at 40% 40%, rgba(${orb.color},0.35), rgba(${orb.color},0.08) 50%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />

          {/* Specular highlight */}
          <div
            className="absolute rounded-full"
            style={{
              width: orb.size * 0.3,
              height: orb.size * 0.3,
              top: orb.size * 0.15,
              left: orb.size * 0.2,
              background: `radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)`,
              filter: "blur(10px)",
            }}
          />
        </motion.div>
      ))}

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 25%, var(--bg-primary) 90%)",
        }}
      />
    </div>
  );
}
