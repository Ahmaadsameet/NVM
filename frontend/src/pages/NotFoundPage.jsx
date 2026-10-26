import React from "react";
import { useLanguage } from "../i18n";
import "../styles/pages/not-found.css";

const copy = {
  en: { label: "PAGE NOT FOUND", title: "This page isn't here.", description: "The page you’re looking for may have moved or no longer exists.", back: "GO BACK" },
  de: { label: "SEITE NICHT GEFUNDEN", title: "Diese Seite gibt es nicht.", description: "Die gesuchte Seite wurde möglicherweise verschoben oder existiert nicht mehr.", back: "ZURÜCK" },
  fr: { label: "PAGE INTROUVABLE", title: "Cette page n’existe pas.", description: "La page que vous cherchez a peut-être été déplacée ou n’existe plus.", back: "RETOUR" },
};

export default function NotFoundPage() {
  const { language } = useLanguage();
  const t = copy[language] || copy.en;

  return <main className="not-found"><span className="not-found-code" aria-hidden="true">404</span><section className="not-found-content"><span className="eyebrow">{t.label}</span><h1>{t.title}</h1><p>{t.description}</p><a className="solid-button" href="/">{t.back}</a></section><span className="not-found-brand">NORTH WEAVE MILLS · GERMANY</span></main>;
}
