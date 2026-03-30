import { Outlet } from "react-router-dom";
import Sidebar    from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen" style={{ background: "#0e0e10" }}>
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 sm:p-8">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}