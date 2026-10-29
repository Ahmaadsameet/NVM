import React from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./i18n";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LegalPage from "./pages/LegalPage";
import "./styles/index.css";
import "./styles/pages/home/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>{window.location.pathname === "/" ? <HomePage /> : ["/agb", "/impressum", "/terms", "/legal-notice", "/datenschutz", "/privacy"].includes(window.location.pathname.replace(/\/$/, "")) ? <LegalPage /> : <NotFoundPage />}</LanguageProvider>
  </React.StrictMode>
);
