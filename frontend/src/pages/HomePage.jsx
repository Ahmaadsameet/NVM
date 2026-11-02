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
  return <footer><div className="footer-main"><div><img className="footer-logo" src="/assets/nwm-logo-header.png" alt="North Weave Mills" decoding="async" /><p>{t.description1}<br />{t.description2}</p></div><div><span className="eyebrow">{t.contact}</span><a href="mailto:info@northweavemills.com">info@northweavemills.com</a><a href="tel:+4917631784594">+49 176 3178 4594</a><address><a href="https://www.google.com/maps/search/?api=1&amp;query=Otto%20Str.%2020-22%2C%2063150%20Heusenstamm%2C%20Germany" target="_blank" rel="noopener noreferrer">Otto Str. 20-22, 63150 Heusenstamm, Germany</a></address></div><div><span className="eyebrow">{language === "de" ? "RECHTLICHES" : "LEGAL"}</span><a href={language === "de" ? "/impressum/" : "/legal-notice/"}>{t.imprint}</a><a href={language === "de" ? "/datenschutz/" : "/privacy/"}>{t.privacy}</a><a href={language === "de" ? "/agb/" : "/terms/"}>{language === "de" ? "AGB" : "Terms"}</a></div></div><div className="footer-bottom"><span>© Copyright reserved by North Weave Mills 2026</span><span>{t.country}</span></div></footer>;
}
