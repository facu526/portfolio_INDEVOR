import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectArtwork } from "@/src/components/ProjectArtwork";
import { getProjectBySlug, projects } from "@/src/data/projects";

type ProjectPageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.name} — Caso Demo`;

  return {
    title,
    description: project.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.name} — Caso Demo de INDEVOR`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasExternalLinks = Boolean(
    project.websiteUrl || project.repositoryUrl,
  );

  return (
    <main id="contenido" className="case-study">
      <article className="case-study__article">
        <header className="case-study__hero">
          <nav className="case-study__breadcrumb" aria-label="Navegación del proyecto">
            <Link href="/proyectos">Proyectos</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.name}</span>
          </nav>

          <div className="case-study__hero-layout">
            <div className="case-study__heading">
              <p className="case-study__status">
                <span>{project.status}</span>
                Caso conceptual
              </p>
              <h1>{project.name}</h1>
              <p className="case-study__description">{project.description}</p>
            </div>

            <dl className="case-study__metadata">
              <div>
                <dt>Categoría</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>Año</dt>
                <dd>
                  <time dateTime={`${project.year}-01-01`}>{project.year}</time>
                </dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>
          </div>
        </header>

        <figure className="case-study__cover">
          <ProjectArtwork
            visual={project.cover}
            priority
            sizes="100vw"
          />
        </figure>

        <div className="case-study__content">
          <section
            className="case-study__overview"
            aria-labelledby="case-overview-heading"
          >
            <p className="case-study__section-label">Descripción general</p>
            <h2 id="case-overview-heading">Una mirada al proyecto</h2>
            <p>{project.overview}</p>
          </section>

          <div className="case-study__narrative">
            <section aria-labelledby="case-objective-heading">
              <p className="case-study__section-label">El punto de partida</p>
              <h2 id="case-objective-heading">Objetivo</h2>
              <p>{project.objective}</p>
            </section>

            <section aria-labelledby="case-solution-heading">
              <p className="case-study__section-label">La propuesta</p>
              <h2 id="case-solution-heading">Solución</h2>
              <p>{project.solution}</p>
            </section>
          </div>

          <section
            className="case-study__features"
            aria-labelledby="case-features-heading"
          >
            <div className="case-study__section-heading">
              <p className="case-study__section-label">Alcance del Demo</p>
              <h2 id="case-features-heading">Funcionalidades</h2>
            </div>
            <ul>
              {project.features.map((feature, index) => (
                <li key={feature}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section
            className="case-study__technologies"
            aria-labelledby="case-technologies-heading"
          >
            <p className="case-study__section-label">Stack propuesto</p>
            <h2 id="case-technologies-heading">Herramientas exploradas</h2>
            <ul>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>
        </div>

        <section
          className="case-study__gallery"
          aria-labelledby="case-gallery-heading"
        >
          <div className="case-study__gallery-heading">
            <p className="case-study__section-label">Galería conceptual</p>
            <h2 id="case-gallery-heading">Vistas del Demo</h2>
          </div>

          <ul className="case-study__gallery-grid">
            {project.gallery.map((item) => (
              <li key={item.id}>
                <figure className="case-study__gallery-item">
                  <ProjectArtwork visual={item} sizes="(max-width: 767px) 100vw, 50vw" />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </section>

        {hasExternalLinks ? (
          <aside
            className="case-study__external-links"
            aria-labelledby="case-links-heading"
          >
            <h2 id="case-links-heading">Explorar el proyecto</h2>
            <div>
              {project.websiteUrl ? (
                <a href={project.websiteUrl}>Visitar sitio web</a>
              ) : null}
              {project.repositoryUrl ? (
                <a href={project.repositoryUrl}>Ver repositorio</a>
              ) : null}
            </div>
          </aside>
        ) : null}

        <footer className="case-study__footer">
          <Link className="case-study__back-link" href="/proyectos">
            <span aria-hidden="true">←</span>
            Ver todos los proyectos
          </Link>
          <Link className="case-study__contact-link" href="/#contacto">
            ¿Creamos algo juntos?
            <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </article>
    </main>
  );
}
