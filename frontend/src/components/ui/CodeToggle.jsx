// frontend/src/components/ui/CodeToggle.jsx

import { motion } from "framer-motion";

const LANG_CONFIG = {
  react: { label: "React", dot: "#61DAFB" },
  html:  { label: "HTML",  dot: "#E34C26" },
  css:   { label: "CSS",   dot: "#264DE4" },
};

export default function CodeToggle({ active, onChange, available = ["react", "html"] }) {
  return (
    <div
      className="inline-flex items-center gap-1 p-1"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-soft)",
        borderRadius: "12px",
      }}
    >
      {available.map((lang) => {
        const cfg = LANG_CONFIG[lang] ?? { label: lang.toUpperCase(), dot: "#6366f1" };
        const isActive = active === lang;

        return (
          <button
            key={lang}
            onClick={() => onChange(lang)}
            className="relative flex items-center gap-2 px-4 py-1.5 text-xs font-semibold transition-colors"
            style={{
              borderRadius: "9px",
              color: isActive ? "var(--text-primary)" : "var(--text-muted)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="code-toggle-bg"
                className="absolute inset-0"
                style={{
                  background: "var(--bg-float)",
                  borderRadius: "9px",
                  border: "1px solid var(--border-medium)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: isActive ? cfg.dot : "var(--border-medium)",
                transition: "background 0.2s ease",
              }}
            />
            {cfg.label}
          </button>
        );
      })}
    </div>
  );
}