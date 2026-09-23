import React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { capabilityGalleries, capabilityImages, closingImage, selectedWorkImages } from "../data/images";
import { capabilities, processSteps } from "../data/siteContent";
import { SectionLabel } from "./SiteChrome";

export function Ticker() {
  const items = "DENIM · LEATHERWEAR · BIKERWEAR · FASHIONWEAR · KNITWEAR · SPORTSWEAR · ";
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
  }, []);

  return <div className="ticker" ref={tickerRef}>
    <div className="ticker-track" style={{ "--ticker-duration": `${repeatCount * 32}s` }}>
      {[0, 1].map(group => <div className="ticker-group" key={group} aria-hidden={group === 1 ? true : undefined}>
        {Array.from({ length: repeatCount }, (_, index) => <span className="ticker-items" key={index} ref={group === 0 && index === 0 ? itemRef : undefined} aria-hidden={index > 0 ? true : undefined}>{items}</span>)}
      </div>)}
    </div>
  </div>;
}

export function IntroSection() {
  return <section className="intro section-pad" id="stats"><span className="monogram">NW</span><p className="statement">We give apparel brands a production company they can <em>build on.</em></p><div className="stats">{[["01", "ACCOUNTABLE COMPANY"], ["02", "COUNTRIES SERVED"], ["06–08", "WEEKS TO SHIP"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
}

export function CapabilitiesSection() {
  return <section className="capabilities section-pad" id="make">
    <div className="section-heading"><div><SectionLabel>WHAT WE MAKE</SectionLabel><h2>Made for the way<br /><em>you</em> build.</h2></div><p>From first sample to final shipment, we work across the categories that define modern wardrobes.</p></div>
    <div className="capability-grid">{capabilities.map(([name, text, imageKey], index) => <article className="capability-card" tabIndex="0" key={name}>
      <div className="image-wrap"><img src={capabilityImages[imageKey]} alt={`${name} apparel`} /></div>
      <div className="capability-hover-preview" aria-hidden="true">
        <span className="capability-preview-title">{name} / 0{index + 1}</span>
        <div className="capability-preview-grid">{capabilityGalleries[imageKey].map((image, photoIndex) => image
          ? <img src={image} alt="" key={photoIndex} />
          : <span className="capability-preview-placeholder" key={photoIndex}>0{photoIndex + 1}</span>
        )}</div>
      </div>
      <div className="card-meta"><h3>{name}</h3><span>0{index + 1}</span></div><p>{text}</p>
    </article>)}</div>
  </section>;
}

export function ProcessSection() {
  return <section className="process section-pad" id="process"><div className="section-topline"><SectionLabel>END TO END</SectionLabel><SectionLabel>INQUIRY TO DELIVERY</SectionLabel></div><h2>Five steps. One <em>accountable</em> company.</h2><div className="process-list">{processSteps.map(([number, title, text]) => <div className="process-row" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div><span className="row-arrow">↗</span></div>)}</div></section>;
}

export function QualitySection() {
  const rows = [["COMPANY", "TTI Labs, independent inspection and testing"], ["ACCREDITATION", "ISO/IEC 17020 and ISO 17025"], ["SCOPE", "Every order, inspected and tested before shipment"], ["OUTPUT", "Documented inspection results per order"]];
  return <section className="quality section-pad" id="quality"><div><SectionLabel>QUALITY CONTROL</SectionLabel><h2>Tested before<br />it <em>ships.</em></h2><p>Every order is inspected and tested through TTI Labs, an independent inspection and testing company accredited to ISO/IEC 17020 and ISO 17025.</p></div><div className="quality-panel">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}<small>Accreditations are held by TTI Labs as an independent company.</small></div></section>;
}

export function DifferenceSection() {
  const typical = ["Fragmented communication through agents and brokers", "Timelines slip without notice", "Quality varies batch to batch", "No accountable company in your jurisdiction"];
  const nwm = ["One accountable company, first sample to final delivery", "Fixed schedule, 6 to 8 weeks sample to shipment", "Every order independently inspected by TTI Labs", "German contract, invoicing and customs handled"];
  return <section className="difference section-pad"><SectionLabel>THE DIFFERENCE</SectionLabel><h2>Company, not supplier.</h2><div className="comparison"><div className="comparison-card muted"><SectionLabel>THE TYPICAL OVERSEAS SUPPLIER</SectionLabel>{typical.map(item => <p key={item}><span>×</span>{item}</p>)}</div><div className="comparison-card bright"><div className="mini-brand"><span className="brand-mark">N</span> NORTH WEAVE MILLS</div>{nwm.map(item => <p key={item}><Check size={16} /><span>{item}</span></p>)}</div></div></section>;
}

export function WorkSection() {
  return <section className="selected-work section-pad" id="work"><div className="section-heading"><div><SectionLabel>SELECTED WORK</SectionLabel><h2>Details that<br /><em>hold up.</em></h2></div><a className="text-link" href="#book">START A PROJECT <ArrowUpRight size={16} /></a></div><div className="work-grid"><figure className="large"><img src={selectedWorkImages.productionFloor} alt="Apparel production detail" /><figcaption>PRODUCTION FLOOR</figcaption></figure><figure><img src={selectedWorkImages.denimWash} alt="Denim wash detail" /><figcaption>DENIM WASH</figcaption></figure><figure><img src={selectedWorkImages.fabricFinishing} alt="Fabric detail" /><figcaption>FABRIC & FINISHING</figcaption></figure></div></section>;
}

export function ClosingSection() {
  return <section className="closing"><img src={closingImage} alt="" /><div><span className="monogram light">NW</span><p>Production your brand can <em>build on.</em></p></div></section>;
}
