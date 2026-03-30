// admin/src/components/ui/StatsCard.jsx

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function StatsCard({ label, value, icon: Icon, color, bg, trend, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="p-5 rounded-2xl border transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5"
      style={{ backgroundColor: "#111827", borderColor: "#1e2535" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          <Icon size={20} style={{ color }} strokeWidth={2} />
        </div>
        {trend !== undefined && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
            <TrendingUp size={12} />
            {trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-slate-100 mb-1">{value ?? "—"}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </motion.div>
  );
}