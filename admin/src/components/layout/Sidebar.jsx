import { NavLink, useNavigate } from "react-router-dom";
import { motion }               from "framer-motion";
import {
  Layers, LayoutDashboard, Package,
  Tag, FolderOpen, LogOut, ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const navItems = [
  { to: "/",           label: "Dashboard",  icon: LayoutDashboard, end: true },
  { to: "/components", label: "Components", icon: Package },
  { to: "/categories", label: "Categories", icon: FolderOpen },
  { to: "/tags",       label: "Tags",       icon: Tag },
];

export default function Sidebar() {
  const { admin, logout } = useAdminAuth();

  return (
    <aside
      className="w-64 min-h-screen flex flex-col shrink-0"
      style={{
        background: "#0e0e10",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
          }}
        >
          <Layers size={17} className="text-white" />
        </div>
        <div>
          <span className="font-extrabold text-base gradient-text block leading-tight">UIVault</span>
          <span className="text-[10px] font-medium" style={{ color: "#767577" }}>ADMIN PANEL</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? "text-white"
                  : "hover:bg-white/[0.03]"
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? "rgba(99,102,241,0.12)" : "transparent",
              border: isActive ? "1px solid rgba(99,102,241,0.15)" : "1px solid transparent",
              color: isActive ? "#a3a6ff" : "#adaaad",
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={17} style={{ color: isActive ? "#a3a6ff" : "#767577" }} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={14} style={{ color: "#a3a6ff", opacity: 0.6 }} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Admin info + logout */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            {admin?.username?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "#e4e1e6" }}>{admin?.username}</p>
            <p className="text-xs truncate" style={{ color: "#767577" }}>{admin?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: "#adaaad" }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.background = "rgba(248,113,113,0.08)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "#adaaad";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </aside>
  );
}