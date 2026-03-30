// frontend/src/components/ui/ComponentCard.jsx

import { Link }                from "react-router-dom";
import { motion }              from "framer-motion";
import {
  Heart, Eye, Copy, ArrowUpRight, Code2,
  Layers, Box, Type, ToggleLeft, CreditCard,
  Table2, Image, Layout, Bell, Menu,
  ChevronDown, CheckCircle2, Loader2, Star
} from "lucide-react";
import { useFavorites }        from "../../context/FavoritesContext";
import TagBadge                from "../shared/TagBadge";

/* Map component category/name to a Lucide icon & accent color for the placeholder preview */
const componentIconMap = {
  "button":     { icon: ToggleLeft,    color: "#6366f1" },
  "card":       { icon: CreditCard,    color: "#8b5cf6" },
  "form":       { icon: CheckCircle2,  color: "#10b981" },
  "modal":      { icon: Layers,        color: "#f59e0b" },
  "navbar":     { icon: Menu,          color: "#06b6d4" },
  "table":      { icon: Table2,        color: "#ec4899" },
  "hero":       { icon: Layout,        color: "#6366f1" },
  "footer":     { icon: Layout,        color: "#8b5cf6" },
  "alert":      { icon: Bell,          color: "#f59e0b" },
  "dropdown":   { icon: ChevronDown,   color: "#06b6d4" },
  "badge":      { icon: Star,          color: "#f97316" },
  "avatar":     { icon: Image,         color: "#ec4899" },
  "input":      { icon: Type,          color: "#10b981" },
  "loader":     { icon: Loader2,       color: "#6366f1" },
  "accordion":  { icon: ChevronDown,   color: "#8b5cf6" },
  "tab":        { icon: Layout,        color: "#06b6d4" },
  "sidebar":    { icon: Menu,          color: "#f59e0b" },
  "tooltip":    { icon: Box,           color: "#ec4899" },
  "pagination":  { icon: ChevronDown,  color: "#6366f1" },
  "breadcrumb":  { icon: ArrowUpRight, color: "#8b5cf6" },
};

function getComponentVisual(name = "") {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(componentIconMap)) {
    if (lower.includes(key)) return val;
  }
  return { icon: Code2, color: "#6366f1" };
}

export default function ComponentCard({ component, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(component._id);
  const isNew = new Date() - new Date(component.createdAt) < 7 * 24 * 60 * 60 * 1000;
  const visual = getComponentVisual(component.name);
  const VisualIcon = visual.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group perspective-card rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Preview Area */}
      <Link to={`/components/${component.slug}`} className="block relative overflow-hidden">
        <div className="h-48 w-full relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
          {component.previewImage ? (
            <img
              src={component.previewImage}
              alt={component.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            /* Icon-based preview when no image is available */
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3 dot-grid relative"
              style={{ background: "var(--bg-primary)" }}
            >
              {/* Decorative background glow */}
              <div
                className="absolute rounded-full blur-[60px] opacity-20"
                style={{
                  width: "200px", height: "200px",
                  background: `radial-gradient(circle, ${visual.color}, transparent 70%)`,
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Floating mini-shapes */}
              <motion.div
                animate={{ y: [-4, 4, -4], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-8 w-5 h-5 rounded-md opacity-[0.06]"
                style={{ background: visual.color, border: `1px solid ${visual.color}30` }}
              />
              <motion.div
                animate={{ y: [3, -3, 3], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-8 left-10 w-3 h-3 rounded-full opacity-[0.08]"
                style={{ background: visual.color }}
              />

              {/* Main icon */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${visual.color}12`,
                  border: `1px solid ${visual.color}20`,
                  boxShadow: `0 0 30px ${visual.color}10`,
                }}
              >
                <VisualIcon size={28} style={{ color: visual.color }} strokeWidth={1.5} />
              </motion.div>

              {/* Component type label */}
              <span
                className="relative z-10 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-lg"
                style={{
                  color: `${visual.color}99`,
                  background: `${visual.color}08`,
                  border: `1px solid ${visual.color}15`,
                }}
              >
                {component.category?.name || "Component"}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
            <span
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              View Component <ArrowUpRight size={13} />
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {component.isFeatured && (
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg shadow-lg badge-featured flex items-center gap-1">
                <Star size={10} className="fill-white" /> Featured
              </span>
            )}
            {isNew && (
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg shadow-lg" style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white" }}>
                New
              </span>
            )}
          </div>

          {/* Favorite button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.preventDefault(); toggleFavorite(component._id); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: favorited ? "rgba(244, 63, 94, 0.15)" : "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              border: favorited ? "1px solid rgba(244, 63, 94, 0.3)" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Heart
              size={14}
              className={favorited ? "fill-rose-500 text-rose-500" : "text-white/70"}
            />
          </motion.button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={`/components/${component.slug}`}>
            <h3 className="font-semibold text-sm hover:text-indigo-400 transition-colors line-clamp-1" style={{ color: "var(--text-primary)" }}>
              {component.name}
            </h3>
          </Link>
          {component.category?.name && (
            <span
              className="shrink-0 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold"
              style={{
                background: "rgba(99, 102, 241, 0.12)",
                color: "#a3a6ff",
                border: "1px solid rgba(99, 102, 241, 0.15)",
              }}
            >
              {component.category.name}
            </span>
          )}
        </div>

        {component.description && (
          <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {component.description}
          </p>
        )}

        {/* Tags */}
        {component.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {component.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag._id} tag={tag} />
            ))}
          </div>
        )}

        {/* Stats */}
        <div
          className="flex items-center justify-between text-xs pt-3"
          style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border-color)" }}
        >
          <span className="flex items-center gap-1.5">
            <Eye  size={12} style={{ color: "#a3a6ff" }} /> {component.viewCount ?? 0}
          </span>
          <span className="flex items-center gap-1.5">
            <Copy size={12} style={{ color: "#ac8aff" }} /> {component.copyCount ?? 0}
          </span>
          <span className="flex items-center gap-1.5">
            <Code2 size={12} style={{ color: "#67e8f9" }} />
            {component.codeVariants?.length ?? 0} variants
          </span>
        </div>
      </div>
    </motion.div>
  );
}