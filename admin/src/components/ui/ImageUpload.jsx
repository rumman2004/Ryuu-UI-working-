// admin/src/components/ui/ImageUpload.jsx

import { useState, useRef }  from "react";
import { motion }            from "framer-motion";
import { Upload, X, Image }  from "lucide-react";

export default function ImageUpload({ value, onChange }) {
  const [dragging, setDragging] = useState(false);
  const inputRef               = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border group" style={{ borderColor: "#1e2535" }}>
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setDragging(true);  }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          animate={{ borderColor: dragging ? "#6366f1" : "#1e2535" }}
          className="h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:border-indigo-500/60 hover:bg-indigo-500/5"
          style={{ backgroundColor: "#0d1117" }}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            {dragging
              ? <Upload size={20} className="text-indigo-400" />
              : <Image  size={20} className="text-slate-500"  />
            }
          </div>
          <p className="text-sm text-slate-400 font-medium">
            {dragging ? "Drop image here" : "Click or drag to upload"}
          </p>
          <p className="text-xs text-slate-600">PNG, JPG, WEBP up to 5MB</p>
        </motion.div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}