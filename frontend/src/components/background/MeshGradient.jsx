// frontend/src/components/background/MeshGradient.jsx
// ────────────────────────────────────────────────────
// Animated multi-stop mesh-gradient background.
// Similar to the premium aesthetic seen on Apple Music,
// Apple Vision Pro hero, and Samsung Galaxy Unpacked events.

import { motion } from "framer-motion";

const nodes = [
  { cx: "15%", cy: "20%", r: 500, color1: "#6366f1", color2: "#4f46e5", delay: 0,   dur: 20 },
  { cx: "75%", cy: "15%", r: 420, color1: "#8b5cf6", color2: "#7c3aed", delay: 4,   dur: 24 },
  { cx: "55%", cy: "70%", r: 450, color1: "#06b6d4", color2: "#0891b2", delay: 2,   dur: 18 },
  { cx: "30%", cy: "80%", r: 380, color1: "#ec4899", color2: "#db2777", delay: 6,   dur: 22 },
  { cx: "85%", cy: "55%", r: 350, color1: "#a78bfa", color2: "#8b5cf6", delay: 3,   dur: 16 },
  { cx: "50%", cy: "40%", r: 300, color1: "#c0c1ff", color2: "#a3a6ff", delay: 8,   dur: 26 },
];

/**
 * MeshGradient
 * An SVG-based mesh gradient that feels organic and fluid.
 *
 * @param {object}  props
 * @param {boolean} props.contained – absolute instead of fixed
 * @param {string}  props.className – extra classes
 * @param {number}  props.intensity – opacity multiplier 0–1 (default 0.45)
 */
export default function MeshGradient({ contained = false, className = "", intensity = 0.45 }) {
  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: intensity }}
      >
        <defs>
          {nodes.map((n, i) => (
            <radialGradient key={i} id={`mg-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={n.color1} stopOpacity="0.8" />
              <stop offset="50%" stopColor={n.color2} stopOpacity="0.3" />
              <stop offset="100%" stopColor={n.color2} stopOpacity="0" />
            </radialGradient>
          ))}
          <filter id="mg-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
          </filter>
        </defs>

        <g filter="url(#mg-blur)">
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill={`url(#mg-${i})`}
              animate={{
                cx: [n.cx, `${parseInt(n.cx) + 12}%`, `${parseInt(n.cx) - 8}%`, n.cx],
                cy: [n.cy, `${parseInt(n.cy) - 10}%`, `${parseInt(n.cy) + 8}%`, n.cy],
                r: [n.r, n.r * 1.15, n.r * 0.9, n.r],
              }}
              transition={{
                duration: n.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: n.delay,
              }}
            />
          ))}
        </g>
      </svg>

      {/* Top and bottom fade-out */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, var(--bg-primary), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      />
    </div>
  );
}
