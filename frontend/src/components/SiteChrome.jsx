import React from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";

export function SectionLabel({ children }) {
  return <span className="eyebrow">{children}</span>;
}

export class ScrollEffects extends React.Component {
  componentDidMount() {
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.12 }
    );
    document.querySelectorAll("main > section:not(.hero), .ticker").forEach((section) => {
      section.classList.add("scroll-reveal");
      this.observer.observe(section);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.observer?.disconnect();
  }

  handleScroll = () => {
    document.documentElement.classList.toggle("has-scrolled", window.scrollY > 24);
  };

  render() {
    return null;
  }
}

export function Header({ menuOpen, onToggle }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="North Weave Mills home">
        <span className="brand-mark">N</span>
        <span>NORTH WEAVE MILLS</span>
      </a>
      <nav className={`desktop-nav ${menuOpen ? "hidden" : ""}`}>
        {["make", "process", "quality", "work"].map((id, i) => (
          <a key={id} href={`#${id}`}>{["CAPABILITIES", "PROCESS", "QUALITY", "WORK"][i]}</a>
        ))}
        <a className="outline-button" href="#book">BOOK A CALL</a>
      </nav>
      <button className="menu-button" onClick={onToggle} aria-label={menuOpen ? "Close menu" : "Open menu"}>
        {menuOpen ? <X size={22} /> : <Menu size={24} />}
      </button>
    </header>
  );
}

export function MobileMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="mobile-menu">
      <div className="mobile-menu-top">
        <span className="brand"><span className="brand-mark">N</span><span>NORTH WEAVE MILLS</span></span>
        <button onClick={onClose}>CLOSE <X size={16} /></button>
      </div>
      <nav>
        {["make", "process", "quality", "work"].map((id, i) => (
          <a key={id} href={`#${id}`} onClick={onClose}>{["Capabilities", "Process", "Quality", "Selected Work"][i]} <ArrowUpRight size={22} /></a>
        ))}
      </nav>
      <a className="solid-button mobile-cta" href="#book" onClick={onClose}>BOOK A CALL</a>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <video className="hero-video" src="/assets/dashboard-video.mp4" autoPlay muted loop playsInline aria-label="Apparel production footage" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <SectionLabel>APPAREL PRODUCTION PARTNER · GERMANY</SectionLabel>
        <h1>Built for Brands.<br /><em>Structured</em> for Production.</h1>
        <p>A German production partner for apparel brands that don&apos;t compromise.</p>
        <div className="hero-actions">
          <a className="solid-button" href="#book">BOOK A CALL <ArrowUpRight size={16} /></a>
          <a className="scroll-link" href="#stats">SCROLL <ArrowDownRight size={16} /></a>
        </div>
      </div>
      <span className="hero-note">NWM FILM / 001</span>
    </section>
  );
}
