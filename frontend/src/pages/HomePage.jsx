import React from "react";
import { BookingSection } from "../components/BookingSection";
import { CapabilitiesSection, ClosingSection, DifferenceSection, IntroSection, ProcessSection, QualitySection, Ticker, WorkSection } from "../components/ContentSections";
import { Header, Hero, MobileMenu, ScrollEffects } from "../components/SiteChrome";

export default class HomePage extends React.Component {
  state = { menuOpen: false, submitted: false, submitting: false, submitError: "", briefOpen: false, briefSubmitted: false, briefSubmitting: false, briefError: "" };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ submitting: true, submitError: "" });
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), email: form.get("email"), message: form.get("message") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || "The inquiry could not be sent.");
      this.setState({ submitted: true, submitting: false });
    } catch (error) {
      this.setState({ submitting: false, submitError: error instanceof Error ? error.message : "The inquiry could not be sent." });
    }
  };

  handleBriefSubmit = async (event) => {
    event.preventDefault();
    this.setState({ briefSubmitting: true, briefError: "" });
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/project-briefs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ brand_name: form.get("brand_name"), instagram: form.get("instagram") || null, contact_email: form.get("contact_email"), product_type: form.get("product_type"), total_pieces: Number(form.get("total_pieces")), tech_packs_available: form.get("tech_packs_available") === "yes", colours: form.get("colours"), pieces_per_style: form.get("pieces_per_style") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || "The project brief could not be sent.");
      this.setState({ briefSubmitted: true, briefSubmitting: false });
    } catch (error) {
      this.setState({ briefSubmitting: false, briefError: error instanceof Error ? error.message : "The project brief could not be sent." });
    }
  };

  render() {
    const { menuOpen } = this.state;
    return <div className="app"><ScrollEffects /><Header menuOpen={menuOpen} onToggle={() => this.setState({ menuOpen: !menuOpen })} /><MobileMenu open={menuOpen} onClose={() => this.setState({ menuOpen: false })} /><main><Hero /><Ticker /><IntroSection /><CapabilitiesSection /><ProcessSection /><QualitySection /><DifferenceSection /><WorkSection /><ClosingSection /><BookingSection state={this.state} onSubmit={this.handleSubmit} onBriefSubmit={this.handleBriefSubmit} onToggleBrief={() => this.setState({ briefOpen: !this.state.briefOpen })} /></main><footer><div className="footer-main"><div><span className="footer-logo">NWM</span><p>A German production partner<br />for apparel brands.</p></div><div><span className="eyebrow">PAGES</span><a href="#make">Capabilities</a><a href="#process">Process</a><a href="#quality">Quality</a><a href="#book">Contact / Book a Call</a></div><div><span className="eyebrow">CONTACT</span><a href="mailto:hello@northweavemills.com">hello@northweavemills.com</a><a href="#book">Book a Call</a></div></div><div className="footer-bottom"><span>© 2026 NORTH WEAVE MILLS</span><span>GERMANY · NWM</span></div></footer></div>;
  }
}
