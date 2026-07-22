import { Reveal } from "./Reveal";
import { enabledTestimonials } from "@/src/data/testimonials";

export function Reviews() {
  return (
    <section id="resenas" className="section reviews" aria-labelledby="reviews-title">
      <div className="section-shell">
        <Reveal className="reviews__heading">
          <h2 id="reviews-title">
            Experiencias <span className="title-accent">compartidas</span>
          </h2>
          <p className="reviews__intro">
            Comentarios de personas que conocieron nuestro trabajo y participaron
            en nuestros proyectos.
          </p>
        </Reveal>

        <div className="reviews__grid">
          {enabledTestimonials.map((testimonial) => {
            const rating = Math.max(
              0,
              Math.min(5, Math.round(testimonial.rating)),
            );
            const relationship = [testimonial.role, testimonial.project]
              .filter(Boolean)
              .join(" · ");

            return (
              <article className="review-card" key={testimonial.id}>
                <header className="review-card__header">
                  <span className="review-card__avatar" aria-hidden="true">
                    {testimonial.initial}
                  </span>
                  <div>
                    <h3>{testimonial.name}</h3>
                    {relationship && <p>{relationship}</p>}
                  </div>
                </header>
                <div
                  className="review-card__rating"
                  aria-label={`${rating} de 5 estrellas`}
                >
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <span
                      key={starIndex}
                      aria-hidden="true"
                      data-active={starIndex < rating}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="review-card__quote">
                  <p>{testimonial.comment}</p>
                </blockquote>
                <span className="review-card__mark" aria-hidden="true">
                  “
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
