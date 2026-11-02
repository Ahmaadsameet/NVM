import React from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Globe2, Menu, X } from "lucide-react";
import { languageOptions, useLanguage } from "../i18n";

export function SectionLabel({ children }) {
  return <span className="eyebrow">{children}</span>;
}

export class ScrollEffects extends React.Component {
  componentDidMount() {
    this.headerSections = Array.from(document.querySelectorAll("main > section, main > .ticker"));
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.bookingObserver = new IntersectionObserver(([entry]) => {
      document.documentElement.classList.toggle("mobile-cta-booking-visible", entry.isIntersecting);
    });
    const booking = document.getElementById("book");
    if (booking) this.bookingObserver.observe(booking);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.bookingObserver?.disconnect();
    document.documentElement.classList.remove("mobile-cta-booking-visible");
    document.documentElement.style.removeProperty("--header-effect-progress");
  }

  handleScroll = () => {
    const root = document.documentElement;
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const headerEffectProgress = Math.min(Math.max((scrollY - 4) / 76, 0), 1);
    root.style.setProperty("--header-effect-progress", headerEffectProgress.toFixed(3));
    root.classList.toggle("has-scrolled", scrollY > 12);

    const header = document.querySelector(".site-header");
    if (!header) return;
    const headerBounds = header.getBoundingClientRect();
    const headerLine = headerBounds.top + headerBounds.height / 2;
    const section = this.headerSections.find((item) => {
      const bounds = item.getBoundingClientRect();
      return bounds.top <= headerLine && bounds.bottom > headerLine;
    });
    const lightBackdrop = section && !section.matches(".hero, .difference, .closing, .booking");
    root.classList.toggle("header-over-light", Boolean(lightBackdrop));
    root.classList.toggle("header-over-booking", Boolean(section?.matches(".booking")));

    const mobileCta = document.querySelector(".mobile-sticky-cta");
    if (!mobileCta) return;
    const ctaBounds = mobileCta.getBoundingClientRect();
    const ctaLine = ctaBounds.top + ctaBounds.height / 2;
    const ctaSection = this.headerSections.find((item) => {
      const bounds = item.getBoundingClientRect();
      return bounds.top <= ctaLine && bounds.bottom > ctaLine;
    });
    const lightCtaBackdrop = ctaSection && !ctaSection.matches(".hero, .difference, .closing, .booking");
    root.classList.toggle("mobile-cta-over-light", Boolean(lightCtaBackdrop));
    root.classList.toggle("mobile-cta-over-hero", Boolean(ctaSection?.matches(".hero")));
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
  const { language, setLanguage, copy } = useLanguage();
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

  return <div className={`language-picker ${mobile ? "mobile-language-picker" : "desktop-language-picker"}`} ref={pickerRef}>
    <button className="language-trigger" type="button" aria-label={copy.nav.languageSelect} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <Globe2 size={15} aria-hidden="true" />
      <span>{mobile ? current.short : copy.nav.language}</span>
      <ChevronDown className={open ? "is-open" : ""} size={13} aria-hidden="true" />
    </button>
    {open && <div className="language-menu" role="listbox" aria-label={copy.nav.language}>
      {languageOptions.map(({ code, label }) => <button className={language === code ? "is-active" : ""} type="button" role="option" aria-selected={language === code} key={code} onClick={() => { setLanguage(code); try { window.localStorage.setItem("nwm-language", code); } catch { /* Language still changes when storage is unavailable. */ } setOpen(false); }}>{label}</button>)}
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
  const [logoRevealKey, setLogoRevealKey] = React.useState(0);

  React.useEffect(() => {
    const replayLogo = () => {
      if (document.visibilityState === "visible") setLogoRevealKey(value => value + 1);
    };
    const replayRestoredPage = (event) => {
      if (event.persisted) setLogoRevealKey(value => value + 1);
    };
    document.addEventListener("visibilitychange", replayLogo);
    window.addEventListener("pageshow", replayRestoredPage);
    return () => {
      document.removeEventListener("visibilitychange", replayLogo);
      window.removeEventListener("pageshow", replayRestoredPage);
    };
  }, []);

  return (
    <>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="North Weave Mills home">
        <span className="header-logo-reveal" key={logoRevealKey}><img className="brand-logo header-brand-logo" src="/assets/nwm-mark-transparent.png" alt="North Weave Mills" /></span>
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
      <div className="mobile-nav-actions">
        <LanguagePicker mobile />
        <button className="menu-button" onClick={onToggle} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X size={22} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
    <a className="mobile-sticky-cta" href="#book">{copy.nav.book}</a>
    </>
  );
}

export function MobileMenu({ open, onClose }) {
  const { copy } = useLanguage();
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("button")?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab") return;
      const links = menuRef.current?.querySelectorAll("a, button");
      if (!links?.length) return;
      const first = links[0], last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <>
      <div className="mobile-menu" id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label={copy.nav.capabilities}>
        <div className="mobile-menu-top">
          <span className="brand"><img className="brand-logo" src="/assets/nwm-mark-transparent.png" alt="North Weave Mills" /></span>
          <button onClick={onClose}>{copy.nav.close}</button>
        </div>
        <nav>
          {NAV_LINKS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={onClose}>{copy.nav[label]}</a>
          ))}
        </nav>
        <a className="solid-button mobile-cta" href="#book" onClick={onClose}>{copy.nav.book}</a>
      </div>
    </>
  );
}

export function Hero() {
  const { copy } = useLanguage();
  return (
    <section className="hero" id="top">
      <video className="hero-video" src="/assets/dashboard-video.mp4?v=20261101-trim29" poster="/assets/dashboard-video-poster.webp" autoPlay muted loop playsInline preload="auto" aria-label="Apparel production footage" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>
          <span className="hero-title-line"><span>{copy.hero.line1}</span></span>
          <span className="hero-title-line"><span><em className="hero-structured-word">{copy.hero.emphasis}</em> {copy.hero.line2}</span></span>
        </h1>
        <p>{copy.hero.description}</p>
        <div className="hero-actions">
          <a className="solid-button" href="#book">{copy.nav.book} <ArrowUpRight size={16} /></a>
          <a className="scroll-link" href="#stats">{copy.hero.scroll} <ArrowDownRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}
