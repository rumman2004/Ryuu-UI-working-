// frontend/src/pages/FavoritesPage.jsx

import { useEffect, useState }   from "react";
import { Link }                  from "react-router-dom";
import { motion }                from "framer-motion";
import { Heart, ArrowRight }     from "lucide-react";
import { useFavorites }          from "../context/FavoritesContext";
import { getComponents }         from "../services/api";
import ComponentCard             from "../components/ui/ComponentCard";
import SkeletonCard              from "../components/shared/SkeletonCard";
import { GlowOrbs }              from "../components/background";

export default function FavoritesPage() {
  const { favorites }               = useFavorites();
  const [components, setComponents] = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setComponents([]);
        setLoading(false);
        return;
      }
      try {
        const { data } = await getComponents({ limit: 100 });
        const saved    = (data?.data ?? []).filter((c) => favorites.includes(c._id));
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
    <div className="relative min-h-screen">
      <GlowOrbs contained />
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(244, 63, 94, 0.1)", border: "1px solid rgba(244, 63, 94, 0.15)" }}
          >
            <Heart size={20} className="text-rose-500 fill-rose-500" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#f9f5f8" }}>
            Your Favorites
          </h1>
        </div>
        <p className="text-sm ml-13" style={{ color: "#adaaad" }}>
          {favorites.length} saved component{favorites.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : components.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-32"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.12)" }}
          >
            <Heart size={32} className="text-rose-500/50" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#f9f5f8" }}>
            No saved components yet
          </h2>
          <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: "#adaaad" }}>
            Click the heart icon on any component to save it here for quick access
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/components"
              className="glow-button inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-2xl"
            >
              <span className="flex items-center gap-2">
                Browse Components <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {components.map((comp, i) => (
            <ComponentCard key={comp._id} component={comp} index={i} />
          ))}
        </motion.div>
      )}
      </div>
    </div>
  );
}