// frontend/src/components/layout/Footer.jsx

import { Link }    from "react-router-dom";
import { Github, Twitter, Heart, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { motion }  from "framer-motion";

const SOCIAL = [
  { icon: Github,    href: "https://github.com/rumman2004/Ryuu-UI-working-", label: "GitHub" },
  { icon: Twitter,   href: "https://x.com/rumman_tw11",                     label: "X" },
  { icon: Instagram, href: "https://www.instagram.com/rumman.ig",            label: "Instagram" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/rummanahmed04",      label: "LinkedIn" },
];

const BROWSE_LINKS = [
  { label: "All Components", to: "/components" },
  { label: "Favorites",      to: "/favorites"  },
];

const RESOURCE_LINKS = [
  { label: "Documentation", href: "#" },
  { label: "Changelog",     href: "#" },
  { label: "Support",       href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-raised)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 10% 100%, rgba(99,102,241,0.03), transparent 60%)",
        }} />

      <div className="relative max-w-[1320px] mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div
                className="w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)",
                  borderRadius: "11px",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.2)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="rgba(255,255,255,0.95)" />
                  <path d="M12 6L16 8.5V13.5L12 16L8 13.5V8.5L12 6Z" fill="rgba(255,255,255,0.45)" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  background: "linear-gradient(135deg, var(--text-primary) 40%, var(--accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                Black UI
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "var(--text-secondary)" }}>
              A free, open-source collection of beautiful UI components for React and HTML.
              Copy, paste, and build faster.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center transition-all"
                  aria-label={label}
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-soft)",
                    borderRadius: "11px",
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold-border)";
                    e.currentTarget.style.color = "var(--gold)";
                    e.currentTarget.style.background = "var(--gold-muted)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-soft)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "var(--bg-elevated)";
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Browse ── */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}>
              Browse
            </h4>
            <ul className="space-y-2.5">
              {BROWSE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                  >
                    {item.label}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}>
              Resources
            </h4>
            <ul className="space-y-2.5">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                  >
                    {item.label}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Black UI</span>
            <span style={{ color: "var(--border-medium)" }}>·</span>
            <span>Built with</span>
            <Heart size={10} className="fill-rose-500 text-rose-500 inline" />
            <span>by Rumman Ahmed</span>
          </div>
          <div className="flex items-center gap-4" style={{ color: "var(--text-muted)" }}>
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors">License</a>
          </div>
        </div>
      </div>
    </footer>
  );
}