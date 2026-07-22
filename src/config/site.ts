export type NavigationItem = Readonly<{
  label: string;
  href: string;
}>;

export type CtaLink = Readonly<{
  label: string;
  href: string;
}>;

export type ProvisionalContactChannel = Readonly<{
  value: string;
  label: string;
  href: string;
  enabled: boolean;
  isProvisional: true;
}>;

export type SiteConfig = Readonly<{
  name: string;
  metadata: Readonly<{
    title: string;
    description: string;
    locale: string;
  }>;
  navigation: readonly NavigationItem[];
  hero: Readonly<{
    titleLines: readonly string[];
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  }>;
  portfolio: Readonly<{
    title: string;
    description: string;
    linkLabel: string;
  }>;
  about: Readonly<{
    description: string;
  }>;
  capabilities: Readonly<{
    items: readonly string[];
  }>;
  contact: Readonly<{
    description: string;
    isProvisional: true;
    replacementNote: string;
    email: ProvisionalContactChannel;
    whatsapp: ProvisionalContactChannel;
    instagram: ProvisionalContactChannel;
  }>;
  footer: Readonly<{
    note: string;
  }>;
}>;

/**
 * Editable site copy and contact details.
 *
 * IMPORTANT: email and Instagram below are deliberate placeholders. WhatsApp
 * opens without a recipient until the official number is available.
 */
export const siteConfig = {
  name: "INDEVOR",
  metadata: {
    title: "INDEVOR — Diseño y desarrollo digital",
    description:
      "Portfolio de INDEVOR, un equipo de cinco estudiantes de Ingeniería Informática que diseña y desarrolla experiencias digitales.",
    locale: "es_AR",
  },
  navigation: [
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Reseñas", href: "/#resenas" },
    { label: "Paquetes", href: "/#paquetes" },
    { label: "Contacto", href: "/#contacto" },
  ],
  hero: {
    titleLines: ["Pensamos.", "Diseñamos.", "Desarrollamos."],
    description:
      "Creamos sitios y productos digitales claros, rápidos y preparados para crecer.",
    primaryCta: { label: "Ver proyectos", href: "/#proyectos" },
    secondaryCta: { label: "Hablemos", href: "/#contacto" },
  },
  portfolio: {
    title: "Proyectos destacados",
    description: "Una muestra del trabajo que hacemos en equipo.",
    linkLabel: "Ver todos los proyectos",
  },
  about: {
    description:
      "Somos cinco estudiantes de Ingeniería Informática. Diseñamos y desarrollamos productos digitales juntos.",
  },
  capabilities: {
    items: [
      "Sitios web",
      "Landing pages",
      "Sistemas web",
      "Tiendas y catálogos",
      "Diseño UX/UI",
      "Mantenimiento y evolución",
    ],
  },
  contact: {
    description: "Contanos tu idea y veamos cómo podemos llevarla a la web.",
    isProvisional: true,
    replacementNote:
      "TODO antes de publicar: confirmar el número de WhatsApp y reemplazar correo e Instagram por los datos oficiales de INDEVOR.",
    // TODO: Reemplazar por el correo definitivo de INDEVOR
    email: {
      value: "hola@indevor.com",
      label: "hola@indevor.com",
      href: "mailto:hola@indevor.com",
      enabled: false,
      isProvisional: true,
    },
    // TODO: Confirmar o reemplazar por el número definitivo de INDEVOR
    whatsapp: {
      value: "5491112345678",
      label: "+54 9 11 1234-5678",
      href: "https://wa.me/5491112345678",
      enabled: true,
      isProvisional: true,
    },
    // TODO: Reemplazar por el Instagram definitivo de INDEVOR
    instagram: {
      value: "@indevor.digital",
      label: "@indevor.digital",
      href: "https://www.instagram.com/indevor.digital/",
      enabled: false,
      isProvisional: true,
    },
  },
  footer: {
    note: "Diseñado y desarrollado por INDEVOR.",
  },
} as const satisfies SiteConfig;
