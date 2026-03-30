import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../services/adminApi";
import toast from "react-hot-toast";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [form,       setForm]       = useState({ name: "", slug: "", description: "" });
  const [editId,     setEditId]     = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data?.data ?? res.data ?? []);
    } catch { toast.error("Failed to load categories"); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      setSubmitting(true);
      if (editId) {
        await updateCategory(editId, form);
        toast.success("Category updated");
      } else {
        await createCategory(form);
        toast.success("Category created");
      }
      setForm({ name: "", slug: "", description: "" });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally { setSubmitting(false); }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setForm({ name: cat.name, slug: cat.slug ?? "", description: cat.description ?? "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await deleteCategory(id);
      toast.success("Deleted");
      fetchCategories();
    } catch { toast.error("Failed to delete"); }
  };

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Categories</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl panel-card p-6 mb-8 space-y-4"
      >
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          {editId ? "Edit Category" : "Add Category"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            id="cat-name"
            name="name"
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
            style={{ backgroundColor: "#0f1320", borderColor: "#2f3b5a", color: "#e2e8f0" }}
          />
          <input
            id="cat-slug"
            name="slug"
            placeholder="Slug (optional)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
            style={{ backgroundColor: "#0f1320", borderColor: "#2f3b5a", color: "#e2e8f0" }}
          />
        </div>
        <input
          id="cat-description"
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
          style={{ backgroundColor: "#0f1320", borderColor: "#2f3b5a", color: "#e2e8f0" }}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-60"
          >
            {editId ? <Check size={15} /> : <Plus size={15} />}
            {editId ? "Update" : "Add Category"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => { setEditId(null); setForm({ name: "", slug: "", description: "" }); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 border border-[#1e2535] hover:border-slate-500 transition-all"
            >
              <X size={15} /> Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {categories.map((cat) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between px-5 py-3.5 rounded-xl panel-card"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200">{cat.name}</p>
                  {cat.slug && <p className="text-xs text-slate-500">{cat.slug}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(cat)} className="p-2 text-slate-500 hover:text-indigo-400 transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(cat._id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {categories.length === 0 && (
            <p className="text-center text-slate-600 py-8">No categories yet.</p>
          )}
        </div>
      )}
    </div>
  );
}