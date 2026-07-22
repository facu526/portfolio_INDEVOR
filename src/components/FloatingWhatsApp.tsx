import { siteConfig } from "@/src/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingWhatsApp() {
  const { whatsapp } = siteConfig.contact;
  if (!whatsapp.enabled) return null;

  return (
    <a
      className="floating-whatsapp"
      href={whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Escribir por WhatsApp al ${whatsapp.label}`}
    >
      <WhatsAppIcon />
    </a>
  );
}
