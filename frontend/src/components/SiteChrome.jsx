import React from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Globe2, Menu, X } from "lucide-react";
import { languageOptions, useLanguage } from "../i18n";

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
    document.querySelectorAll("main > section:not(.hero)").forEach((section) => {
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

const NAV_LINKS = [
  { id: "make", label: "capabilities" },
  { id: "process", label: "process" },
  { id: "quality", label: "quality" },
  { id: "work", label: "work" },
];

function LanguagePicker({ mobile = false }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const pickerRef = React.useRef(null);
  const current = languageOptions.find(({ code }) => code === language) || languageOptions[0];

  React.useEffect(() => {
    const closePicker = (event) => {
      if (event.type === "keydown" && event.key !== "Escape") return;
      if (event.type === "pointerdown" && pickerRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", closePicker);
    document.addEventListener("keydown", closePicker);
    return () => {
      document.removeEventListener("pointerdown", closePicker);
      document.removeEventListener("keydown", closePicker);
    };
  }, []);

  return <div className={`language-picker ${mobile ? "mobile-language-picker" : ""}`} ref={pickerRef}>
    <button className="language-trigger" type="button" aria-label="Choose language" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <Globe2 size={15} aria-hidden="true" />
      <span>{current.short}</span>
      <ChevronDown className={open ? "is-open" : ""} size={13} aria-hidden="true" />
    </button>
    {open && <div className="language-menu" role="listbox" aria-label="Language">
      {languageOptions.map(({ code, label }) => <button className={language === code ? "is-active" : ""} type="button" role="option" aria-selected={language === code} key={code} onClick={() => { setLanguage(code); setOpen(false); }}>{label}</button>)}
    </div>}
  </div>;
}

export function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);

  React.useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Header({ menuOpen, onToggle }) {
  const { copy } = useLanguage();
  const activeId = useActiveSection(React.useMemo(() => NAV_LINKS.map((link) => link.id), []));

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="North Weave Mills home">
        <img className="brand-logo" src="/assets/nwm-logo-header.png" alt="North Weave Mills" />
      </a>
      <nav className={`desktop-nav ${menuOpen ? "hidden" : ""}`}>
        {NAV_LINKS.map(({ id, label }) => (
          <a key={id} className={`nav-pill ${activeId === id ? "is-active" : ""}`} href={`#${id}`}>
            {copy.nav[label]}
          </a>
        ))}
        <LanguagePicker />
        <a className="outline-button" href="#book">{copy.nav.book}</a>
      </nav>
      <button className="menu-button" onClick={onToggle} aria-label={menuOpen ? "Close menu" : "Open menu"}>
        {menuOpen ? <X size={22} /> : <Menu size={24} />}
      </button>
    </header>
  );
}

export function MobileMenu({ open, onClose }) {
  const { copy } = useLanguage();
  if (!open) return null;
  return (
    <div className="mobile-menu">
      <div className="mobile-menu-top">
        <span className="brand"><img className="brand-logo" src="/assets/nwm-logo-header.png" alt="North Weave Mills" /></span>
        <button onClick={onClose}>{copy.nav.close}</button>
      </div>
      <nav>
        {NAV_LINKS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} onClick={onClose}>{copy.nav[label]} <ArrowUpRight size={22} /></a>
        ))}
      </nav>
      <LanguagePicker mobile />
      <a className="solid-button mobile-cta" href="#book" onClick={onClose}>{copy.nav.book}</a>
    </div>
  );
}

export function Hero() {
  const { copy } = useLanguage();
  return (
    <section className="hero" id="top">
      <video className="hero-video" src="/assets/dashboard-video.mp4" autoPlay muted loop playsInline aria-label="Apparel production footage" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <SectionLabel>{copy.hero.label}</SectionLabel>
        <h1>{copy.hero.line1}<br /><em>{copy.hero.emphasis}</em> {copy.hero.line2}</h1>
        <p>{copy.hero.description}</p>
        <div className="hero-actions">
          <a className="solid-button" href="#book">{copy.nav.book} <ArrowUpRight size={16} /></a>
          <a className="scroll-link" href="#stats">{copy.hero.scroll} <ArrowDownRight size={16} /></a>
        </div>
      </div>
      <span className="hero-note">{copy.hero.film}</span>
    </section>
  );
}
