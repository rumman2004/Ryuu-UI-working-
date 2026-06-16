// frontend/src/components/shared/TagBadge.jsx

import { Link } from "react-router-dom";

// Deterministic per-tag color from name hash
function tagColor(name = "") {
  const palette = [
    { bg: "rgba(99,102,241,0.08)",  text: "#818CF8", border: "rgba(99,102,241,0.2)"  },
    { bg: "rgba(99,102,241,0.08)",  text: "#6366F1", border: "rgba(99,102,241,0.2)"  },
    { bg: "rgba(16,185,129,0.08)",  text: "#34D399", border: "rgba(16,185,129,0.2)"  },
    { bg: "rgba(236,72,153,0.08)",  text: "#F472B6", border: "rgba(236,72,153,0.2)"  },
    { bg: "rgba(6,182,212,0.08)",   text: "#22D3EE", border: "rgba(6,182,212,0.2)"   },
    { bg: "rgba(139,92,246,0.08)",  text: "#A78BFA", border: "rgba(139,92,246,0.2)"  },
    { bg: "rgba(249,115,22,0.08)",  text: "#FB923C", border: "rgba(249,115,22,0.2)"  },
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return palette[h % palette.length];
}

export default function TagBadge({ tag, clickable = true }) {
  const c = tagColor(tag?.name ?? "");

  const badge = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.02em",
        borderRadius: "6px",
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        cursor: clickable && tag?.slug ? "pointer" : "default",
        transition: "filter 0.15s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => { if (clickable) e.currentTarget.style.filter = "brightness(1.25)"; }}
      onMouseLeave={(e) => { if (clickable) e.currentTarget.style.filter = "brightness(1)"; }}
    >
      {tag?.name ?? "tag"}
    </span>
  );

  if (!clickable || !tag?.slug) return badge;

  return (
    <Link to={`/components?tag=${tag.slug}`} onClick={(e) => e.stopPropagation()}>
      {badge}
    </Link>
  );
}