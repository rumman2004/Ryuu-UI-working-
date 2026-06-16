// frontend/src/pages/Home.jsx
// Clean, professional landing — single accent, calm motion.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Command, Copy, Layers, Zap, Globe2, Users } from "lucide-react";
import { getCategories, getTags } from "../services/api";

/* ─── Animation Variants ─── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    Promise.all([getCategories(), getTags()]).then(([catRes, tagRes]) => {
      setCategories(catRes?.data?.data || []);
      setTags(tagRes?.data?.data || []);
    });
  }, []);

  return (
    <div
      className="overflow-x-hidden relative min-h-screen"
      style={{ background: "var(--bg-void)", color: "var(--text-primary)", fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Subtle ambient background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="absolute top-[-15%] right-[5%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(120px)" }}
        />
      </div>

      {/* ════════ HERO ════════ */}
      <section className="relative max-w-[1100px] mx-auto px-6 pt-28 pb-20 lg:pt-36 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-7 flex justify-center">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase"
              style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
            >
              <Sparkles size={11} />
              Open Source · Free Forever
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mb-6 mx-auto max-w-[820px]"
            style={{ fontWeight: 800, fontSize: "clamp(2.75rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 1.04 }}
          >
            The UI library{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818CF8 0%, #6366F1 55%, #4F46E5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              built for builders.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-9 mx-auto max-w-[560px]"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--text-secondary)" }}
          >
            Copy-paste production-ready components into your React or HTML projects.
            Zero lock-in, zero cost, zero compromise on quality.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/components"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--accent)", color: "var(--accent-contrast)", fontWeight: 600,
                fontSize: "0.9375rem", padding: "13px 26px", borderRadius: "12px", textDecoration: "none",
              }}
            >
              Browse Components <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--bg-elevated)", color: "var(--text-secondary)", fontWeight: 500,
                fontSize: "0.9375rem", padding: "12px 22px", borderRadius: "12px",
                border: "1px solid var(--border-medium)", textDecoration: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub
            </a>
          </motion.div>

          {/* Tag cloud (replaces busy marquee) */}
          {tags.length > 0 && (
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-2 max-w-[760px] mx-auto">
              {tags.slice(0, 14).map((tag) => (
                <Link
                  key={tag._id}
                  to={`/components?tags=${tag._id}`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors"
                  style={{
                    background: "var(--bg-elevated)", border: "1px solid var(--border-soft)",
                    color: "var(--text-secondary)", textDecoration: "none",
                  }}
                >
                  {tag.name}
                </Link>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ════════ STATS BAR ════════ */}
      <section className="relative border-y" style={{ borderColor: "var(--border-soft)", background: "var(--bg-raised)" }}>
        <div className="max-w-[1100px] mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "200+", label: "Components", icon: <Layers size={18} /> },
              { value: "29M+", label: "Lines copied", icon: <Copy size={18} /> },
              { value: "100M+", label: "Sites powered", icon: <Globe2 size={18} /> },
              { value: "12K+", label: "Developers", icon: <Users size={18} /> },
            ].map(({ value, label, icon }) => (
              <div key={label} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-muted)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
                >
                  {icon}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.375rem", letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ CATEGORIES ════════ */}
      <section className="max-w-[1100px] mx-auto px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div
              className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "var(--accent-muted)", border: "1px solid var(--accent-border)",
                fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--accent)",
              }}
            >
              <Command size={11} />
              Browse by Category
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--text-primary)" }}>
              Everything you need to build.
            </h2>
          </div>
          <Link
            to="/components"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)", textDecoration: "none" }}
          >
            View all <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        {categories.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} style={{ height: "150px", background: "var(--bg-elevated)", borderRadius: "16px", animation: "skeleton-pulse 1.8s ease-in-out infinite" }} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {categories.slice(0, 8).map((cat) => (
              <motion.div key={cat._id} variants={fadeUp}>
                <Link
                  to={`/components?category=${cat._id}`}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl h-[150px]"
                  style={{ background: "var(--bg-raised)", border: "1px solid var(--border-soft)", textDecoration: "none", transition: "all 0.25s var(--ease-out)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-soft)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "var(--accent-muted)", border: "1px solid var(--accent-border)" }}>
                      <Layers size={20} style={{ color: "var(--accent)" }} />
                    </div>
                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <h3 className="capitalize mb-0.5" style={{ fontWeight: 700, fontSize: "1.125rem", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                      {cat.componentCount || 0} components
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ════════ WORKFLOW ════════ */}
      <section className="relative border-t" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-base)" }}>
        <div className="max-w-[1100px] mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-raised)", border: "1px solid var(--border-soft)" }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>Your workflow</span>
                <span className="px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", fontSize: "0.6875rem", fontWeight: 700, color: "#34D399" }}>
                  3 steps
                </span>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { n: "01", label: "Browse & find the component", done: true },
                  { n: "02", label: "Copy the React or HTML code", done: true },
                  { n: "03", label: "Paste & customize to your brand", done: false },
                ].map(({ n, label, done }) => (
                  <div
                    key={n}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: done ? "var(--accent-muted)" : "var(--bg-elevated)", border: `1px solid ${done ? "var(--accent-border)" : "var(--border-subtle)"}` }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: done ? "var(--accent-muted)" : "var(--bg-float)", border: `1px solid ${done ? "var(--accent-border)" : "var(--border-soft)"}`, fontWeight: 800, fontSize: "0.75rem", color: done ? "var(--accent)" : "var(--text-muted)" }}
                    >
                      {done ? "✓" : n}
                    </div>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: done ? "var(--text-primary)" : "var(--text-secondary)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}>
            <div
              className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "var(--accent-muted)", border: "1px solid var(--accent-border)", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}
            >
              <Zap size={11} />
              Zero Config
            </div>
            <h2 className="mb-5" style={{ fontWeight: 800, fontSize: "clamp(1.875rem, 3vw, 2.75rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)" }}>
              From browse to production in seconds.
            </h2>
            <p className="mb-8" style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "440px" }}>
              No npm installs. No config files. No Figma required. Browse, copy, paste — and your UI is live.
              Works with any React or HTML stack.
            </p>
            <Link to="/components" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.9375rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
              Start browsing <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="max-w-[1100px] mx-auto px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--accent-border)" }}
        >
          <div
            className="absolute top-[-40%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)", filter: "blur(60px)" }}
          />
          <div className="relative z-10 px-8 py-14 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-lg text-center md:text-left">
              <h2 className="mb-3" style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)" }}>
                Ready to ship something great?
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Join thousands of developers using Black UI to build faster, better UIs. Copy any component for free, forever.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                to="/components"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 26px", borderRadius: "12px", background: "var(--accent)", color: "var(--accent-contrast)", fontWeight: 700, fontSize: "0.9375rem", textDecoration: "none", whiteSpace: "nowrap" }}
              >
                Get Started Free <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 22px", borderRadius: "12px", background: "var(--bg-elevated)", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9375rem", border: "1px solid var(--border-medium)", textDecoration: "none", whiteSpace: "nowrap" }}
              >
                Star on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
