import React from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Check, X } from "lucide-react";
import { capabilityGalleries, capabilityImages, selectedWorkImages } from "../data/images";
import { useLanguage } from "../i18n";
import { SectionLabel } from "./SiteChrome";

export function Ticker() {
  const { copy } = useLanguage();
  const items = copy.ticker;
  const tickerRef = React.useRef(null);
  const itemRef = React.useRef(null);
  const [repeatCount, setRepeatCount] = React.useState(1);

  React.useLayoutEffect(() => {
    const updateRepeats = () => {
      const itemWidth = itemRef.current.getBoundingClientRect().width;
      if (itemWidth) setRepeatCount(Math.max(1, Math.ceil(tickerRef.current.clientWidth / itemWidth)));
    };
    const observer = new ResizeObserver(updateRepeats);
    observer.observe(tickerRef.current);
    observer.observe(itemRef.current);
    updateRepeats();
    return () => observer.disconnect();
  }, [items]);

  return <div className="ticker" ref={tickerRef}>
    <div className="ticker-track" style={{ "--ticker-duration": `${repeatCount * 32}s` }}>
      {[0, 1].map(group => <div className="ticker-group" key={group} aria-hidden={group === 1 ? true : undefined}>
        {Array.from({ length: repeatCount }, (_, index) => <span className="ticker-items" key={index} ref={group === 0 && index === 0 ? itemRef : undefined} aria-hidden={index > 0 ? true : undefined}>{items}</span>)}
      </div>)}
    </div>
  </div>;
}

export function IntroSection() {
  const { copy } = useLanguage();
  const values = ["01", "02", "06–08"];
  return <section className="intro section-pad" id="stats"><img className="intro-logo" src="/assets/nwm-logo-full.png" alt="North Weave Mills" /><p className="statement">{copy.intro.before} <em>{copy.intro.emphasis}</em></p><div className="stats">{copy.intro.stats.map((label, index) => <div key={label}><strong>{values[index]}</strong><span>{label}</span></div>)}</div></section>;
}

export function CapabilitiesSection() {
  const { copy } = useLanguage();
  const { capabilities } = copy;
  const [activeGallery, setActiveGallery] = React.useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0);
  const dialogRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (!activeGallery) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveGallery(null);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [activeGallery]);

  const openGallery = (name, imageKey) => {
    setActivePhotoIndex(0);
    setActiveGallery({ name, imageKey });
  };
  return <section className="capabilities section-pad" id="make">
    <div className="section-heading"><div><SectionLabel>{capabilities.label}</SectionLabel><h2>{capabilities.titleBefore}<br /><em>{capabilities.titleEmphasis}</em> {capabilities.titleAfter}</h2></div><p>{capabilities.description}</p></div>
    <div className="capability-grid">{capabilities.items.map(([name, text, imageKey]) => <article className="capability-card" tabIndex="0" role="button" aria-haspopup="dialog" aria-expanded={activeGallery?.imageKey === imageKey} onClick={() => openGallery(name, imageKey)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openGallery(name, imageKey); } }} key={imageKey}>
      <div className="image-wrap"><img src={capabilityImages[imageKey]} alt={`${name} apparel`} /></div>
      <div className="card-meta"><h3>{name}</h3></div><p>{text}</p>
    </article>)}</div>
    {activeGallery && createPortal(<div className="capability-dialog-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setActiveGallery(null); }}>
      <section className="capability-dialog" role="dialog" aria-modal="true" aria-labelledby="capability-dialog-title" ref={dialogRef}>
        <header className="capability-dialog-header">
          <div><SectionLabel>{capabilities.label}</SectionLabel><h3 id="capability-dialog-title">{activeGallery.name}</h3></div>
          <button className="capability-dialog-close" type="button" onClick={() => setActiveGallery(null)} ref={closeButtonRef}><X size={19} /><span>{copy.nav.close}</span></button>
        </header>
        <div className="capability-gallery-browser">
          <nav className="capability-gallery-tabs" aria-label={`${activeGallery.name} products`}>
            {capabilityGalleries[activeGallery.imageKey].map((image, photoIndex) => <button className={`capability-product-tab ${activePhotoIndex === photoIndex ? "is-active" : ""}`} type="button" aria-pressed={activePhotoIndex === photoIndex} aria-label={`${activeGallery.name} product ${photoIndex + 1}`} onClick={() => setActivePhotoIndex(photoIndex)} key={image || `${activeGallery.imageKey}-${photoIndex}`}>
              {image ? <img src={image} alt="" /> : <span className="capability-product-tab-placeholder">{activeGallery.name}</span>}
              <span className="capability-product-tab-label">PRODUCT {String(photoIndex + 1).padStart(2, "0")}</span>
            </button>)}
          </nav>
          <div className="capability-product-stage" aria-live="polite">
            {capabilityGalleries[activeGallery.imageKey][activePhotoIndex]
              ? <img src={capabilityGalleries[activeGallery.imageKey][activePhotoIndex]} alt={`${activeGallery.name} product ${activePhotoIndex + 1}`} />
              : <div className="capability-gallery-placeholder"><span>{activeGallery.name}</span><small>{String(activePhotoIndex + 1).padStart(2, "0")}</small></div>}
            <span className="capability-product-count">{String(activePhotoIndex + 1).padStart(2, "0")} / {String(capabilityGalleries[activeGallery.imageKey].length).padStart(2, "0")}</span>
          </div>
        </div>
      </section>
    </div>, document.body)}
  </section>;
}

export function ProcessSection() {
  const { copy } = useLanguage();
  const { process } = copy;
  return <section className="process section-pad" id="process"><div className="section-topline"><SectionLabel>{process.label}</SectionLabel><SectionLabel>{process.sideLabel}</SectionLabel></div><h2>{process.before} <em>{process.emphasis}</em> {process.after}</h2><div className="process-list">{process.steps.map(([number, title, text]) => <div className="process-row" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>;
}

export function QualitySection() {
  const { copy } = useLanguage();
  const { quality } = copy;
  return <section className="quality section-pad" id="quality"><div><SectionLabel>{quality.label}</SectionLabel><h2>{quality.titleBefore}<br /><em>{quality.titleEmphasis}</em></h2><p>{quality.description}</p></div><div className="quality-panel">{quality.rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}<small>{quality.note}</small></div></section>;
}

export function DifferenceSection() {
  const { copy } = useLanguage();
  const { difference } = copy;
  return <section className="difference section-pad"><SectionLabel>{difference.label}</SectionLabel><h2>{difference.title}</h2><div className="comparison"><div className="comparison-card muted"><SectionLabel>{difference.typicalLabel}</SectionLabel>{difference.typical.map(item => <p key={item}><span>×</span>{item}</p>)}</div><div className="comparison-card bright"><div className="mini-brand"><span className="brand-mark">N</span> NORTH WEAVE MILLS</div>{difference.nwm.map(item => <p key={item}><Check size={16} /><span>{item}</span></p>)}</div></div></section>;
}

export function WorkSection() {
  const { copy } = useLanguage();
  const { work } = copy;
  const workVideos = [
    "/assets/card1.mp4",
    "/assets/card2.mp4",
    "/assets/card3.mp4",
    "/assets/card4.mp4",
    "/assets/card5.mp4"
  ];

  return <section className="selected-work section-pad" id="work"><div className="section-heading"><div><SectionLabel>{work.label}</SectionLabel><h2>{work.titleBefore}<br /><em>{work.titleEmphasis}</em></h2></div><a className="text-link" href="#book">{work.cta} <ArrowUpRight size={16} /></a></div><div className="work-grid" role="region" aria-label={work.label} tabIndex={0}>{selectedWorkImages.map((image, index) => <figure className={`logo-card-${index + 1}`} key={image}>{workVideos[index] ? <video src={workVideos[index]} autoPlay muted loop playsInline preload="metadata" aria-label={work.captions[index]} /> : <img src={image} alt={work.captions[index]} />}<figcaption>{work.captions[index]}</figcaption></figure>)}</div></section>;
}

export function ClosingSection() {
  return null;
}
