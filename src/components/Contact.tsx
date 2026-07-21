import type { ReactNode } from "react";

import { siteConfig } from "@/src/config/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.4 3.6A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.8c0 2.1.6 4.2 1.6 6L0 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3ZM12 21.7c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.7 9.7 0 1 1 8.6 4.7Zm5.3-7.3c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.5.2-.8.1a7.9 7.9 0 0 1-2.3-1.4 8.6 8.6 0 0 1-1.6-2c-.2-.3 0-.6.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.1.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.8 5.3h16.4c1 0 1.8.8 1.8 1.8v9.8c0 1-.8 1.8-1.8 1.8H3.8c-1 0-1.8-.8-1.8-1.8V7.1c0-1 .8-1.8 1.8-1.8Z" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className="contact__instagram-dot" cx="17.4" cy="6.7" r="0.8" />
    </svg>
  );
}

type ContactChannelProps = Readonly<{
  label: string;
  value: string;
  href: string;
  enabled: boolean;
  external?: boolean;
  icon: ReactNode;
  variant?: string;
}>;

function ContactChannel({
  label,
  value,
  href,
  enabled,
  external = false,
  icon,
  variant = "",
}: ContactChannelProps) {
  const className = [
    "contact__channel",
    variant,
    enabled ? "" : "contact__channel--disabled",
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className="contact__channel-icon">{icon}</span>
      <span className="contact__channel-copy">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
      <span className="contact__channel-arrow" aria-hidden="true">
        {enabled ? "↗" : null}
      </span>
    </>
  );

  if (!enabled) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {content}
    </a>
  );
}

export function Contact() {
  const { contact } = siteConfig;
  const email = contact.email.enabled ? contact.email.value : null;

  return (
    <section
      id="contacto"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div className="section-shell contact__shell">
        <Reveal className="contact__info">
          <p className="eyebrow contact__eyebrow">
            <span /> {contact.eyebrow}
          </p>
          <h2 id="contact-title">{contact.title}</h2>
          <p className="contact__description">{contact.description}</p>

          <div className="contact__channels" aria-label="Medios de contacto">
            <ContactChannel
              label="WhatsApp"
              value={contact.whatsapp.label}
              href={contact.whatsapp.href}
              enabled={contact.whatsapp.enabled}
              external
              icon={<WhatsAppIcon />}
              variant="contact__channel--whatsapp"
            />
            <ContactChannel
              label="Correo"
              value={contact.email.label}
              href={contact.email.href}
              enabled={contact.email.enabled}
              icon={<MailIcon />}
            />
            <ContactChannel
              label="Instagram"
              value={contact.instagram.label}
              href={contact.instagram.href}
              enabled={contact.instagram.enabled}
              external
              icon={<InstagramIcon />}
            />
          </div>
        </Reveal>

        <Reveal delay={90} className="contact__form-wrap">
          <div className="contact__form-card">
            <div className="contact__form-heading">
              <span aria-hidden="true">01</span>
              <h3>Contanos sobre tu proyecto</h3>
            </div>
            <ContactForm email={email} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
