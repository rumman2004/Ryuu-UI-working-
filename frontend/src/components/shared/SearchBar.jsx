// frontend/src/components/shared/SearchBar.jsx

import { Search, X }  from "lucide-react";
import { motion }     from "framer-motion";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative group">
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-400"
        style={{ color: "#767577" }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-dark w-full pl-10 pr-10 py-2.5 text-sm"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1   }}
          exit={{    opacity: 0, scale: 0.5 }}
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-indigo-400 transition-colors"
          style={{ color: "#767577" }}
        >
          <X size={14} />
        </motion.button>
      )}
    </div>
  );
}