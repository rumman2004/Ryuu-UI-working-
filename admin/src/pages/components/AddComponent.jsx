import { useEffect, useState }    from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion }                 from "framer-motion";
import { Save, ArrowLeft }        from "lucide-react";
import Editor                     from "@monaco-editor/react";
import {
  createComponent, updateComponent, getComponentById,
  getCategories, getTags,
} from "../../services/adminApi";
import toast from "react-hot-toast";

const EMPTY = {
  name: "", slug: "", description: "",
  category: "", tags: [],
  code: { html: "", css: "", js: "", react: "" },
  isPublished: false,
};

export default function AddComponent({ isEdit }) {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [form,       setForm]       = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [allTags,    setAllTags]    = useState([]);
  const [loading,    setLoading]    = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab,  setActiveTab]  = useState("react");


  useEffect(() => {
    Promise.all([getCategories(), getTags()]).then(([c, t]) => {
      setCategories(c.data?.data ?? c.data ?? []);
      setAllTags(t.data?.data    ?? t.data ?? []);
    });
    if (isEdit && id) {
      getComponentById(id)
        .then((res) => {
          const comp = res.data?.data ?? res.data;
          const codeFromVariants = { html: "", css: "", js: "", react: "" };

          if (Array.isArray(comp.codeVariants)) {
            comp.codeVariants.forEach((variant) => {
              if (variant.language === "react") {
                codeFromVariants.react = variant.code ?? "";
                codeFromVariants.css = variant.cssCode ?? codeFromVariants.css;
              }
              if (variant.language === "html") {
                codeFromVariants.html = variant.code ?? "";
                codeFromVariants.css = variant.cssCode ?? codeFromVariants.css;
                codeFromVariants.js = variant.jsCode ?? codeFromVariants.js;
              }
            });
          } else if (comp.code) {
            codeFromVariants.html  = comp.code.html ?? "";
            codeFromVariants.css   = comp.code.css  ?? "";
            codeFromVariants.js    = comp.code.js   ?? "";
          }

          setForm({
            name:        comp.name        ?? "",
            slug:        comp.slug        ?? "",
            description: comp.description ?? "",
            category:    comp.category?._id ?? comp.category ?? "",
            tags:        comp.tags?.map((t) => t._id ?? t) ?? [],
            code:        codeFromVariants,
            isPublished: comp.isPublished ?? false,
          });
        })
        .catch(() => toast.error("Failed to load component"))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const toggleTag = (tagId) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((t) => t !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Name is required"); return; }

    const codeVariants = [];
    if (form.code.react.trim()) {
      codeVariants.push({
        language: "react",
        code:     form.code.react,
        cssCode:  form.code.css || "",
        jsCode:   "",
      });
    }
    if (form.code.html.trim()) {
      codeVariants.push({
        language: "html",
        code:     form.code.html,
        cssCode:  form.code.css || "",
        jsCode:   form.code.js || "",
      });
    }

    if (!codeVariants.length) {
      toast.error("Add at least one code variant (React or HTML)");
      return;
    }

    const payload = {
      ...form,
      codeVariants,
    };

    try {
      setSubmitting(true);
      if (isEdit) {
        await updateComponent(id, payload);
        toast.success("Component updated!");
      } else {
        await createComponent(payload);
        toast.success("Component created!");
      }
      navigate("/components");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally { setSubmitting(false); }
  };

  const inputStyle = {
    backgroundColor: "#0d1117",
    borderColor:     "#1e2535",
    color:           "#e2e8f0",
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all";

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/components")}
          className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">
          {isEdit ? "Edit Component" : "Add Component"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <div
          className="rounded-2xl border p-6 space-y-4"
          style={{ backgroundColor: "#111827", borderColor: "#1e2535" }}
        >
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Basic Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="comp-name" className="block text-xs text-slate-500 mb-1.5">Name *</label>
              <input
                id="comp-name"
                name="name"
                required
                placeholder="Button"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="comp-slug" className="block text-xs text-slate-500 mb-1.5">Slug</label>
              <input
                id="comp-slug"
                name="slug"
                placeholder="button"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <label htmlFor="comp-description" className="block text-xs text-slate-500 mb-1.5">Description</label>
            <textarea
              id="comp-description"
              name="description"
              rows={3}
              placeholder="A short description..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClass + " resize-none"}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="comp-category" className="block text-xs text-slate-500 mb-1.5">Category</label>
            <select
              id="comp-category"
              name="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
              style={inputStyle}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags */}
        <div
          className="rounded-2xl border p-6"
          style={{ backgroundColor: "#111827", borderColor: "#1e2535" }}
        >
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const selected = form.tags.includes(tag._id);
              return (
                <button
                  key={tag._id}
                  type="button"
                  onClick={() => toggleTag(tag._id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    selected
                      ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/40"
                      : "text-slate-500 border-[#1e2535] hover:border-slate-500"
                  }`}
                >
                  {tag.name}
                </button>
              );
            })}
            {allTags.length === 0 && (
              <p className="text-sm text-slate-600">No tags yet. Add some in the Tags page.</p>
            )}
          </div>
        </div>

        {/* Code Editor */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "#111827", borderColor: "#1e2535" }}
        >
          <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide border-b" style={{ borderColor: "#1e2535" }}>
            {["react", "html", "css", "js"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <Editor
            height="320px"
            language={activeTab === "js" || activeTab === "react" ? "javascript" : activeTab}
            value={form.code[activeTab]}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, code: { ...prev.code, [activeTab]: val ?? "" } }))
            }
            theme="vs-dark"
            options={{
              fontSize:        14,
              minimap:         { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers:     "on",
              wordWrap:        "on",
              padding:         { top: 16 },
            }}
          />
        </div>

        {/* Publish + Submit */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              className={`relative w-11 h-6 rounded-full transition-colors ${
                form.isPublished ? "bg-indigo-500" : "bg-slate-700"
              }`}
              onClick={() => setForm({ ...form, isPublished: !form.isPublished })}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                  form.isPublished ? "left-6" : "left-1"
                }`}
              />
            </div>
            <span className="text-sm text-slate-400">
              {form.isPublished ? "Published" : "Draft"}
            </span>
          </label>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-60"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={16} />
                {isEdit ? "Update Component" : "Save Component"}
              </>
            )}
          </motion.button>
        </div>

      </form>
    </div>
  );
}