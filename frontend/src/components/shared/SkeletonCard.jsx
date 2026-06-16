// frontend/src/components/shared/SkeletonCard.jsx

import { motion } from "framer-motion";

function Bone({ w = "100%", h = "12px", r = "6px" }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: "var(--bg-elevated)",
      animation: "skeleton-pulse 1.8s ease-in-out infinite",
      flexShrink: 0,
    }} />
  );
}

export default function SkeletonCard({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      {/* Preview skeleton */}
      <div style={{
        height: "196px", background: "var(--bg-elevated)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: "12px", position: "relative", overflow: "hidden",
      }}>
        {/* Shimmer sweep */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.025), transparent)",
          }}
        />

        {/* Center icon placeholder */}
        <div style={{
          width: "56px", height: "56px", borderRadius: "16px",
          background: "var(--bg-float)", border: "1px solid var(--border-subtle)",
          animation: "skeleton-pulse 1.8s ease-in-out infinite",
        }} />
        <Bone w="80px" h="8px" r="4px" />
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <Bone w="55%" h="13px" />
          <Bone w="20%" h="20px" r="7px" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Bone w="100%" h="10px" />
          <Bone w="72%" h="10px" />
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          <Bone w="48px" h="20px" r="6px" />
          <Bone w="56px" h="20px" r="6px" />
          <Bone w="40px" h="20px" r="6px" />
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "12px", borderTop: "1px solid var(--border-subtle)",
        }}>
          <Bone w="36px" h="10px" />
          <Bone w="36px" h="10px" />
          <Bone w="60px" h="10px" />
        </div>
      </div>
    </motion.div>
  );
}