// frontend/src/components/ui/DownloadZip.jsx

import { Download, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { downloadComponentZip } from "../../utils/downloadZip";
import toast from "react-hot-toast";

export default function DownloadZip({ component, language }) {
  const [done, setDone] = useState(false);

  const handleDownload = () => {
    try {
      downloadComponentZip(component, language);
      setDone(true);
      toast.success("Downloaded as ZIP!");
      setTimeout(() => setDone(false), 2500);
    } catch {
      toast.error("Download failed");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleDownload}
      className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold overflow-hidden"
      style={{
        background: done ? "rgba(16,185,129,0.08)" : "var(--bg-elevated)",
        border: done ? "1px solid rgba(16,185,129,0.25)" : "1px solid var(--border-medium)",
        color: done ? "#34D399" : "var(--text-primary)",
        borderRadius: "12px",
        transition: "all 0.3s ease",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.06), transparent 70%)",
          borderRadius: "12px",
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
        onMouseLeave={(e) => e.currentTarget.style.opacity = "0"}
      />

      <AnimatePresence mode="wait">
        <motion.span
          key={done ? "done" : "dl"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative z-10"
        >
          {done
            ? <CheckCircle2 size={15} />
            : (
              <motion.div
                animate={done ? {} : { y: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Download size={15} />
              </motion.div>
            )
          }
        </motion.span>
      </AnimatePresence>

      <span className="relative z-10">
        {done ? "Downloaded!" : "Download ZIP"}
      </span>
    </motion.button>
  );
}