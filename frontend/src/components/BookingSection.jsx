import React from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n";
import { SectionLabel } from "./SiteChrome";

export function BookingSection({ state, onSubmit, onBriefSubmit }) {
  const { copy } = useLanguage();
  const t = copy.booking;
  const [mode, setMode] = React.useState(null);
  return (
    <section className="booking section-pad" id="book">
      <SectionLabel>{t.label}</SectionLabel>
      <h2 className="book-title"><span>{t.titleBefore}</span> <em>{t.titleEmphasis}</em></h2>
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
        <button className="booking-back" type="button" onClick={() => setMode(null)}><ArrowLeft size={16} /> {copy.nav.close}</button>
        <div className="comparison-card booking-form-card">
          <div className="booking-form-card-heading">
            <div>
              <SectionLabel>{mode === "inquiry" ? copy.nav.book : t.briefLabel}</SectionLabel>
              <h3>{mode === "inquiry" ? t.sendInquiry : t.briefLabel}</h3>
              <p>{mode === "inquiry" ? t.description : t.briefDescription}</p>
            </div>
          </div>
          {mode === "inquiry" ? state.submitted ? <div className="success">{t.thanks}</div> : <form id="inquiry-form" onSubmit={onSubmit}>
            <div className="form-grid"><label>{t.name}<input name="name" required type="text" placeholder={t.namePlaceholder} /></label><label>{t.email}<input name="email" required type="email" placeholder="you@brand.com" /></label></div>
            <label>{t.message}<textarea name="message" required minLength="10" placeholder={t.messagePlaceholder} rows="4" /></label>
            {state.submitError && <p className="form-error" role="alert">{state.submitError}</p>}
            <button className="solid-button inquiry-submit" type="submit" disabled={state.submitting}>{state.submitting ? t.sending : t.sendInquiry} {!state.submitting && <ArrowUpRight size={16} />}</button>
          </form> : <ProjectBrief state={state} onSubmit={onBriefSubmit} t={t} />}
        </div>
      </div>}
    </section>
  );
}

function ProjectBrief({ state, onSubmit, t }) {
  return state.briefSubmitted ? <div className="success">{t.briefThanks}</div> : <form className="brief-form" onSubmit={onSubmit}><div className="form-grid"><label>{t.brand}<input name="brand_name" required type="text" placeholder={t.brandPlaceholder} /></label><label>{t.instagram}<input name="instagram" type="text" placeholder="@yourbrand" /></label></div><div className="form-grid"><label>{t.contactEmail}<input name="contact_email" required type="email" placeholder="you@brand.com" /></label><label>{t.total}<input name="total_pieces" required type="number" min="1" placeholder="e.g. 500" /></label></div><label>{t.product}<input name="product_type" required type="text" placeholder={t.productPlaceholder} /></label><div className="form-grid"><label>{t.colours}<input name="colours" required type="text" placeholder={t.coloursPlaceholder} /></label><label>{t.pieces}<input name="pieces_per_style" required type="text" placeholder={t.piecesPlaceholder} /></label></div><fieldset><legend>{t.techPacks}</legend><label className="radio-label"><input name="tech_packs_available" required type="radio" value="yes" /> {t.yes}</label><label className="radio-label"><input name="tech_packs_available" required type="radio" value="no" /> {t.no}</label></fieldset>{state.briefError && <p className="form-error" role="alert">{state.briefError}</p>}<button className="solid-button" type="submit" disabled={state.briefSubmitting}>{state.briefSubmitting ? t.sending : t.sendBrief} {!state.briefSubmitting && <ArrowUpRight size={16} />}</button></form>;
}
