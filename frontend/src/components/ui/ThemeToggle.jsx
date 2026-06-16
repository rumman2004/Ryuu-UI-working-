// frontend/src/components/ui/ThemeToggle.jsx

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon }               from "lucide-react";
import { useTheme }                from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className="relative w-9 h-9 flex items-center justify-center overflow-hidden"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-medium)",
        borderRadius: "11px",
        transition: "border-color 0.25s ease, background 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--gold-border)";
        e.currentTarget.style.background = "var(--gold-muted)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-medium)";
        e.currentTarget.style.background = "var(--bg-elevated)";
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Ambient glow behind icon */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at center, rgba(99,102,241,0.08), transparent 70%)"
            : "radial-gradient(circle at center, rgba(99,102,241,0.08), transparent 70%)",
          transition: "background 0.4s ease",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: isDark ? -60 : 60, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: isDark ? 60 : -60, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative z-10"
        >
          {isDark
            ? <Sun  size={15} style={{ color: "var(--gold)" }} />
            : <Moon size={15} style={{ color: "#818CF8" }} />
          }
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}