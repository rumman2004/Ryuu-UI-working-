// admin/src/pages/Login.jsx

import { useState, useEffect } from "react";
import { useNavigate }  from "react-router-dom";
import { motion }       from "framer-motion";
import { Layers, Eye, EyeOff, LogIn, Lock, Mail } from "lucide-react";
import { loginAdmin }   from "../services/adminApi";
import { useAdminAuth } from "../hooks/useAdminAuth";
import toast            from "react-hot-toast";

export default function Login() {
  const [form,     setForm]     = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const { admin, login }        = useAdminAuth();
  const navigate                = useNavigate();

  useEffect(() => {
    if (admin) navigate("/", { replace: true });
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginAdmin(form);
      const responseData = res.data?.data;
      if (!responseData?.token) {
        toast.error("Login failed — no token received");
        return;
      }
      login(responseData);
      toast.success(`Welcome back, ${responseData.username}!`);
      navigate("/", { replace: true });
      window.location.replace("/");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Invalid credentials";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0e0e10" }}
    >
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            top: "20%", left: "25%", width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute rounded-full"
          style={{
            bottom: "15%", right: "20%", width: "350px", height: "350px",
            background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute rounded-full"
          style={{
            top: "60%", left: "60%", width: "250px", height: "250px",
            background: "radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              }}
            >
              <Layers size={26} className="text-white" />
            </div>
            <div className="text-center">
              <span className="font-extrabold text-2xl gradient-text block">UIVault</span>
              <span className="text-xs font-medium" style={{ color: "#767577" }}>ADMIN PANEL</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-center mb-1" style={{ color: "#f9f5f8" }}>
            Welcome Back
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: "#adaaad" }}>
            Sign in to manage your components
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#767577" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#767577" }} />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@uivault.io"
                  className="input-admin w-full pl-10 pr-4 py-3 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "#767577" }}>
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#767577" }} />
                <input
                  id="admin-password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-admin w-full pl-10 pr-11 py-3 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#767577" }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-gradient w-full flex items-center justify-center gap-2 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-3"
              style={{ boxShadow: "0 0 20px rgba(99,102,241,0.25)" }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={16} /> Sign In
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "#767577" }}>
          © {new Date().getFullYear()} UIVault · Designed for the void
        </p>
      </motion.div>
    </div>
  );
}