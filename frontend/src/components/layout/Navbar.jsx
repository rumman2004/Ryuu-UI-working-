// frontend/src/components/layout/Navbar.jsx

import { useState, useEffect }            from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFavorites }                   from "../../context/FavoritesContext";
import { motion, AnimatePresence }        from "framer-motion";
import { Search, Heart, Menu, X }        from "lucide-react";
import ThemeToggle                        from "../ui/ThemeToggle";
import { useTheme }                       from "../../context/ThemeContext";

const NAV_LINKS = [
  { to: "/",           label: "Home"       },
  { to: "/components", label: "Components" },
  { to: "/favorites",  label: "Favorites"  },
];

export default function Navbar() {
  const { favorites }  = useFavorites();
  const { isDark }     = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search,   setSearch]   = useState("");
  const navigate   = useNavigate();
  const location   = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/components?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <motion.nav
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50"
      style={{
        background: scrolled
          ? "var(--nav-bg-solid)"
          : "var(--nav-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled
          ? "1px solid var(--border-soft)"
          : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 h-16 flex items-center gap-4">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-8 h-8 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)",
              borderRadius: "10px",
              boxShadow: "0 4px 16px rgba(99,102,241,0.25)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="rgba(255,255,255,0.95)" />
              <path d="M12 6L16 8.5V13.5L12 16L8 13.5V8.5L12 6Z" fill="rgba(255,255,255,0.45)" />
            </svg>
          </motion.div>
          <span className="font-extrabold text-lg tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, var(--text-primary) 40%, var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            Black UI
          </span>
        </Link>

        {/* ── Desktop Search ── */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs">
          <div className="relative w-full group">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components…"
              className="w-full pl-10 pr-4 py-2 text-sm transition-all"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-soft)",
                color: "var(--text-primary)",
                borderRadius: "11px",
                outline: "none",
                fontFamily: "var(--font-body)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--gold-border)";
                e.target.style.boxShadow = "0 0 0 3px var(--gold-muted)";
                e.target.style.background = "var(--bg-float)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border-soft)";
                e.target.style.boxShadow = "none";
                e.target.style.background = "var(--bg-elevated)";
              }}
            />
          </div>
        </form>

        <div className="flex-1" />

        {/* ── Desktop Nav Links ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  borderRadius: "10px",
                  color: isActive(link.to) ? "var(--gold)" : "var(--text-secondary)",
                  background: isActive(link.to) ? "var(--gold-muted)" : "transparent",
                  border: isActive(link.to)
                    ? "1px solid var(--gold-border)"
                    : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.to)) {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.background = "var(--bg-elevated)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.to)) {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.to === "/favorites" && favorites.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4.5 h-4.5 text-[9px] font-bold rounded-full flex items-center justify-center"
                      style={{
                        background: "#F43F5E",
                        color: "white",
                        minWidth: "18px",
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        fontSize: "9px",
                        fontWeight: 700,
                      }}
                    >
                      {favorites.length}
                    </motion.span>
                  )}
                </span>
              </motion.div>
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-5 mx-1" style={{ background: "var(--border-soft)" }} />

          <ThemeToggle />
        </div>

        {/* ── Mobile Actions ── */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-medium)",
              borderRadius: "11px",
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={menuOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {menuOpen
                  ? <X size={16} style={{ color: "var(--text-primary)" }} />
                  : <Menu size={16} style={{ color: "var(--text-primary)" }} />
                }
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <div className="px-5 py-4 space-y-2"
              style={{ background: "rgba(10,10,11,0.96)" }}>

              {/* Mobile search */}
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search components…"
                    className="w-full pl-10 pr-4 py-2.5 text-sm"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                      borderRadius: "11px",
                      outline: "none",
                    }}
                  />
                </div>
              </form>

              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.to}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium transition-all"
                    style={{
                      borderRadius: "11px",
                      color: isActive(link.to) ? "var(--gold)" : "var(--text-secondary)",
                      background: isActive(link.to) ? "var(--gold-muted)" : "transparent",
                      border: isActive(link.to)
                        ? "1px solid var(--gold-border)"
                        : "1px solid transparent",
                    }}
                  >
                    {link.label}
                    {link.to === "/favorites" && favorites.length > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full"
                        style={{ background: "#F43F5E", color: "white" }}>
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}