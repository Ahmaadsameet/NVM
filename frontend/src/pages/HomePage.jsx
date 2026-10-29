import React from "react";
import { BookingSection } from "../components/BookingSection";
import { CapabilitiesSection, ClosingSection, DifferenceSection, IntroSection, ProcessSection, QualitySection, Ticker, WorkSection } from "../components/ContentSections";
import { Header, Hero, MobileMenu, ScrollEffects } from "../components/SiteChrome";
import { useLanguage } from "../i18n";

export default class HomePage extends React.Component {
  state = { menuOpen: false };

  render() {
    const { menuOpen } = this.state;
    return <div className="app"><ScrollEffects /><Header menuOpen={menuOpen} onToggle={() => this.setState({ menuOpen: !menuOpen })} /><MobileMenu open={menuOpen} onClose={() => this.setState({ menuOpen: false })} /><main><Hero /><Ticker /><IntroSection /><CapabilitiesSection /><WorkSection /><QualitySection /><ProcessSection /><DifferenceSection /><ClosingSection /><BookingSection /></main><LocalizedFooter /></div>;
  }
}

function LocalizedFooter() {
  const { copy, language } = useLanguage();
  const t = copy.footer;
  return <footer><div className="footer-main"><div><img className="footer-logo" src="/assets/nwm-logo-header.png" alt="North Weave Mills" decoding="async" /><p>{t.description1}<br />{t.description2}</p></div><div><a href="#make">{t.capabilities}</a><a href="#process">{t.process}</a><a href="#quality">{t.quality}</a><a href="#book">{t.contactBook}</a><a href={language === "de" ? "/impressum/" : "/legal-notice/"}>{t.imprint}</a><a href={language === "de" ? "/datenschutz/" : "/privacy/"}>{t.privacy}</a><a href={language === "de" ? "/agb/" : "/terms/"}>{language === "de" ? "AGB" : "Terms"}</a></div><div><span className="eyebrow">{t.contact}</span><a href="mailto:info@northweavemills.com">info@northweavemills.com</a><a href="#book">{t.book}</a></div></div><div className="footer-bottom"><span>© 2026 North Weave Mills. All rights reserved.</span><span>{t.country}</span></div></footer>;
}
