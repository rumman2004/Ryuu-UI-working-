// frontend/src/hooks/useSearch.js

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useSearch = () => {
  const [query, setQuery]   = useState("");
  const navigate            = useNavigate();

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/components?search=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, navigate]
  );

  return { query, setQuery, handleSearch };
};