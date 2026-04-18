import React, { useState } from "react";
import "./styles/global.css";

import Navbar from "./components/Navbar";
import { Footer, Toast } from "./components/SharedComponents";

import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import DownloadPage from "./pages/DownloadPage";
import SellerDashboard from "./pages/SellerDashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";

export const AppContext = React.createContext();

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState("");

  const navigate = (p, project = null) => {
    if (project) setSelectedProject(project);
    setPage(p);
    window.scrollTo(0, 0);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const pages = {
    home: <HomePage />,
    browse: <BrowsePage />,
    detail: <ProjectDetailPage />,
    checkout: <CheckoutPage />,
    download: <DownloadPage />,
    seller: <SellerDashboard />,
    user: <UserDashboard />,
    admin: <AdminPanel />,
    about: <AboutPage />,
    contact: <ContactPage />,
    legal: <LegalPage />,
  };

  return (
    <AppContext.Provider value={{ navigate, selectedProject, showToast }}>
      <div className="app">
        <Navbar currentPage={page} />
        <main>{pages[page] || <HomePage />}</main>
        {!["seller", "admin", "user"].includes(page) && <Footer />}
        <Toast message={toast} />
      </div>
    </AppContext.Provider>
  );
}