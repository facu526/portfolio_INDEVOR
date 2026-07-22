import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { HeroLogo3D } from "./HeroLogo3D";
import { LinkArrow } from "./LinkArrow";

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow"><span /> Diseño + desarrollo digital</p>
          <h1 id="hero-title" className="hero__title">
            {siteConfig.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="hero__description">{siteConfig.hero.description}</p>
          <div className="hero__actions">
            <Link className="button button--primary" href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}<LinkArrow direction="down-right" /></Link>
            <Link className="button button--ghost" href={siteConfig.hero.secondaryCta.href}>{siteConfig.hero.secondaryCta.label}<LinkArrow /></Link>
          </div>
        </div>
        <div className="hero__visual"><HeroLogo3D /></div>
      </div>
    </section>
  );
}
