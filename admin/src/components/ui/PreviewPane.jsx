// admin/src/components/ui/PreviewPane.jsx

import { useState }    from "react";
import { Monitor, Smartphone } from "lucide-react";
import { motion }      from "framer-motion";

export default function PreviewPane({ code, language = "html", cssCode = "", jsCode = "" }) {
  const [viewMode, setViewMode] = useState("desktop");

  const srcdoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <style>body{margin:0;padding:16px;font-family:system-ui,sans-serif;} ${cssCode}</style>
      </head>
      <body>
        ${language === "html" ? code : ""}
        <script>${jsCode}<\/script>
      </body>
    </html>
  `;

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#1e2535" }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ backgroundColor: "#0d1424", borderColor: "#1e2535" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/60"  />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-slate-500 ml-2">Preview</span>
        </div>

        {/* View mode toggle */}
        <div
          className="flex items-center gap-1 p-1 rounded-lg border"
          style={{ backgroundColor: "#0d1117", borderColor: "#1e2535" }}
        >
          {[
            { mode: "desktop", icon: Monitor    },
            { mode: "mobile",  icon: Smartphone },
          ].map(({ mode, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="relative p-1.5 rounded-md transition-all"
            >
              {viewMode === mode && (
                <motion.div
                  layoutId="preview-mode"
                  className="absolute inset-0 rounded-md bg-indigo-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={13}
                className="relative z-10 transition-colors"
                style={{ color: viewMode === mode ? "#fff" : "#64748b" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Frame */}
      <div className="flex items-center justify-center p-4" style={{ backgroundColor: "#111827" }}>
        <iframe
          srcDoc={srcdoc}
          title="Preview"
          sandbox="allow-scripts"
          style={{
            width:      viewMode === "mobile" ? "390px" : "100%",
            height:     "360px",
            border:     "none",
            borderRadius: "8px",
            background: "#ffffff",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}