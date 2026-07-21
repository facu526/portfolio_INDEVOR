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

  return {
    title: `${project.name} — ${project.status}`,
    description: project.shortDescription,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.name} — Proyecto de INDEVOR`,
      description: project.shortDescription,
      type: "article",
      images: [
        {
          url: project.image,
          width: project.imageWidth,
          height: project.imageHeight,
          alt: project.imageAlt,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

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
                Proyecto web
              </p>
              <h1>{project.name}</h1>
              <p className="case-study__description">
                {project.shortDescription}
              </p>
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
            image={project.image}
            imageAlt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
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
            <h2 id="case-overview-heading">Sobre el proyecto</h2>
            <p>{project.shortDescription}</p>
          </section>

          <section
            className="case-study__technologies"
            aria-labelledby="case-tags-heading"
          >
            <p className="case-study__section-label">Alcance</p>
            <h2 id="case-tags-heading">Áreas de trabajo</h2>
            <ul>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside
          className="case-study__external-links"
          aria-labelledby="case-links-heading"
        >
          <h2 id="case-links-heading">Explorar el proyecto</h2>
          <div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visitar sitio web <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>

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
