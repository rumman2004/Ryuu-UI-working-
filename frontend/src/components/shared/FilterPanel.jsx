// frontend/src/components/shared/FilterPanel.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Tag, Layers } from "lucide-react";

function Section({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-5">
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "12px", background: "none", border: "none", cursor: "pointer", padding: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon size={12} style={{ color: "var(--gold)" }} />
          <span style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)" }}>
            {title}
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 0 : -90 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={12} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryBtn({ label, isSelected, count, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "8px", padding: "8px 12px", borderRadius: "9px", fontSize: "13px", textAlign: "left",
        background: isSelected ? "var(--gold-muted)" : "transparent",
        color: isSelected ? "var(--gold)" : "var(--text-secondary)",
        border: isSelected ? "1px solid var(--gold-border)" : "1px solid transparent",
        fontWeight: isSelected ? 600 : 400, cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = "var(--bg-elevated)";
          e.currentTarget.style.color = "var(--text-primary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--text-secondary)";
        }
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
          background: isSelected ? "var(--gold)" : "var(--border-medium)",
        }} />
        {label}
      </span>
      {count > 0 && (
        <span style={{
          fontSize: "10px", padding: "2px 6px", borderRadius: "6px",
          background: isSelected ? "rgba(99,102,241,0.15)" : "var(--bg-elevated)",
          color: isSelected ? "var(--gold)" : "var(--text-muted)",
        }}>
          {count}
        </span>
      )}
    </button>
  );
}

export default function FilterPanel({
  categories = [], tags = [],
  selectedCategory, selectedTags = [],
  onCategoryChange, onTagToggle,
}) {
  return (
    <div>
      {categories.length > 0 && (
        <Section title="Category" icon={Layers}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <CategoryBtn
              label="All Components"
              isSelected={!selectedCategory}
              count={0}
              onClick={() => onCategoryChange(null)}
            />
            {categories.map((cat) => (
              <CategoryBtn
                key={cat._id}
                label={cat.name}
                isSelected={selectedCategory === cat._id}
                count={cat.componentCount ?? 0}
                onClick={() => onCategoryChange(cat._id)}
              />
            ))}
          </div>
        </Section>
      )}

      {tags.length > 0 && (
        <>
          <div style={{ height: "1px", background: "var(--border-subtle)", marginBottom: "20px" }} />
          <Section title="Tags" icon={Tag}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {tags.map((tag) => {
                const sel = selectedTags.includes(tag._id);
                return (
                  <motion.button
                    key={tag._id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => onTagToggle(tag._id)}
                    style={{
                      padding: "4px 10px", fontSize: "11px", fontWeight: sel ? 600 : 400,
                      borderRadius: "7px", cursor: "pointer",
                      background: sel ? "var(--gold-muted)" : "var(--bg-elevated)",
                      color: sel ? "var(--gold)" : "var(--text-muted)",
                      border: sel ? "1px solid var(--gold-border)" : "1px solid var(--border-soft)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {tag.name}
                  </motion.button>
                );
              })}
            </div>
          </Section>
        </>
      )}
    </div>
  );
}