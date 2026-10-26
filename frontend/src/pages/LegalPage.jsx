import React from "react";
import "../styles/pages/legal.css";

const imprint = window.location.pathname.replace(/\/$/, "") === "/impressum";

export default function LegalPage() {
  React.useEffect(() => {
    document.title = imprint ? "Impressum | North Weave Mills" : "Datenschutzerklärung | North Weave Mills";
    document.querySelector('meta[name="description"]')?.setAttribute("content", imprint ? "Impressum und Anbieterkennzeichnung von North Weave Mills." : "Datenschutzerklärung von North Weave Mills mit Informationen zu Website, Kontaktformular und Datenverarbeitung.");
    document.documentElement.lang = "de";
    return () => {
      document.title = "North Weave Mills";
      document.querySelector('meta[name="description"]')?.setAttribute("content", "North Weave Mills — a German production company for apparel brands.");
    };
  }, []);

  return <main className="legal-page"><a className="legal-home" href="/">NORTH WEAVE MILLS</a><article className="legal-content">
    {imprint ? <Impressum /> : <PrivacyPolicy />}
  </article><a className="legal-back" href="/">Zur Startseite</a></main>;
}

function Impressum() {
  return <>
    <p className="eyebrow">RECHTLICHE ANGABEN</p><h1>Impressum</h1>
    <p>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>
    <h2>Diensteanbieter</h2>
    <p><strong>[Vollständiger eingetragener Unternehmensname]</strong><br />[Rechtsform, z. B. GmbH]<br />[Straße und Hausnummer]<br />[Postleitzahl und Ort]<br />Deutschland</p>
    <h2>Vertretungsberechtigte Person</h2><p>[Vor- und Nachname, Funktion]</p>
    <h2>Kontakt</h2><p>E-Mail: <a href="mailto:Info@northweavemills.com">Info@northweavemills.com</a><br />Telefon: [Telefonnummer, falls vorhanden]</p>
    <h2>Registereintrag</h2><p>[Registergericht und Registernummer; sofern eingetragen, andernfalls diesen Abschnitt nach Prüfung entfernen.]</p>
    <h2>Umsatzsteuer-Identifikationsnummer</h2><p>[Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG, sofern erteilt; andernfalls diesen Abschnitt nach Prüfung entfernen.]</p>
    <h2>Verantwortlich für den Inhalt</h2><p>[Name und ladungsfähige Anschrift der inhaltlich verantwortlichen Person, sofern eine Angabe nach § 18 Abs. 2 MStV erforderlich ist.]</p>
  </>;
}

function PrivacyPolicy() {
  return <>
    <p className="eyebrow">DATENSCHUTZ</p><h1>Datenschutzerklärung</h1>
    <p>Wir erläutern hier, welche personenbezogenen Daten beim Besuch dieser Website und bei einer Kontaktaufnahme verarbeitet werden. Bitte ergänzen und prüfen Sie die markierten Angaben zu Unternehmen, Hosting und Aufbewahrung vor der Veröffentlichung.</p>
    <h2>1. Verantwortlicher</h2><p>Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><strong>[Vollständiger Unternehmensname und Rechtsform]</strong><br />[Straße und Hausnummer, Postleitzahl und Ort, Deutschland]<br />E-Mail: <a href="mailto:Info@northweavemills.com">Info@northweavemills.com</a><br />[Datenschutzkontakt, falls abweichend]</p><p>Datenschutzbeauftragte Person: [Kontaktdaten ergänzen, falls gesetzlich benannt oder bestellt; andernfalls diesen Hinweis entfernen.]</p>
    <h2>2. Hosting und Server-Protokolle</h2><p>Die Website wird als statische Website bereitgestellt; das Kontaktformular wird über ein PHP-Skript auf dem Webserver verarbeitet. Beim Aufruf kann der Hostinganbieter technisch erforderliche Verbindungsdaten in Server-Protokollen verarbeiten, etwa IP-Adresse, Zeitpunkt, angeforderte Datei, übertragene Datenmenge, Referrer, Browser und Betriebssystem.</p><p>Hostinganbieter und Serverstandort: [Anbieter, Anschrift und Serverstandort ergänzen und prüfen]. Ob und wie lange der Anbieter Protokolldaten speichert, ist anhand des Hostingvertrags und der tatsächlichen Konfiguration zu ergänzen: [Speicherdauer und Zweck der Protokollierung ergänzen]. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt im sicheren und zuverlässigen Betrieb der Website. Soweit erforderlich, ist ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO abzuschließen.</p>
    <h2>3. Kontaktformular und E-Mail</h2><p>Wenn Sie eines der Kontaktformulare absenden, werden die dort abgefragten Angaben verarbeitet. Je nach Formular umfasst dies Name oder Markenname, E-Mail-Adresse, Nachricht sowie freiwillige Angaben wie Instagram-Name, Produkt, Stückzahlen, Farben und Verfügbarkeit eines Tech Packs. Die Angaben werden über <code>/contact.php</code> verarbeitet und zur Bearbeitung der Anfrage per E-Mail an <code>samoon@northweavemills.com</code> übermittelt. Der Hostingserver nimmt den Versand über die konfigurierte PHP-<code>mail()</code>-Funktion vor. Der konkrete Mailtransport und etwaige beteiligte Empfänger oder Dienstleister sind vor Veröffentlichung zu prüfen: [Mailanbieter und Übermittlungsorte ergänzen, sofern einschlägig].</p><p>Die Verarbeitung erfolgt zur Bearbeitung vorvertraglicher Anfragen nach Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage darauf gerichtet ist; im Übrigen auf Grundlage unseres berechtigten Interesses an der Beantwortung von Anfragen nach Art. 6 Abs. 1 lit. f DSGVO. Bitte übermitteln Sie keine besonderen Kategorien personenbezogener Daten im Sinne von Art. 9 DSGVO.</p><p>Kontaktieren Sie uns direkt per E-Mail, verarbeiten wir die von Ihnen übermittelten Absender- und Nachrichtenangaben ebenfalls zur Bearbeitung der Anfrage auf den genannten Rechtsgrundlagen.</p>
    <h2>4. Spracheinstellung im lokalen Speicher</h2><p>Die Website liest und schreibt den Sprachcode unter dem Schlüssel <code>nwm-language</code> im lokalen Speicher Ihres Browsers (localStorage), damit die Sprache bei einem späteren Besuch wiederhergestellt werden kann. Der Eintrag wird auf Ihrem Endgerät gespeichert und nicht an uns übertragen. Im geprüften Quellcode werden keine Cookies gesetzt. Bitte prüfen Sie, ob diese Speicherung im konkreten Einsatz unbedingt erforderlich im Sinne des § 25 Abs. 2 Nr. 2 TDDDG ist; andernfalls darf sie erst nach vorheriger Einwilligung erfolgen. Eine solche Einwilligungsabfrage ist derzeit nicht implementiert.</p>
    <h2>5. Google Fonts</h2><p>Die Website bindet die Schriftarten Archivo und IBM Plex Mono über Google Fonts ein. Beim Laden der Schriftdateien wird eine Verbindung zu Google-Servern hergestellt; dabei wird insbesondere Ihre IP-Adresse technisch übermittelt. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Eine mögliche Übermittlung in Drittländer und deren Rechtsgrundlage ist anhand der tatsächlichen Auslieferung und der aktuellen Google-Bedingungen zu prüfen. Rechtsgrundlage und Erforderlichkeit dieser externen Einbindung sind vor Veröffentlichung zu bewerten; falls keine tragfähige Rechtsgrundlage vorliegt, sollten die Schriftdateien lokal gehostet werden.</p>
    <h2>6. Externe Bilder und Verlinkungen</h2><p>Einige Bilddateien werden von Unsplash-Servern geladen. Beim Abruf kann eine Verbindung zum jeweiligen Anbieter hergestellt werden, wobei insbesondere Ihre IP-Adresse übermittelt werden kann. Die Bildanbieter, Abrufverhalten und gegebenenfalls eingesetzte CDN-Dienste sind zu prüfen und hier konkret zu benennen. Die Website enthält außerdem externe Links, etwa zu Google Mail. Beim Anklicken eines externen Links verlassen Sie unsere Website; ab diesem Zeitpunkt verarbeitet der jeweilige Anbieter Daten in eigener Verantwortung. Es ist kein eingebettetes Video oder sonstiger iframe-Inhalt im aktuellen Quellcode festgestellt worden.</p>
    <h2>7. Cookies, Analyse und Einwilligung</h2><p>Im geprüften Quellcode wurden keine Analyse- oder Werbetracking-Skripte und keine Verwendung der Cookie-API festgestellt. Es gibt eine funktionale localStorage-Speicherung der Spracheinstellung (siehe Abschnitt 4), Google Fonts und externe Bildabrufe (siehe Abschnitte 5 und 6). Ob bei Hosting, eingebundenen Drittanbietern oder künftig ergänzten Diensten weitere Cookies oder Zugriffe auf Endgeräte erfolgen, muss in der ausgelieferten Website und beim Hostinganbieter geprüft werden. Für nicht unbedingt erforderliche Zugriffe auf Endeinrichtungen kann eine vorherige Einwilligung nach § 25 TDDDG erforderlich sein; falls solche Dienste eingesetzt werden, sind sie bis zur Einwilligung zu blockieren und über eine geeignete Einwilligungslösung zu verwalten.</p>
    <h2>8. Speicherdauer</h2><p>Anfrage- und Kontaktdaten werden nur so lange gespeichert, wie dies zur Bearbeitung der Anfrage erforderlich ist. Soweit gesetzliche Aufbewahrungspflichten greifen oder Daten zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigt werden, kann die Speicherung darüber hinaus erfolgen. Konkrete Fristen für E-Mail-Postfächer, Backups und Server-Protokolle: [mit den tatsächlichen Abläufen abstimmen und Fristen ergänzen].</p>
    <h2>9. Ihre Rechte</h2><p>Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen eine Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO (Art. 21). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3). Außerdem können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren (Art. 77 DSGVO). Zuständige Aufsichtsbehörde: [für den Sitz des Verantwortlichen zuständige Landesdatenschutzbehörde ergänzen].</p>
    <h2>10. Pflicht zur Bereitstellung</h2><p>Der Besuch der Website erfordert keine Angaben von Ihnen. Wenn Sie uns über ein Formular kontaktieren möchten, sind die als erforderlich gekennzeichneten Angaben nötig, um die Anfrage zu bearbeiten. Ohne diese Angaben kann die Anfrage gegebenenfalls nicht beantwortet werden.</p>
    <h2>11. Aktualisierung</h2><p>Stand: [Datum der rechtlichen und technischen Prüfung eintragen]. Wir aktualisieren diese Erklärung, wenn sich die Website oder die zugrunde liegenden Datenverarbeitungen ändern.</p>
  </>;
}
