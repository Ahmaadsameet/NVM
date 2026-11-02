import React from "react";
import { createPortal } from "react-dom";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { bikerGroups, sportswearGroups, capabilityGalleries, capabilityImages, selectedWorkImages } from "../data/images";
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
  const values = ["01", "02", "03–05"];
  return <section className="intro section-pad" id="stats"><img className="intro-logo" src="/assets/nwm-logo-full.png" alt="North Weave Mills" decoding="async" /><p className="statement">{copy.intro.before} <em>{copy.intro.emphasis}</em></p><div className="stats">{copy.intro.stats.map((label, index) => <div key={label}><AnimatedStatValue value={values[index]} /><span>{label}</span></div>)}</div></section>;
}

function AnimatedStatValue({ value }) {
  const zeroValue = value.includes("–") ? "00–00" : "00";
  const [displayValue, setDisplayValue] = React.useState(zeroValue);
  const valueRef = React.useRef(null);

  React.useEffect(() => {
    const targets = value.split("–").map(Number);
    let frameId;
    let startTimer;
    let loopTimer;
    let isVisible = false;
    let isRunning = false;

    const runCount = () => {
      if (!isVisible || isRunning) return;
      isRunning = true;
      setDisplayValue(zeroValue);
      startTimer = window.setTimeout(() => {
        const startedAt = performance.now();
        const update = (now) => {
          const progress = Math.min((now - startedAt) / 1200, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const sharedStep = progress === 1 ? Math.max(...targets) : Math.floor(Math.max(...targets) * eased);
          setDisplayValue(targets.map(target => String(Math.min(sharedStep, target)).padStart(2, "0")).join("–"));
          if (progress < 1) {
            frameId = requestAnimationFrame(update);
          } else {
            isRunning = false;
            loopTimer = window.setTimeout(runCount, 5000);
          }
        };
        frameId = requestAnimationFrame(update);
      }, 220);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplayValue(value);
        return;
      }
      if (isVisible) {
        runCount();
      } else {
        window.clearTimeout(startTimer);
        window.clearTimeout(loopTimer);
        if (frameId) cancelAnimationFrame(frameId);
        isRunning = false;
      }
    }, { threshold: .55 });
    if (valueRef.current) observer.observe(valueRef.current);
    return () => {
      observer.disconnect();
      window.clearTimeout(startTimer);
      window.clearTimeout(loopTimer);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value, zeroValue]);

  return <strong className="stat-value" ref={valueRef}><span>{displayValue}</span></strong>;
}

export function CapabilitiesSection() {
  const { copy, language } = useLanguage();
  const { capabilities } = copy;
  const [activeGallery, setActiveGallery] = React.useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = React.useState(0);
  const swipeStart = React.useRef(null);
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
    setActiveGroupIndex(0);
    setActiveGallery({ name, imageKey });
  };
  const galleryName = capabilities.items.find(([, , imageKey]) => imageKey === activeGallery?.imageKey)?.[0] || activeGallery?.name;
  const productLabel = language === "de" ? "Produkt" : "Product";
  const groups = activeGallery?.imageKey === "biker" ? bikerGroups : activeGallery?.imageKey === "sport" ? sportswearGroups : null;
  const activeGroup = groups?.[activeGroupIndex];
  const galleryImages = activeGallery ? (activeGroup ? activeGroup.images : capabilityGalleries[activeGallery.imageKey]) : [];
  const productName = activeGroup ? (activeGroup.name[language] || activeGroup.name.en) : galleryName;
  const changePhoto = (direction) => {
    if (galleryImages.length < 2) return;
    setActivePhotoIndex((index) => (index + direction + galleryImages.length) % galleryImages.length);
  };
  React.useEffect(() => {
    if (!activeGallery) return undefined;
    const handleArrowKey = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setActivePhotoIndex((index) => (index + (event.key === "ArrowRight" ? 1 : -1) + galleryImages.length) % galleryImages.length);
      }
    };
    document.addEventListener("keydown", handleArrowKey);
    return () => document.removeEventListener("keydown", handleArrowKey);
  }, [activeGallery, galleryImages.length]);

  React.useEffect(() => {
    const tab = dialogRef.current?.querySelector(".capability-product-tab.is-active");
    if (tab) tab.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activePhotoIndex, activeGroupIndex, activeGallery]);

  const handleSwipeEnd = (event) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    const end = event.changedTouches[0];
    if (!start || !end) return;
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy)) changePhoto(dx < 0 ? 1 : -1);
  };
  return <section className="capabilities section-pad" id="make">
    <div className="section-heading"><div><h2>{capabilities.titleBefore}<br /><em>{capabilities.titleEmphasis}</em> {capabilities.titleAfter}</h2></div></div>
    <div className="capability-grid">{capabilities.items.map(([name, text, imageKey]) => <article className="capability-card" tabIndex="0" role="button" aria-haspopup="dialog" aria-expanded={activeGallery?.imageKey === imageKey} onClick={() => openGallery(name, imageKey)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openGallery(name, imageKey); } }} key={imageKey}>
      <div className="image-wrap"><img src={capabilityImages[imageKey]} alt={`${name} apparel`} loading="lazy" decoding="async" /><span className="capability-explore">{capabilities.exploreMore}</span></div>
      <div className="card-meta"><h3>{name}</h3></div><p>{text}</p>
    </article>)}</div>
    {activeGallery && createPortal(<div className="capability-dialog-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setActiveGallery(null); }}>
      <section className="capability-dialog" role="dialog" aria-modal="true" aria-labelledby="capability-dialog-title" ref={dialogRef}>
        <header className="capability-dialog-header">
          <div><SectionLabel>{capabilities.label}</SectionLabel><h3 id="capability-dialog-title">{galleryName}</h3></div>
          <button className="capability-dialog-close" type="button" onClick={() => setActiveGallery(null)} ref={closeButtonRef}><X size={19} /><span>{copy.nav.close}</span></button>
        </header>
        {groups && <nav className={`biker-groups${activeGallery.imageKey === "biker" ? " biker-groups-compact" : ""}`} aria-label={`${galleryName} ${language === "de" ? "Unterkategorien" : "subcategories"}`}>
          {groups.map((group, index) => <button type="button" className={`biker-group ${activeGroupIndex === index ? "is-active" : ""}`} aria-pressed={activeGroupIndex === index} onClick={() => { setActiveGroupIndex(index); setActivePhotoIndex(0); }} key={group.id}>
            <img src={group.images[0]} alt="" loading="lazy" decoding="async" />
            <span>{group.name[language] || group.name.en}</span>
          </button>)}
        </nav>}
        <div className="capability-gallery-browser">
          <nav className="capability-gallery-tabs" aria-label={`${productName} ${language === "de" ? "Produkte" : "products"}`}>
            {galleryImages.map((image, photoIndex) => <button className={`capability-product-tab ${activePhotoIndex === photoIndex ? "is-active" : ""}`} type="button" aria-pressed={activePhotoIndex === photoIndex} aria-label={`${productName} ${productLabel} ${photoIndex + 1}`} onClick={() => setActivePhotoIndex(photoIndex)} key={image || `${activeGallery.imageKey}-${photoIndex}`}>
              {image ? <img src={image} alt="" loading="lazy" decoding="async" /> : <span className="capability-product-tab-placeholder">{galleryName}</span>}
              <span className="capability-product-tab-label">{productLabel.toUpperCase()} {String(photoIndex + 1).padStart(2, "0")}</span>
            </button>)}
          </nav>
          <div className="capability-product-stage" aria-live="polite"
            onTouchStart={(event) => { const touch = event.touches[0]; swipeStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null; }}
            onTouchEnd={handleSwipeEnd} onTouchCancel={() => { swipeStart.current = null; }}>
            {galleryImages.length > 1 && <>
              <button className="gallery-arrow gallery-arrow-prev" type="button" aria-label={language === "de" ? "Vorheriger Artikel" : "Previous product"} onClick={() => changePhoto(-1)}><ChevronLeft aria-hidden="true" /></button>
              <button className="gallery-arrow gallery-arrow-next" type="button" aria-label={language === "de" ? "Nächster Artikel" : "Next product"} onClick={() => changePhoto(1)}><ChevronRight aria-hidden="true" /></button>
            </>}
            {galleryImages[activePhotoIndex]
              ? <img key={`${activeGallery.imageKey}-${activeGroup?.id || "all"}-${activePhotoIndex}`} src={galleryImages[activePhotoIndex]} alt={`${productName} ${productLabel} ${activePhotoIndex + 1}`} decoding="async" draggable="false" />
              : <div className="capability-gallery-placeholder" key={`${activeGallery.imageKey}-${activeGroup?.id || "all"}-${activePhotoIndex}`}><span>{galleryName}</span><small>{String(activePhotoIndex + 1).padStart(2, "0")}</small></div>}
            <span className="capability-product-count">{String(activePhotoIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}</span>
          </div>
        </div>
      </section>
    </div>, document.body)}
  </section>;
}

export function ProcessSection() {
  const { copy } = useLanguage();
  const { process } = copy;
  return <section className="process section-pad" id="process"><h2>{process.before} <em>{process.emphasis}</em> {process.after}</h2><div className="process-list">{process.steps.map(([number, title, text]) => <div className="process-row" key={number} tabIndex={0}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>;
}

export function QualitySection() {
  const { copy } = useLanguage();
  const { quality } = copy;
  return <section className="quality section-pad" id="quality"><div><h2>{quality.titleBefore}<br /><em>{quality.titleEmphasis}</em></h2><p>{quality.description}</p></div><div className="quality-panel">{quality.rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>;
}

export function DifferenceSection() {
  const { copy } = useLanguage();
  const { difference } = copy;
  const [heading, ...accent] = difference.title.split(". ");
  return <section className="difference section-pad"><h2>{heading}{accent.length > 0 && <>. <em>{accent.join(". ")}</em></>}</h2><div className="comparison"><div className="comparison-card muted"><SectionLabel>{difference.typicalLabel}</SectionLabel>{difference.typical.map(item => <p key={item}><span>×</span>{item}</p>)}</div><div className="comparison-card bright"><div className="mini-brand"><img className="comparison-logo" src="/assets/nwm-mark-transparent.png" alt="NWM" /> NORTH WEAVE MILLS</div>{difference.nwm.map(item => <p key={item}><Check size={16} /><span>{item}</span></p>)}</div></div></section>;
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

  React.useEffect(() => {
    const videos = document.querySelectorAll(".work-grid video");
    const loadVideo = (video) => {
      if (video.getAttribute("src")) return;
      video.src = video.dataset.src;
      video.preload = "auto";
      video.load();
    };
    const preloadObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        loadVideo(target);
        preloadObserver.unobserve(target);
      });
    }, { rootMargin: "800px" });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          loadVideo(target);
          target.play().catch(() => {});
        } else {
          target.pause();
        }
      });
    }, { rootMargin: "200px" });
    videos.forEach((video) => { preloadObserver.observe(video); observer.observe(video); });
    return () => {
      preloadObserver.disconnect();
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, []);

  return <section className="selected-work section-pad" id="work"><div className="section-heading"><div><h2>{work.titleBefore} <em>{work.titleEmphasis}</em></h2></div></div><div className="work-grid" role="region" aria-label={work.label} tabIndex={0}>{selectedWorkImages.map((image, index) => <figure className={`logo-card-${index + 1}`} key={image}>{workVideos[index] ? <video data-src={`${workVideos[index]}?v=20261101-card5-new`} poster={workVideos[index].replace(".mp4", "-poster.webp")} muted loop playsInline preload="none" aria-label={work.captions[index]} /> : <img src={image} alt={work.captions[index]} decoding="async" />}</figure>)}</div></section>;
}

export function ClosingSection() {
  return null;
}
