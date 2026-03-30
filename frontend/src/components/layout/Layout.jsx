// frontend/src/components/layout/Layout.jsx

import Navbar        from "./Navbar";
import Footer        from "./Footer";
import { Toaster }   from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pb-10">
        {children}
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f1f22",
            color: "#f9f5f8",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            fontSize: "14px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          },
        }}
      />
    </div>
  );
}