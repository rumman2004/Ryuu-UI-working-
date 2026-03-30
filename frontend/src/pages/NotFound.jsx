// frontend/src/pages/NotFound.jsx

import { Link }   from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { StarField, GradientOrbit } from "../components/background";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh]">
      <StarField starCount={120} shootingStars className="-z-20!" />
      <GradientOrbit contained />
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center relative z-10">
      {/* Animated 404 */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1,   opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative mb-6"
      >
        <div
          className="text-[160px] font-black leading-none select-none"
          style={{
            background: "linear-gradient(135deg, #6366f120, #8b5cf620)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-7xl"
        >
          🧩
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          Page not found
        </h1>
        <p className="text-sm mb-10 max-w-sm" style={{ color: "var(--text-secondary)" }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors text-sm"
            >
              <Home size={15} />
              Go Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/components"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border transition-all hover:border-indigo-500 text-sm"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
            >
              <ArrowLeft size={15} />
              Browse Components
            </Link>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}