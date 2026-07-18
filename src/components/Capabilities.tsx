import { siteConfig } from "@/src/config/site";
import { Reveal } from "./Reveal";

export function Capabilities() {
  return (
    <section id="capacidades" className="section capabilities" aria-labelledby="capabilities-title">
      <div className="section-shell">
        <Reveal className="section-heading section-heading--compact">
          <div><p className="eyebrow"><span /> {siteConfig.capabilities.eyebrow}</p><h2 id="capabilities-title">{siteConfig.capabilities.title}</h2></div>
        </Reveal>
        <ol className="capabilities__list">
          {siteConfig.capabilities.items.map((capability, index) => (
            <li key={capability}>
              <Reveal delay={index * 45} className="capabilities__item">
                <span className="capabilities__number">{String(index + 1).padStart(2, "0")}</span><span>{capability}</span><span aria-hidden="true">↗</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
