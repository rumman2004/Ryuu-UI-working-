import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)   // ← was just Promise.reject (missing error arg)
);

// Handle 401 globally
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Auth
export const loginAdmin = (credentials) => adminApi.post("/auth/login", credentials);
export const getMe = () => adminApi.get("/auth/me");

// Components
export const getComponents = (params) => adminApi.get("/components/admin/all", { params });
export const getComponentById = (id) => adminApi.get(`/components/admin/${id}`);
export const createComponent = (data) => adminApi.post("/components", data);
export const updateComponent = (id, data) => adminApi.put(`/components/${id}`, data);
export const deleteComponent = (id) => adminApi.delete(`/components/${id}`);

// Categories
export const getCategories = () => adminApi.get("/categories");
export const createCategory = (data) => adminApi.post("/categories", data);
export const updateCategory = (id, data) => adminApi.put(`/categories/${id}`, data);
export const deleteCategory = (id) => adminApi.delete(`/categories/${id}`);

// Tags
export const getTags   = () => adminApi.get("/tags");
export const createTag = (data) => adminApi.post("/tags", data);
export const updateTag = (id, data) => adminApi.put(`/tags/${id}`, data);
export const deleteTag = (id) => adminApi.delete(`/tags/${id}`);

// Stats
export const getStats = () => adminApi.get("/stats");

export default adminApi;