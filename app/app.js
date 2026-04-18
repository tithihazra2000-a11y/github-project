import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage      from "./pages/HomePage";
import BrowseProjects from "./pages/BrowseProjects";
import ProjectDetail  from "./pages/ProjectDetail";
import Checkout       from "./pages/Checkout";
import DownloadPage   from "./pages/Download";
import SellerDashboard from "./pages/seller/SellerDashboard";
import UserDashboard  from "./pages/UserDashboard";
import AdminPanel     from "./pages/AdminPanel";
import { AboutPage, ContactPage, LegalPage } from "./pages/About";

import "./styles/global.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (project) => {
    setCart((prev) => {
      if (prev.find((p) => p.id === project.id)) return prev;
      return [...prev, project];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="app-layout">
        <Navbar cart={cart} />

        <main className="page-content">
          <Routes>
            {/* Public */}
            <Route path="/"           element={<HomePage      onAddToCart={addToCart} />} />
            <Route path="/browse"     element={<BrowseProjects onAddToCart={addToCart} />} />
            <Route path="/project/:id" element={<ProjectDetail onAddToCart={addToCart} cart={cart} />} />
            <Route path="/checkout"   element={<Checkout      cart={cart} onClearCart={clearCart} />} />
            <Route path="/download"   element={<DownloadPage  />} />

            {/* Seller */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/upload"    element={<SellerDashboard />} />
            <Route path="/seller/status"    element={<SellerDashboard />} />

            {/* User */}
            <Route path="/dashboard" element={<UserDashboard />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminPanel />} />

            {/* Info */}
            <Route path="/about"   element={<AboutPage   />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal"   element={<LegalPage   />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;