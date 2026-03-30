import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";
import { motion }              from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { getComponents, deleteComponent } from "../../services/adminApi";
import toast from "react-hot-toast";

export default function ComponentList() {
  const [components, setComponents] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");

  const fetchComponents = async () => {
    try {
      const res = await getComponents();
      setComponents(res.data?.data ?? res.data ?? []);
    } catch { toast.error("Failed to load components"); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchComponents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this component?")) return;
    try {
      await deleteComponent(id);
      toast.success("Deleted");
      fetchComponents();
    } catch { toast.error("Failed to delete"); }
  };

  const filtered = components.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Components</h1>
        <Link
          to="/components/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
        >
          <Plus size={16} /> Add Component
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          id="component-search"
          name="search"
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
          style={{ backgroundColor: "#111827", borderColor: "#1e2535", color: "#e2e8f0" }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#1e2535" }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#0d1117" }}>
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((comp, i) => (
                <motion.tr
                  key={comp._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t"
                  style={{ borderColor: "#1e2535", backgroundColor: "#111827" }}
                >
                  <td className="px-5 py-3.5 font-medium text-slate-200">{comp.name}</td>
                  <td className="px-5 py-3.5 text-slate-500">{comp.category?.name ?? "—"}</td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {(comp.codeVariants ?? []).map((v) => v.language).join(", ") || "none"}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        comp.isPublished
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-slate-500/15 text-slate-400"
                      }`}
                    >
                      {comp.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/components/edit/${comp._id}`}
                        className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(comp._id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-slate-600 py-12">No components found.</p>
          )}
        </div>
      )}
    </div>
  );
}