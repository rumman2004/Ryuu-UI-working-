// frontend/src/context/ThemeContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default to light mode (prebuiltui-style); dark is opt-in via the toggle.
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("ui-theme");
    return saved ? saved === "dark" : false; // Default light
  });

  useEffect(() => {
    const root = document.documentElement;
    // Dark is the default (:root tokens). Light mode is opt-in via the `.light`
    // class, which the CSS overrides key off of. Keep `.dark` too for any
    // Tailwind `dark:` utilities.
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("ui-theme", "dark");
    } else {
      root.classList.add("light");
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