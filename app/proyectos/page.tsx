import type { Metadata } from "next";
import Link from "next/link";

import { ProjectCard } from "@/src/components/ProjectCard";
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
          <p className="projects-page__eyebrow">Portfolio</p>
          <h1 className="projects-page__title">Proyectos</h1>
          <p className="projects-page__intro">
            Una selección de proyectos donde combinamos estrategia, diseño y
            desarrollo para construir experiencias digitales claras.
          </p>
          <p className="projects-page__disclaimer">
            Los trabajos conceptuales están identificados claramente como
            <strong> Demo conceptual</strong>. No se presentan como clientes ni
            incluyen resultados no verificados.
          </p>
        </div>
      </header>

      <section
        className="projects-page__listing"
        aria-labelledby="projects-page-heading"
      >
        <div className="projects-page__section-heading">
          <p className="projects-page__section-index" aria-hidden="true">
            {String(projects.length).padStart(2, "0")} — {String(projects.length).padStart(2, "0")}
          </p>
          <h2 id="projects-page-heading">Proyectos seleccionados</h2>
        </div>

        <ul className="projects-page__grid" data-project-count={projects.length}>
          {projects.map((project, index) => (
            <li className="projects-page__item" key={project.slug}>
              <ProjectCard
                project={project}
                headingLevel="h3"
                priority={index < 2}
                index={index + 1}
                total={projects.length}
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
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
