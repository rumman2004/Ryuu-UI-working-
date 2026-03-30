import { useEffect, useState } from "react";
import { motion }              from "framer-motion";
import { Link }                from "react-router-dom";
import { Package, FolderOpen, Tag, Eye, Copy, Plus, ArrowRight, TrendingUp } from "lucide-react";
import { getComponents, getCategories, getTags } from "../services/adminApi";
import { useAdminAuth } from "../hooks/useAdminAuth";

function StatCard({ label, value, icon: Icon, color, trend, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="stat-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <Icon size={22} style={{ color }} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg"
            style={{ background: "rgba(16,185,129,0.1)", color: "#34d399" }}>
            <TrendingUp size={12} /> {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold mb-1" style={{ color: "#f9f5f8" }}>{value ?? "—"}</p>
      <p className="text-sm" style={{ color: "#767577" }}>{label}</p>
    </motion.div>
  );
}

function QuickAction({ label, desc, icon: Icon, to, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link
        to={to}
        className="group flex items-center gap-4 p-4 rounded-xl transition-all"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${color}30`;
          e.currentTarget.style.background = `${color}08`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "#f9f5f8" }}>{label}</p>
          <p className="text-xs" style={{ color: "#767577" }}>{desc}</p>
        </div>
        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" style={{ color }} />
      </Link>
    </motion.div>
  );
}

export default function Dashboard() {
  const { admin }  = useAdminAuth();
  const [stats, setStats] = useState({ components: 0, categories: 0, tags: 0 });
  const [recentComps, setRecentComps] = useState([]);

  useEffect(() => {
    Promise.all([getComponents(), getCategories(), getTags()])
      .then(([comp, cat, tag]) => {
        const comps = comp.data?.data ?? [];
        setStats({
          components: comps.length || comp.data?.total || 0,
          categories: cat.data?.data?.length   ?? 0,
          tags:       tag.data?.data?.length   ?? 0,
        });
        setRecentComps(comps.slice(0, 5));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold" style={{ color: "#f9f5f8" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#adaaad" }}>
          Welcome back, <span className="font-semibold" style={{ color: "#a3a6ff" }}>{admin?.username}</span> · Here's what's happening in Black UI
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Components" value={stats.components} icon={Package}    color="#6366f1" trend="+12%" delay={0.1} />
        <StatCard label="Categories"       value={stats.categories} icon={FolderOpen} color="#8b5cf6" delay={0.15} />
        <StatCard label="Tags"             value={stats.tags}       icon={Tag}        color="#ec4899" delay={0.2} />
        <StatCard label="Total Views"      value="—"                icon={Eye}        color="#06b6d4" delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Components */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold" style={{ color: "#f9f5f8" }}>Recent Components</h2>
            <Link to="/components" className="text-xs font-semibold transition-colors" style={{ color: "#a3a6ff" }}>
              View All →
            </Link>
          </div>

          {recentComps.length === 0 ? (
            <div className="text-center py-12 rounded-xl" style={{ background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.08)" }}>
              <Package size={32} className="mx-auto mb-3 opacity-30" style={{ color: "#767577" }} />
              <p className="text-sm" style={{ color: "#767577" }}>No components yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table w-full">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Category</th>
                    <th className="text-left">Status</th>
                    <th className="text-right">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComps.map((comp) => (
                    <tr key={comp._id}>
                      <td>
                        <Link to={`/components/edit/${comp._id}`} className="font-medium hover:text-indigo-400 transition-colors" style={{ color: "#e4e1e6" }}>
                          {comp.name}
                        </Link>
                      </td>
                      <td style={{ color: "#adaaad" }}>{comp.category?.name ?? "—"}</td>
                      <td>
                        <span className={comp.isPublished ? "badge-published" : "badge-draft"}>
                          {comp.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="text-right" style={{ color: "#adaaad" }}>{comp.viewCount ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          <h2 className="text-base font-bold mb-4" style={{ color: "#f9f5f8" }}>Quick Actions</h2>

          <QuickAction
            label="Add New Component" desc="Create & publish"
            icon={Plus} to="/components/add" color="#6366f1" delay={0.4}
          />
          <QuickAction
            label="Manage Categories" desc="Organize content"
            icon={FolderOpen} to="/categories" color="#8b5cf6" delay={0.45}
          />
          <QuickAction
            label="Manage Tags" desc="Label & filter"
            icon={Tag} to="/tags" color="#ec4899" delay={0.5}
          />

          {/* Architecture Tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="p-4 rounded-xl mt-4"
            style={{
              background: "rgba(99,102,241,0.05)",
              border: "1px solid rgba(99,102,241,0.1)",
            }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "#a3a6ff" }}>✨ Architecture Tip</p>
            <p className="text-xs leading-relaxed" style={{ color: "#adaaad" }}>
              Use tonal shifts instead of borders for a cleaner, more professional look in your components.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}