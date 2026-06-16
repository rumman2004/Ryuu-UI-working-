// frontend/src/components/ui/CopyButton.jsx

import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCopyCode } from "../../hooks/useCopyCode";

export default function CopyButton({ code, componentId, className = "" }) {
  const { copied, copy } = useCopyCode(componentId);

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => copy(code)}
      className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold overflow-hidden ${className}`}
      style={{
        background: copied
          ? "rgba(16,185,129,0.1)"
          : "var(--bg-float)",
        border: copied
          ? "1px solid rgba(16,185,129,0.3)"
          : "1px solid var(--border-medium)",
        color: copied ? "#34D399" : "var(--text-secondary)",
        borderRadius: "9px",
        transition: "all 0.25s ease",
      }}
    >
      {/* Shimmer on copy */}
      <AnimatePresence>
        {copied && (
          <motion.div
            key="shimmer"
            initial={{ x: "-100%", opacity: 0.6 }}
            animate={{ x: "200%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.15), transparent)",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.5, opacity: 0, rotate: copied ? -15 : 15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </motion.span>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.span
          key={copied ? "copied-label" : "copy-label"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          {copied ? "Copied!" : "Copy"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}