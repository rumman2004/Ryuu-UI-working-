// frontend/src/components/ui/PreviewFrame.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Monitor, Smartphone, RotateCcw, ExternalLink } from "lucide-react";

export default function PreviewFrame({
  srcdoc,
  height = "480px",
  width = "100%",
  isFullscreen = false
}) {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const refreshPreview = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload by changing key
    const iframe = document.querySelector('#preview-iframe');
    if (iframe) {
      iframe.srcdoc = '';
      setTimeout(() => {
        iframe.srcdoc = srcdoc;
      }, 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden border shadow-lg"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-card)"
      }}
    >
      {/* Browser Chrome Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          backgroundColor: isDark ? "#0d1424" : "#f8fafc",
          borderColor: "var(--border-color)"
        }}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
          </div>

          {/* URL Bar */}
          <div
            className="flex-1 max-w-md h-7 rounded-lg flex items-center px-3 text-xs border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)"
            }}
          >
            <span className="mr-2">🔒</span>
            <span className="truncate">uivault-preview.local</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshPreview}
            className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Refresh preview"
          >
            <RotateCcw size={14} style={{ color: "var(--text-secondary)" }} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Open in new tab"
            onClick={() => {
              const blob = new Blob([srcdoc], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              window.open(url, '_blank');
            }}
          >
            <ExternalLink size={14} style={{ color: "var(--text-secondary)" }} />
          </motion.button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="relative" style={{ height, backgroundColor: isDark ? "#0f172a" : "#ffffff" }}>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                Loading preview...
              </p>
            </div>
          </motion.div>
        )}

        {hasError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Preview Error
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Unable to load the component preview. This might be due to security restrictions or invalid HTML.
            </p>
            <button
              onClick={refreshPreview}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        <iframe
          id="preview-iframe"
          srcDoc={srcdoc}
          title="Component Preview"
          sandbox="allow-scripts allow-same-origin"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width,
            height: "100%",
            border: "none",
            display: isLoading || hasError ? "none" : "block",
            background: isDark ? "#0f172a" : "#ffffff",
          }}
        />
      </div>
    </motion.div>
  );
}