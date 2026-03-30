import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./hooks/useAdminAuth";
import AdminLayout from "./components/layout/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComponentList from "./pages/components/ComponentList";
import AddComponent from "./pages/components/AddComponent";
import Categories from "./pages/Categories";
import Tags from "./pages/Tags";

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
      <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
}

// Redirects to /login if not authenticated
function ProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return <Spinner />;
  return admin ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { admin, loading } = useAdminAuth();

  // Wait until auth state is resolved before rendering any route
  if (loading) return <Spinner />;

  return (
    <Routes>
      {/* Redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={admin ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Protected layout — all admin pages live here */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="components" element={<ComponentList />} />
        <Route path="components/add" element={<AddComponent />} />
        <Route path="components/edit/:id" element={<AddComponent isEdit />} />
        <Route path="categories" element={<Categories />} />
        <Route path="tags" element={<Tags />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}