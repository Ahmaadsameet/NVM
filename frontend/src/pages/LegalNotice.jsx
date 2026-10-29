import React from "react";

// Client-supplied text, preserved verbatim.
export default function LegalNotice({ language }) {
  return language === "en" ? <>
    <h1>{"Legal Notice"}</h1>
    <p>{"Information pursuant to Section 5 of the German Digital Services Act (DDG)"}</p>
    <p><strong>{"North Weave Mills UG (haftungsbeschränkt)"}</strong><br />{"Ottostraße 20-22"}<br />{"63150 Heusenstamm"}<br />{"Germany"}</p>
    <p><strong>{"Represented by the managing director"}</strong><br />{"Samoon Butt"}</p>
    <p><strong>{"Contact"}</strong><br />{"Phone: +49 176 317 84594"}<br />{"Email: info@northweavemills.com"}<br />{"Contact form: www.northweavemills.com/#book"}</p>
    <p><strong>{"Commercial register"}</strong><br />{"Commercial Register of the Local Court (Amtsgericht) of Offenbach am Main, HRB 59247"}</p>
    <p><strong>{"VAT identification number"}</strong>{" pursuant to Section 27a of the German VAT Act"}<br />{"DE465680261"}</p>
    <p><strong>{"Dispute resolution"}</strong><br />{"Our services are intended exclusively for businesses. We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board."}</p>
    <p><em>{"UG (haftungsbeschränkt) is a German limited liability company (entrepreneurial company with limited liability)."}</em></p>
  </> : <>
    <h1>{"Impressum"}</h1>
    <p>{"Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)"}</p>
    <p><strong>{"North Weave Mills UG (haftungsbeschränkt)"}</strong><br />{"Ottostraße 20-22"}<br />{"63150 Heusenstamm"}<br />{"Deutschland"}</p>
    <p><strong>{"Vertreten durch den Geschäftsführer"}</strong><br />{"Samoon Butt"}</p>
    <p><strong>{"Kontakt"}</strong><br />{"Telefon: +49 176 317 84594"}<br />{"E-Mail: info@northweavemills.com"}<br />{"Kontaktformular: www.northweavemills.com/#book"}</p>
    <p><strong>{"Registereintrag"}</strong><br />{"Handelsregister des Amtsgerichts Offenbach am Main, HRB 59247"}</p>
    <p><strong>{"Umsatzsteuer-Identifikationsnummer"}</strong>{" gemäß § 27a Umsatzsteuergesetz"}<br />{"DE465680261"}</p>
    <p><strong>{"Hinweis zur Streitbeilegung"}</strong><br />{"Unser Angebot richtet sich ausschließlich an Unternehmer. Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."}</p>
  </>;
}
