import React from "react";

export const languageOptions = [
  { code: "en", short: "EN", label: "English" },
  { code: "de", short: "DE", label: "Deutsch" },
];

const copy = {
  en: {
    nav: { capabilities: "CAPABILITIES", process: "PROCESS", quality: "QUALITY", work: "WORK", book: "BOOK A CALL", close: "CLOSE" },
    hero: { label: "APPAREL PRODUCTION COMPANY · GERMANY", line1: "Built for Brands.", emphasis: "Structured", line2: "for Production.", description: "A German production company for apparel brands that don't compromise.", scroll: "SCROLL", film: "NWM FILM" },
    ticker: "DENIM · LEATHERWEAR · BIKERWEAR · FASHIONWEAR · KNITWEAR · SPORTSWEAR · ",
    intro: { before: "We give apparel brands a production company they can", emphasis: "build on.", stats: ["ACCOUNTABLE COMPANY", "COUNTRIES SERVED", "WEEKS TO SHIP"] },
    capabilities: {
      label: "WHAT WE MAKE", titleBefore: "Made for the way", titleEmphasis: "you", titleAfter: "build.", description: "From first sample to final shipment, we work across the categories that define modern wardrobes.",
      items: [
        ["Denim", "Jeans, jackets and heavy twill with consistent washes.", "denim"],
        ["Leatherwear", "Jackets and separates in full-grain and nappa leather.", "leather"],
        ["Bikerwear", "Protective silhouettes, reinforced seams, clean hardware.", "biker"],
        ["Fashionwear", "Cut and sew ready-to-wear across seasonal drops.", "fashion"],
        ["Knitwear", "Fully fashioned knits and jersey programs.", "knit"],
        ["Sportswear", "Technical fabrics, performance trims, precise finishing.", "sport"],
      ],
    },
    process: {
      label: "END TO END", sideLabel: "INQUIRY TO DELIVERY", before: "Five steps. One", emphasis: "accountable", after: "company.",
      steps: [
        ["01", "Inquiry", "Send the product, quantities and timeline. You get a clear plan and a single contact."],
        ["02", "Sampling", "Development and fit samples, revised until approval. Nothing moves without your sign off."],
        ["03", "Production", "Materials are sourced, production is scheduled, and your order is made to specification."],
        ["04", "Quality control", "Every order is independently inspected and tested before it leaves the factory."],
        ["05", "Delivery", "Air freight to your door, customs already handled."],
      ],
    },
    quality: { label: "QUALITY CONTROL", titleBefore: "Tested before", titleEmphasis: "it ships.", description: "Every order is inspected and tested through TTI Labs, an independent inspection and testing company accredited to ISO/IEC 17020 and ISO 17025.", rows: [["COMPANY", "TTI Labs, independent inspection and testing"], ["ACCREDITATION", "ISO/IEC 17020 and ISO 17025"], ["SCOPE", "Every order, inspected and tested before shipment"], ["OUTPUT", "Documented inspection results per order"]], note: "Accreditations are held by TTI Labs as an independent company." },
    difference: { label: "THE DIFFERENCE", title: "Company, not supplier.", typicalLabel: "THE TYPICAL OVERSEAS SUPPLIER", typical: ["Fragmented communication through agents and brokers", "Timelines slip without notice", "Quality varies batch to batch", "No accountable company in your jurisdiction"], nwm: ["One accountable company, first sample to final delivery", "Fixed schedule, 6 to 8 weeks sample to shipment", "Every order independently inspected by TTI Labs", "German contract, invoicing and customs handled"] },
    work: { label: "SELECTED WORK", titleBefore: "Details that", titleEmphasis: "hold up.", cta: "START A PROJECT", captions: ["DENIM OUTERWEAR", "WASHED DENIM", "LEATHER DETAILS", "BIKERWEAR", "FASHION SHIRTING"] },
    booking: { label: "TELL US WHAT YOU'RE BUILDING", titleBefore: "Book a", titleEmphasis: "Call.", description: "A 20 minute intro with our production team. Bring a product, a tech pack, or just an idea of quantities.", thanks: "Thanks — we'll be in touch shortly.", name: "Name", namePlaceholder: "Your name", email: "Email", message: "Tell us about your project", messagePlaceholder: "What are you building?", closeBrief: "CLOSE PROJECT BRIEF", openBrief: "BUILD A DETAILED PROJECT BRIEF", sending: "SENDING...", sendInquiry: "SEND INQUIRY", briefLabel: "PROJECT BRIEF", briefDescription: "Give our production team the details to prepare your first conversation.", briefThanks: "Your project brief is with our team. We'll be in touch shortly.", brand: "Brand name", brandPlaceholder: "Your brand", instagram: "Instagram handle", contactEmail: "Contact email", total: "Total pieces", product: "What kind of product are you making?", productPlaceholder: "e.g. denim jackets, knitwear, activewear", colours: "Colours", coloursPlaceholder: "e.g. black, washed blue, cream", pieces: "Pieces per style", piecesPlaceholder: "e.g. 100 XS / 200 S / 200 M", techPacks: "Do you have tech packs available?", yes: "Yes, ready to share", no: "Not yet", sendBrief: "SEND PROJECT BRIEF" },
    footer: { description1: "A German production company", description2: "for apparel brands.", pages: "PAGES", contact: "CONTACT", capabilities: "Capabilities", process: "Process", quality: "Quality", contactBook: "Contact / Book a Call", book: "Book a Call", country: "GERMANY · NWM" },
  },
  de: {
    nav: { capabilities: "KOMPETENZEN", process: "ABLAUF", quality: "QUALITÄT", work: "ARBEITEN", book: "GESPRÄCH BUCHEN", close: "SCHLIESSEN" },
    hero: { label: "BEKLEIDUNGSPRODUKTION · DEUTSCHLAND", line1: "Für Marken gemacht.", emphasis: "Strukturiert", line2: "für die Produktion.", description: "Ein deutsches Produktionsunternehmen für Modemarken mit höchsten Ansprüchen.", scroll: "SCROLLEN", film: "NWM FILM" },
    ticker: "DENIM · LEDERBEKLEIDUNG · BIKERBEKLEIDUNG · MODE · STRICKWAREN · SPORTBEKLEIDUNG · ",
    intro: { before: "Wir geben Modemarken ein Produktionsunternehmen, auf das sie", emphasis: "bauen können.", stats: ["VERANTWORTLICHES UNTERNEHMEN", "BELIEFERTE LÄNDER", "WOCHEN BIS VERSAND"] },
    capabilities: { label: "WAS WIR FERTIGEN", titleBefore: "Gemacht für die Art, wie", titleEmphasis: "Sie", titleAfter: "arbeiten.", description: "Vom ersten Muster bis zur letzten Lieferung fertigen wir die Kategorien, die moderne Garderoben prägen.", items: [["Denim", "Jeans, Jacken und schwere Twill-Stoffe mit gleichmäßigen Waschungen.", "denim"], ["Lederbekleidung", "Jacken und Einzelteile aus Vollnarben- und Nappaleder.", "leather"], ["Bikerbekleidung", "Schützende Silhouetten, verstärkte Nähte und klare Beschläge.", "biker"], ["Mode", "Konfektionierte Ready-to-wear-Kollektionen für saisonale Drops.", "fashion"], ["Strickwaren", "Fully-fashioned Strick und Jersey-Programme.", "knit"], ["Sportbekleidung", "Technische Stoffe, funktionale Details und präzise Verarbeitung.", "sport"]] },
    process: { label: "VON ANFANG BIS ENDE", sideLabel: "ANFRAGE BIS LIEFERUNG", before: "Fünf Schritte. Ein", emphasis: "verantwortliches", after: "Unternehmen.", steps: [["01", "Anfrage", "Senden Sie Produkt, Mengen und Zeitplan. Sie erhalten einen klaren Plan und einen festen Kontakt."], ["02", "Muster", "Entwicklungs- und Passformmuster werden bis zur Freigabe überarbeitet. Ohne Ihre Zustimmung geht nichts weiter."], ["03", "Produktion", "Materialien werden beschafft, die Produktion wird geplant und Ihre Bestellung nach Vorgabe gefertigt."], ["04", "Qualitätskontrolle", "Jede Bestellung wird vor Verlassen des Werks unabhängig geprüft und getestet."], ["05", "Lieferung", "Luftfracht bis zu Ihrer Tür, inklusive Zollabwicklung."]] },
    quality: { label: "QUALITÄTSKONTROLLE", titleBefore: "Geprüft, bevor", titleEmphasis: "es versendet wird.", description: "Jede Bestellung wird durch TTI Labs geprüft und getestet, ein unabhängiges Prüfunternehmen mit Akkreditierung nach ISO/IEC 17020 und ISO 17025.", rows: [["UNTERNEHMEN", "TTI Labs, unabhängige Inspektion und Prüfung"], ["AKKREDITIERUNG", "ISO/IEC 17020 und ISO 17025"], ["UMFANG", "Jede Bestellung wird vor Versand geprüft und getestet"], ["ERGEBNIS", "Dokumentierte Prüfergebnisse pro Bestellung"]], note: "Die Akkreditierungen werden von TTI Labs als unabhängigem Unternehmen gehalten." },
    difference: { label: "DER UNTERSCHIED", title: "Unternehmen statt Lieferant.", typicalLabel: "DER TYPISCHE ÜBERSEE-LIEFERANT", typical: ["Zersplitterte Kommunikation über Agenten und Vermittler", "Zeitpläne verschieben sich ohne Hinweis", "Qualität schwankt von Charge zu Charge", "Kein verantwortliches Unternehmen in Ihrer Rechtsordnung"], nwm: ["Ein verantwortliches Unternehmen vom ersten Muster bis zur Lieferung", "Fester Zeitplan: 6 bis 8 Wochen vom Muster bis zum Versand", "Jede Bestellung wird unabhängig durch TTI Labs geprüft", "Deutscher Vertrag, Rechnungsstellung und Zollabwicklung"] },
    work: { label: "AUSGEWÄHLTE ARBEITEN", titleBefore: "Details, die", titleEmphasis: "bestehen.", cta: "PROJEKT STARTEN", captions: ["DENIM-JACKEN", "GEWASCHENER DENIM", "LEDERDETAILS", "BIKERBEKLEIDUNG", "FASHION-HEMDEN"] },
    booking: { label: "ERZÄHLEN SIE UNS VON IHREM PROJEKT", titleBefore: "Gespräch", titleEmphasis: "buchen.", description: "Ein 20-minütiges Kennenlernen mit unserem Produktionsteam. Bringen Sie ein Produkt, ein Tech Pack oder nur eine Mengenvorstellung mit.", thanks: "Vielen Dank — wir melden uns in Kürze.", name: "Name", namePlaceholder: "Ihr Name", email: "E-Mail", message: "Erzählen Sie uns von Ihrem Projekt", messagePlaceholder: "Was möchten Sie produzieren?", closeBrief: "PROJEKTBRIEFING SCHLIESSEN", openBrief: "DETAILLIERTES PROJEKTBRIEFING ERSTELLEN", sending: "WIRD GESENDET...", sendInquiry: "ANFRAGE SENDEN", briefLabel: "PROJEKTBRIEFING", briefDescription: "Geben Sie unserem Produktionsteam die Informationen zur Vorbereitung des ersten Gesprächs.", briefThanks: "Ihr Projektbriefing ist bei unserem Team. Wir melden uns in Kürze.", brand: "Markenname", brandPlaceholder: "Ihre Marke", instagram: "Instagram-Name", contactEmail: "Kontakt-E-Mail", total: "Gesamtstückzahl", product: "Welche Art von Produkt möchten Sie fertigen?", productPlaceholder: "z. B. Denimjacken, Strickwaren, Activewear", colours: "Farben", coloursPlaceholder: "z. B. Schwarz, Washed Blue, Creme", pieces: "Stückzahl pro Modell", piecesPlaceholder: "z. B. 100 XS / 200 S / 200 M", techPacks: "Sind Tech Packs vorhanden?", yes: "Ja, bereit zum Teilen", no: "Noch nicht", sendBrief: "PROJEKTBRIEFING SENDEN" },
    footer: { description1: "Ein deutsches Produktionsunternehmen", description2: "für Modemarken.", pages: "SEITEN", contact: "KONTAKT", capabilities: "Kompetenzen", process: "Ablauf", quality: "Qualität", contactBook: "Kontakt / Gespräch buchen", book: "Gespräch buchen", country: "DEUTSCHLAND · NWM" },
  },
  fr: {
    nav: { capabilities: "SAVOIR-FAIRE", process: "PROCESSUS", quality: "QUALITÉ", work: "RÉALISATIONS", book: "RÉSERVER UN APPEL", close: "FERMER" },
    hero: { label: "PRODUCTION TEXTILE · ALLEMAGNE", line1: "Conçu pour les marques.", emphasis: "Structuré", line2: "pour la production.", description: "Une entreprise allemande de production pour les marques qui ne font aucun compromis.", scroll: "DÉCOUVRIR", film: "FILM NWM" },
    ticker: "DENIM · CUIR · ÉQUIPEMENT MOTO · MODE · MAILLE · SPORTSWEAR · ",
    intro: { before: "Nous offrons aux marques une entreprise de production sur laquelle elles peuvent", emphasis: "compter.", stats: ["ENTREPRISE RESPONSABLE", "PAYS DESSERVIS", "SEMAINES AVANT EXPÉDITION"] },
    capabilities: { label: "NOS PRODUCTIONS", titleBefore: "Conçu pour votre façon de", titleEmphasis: "créer", titleAfter: ".", description: "Du premier prototype à l'expédition finale, nous travaillons sur les catégories qui définissent les vestiaires modernes.", items: [["Denim", "Jeans, vestes et sergé épais aux délavages réguliers.", "denim"], ["Vêtements en cuir", "Vestes et pièces séparées en cuir pleine fleur et nappa.", "leather"], ["Équipement moto", "Silhouettes protectrices, coutures renforcées et finitions soignées.", "biker"], ["Mode", "Prêt-à-porter coupé-cousu pour les collections saisonnières.", "fashion"], ["Maille", "Tricots fully-fashioned et programmes jersey.", "knit"], ["Sportswear", "Tissus techniques, détails performants et finitions précises.", "sport"]] },
    process: { label: "DE BOUT EN BOUT", sideLabel: "DEMANDE À LIVRAISON", before: "Cinq étapes. Une entreprise", emphasis: "responsable", after: ".", steps: [["01", "Demande", "Envoyez le produit, les quantités et le calendrier. Vous recevez un plan clair et un interlocuteur unique."], ["02", "Prototypage", "Prototypes de développement et d'ajustement, révisés jusqu'à validation. Rien n'avance sans votre accord."], ["03", "Production", "Les matières sont sourcées, la production planifiée et votre commande fabriquée selon vos spécifications."], ["04", "Contrôle qualité", "Chaque commande est inspectée et testée indépendamment avant de quitter l'usine."], ["05", "Livraison", "Fret aérien jusqu'à votre porte, formalités douanières incluses."]] },
    quality: { label: "CONTRÔLE QUALITÉ", titleBefore: "Testé avant", titleEmphasis: "expédition.", description: "Chaque commande est inspectée et testée par TTI Labs, une entreprise indépendante accréditée ISO/IEC 17020 et ISO 17025.", rows: [["ENTREPRISE", "TTI Labs, inspection et essais indépendants"], ["ACCRÉDITATION", "ISO/IEC 17020 et ISO 17025"], ["PÉRIMÈTRE", "Chaque commande inspectée et testée avant expédition"], ["RÉSULTAT", "Rapports d'inspection documentés pour chaque commande"]], note: "Les accréditations sont détenues par TTI Labs en tant qu'entreprise indépendante." },
    difference: { label: "LA DIFFÉRENCE", title: "Une entreprise, pas un fournisseur.", typicalLabel: "LE FOURNISSEUR ÉTRANGER TYPIQUE", typical: ["Communication fragmentée entre agents et intermédiaires", "Les délais glissent sans avertissement", "La qualité varie d'un lot à l'autre", "Aucune entreprise responsable dans votre juridiction"], nwm: ["Une entreprise responsable du premier prototype à la livraison", "Calendrier fixe, 6 à 8 semaines du prototype à l'expédition", "Chaque commande inspectée indépendamment par TTI Labs", "Contrat allemand, facturation et douanes prises en charge"] },
    work: { label: "RÉALISATIONS", titleBefore: "Des détails qui", titleEmphasis: "durent.", cta: "DÉMARRER UN PROJET", captions: ["VESTES EN DENIM", "DÉLAVAGE DENIM", "DÉTAILS CUIR", "ÉQUIPEMENT MOTO", "CHEMISERIE MODE"] },
    booking: { label: "PARLEZ-NOUS DE VOTRE PROJET", titleBefore: "Réserver un", titleEmphasis: "appel.", description: "Un échange de 20 minutes avec notre équipe de production. Venez avec un produit, un dossier technique ou une idée des quantités.", thanks: "Merci — nous vous contacterons bientôt.", name: "Nom", namePlaceholder: "Votre nom", email: "E-mail", message: "Parlez-nous de votre projet", messagePlaceholder: "Que souhaitez-vous produire ?", closeBrief: "FERMER LE BRIEF PROJET", openBrief: "CRÉER UN BRIEF PROJET DÉTAILLÉ", sending: "ENVOI...", sendInquiry: "ENVOYER LA DEMANDE", briefLabel: "BRIEF PROJET", briefDescription: "Donnez à notre équipe les informations nécessaires pour préparer votre premier échange.", briefThanks: "Votre brief est entre les mains de notre équipe. Nous vous contacterons bientôt.", brand: "Nom de la marque", brandPlaceholder: "Votre marque", instagram: "Compte Instagram", contactEmail: "E-mail de contact", total: "Nombre total de pièces", product: "Quel type de produit fabriquez-vous ?", productPlaceholder: "ex. vestes en denim, maille, activewear", colours: "Couleurs", coloursPlaceholder: "ex. noir, bleu délavé, crème", pieces: "Pièces par modèle", piecesPlaceholder: "ex. 100 XS / 200 S / 200 M", techPacks: "Avez-vous des dossiers techniques ?", yes: "Oui, prêts à partager", no: "Pas encore", sendBrief: "ENVOYER LE BRIEF" },
    footer: { description1: "Une entreprise allemande de production", description2: "pour les marques de mode.", pages: "PAGES", contact: "CONTACT", capabilities: "Savoir-faire", process: "Processus", quality: "Qualité", contactBook: "Contact / Réserver un appel", book: "Réserver un appel", country: "ALLEMAGNE · NWM" },
  },
};

const LanguageContext = React.createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = React.useState(() => {
    const saved = window.localStorage.getItem("nwm-language");
    return languageOptions.some(({ code }) => code === saved) ? saved : "en";
  });

  React.useEffect(() => {
    window.localStorage.setItem("nwm-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = React.useMemo(() => ({ language, setLanguage, copy: copy[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = React.useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used within LanguageProvider");
  return value;
}
