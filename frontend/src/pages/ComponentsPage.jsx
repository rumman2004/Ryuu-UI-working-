// frontend/src/pages/ComponentsPage.jsx

import { useState, useEffect }       from "react";
import { useSearchParams }           from "react-router-dom";
import { SlidersHorizontal, Grid, Sparkles, ChevronRight } from "lucide-react";
import { motion }                    from "framer-motion";
import { getCategories, getTags }    from "../services/api";
import { useComponents }             from "../hooks/useComponents";
import ComponentCard                 from "../components/ui/ComponentCard";
import SkeletonCard                  from "../components/shared/SkeletonCard";
import { GridBeams }                 from "../components/background";
import Sidebar                       from "../components/layout/Sidebar";
import SearchBar                     from "../components/shared/SearchBar";
import Pagination                    from "../components/shared/Pagination";

export default function ComponentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories,   setCategories]   = useState([]);
  const [tags,         setTags]         = useState([]);
  const [search,       setSearch]       = useState(searchParams.get("search")   || "");
  const [selectedCat,  setSelectedCat]  = useState(searchParams.get("category") || "");
  const [selectedTags, setSelectedTags] = useState([]);
  const [page,         setPage]         = useState(1);
  const [drawerOpen,   setDrawerOpen]   = useState(false);

  const queryParams = {
    page,
    ...(search                && { search }),
    ...(selectedCat           && { category: selectedCat }),
    ...(selectedTags.length   && { tags: selectedTags.join(",") }),
  };

  const { components, loading, total, totalPages } = useComponents(queryParams);

  useEffect(() => {
    getCategories()
      .then((r) => setCategories(r?.data?.data ?? []))
      .catch(()  => setCategories([]));
    getTags()
      .then((r) => setTags(r?.data?.data ?? []))
      .catch(()  => setTags([]));
  }, []);

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
    <div className="relative min-h-screen">
      <GridBeams contained />
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 p-6 rounded-2xl"
        style={{
          background: "var(--surface-glass)",
          border: "1px solid var(--ghost-border)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: "#f9f5f8" }}>
              Components Library
            </h1>
            <p className="text-sm" style={{ color: "#adaaad" }}>
              {loading ? "Loading components..." : `${total} component${total !== 1 ? "s" : ""} available`}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 text-xs" style={{ color: "#a3a6ff" }}>
          <Sparkles size={14} />
          <span className="font-medium">Pro tip:</span>
          <span style={{ color: "#adaaad" }}>Use search and filters to locate patterns instantly.</span>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search components by name, tags..."
              className="input-dark flex-1 px-4 py-3 text-sm"
            />
            <button className="glow-button px-6 py-3 text-sm font-medium rounded-xl">
              <span>Search</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filter toggle + info */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <SearchBar
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            placeholder="Quick filter..."
            className="shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: "#a3a6ff",
            }}
          >
            <SlidersHorizontal size={16} />
            Filters
            {(selectedCat || selectedTags.length > 0) && (
              <span className="ml-1 w-5 h-5 bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {(selectedCat ? 1 : 0) + selectedTags.length}
              </span>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-1 text-xs" style={{ color: "#767577" }}>
            <Grid size={16} />
            <span>Showing {components.length} / {total} components</span>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
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

        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array(9).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : components.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 rounded-2xl"
              style={{
                background: "var(--surface-glass)",
                border: "1px dashed rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-5xl mb-4">🔎</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#f9f5f8" }}>
                No components found
              </h3>
              <p className="text-sm mb-6" style={{ color: "#adaaad" }}>
                Try adjusting your search or filters.
              </p>
              <button
                onClick={handleReset}
                className="glow-button inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl"
              >
                <span>Reset Filters</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {components.map((comp, i) => (
                <ComponentCard key={comp._id} component={comp} index={i} />
              ))}
            </motion.div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }}
          />
        </div>
      </div>
      </div>
    </div>
  );
}