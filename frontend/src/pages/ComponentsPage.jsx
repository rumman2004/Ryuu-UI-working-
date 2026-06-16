// frontend/src/pages/ComponentsPage.jsx
// Black UI — "Obsidian Editorial" Redesign

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3x3, Sparkles, Search, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories, getTags } from "../services/api";
import { useComponents } from "../hooks/useComponents";
import ComponentCard from "../components/ui/ComponentCard";
import SkeletonCard from "../components/shared/SkeletonCard";
import Sidebar from "../components/layout/Sidebar";
import SearchBar from "../components/shared/SearchBar";
import Pagination from "../components/shared/Pagination";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

export default function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCat, setSelectedCat] = useState(searchParams.get("category") || "");
  const [selectedTags, setSelectedTags] = useState([]);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const queryParams = {
    page,
    ...(search && { search }),
    ...(selectedCat && { category: selectedCat }),
    ...(selectedTags.length && { tags: selectedTags.join(",") }),
  };

  const { components, loading, total, totalPages } = useComponents(queryParams);

  useEffect(() => {
    getCategories().then((r) => setCategories(r?.data?.data ?? [])).catch(() => setCategories([]));
    getTags().then((r) => setTags(r?.data?.data ?? [])).catch(() => setTags([]));
  }, []);

  const activeFilterCount = (selectedCat ? 1 : 0) + selectedTags.length;

  const handleTagToggle = (id) => {
    setSelectedTags((p) => p.includes(id) ? p.filter((t) => t !== id) : [...p, id]);
    setPage(1);
  };

  const handleCategoryChange = (id) => {
    setSelectedCat(id);
    setPage(1);
    setSearchParams(id ? { category: id } : {});
  };

  const handleReset = () => {
    setSelectedCat("");
    setSelectedTags([]);
    setSearch("");
    setPage(1);
    setSearchParams({});
  };

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--bg-void)", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ambient bg */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="absolute top-0 right-[20%] w-[600px] h-[400px] opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, #6366F1 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 py-12">

        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mb-10"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeUp}
            className="flex items-center gap-2 text-xs mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            <a href="/" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}>Home</a>
            <ChevronRight size={12} />
            <span style={{ color: "var(--text-primary)" }}>Components</span>
          </motion.nav>

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                Component Library
              </h1>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {loading
                  ? "Loading components…"
                  : <span><strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>{total}</strong> ready-to-use components</span>}
              </p>
            </div>

            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}
            >
              <Sparkles size={14} style={{ color: "#6366F1" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#6366F1" }}>Pro tip:</span>
              <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Use filters to find components fast</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Search + Filter bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: searchFocused ? "#6366F1" : "var(--text-muted)", transition: "color 0.2s" }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search components by name, tags…"
              style={{
                width: "100%",
                paddingLeft: "44px",
                paddingRight: "16px",
                paddingTop: "12px",
                paddingBottom: "12px",
                background: "var(--bg-elevated)",
                border: `1px solid ${searchFocused ? "rgba(99,102,241,0.4)" : "var(--border-soft)"}`,
                borderRadius: "12px",
                fontSize: "0.9375rem",
                color: "var(--text-primary)",
                outline: "none",
                fontFamily: "'Inter', sans-serif",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
              }}
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setPage(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "var(--bg-overlay)", color: "var(--text-muted)" }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Filter button (mobile) */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
            style={{
              background: activeFilterCount > 0 ? "rgba(99,102,241,0.1)" : "var(--bg-elevated)",
              border: `1px solid ${activeFilterCount > 0 ? "rgba(99,102,241,0.3)" : "var(--border-medium)"}`,
              color: activeFilterCount > 0 ? "#6366F1" : "var(--text-secondary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "#6366F1", color: "#fff" }}
              >
                {activeFilterCount}
              </span>
            )}
          </motion.button>

          {/* Counts (desktop) */}
          <div
            className="hidden lg:flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            <Grid3x3 size={15} style={{ color: "var(--text-muted)" }} />
            <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
              {components.length} / {total}
            </span>
          </div>

          {/* Active filters chips */}
          <AnimatePresence>
            {activeFilterCount > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#F87171",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                }}
              >
                <X size={14} /> Clear
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Layout: Sidebar + Grid ── */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            categories={categories}
            tags={tags}
            selectedCategory={selectedCat}
            selectedTags={selectedTags}
            onCategoryChange={handleCategoryChange}
            onTagToggle={handleTagToggle}
            onReset={handleReset}
          />

          {/* Component grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array(9).fill(0).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : components.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 rounded-3xl"
                style={{ background: "var(--bg-raised)", border: "1px dashed var(--border-soft)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "var(--bg-elevated)" }}
                >
                  <Search size={28} style={{ color: "var(--text-muted)" }} />
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.125rem", color: "var(--text-primary)" }}
                >
                  No components found
                </h3>
                <p className="mb-6" style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  Try adjusting your search or filters
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReset}
                  style={{
                    background: "#6366F1",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    padding: "10px 22px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Reset filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {components.map((comp, i) => (
                  <motion.div key={comp._id} variants={fadeUp}>
                    <ComponentCard component={comp} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}