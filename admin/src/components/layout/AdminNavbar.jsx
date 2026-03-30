// admin/src/components/layout/AdminNavbar.jsx

import { Menu, Bell, Search }  from "lucide-react";
import { useAdminAuth }        from "../../hooks/useAdminAuth";
import { useLocation }         from "react-router-dom";

const pageTitles = {
  "/":           "Dashboard",
  "/components": "Components",
  "/components/add":  "Add Component",
  "/categories": "Categories",
  "/tags":       "Tags",
};

export default function AdminNavbar({ onMenuClick }) {
  const { admin }  = useAdminAuth();
  const location   = useLocation();
  const title      = pageTitles[location.pathname] ?? "Admin";

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b shrink-0"
      style={{ backgroundColor: "#0d1117", borderColor: "#1e2535" }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-8 h-8 rounded-lg border flex items-center justify-center hover:border-indigo-500 transition-all"
          style={{ borderColor: "#1e2535" }}
        >
          <Menu size={16} className="text-slate-400" />
        </button>

        <div>
          <h1 className="font-semibold text-slate-100 text-sm">{title}</h1>
          <p className="text-xs text-slate-500">UIVault Admin Panel</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
          {admin?.name?.[0]?.toUpperCase() ?? "A"}
        </div>
      </div>
    </header>
  );
}