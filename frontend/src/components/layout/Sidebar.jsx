// frontend/src/components/layout/Sidebar.jsx

import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, RefreshCcw }   from "lucide-react";
import FilterPanel                 from "../shared/FilterPanel";

export default function Sidebar({
  open, onClose,
  categories, tags,
  selectedCategory, selectedTags,
  onCategoryChange, onTagToggle, onReset,
}) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div
          className="sticky top-24 p-5 rounded-2xl"
          style={{
            background: "var(--surface-glass)",
            border: "1px solid var(--ghost-border)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="mb-4 flex items-center justify-between text-sm font-semibold" style={{ color: "#a3a6ff" }}>
            <div className="inline-flex items-center gap-2">
              <Filter size={16} />
              <span>Filters</span>
            </div>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all hover:bg-indigo-500/10"
              style={{ color: "#adaaad", border: "1px solid var(--ghost-border)" }}
            >
              <RefreshCcw size={12} /> Reset
            </button>
          </div>

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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{   x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto lg:hidden"
              style={{
                background: "rgba(14, 14, 16, 0.95)",
                borderRight: "1px solid var(--ghost-border)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center justify-between p-4" style={{ borderBottom: "1px solid var(--ghost-border)" }}>
                <div className="inline-flex items-center gap-2 font-semibold" style={{ color: "#a3a6ff" }}>
                  <Filter size={16} />
                  <span>Filters</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/5"
                  style={{ border: "1px solid var(--ghost-border)" }}
                  aria-label="Close Filter"
                >
                  <X size={15} className="text-[#f9f5f8]" />
                </button>
              </div>
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