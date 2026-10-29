import React from "react";

// Client-supplied policy text; internal publication notes are excluded.
export default function PrivacyPolicy({ language }) {
  return language === "en" ? <>
      <h1>{"Privacy Policy"}</h1>
      <p>{"This policy explains which personal data we process when you visit this website or send us an enquiry. The German version is legally binding; this English version is provided for convenience."}</p>
      <h2>{"1. Controller"}</h2>
      <p>{"North Weave Mills UG (haftungsbeschränkt)"}<br />{"Ottostraße 20-22"}<br />{"63150 Heusenstamm"}<br />{"Germany"}<br />{"Phone: +49 176 317 84594"}<br />{"Email: info@northweavemills.com"}</p>
      <h2>{"2. Hosting and server logs"}</h2>
      <p>{"Our website is hosted on servers in Germany by ALL-INKL.COM – Neue Medien Münnich, owner René Münnich, Hauptstraße 68, 02742 Friedersdorf, Germany."}</p>
      <p>{"Each time the website is accessed, the server processes technically necessary data transmitted by your browser: IP address, date and time, requested page or file, amount of data transferred, status code, referrer URL, and browser and operating system. We need this data to deliver the website and to keep it secure and stable, for example to fend off attacks. It is not combined with other data and is stored only as long as necessary for these purposes."}</p>
      <p>{"The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is the secure and error-free operation of the website."}</p>
      <h2>{"3. SSL/TLS encryption"}</h2>
      <p>{"This website uses SSL/TLS encryption, recognisable by \"https://\" in the address bar. Data you send through our forms cannot be read by third parties in transit."}</p>
      <h2>{"4. Contact forms"}</h2>
      <p>{"Our website offers an enquiry form (\"Book a Call\") and a project brief form (\"Project Brief\"). When you submit a form, we process the details you enter. Depending on the form, these are in particular name, brand name, email address and your message, as well as optional details such as Instagram handle, product type, quantities, colours and whether tech packs are available. We also receive which form you used and the language in which you are viewing the website."}</p>
      <p>{"A script on our web server receives the details and forwards them by email to our company mailbox (see section 5). We use them solely to handle your enquiry and to get in touch with you."}</p>
      <p>{"The legal basis is Art. 6(1)(b) GDPR where your enquiry relates to entering into a contract or to pre-contractual steps, and Art. 6(1)(f) GDPR otherwise. Our legitimate interest is responding to enquiries."}</p>
      <p>{"Please do not send us special categories of personal data (e.g. health data) through the forms."}</p>
      <h2>{"5. Email and Google Workspace"}</h2>
      <p>{"When you email us or submit a form, we process your email address, name, the content of your message and any attachments in order to handle your request. The legal bases are the same as in section 4."}</p>
      <p>{"Our mailboxes run on Google Workspace, provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Google processes the emails on our behalf as a processor. A transfer to Google LLC in the USA cannot be ruled out. Google LLC is certified under the EU-US Data Privacy Framework, which is covered by an adequacy decision of the European Commission (Art. 45 GDPR). In addition, Google has agreed to the European Commission's standard contractual clauses (Art. 46(2)(c) GDPR)."}</p>
      <h2>{"6. Language setting in local storage"}</h2>
      <p>{"The website stores the selected language (German or English) under the key "}<code>{"nwm-language"}</code>{" in your browser's local storage, so that the website is shown in the same language on your next visit. The entry stays on your device and is not sent to us. You can delete it at any time in your browser settings."}</p>
      <p>{"This storage is strictly necessary to provide the language version you have requested (Section 25(2) no. 2 TDDDG, German Telecommunications Digital Services Data Protection Act). The legal basis for any further processing is Art. 6(1)(f) GDPR."}</p>
      <h2>{"7. No cookies, no tracking"}</h2>
      <p>{"We do not use cookies or any analytics, advertising or tracking services. Fonts, images and videos are loaded directly from our own web server. No content from third-party servers is embedded."}</p>
      <h2>{"8. Links to other websites"}</h2>
      <p>{"Our website may contain links to third-party websites. Data is only transmitted to the respective provider once you click such a link. That provider alone is responsible for its data processing."}</p>
      <h2>{"9. Retention"}</h2>
      <p>{"We delete enquiries once they have been dealt with and no further communication is expected. If a contract is concluded, we keep the necessary records for as long as statutory retention periods require (up to ten years under German commercial and tax law, Section 257 HGB, Section 147 AO). Beyond that, we only keep data where necessary to establish, exercise or defend legal claims."}</p>
      <h2>{"10. Your rights"}</h2>
      <p>{"Subject to the statutory requirements, you have the right to"}</p>
      <ul><li>{"access the data we hold about you (Art. 15 GDPR),"}</li><li>{"rectification of inaccurate data (Art. 16 GDPR),"}</li><li>{"erasure (Art. 17 GDPR),"}</li><li>{"restriction of processing (Art. 18 GDPR),"}</li><li>{"data portability (Art. 20 GDPR)."}</li></ul>
      <p>{"You can withdraw any consent at any time with effect for the future (Art. 7(3) GDPR). An informal email to info@northweavemills.com is sufficient."}</p>
      <p><strong>{"Right to object (Art. 21 GDPR):"}</strong>{" Where we process your data on the basis of Art. 6(1)(f) GDPR, you may object to this processing at any time on grounds relating to your particular situation. We will then stop processing the data unless we can demonstrate compelling legitimate grounds that override your interests, or the processing serves to establish, exercise or defend legal claims."}</p>
      <h2>{"11. Right to lodge a complaint"}</h2>
      <p>{"You have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority responsible for us is:"}</p>
      <p>{"Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (Hessian Commissioner for Data Protection and Freedom of Information)"}<br />{"Wilhelmstraße 7, 65185 Wiesbaden, Germany"}<br />{"Phone: +49 611 1408-0"}<br />{"Email: poststelle@datenschutz.hessen.de"}<br />{"Website: datenschutz.hessen.de"}</p>
      <h2>{"12. Obligation to provide data"}</h2>
      <p>{"You do not have to provide any data to visit the website. For an enquiry we need the details marked as required; otherwise we cannot handle your enquiry. We do not use automated decision-making, including profiling."}</p>
      <h2>{"13. Last updated"}</h2>
      <p>{"Last updated: October 2026. We will update this policy whenever the website or our data processing changes."}</p>
    </> : <>
      <h1>{"Datenschutzerklärung"}</h1>
      <p>{"Hier erfahren Sie, welche personenbezogenen Daten wir beim Besuch dieser Website und bei einer Anfrage verarbeiten."}</p>
      <h2>{"1. Verantwortlicher"}</h2>
      <p>{"North Weave Mills UG (haftungsbeschränkt)"}<br />{"Ottostraße 20-22"}<br />{"63150 Heusenstamm"}<br />{"Deutschland"}<br />{"Telefon: +49 176 317 84594"}<br />{"E-Mail: info@northweavemills.com"}</p>
      <h2>{"2. Hosting und Server-Protokolle"}</h2>
      <p>{"Unsere Website wird von ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich, Hauptstraße 68, 02742 Friedersdorf, Deutschland, auf Servern in Deutschland gehostet."}</p>
      <p>{"Bei jedem Aufruf der Website verarbeitet der Server technisch notwendige Daten, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite oder Datei, übertragene Datenmenge, Statuscode, Referrer-URL sowie Browser und Betriebssystem. Diese Daten werden benötigt, um die Website auszuliefern sowie ihre Sicherheit und Stabilität zu gewährleisten, etwa zur Abwehr von Angriffen. Sie werden nicht mit anderen Daten zusammengeführt und nur so lange gespeichert, wie es für diese Zwecke erforderlich ist."}</p>
      <p>{"Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und fehlerfreien Betrieb der Website."}</p>
      <h2>{"3. SSL/TLS-Verschlüsselung"}</h2>
      <p>{"Die Website nutzt eine SSL/TLS-Verschlüsselung. Sie erkennen sie an „https://“ in der Adresszeile. Daten, die Sie über unsere Formulare senden, können so nicht von Dritten mitgelesen werden."}</p>
      <h2>{"4. Kontaktformulare"}</h2>
      <p>{"Auf unserer Website gibt es ein Formular für Anfragen („Book a Call“) und ein Formular für ein Projektbriefing („Project Brief“). Wenn Sie ein Formular absenden, verarbeiten wir die Angaben, die Sie dort eintragen. Je nach Formular sind das insbesondere Name, Markenname, E-Mail-Adresse und Ihre Nachricht sowie freiwillige Angaben wie Instagram-Name, Produktart, Stückzahlen, Farben und ob Tech Packs vorhanden sind. Zusätzlich wird übermittelt, welches Formular Sie genutzt haben und in welcher Sprache Sie die Website ansehen."}</p>
      <p>{"Die Angaben werden von einem Skript auf unserem Webserver entgegengenommen und per E-Mail an unser Firmenpostfach gesendet (siehe Abschnitt 5). Wir nutzen sie ausschließlich, um Ihre Anfrage zu bearbeiten und mit Ihnen in Kontakt zu treten."}</p>
      <p>{"Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertragsschluss oder auf vorvertragliche Maßnahmen gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Beantwortung von Anfragen."}</p>
      <p>{"Bitte senden Sie uns über die Formulare keine besonderen Kategorien personenbezogener Daten (z. B. Gesundheitsdaten)."}</p>
      <h2>{"5. E-Mail-Kommunikation und Google Workspace"}</h2>
      <p>{"Wenn Sie uns per E-Mail schreiben oder ein Formular absenden, verarbeiten wir Ihre E-Mail-Adresse, Ihren Namen, den Inhalt der Nachricht und etwaige Anhänge, um Ihr Anliegen zu bearbeiten. Rechtsgrundlagen sind dieselben wie in Abschnitt 4."}</p>
      <p>{"Für unsere E-Mail-Postfächer nutzen wir Google Workspace der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google verarbeitet die E-Mails in unserem Auftrag als Auftragsverarbeiter. Dabei kann eine Übermittlung an die Google LLC in den USA nicht ausgeschlossen werden. Die Google LLC ist unter dem EU-US Data Privacy Framework zertifiziert, für das ein Angemessenheitsbeschluss der EU-Kommission besteht (Art. 45 DSGVO). Ergänzend hat Google Standardvertragsklauseln der EU-Kommission vereinbart (Art. 46 Abs. 2 lit. c DSGVO)."}</p>
      <h2>{"6. Spracheinstellung im lokalen Speicher"}</h2>
      <p>{"Die Website speichert die gewählte Sprache (Deutsch oder Englisch) unter dem Schlüssel "}<code>{"nwm-language"}</code>{" im lokalen Speicher Ihres Browsers (localStorage). So wird die Website beim nächsten Besuch in derselben Sprache angezeigt. Der Eintrag bleibt auf Ihrem Gerät und wird nicht an uns übermittelt. Sie können ihn jederzeit über die Einstellungen Ihres Browsers löschen."}</p>
      <p>{"Die Speicherung ist unbedingt erforderlich, um die von Ihnen gewünschte Sprachfassung bereitzustellen (§ 25 Abs. 2 Nr. 2 TDDDG). Rechtsgrundlage für die weitere Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO."}</p>
      <h2>{"7. Keine Cookies, kein Tracking"}</h2>
      <p>{"Wir setzen keine Cookies und keine Analyse-, Werbe- oder Tracking-Dienste ein. Schriftarten, Bilder und Videos werden direkt von unserem eigenen Webserver geladen. Es werden keine Inhalte von Servern Dritter eingebunden."}</p>
      <h2>{"8. Links zu anderen Websites"}</h2>
      <p>{"Unsere Website kann Links zu Angeboten Dritter enthalten. Erst wenn Sie einen solchen Link anklicken, werden Daten an den jeweiligen Anbieter übermittelt. Für dessen Datenverarbeitung ist allein dieser Anbieter verantwortlich."}</p>
      <h2>{"9. Speicherdauer"}</h2>
      <p>{"Anfragen löschen wir, sobald sie erledigt sind und keine weitere Kommunikation zu erwarten ist. Kommt es zu einem Vertrag, bewahren wir die dafür erforderlichen Unterlagen so lange auf, wie es die gesetzlichen Aufbewahrungsfristen vorschreiben (nach Handels- und Steuerrecht bis zu zehn Jahre, § 257 HGB, § 147 AO). Darüber hinaus speichern wir Daten nur, soweit es zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist."}</p>
      <h2>{"10. Ihre Rechte"}</h2>
      <p>{"Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf"}</p>
      <ul><li>{"Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO),"}</li><li>{"Berichtigung unrichtiger Daten (Art. 16 DSGVO),"}</li><li>{"Löschung (Art. 17 DSGVO),"}</li><li>{"Einschränkung der Verarbeitung (Art. 18 DSGVO),"}</li><li>{"Datenübertragbarkeit (Art. 20 DSGVO)."}</li></ul>
      <p>{"Eine Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Eine formlose E-Mail an info@northweavemills.com genügt."}</p>
      <p><strong>{"Widerspruchsrecht (Art. 21 DSGVO):"}</strong>{" Verarbeiten wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, können Sie dieser Verarbeitung aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen."}</p>
      <h2>{"11. Beschwerderecht"}</h2>
      <p>{"Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns zuständig ist:"}</p>
      <p>{"Der Hessische Beauftragte für Datenschutz und Informationsfreiheit"}<br />{"Wilhelmstraße 7, 65185 Wiesbaden"}<br />{"Telefon: 0611 1408-0"}<br />{"E-Mail: poststelle@datenschutz.hessen.de"}<br />{"Website: datenschutz.hessen.de"}</p>
      <h2>{"12. Pflicht zur Bereitstellung"}</h2>
      <p>{"Für den Besuch der Website müssen Sie uns keine Daten angeben. Für eine Anfrage benötigen wir die als Pflichtfeld markierten Angaben, sonst können wir Ihre Anfrage nicht bearbeiten. Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt."}</p>
      <h2>{"13. Stand"}</h2>
      <p>{"Stand: Oktober 2026. Wir passen diese Datenschutzerklärung an, wenn sich die Website oder unsere Datenverarbeitung ändert."}</p>
    </>;
}
