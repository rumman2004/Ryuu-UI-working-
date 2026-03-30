// frontend/src/components/ui/CodeBlock.jsx

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight }           from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme }                    from "../../context/ThemeContext";
import CopyButton                      from "./CopyButton";

export default function CodeBlock({ code, language = "jsx", componentId }) {
  const { isDark } = useTheme();

  const langMap = { react: "jsx", html: "html", css: "css", javascript: "javascript" };
  const syntaxLang = langMap[language] ?? language;

  const langLabel = {
    react:      "React · JSX",
    html:       "HTML",
    css:        "CSS",
    javascript: "JavaScript",
  }[language] ?? language.toUpperCase();

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--border-color)" }}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ backgroundColor: isDark ? "#0d1424" : "#f1f5f9" }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {langLabel}
          </span>
        </div>
        <CopyButton code={code} componentId={componentId} />
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={syntaxLang}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          margin:     0,
          padding:    "1.25rem",
          fontSize:   "0.8rem",
          maxHeight:  "450px",
          overflow:   "auto",
          background: isDark ? "#0d1424" : "#ffffff",
        }}
        showLineNumbers
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}