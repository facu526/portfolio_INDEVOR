export type Testimonial = Readonly<{
  id: string;
  name: string;
  role: string;
  project: string;
  comment: string;
  rating: number;
  initial: string;
  enabled: boolean;
  order: number;
}>;

/**
 * Reemplazar estos registros por testimonios reales y completar todos sus
 * campos. Las tarjetas aparecerán automáticamente cuando al menos un registro
 * tenga `enabled: true`; el encabezado de la sección permanece visible.
 */
export const testimonials: readonly Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Candela Ramirez",
    role: "Cliente",
    project: "Sitio web institucional",
    comment:
      "Entendieron muy rápido lo que necesitábamos y fueron claros durante todo el proceso. La página quedó moderna, ordenada y funciona muy bien tanto en computadora como en celular.",
    rating: 5,
    initial: "CR",
    enabled: true,
    order: 1,
  },
  {
    id: "testimonial-2",
    name: "Juan Tarca",
    role: "Colaborador/a",
    project: "Desarrollo de plataforma web",
    comment:
      "Trabajar con el equipo fue muy cómodo. Siempre estuvieron abiertos a escuchar ideas, proponer mejoras y ajustar los detalles hasta que el resultado quedara como esperábamos.",
    rating: 5,
    initial: "JT",
    enabled: true,
    order: 2,
  },
  {
    id: "testimonial-3",
    name: "Manuel Fernandez",
    role: "Emprendedor/a",
    project: "Portfolio profesional",
    comment:
      "Lograron transformar una idea bastante general en una web clara y con mucha personalidad. Además, explicaron cada decisión de una manera simple y estuvieron presentes ante cada consulta.",
    rating: 5,
    initial: "MF",
    enabled: true,
    order: 3,
  },
  {
    id: "testimonial-4",
    name: "Roman Duarte",
    role: "Usuario/a de prueba",
    project: "Sistema de gestión",
    comment:
      "La plataforma resulta fácil de entender y usar desde el primer momento. Se nota el cuidado puesto en la organización, el diseño y los pequeños detalles de la experiencia.",
    rating: 5,
    initial: "RD",
    enabled: true,
    order: 4,
  },
];

export const enabledTestimonials = testimonials
  .filter((testimonial) => testimonial.enabled)
  .sort((first, second) => first.order - second.order);
