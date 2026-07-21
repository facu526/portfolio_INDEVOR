export type ProjectStatus = "Demo conceptual";

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
    slug: "aurea-eventos",
    name: "Áurea Eventos",
    shortDescription:
      "Sitio web diseñado para presentar los espacios, propuestas y servicios de un salón de eventos de forma elegante, clara y adaptable a dispositivos móviles.",
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
