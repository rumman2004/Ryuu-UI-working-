// frontend/src/components/shared/TagBadge.jsx

import { motion } from "framer-motion";

export default function TagBadge({ tag, onClick, selected = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(tag)}
      className="px-3 py-1 rounded-full text-xs font-medium transition-all"
      style={{
        backgroundColor: selected ? tag.color        : `${tag.color}20`,
        color:           selected ? "#ffffff"         : tag.color,
        border:          `1px solid ${tag.color}50`,
      }}
    >
      {tag.name}
    </motion.button>
  );
}