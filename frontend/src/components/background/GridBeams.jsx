// frontend/src/components/background/GridBeams.jsx
// ─────────────────────────────────────────────────
// Animated grid with sweeping beam highlights.
// Inspired by Vercel's dashboard, Samsung Developer site,
// and Apple WWDC stage visuals.

import { motion } from "framer-motion";

/**
 * GridBeams
 * Renders a subtle perspective grid with animated light beams
 * sweeping across — gives an immersive, futuristic feel.
 *
 * @param {object}  props
 * @param {boolean} props.contained – absolute vs fixed
 * @param {string}  props.className – extra classes
 * @param {string}  props.beamColor – CSS color of beams (default: indigo)
 */
export default function GridBeams({
  contained = false,
  className = "",
  beamColor = "99,102,241",
}) {
  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Perspective grid */}
      <div
        className="absolute inset-0"
        style={{
          perspective: "800px",
          perspectiveOrigin: "50% 40%",
        }}
      >
        <div
          className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
          style={{
            transform: "rotateX(55deg)",
            backgroundImage: `
              linear-gradient(to right,  rgba(${beamColor},0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(${beamColor},0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 80%)",
          }}
        />
      </div>

      {/* Horizontal sweep beams */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 w-full"
          style={{
            height: "1px",
            top: `${25 + i * 25}%`,
            background: `linear-gradient(90deg, transparent, rgba(${beamColor},0.25) 40%, rgba(${beamColor},0.5) 50%, rgba(${beamColor},0.25) 60%, transparent)`,
            boxShadow: `0 0 20px 2px rgba(${beamColor},0.15)`,
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2.5,
          }}
        />
      ))}

      {/* Vertical sweep beams */}
      {[0, 1].map((i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 h-full"
          style={{
            width: "1px",
            left: `${35 + i * 30}%`,
            background: `linear-gradient(180deg, transparent, rgba(${beamColor},0.2) 40%, rgba(${beamColor},0.4) 50%, rgba(${beamColor},0.2) 60%, transparent)`,
            boxShadow: `0 0 16px 1px rgba(${beamColor},0.1)`,
          }}
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3,
          }}
        />
      ))}

      {/* Corner glow spots */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
        style={{
          background: `radial-gradient(ellipse, rgba(${beamColor},0.12), transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full"
        style={{
          background: `radial-gradient(ellipse, rgba(139,92,246,0.08), transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
