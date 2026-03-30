// frontend/src/hooks/useComponents.js

import { useState, useEffect, useCallback } from "react";
import { getComponents } from "../services/api";

export const useComponents = (params = {}) => {
  const [components,  setComponents]  = useState([]);   // ✅ always an array
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [totalPages,  setTotalPages]  = useState(1);
  const [total,       setTotal]       = useState(0);

  const fetchComponents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await getComponents(params);

      // ✅ Safe access with fallback to [] at every level
      setComponents(data?.data        ?? []);
      setTotalPages(data?.totalPages  ?? 1);
      setTotal(data?.total            ?? 0);
    } catch (err) {
      console.error("useComponents error:", err);
      setError(err.response?.data?.message || "Failed to fetch components");
      setComponents([]);  // ✅ never leave as undefined on error
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  return { components, loading, error, totalPages, total, refetch: fetchComponents };
};