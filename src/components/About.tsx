import { siteConfig } from "@/src/config/site";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="nosotros" className="section about" aria-labelledby="about-title">
      <div className="section-shell about__inner">
        <Reveal className="about__copy">
          <h2 id="about-title">
            Sobre <span className="title-accent">INDEVOR</span>
          </h2>
          <p>{siteConfig.about.description}</p>
        </Reveal>
      </div>
    </section>
  );
}
