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

const memberDescription = "Estudiante de Ingeniería Informática.";

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
    name: "Telita",
    description: memberDescription,
    portrait: {
      kind: "image",
      src: "/team/telita.jpg",
      alt: "Telita, integrante de INDEVOR",
      width: 748,
      height: 1600,
      position: "center 30%",
    },
  },
  {
    id: "integrante-03",
    name: "Cui cui",
    description: memberDescription,
    portrait: {
      kind: "image",
      src: "/team/cui-cui.jpg",
      alt: "Cui cui, integrante de INDEVOR",
      width: 880,
      height: 1184,
    },
  },
  {
    id: "integrante-04",
    name: "Cejitas premium",
    description: memberDescription,
    portrait: {
      kind: "image",
      src: "/team/cejitas-premium.jpg",
      alt: "Cejitas premium, integrante de INDEVOR",
      width: 676,
      height: 899,
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
