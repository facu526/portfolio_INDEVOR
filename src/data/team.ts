export type TeamMemberImage = Readonly<{
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
}>;

export type TeamMemberPlaceholder = Readonly<{
  kind: "placeholder";
  label: string;
  alt: string;
}>;

export type TeamMemberPortrait = TeamMemberImage | TeamMemberPlaceholder;

export type TeamMemberLinks = Readonly<{
  linkedIn?: string;
  github?: string;
}>;

export type TeamMember = Readonly<{
  id: string;
  name: string;
  description: string;
  portrait: TeamMemberPortrait;
  links?: TeamMemberLinks;
}>;

const memberDescription = " ";

export const teamMembers: readonly TeamMember[] = [
  {
    id: "integrante-01",
    name: "Facundo Sanchez",
    description: memberDescription,
    portrait: {
      kind: "image",
      src: "/team/facundo-sanchez.jpg",
      alt: "Facundo Sanchez, integrante de INDEVOR",
      width: 707,
      height: 707,
      position: "68% center",
    },
  },
  {
    id: "integrante-02",
    name: "Santiago Peralta",
    description: memberDescription,
    portrait: {
      kind: "image",
      src: "/team/santiago-peralta-2026.jpg",
      alt: "Santiago Peralta, integrante de INDEVOR",
      width: 1086,
      height: 1448,
      position: "center 30%",
    },
  },
  {
    id: "integrante-03",
    name: "Facundo Iriarte",
    description: memberDescription,
    portrait: {
      kind: "image",
      src: "/team/Facundo_Iriarte.jpg",
      alt: "Facundo Iriarte, integrante de INDEVOR",
      width: 880,
      height: 1184,
    },
  },
  {
    id: "integrante-04",
    name: "Facundo Moran",
    description: memberDescription,
    portrait: {
      kind: "image",
      src: "/team/facundo-moran-2026.jpg",
      alt: "Facundo Moran, integrante de INDEVOR",
      width: 400,
      height: 400,
    },
  },
  {
    id: "integrante-05",
    name: "Laureano Gomez Moreno",
    description: memberDescription,
    portrait: {
      kind: "image",
      src: "/team/laureano-gomez-moreno.jpg",
      alt: "Laureano Gomez Moreno, integrante de INDEVOR",
      width: 1086,
      height: 1448,
    },
  },
];
