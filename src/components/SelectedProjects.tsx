import Link from "next/link";
import { projects } from "@/src/data/projects";
import { siteConfig } from "@/src/config/site";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function SelectedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="proyectos" className="section selected-projects" aria-labelledby="projects-title">
      <div className="section-shell">
        <Reveal className="section-heading">
          <div><p className="eyebrow"><span /> {siteConfig.portfolio.eyebrow}</p><h2 id="projects-title">{siteConfig.portfolio.title}</h2></div>
          <p>{siteConfig.portfolio.description}</p>
        </Reveal>
        <div
          className="selected-projects__grid"
          data-project-count={featuredProjects.length}
        >
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 70}>
              <ProjectCard
                project={project}
                index={index + 1}
                total={featuredProjects.length}
                priority={index === 0}
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="selected-projects__footer">
          <Link className="text-link" href="/proyectos">{siteConfig.portfolio.linkLabel} <span aria-hidden="true">↗</span></Link>
        </Reveal>
      </div>
    </section>
  );
}
