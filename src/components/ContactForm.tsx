"use client";

import { useState, type FormEvent } from "react";

type ContactFormProps = { email: string | null };
type Errors = Partial<Record<"name" | "contact" | "message", string>>;

export function ContactForm({ email }: ContactFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const contact = String(form.get("contact") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Ingresá tu nombre.";
    if (!contact) nextErrors.contact = "Ingresá un correo o teléfono.";
    if (!message) nextErrors.message = "Contanos brevemente tu idea.";
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus("Revisá los campos marcados.");
      return;
    }
    if (!email) {
      setStatus("El correo de INDEVOR todavía está pendiente de configurar.");
      return;
    }

    const subject = encodeURIComponent(`Nueva consulta web de ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nContacto: ${contact}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus("Se abrió tu aplicación de correo para completar el envío.");
  };

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form__field">
        <label htmlFor="contact-name">Nombre</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
        {errors.name && <span id="contact-name-error">{errors.name}</span>}
      </div>
      <div className="contact-form__field">
        <label htmlFor="contact-channel">Email o teléfono</label>
        <input id="contact-channel" name="contact" type="text" autoComplete="email" aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-channel-error" : undefined} />
        {errors.contact && <span id="contact-channel-error">{errors.contact}</span>}
      </div>
      <div className="contact-form__field contact-form__field--message">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea id="contact-message" name="message" rows={4} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errors.message && <span id="contact-message-error">{errors.message}</span>}
      </div>
      <div className="contact-form__footer">
        <button className="button button--light" type="submit">Preparar mensaje <span aria-hidden="true">↗</span></button>
        <p aria-live="polite">{status || "Se abrirá tu aplicación de correo para completar el envío."}</p>
      </div>
    </form>
  );
}
