// frontend/src/components/layout/ThemeToggle.jsx

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon }               from "lucide-react";
import { useTheme }                from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:border-indigo-500 hover:bg-indigo-500/10"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{   rotate:  90,  opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark
            ? <Sun  size={16} className="text-amber-400" />
            : <Moon size={16} className="text-indigo-500" />
          }
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}