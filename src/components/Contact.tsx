import type { ReactNode } from "react";

import { siteConfig } from "@/src/config/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { LinkArrow } from "./LinkArrow";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.8 5.3h16.4c1 0 1.8.8 1.8 1.8v9.8c0 1-.8 1.8-1.8 1.8H3.8c-1 0-1.8-.8-1.8-1.8V7.1c0-1 .8-1.8 1.8-1.8Z" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.1 3.5 9.4 7c.3.5.2 1.1-.2 1.5l-1.3 1.3a14.5 14.5 0 0 0 6.3 6.3l1.3-1.3c.4-.4 1-.5 1.5-.2l3.5 2.3c.5.3.7.9.5 1.5l-.7 2.1c-.2.6-.8 1-1.4 1C9.8 21.5 2.5 14.2 2.5 5.1c0-.6.4-1.2 1-1.4L5.6 3c.6-.2 1.2 0 1.5.5Z" />
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
        {enabled ? <LinkArrow /> : null}
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
          <h2 id="contact-title">
            ¿Construimos algo <span className="title-accent">juntos?<span className="title-caret" aria-hidden="true">|</span></span>
          </h2>
          <p className="contact__description">{contact.description}</p>

          <div className="contact__channels" aria-label="Medios de contacto">
            <ContactChannel
              label="Teléfono"
              value={contact.whatsapp.label}
              href={contact.whatsapp.href}
              enabled={false}
              icon={<PhoneIcon />}
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
              <h3>Contanos sobre tu proyecto</h3>
            </div>
            <ContactForm email={email} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
