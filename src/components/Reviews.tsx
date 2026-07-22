import { Reveal } from "./Reveal";

const reviewSlots = [
  { initial: "S", category: "Sitios web" },
  { initial: "L", category: "Landing pages" },
  { initial: "W", category: "Sistemas web" },
  { initial: "T", category: "Tiendas online" },
] as const;

export function Reviews() {
  return (
    <section id="resenas" className="section reviews" aria-labelledby="reviews-title">
      <div className="section-shell">
        <Reveal className="reviews__heading">
          <h2 id="reviews-title">
            Negocios que <span className="title-accent">confiaron<span className="title-caret" aria-hidden="true">|</span></span>
          </h2>
          <p className="reviews__intro">
            Acá vamos a compartir experiencias reales de clientes que trabajen
            con INDEVOR.
          </p>
        </Reveal>

        <div className="reviews__grid">
          {reviewSlots.map((slot, index) => (
            <Reveal key={slot.category} delay={70 + index * 55}>
              <article className="review-card">
                <header className="review-card__header">
                  <span className="review-card__avatar" aria-hidden="true">{slot.initial}</span>
                  <div>
                    <h3>Próximamente</h3>
                    <p>{slot.category}</p>
                  </div>
                </header>
                <p className="review-card__quote">
                  “Este espacio está reservado para una reseña real.”
                </p>
                <span className="review-card__mark" aria-hidden="true">“</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
