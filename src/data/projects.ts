export type ProjectSlug = "nexo" | "atlas" | "umbral";

export type ProjectStatus = "Demo" | "Proyecto interno";

export type ProjectArtworkComposition =
  | "connected-nodes"
  | "command-center"
  | "modular-flow"
  | "editorial-grid"
  | "map-layers"
  | "story-cards"
  | "product-stage"
  | "catalog-grid"
  | "checkout-flow";

/**
 * Color values intentionally remain plain CSS strings so artwork can be
 * rendered with gradients and shapes without depending on external images.
 */
export type ProjectArtworkTheme = Readonly<{
  background: string;
  surface: string;
  foreground: string;
  accent: string;
  accentAlt: string;
  line: string;
  glow: string;
}>;

export const projectArtworkThemes = {
  nexo: {
    background:
      "radial-gradient(circle at 28% 22%, rgba(77, 76, 255, 0.42), transparent 42%), linear-gradient(145deg, #080815 0%, #11102a 52%, #05050b 100%)",
    surface: "rgba(19, 19, 42, 0.88)",
    foreground: "#f7f7ff",
    accent: "#5b5cff",
    accentAlt: "#a34cff",
    line: "rgba(205, 205, 255, 0.2)",
    glow: "rgba(91, 92, 255, 0.48)",
  },
  atlas: {
    background:
      "radial-gradient(circle at 72% 18%, rgba(45, 112, 255, 0.34), transparent 38%), linear-gradient(150deg, #070a12 0%, #0b1728 58%, #06070b 100%)",
    surface: "rgba(10, 25, 44, 0.9)",
    foreground: "#f4f8ff",
    accent: "#3478ff",
    accentAlt: "#7e5cff",
    line: "rgba(165, 205, 255, 0.2)",
    glow: "rgba(52, 120, 255, 0.45)",
  },
  umbral: {
    background:
      "radial-gradient(circle at 52% 28%, rgba(141, 70, 255, 0.38), transparent 40%), linear-gradient(155deg, #0b0712 0%, #1b0c2c 54%, #06050a 100%)",
    surface: "rgba(31, 14, 47, 0.9)",
    foreground: "#fff7ff",
    accent: "#934dff",
    accentAlt: "#3d63ff",
    line: "rgba(229, 193, 255, 0.2)",
    glow: "rgba(147, 77, 255, 0.48)",
  },
} as const satisfies Record<ProjectSlug, ProjectArtworkTheme>;

export type ProjectImageVisual = Readonly<{
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
}>;

export type ProjectCssArtworkVisual = Readonly<{
  kind: "css-artwork";
  alt: string;
  composition: ProjectArtworkComposition;
  theme: ProjectSlug;
}>;

export type ProjectVisual = ProjectImageVisual | ProjectCssArtworkVisual;

export type ProjectGalleryItem = ProjectVisual &
  Readonly<{
    id: string;
    caption?: string;
  }>;

export type Project = Readonly<{
  slug: ProjectSlug;
  status: ProjectStatus;
  name: string;
  description: string;
  category: string;
  year: number;
  technologies: readonly string[];
  featured: boolean;
  cover: ProjectVisual;
  overview: string;
  objective: string;
  solution: string;
  features: readonly string[];
  gallery: readonly ProjectGalleryItem[];
  websiteUrl?: string;
  repositoryUrl?: string;
}>;

export const projects: readonly Project[] = [
  {
    slug: "nexo",
    status: "Demo",
    name: "Nexo",
    description:
      "Un espacio de coordinación claro para proyectos y equipos pequeños.",
    category: "Sistema web",
    year: 2026,
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    featured: true,
    cover: {
      kind: "css-artwork",
      alt: "Composición abstracta de nodos conectados para el proyecto demo Nexo",
      composition: "connected-nodes",
      theme: "nexo",
    },
    overview:
      "Nexo es un proyecto conceptual que explora cómo reunir tareas, conversaciones y decisiones en una interfaz única y fácil de recorrer.",
    objective:
      "Diseñar una experiencia que reduzca la dispersión de información y permita entender el estado de un proyecto de un vistazo.",
    solution:
      "Propusimos un sistema modular con navegación predecible, paneles de contexto y una jerarquía visual enfocada en las próximas acciones.",
    features: [
      "Panel general de actividad",
      "Organización de tareas por estado",
      "Espacios de conversación contextual",
      "Búsqueda y filtros de proyecto",
    ],
    gallery: [
      {
        id: "nexo-command-center",
        kind: "css-artwork",
        alt: "Vista conceptual del panel general de Nexo",
        caption: "Panel general y prioridades del equipo.",
        composition: "command-center",
        theme: "nexo",
      },
      {
        id: "nexo-modular-flow",
        kind: "css-artwork",
        alt: "Flujo modular conceptual del proyecto Nexo",
        caption: "Módulos que conservan el contexto del proyecto.",
        composition: "modular-flow",
        theme: "nexo",
      },
    ],
  },
  {
    slug: "atlas",
    status: "Demo",
    name: "Atlas",
    description:
      "Una experiencia editorial para descubrir lugares mediante historias y recorridos.",
    category: "Sitio editorial",
    year: 2026,
    technologies: ["Next.js", "TypeScript", "Mapbox"],
    featured: true,
    cover: {
      kind: "css-artwork",
      alt: "Composición editorial abstracta para el proyecto demo Atlas",
      composition: "editorial-grid",
      theme: "atlas",
    },
    overview:
      "Atlas es una demo editorial que combina exploración visual, relatos breves y mapas para presentar destinos sin perder claridad ni ritmo de lectura.",
    objective:
      "Encontrar un equilibrio entre inspiración y utilidad para que cada recorrido sea atractivo, legible y fácil de consultar.",
    solution:
      "Construimos un lenguaje de bloques editoriales, capas de mapa y fichas breves que permite alternar entre la historia y la información práctica.",
    features: [
      "Exploración por recorridos",
      "Mapas con puntos de interés",
      "Historias visuales modulares",
      "Guardado local de lugares",
    ],
    gallery: [
      {
        id: "atlas-map-layers",
        kind: "css-artwork",
        alt: "Capas de mapa conceptuales del proyecto Atlas",
        caption: "Mapa y puntos de interés organizados por capas.",
        composition: "map-layers",
        theme: "atlas",
      },
      {
        id: "atlas-story-cards",
        kind: "css-artwork",
        alt: "Tarjetas editoriales conceptuales del proyecto Atlas",
        caption: "Sistema flexible para relatos y recomendaciones.",
        composition: "story-cards",
        theme: "atlas",
      },
    ],
  },
  {
    slug: "umbral",
    status: "Demo",
    name: "Umbral",
    description:
      "Un catálogo digital sobrio que pone el producto y sus detalles en primer plano.",
    category: "E-commerce",
    year: 2026,
    technologies: ["Next.js", "TypeScript", "Stripe"],
    featured: true,
    cover: {
      kind: "css-artwork",
      alt: "Escenario abstracto de producto para el proyecto demo Umbral",
      composition: "product-stage",
      theme: "umbral",
    },
    overview:
      "Umbral es un concepto de tienda digital pensado para colecciones acotadas, con una presentación cuidada y un recorrido de compra directo.",
    objective:
      "Dar protagonismo al producto y simplificar la decisión de compra sin sumar estímulos, pasos ni mensajes innecesarios.",
    solution:
      "Diseñamos una grilla adaptable, fichas de producto precisas y un flujo de compra compacto con feedback visible en cada paso.",
    features: [
      "Catálogo con filtros esenciales",
      "Fichas de producto detalladas",
      "Carrito persistente",
      "Flujo de compra simplificado",
    ],
    gallery: [
      {
        id: "umbral-catalog-grid",
        kind: "css-artwork",
        alt: "Grilla de catálogo conceptual del proyecto Umbral",
        caption: "Catálogo flexible con jerarquía visual consistente.",
        composition: "catalog-grid",
        theme: "umbral",
      },
      {
        id: "umbral-checkout-flow",
        kind: "css-artwork",
        alt: "Flujo de compra conceptual del proyecto Umbral",
        caption: "Compra resumida en pocos pasos claramente señalados.",
        composition: "checkout-flow",
        theme: "umbral",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
