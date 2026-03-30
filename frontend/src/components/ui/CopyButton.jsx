// frontend/src/components/ui/CopyButton.jsx

import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCopyCode }  from "../../hooks/useCopyCode";

export default function CopyButton({ code, componentId, className = "" }) {
  const { copied, copy } = useCopyCode(componentId);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => copy(code)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${className}`}
      style={{
        backgroundColor: copied ? "#22c55e15" : "var(--bg-secondary)",
        borderColor:     copied ? "#22c55e"   : "var(--border-color)",
        color:           copied ? "#22c55e"   : "var(--text-secondary)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{   scale: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {copied
            ? <Check size={12} />
            : <Copy  size={12} />
          }
        </motion.span>
      </AnimatePresence>
      {copied ? "Copied!" : "Copy"}
    </motion.button>
  );
}