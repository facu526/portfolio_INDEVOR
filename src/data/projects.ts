export type ProjectStatus = "Proyecto publicado" | "Demo conceptual";

export type Project = Readonly<{
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  year: number;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  tags: readonly string[];
  liveUrl: string;
  status: ProjectStatus;
  featured: boolean;
}>;

export const projects: readonly Project[] = [
  {
    slug: "felsani-motors",
    name: "Felsani Motors",
    shortDescription:
      "Una plataforma para publicar, buscar y gestionar vehículos en venta desde una experiencia clara y responsive.",
    category: "Plataforma de compraventa de vehículos",
    year: 2026,
    image: "/projects/felsani-motors/cover-yaris.png",
    imageAlt:
      "Publicación destacada de un Toyota Yaris disponible en Felsani Motors",
    imageWidth: 1825,
    imageHeight: 862,
    tags: ["Diseño UX/UI", "Frontend", "Backend", "Responsive"],
    liveUrl: "https://felsani-motors-frontend.vercel.app/",
    status: "Proyecto publicado",
    featured: true,
  },
  {
    slug: "aurea-eventos",
    name: "Áurea Eventos",
    shortDescription:
      "Una web simple para mostrar el salón, sus espacios y las opciones de reserva.",
    category: "Sitio web para salón de eventos",
    year: 2026,
    image: "/projects/aurea-eventos/cover.webp",
    imageAlt:
      "Página de inicio de Áurea Eventos con la presentación del salón y una fotografía panorámica del espacio al atardecer",
    imageWidth: 1600,
    imageHeight: 1000,
    tags: ["Diseño web", "Desarrollo", "Responsive"],
    liveUrl: "https://aurea-eventos-muestra.vercel.app/",
    status: "Demo conceptual",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
