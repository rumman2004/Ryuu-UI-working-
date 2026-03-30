// frontend/src/components/layout/Footer.jsx

import { Link }    from "react-router-dom";
import { Layers, Github, Twitter, Heart, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--ghost-border)" }}>
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-xl mb-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="blackui-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="30%" stopColor="#f472b6" />
                    <stop offset="70%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <path d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" fill="url(#blackui-footer)" />
                <path d="M48 50 L11 28 L11 72 Z" fill="var(--bg-primary)" opacity="0.8" />
                <path d="M52 52 L89 72 L50 95 Z" fill="var(--bg-primary)" opacity="0.8" />
              </svg>
            </div>
            <span className="gradient-text font-extrabold">Black UI</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
            A free, open-source collection of beautiful UI components for React
            and HTML. Copy, paste, and build faster.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[
              { icon: Github,  href: "https://github.com/rumman2004/Ryuu-UI-working-" },
              { icon: Twitter, href: "https://x.com/rumman_tw11" },
              { icon: Instagram, href: "https://www.instagram.com/rumman.ig" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/rummanahmed04" },
            ].map(({ icon: Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:border-indigo-500/50 hover:text-indigo-400"
                style={{
                  background: "var(--surface-glass)",
                  border: "1px solid var(--ghost-border)",
                  color: "var(--text-secondary)",
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Browse */}
        <div>
          <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest" style={{ color: "#767577" }}>
            Browse
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: "All Components", to: "/components" },
              { label: "Favorites",      to: "/favorites"  },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm hover:text-indigo-400 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest" style={{ color: "#767577" }}>
            Resources
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: "Documentation", href: "#" },
              { label: "Changelog",     href: "#" },
              { label: "Support",       href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm hover:text-indigo-400 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="py-5 text-center text-xs flex items-center justify-center gap-1.5"
        style={{ color: "#767577", borderTop: "1px solid var(--ghost-border)" }}
      >
        <span>© {new Date().getFullYear()} Black UI — Built with</span>
        <Heart size={12} className="text-rose-500 fill-rose-500" />
        <span>by Rumman Ahmed</span>
      </div>
    </footer>
  );
}