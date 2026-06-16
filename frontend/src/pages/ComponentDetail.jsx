// frontend/src/pages/ComponentDetail.jsx
// Black UI — "Obsidian Editorial" Redesign

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Eye, Copy, Monitor, Smartphone, ChevronRight,
  Code2, Eye as PreviewIcon, Share2, Star,
  Zap, Globe, Palette, Download, ArrowLeft, Check
} from "lucide-react";
import { getComponentBySlug, getComponents } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import CodeBlock from "../components/ui/CodeBlock";
import CodeToggle from "../components/ui/CodeToggle";
import LivePreview from "../components/ui/LivePreview";
import DownloadZip from "../components/ui/DownloadZip";
import TagBadge from "../components/shared/TagBadge";
import ComponentCard from "../components/ui/ComponentCard";

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

export default function ComponentDetail() {
  const { slug } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("react");
  const [viewMode, setViewMode] = useState("desktop");
  const [activeTab, setActiveTab] = useState("preview");
  const [related, setRelated] = useState([]);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchComp = async () => {
      try {
        setLoading(true);
        const { data } = await getComponentBySlug(slug);
        setComponent(data.data);
        const hasReact = data.data.codeVariants?.some((v) => v.language === "react");
        setLanguage(hasReact ? "react" : "html");

        // Fetch related components from the same category (fall back to recent).
        const catId = data.data.category?._id ?? data.data.category;
        try {
          const relRes = await getComponents(catId ? { category: catId } : {});
          const items = (relRes?.data?.data ?? [])
            .filter((c) => c._id !== data.data._id)
            .slice(0, 3);
          setRelated(items);
        } catch {
          setRelated([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Component not found");
      } finally {
        setLoading(false);
      }
    };
    fetchComp();
    window.scrollTo({ top: 0 });
  }, [slug]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "var(--bg-void)", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-[1100px] mx-auto px-6 py-14 space-y-6 animate-pulse">
          <div className="flex items-center gap-2">
            {[80, 20, 120].map((w, i) => (
              <div key={i} className="h-4 rounded-lg" style={{ width: w, background: "var(--bg-elevated)" }} />
            ))}
          </div>
          <div className="h-10 w-80 rounded-2xl" style={{ background: "var(--bg-elevated)" }} />
          <div className="h-5 w-[480px] rounded-lg" style={{ background: "var(--bg-elevated)" }} />
          <div className="h-[480px] w-full rounded-3xl" style={{ background: "var(--bg-elevated)" }} />
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-void)", fontFamily: "'Inter', sans-serif" }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center px-8 py-16 rounded-3xl max-w-md"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border-soft)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl"
            style={{ background: "var(--bg-elevated)" }}
          >
            😕
          </div>
          <h2
            className="mb-3"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-primary)" }}
          >
            {error}
          </h2>
          <p className="mb-8" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
            The component you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/components"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "#6366F1", color: "#fff", textDecoration: "none", fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={15} /> Back to Components
          </Link>
        </motion.div>
      </div>
    );
  }

  const activeVariant = component.codeVariants?.find((v) => v.language === language);
  const favorited = isFavorite(component._id);
  const availableLangs = component.codeVariants?.map((v) => v.language) ?? [];
  const isNew = new Date() - new Date(component.createdAt) < 7 * 24 * 60 * 60 * 1000;
  const isPopular = (component.copyCount ?? 0) > 10;

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--bg-void)", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1100px] mx-auto px-6 py-12"
      >
        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-2 text-xs mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          <Link to="/" className="flex items-center gap-1 hover:text-indigo-400 transition-colors" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            <Globe size={11} /> Home
          </Link>
          <ChevronRight size={11} />
          <Link to="/components" className="flex items-center gap-1 hover:text-indigo-400 transition-colors" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            <Palette size={11} /> Components
          </Link>
          <ChevronRight size={11} />
          <span style={{ color: "var(--text-secondary)" }}>{component.name}</span>
        </nav>

        {/* ── Title row ── */}
        <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
          <div className="flex-1 min-w-0">
            {/* Name + badges */}
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.05,
                  color: "var(--text-primary)",
                }}
              >
                {component.name}
              </h1>
              <div className="flex gap-2 flex-wrap">
                {component.isFeatured && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #F97316)", color: "white" }}
                  >
                    <Star size={11} /> Featured
                  </motion.span>
                )}
                {isNew && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.08 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "white" }}
                  >
                    <Zap size={11} /> New
                  </motion.span>
                )}
                {isPopular && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.16 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #F43F5E, #E11D48)", color: "white" }}
                  >
                    🔥 Popular
                  </motion.span>
                )}
              </div>
            </div>

            {component.description && (
              <p
                className="mb-4 max-w-2xl"
                style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--text-secondary)" }}
              >
                {component.description}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {component.tags?.map((tag) => <TagBadge key={tag._id} tag={tag} />)}
            </div>

            {/* Meta stats */}
            <div className="flex items-center gap-5 text-sm flex-wrap">
              {[
                { icon: <Eye size={14} />, val: component.viewCount ?? 0, label: "views", color: "#818CF8" },
                { icon: <Copy size={14} />, val: component.copyCount ?? 0, label: "copies", color: "#6366F1" },
                { icon: <Code2 size={14} />, val: availableLangs.length, label: "variants", color: "#22D3EE" },
              ].map(({ icon, val, label, color }) => (
                <span key={label} className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                  <span style={{ color }}>{icon}</span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{val}</span>
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleFavorite(component._id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: favorited ? "rgba(244,63,94,0.1)" : "var(--bg-elevated)",
                border: `1px solid ${favorited ? "rgba(244,63,94,0.3)" : "var(--border-medium)"}`,
                color: favorited ? "#F43F5E" : "var(--text-secondary)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Heart size={15} className={favorited ? "fill-current" : ""} />
              {favorited ? "Saved" : "Save"}
            </motion.button>

            <DownloadZip component={component} language={language} />

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-medium)",
                color: "var(--text-secondary)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Share2 size={15} /> Share
            </motion.button>
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-5 px-5 py-4 rounded-2xl"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border-soft)" }}
        >
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <CodeToggle active={language} onChange={setLanguage} available={availableLangs} />

            {/* View mode toggle (only in preview) */}
            <AnimatePresence>
              {activeTab === "preview" && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-1 p-1 rounded-xl overflow-hidden"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-soft)" }}
                >
                  {[
                    { mode: "desktop", icon: Monitor },
                    { mode: "mobile", icon: Smartphone },
                  ].map(({ mode, icon: Icon }) => (
                    <motion.button
                      key={mode}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setViewMode(mode)}
                      className="relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      style={{ color: viewMode === mode ? "var(--text-primary)" : "var(--text-muted)" }}
                    >
                      {viewMode === mode && (
                        <motion.div
                          layoutId="view-mode-bg"
                          className="absolute inset-0 rounded-lg"
                          style={{ background: "var(--bg-float)", zIndex: -1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon size={13} />
                      <span className="hidden sm:inline capitalize">{mode}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {language === "react"
              ? <><span style={{ color: "#818CF8" }}>⚛</span> React Component</>
              : <><Globe size={12} style={{ color: "#34D399" }} /> HTML/CSS/JS</>}
          </div>
        </div>

        {/* ── Main panel ── */}
        <motion.div
          layout
          className="rounded-[22px] overflow-hidden"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Tab bar */}
          <div
            className="flex"
            style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}
          >
            {[
              { id: "preview", icon: PreviewIcon, label: "Preview" },
              { id: "code", icon: Code2, label: "Code" },
            ].map(({ id, icon: Icon, label }) => (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                whileHover={{ background: "rgba(255,255,255,0.02)" }}
                className="relative flex items-center gap-2 px-7 py-4 text-sm font-semibold flex-1 justify-center transition-colors"
                style={{
                  color: activeTab === id ? "var(--text-primary)" : "var(--text-muted)",
                  fontFamily: "'Inter', sans-serif",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <Icon size={15} /> {label}
                {activeTab === id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                    style={{ width: "40px", background: "#6366F1" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${language}`}
              variants={tabVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="p-6"
            >
              {activeTab === "preview" ? (
                <div className="space-y-4">
                  <LivePreview variant={activeVariant} viewMode={viewMode} />
                  {activeVariant && (
                    <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
                      {language === "react"
                        ? "Interactive React component with live editing"
                        : "Static HTML preview with CSS and JavaScript"}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {activeVariant ? (
                    <>
                      {/* Main code */}
                      <CodeSection
                        label={language === "react" ? "React Component" : "HTML Markup"}
                        code={activeVariant.code}
                        language={language}
                        componentId={component._id}
                      />

                      {/* CSS */}
                      {activeVariant.cssCode && (
                        <CodeSection
                          label="Styles"
                          code={activeVariant.cssCode}
                          language="css"
                          componentId={component._id}
                        />
                      )}

                      {/* JS (HTML only) */}
                      {activeVariant.jsCode && language === "html" && (
                        <CodeSection
                          label="JavaScript"
                          code={activeVariant.jsCode}
                          language="javascript"
                          componentId={component._id}
                        />
                      )}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20 rounded-2xl"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px dashed var(--border-soft)",
                      }}
                    >
                      <Code2 size={32} className="mx-auto mb-4" style={{ opacity: 0.3, color: "var(--text-muted)" }} />
                      <h3
                        className="mb-2"
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}
                      >
                        No Code Available
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                        This component doesn't have a {language} variant yet.
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Related components ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h2 style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
                  Related components
                </h2>
                <p className="mt-1" style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  {component.category?.name
                    ? `More from ${component.category.name}`
                    : "You might also like"}
                </p>
              </div>
              <Link
                to={component.category?._id ? `/components?category=${component.category._id}` : "/components"}
                className="inline-flex items-center gap-1.5 shrink-0"
                style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}
              >
                View all <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel, i) => (
                <ComponentCard key={rel._id} component={rel} index={i} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ─── Code Section Sub-component ─── */
/* CodeBlock's header already contains a CopyButton wired to useCopyCode, which
   increments copyCount on the backend — so no separate copy button is needed here. */
function CodeSection({ label, code, language, componentId }) {
  return (
    <div className="space-y-2">
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "0.875rem",
          color: "var(--text-primary)",
        }}
      >
        {label}
      </h3>
      <CodeBlock code={code} language={language} componentId={componentId} />
    </div>
  );
}