// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ComponentsPage from "./pages/ComponentsPage";
import ComponentDetail from "./pages/ComponentDetail";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>
          <Layout>
            <Routes>
              <Route path="/"                    element={<Home />} />
              <Route path="/components"          element={<ComponentsPage />} />
              <Route path="/components/:slug"    element={<ComponentDetail />} />
              <Route path="/favorites"           element={<FavoritesPage />} />
              <Route path="*"                    element={<NotFound />} />
            </Routes>
          </Layout>
        </FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}