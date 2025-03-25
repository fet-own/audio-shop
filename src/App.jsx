import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import CategoryPage from "./pages/CategoryPage";
import FaqPage from "./pages/FaqPage";
import ServicesPage from "./pages/ServicesPage";
import ComparePage from "./pages/ComparePage";
import FavoritesPage from "./pages/FavoritesPage";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/company" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;