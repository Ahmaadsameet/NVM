import React from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./i18n";
import HomePage from "./pages/HomePage";
import "./styles/index.css";
import "./styles/pages/home/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider><HomePage /></LanguageProvider>
  </React.StrictMode>
);
