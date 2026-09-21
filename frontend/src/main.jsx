import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowUpRight, Check, Menu, X } from "lucide-react";
import "./styles.css";

const images = {
  hero: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=2200&q=85",
  denim: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
  leather: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  biker: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=85",
  fashion: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
  knit: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=900&q=85",
  sport: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
  work: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85",
  texture: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85"
};

const capabilities = [
  ["Denim", "Jeans, jackets and heavy twill with consistent washes.", images.denim],
  ["Leatherwear", "Jackets and separates in full-grain and nappa leather.", images.leather],
  ["Bikerwear", "Protective silhouettes, reinforced seams, clean hardware.", images.biker],
  ["Fashionwear", "Cut and sew ready-to-wear across seasonal drops.", images.fashion],
  ["Knitwear", "Fully fashioned knits and jersey programs.", images.knit],
  ["Sportswear", "Technical fabrics, performance trims, precise finishing.", images.sport]
];

const processSteps = [
  ["01", "Inquiry", "Send the product, quantities and timeline. You get a clear plan and a single contact."],
  ["02", "Sampling", "Development and fit samples, revised until approval. Nothing moves without your sign off."],
  ["03", "Production", "Materials are sourced, production is scheduled, and your order is made to specification."],
  ["04", "Quality control", "Every order is independently inspected and tested before it leaves the factory."],
  ["05", "Delivery", "Air freight to your door, customs already handled."]
];

class SectionLabel extends React.Component {
  render() {
    return <span className="eyebrow">{this.props.children}</span>;
  }
}

class Header extends React.Component {
  render() {
    const { menuOpen, onToggle } = this.props;
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
}

class ScrollEffects extends React.Component {
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

class MobileMenu extends React.Component {
  render() {
    if (!this.props.open) return null;
    return (
      <div className="mobile-menu">
        <div className="mobile-menu-top">
          <span className="brand"><span className="brand-mark">N</span><span>NORTH WEAVE MILLS</span></span>
          <button onClick={this.props.onClose}>CLOSE <X size={16} /></button>
        </div>
        <nav>
          {["make", "process", "quality", "work"].map((id, i) => (
            <a key={id} href={`#${id}`} onClick={this.props.onClose}>{["Capabilities", "Process", "Quality", "Selected Work"][i]} <ArrowUpRight size={22} /></a>
          ))}
        </nav>
        <a className="solid-button mobile-cta" href="#book" onClick={this.props.onClose}>BOOK A CALL</a>
      </div>
    );
  }
}

class Hero extends React.Component {
  render() {
    return (
      <section className="hero" id="top">
        <video
          className="hero-video"
          src="/assets/dashboard-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Apparel production footage"
        />
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
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false, submitted: false, submitting: false, submitError: "", briefOpen: false, briefSubmitted: false, briefSubmitting: false, briefError: "" };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ submitting: true, submitError: "" });
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message")
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail || "The inquiry could not be sent.");
      }
      this.setState({ submitted: true, submitting: false });
    } catch (error) {
      this.setState({
        submitting: false,
        submitError: error instanceof Error ? error.message : "The inquiry could not be sent."
      });
    }
  };

  handleBriefSubmit = async (event) => {
    event.preventDefault();
    this.setState({ briefSubmitting: true, briefError: "" });
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/project-briefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: form.get("brand_name"),
          instagram: form.get("instagram") || null,
          contact_email: form.get("contact_email"),
          product_type: form.get("product_type"),
          total_pieces: Number(form.get("total_pieces")),
          tech_packs_available: form.get("tech_packs_available") === "yes",
          colours: form.get("colours"),
          pieces_per_style: form.get("pieces_per_style")
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || "The project brief could not be sent.");
      this.setState({ briefSubmitted: true, briefSubmitting: false });
    } catch (error) {
      this.setState({ briefSubmitting: false, briefError: error instanceof Error ? error.message : "The project brief could not be sent." });
    }
  };

  render() {
    return (
      <div className="app">
        <ScrollEffects />
        <Header menuOpen={this.state.menuOpen} onToggle={() => this.setState({ menuOpen: !this.state.menuOpen })} />
        <MobileMenu open={this.state.menuOpen} onClose={() => this.setState({ menuOpen: false })} />
        <main>
          <Hero />
          <div className="ticker"><div>DENIM <i>·</i> LEATHERWEAR <i>·</i> BIKERWEAR <i>·</i> FASHIONWEAR <i>·</i> KNITWEAR <i>·</i> SPORTSWEAR <i>·</i>&nbsp;&nbsp;</div><div>DENIM <i>·</i> LEATHERWEAR <i>·</i> BIKERWEAR <i>·</i> FASHIONWEAR <i>·</i> KNITWEAR <i>·</i> SPORTSWEAR <i>·</i>&nbsp;&nbsp;</div></div>

          <section className="intro section-pad" id="stats">
            <span className="monogram">NW</span>
            <p className="statement">We give apparel brands a production partner they can <em>build on.</em></p>
            <div className="stats">
              {[["01", "ACCOUNTABLE PARTNER"], ["02", "COUNTRIES SERVED"], ["06–08", "WEEKS TO SHIP"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </section>

          <section className="capabilities section-pad" id="make">
            <div className="section-heading"><div><SectionLabel>01 / WHAT WE MAKE</SectionLabel><h2>Made for the way<br /><em>you</em> build.</h2></div><p>From first sample to final shipment, we work across the categories that define modern wardrobes.</p></div>
            <div className="capability-grid">{capabilities.map(([name, text, image], index) => <a className="capability-card" href="#book" key={name}><div className="image-wrap"><img src={image} alt={`${name} apparel`} /></div><div className="card-meta"><h3>{name}</h3><span>0{index + 1}</span></div><p>{text}</p></a>)}</div>
          </section>

          <section className="process section-pad" id="process">
            <div className="section-topline"><SectionLabel>02 / END TO END</SectionLabel><SectionLabel>INQUIRY TO DELIVERY</SectionLabel></div>
            <h2>Five steps. One <em>accountable</em> partner.</h2>
            <div className="process-list">{processSteps.map(([number, title, text]) => <div className="process-row" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div><span className="row-arrow">↗</span></div>)}</div>
          </section>

          <section className="quality section-pad" id="quality">
            <div><SectionLabel>03 / QUALITY CONTROL</SectionLabel><h2>Tested before<br />it <em>ships.</em></h2><p>Every order is inspected and tested through TTI Labs, an independent inspection and testing partner accredited to ISO/IEC 17020 and ISO 17025.</p></div>
            <div className="quality-panel">{[["PARTNER", "TTI Labs, independent inspection and testing"], ["ACCREDITATION", "ISO/IEC 17020 and ISO 17025"], ["SCOPE", "Every order, inspected and tested before shipment"], ["OUTPUT", "Documented inspection results per order"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}<small>Accreditations are held by TTI Labs as an independent partner.</small></div>
          </section>

          <section className="difference section-pad"><SectionLabel>04 / THE DIFFERENCE</SectionLabel><h2>Partner, not supplier.</h2><div className="comparison"><div className="comparison-card muted"><SectionLabel>THE TYPICAL OVERSEAS SUPPLIER</SectionLabel>{["Fragmented communication through agents and brokers", "Timelines slip without notice", "Quality varies batch to batch", "No accountable partner in your jurisdiction"].map(item => <p key={item}><span>×</span>{item}</p>)}</div><div className="comparison-card bright"><div className="mini-brand"><span className="brand-mark">N</span> NORTH WEAVE MILLS</div>{["One accountable partner, first sample to final delivery", "Fixed schedule, 6 to 8 weeks sample to shipment", "Every order independently inspected by TTI Labs", "German contract, invoicing and customs handled"].map(item => <p key={item}><Check size={16} /><span>{item}</span></p>)}</div></div></section>

          <section className="selected-work section-pad" id="work"><div className="section-heading"><div><SectionLabel>05 / SELECTED WORK</SectionLabel><h2>Details that<br /><em>hold up.</em></h2></div><a className="text-link" href="#book">START A PROJECT <ArrowUpRight size={16} /></a></div><div className="work-grid"><figure className="large"><img src={images.work} alt="Apparel production detail" /><figcaption>PRODUCTION FLOOR</figcaption></figure><figure><img src={images.denim} alt="Denim wash detail" /><figcaption>DENIM WASH</figcaption></figure><figure><img src={images.texture} alt="Fabric detail" /><figcaption>FABRIC & FINISHING</figcaption></figure></div></section>

          <section className="closing"><img src={images.fashion} alt="" /><div><span className="monogram light">NW</span><p>Production your brand can <em>build on.</em></p></div></section>

          <section className="booking section-pad" id="book"><SectionLabel>TELL US WHAT YOU&apos;RE BUILDING</SectionLabel><h2 className="book-title"><span>Book a</span> <em>Call.</em></h2><p>A 20 minute intro with our production team. Bring a product, a tech pack, or just an idea of quantities.</p><form onSubmit={this.handleSubmit}>{this.state.submitted ? <div className="success">Thanks — we&apos;ll be in touch shortly.</div> : <><div className="form-grid"><label>Name<input name="name" required type="text" placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@brand.com" /></label></div><label>Tell us about your project<textarea name="message" required minLength="10" placeholder="What are you building?" rows="4" /></label>{this.state.submitError && <p className="form-error" role="alert">{this.state.submitError}</p>}<button className="solid-button" type="submit" disabled={this.state.submitting}>{this.state.submitting ? "SENDING..." : "SEND INQUIRY"} {!this.state.submitting && <ArrowUpRight size={16} />}</button></>}</form><button className="brief-toggle" type="button" onClick={() => this.setState({ briefOpen: !this.state.briefOpen })}>{this.state.briefOpen ? "CLOSE PROJECT BRIEF" : "BUILD A DETAILED PROJECT BRIEF"} <ArrowUpRight size={15} /></button>{this.state.briefOpen && <div className="brief-panel"><div className="brief-heading"><SectionLabel>PROJECT BRIEF</SectionLabel><p>Give our production team the details to prepare your first conversation.</p></div>{this.state.briefSubmitted ? <div className="success">Your project brief is with our team. We&apos;ll be in touch shortly.</div> : <form className="brief-form" onSubmit={this.handleBriefSubmit}><div className="form-grid"><label>Brand name<input name="brand_name" required type="text" placeholder="Your brand" /></label><label>Instagram handle<input name="instagram" type="text" placeholder="@yourbrand" /></label></div><div className="form-grid"><label>Contact email<input name="contact_email" required type="email" placeholder="you@brand.com" /></label><label>Total pieces<input name="total_pieces" required type="number" min="1" placeholder="e.g. 500" /></label></div><label>What kind of product are you making?<input name="product_type" required type="text" placeholder="e.g. denim jackets, knitwear, activewear" /></label><div className="form-grid"><label>Colours<input name="colours" required type="text" placeholder="e.g. black, washed blue, cream" /></label><label>Pieces per style<input name="pieces_per_style" required type="text" placeholder="e.g. 100 XS / 200 S / 200 M" /></label></div><fieldset><legend>Do you have tech packs available?</legend><label className="radio-label"><input name="tech_packs_available" required type="radio" value="yes" /> Yes, ready to share</label><label className="radio-label"><input name="tech_packs_available" required type="radio" value="no" /> Not yet</label></fieldset>{this.state.briefError && <p className="form-error" role="alert">{this.state.briefError}</p>}<button className="solid-button" type="submit" disabled={this.state.briefSubmitting}>{this.state.briefSubmitting ? "SENDING..." : "SEND PROJECT BRIEF"} {!this.state.briefSubmitting && <ArrowUpRight size={16} />}</button></form>}</div>}</section>
        </main>
        <footer><div className="footer-main"><div><span className="footer-logo">NWM</span><p>A German production partner<br />for apparel brands.</p></div><div><SectionLabel>PAGES</SectionLabel><a href="#make">Capabilities</a><a href="#process">Process</a><a href="#quality">Quality</a><a href="#book">Contact / Book a Call</a></div><div><SectionLabel>CONTACT</SectionLabel><a href="mailto:hello@northweavemills.com">hello@northweavemills.com</a><a href="#book">Book a Call</a></div></div><div className="footer-bottom"><span>© 2026 NORTH WEAVE MILLS</span><span>GERMANY · NWM</span></div></footer>
      </div>
    );
  }
}

createRoot(document.getElementById("root")).render(<App />);
