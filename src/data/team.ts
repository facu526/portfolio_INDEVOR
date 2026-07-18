export type TeamMemberImage = Readonly<{
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
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

const placeholderDescription =
  "Estudiante de Ingeniería Informática. Información del perfil por completar.";

export const teamMembers: readonly TeamMember[] = [
  {
    id: "integrante-01",
    name: "Integrante 01",
    description: placeholderDescription,
    portrait: {
      kind: "placeholder",
      label: "01",
      alt: "Foto pendiente del integrante 01 de INDEVOR",
    },
  },
  {
    id: "integrante-02",
    name: "Integrante 02",
    description: placeholderDescription,
    portrait: {
      kind: "placeholder",
      label: "02",
      alt: "Foto pendiente del integrante 02 de INDEVOR",
    },
  },
  {
    id: "integrante-03",
    name: "Integrante 03",
    description: placeholderDescription,
    portrait: {
      kind: "placeholder",
      label: "03",
      alt: "Foto pendiente del integrante 03 de INDEVOR",
    },
  },
  {
    id: "integrante-04",
    name: "Integrante 04",
    description: placeholderDescription,
    portrait: {
      kind: "placeholder",
      label: "04",
      alt: "Foto pendiente del integrante 04 de INDEVOR",
    },
  },
  {
    id: "integrante-05",
    name: "Integrante 05",
    description: placeholderDescription,
    portrait: {
      kind: "placeholder",
      label: "05",
      alt: "Foto pendiente del integrante 05 de INDEVOR",
    },
  },
];
