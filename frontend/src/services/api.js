// frontend/src/services/api.js

import axios from "axios";

// ✅ Reads from frontend/.env — must be prefixed with VITE_
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.warn(
    "⚠️ VITE_API_URL is not defined in your .env file.\n" +
    "Create frontend/.env and add: VITE_API_URL=http://localhost:5000/api"
  );
}

const api = axios.create({
  baseURL: BASE_URL || "/api",   // fallback to /api if .env is missing
  headers: { "Content-Type": "application/json" },
});

// ─── Request interceptor — log outgoing calls in dev ──────────
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`➡️  [API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor — log errors ────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(`❌ [API Error] ${message}`);
    return Promise.reject(error);
  }
);

// ─── Components ───────────────────────────────────────────────
export const getComponents = (params) =>
  api.get("/components", { params });

export const getComponentBySlug = (slug) =>
  api.get(`/components/${slug}`);

export const incrementCopyCount = (id) =>
  api.patch(`/components/${id}/copy`);

// ─── Categories ───────────────────────────────────────────────
export const getCategories = () =>
  api.get("/categories");

// ─── Tags ─────────────────────────────────────────────────────
export const getTags = () =>
  api.get("/tags");

export default api;