// frontend/src/components/ui/CodeToggle.jsx

import { motion }  from "framer-motion";
import { Code2 }   from "lucide-react";

export default function CodeToggle({ active, onChange, available = ["react", "html"] }) {
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl border"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {available.includes("react") && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange("react")}
          className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{
            color: active === "react" ? "#ffffff" : "var(--text-secondary)",
          }}
        >
          {active === "react" && (
            <motion.div
              layoutId="code-toggle"
              className="absolute inset-0 rounded-lg bg-indigo-500"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          React
        </motion.button>
      )}
      {available.includes("html") && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange("html")}
          className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{
            color: active === "html" ? "#ffffff" : "var(--text-secondary)",
          }}
        >
          {active === "html" && (
            <motion.div
              layoutId="code-toggle"
              className="absolute inset-0 rounded-lg bg-indigo-500"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          HTML
        </motion.button>
      )}
    </div>
  );
}