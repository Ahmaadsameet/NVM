import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n";
import { FORM_ACTION } from "../data/contact";

// These byte limits match contact.php. Check UTF-8 length as well as native maxLength.
const limits = { name: 200, brand_name: 200, email: 254, instagram: 200, product_type: 1000, total_pieces: 10, colours: 1000, pieces_per_style: 2000, message: 10000 };
const messages = {
  en: { failed: "We couldn't confirm that your enquiry was sent. Your details are still here. Please try again or email us directly.", long: "This field is too long. Please shorten it.", sending: "Sending…" },
  de: { failed: "Der Versand Ihrer Anfrage konnte nicht bestätigt werden. Ihre Angaben bleiben erhalten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.", long: "Diese Angabe ist zu lang. Bitte kürzen Sie den Text.", sending: "Wird gesendet…" },
};

export default function ContactForm({ children, submitLabel, onBusyChange, ...props }) {
  const { language } = useLanguage();
  const t = messages[language] || messages.en;
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const inFlight = React.useRef(false);

  function validateLength(input) {
    input.setCustomValidity("");
    if (limits[input.name] && new TextEncoder().encode(input.value).length > limits[input.name]) input.setCustomValidity(t.long);
  }

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    for (const input of form.querySelectorAll("input, textarea")) validateLength(input);
    if (!form.reportValidity()) return;
    inFlight.current = true;
    setPending(true);
    onBusyChange?.(true);
    setError("");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(FORM_ACTION, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" }, signal: controller.signal });
      const result = await response.json();
      if (typeof result.message !== "string") throw new Error("Unexpected response");
      if (response.ok) {
        setSuccess(result.message);
      } else {
        setError(result.message);
        const input = typeof result.field === "string" ? form.elements.namedItem(result.field) : null;
        if (input && typeof input.setCustomValidity === "function") {
          input.setCustomValidity(result.message);
          input.reportValidity();
        }
      }
    } catch {
      setError(t.failed);
    } finally {
      clearTimeout(timer);
      inFlight.current = false;
      setPending(false);
      onBusyChange?.(false);
    }
  }

  if (success) return <div className="success" role="status">{success}</div>;
  return <form {...props} action={FORM_ACTION} method="POST" onSubmit={submit} aria-busy={pending} onInput={event => { if (typeof event.target.setCustomValidity === "function") validateLength(event.target); }}>
    {children}
    <button className="solid-button" type="submit" disabled={pending}>{pending ? t.sending : submitLabel}<ArrowUpRight size={16} aria-hidden="true" /></button>
    {error && <p className="form-error" role="alert">{error}</p>}
  </form>;
}
