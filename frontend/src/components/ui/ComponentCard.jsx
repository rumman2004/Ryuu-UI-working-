// frontend/src/components/ui/ComponentCard.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, Eye, Copy, ArrowUpRight, Code2,
  Layers, Box, Type, ToggleLeft, CreditCard,
  Table2, Image, Layout, Bell, Menu,
  ChevronDown, CheckCircle2, Loader2, Star, Sparkles
} from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import TagBadge from "../shared/TagBadge";

const componentIconMap = {
  "button":     { icon: ToggleLeft,   color: "#6366f1", label: "Interaction" },
  "card":       { icon: CreditCard,   color: "#6366F1", label: "Container"   },
  "form":       { icon: CheckCircle2, color: "#10b981", label: "Input"       },
  "modal":      { icon: Layers,       color: "#f59e0b", label: "Overlay"     },
  "navbar":     { icon: Menu,         color: "#06b6d4", label: "Navigation"  },
  "table":      { icon: Table2,       color: "#ec4899", label: "Data"        },
  "hero":       { icon: Layout,       color: "#6366f1", label: "Section"     },
  "footer":     { icon: Layout,       color: "#8b5cf6", label: "Layout"      },
  "alert":      { icon: Bell,         color: "#6366F1", label: "Feedback"    },
  "dropdown":   { icon: ChevronDown,  color: "#06b6d4", label: "Select"      },
  "badge":      { icon: Star,         color: "#f97316", label: "Label"       },
  "avatar":     { icon: Image,        color: "#ec4899", label: "Media"       },
  "input":      { icon: Type,         color: "#10b981", label: "Form"        },
  "loader":     { icon: Loader2,      color: "#6366f1", label: "State"       },
  "accordion":  { icon: ChevronDown,  color: "#8b5cf6", label: "Expand"      },
  "tab":        { icon: Layout,       color: "#06b6d4", label: "Navigation"  },
  "sidebar":    { icon: Menu,         color: "#6366F1", label: "Layout"      },
  "tooltip":    { icon: Box,          color: "#ec4899", label: "Utility"     },
  "pagination": { icon: ChevronDown,  color: "#6366f1", label: "Navigation"  },
  "breadcrumb": { icon: ArrowUpRight, color: "#8b5cf6", label: "Navigation"  },
};

function getComponentVisual(name) {
  const lower = (name || "").toLowerCase();
  for (const [key, val] of Object.entries(componentIconMap)) {
    if (lower.includes(key)) return val;
  }
  return { icon: Code2, color: "#6366f1", label: "Component" };
}

export default function ComponentCard({ component, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  if (!component) return null;

  const favorited = isFavorite(component._id);
  const isNew = component.createdAt 
    ? new Date() - new Date(component.createdAt) < 7 * 24 * 60 * 60 * 1000 
    : false;
    
  const visual = getComponentVisual(component.name);
  const VisualIcon = visual.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--border-soft)",
        borderRadius: "20px",
        overflow: "hidden",
      }}
      whileHover={{
        y: -6,
        borderColor: "rgba(99,102,241,0.3)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15)",
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* ── Preview ── */}
      <Link to={`/components/${component.slug}`} className="block relative overflow-hidden" style={{ flexShrink: 0 }}>
        <div className="relative overflow-hidden" style={{ height: "196px", background: "var(--bg-elevated)" }}>

          {component.previewImage ? (
            <img
              src={component.previewImage}
              alt={component.name || "Component preview"}
              className="w-full h-full object-cover transition-transform duration-700 origin-center hover:scale-[1.06]"
              loading="lazy"
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-4"
              style={{ background: "var(--bg-elevated)" }}>

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }} />

              {/* Ambient glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${visual.color}15, transparent 70%)`,
                  transition: "opacity 0.5s ease",
                }} />

              {/* Floating accent dots */}
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute"
                style={{
                  top: "18px", right: "22px",
                  width: "8px", height: "8px",
                  borderRadius: "2px",
                  background: `${visual.color}40`,
                }}
              />
              <motion.div
                animate={{ y: [4, -4, 4], x: [-2, 2, -2] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute"
                style={{
                  bottom: "22px", left: "18px",
                  width: "5px", height: "5px",
                  borderRadius: "50%",
                  background: `${visual.color}50`,
                }}
              />
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute"
                style={{
                  top: "30px", left: "28px",
                  width: "4px", height: "4px",
                  borderRadius: "50%",
                  background: "var(--gold)",
                  opacity: 0.3,
                }}
              />

              {/* Main icon container */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "20px",
                  background: `linear-gradient(135deg, ${visual.color}18, ${visual.color}08)`,
                  border: `1px solid ${visual.color}25`,
                  boxShadow: `0 8px 32px ${visual.color}12`,
                }}
                whileHover={{ scale: 1.08, rotate: 5 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <VisualIcon size={28} style={{ color: visual.color }} strokeWidth={1.5} />
              </motion.div>

              {/* Label pill */}
              <div className="relative z-10 flex items-center gap-1.5 px-3 py-1"
                style={{
                  background: `${visual.color}10`,
                  border: `1px solid ${visual.color}20`,
                  borderRadius: "8px",
                }}>
                <span className="text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: `${visual.color}cc` }}>
                  {visual.label}
                </span>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(to top, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.2) 50%, transparent 100%)",
              transition: "opacity 0.4s ease",
            }}>
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="absolute bottom-4 left-0 right-0 flex justify-center"
            >
              <span className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                  borderRadius: "10px",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                  color: "#fff",
                }}>
                View Component <ArrowUpRight size={12} />
              </span>
            </motion.div>
          </div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 z-10">
            {component.isFeatured && (
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #4F46E5)",
                  color: "#fff",
                  borderRadius: "7px",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
                }}>
                <Sparkles size={9} /> Featured
              </span>
            )}
            {isNew && (
              <span className="px-2.5 py-1 text-[10px] font-bold"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  borderRadius: "7px",
                  boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
                }}>
                New
              </span>
            )}
          </div>

          {/* Favorite */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.88 }}
            onClick={(e) => { e.preventDefault(); toggleFavorite(component._id); }}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center"
            style={{
              background: favorited ? "rgba(244,63,94,0.15)" : "rgba(10,10,11,0.6)",
              backdropFilter: "blur(10px)",
              border: favorited ? "1px solid rgba(244,63,94,0.35)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              transition: "all 0.25s ease",
            }}
          >
            <Heart size={13} className={favorited ? "fill-rose-500 text-rose-500" : "text-white/60"} />
          </motion.button>
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <Link to={`/components/${component.slug}`} className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm leading-snug line-clamp-1 hover:text-[var(--gold)] transition-colors"
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
              {component.name}
            </h3>
          </Link>
          {component.category?.name && (
            <span className="shrink-0 px-2.5 py-0.5 rounded-md text-[10px] font-semibold"
              style={{
                background: "rgba(99,102,241,0.08)",
                color: "var(--gold)",
                border: "1px solid rgba(99,102,241,0.18)",
              }}>
              {component.category.name}
            </span>
          )}
        </div>

        {/* Description */}
        {component.description && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {component.description}
          </p>
        )}

        {/* Tags */}
        {component.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {component.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag._id} tag={tag} />
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Stats */}
        <div className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <Eye size={11} style={{ color: "#818CF8" }} />
            <span style={{ color: "var(--text-secondary)" }}>{component.viewCount ?? 0}</span>
          </span>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <Copy size={11} style={{ color: "#A78BFA" }} />
            <span style={{ color: "var(--text-secondary)" }}>{component.copyCount ?? 0}</span>
          </span>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
            <Code2 size={11} style={{ color: "#22D3EE" }} />
            <span style={{ color: "var(--text-secondary)" }}>{component.codeVariants?.length ?? 0} variants</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}