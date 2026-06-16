// frontend/src/components/ui/LivePreview.jsx
// HTML/CSS/JS components render live in a clean stage. React components are
// code-only (shown via the Code tab) — no heavy Sandpack bundle.

import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import PreviewFrame from "./PreviewFrame";
import { AlertCircle, Code2 } from "lucide-react";

export default function LivePreview({ variant, viewMode = "desktop" }) {
  const { isDark } = useTheme();

  const wrapperStyle = {
    width: viewMode === "mobile" ? "390px" : "100%",
    margin: viewMode === "mobile" ? "0 auto" : "0",
    transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
  };

  // No variant selected
  if (!variant) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3"
        style={{
          height: "200px",
          background: "var(--bg-elevated)",
          border: "1px dashed var(--border-soft)",
          borderRadius: "16px",
          color: "var(--text-muted)",
        }}
      >
        <AlertCircle size={26} style={{ opacity: 0.4 }} />
        <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          No preview available
        </p>
      </div>
    );
  }

  // HTML / CSS / JS → live render in the stage
  if (variant.language === "html") {
    const srcdoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      margin: 0;
      padding: 28px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      background: ${isDark ? "#0f0f11" : "#ffffff"};
      color: ${isDark ? "#f2f0ed" : "#13120f"};
      min-height: 100vh;
      box-sizing: border-box;
    }
    *, *::before, *::after { box-sizing: border-box; }
    ${variant.cssCode || ""}
  </style>
</head>
<body>
  <div id="root">${variant.code}</div>
  <script>${variant.jsCode || ""}</script>
</body>
</html>`;

    return (
      <motion.div layout style={wrapperStyle}>
        <PreviewFrame srcdoc={srcdoc} height="480px" />
      </motion.div>
    );
  }

  // React → code-only (clean message, not an error)
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 text-center px-8"
      style={{
        height: "320px",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-soft)",
        borderRadius: "16px",
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: "var(--bg-float)", border: "1px solid var(--border-soft)" }}
      >
        <Code2 size={22} style={{ color: "var(--accent)" }} />
      </div>
      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
        React component
      </p>
      <p className="text-xs max-w-xs" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
        Copy the source from the <strong style={{ color: "var(--text-primary)" }}>Code</strong> tab
        and drop it into your React project.
      </p>
    </div>
  );
}
