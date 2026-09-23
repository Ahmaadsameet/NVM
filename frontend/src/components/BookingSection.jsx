import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n";
import { SectionLabel } from "./SiteChrome";

export function BookingSection({ state, onSubmit, onBriefSubmit, onToggleBrief }) {
  const { copy } = useLanguage();
  const t = copy.booking;
  return (
    <section className="booking section-pad" id="book">
      <SectionLabel>{t.label}</SectionLabel>
      <h2 className="book-title"><span>{t.titleBefore}</span> <em>{t.titleEmphasis}</em></h2>
      <p>{t.description}</p>
      <form id="inquiry-form" onSubmit={onSubmit}>
        {state.submitted ? <div className="success">{t.thanks}</div> : <>
          <div className="form-grid"><label>{t.name}<input name="name" required type="text" placeholder={t.namePlaceholder} /></label><label>{t.email}<input name="email" required type="email" placeholder="you@brand.com" /></label></div>
          <label>{t.message}<textarea name="message" required minLength="10" placeholder={t.messagePlaceholder} rows="4" /></label>
          {state.submitError && <p className="form-error" role="alert">{state.submitError}</p>}
        </>}
      </form>
      <div className="booking-actions">
        <button className="brief-toggle" type="button" onClick={onToggleBrief}>{state.briefOpen ? t.closeBrief : t.openBrief} <ArrowUpRight size={15} /></button>
        {!state.submitted && <button className="solid-button inquiry-submit" type="submit" form="inquiry-form" disabled={state.submitting}>{state.submitting ? t.sending : t.sendInquiry} {!state.submitting && <ArrowUpRight size={16} />}</button>}
      </div>
      {state.briefOpen && <ProjectBrief state={state} onSubmit={onBriefSubmit} t={t} />}
    </section>
  );
}

function ProjectBrief({ state, onSubmit, t }) {
  return <div className="brief-panel"><div className="brief-heading"><SectionLabel>{t.briefLabel}</SectionLabel><p>{t.briefDescription}</p></div>{state.briefSubmitted ? <div className="success">{t.briefThanks}</div> : <form className="brief-form" onSubmit={onSubmit}><div className="form-grid"><label>{t.brand}<input name="brand_name" required type="text" placeholder={t.brandPlaceholder} /></label><label>{t.instagram}<input name="instagram" type="text" placeholder="@yourbrand" /></label></div><div className="form-grid"><label>{t.contactEmail}<input name="contact_email" required type="email" placeholder="you@brand.com" /></label><label>{t.total}<input name="total_pieces" required type="number" min="1" placeholder="e.g. 500" /></label></div><label>{t.product}<input name="product_type" required type="text" placeholder={t.productPlaceholder} /></label><div className="form-grid"><label>{t.colours}<input name="colours" required type="text" placeholder={t.coloursPlaceholder} /></label><label>{t.pieces}<input name="pieces_per_style" required type="text" placeholder={t.piecesPlaceholder} /></label></div><fieldset><legend>{t.techPacks}</legend><label className="radio-label"><input name="tech_packs_available" required type="radio" value="yes" /> {t.yes}</label><label className="radio-label"><input name="tech_packs_available" required type="radio" value="no" /> {t.no}</label></fieldset>{state.briefError && <p className="form-error" role="alert">{state.briefError}</p>}<button className="solid-button" type="submit" disabled={state.briefSubmitting}>{state.briefSubmitting ? t.sending : t.sendBrief} {!state.briefSubmitting && <ArrowUpRight size={16} />}</button></form>}</div>;
}
