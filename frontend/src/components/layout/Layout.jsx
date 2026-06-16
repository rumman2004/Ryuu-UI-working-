// frontend/src/components/layout/Layout.jsx

import Navbar      from "./Navbar";
import Footer      from "./Footer";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-void)" }}>
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--bg-float)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-soft)",
            borderRadius: "14px",
            fontSize: "13px",
            fontFamily: "var(--font-body)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#6366F1", secondary: "#0a0a0b" },
          },
          error: {
            iconTheme: { primary: "#F87171", secondary: "#0a0a0b" },
          },
        }}
      />
    </div>
  );
}