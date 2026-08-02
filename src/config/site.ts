export type NavigationItem = Readonly<{
  label: string;
  href: string;
}>;

export type CtaLink = Readonly<{
  label: string;
  href: string;
}>;

export type ContactChannel = Readonly<{
  value: string;
  label: string;
  href?: string;
  enabled: boolean;
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
    email: ContactChannel;
    whatsapp: ContactChannel;
    instagram: ContactChannel;
  }>;
  footer: Readonly<{
    note: string;
  }>;
}>;

/** Editable site copy and contact details. */
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
      "Desarrollamos soluciones digitales, creamos sitios web, y automatizaciones que impulsan el crecimiento de tú empresa.",
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
    email: {
      value: "indevoroficial@gmail.com",
      label: "indevoroficial@gmail.com",
      enabled: true,
    },
    whatsapp: {
      value: "5491122563384",
      label: "+54 9 11 2256-3384",
      href: "https://wa.me/5491122563384",
      enabled: true,
    },
    instagram: {
      value: "indevor_oficial",
      label: "indevor_oficial",
      href: "https://www.instagram.com/indevor_oficial/#",
      enabled: true,
    },
  },
  footer: {
    note: "Diseñado y desarrollado por INDEVOR.",
  },
} as const satisfies SiteConfig;
