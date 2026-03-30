// frontend/src/components/background/GradientOrbit.jsx
// ────────────────────────────────────────────────────
// Orbital gradient rings that rotate around a central point.
// Inspired by Samsung Galaxy ring animations, Apple Watch faces,
// and Google Pixel's "At a Glance" widget background.

import { motion } from "framer-motion";

const rings = [
  {
    size: 600,
    border: 1,
    color: "99,102,241",
    opacity: 0.12,
    dur: 30,
    direction: 1,
    offset: { x: "50%", y: "50%" },
  },
  {
    size: 480,
    border: 0.8,
    color: "139,92,246",
    opacity: 0.1,
    dur: 25,
    direction: -1,
    offset: { x: "50%", y: "50%" },
  },
  {
    size: 350,
    border: 0.6,
    color: "6,182,212",
    opacity: 0.08,
    dur: 20,
    direction: 1,
    offset: { x: "50%", y: "50%" },
  },
  {
    size: 240,
    border: 1.2,
    color: "192,193,255",
    opacity: 0.06,
    dur: 15,
    direction: -1,
    offset: { x: "50%", y: "50%" },
  },
];

const orbitDots = [
  { ring: 0, angle: 0, size: 5, color: "99,102,241", glow: 20 },
  { ring: 0, angle: 180, size: 3, color: "163,166,255", glow: 12 },
  { ring: 1, angle: 90, size: 4, color: "139,92,246", glow: 16 },
  { ring: 1, angle: 270, size: 3, color: "172,138,255", glow: 10 },
  { ring: 2, angle: 45, size: 4, color: "6,182,212", glow: 14 },
  { ring: 2, angle: 225, size: 2.5, color: "103,232,249", glow: 10 },
  { ring: 3, angle: 135, size: 3.5, color: "192,193,255", glow: 12 },
];

/**
 * GradientOrbit
 * Renders concentric orbital rings with traveling dots.
 *
 * @param {object}  props
 * @param {boolean} props.contained – absolute vs fixed
 * @param {string}  props.className – extra classes
 */
export default function GradientOrbit({ contained = false, className = "" }) {
  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Orbital rings */}
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.size,
            height: ring.size,
            top: `calc(${ring.offset.y} - ${ring.size / 2}px)`,
            left: `calc(${ring.offset.x} - ${ring.size / 2}px)`,
            border: `${ring.border}px solid rgba(${ring.color},${ring.opacity})`,
            boxShadow: `
              0 0 20px rgba(${ring.color},${ring.opacity * 0.3}),
              inset 0 0 20px rgba(${ring.color},${ring.opacity * 0.1})
            `,
          }}
          animate={{
            rotate: ring.direction > 0 ? [0, 360] : [360, 0],
          }}
          transition={{
            duration: ring.dur,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Dots on this ring */}
          {orbitDots
            .filter((d) => d.ring === i)
            .map((dot, j) => {
              const rad = (dot.angle * Math.PI) / 180;
              const dx = Math.cos(rad) * (ring.size / 2);
              const dy = Math.sin(rad) * (ring.size / 2);
              return (
                <motion.div
                  key={j}
                  className="absolute rounded-full"
                  style={{
                    width: dot.size * 2,
                    height: dot.size * 2,
                    top: `calc(50% + ${dy}px - ${dot.size}px)`,
                    left: `calc(50% + ${dx}px - ${dot.size}px)`,
                    background: `rgba(${dot.color},0.8)`,
                    boxShadow: `0 0 ${dot.glow}px rgba(${dot.color},0.5)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: j * 0.5,
                  }}
                />
              );
            })}
        </motion.div>
      ))}

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 15%, var(--bg-primary) 75%)",
        }}
      />
    </div>
  );
}
