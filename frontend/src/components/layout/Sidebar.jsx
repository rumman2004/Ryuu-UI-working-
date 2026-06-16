// frontend/src/components/layout/Sidebar.jsx

import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import FilterPanel from "../shared/FilterPanel";

export default function Sidebar({
  open, onClose,
  categories, tags,
  selectedCategory, selectedTags,
  onCategoryChange, onTagToggle, onReset,
}) {
  const hasFilters = selectedCategory || selectedTags?.length > 0;

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div
          className="sticky"
          style={{
            top: "88px",
            background: "var(--bg-raised)",
            border: "1px solid var(--border-soft)",
            borderRadius: "18px",
            padding: "20px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} style={{ color: "var(--gold)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--gold)" }}>
                Filters
              </span>
              {hasFilters && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                />
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium transition-all"
              style={{
                color: hasFilters ? "var(--gold)" : "var(--text-muted)",
                background: hasFilters ? "var(--gold-muted)" : "transparent",
                border: `1px solid ${hasFilters ? "var(--gold-border)" : "var(--border-subtle)"}`,
                borderRadius: "8px",
                opacity: hasFilters ? 1 : 0.6,
              }}
            >
              <RotateCcw size={10} /> Reset
            </motion.button>
          </div>

          {/* Subtle divider */}
          <div className="mb-4" style={{ height: "1px", background: "var(--border-subtle)" }} />

          <FilterPanel
            categories={categories}
            tags={tags}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            onCategoryChange={onCategoryChange}
            onTagToggle={onTagToggle}
            onReset={onReset}
          />
        </div>
      </aside>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto lg:hidden"
              style={{
                background: "rgba(15,15,17,0.97)",
                borderRight: "1px solid var(--border-soft)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} style={{ color: "var(--gold)" }} />
                  <span className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--gold)" }}>
                    Filters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onReset}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium transition-all"
                    style={{
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "8px",
                    }}
                  >
                    <RotateCcw size={10} /> Reset
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center"
                    aria-label="Close"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: "9px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <X size={14} />
                  </motion.button>
                </div>
              </div>

              {/* Filter content */}
              <div className="p-5">
                <FilterPanel
                  categories={categories}
                  tags={tags}
                  selectedCategory={selectedCategory}
                  selectedTags={selectedTags}
                  onCategoryChange={(id) => { onCategoryChange(id); onClose(); }}
                  onTagToggle={onTagToggle}
                  onReset={() => { onReset(); onClose(); }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}