import { ProjectArtwork } from "@/src/components/ProjectArtwork";
import type { Project } from "@/src/data/projects";

type ProjectCardProps = Readonly<{
  project: Project;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  index?: number;
  total?: number;
}>;

export function ProjectCard({
  project,
  headingLevel = "h3",
  priority = false,
  index,
  total = 1,
}: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <article className="project-card">
      <a
        className="project-card__link"
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ver ${project.name}, ${project.status} (abre en una pestaña nueva)`}
      >
        <ProjectArtwork
          className="project-card__artwork"
          image={project.image}
          imageAlt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 92vw, 1280px"
        >
          <span className="project-card__visit">
            Ver proyecto <span aria-hidden="true">↗</span>
          </span>
        </ProjectArtwork>

        <div className="project-card__body">
          <div className="project-card__meta">
            {index ? (
              <span className="project-card__index" aria-hidden="true">
                {String(index).padStart(2, "0")} — {String(total).padStart(2, "0")}
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

          <p className="project-card__description">{project.shortDescription}</p>

          <ul className="project-card__technologies" aria-label="Servicios incluidos">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </a>
    </article>
  );
}
