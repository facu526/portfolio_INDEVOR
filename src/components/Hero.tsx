import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { InteractiveLogo } from "./InteractiveLogo";

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow"><span /> Diseño + desarrollo digital</p>
          <h1 id="hero-title" className="hero__title">
            {siteConfig.hero.titleLines.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="hero__description">{siteConfig.hero.description}</p>
          <div className="hero__actions">
            <Link className="button button--primary" href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}<span aria-hidden="true">↘</span></Link>
            <Link className="button button--ghost" href={siteConfig.hero.secondaryCta.href}>{siteConfig.hero.secondaryCta.label}<span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="hero__visual"><InteractiveLogo /></div>
      </div>
      <a className="hero__scroll" href="#proyectos"><span>Explorar</span><span aria-hidden="true">↓</span></a>
    </section>
  );
}
