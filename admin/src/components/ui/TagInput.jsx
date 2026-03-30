// admin/src/components/ui/TagInput.jsx

import { useState }   from "react";
import { X, Plus }    from "lucide-react";

export default function TagInput({ availableTags = [], selectedIds = [], onChange }) {
  const [query, setQuery] = useState("");

  const filtered = availableTags.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) &&
      !selectedIds.includes(t._id)
  );

  const add    = (tag) => { onChange([...selectedIds, tag._id]); setQuery(""); };
  const remove = (id)  => onChange(selectedIds.filter((t) => t !== id));

  const selected = availableTags.filter((t) => selectedIds.includes(t._id));

  return (
    <div>
      {/* Selected */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selected.map((tag) => (
            <span
              key={tag._id}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${tag.color}25`, color: tag.color, border: `1px solid ${tag.color}50` }}
            >
              {tag.name}
              <button onClick={() => remove(tag._id)} className="hover:opacity-70 transition-opacity">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search and add tags..."
          className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
          style={{
            backgroundColor: "#0d1117",
            borderColor:     "#1e2535",
            color:           "#e2e8f0",
          }}
        />

        {query && filtered.length > 0 && (
          <div
            className="absolute z-10 top-full left-0 right-0 mt-1 rounded-xl border overflow-hidden shadow-xl"
            style={{ backgroundColor: "#111827", borderColor: "#1e2535" }}
          >
            {filtered.slice(0, 6).map((tag) => (
              <button
                key={tag._id}
                onClick={() => add(tag)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: tag.color }}
                />
                <span className="text-slate-300">{tag.name}</span>
                <Plus size={13} className="ml-auto text-slate-500" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}