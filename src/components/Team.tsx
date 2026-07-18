import Image from "next/image";
import { teamMembers } from "@/src/data/team";
import { siteConfig } from "@/src/config/site";
import { Reveal } from "./Reveal";

export function Team() {
  return (
    <section id="equipo" className="section team" aria-labelledby="team-title">
      <div className="section-shell">
        <Reveal className="section-heading">
          <div><p className="eyebrow"><span /> {siteConfig.team.eyebrow}</p><h2 id="team-title">{siteConfig.team.title}</h2></div>
          <p>{siteConfig.team.description}</p>
        </Reveal>
        <div className="team__grid">
          {teamMembers.map((member, index) => (
            <Reveal key={member.id} delay={index * 55} className="team-card">
              <div className="team-card__portrait" role={member.portrait.kind === "placeholder" ? "img" : undefined} aria-label={member.portrait.kind === "placeholder" ? member.portrait.alt : undefined}>
                {member.portrait.kind === "image" ? <Image src={member.portrait.src} alt={member.portrait.alt} width={member.portrait.width} height={member.portrait.height} sizes="(max-width: 620px) 50vw, 20vw" /> : <><span>{member.portrait.label}</span><small>Foto por cargar</small></>}
              </div>
              <div className="team-card__body"><h3>{member.name}</h3><p>{member.description}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
