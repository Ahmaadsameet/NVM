import React from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "../i18n";
import { SectionLabel } from "./SiteChrome";
import { FORM_ACTION, FORM_RECIPIENT } from "../data/contact";

export function BookingSection() {
  const { copy } = useLanguage();
  const t = copy.booking;
  const [mode, setMode] = React.useState(null);
  const titleWords = [...t.titleBefore.trim().split(/\s+/), t.titleEmphasis];
  return (
    <section className={`booking section-pad ${mode ? "has-form" : ""}`} id="book">
      <SectionLabel>{t.label}</SectionLabel>
      <h2 className="book-title" aria-label={`${t.titleBefore} ${t.titleEmphasis}`}>{titleWords.map((word, index) => {
        const Tag = index === titleWords.length - 1 ? "em" : "span";
        return <Tag className="book-title-word" style={{ "--word-index": index }} aria-hidden="true" key={`${word}-${index}`}>{word}</Tag>;
      })}</h2>
      <p>{t.description}</p>
      {mode === null ? <div className="comparison booking-options">
        <button className="comparison-card booking-option" type="button" onClick={() => setMode("inquiry")}>
          <SectionLabel>{copy.nav.book}</SectionLabel>
          <h3>{t.sendInquiry}</h3>
          <p>{t.description}</p>
          <span className="booking-option-action">{t.sendInquiry} <ArrowUpRight size={16} /></span>
        </button>
        <button className="comparison-card bright booking-option" type="button" onClick={() => setMode("brief")}>
          <SectionLabel>{t.briefLabel}</SectionLabel>
          <h3>{t.briefLabel}</h3>
          <p>{t.briefDescription}</p>
          <span className="booking-option-action">{t.openBrief} <ArrowUpRight size={16} /></span>
        </button>
      </div> : <div className="comparison booking-options has-selection">
        <div className="comparison-card booking-form-card">
          <div className="booking-form-card-heading">
            <div>
              <SectionLabel>{mode === "inquiry" ? copy.nav.book : t.briefLabel}</SectionLabel>
              <h3>{mode === "inquiry" ? t.sendInquiry : t.briefLabel}</h3>
              <p>{mode === "inquiry" ? t.description : t.briefDescription}</p>
            </div>
            <button className="booking-close" type="button" aria-label={copy.nav.close} onClick={() => setMode(null)}><X size={13} aria-hidden="true" /><span>{copy.nav.close}</span></button>
          </div>
          {mode === "inquiry" ? <form id="inquiry-form" action={FORM_ACTION} method="POST">
            <FormSettings type="inquiry" />
            <div className="form-grid"><label>{t.name}<input name="name" required type="text" placeholder={t.namePlaceholder} /></label><label>{t.email}<input name="email" required type="email" placeholder="you@brand.com" /></label></div>
            <label>{t.message}<textarea name="message" required minLength="10" placeholder={t.messagePlaceholder} rows="4" /></label>
            <FormNotice />
            <button className="solid-button inquiry-submit" type="submit">{t.sendInquiry} <ArrowUpRight size={16} /></button>
          </form> : <ProjectBrief t={t} />}
        </div>
      </div>}
    </section>
  );
}

function ProjectBrief({ t }) {
  return <form className="brief-form" action={FORM_ACTION} method="POST"><FormSettings type="brief" /><div className="form-grid"><label>{t.brand}<input name="brand_name" required type="text" placeholder={t.brandPlaceholder} /></label><label>{t.instagram}<input name="instagram" type="text" placeholder="@yourbrand" /></label></div><div className="form-grid"><label>{t.contactEmail}<input name="email" required type="email" placeholder="you@brand.com" /></label><label>{t.total}<input name="total_pieces" required type="number" min="1" step="1" placeholder="e.g. 500" /></label></div><label>{t.product}<input name="product_type" required type="text" placeholder={t.productPlaceholder} /></label><div className="form-grid"><label>{t.colours}<input name="colours" required type="text" placeholder={t.coloursPlaceholder} /></label><label>{t.pieces}<input name="pieces_per_style" required type="text" placeholder={t.piecesPlaceholder} /></label></div><fieldset><legend>{t.techPacks}</legend><label className="radio-label"><input name="tech_packs_available" required type="radio" value="yes" /> {t.yes}</label><label className="radio-label"><input name="tech_packs_available" required type="radio" value="no" /> {t.no}</label></fieldset><FormNotice /><button className="solid-button" type="submit">{t.sendBrief} <ArrowUpRight size={16} /></button></form>;
}

function FormSettings({ type }) {
  const { language } = useLanguage();
  return <>
    <input type="hidden" name="form_type" value={type} />
    <input type="hidden" name="language" value={language} />
    <div className="form-honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
  </>;
}

function FormNotice() {
  const { language } = useLanguage();
  const notices = {
    en: "Prefer email? Contact us directly:",
    de: "Lieber per E-Mail? Schreiben Sie uns direkt:",
    fr: "Vous préférez un e-mail ? Écrivez-nous directement :",
  };
  return <p className="form-notice">{notices[language] || notices.en} <a href={`mailto:${FORM_RECIPIENT}`}>{FORM_RECIPIENT}</a></p>;
}
