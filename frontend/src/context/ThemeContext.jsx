// frontend/src/context/ThemeContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default to dark mode for the Radiant Void theme
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("ui-theme");
    return saved ? saved === "dark" : true; // Default dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("ui-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("ui-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);