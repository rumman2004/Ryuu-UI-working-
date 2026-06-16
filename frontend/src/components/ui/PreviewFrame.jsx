// frontend/src/components/ui/PreviewFrame.jsx
// Clean "stage" preview — sandboxed iframe on a neutral canvas (prebuiltui-style).

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { RotateCcw, ExternalLink, AlertTriangle } from "lucide-react";

export default function PreviewFrame({
  srcdoc,
  height = "480px",
  width = "100%",
}) {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef(null);

  const handleLoad = () => { setIsLoading(false); setHasError(false); };
  const handleError = () => { setIsLoading(false); setHasError(true); };

  const refreshPreview = () => {
    setIsLoading(true);
    setHasError(false);
    setRefreshKey((k) => k + 1);
  };

  const openInTab = () => {
    const blob = new Blob([srcdoc], { type: "text/html" });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--border-soft)",
        borderRadius: "16px",
      }}
    >
      {/* Minimal control cluster — top-right, no fake browser chrome */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1">
        <button
          onClick={refreshPreview}
          title="Refresh preview"
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-soft)",
            color: "var(--text-muted)",
          }}
        >
          <RotateCcw size={13} />
        </button>
        <button
          onClick={openInTab}
          title="Open in new tab"
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-soft)",
            color: "var(--text-muted)",
          }}
        >
          <ExternalLink size={13} />
        </button>
      </div>

      {/* Stage / canvas */}
      <div
        className="relative"
        style={{ height, width, background: isDark ? "#0f0f11" : "#ffffff", overflow: "hidden" }}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
              style={{ background: isDark ? "#0f0f11" : "#fafafa" }}
            >
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-full" style={{ border: "2px solid var(--border-soft)" }} />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "2px solid transparent", borderTopColor: "var(--accent)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Rendering preview…
              </p>
            </motion.div>
          )}

          {hasError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center z-10"
              style={{ background: "var(--bg-elevated)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <AlertTriangle size={22} style={{ color: "#F87171" }} />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                  Preview unavailable
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Security restrictions or invalid markup
                </p>
              </div>
              <button
                onClick={refreshPreview}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl"
                style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
              >
                <RotateCcw size={12} /> Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <iframe
          key={refreshKey}
          ref={iframeRef}
          srcDoc={srcdoc}
          title="Component Preview"
          sandbox="allow-scripts allow-same-origin"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: isLoading || hasError ? "none" : "block",
            background: isDark ? "#0f0f11" : "#ffffff",
          }}
        />
      </div>
    </div>
  );
}
