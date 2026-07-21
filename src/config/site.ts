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
    eyebrow: string;
    title: string;
    description: string;
    linkLabel: string;
  }>;
  about: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
  }>;
  capabilities: Readonly<{
    eyebrow: string;
    title: string;
    items: readonly string[];
  }>;
  team: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
  }>;
  contact: Readonly<{
    eyebrow: string;
    title: string;
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
 * IMPORTANT: the contact channels below are deliberate placeholders. Replace
 * their value, label and href, then set enabled to true before publishing.
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
    { label: "Proyectos", href: "/proyectos" },
    { label: "Equipo", href: "/#equipo" },
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
    eyebrow: "Portfolio",
    title: "Proyectos seleccionados",
    description:
      "Una selección de experiencias digitales donde combinamos diseño y desarrollo. Los trabajos conceptuales están identificados claramente.",
    linkLabel: "Ver todos los proyectos",
  },
  about: {
    eyebrow: "Sobre INDEVOR",
    title: "Cinco personas, un mismo equipo.",
    description:
      "INDEVOR es un equipo de cinco estudiantes de Ingeniería Informática que combina diseño, desarrollo y tecnología para transformar ideas en experiencias digitales funcionales.",
  },
  capabilities: {
    eyebrow: "Capacidades",
    title: "Qué podemos construir",
    items: [
      "Sitios web",
      "Landing pages",
      "Sistemas web",
      "Tiendas y catálogos",
      "Diseño UX/UI",
      "Mantenimiento y evolución",
    ],
  },
  team: {
    eyebrow: "Equipo",
    title: "Cinco personas, un trabajo compartido.",
    description:
      "Somos estudiantes de Ingeniería Informática y trabajamos de forma colaborativa.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Construimos algo juntos?",
    description: "Contanos tu idea y veamos cómo podemos llevarla a la web.",
    isProvisional: true,
    replacementNote:
      "TODO antes de publicar: reemplazar WhatsApp, correo e Instagram por los datos oficiales de INDEVOR.",
    // TODO: Reemplazar por el correo definitivo de INDEVOR
    email: {
      value: "hola@indevor.com",
      label: "hola@indevor.com",
      href: "mailto:hola@indevor.com",
      enabled: false,
      isProvisional: true,
    },
    // TODO: Reemplazar por el WhatsApp definitivo de INDEVOR
    whatsapp: {
      value: "+5491100000000",
      label: "+54 9 11 0000-0000",
      href: "https://wa.me/5491100000000",
      enabled: false,
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
