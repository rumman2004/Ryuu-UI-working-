// frontend/src/pages/FavoritesPage.jsx
// Black UI — "Obsidian Editorial" Redesign

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles, Trash2 } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { getComponents } from "../services/api";
import ComponentCard from "../components/ui/ComponentCard";
import SkeletonCard from "../components/shared/SkeletonCard";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setComponents([]);
        setLoading(false);
        return;
      }
      try {
        const { data } = await getComponents({ limit: 100 });
        const saved = (data?.data ?? []).filter((c) => favorites.includes(c._id));
        setComponents(saved);
      } catch {
        setComponents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [favorites]);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--bg-void)", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="absolute top-0 right-[10%] w-[500px] h-[400px] opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #F43F5E 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", filter: "blur(100px)" }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 py-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div
            className="relative rounded-[28px] px-8 py-10 md:px-14 md:py-12 overflow-hidden"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border-soft)",
            }}
          >
            {/* Rose glow in corner */}
            <div
              className="absolute top-[-20%] right-[-5%] w-72 h-72 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 70%)", filter: "blur(60px)" }}
            />

            <div className="relative z-10 flex items-start justify-between gap-6 flex-wrap">
              <div>
                {/* Icon + title */}
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.2)" }}
                  >
                    <Heart size={24} style={{ color: "#F43F5E", fill: "#F43F5E" }} />
                  </div>
                  <div>
                    <h1
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                        letterSpacing: "-0.035em",
                        lineHeight: 1.0,
                        color: "var(--text-primary)",
                        marginBottom: "4px",
                      }}
                    >
                      Saved Components
                    </h1>
                    <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{favorites.length}</span>
                      {" "}component{favorites.length !== 1 ? "s" : ""} saved
                    </p>
                  </div>
                </div>
              </div>

              {/* Clear all (if there are favorites) */}
              {favorites.length > 0 && typeof clearFavorites === "function" && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={clearFavorites}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#F87171",
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={14} /> Clear All
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Content ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : components.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-36"
          >
            {/* Animated heart */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-7"
              style={{
                background: "rgba(244,63,94,0.06)",
                border: "1px solid rgba(244,63,94,0.12)",
              }}
            >
              <Heart size={40} style={{ color: "rgba(244,63,94,0.35)" }} />
            </motion.div>

            <h2
              className="mb-3"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              Nothing saved yet
            </h2>
            <p
              className="mb-10 max-w-sm text-center"
              style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7 }}
            >
              Click the heart icon on any component to save it here for quick access.
            </p>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/components"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm"
                style={{
                  background: "#6366F1",
                  color: "#fff",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Sparkles size={16} />
                Browse Components
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Decorative empty-state tag cloud */}
            <div className="mt-16 flex flex-wrap gap-2 justify-center max-w-md opacity-30">
              {["Buttons", "Cards", "Modals", "Forms", "Navigation", "Tables", "Layout"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-soft)", color: "var(--text-secondary)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {components.map((comp, i) => (
              <motion.div key={comp._id} variants={fadeUp}>
                <ComponentCard component={comp} index={i} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}