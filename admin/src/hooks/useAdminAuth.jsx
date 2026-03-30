import { useState, useEffect, createContext, useContext } from "react";
import { getMe } from "../services/adminApi";

const AuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin,   setAdmin]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((res) => {
        // { success: true, data: { _id, username, email, role } }
        setAdmin(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem("admin_token");
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (responseData) => {
    // responseData = { _id, username, email, role, token }
    const { token, ...adminData } = responseData;
    localStorage.setItem("admin_token", token);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setAdmin(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AuthContext);