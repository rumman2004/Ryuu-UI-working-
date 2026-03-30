// frontend/src/pages/ComponentDetail.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Eye, Copy, Monitor, Smartphone, ChevronRight,
  Code2, Eye as PreviewIcon, Share2, Star,
  Zap, Globe, Palette
} from "lucide-react";
import { getComponentBySlug } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import CodeBlock from "../components/ui/CodeBlock";
import CodeToggle from "../components/ui/CodeToggle";
import LivePreview from "../components/ui/LivePreview";
import DownloadZip from "../components/ui/DownloadZip";
import TagBadge from "../components/shared/TagBadge";
import { MeshGradient } from "../components/background";

export default function ComponentDetail() {
  const { slug } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("react");
  const [viewMode, setViewMode] = useState("desktop");
  const [activeTab, setActiveTab] = useState("preview");
  const [copiedStates, setCopiedStates] = useState({});
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getComponentBySlug(slug);
        setComponent(data.data);
        const hasReact = data.data.codeVariants?.some((v) => v.language === "react");
        setLanguage(hasReact ? "react" : "html");
      } catch (err) {
        setError(err.response?.data?.message || "Component not found");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  const handleCopyCode = async (code, type) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [type]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="space-y-6 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 rounded" style={{ background: "var(--bg-highest)" }} />
            <div className="h-4 w-4 rounded" style={{ background: "var(--bg-highest)" }} />
            <div className="h-4 w-24 rounded" style={{ background: "var(--bg-highest)" }} />
          </div>
          <div className="h-8 w-64 rounded-xl" style={{ background: "var(--bg-highest)" }} />
          <div className="h-4 w-96 rounded" style={{ background: "var(--bg-highest)" }} />
          <div className="h-96 rounded-2xl" style={{ background: "var(--bg-highest)" }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl mb-4">
          😕
        </motion.div>
        <h2 className="text-xl font-bold mb-3" style={{ color: "#f9f5f8" }}>{error}</h2>
        <p className="text-sm mb-6" style={{ color: "#adaaad" }}>
          The component you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/components"
          className="glow-button inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl"
        >
          <span className="flex items-center gap-2">
            <ChevronRight size={16} className="rotate-180" />
            Back to Components
          </span>
        </Link>
      </div>
    );
  }

  const activeVariant = component.codeVariants?.find((v) => v.language === language);
  const favorited = isFavorite(component._id);
  const availableLangs = component.codeVariants?.map((v) => v.language) ?? [];
  const isNew = new Date() - new Date(component.createdAt) < 7 * 24 * 60 * 60 * 1000;
  const isPopular = (component.copyCount ?? 0) > 10;

  return (
    <div className="relative min-h-screen">
      <MeshGradient contained intensity={0.3} />
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-10 relative z-10"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "#767577" }}>
        <Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
          <Globe size={12} /> Home
        </Link>
        <ChevronRight size={12} />
        <Link to="/components" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
          <Palette size={12} /> Components
        </Link>
        <ChevronRight size={12} />
        <span className="flex items-center gap-1" style={{ color: "#a3a6ff" }}>
          <Code2 size={12} /> {component.name}
        </span>
      </nav>

      {/* Title Row */}
      <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h1 className="text-3xl font-bold" style={{ color: "#f9f5f8" }}>{component.name}</h1>
            <div className="flex gap-2">
              {component.isFeatured && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="badge-featured px-3 py-1 text-xs font-bold rounded-xl flex items-center gap-1">
                  <Star size={12} /> Featured
                </motion.span>
              )}
              {isNew && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
                  className="px-3 py-1 text-xs font-bold rounded-xl flex items-center gap-1"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white" }}>
                  <Zap size={12} /> New
                </motion.span>
              )}
              {isPopular && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                  className="px-3 py-1 text-xs font-bold rounded-xl flex items-center gap-1"
                  style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)", color: "white" }}>
                  🔥 Popular
                </motion.span>
              )}
            </div>
          </div>

          {component.description && (
            <p className="text-sm mb-4 max-w-2xl leading-relaxed" style={{ color: "#adaaad" }}>
              {component.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {component.tags?.map((tag) => <TagBadge key={tag._id} tag={tag} />)}
          </div>

          <div className="flex items-center gap-6 text-sm" style={{ color: "#767577" }}>
            <span className="flex items-center gap-1.5">
              <Eye size={14} style={{ color: "#a3a6ff" }} />
              <span className="font-medium" style={{ color: "#e4e1e6" }}>{component.viewCount ?? 0}</span>
              views
            </span>
            <span className="flex items-center gap-1.5">
              <Copy size={14} style={{ color: "#ac8aff" }} />
              <span className="font-medium" style={{ color: "#e4e1e6" }}>{component.copyCount ?? 0}</span>
              copies
            </span>
            <span className="flex items-center gap-1.5">
              <Code2 size={14} style={{ color: "#67e8f9" }} />
              <span className="font-medium" style={{ color: "#e4e1e6" }}>{availableLangs.length}</span>
              variants
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleFavorite(component._id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: favorited ? "rgba(244, 63, 94, 0.1)" : "var(--surface-glass)",
              border: `1px solid ${favorited ? "rgba(244, 63, 94, 0.25)" : "var(--ghost-border)"}`,
              color: favorited ? "#f43f5e" : "#e4e1e6",
            }}
          >
            <Heart size={15} className={favorited ? "fill-rose-500 text-rose-500" : ""} />
            {favorited ? "Saved" : "Save"}
          </motion.button>

          <DownloadZip component={component} language={language} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ghost-button flex items-center gap-2 px-4 py-2.5 text-sm font-medium"
          >
            <Share2 size={15} /> Share
          </motion.button>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <CodeToggle active={language} onChange={setLanguage} available={availableLangs} />
          {activeTab === "preview" && (
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--bg-highest)", border: "1px solid var(--ghost-border)" }}>
              {[
                { mode: "desktop", icon: Monitor, label: "Desktop" },
                { mode: "mobile", icon: Smartphone, label: "Mobile" },
              ].map(({ mode, icon: Icon, label }) => (
                <motion.button
                  key={mode}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode)}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{ color: viewMode === mode ? "#ffffff" : "#767577" }}
                >
                  {viewMode === mode && (
                    <motion.div
                      layoutId="view-mode"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={13} /> {label}
                </motion.button>
              ))}
            </div>
          )}
        </div>
        <div className="text-sm" style={{ color: "#767577" }}>
          {language === "react" ? "⚛️ React Component" : "🌐 HTML/CSS/JS"}
        </div>
      </div>

      {/* Main Panel */}
      <motion.div
        layout
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-card-solid)",
          border: "1px solid var(--ghost-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Tab Bar */}
        <div className="flex" style={{ background: "var(--bg-highest)", borderBottom: "1px solid var(--ghost-border)" }}>
          {[
            { id: "preview", label: "Preview", icon: PreviewIcon },
            { id: "code", label: "Code", icon: Code2 },
          ].map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors flex-1 justify-center"
              style={{ color: activeTab === id ? "#a3a6ff" : "#767577" }}
              whileHover={{ background: "rgba(255,255,255,0.03)" }}
            >
              <Icon size={16} /> {label}
              {activeTab === id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${language}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {activeTab === "preview" ? (
              <div className="space-y-4">
                <LivePreview variant={activeVariant} viewMode={viewMode} />
                {activeVariant && (
                  <div className="text-center">
                    <p className="text-sm" style={{ color: "#767577" }}>
                      {language === "react"
                        ? "Interactive React component with live editing"
                        : "Static HTML preview with CSS and JavaScript"
                      }
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {activeVariant ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold" style={{ color: "#f9f5f8" }}>
                          {language === "react" ? "React Component" : "HTML Markup"}
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCopyCode(activeVariant.code, 'main')}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
                          style={{
                            background: "rgba(99,102,241,0.1)",
                            color: "#a3a6ff",
                            border: "1px solid rgba(99,102,241,0.15)",
                          }}
                        >
                          <Copy size={12} />
                          {copiedStates.main ? "Copied!" : "Copy"}
                        </motion.button>
                      </div>
                      <CodeBlock code={activeVariant.code} language={language} componentId={component._id} />
                    </div>

                    {activeVariant.cssCode && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold" style={{ color: "#f9f5f8" }}>Styles</h3>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCopyCode(activeVariant.cssCode, 'css')}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
                            style={{ background: "rgba(99,102,241,0.1)", color: "#a3a6ff", border: "1px solid rgba(99,102,241,0.15)" }}
                          >
                            <Copy size={12} /> {copiedStates.css ? "Copied!" : "Copy"}
                          </motion.button>
                        </div>
                        <CodeBlock code={activeVariant.cssCode} language="css" componentId={component._id} />
                      </div>
                    )}

                    {activeVariant.jsCode && language === "html" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold" style={{ color: "#f9f5f8" }}>JavaScript</h3>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCopyCode(activeVariant.jsCode, 'js')}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
                            style={{ background: "rgba(99,102,241,0.1)", color: "#a3a6ff", border: "1px solid rgba(99,102,241,0.15)" }}
                          >
                            <Copy size={12} /> {copiedStates.js ? "Copied!" : "Copy"}
                          </motion.button>
                        </div>
                        <CodeBlock code={activeVariant.jsCode} language="javascript" componentId={component._id} />
                      </div>
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 rounded-2xl"
                    style={{
                      background: "var(--surface-glass)",
                      border: "1px dashed rgba(255,255,255,0.1)",
                      color: "#adaaad",
                    }}
                  >
                    <Code2 size={32} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2" style={{ color: "#f9f5f8" }}>
                      No Code Available
                    </h3>
                    <p className="text-sm">
                      This component doesn't have a {language} variant yet.
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
    </div>
  );
}