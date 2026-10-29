import React from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import LegalNotice from "./LegalNotice";
import Terms from "./Terms";
import "../styles/pages/legal.css";

const language = ["/privacy", "/legal-notice", "/terms"].includes(window.location.pathname.replace(/\/$/, "")) ? "en" : "de";
const imprint = ["/impressum", "/legal-notice"].includes(window.location.pathname.replace(/\/$/, ""));

const terms = ["/agb", "/terms"].includes(window.location.pathname.replace(/\/$/, ""));

export default function LegalPage() {
  React.useEffect(() => {
    document.title = terms ? `${language === "en" ? "General Terms and Conditions" : "Allgemeine Geschäftsbedingungen"} | North Weave Mills` : imprint ? `${language === "en" ? "Legal Notice" : "Impressum"} | North Weave Mills` : `${language === "en" ? "Privacy Policy" : "Datenschutzerklärung"} | North Weave Mills`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", terms ? (language === "en" ? "General Terms and Conditions of North Weave Mills." : "Allgemeine Geschäftsbedingungen der North Weave Mills.") : imprint ? "Impressum und Anbieterkennzeichnung von North Weave Mills." : "Datenschutzerklärung von North Weave Mills mit Informationen zu Website, Kontaktformular und Datenverarbeitung.");
    document.documentElement.lang = language;
    return () => {
      document.title = "North Weave Mills";
      document.querySelector('meta[name="description"]')?.setAttribute("content", "North Weave Mills — a German production company for apparel brands.");
    };
  }, []);

  return <><main className="legal-page"><a className="legal-home" href="/">NORTH WEAVE MILLS</a><nav className="legal-languages" aria-label="Page language"><a href={terms ? "/agb/" : imprint ? "/impressum/" : "/datenschutz/"} lang="de" aria-current={language === "de" ? "page" : undefined}>Deutsch</a><a href={terms ? "/terms/" : imprint ? "/legal-notice/" : "/privacy/"} lang="en" aria-current={language === "en" ? "page" : undefined}>English</a></nav><article className="legal-content">
    {terms ? <Terms language={language} /> : imprint ? <LegalNotice language={language} /> : <PrivacyPolicy language={language} />}
  </article><a className="legal-back" href="/">{language === "en" ? "Back to home" : "Zur Startseite"}</a></main><footer className="legal-footer"><nav aria-label={language === "de" ? "Rechtliche Informationen" : "Legal information"}>
    {language === "de" ? <><a href="/impressum/">Impressum</a><a href="/datenschutz/">Datenschutz</a><a href="/agb/">AGB</a></> : <><a href="/legal-notice/">Legal notice</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></>}
  </nav><a href="mailto:info@northweavemills.com">info@northweavemills.com</a></footer></>;
}
