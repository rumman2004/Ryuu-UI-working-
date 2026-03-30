// frontend/src/pages/CategoryPage.jsx

import { useEffect, useState }       from "react";
import { useParams, Link }           from "react-router-dom";
import { getComponents, getCategories } from "../services/api";
import ComponentCard                 from "../components/ui/ComponentCard";
import SkeletonCard                  from "../components/shared/SkeletonCard";
import Pagination                    from "../components/shared/Pagination";
import { AnimatedPaper }             from "../components/background";

export default function CategoryPage() {
  const { slug }                      = useParams();
  const [components,  setComponents]  = useState([]);
  const [category,    setCategory]    = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [page,        setPage]        = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const [total,       setTotal]       = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get all categories to find the matching one by slug
        const catRes = await getCategories();
        const cats   = catRes?.data?.data ?? [];
        const found  = cats.find(
          (c) => c.slug === slug || c.name.toLowerCase() === slug
        );
        setCategory(found ?? null);

        // Fetch components for this category
        const compRes = await getComponents({
          category: found?._id,
          page,
        });
        setComponents(compRes?.data?.data      ?? []);
        setTotalPages(compRes?.data?.totalPages ?? 1);
        setTotal(compRes?.data?.total          ?? 0);
      } catch (err) {
        console.error("CategoryPage fetch error:", err);
        setComponents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, page]);

  return (
    <div className="relative min-h-screen">
      <AnimatedPaper contained />
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
      {/* Breadcrumb */}
      <div
        className="flex items-center gap-2 text-sm mb-8"
        style={{ color: "var(--text-secondary)" }}
      >
        <Link to="/"           className="hover:text-indigo-500">Home</Link>
        <span>/</span>
        <Link to="/components" className="hover:text-indigo-500">Components</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>
          {category?.name ?? slug}
        </span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">
            {category?.name === "Must-have"
              ? "⭐"
              : category?.name === "Layout"
              ? "🏗️"
              : "⚡"}
          </span>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {category?.name ?? slug}
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {total} component{total !== 1 ? "s" : ""} in this category
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : components.length === 0 ? (
        <div
          className="text-center py-24 rounded-2xl border"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          <div className="text-5xl mb-4">🧩</div>
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            No components yet
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            This category is empty — check back soon
          </p>
          <Link
            to="/components"
            className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            Browse All Components
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((comp) => (
            <ComponentCard key={comp._id} component={comp} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }}
      />
      </div>
    </div>
  );
}