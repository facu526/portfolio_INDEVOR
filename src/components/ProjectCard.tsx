import Link from "next/link";

import { ProjectArtwork } from "@/src/components/ProjectArtwork";
import type { Project } from "@/src/data/projects";

type ProjectCardProps = Readonly<{
  project: Project;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  index?: number;
}>;

export function ProjectCard({
  project,
  headingLevel = "h3",
  priority = false,
  index,
}: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <article className="project-card">
      <Link
        className="project-card__link"
        href={`/proyectos/${project.slug}`}
        aria-label={`Ver el caso demo ${project.name}`}
      >
        <ProjectArtwork
          className="project-card__artwork"
          visual={project.cover}
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 42vw"
        />

        <div className="project-card__body">
          <div className="project-card__meta">
            {index ? (
              <span className="project-card__index" aria-hidden="true">
                {String(index).padStart(2, "0")}
              </span>
            ) : null}
            <span className="project-card__status">{project.status}</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={`${project.year}-01-01`}>{project.year}</time>
          </div>

          <div className="project-card__heading">
            <Heading className="project-card__title">{project.name}</Heading>
            <span className="project-card__arrow" aria-hidden="true">
              ↗
            </span>
          </div>

          <p className="project-card__description">{project.description}</p>

          <ul className="project-card__technologies" aria-label="Stack propuesto">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
