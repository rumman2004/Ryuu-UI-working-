// frontend/src/components/shared/FilterPanel.jsx

import {
  SlidersHorizontal, RotateCcw, Puzzle,
  Star, LayoutGrid, Zap, MessageSquare,
  BarChart3, Compass, Package
} from "lucide-react";
import TagBadge from "./TagBadge";
import { motion } from "framer-motion";

/* Map category names to Lucide icons instead of emojis */
const categoryIconMap = {
  "Must-have":   Star,
  "Layout":      LayoutGrid,
  "Advanced":    Zap,
  "Feedback":    MessageSquare,
  "Data":        BarChart3,
  "Navigation":  Compass,
};

export default function FilterPanel({
  categories, tags,
  selectedCategory, selectedTags,
  onCategoryChange, onTagToggle, onReset,
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={15} style={{ color: "var(--text-muted)" }} />
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Filters
        </span>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Category
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange("")}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2.5"
            style={{
              background: !selectedCategory ? "rgba(99,102,241,0.1)" : "transparent",
              color:      !selectedCategory ? "var(--color-accent-light, #a3a6ff)" : "var(--text-primary)",
              fontWeight: !selectedCategory ? 600 : 400,
            }}
          >
            <Puzzle size={15} style={{ color: !selectedCategory ? "var(--color-accent-light, #a3a6ff)" : "var(--text-muted)" }} />
            <span>All Components</span>
          </button>

          {categories.map((cat) => {
            const CatIcon = categoryIconMap[cat.name] ?? Package;
            const isSelected = selectedCategory === cat._id;
            return (
              <motion.button
                key={cat._id}
                whileHover={{ x: 3 }}
                onClick={() => onCategoryChange(cat._id)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between"
                style={{
                  background: isSelected ? "rgba(99,102,241,0.1)" : "transparent",
                  color:      isSelected ? "var(--color-accent-light, #a3a6ff)" : "var(--text-primary)",
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <span className="flex items-center gap-2.5">
                  <CatIcon size={15} style={{ color: isSelected ? "var(--color-accent-light, #a3a6ff)" : "var(--text-muted)" }} />
                  <span>{cat.name}</span>
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--ghost-border)" }}
                >
                  {cat.componentCount ?? 0}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadge
                key={tag._id}
                tag={tag}
                onClick={() => onTagToggle(tag._id)}
                selected={selectedTags.includes(tag._id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reset */}
      {(selectedCategory || selectedTags.length > 0) && (
        <motion.button
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: "rgba(244,63,94,0.08)",
            border: "1px solid rgba(244,63,94,0.2)",
            color: "#f87171",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(244,63,94,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(244,63,94,0.08)"; }}
        >
          <RotateCcw size={13} />
          Reset Filters
        </motion.button>
      )}
    </div>
  );
}