import { siteConfig } from "@/src/config/site";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="nosotros" className="section about" aria-labelledby="about-title">
      <div className="section-shell about__inner">
        <Reveal><p className="eyebrow"><span /> {siteConfig.about.eyebrow}</p></Reveal>
        <Reveal delay={70} className="about__copy">
          <h2 id="about-title">{siteConfig.about.title}</h2>
          <p>{siteConfig.about.description}</p>
        </Reveal>
      </div>
    </section>
  );
}
