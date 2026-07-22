export type PackagePlan = Readonly<{
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  currencySymbol: string;
  pricePrefix: string;
  features: readonly string[];
  badge: string | null;
  featured: boolean;
  enabled: boolean;
  whatsappMessage: string;
  contactProjectType: string;
  order: number;
}>;

/**
 * TODO: Revisar precios, prestaciones y mensajes comerciales antes de publicar
 * definitivamente. Los importes actuales son orientativos.
 */
export const packages: readonly PackagePlan[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    description:
      "Una página enfocada en presentar una propuesta concreta y generar consultas.",
    price: 300000,
    currency: "ARS",
    currencySymbol: "$",
    pricePrefix: "Desde",
    features: [
      "Diseño personalizado.",
      "Una página con hasta 5 secciones.",
      "Adaptación a celulares y computadoras.",
      "Botones de contacto y WhatsApp.",
      "Integración con redes sociales.",
      "Formulario de contacto.",
      "Optimización de carga.",
      "Configuración inicial de dominio y hosting.",
      "30 días de soporte posterior a la publicación.",
    ],
    badge: null,
    featured: false,
    enabled: true,
    whatsappMessage:
      "Hola, somos [nombre o empresa]. Vimos el paquete Landing Page en la web de INDEVOR y queremos consultar por un proyecto.",
    contactProjectType: "Landing page",
    order: 1,
  },
  {
    id: "sitio-web",
    name: "Sitio web",
    description:
      "Un sitio completo para presentar el negocio, sus servicios y su propuesta profesional.",
    price: 450000,
    currency: "ARS",
    currencySymbol: "$",
    pricePrefix: "Desde",
    features: [
      "Diseño personalizado.",
      "Hasta 5 páginas internas.",
      "Adaptación a celulares y computadoras.",
      "Animaciones e interacciones sutiles.",
      "Formulario de contacto.",
      "Integración con WhatsApp y redes sociales.",
      "Optimización básica para buscadores.",
      "Optimización de rendimiento.",
      "Configuración inicial de dominio y hosting.",
      "30 días de soporte posterior a la publicación.",
    ],
    badge: "Más elegido",
    featured: true,
    enabled: true,
    whatsappMessage:
      "Hola, somos [nombre o empresa]. Vimos el paquete Sitio Web en la web de INDEVOR y queremos recibir más información.",
    contactProjectType: "Sitio web",
    order: 2,
  },
  {
    id: "catalogo-tienda-online",
    name: "Catálogo o tienda online",
    description:
      "Una solución para mostrar o vender productos de forma organizada y profesional.",
    price: 700000,
    currency: "ARS",
    currencySymbol: "$",
    pricePrefix: "Desde",
    features: [
      "Diseño personalizado.",
      "Catálogo administrable.",
      "Carga inicial de hasta 10 productos.",
      "Categorías y fichas de productos.",
      "Adaptación a celulares y computadoras.",
      "Integración con WhatsApp o proceso de compra.",
      "Optimización básica para buscadores.",
      "Formulario de contacto.",
      "Configuración inicial de dominio y hosting.",
      "30 días de soporte posterior a la publicación.",
    ],
    badge: null,
    featured: false,
    enabled: true,
    whatsappMessage:
      "Hola, somos [nombre o empresa]. Vimos el paquete Catálogo o Tienda Online en la web de INDEVOR y queremos consultar qué solución nos conviene.",
    contactProjectType: "Tienda o catálogo",
    order: 3,
  },
];

export function getEnabledPackages(): readonly PackagePlan[] {
  return packages
    .filter((packagePlan) => packagePlan.enabled)
    .toSorted((first, second) => first.order - second.order);
}
