import { siteConfig } from "@/src/config/site";
import { Reveal } from "./Reveal";

export function Capabilities() {
  return (
    <section id="capacidades" className="section capabilities" aria-labelledby="capabilities-title">
      <div className="section-shell">
        <Reveal className="section-heading section-heading--compact">
          <div>
            <h2 id="capabilities-title">
              Qué podemos <span className="title-accent">construir<span className="title-caret" aria-hidden="true">|</span></span>
            </h2>
          </div>
        </Reveal>
        <ul className="capabilities__list">
          {siteConfig.capabilities.items.map((capability, index) => (
            <li key={capability}>
              <Reveal delay={index * 45} className="capabilities__item">
                <span>{capability}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
