import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { getTags, createTag, deleteTag } from "../services/adminApi";
import toast from "react-hot-toast";

export default function Tags() {
  const [tags,       setTags]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [name,       setName]       = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTags = async () => {
    try {
      const res = await getTags();
      setTags(res.data?.data ?? res.data ?? []);
    } catch { toast.error("Failed to load tags"); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchTags(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setSubmitting(true);
      await createTag({ name });
      toast.success("Tag created");
      setName("");
      fetchTags();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create tag");
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tag?")) return;
    try {
      await deleteTag(id);
      toast.success("Deleted");
      fetchTags();
    } catch { toast.error("Failed to delete"); }
  };

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Tags</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl panel-card p-6 mb-8"
      >
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Add Tag
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="tag-name"
            name="name"
            required
            placeholder="Tag name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
            style={{ backgroundColor: "#0f1320", borderColor: "#2f3b5a", color: "#e2e8f0" }}
          />
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-60"
          >
            <Plus size={15} /> Add
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.div
                key={tag._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm text-slate-300"
                style={{ backgroundColor: "#0f1228", borderColor: "#2f3b5a" }}
              >
                {tag.name}
                <button
                  onClick={() => handleDelete(tag._id)}
                  className="text-slate-600 hover:text-red-400 transition-colors"
                >
                  <X size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {tags.length === 0 && <p className="text-slate-600">No tags yet.</p>}
        </div>
      )}
    </div>
  );
}