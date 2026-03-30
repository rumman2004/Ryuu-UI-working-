// frontend/src/components/background/WaveBackground.jsx
// ──────────────────────────────────────────────────────
// Animated layered wave background using SVG paths.
// Think Apple Music gradients, Spotify Wrapped,
// and Google Material You fluid forms.

import { motion } from "framer-motion";

const layers = [
  {
    paths: [
      "M0,320 C180,220 360,420 540,300 C720,180 900,400 1080,280 C1260,160 1440,340 1440,340 L1440,900 L0,900 Z",
      "M0,360 C200,260 380,460 560,320 C740,200 920,380 1100,300 C1280,220 1440,380 1440,380 L1440,900 L0,900 Z",
      "M0,320 C180,220 360,420 540,300 C720,180 900,400 1080,280 C1260,160 1440,340 1440,340 L1440,900 L0,900 Z",
    ],
    color: "99,102,241",
    opacity: 0.06,
    duration: 12,
  },
  {
    paths: [
      "M0,400 C200,310 400,500 600,380 C800,260 1000,440 1200,360 C1320,300 1440,400 1440,400 L1440,900 L0,900 Z",
      "M0,440 C220,350 440,520 660,400 C820,300 1020,460 1220,380 C1340,320 1440,430 1440,430 L1440,900 L0,900 Z",
      "M0,400 C200,310 400,500 600,380 C800,260 1000,440 1200,360 C1320,300 1440,400 1440,400 L1440,900 L0,900 Z",
    ],
    color: "139,92,246",
    opacity: 0.05,
    duration: 16,
  },
  {
    paths: [
      "M0,480 C240,400 480,560 720,460 C960,360 1200,520 1440,460 L1440,900 L0,900 Z",
      "M0,520 C260,430 500,580 740,490 C980,380 1220,540 1440,490 L1440,900 L0,900 Z",
      "M0,480 C240,400 480,560 720,460 C960,360 1200,520 1440,460 L1440,900 L0,900 Z",
    ],
    color: "6,182,212",
    opacity: 0.04,
    duration: 20,
  },
];

/**
 * WaveBackground
 * Renders layered, morphing SVG waves with different speeds and opacities.
 *
 * @param {object}  props
 * @param {boolean} props.contained – absolute instead of fixed
 * @param {string}  props.className – extra classes
 * @param {string}  props.position  – "bottom" (default) or "top"
 */
export default function WaveBackground({
  contained = false,
  className = "",
  position = "bottom",
}) {
  const isTop = position === "top";

  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={isTop ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "65%" }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {layers.map((l, i) => (
            <linearGradient key={i} id={`wg-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(${l.color},${l.opacity * 4})`} />
              <stop offset="100%" stopColor={`rgba(${l.color},0)`} />
            </linearGradient>
          ))}
        </defs>

        {layers.map((layer, i) => (
          <motion.path
            key={i}
            fill={`url(#wg-${i})`}
            animate={{ d: layer.paths }}
            transition={{
              duration: layer.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ opacity: layer.opacity * 10 }}
          />
        ))}
      </svg>

      {/* Accent glow at the wave crest */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          x: ["-5%", "5%", "-5%"],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          bottom: "30%",
          left: "30%",
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
