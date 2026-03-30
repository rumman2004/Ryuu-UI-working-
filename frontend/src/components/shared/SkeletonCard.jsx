// frontend/src/components/shared/SkeletonCard.jsx

export default function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="h-48 w-full" style={{ background: "#19191c" }} />
      <div className="p-4 space-y-3">
        <div className="h-4 rounded-xl w-2/3"  style={{ background: "#1f1f22" }} />
        <div className="h-3 rounded-xl w-full" style={{ background: "#1f1f22" }} />
        <div className="h-3 rounded-xl w-4/5"  style={{ background: "#1f1f22" }} />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 rounded-full" style={{ background: "#1f1f22" }} />
          <div className="h-5 w-12 rounded-full" style={{ background: "#1f1f22" }} />
        </div>
        <div className="flex justify-between pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="h-3 w-16 rounded-xl" style={{ background: "#1f1f22" }} />
          <div className="h-3 w-16 rounded-xl" style={{ background: "#1f1f22" }} />
        </div>
      </div>
    </div>
  );
}