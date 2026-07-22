"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

import { teamMembers } from "@/src/data/team";
import { Reveal } from "./Reveal";

function handlePointerMove(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const bounds = event.currentTarget.getBoundingClientRect();
  const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;
  const verticalPosition = (event.clientY - bounds.top) / bounds.height - 0.5;

  event.currentTarget.style.setProperty(
    "--team-rotate-x",
    `${verticalPosition * -3.2}deg`,
  );
  event.currentTarget.style.setProperty(
    "--team-rotate-y",
    `${horizontalPosition * 3.2}deg`,
  );
}

function resetPortraitTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--team-rotate-x", "0deg");
  event.currentTarget.style.setProperty("--team-rotate-y", "0deg");
}

export function Team() {
  return (
    <div id="equipo" className="section team" aria-label="Integrantes de INDEVOR">
      <div className="section-shell">
        <div className="team__grid">
          {teamMembers.map((member, index) => (
            <Reveal key={member.id} delay={index * 55} className="team-card">
              <article
                className="team-card__surface"
                onPointerMove={handlePointerMove}
                onPointerLeave={resetPortraitTilt}
              >
                <div
                  className="team-card__portrait"
                  role={member.portrait.kind === "placeholder" ? "img" : undefined}
                  aria-label={
                    member.portrait.kind === "placeholder"
                      ? member.portrait.alt
                      : undefined
                  }
                >
                  {member.portrait.kind === "image" ? (
                    <Image
                      src={member.portrait.src}
                      alt={member.portrait.alt}
                      width={member.portrait.width}
                      height={member.portrait.height}
                      sizes="(max-width: 620px) 50vw, 20vw"
                      style={{ objectPosition: member.portrait.position }}
                    />
                  ) : (
                    <>
                      <span>{member.portrait.label}</span>
                      <small>Foto por cargar</small>
                    </>
                  )}
                </div>
                <div className="team-card__body">
                  <h3>{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
