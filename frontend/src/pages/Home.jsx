// frontend/src/pages/Home.jsx

import { useEffect, useState }          from "react";
import { Link }                         from "react-router-dom";
import { motion }                       from "framer-motion";
import {
  ArrowRight, Zap, Star, ChevronRight,
  Puzzle, FolderOpen, Code2, Sparkles,
  Globe, Box, LayoutGrid, MessageSquare,
  BarChart3, Compass, Hexagon, Circle,
  Braces, Triangle, Diamond,
} from "lucide-react";
import { getComponents, getCategories, getTags } from "../services/api";
import ComponentCard                    from "../components/ui/ComponentCard";
import SkeletonCard                     from "../components/shared/SkeletonCard";
import { AuroraBackground, StarField, WaveBackground } from "../components/background";

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const catIcons = {
  "Must-have":   Star,
  "Layout":      LayoutGrid,
  "Advanced":    Zap,
  "Feedback":    MessageSquare,
  "Data":        BarChart3,
  "Navigation":  Compass,
};

const statsBase = [
  { value: "37+", label: "Components", icon: Puzzle,     color: "#a3a6ff" },
  { value: "0",   label: "Categories", icon: FolderOpen, color: "#ac8aff" },
  { value: "2",   label: "Frameworks", icon: Code2,      color: "#67e8f9" },
  { value: "100%",label: "Free & Open", icon: Sparkles,  color: "#34d399" },
];

/* ── Floating Geometric Shapes Component ── */
function FloatingShapes() {
  const shapes = [
    { Icon: Hexagon,  x: "12%",  y: "18%", size: 28, delay: 0,   dur: 12, color: "#6366f1" },
    { Icon: Circle,   x: "85%",  y: "25%", size: 16, delay: 2,   dur: 10, color: "#8b5cf6" },
    { Icon: Braces,   x: "78%",  y: "65%", size: 22, delay: 4,   dur: 14, color: "#06b6d4" },
    { Icon: Triangle, x: "8%",   y: "72%", size: 18, delay: 1,   dur: 11, color: "#6366f1" },
    { Icon: Diamond,  x: "92%",  y: "45%", size: 14, delay: 3,   dur: 13, color: "#8b5cf6" },
    { Icon: Hexagon,  x: "45%",  y: "85%", size: 20, delay: 5,   dur: 15, color: "#06b6d4" },
    { Icon: Code2,    x: "25%",  y: "40%", size: 16, delay: 6,   dur: 9,  color: "#6366f1" },
    { Icon: Box,      x: "68%",  y: "12%", size: 18, delay: 2.5, dur: 11, color: "#8b5cf6" },
  ];
  return (
    <>
      {shapes.map(({ Icon, x, y, size, delay, dur, color }, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-8, 8, -8],
            rotate: [0, 10, -10, 0],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
          className="absolute pointer-events-none"
          style={{ left: x, top: y }}
        >
          <Icon size={size} style={{ color }} strokeWidth={1} />
        </motion.div>
      ))}
    </>
  );
}

/* ── Mesh Gradient Lines ── */
function MeshLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" viewBox="0 0 1200 800" preserveAspectRatio="none">
      <motion.path
        d="M240,120 Q500,300 960,180"
        fill="none" stroke="#6366f1" strokeWidth="1"
        animate={{ d: ["M240,120 Q500,300 960,180", "M240,160 Q500,250 960,220", "M240,120 Q500,300 960,180"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M180,500 Q600,350 1000,600"
        fill="none" stroke="#8b5cf6" strokeWidth="1"
        animate={{ d: ["M180,500 Q600,350 1000,600", "M180,460 Q600,400 1000,560", "M180,500 Q600,350 1000,600"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.path
        d="M350,200 Q700,500 1100,350"
        fill="none" stroke="#06b6d4" strokeWidth="0.5"
        animate={{ d: ["M350,200 Q700,500 1100,350", "M350,250 Q700,450 1100,300", "M350,200 Q700,500 1100,350"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />
    </svg>
  );
}

export default function Home() {
  const [featured,      setFeatured]      = useState([]);
  const [categories,    setCategories]    = useState([]);
  const [tags,          setTags]          = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [compRes, catRes, tagRes] = await Promise.all([
          getComponents({ sort: "-copyCount", limit: 6 }),
          getCategories(),
          getTags(),
        ]);
        setFeatured(compRes?.data?.data   ?? []);
        const categoryList = catRes?.data?.data  ?? [];
        setCategories(categoryList);
        setCategoryCount(categoryList.length);
        setTags(tagRes?.data?.data ?? []);
      } catch (err) {
        console.error("Home fetch error:", err);
        setFeatured([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = statsBase.map((stat) =>
    stat.label === "Categories"
      ? { ...stat, value: `${categoryCount}` }
      : stat
  );

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════
           HERO – Cosmic Animated Background
           (Inspired by Stitch "Digital Obsidian" design)
         ══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-24">

        {/* ── Animated Background Layer ── */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Aurora gradient orbs */}
          <AuroraBackground contained />

          {/* Twinkling starfield with shooting stars */}
          <StarField starCount={150} shootingStars />

          {/* Dot grid overlay */}
          <div className="absolute inset-0 dot-grid opacity-40" />

          {/* Mesh gradient lines */}
          <MeshLines />

          {/* Floating geometric shapes */}
          <FloatingShapes />
        </div>

        {/* ── Hero Content ── */}
        <div className="max-w-4xl mx-auto text-center relative">

          {/* Badge */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold mb-8 cursor-default"
              style={{
                background: "rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                color: "#a3a6ff",
                backdropFilter: "blur(8px)",
              }}
            >
              <Zap size={12} className="text-indigo-400" />
              Open-Source UI Library — Tailwind CSS Components
            </motion.span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-black mb-6 leading-[1.08] tracking-tight"
          >
            <span style={{ color: "var(--text-primary)" }}>Discover Beautiful</span>
            <br />
            <span className="gradient-text-hero">UI Components</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Browse, preview, and copy production-ready React & HTML components.
            Built for modern web developers with pixel-perfect design and animations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/components"
                className="glow-button inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-2xl"
              >
                <span className="flex items-center gap-2">
                  Explore Components
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/favorites"
                className="ghost-button inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-2xl"
              >
                <Star size={15} className="text-amber-400 fill-amber-400" />
                View Favorites
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={5}
            className="flex flex-wrap justify-center gap-4 mt-16 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <stat.icon size={20} style={{ color: stat.color }} strokeWidth={2} />
                </div>
                <span className="text-2xl font-black" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#a3a6ff" }}>
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Browse by Category
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
            Find exactly what you need, organized by purpose and function
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-36 rounded-2xl animate-pulse" style={{ background: "var(--bg-card-solid)", border: "1px solid var(--ghost-border)" }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {categories.map((cat, i) => {
              const CatIcon = catIcons[cat.name] ?? Puzzle;
              return (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    to={`/components?category=${cat._id}`}
                    className="group block p-6 rounded-2xl transition-all relative overflow-hidden"
                    style={{
                      background: "var(--surface-glass)",
                      border: "1px solid var(--ghost-border)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.08)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--ghost-border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Glow */}
                    <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(99,102,241,0.1)" }}
                    >
                      <CatIcon size={22} style={{ color: "#a3a6ff" }} strokeWidth={2} />
                    </div>

                    <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                      {cat.name}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                      <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl"
                        style={{ background: "rgba(99,102,241,0.12)", color: "#a3a6ff" }}
                      >
                        {cat.componentCount ?? 0} components
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-indigo-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Tags ── */}
      {tags.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#ac8aff" }}>
              Discover
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Browse By Tags
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              Explore components grouped by use case, style, and functionality
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {tags.slice(0, 20).map((tag, i) => (
              <motion.div
                key={tag._id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.08 }}
              >
                <Link
                  to={`/components?tags=${tag._id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: "var(--surface-glass)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--ghost-border)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                    e.currentTarget.style.color = "var(--color-accent-light, #a3a6ff)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--ghost-border)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                >
                  {tag.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Featured Components ── */}
      <section className="py-20 relative" style={{ background: "var(--bg-secondary)" }}>
        <WaveBackground contained position="top" />
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest mb-2 block" style={{ color: "#a3a6ff" }}>
                Handpicked
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                Featured Components
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Our most popular and highest quality components
              </p>
            </div>
            <Link
              to="/components"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
            >
              View all
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-20 rounded-2xl" style={{ background: "var(--surface-glass)", border: "1px solid var(--ghost-border)" }}>
              <Puzzle size={40} className="mx-auto mb-4 text-indigo-500 opacity-30" />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                No components yet — add some from the admin panel
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((comp, i) => (
                <ComponentCard key={comp._id} component={comp} index={i} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/components"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400"
            >
              View all components <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Everything you need to know about UIVault
          </p>
        </motion.div>

        <div className="space-y-4">
          {[
            { q: "Is UIVault free to use?", a: "Yes! UIVault is completely free to use. You can explore and copy component code and use them in your projects without any restrictions." },
            { q: "Do I need Tailwind CSS installed?", a: "Yes, UIVault components are built with Tailwind CSS. Check the official Tailwind CSS Documentation for detailed installation instructions." },
            { q: "Are components mobile-responsive?", a: "UIVault components are designed with responsiveness in mind, ensuring they look great on all screen sizes from mobile to desktop." },
            { q: "Can I use these with Next.js, React or Vue?", a: "Yes! UIVault components are compatible with Next.js, React, Vue.js and even static HTML. Simply copy and paste into your project." },
          ].map((item, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl cursor-pointer"
              style={{
                background: "var(--surface-glass)",
                border: "1px solid var(--ghost-border)",
              }}
            >
              <summary className="flex items-center justify-between text-base font-semibold select-none" style={{ color: "var(--text-primary)" }}>
                {item.q}
                <ChevronRight size={16} className="group-open:rotate-90 transition-transform text-indigo-400" />
              </summary>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {item.a}
              </p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-12 text-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #6366f1 100%)" }}
        >
          {/* Dot grid */}
          <div className="absolute inset-0 dot-grid opacity-20" />
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-[60px]" />

          <div className="relative">
            <Sparkles size={32} className="mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Start building today
            </h2>
            <p className="text-white/75 mb-8 max-w-md mx-auto text-sm">
              Hundreds of free, copy-paste components. No signup required.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/components"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl text-sm"
              >
                Browse Components
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}