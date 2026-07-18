import { siteConfig } from "@/src/config/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function Contact() {
  const { contact } = siteConfig;
  const email = contact.email.href ? contact.email.value : null;

  return (
    <section id="contacto" className="section contact" aria-labelledby="contact-title">
      <div className="section-shell contact__shell">
        <Reveal className="contact__intro">
          <p className="eyebrow eyebrow--dark"><span /> {contact.eyebrow}</p>
          <h2 id="contact-title">{contact.title}</h2>
          <p>{contact.description}</p>
        </Reveal>
        <Reveal delay={80} className="contact__actions">
          {contact.whatsapp.href ? (
            <a className="contact__channel" href={contact.whatsapp.href}><span>WhatsApp</span><strong>{contact.whatsapp.label}</strong><span aria-hidden="true">↗</span></a>
          ) : (
            <span className="contact__channel contact__channel--disabled" aria-disabled="true"><span>WhatsApp</span><strong>Por configurar</strong><span aria-hidden="true">—</span></span>
          )}
          {contact.email.href ? (
            <a className="contact__channel" href={contact.email.href}><span>Correo</span><strong>{contact.email.label}</strong><span aria-hidden="true">↗</span></a>
          ) : (
            <span className="contact__channel contact__channel--disabled" aria-disabled="true"><span>Correo</span><strong>Por configurar</strong><span aria-hidden="true">—</span></span>
          )}
        </Reveal>
        <Reveal delay={120} className="contact__form-wrap">
          <ContactForm email={email} />
          {contact.isProvisional && <p className="contact__provisional">Datos de contacto provisionales — reemplazalos en la configuración del sitio.</p>}
        </Reveal>
      </div>
    </section>
  );
}
