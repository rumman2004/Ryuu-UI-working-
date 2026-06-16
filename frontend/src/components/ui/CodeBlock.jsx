// frontend/src/components/ui/CodeBlock.jsx

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight }           from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme }                    from "../../context/ThemeContext";
import CopyButton                      from "./CopyButton";

const LANG_META = {
  react:      { label: "React",      dot: "#61DAFB", tag: "JSX" },
  html:       { label: "HTML",       dot: "#E34C26", tag: "HTML5" },
  css:        { label: "CSS",        dot: "#264DE4", tag: "Styles" },
  javascript: { label: "JavaScript", dot: "#F7DF1E", tag: "ES2024" },
};

const LANG_MAP = { react: "jsx", html: "html", css: "css", javascript: "javascript" };

export default function CodeBlock({ code, language = "jsx", componentId }) {
  const { isDark } = useTheme();
  const meta = LANG_META[language] ?? { label: language.toUpperCase(), dot: "#6366f1", tag: "" };
  const syntaxLang = LANG_MAP[language] ?? language;

  const darkStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: "#0a0a0b",
      margin: 0,
      padding: "20px 24px",
      fontSize: "0.8rem",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
      lineHeight: "1.75",
      maxHeight: "460px",
      overflow: "auto",
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: "transparent",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    },
  };

  const lightStyleOverride = {
    ...oneLight,
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      background: "#fafafa",
      margin: 0,
      padding: "20px 24px",
      fontSize: "0.8rem",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
      lineHeight: "1.75",
      maxHeight: "460px",
      overflow: "auto",
    },
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        background: isDark ? "#0a0a0b" : "#fafafa",
        border: "1px solid var(--border-soft)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: isDark ? "#111114" : "#f1f0ed",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          </div>

          {/* Language pill */}
          <div className="flex items-center gap-2 px-2.5 py-1"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "7px",
            }}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: meta.dot }} />
            <span className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>
              {meta.label}
            </span>
            {meta.tag && (
              <>
                <span style={{ color: "var(--border-medium)" }}>·</span>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{meta.tag}</span>
              </>
            )}
          </div>
        </div>

        <CopyButton code={code} componentId={componentId} />
      </div>

      {/* ── Code ── */}
      <SyntaxHighlighter
        language={syntaxLang}
        style={isDark ? darkStyle : lightStyleOverride}
        customStyle={{
          margin: 0,
          padding: "20px 24px",
          fontSize: "0.8rem",
          maxHeight: "460px",
          overflow: "auto",
          background: isDark ? "#0a0a0b" : "#fafafa",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        }}
        showLineNumbers
        lineNumberStyle={{
          color: isDark ? "#3a3836" : "#c0bdb8",
          paddingRight: "20px",
          userSelect: "none",
          fontFamily: "'JetBrains Mono', monospace",
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}