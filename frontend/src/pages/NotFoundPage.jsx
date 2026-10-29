import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n";
import "../styles/pages/not-found.css";

const copy = {
  en: { label: "A THREAD OUT OF PLACE", title: "This page", emphasis: "isn't here.", description: "The page you're looking for may have moved or no longer exists. Let's get you back to what we're building.", back: "BACK TO WEBSITE", status: "PAGE NOT FOUND", country: "GERMANY", legal: ["Legal notice", "Privacy", "Terms"] },
  de: { label: "EIN FADEN AM FALSCHEN ORT", title: "Diese Seite", emphasis: "gibt es nicht.", description: "Die gesuchte Seite wurde möglicherweise verschoben oder existiert nicht mehr. Zurück zu dem, was wir gemeinsam aufbauen.", back: "ZURÜCK ZUR WEBSITE", status: "SEITE NICHT GEFUNDEN", country: "DEUTSCHLAND", legal: ["Impressum", "Datenschutz", "AGB"] },
};

export default function NotFoundPage() {
  const { language } = useLanguage();
  const t = copy[language] || copy.en;
  const routes = language === "de" ? ["/impressum/", "/datenschutz/", "/agb/"] : ["/legal-notice/", "/privacy/", "/terms/"];

  React.useEffect(() => {
    document.title = `404 — ${t.status} | North Weave Mills`;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [t.status]);

  return <div className="not-found">
    <header className="not-found-header">
      <a href="/" aria-label="North Weave Mills home"><img src="/assets/nwm-logo-header.png" alt="North Weave Mills" /></a>
      <span className="not-found-location">{t.country} · NWM</span>
    </header>
    <main className="not-found-content">
      <span className="eyebrow">{t.label}</span>
      <div className="not-found-code" aria-hidden="true">404<span> / </span></div>
      <h1>{t.title}<br /><em>{t.emphasis}</em></h1>
      <p>{t.description}</p>
      <a className="solid-button" href="/">{t.back}<ArrowUpRight size={16} aria-hidden="true" /></a>
    </main>
    <footer className="not-found-footer">
      <span className="not-found-status"><span aria-hidden="true" />404 · {t.status}</span>
      <nav aria-label={language === "de" ? "Rechtliche Informationen" : "Legal information"}>{routes.map((route, i) => <a key={route} href={route}>{t.legal[i]}</a>)}</nav>
      <span>© 2026 NORTH WEAVE MILLS</span>
    </footer>
  </div>;
}
