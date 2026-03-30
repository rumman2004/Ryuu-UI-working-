// frontend/src/components/layout/Navbar.jsx

import { useState, useEffect }            from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFavorites }                   from "../../context/FavoritesContext";
import { motion, AnimatePresence }        from "framer-motion";
import {
  Layers, Search, Heart, Menu, X, Grid, Sun, Moon
} from "lucide-react";
import { useTheme }                       from "../../context/ThemeContext";

export default function Navbar() {
  const { favorites }           = useFavorites();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search,   setSearch]   = useState("");
  const navigate                = useNavigate();
  const location                = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  const navLinks = [
    { to: "/",            label: "Home"       },
    { to: "/components",  label: "Components" },
    { to: "/favorites",   label: "Favorites"  },
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
      style={{
        background: scrolled
          ? "var(--surface-glass-hover)"
          : "var(--surface-glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--ghost-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl shrink-0 group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
            }}
          >
            <Layers size={17} className="text-white" />
          </motion.div>
          <span className="gradient-text font-extrabold tracking-tight">
            UIVault
          </span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full group">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#767577] group-focus-within:text-indigo-400 transition-colors"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components..."
              className="input-dark w-full pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </form>

        <div className="flex-1 hidden md:block" />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: isActive(link.to) ? "#a3a6ff" : "#adaaad",
                  background: isActive(link.to) ? "rgba(99, 102, 241, 0.1)" : "transparent",
                  border: isActive(link.to)
                    ? "1px solid rgba(99, 102, 241, 0.2)"
                    : "1px solid transparent",
                }}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                  {link.to === "/favorites" && favorites.length > 0 && (
                    <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </span>
              </motion.div>
            </Link>
          ))}
          
          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="ml-2 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: "var(--surface-glass)",
              border: "1px solid var(--ghost-border)",
              color: "var(--text-primary)",
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
        </div>

        {/* Mobile Actions Container */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: "var(--surface-glass)",
              border: "1px solid var(--ghost-border)",
              color: "var(--text-primary)",
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "var(--surface-glass)",
            border: "1px solid var(--ghost-border)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={menuOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{   rotate:  90,  opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {menuOpen
                ? <X    size={16} className="text-[#f9f5f8]" />
                : <Menu size={16} className="text-[#f9f5f8]" />
              }
            </motion.div>
          </AnimatePresence>
        </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{    height: 0,      opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
            style={{
              background: "rgba(14, 14, 16, 0.95)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="px-4 py-4 space-y-2">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#767577]" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search components..."
                    className="input-dark w-full pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
              </form>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: isActive(link.to) ? "#a3a6ff" : "#adaaad",
                    background: isActive(link.to) ? "rgba(99,102,241,0.08)" : "transparent",
                  }}
                >
                  {link.label}
                  {link.to === "/favorites" && favorites.length > 0 && (
                    <span className="w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}