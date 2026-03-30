// frontend/src/components/ui/DownloadZip.jsx

import { Download }              from "lucide-react";
import { motion }                from "framer-motion";
import { downloadComponentZip }  from "../../utils/downloadZip";
import toast                     from "react-hot-toast";

export default function DownloadZip({ component, language }) {
  const handleDownload = () => {
    try {
      downloadComponentZip(component, language);
      toast.success("Downloaded as ZIP!");
    } catch {
      toast.error("Download failed");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium hover:border-indigo-500 hover:text-indigo-500 transition-all"
      style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
    >
      <Download size={15} />
      Download ZIP
    </motion.button>
  );
}