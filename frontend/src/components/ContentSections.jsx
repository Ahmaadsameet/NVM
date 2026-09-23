import React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { capabilityGalleries, capabilityImages, closingImage, selectedWorkImages } from "../data/images";
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
  return <section className="capabilities section-pad" id="make">
    <div className="section-heading"><div><SectionLabel>{capabilities.label}</SectionLabel><h2>{capabilities.titleBefore}<br /><em>{capabilities.titleEmphasis}</em> {capabilities.titleAfter}</h2></div><p>{capabilities.description}</p></div>
    <div className="capability-grid">{capabilities.items.map(([name, text, imageKey]) => <article className="capability-card" tabIndex="0" key={imageKey}>
      <div className="image-wrap"><img src={capabilityImages[imageKey]} alt={`${name} apparel`} /></div>
      <div className="capability-hover-preview" aria-hidden="true">
        <span className="capability-preview-title">{name}</span>
        <div className="capability-preview-grid">{capabilityGalleries[imageKey].map((image, photoIndex) => image
          ? <img src={image} alt="" key={photoIndex} />
          : <span className="capability-preview-placeholder" key={photoIndex} aria-hidden="true" />
        )}</div>
      </div>
      <div className="card-meta"><h3>{name}</h3></div><p>{text}</p>
    </article>)}</div>
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
  return <section className="selected-work section-pad" id="work"><div className="section-heading"><div><SectionLabel>{work.label}</SectionLabel><h2>{work.titleBefore}<br /><em>{work.titleEmphasis}</em></h2></div><a className="text-link" href="#book">{work.cta} <ArrowUpRight size={16} /></a></div><div className="work-grid"><figure className="large"><img src={selectedWorkImages.productionFloor} alt="Apparel production detail" /><figcaption>{work.captions[0]}</figcaption></figure><figure><img src={selectedWorkImages.denimWash} alt="Denim wash detail" /><figcaption>{work.captions[1]}</figcaption></figure><figure><img src={selectedWorkImages.fabricFinishing} alt="Fabric detail" /><figcaption>{work.captions[2]}</figcaption></figure></div></section>;
}

export function ClosingSection() {
  const { copy } = useLanguage();
  return <section className="closing"><img src={closingImage} alt="" /><div><img className="closing-logo" src="/assets/nwm-logo-full.png" alt="North Weave Mills" /><p>{copy.closing.before} <em>{copy.closing.emphasis}</em></p></div></section>;
}
