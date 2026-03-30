// admin/src/components/ui/CodeEditor.jsx

import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange, language = "javascript", height = "320px" }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#1e2535" }}>
      {/* Top bar */}
      <div
        className="flex items-center gap-2 px-4 py-2 border-b"
        style={{ backgroundColor: "#0d1424", borderColor: "#1e2535" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/60"  />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs text-slate-500 ml-2 font-mono">
          {language === "javascript" ? "JSX / React" : language.toUpperCase()}
        </span>
      </div>

      <Editor
        height={height}
        language={language === "react" ? "javascript" : language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          fontSize:           13,
          fontFamily:         "'JetBrains Mono', 'Fira Code', monospace",
          minimap:            { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap:           "on",
          padding:            { top: 12, bottom: 12 },
          tabSize:            2,
          renderLineHighlight: "gutter",
        }}
      />
    </div>
  );
}