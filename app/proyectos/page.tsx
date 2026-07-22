import type { Metadata } from "next";
import Link from "next/link";

import { ProjectCard } from "@/src/components/ProjectCard";
import { LinkArrow } from "@/src/components/LinkArrow";
import { projects } from "@/src/data/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de diseño y desarrollo web creados por el equipo de INDEVOR.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos — INDEVOR",
    description:
      "Una selección de experiencias digitales diseñadas y desarrolladas por INDEVOR.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main id="contenido" className="projects-page">
      <header className="projects-page__hero">
        <div className="projects-page__hero-inner">
          <h1 className="projects-page__title">Proyectos</h1>
          <p className="projects-page__intro">
            Estos son algunos de los sitios que hicimos.
          </p>
          <p className="projects-page__disclaimer">
            Áurea Eventos es una <strong>demo conceptual</strong> y no corresponde
            a un cliente real.
          </p>
        </div>
      </header>

      <section
        className="projects-page__listing"
        aria-labelledby="projects-page-heading"
      >
        <div className="projects-page__section-heading">
          <h2 id="projects-page-heading">Proyectos seleccionados</h2>
        </div>

        <ul className="projects-page__grid" data-project-count={projects.length}>
          {projects.map((project, index) => (
            <li className="projects-page__item" key={project.slug}>
              <ProjectCard
                project={project}
                headingLevel="h3"
                priority={index < 2}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="projects-page__contact" aria-labelledby="projects-contact-heading">
        <p className="projects-page__contact-kicker">¿Tenés una idea?</p>
        <h2 id="projects-contact-heading">Construyamos el próximo proyecto.</h2>
        <Link className="projects-page__contact-link" href="/#contacto">
          Hablemos
          <LinkArrow />
        </Link>
      </section>
    </main>
  );
}
