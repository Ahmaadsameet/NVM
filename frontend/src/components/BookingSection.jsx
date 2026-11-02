import React from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "../i18n";
import { SectionLabel } from "./SiteChrome";
import ContactForm from "./ContactForm";
import CategoryPicker from "./CategoryPicker";
import { FORM_RECIPIENT } from "../data/contact";

export function BookingSection() {
  const { copy } = useLanguage();
  const t = copy.booking;
  const [mode, setMode] = React.useState(null);
  const [sending, setSending] = React.useState(false);
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
          <h3>{t.sendInquiry}</h3>
          <p>{t.description}</p>
          <span className="booking-option-action">{t.sendInquiry} <ArrowUpRight size={16} /></span>
        </button>
        <button className="comparison-card bright booking-option" type="button" onClick={() => setMode("brief")}>
          <h3>{t.briefLabel}</h3>
          <p>{t.briefDescription}</p>
          <span className="booking-option-action">{t.openBrief} <ArrowUpRight size={16} /></span>
        </button>
      </div> : <div className="comparison booking-options has-selection">
        <div className="comparison-card booking-form-card">
          <div className="booking-form-card-heading">
            <div>
              <h3>{mode === "inquiry" ? t.sendInquiry : t.briefLabel}</h3>
              <p>{mode === "inquiry" ? t.description : t.briefDescription}</p>
            </div>
            <button className="booking-close" disabled={sending} type="button" aria-label={copy.nav.close} onClick={() => setMode(null)}><X size={16} aria-hidden="true" /></button>
          </div>
          {mode === "inquiry" ? <ContactForm id="inquiry-form" submitLabel={t.sendInquiry} onBusyChange={setSending}>
            <FormSettings type="inquiry" />
            <div className="form-grid"><label>{t.name}<input name="name" maxLength={200} required type="text" placeholder={t.namePlaceholder} /></label><label>{t.email}<input name="email" maxLength={254} required type="email" placeholder="you@brand.com" /></label></div>
            <label>{t.message}<textarea name="message" maxLength={10000} required minLength="10" placeholder={t.messagePlaceholder} rows="4" /></label>
            <FormNotice /><FormPrivacyNotice />
          </ContactForm> : <ProjectBrief t={t} onBusyChange={setSending} />}
        </div>
      </div>}
    </section>
  );
}

function ProjectBrief({ t, onBusyChange }) {
  const [techPacks, setTechPacks] = React.useState("");
  return <ContactForm className="brief-form" submitLabel={t.sendBrief} incompleteMessage={t.incomplete} onBusyChange={onBusyChange}>
    <FormSettings type="brief" />
    <div className="form-grid">
      <label>{t.contactName}<input name="name" maxLength={200} required autoComplete="name" placeholder="Samoon" /></label>
      <label>{t.brand}<input name="brand_name" maxLength={200} required autoComplete="organization" placeholder={t.brandPlaceholder} /></label>
    </div>
    <div className="form-grid">
      <label>{t.contactEmail}<input name="email" maxLength={254} required type="email" autoComplete="email" placeholder="you@brand.com" /></label>
      <label>{t.phone}<input name="phone" maxLength={80} type="tel" autoComplete="tel" placeholder="+49 176 3178 4594" /></label>
    </div>
    <div className="form-grid">
      <label>{t.country}<input name="country" maxLength={100} autoComplete="country-name" placeholder="Germany" /></label>
      <label>{t.instagram}<input name="instagram" maxLength={200} placeholder="@yourbrand" /></label>
    </div>
    <CategoryPicker label={t.product} placeholder={t.chooseCategory} />
    <div className="form-grid">
      <label>{t.total}<input name="total_pieces" type="number" min="1" max="999999999" step="1" placeholder="500" /></label>
      <label>{t.deliveryDate}<input name="target_delivery_date" type="date" /></label>
    </div>
    <div className="form-grid">
      <label>{t.targetPrice}<input name="target_price" maxLength={100} placeholder="EUR 25" /></label>
      <label>{t.colours}<input name="colours" maxLength={1000} placeholder={t.coloursPlaceholder} /></label>
    </div>
    <label>{t.pieces}<input name="pieces_per_style" maxLength={2000} placeholder={t.piecesPlaceholder} /></label>
    <fieldset><legend>{t.techPacks}</legend><label className="radio-label"><input name="tech_packs_available" type="radio" value="yes" checked={techPacks === "yes"} onChange={() => setTechPacks("yes")} onClick={() => { if (techPacks === "yes") setTechPacks(""); }} /> {t.yes}</label><label className="radio-label"><input name="tech_packs_available" type="radio" value="no" checked={techPacks === "no"} onChange={() => setTechPacks("no")} onClick={() => { if (techPacks === "no") setTechPacks(""); }} /> {t.no}</label></fieldset>
    <label className="brief-upload">{t.upload}<input name="attachment" type="file" accept=".pdf,.jpg,.jpeg,.png" /></label>
    <FormNotice /><FormPrivacyNotice />
  </ContactForm>;
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

function FormPrivacyNotice() {
  const { language } = useLanguage();
  return <p className="form-notice form-privacy">{language === "de" ? <>Ihre Angaben verwenden wir nur zur Bearbeitung Ihrer Anfrage. Mehr dazu in unserer <a href="/datenschutz/">Datenschutzerklärung</a>.</> : <>We only use the details you send us to handle your enquiry. More in our <a href="/privacy/">Privacy Policy</a>.</>}</p>;
}
