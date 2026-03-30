// frontend/src/components/ui/LivePreview.jsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "../../context/ThemeContext";
import PreviewFrame from "./PreviewFrame";
import { RefreshCw, Maximize2, Minimize2, AlertCircle } from "lucide-react";

export default function LivePreview({ variant, viewMode = "desktop" }) {
  const { isDark } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const wrapperStyle = {
    width: viewMode === "mobile" ? "390px" : "100%",
    margin: viewMode === "mobile" ? "0 auto" : "0",
    transition: "width 0.4s ease",
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (!variant) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-48 rounded-2xl border-2 border-dashed"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
          color: "var(--text-secondary)"
        }}
      >
        <AlertCircle size={32} className="mb-3 opacity-50" />
        <p className="text-sm font-medium">No preview available</p>
        <p className="text-xs mt-1">Select a component variant to see the preview</p>
      </motion.div>
    );
  }

  if (variant.language === "html") {
    const srcdoc = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              margin: 0;
              padding: 24px;
              font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
              background: ${isDark ? '#0f172a' : '#ffffff'};
              color: ${isDark ? '#f8fafc' : '#0f172a'};
              min-height: 100vh;
            }
            * {
              box-sizing: border-box;
            }
            ${variant.cssCode || ""}
          </style>
        </head>
        <body>
          <div id="component-root">
            ${variant.code}
          </div>
          <script>
            ${variant.jsCode || ""}
          </script>
        </body>
      </html>
    `;

    return (
      <motion.div
        layout
        style={wrapperStyle}
        className="relative group"
      >
        {/* Controls */}
        <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            title="Refresh preview"
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </motion.button>
        </div>

        <AnimatePresence>
          <motion.div
            key={isFullscreen ? 'fullscreen' : 'normal'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PreviewFrame
              srcdoc={srcdoc}
              height={isFullscreen ? "600px" : "480px"}
              isFullscreen={isFullscreen}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }

  // Clean and prepare React component code for Sandpack
  const cleanReactCode = (code) => {
    if (!code) return code;

    // Remove CSS imports
    let cleanedCode = code.replace(/import\s+['"`].*\.css['"`];?\s*/g, '');

    // Remove empty lines that might be left after import removal
    cleanedCode = cleanedCode.replace(/^\s*$/gm, '').trim();

    // If there is no default export, map first named export to default
    if (!/export\s+default/.test(cleanedCode)) {
      const namedExport = cleanedCode.match(/export\s+(?:const|let|var|function|class)\s+([A-Za-z_$][A-Za-z0-9_$]*)/);
      if (namedExport && namedExport[1]) {
        cleanedCode += `\n\nexport default ${namedExport[1]};`;
      } else {
        // Fallback: if file contains a component function or const definition, use that
        const functionName = cleanedCode.match(/function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/);
        if (functionName && functionName[1]) {
          cleanedCode += `\n\nexport default ${functionName[1]};`;
        }
      }
    }

    return cleanedCode;
  };

  // React component preview using Sandpack
  const sandpackFiles = {
    "/App.js": `
import React from 'react';
import Component from './Component';
import './styles.css';

const SafeComponent = Component && Component.$$typeof ? Component : Component;

export default function App() {
  if (!Component) {
    return <div style={{ color: '#f00' }}>React component not found</div>;
  }

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: '${isDark ? '#0f172a' : '#ffffff'}', color: '${isDark ? '#f8fafc' : '#0f172a'}' }}>
      <SafeComponent />
    </div>
  );
}
`,
    "/Component.js": cleanReactCode(variant.code),
    "/styles.css": `
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/base.css';
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/components.css';
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/utilities.css';

body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

${variant.cssCode || ""}
`,
  };

  const sandpackOptions = {
    showPreview: true,
    showLineNumbers: false,
    showTabs: false,
    editorHeight: isFullscreen ? 600 : 480,
    externalResources: ["https://cdn.tailwindcss.com"],
  };

  const sandpackTheme = isDark ? "dark" : "light";

  return (
    <motion.div
      layout
      style={wrapperStyle}
      className="relative group"
    >
      {/* Controls */}
      <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="p-2 rounded-lg bg-slate-800/90 backdrop-blur-sm shadow-lg hover:bg-slate-700 text-white transition-colors"
          title="Refresh preview"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded-lg bg-slate-800/90 backdrop-blur-sm shadow-lg hover:bg-slate-700 text-white transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </motion.button>
      </div>

      <AnimatePresence>
        <motion.div
          key={isFullscreen ? 'fullscreen' : 'normal'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl overflow-hidden border shadow-lg"
          style={{
            borderColor: "var(--border-color)",
            height: isFullscreen ? "600px" : "480px"
          }}
        >
          <Sandpack
            template="react"
            files={sandpackFiles}
            options={sandpackOptions}
            theme={sandpackTheme}
            className="rounded-2xl"
            onError={(error) => {
              console.error('Sandpack error:', error);
              setError(error.message);
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>Preview Error: {error}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}