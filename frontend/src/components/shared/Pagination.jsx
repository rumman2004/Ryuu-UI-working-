// frontend/src/components/shared/Pagination.jsx

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion }                    from "framer-motion";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3)          pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        style={{
          background: "var(--surface-glass)",
          border: "1px solid var(--ghost-border)",
          color: "#e4e1e6",
        }}
      >
        <ChevronLeft size={15} /> Prev
      </motion.button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-1" style={{ color: "#767577" }}>
            …
          </span>
        ) : (
          <motion.button
            key={page}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className="w-9 h-9 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: currentPage === page ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "var(--surface-glass)",
              color:      currentPage === page ? "#ffffff" : "#e4e1e6",
              border:     currentPage === page ? "1px solid rgba(99,102,241,0.3)" : "1px solid var(--ghost-border)",
              boxShadow:  currentPage === page ? "0 4px 16px rgba(99,102,241,0.25)" : "none",
            }}
          >
            {page}
          </motion.button>
        )
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        style={{
          background: "var(--surface-glass)",
          border: "1px solid var(--ghost-border)",
          color: "#e4e1e6",
        }}
      >
        Next <ChevronRight size={15} />
      </motion.button>
    </div>
  );
}