import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SiteChrome";

export function BookingSection({ state, onSubmit, onBriefSubmit, onToggleBrief }) {
  return (
    <section className="booking section-pad" id="book">
      <SectionLabel>TELL US WHAT YOU&apos;RE BUILDING</SectionLabel>
      <h2 className="book-title"><span>Book a</span> <em>Call.</em></h2>
      <p>A 20 minute intro with our production team. Bring a product, a tech pack, or just an idea of quantities.</p>
      <form onSubmit={onSubmit}>
        {state.submitted ? <div className="success">Thanks — we&apos;ll be in touch shortly.</div> : <>
          <div className="form-grid"><label>Name<input name="name" required type="text" placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@brand.com" /></label></div>
          <label>Tell us about your project<textarea name="message" required minLength="10" placeholder="What are you building?" rows="4" /></label>
          {state.submitError && <p className="form-error" role="alert">{state.submitError}</p>}
          <button className="solid-button" type="submit" disabled={state.submitting}>{state.submitting ? "SENDING..." : "SEND INQUIRY"} {!state.submitting && <ArrowUpRight size={16} />}</button>
        </>}
      </form>
      <button className="brief-toggle" type="button" onClick={onToggleBrief}>{state.briefOpen ? "CLOSE PROJECT BRIEF" : "BUILD A DETAILED PROJECT BRIEF"} <ArrowUpRight size={15} /></button>
      {state.briefOpen && <ProjectBrief state={state} onSubmit={onBriefSubmit} />}
    </section>
  );
}

function ProjectBrief({ state, onSubmit }) {
  return <div className="brief-panel"><div className="brief-heading"><SectionLabel>PROJECT BRIEF</SectionLabel><p>Give our production team the details to prepare your first conversation.</p></div>{state.briefSubmitted ? <div className="success">Your project brief is with our team. We&apos;ll be in touch shortly.</div> : <form className="brief-form" onSubmit={onSubmit}><div className="form-grid"><label>Brand name<input name="brand_name" required type="text" placeholder="Your brand" /></label><label>Instagram handle<input name="instagram" type="text" placeholder="@yourbrand" /></label></div><div className="form-grid"><label>Contact email<input name="contact_email" required type="email" placeholder="you@brand.com" /></label><label>Total pieces<input name="total_pieces" required type="number" min="1" placeholder="e.g. 500" /></label></div><label>What kind of product are you making?<input name="product_type" required type="text" placeholder="e.g. denim jackets, knitwear, activewear" /></label><div className="form-grid"><label>Colours<input name="colours" required type="text" placeholder="e.g. black, washed blue, cream" /></label><label>Pieces per style<input name="pieces_per_style" required type="text" placeholder="e.g. 100 XS / 200 S / 200 M" /></label></div><fieldset><legend>Do you have tech packs available?</legend><label className="radio-label"><input name="tech_packs_available" required type="radio" value="yes" /> Yes, ready to share</label><label className="radio-label"><input name="tech_packs_available" required type="radio" value="no" /> Not yet</label></fieldset>{state.briefError && <p className="form-error" role="alert">{state.briefError}</p>}<button className="solid-button" type="submit" disabled={state.briefSubmitting}>{state.briefSubmitting ? "SENDING..." : "SEND PROJECT BRIEF"} {!state.briefSubmitting && <ArrowUpRight size={16} />}</button></form>}</div>;
}
