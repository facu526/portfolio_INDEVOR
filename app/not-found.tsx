import Link from "next/link";

export default function NotFound() {
  return (
    <main id="contenido" className="not-found">
      <section className="not-found__content" aria-labelledby="not-found-heading">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <p className="not-found__eyebrow">Página no encontrada</p>
        <h1 id="not-found-heading">Este camino no lleva a ningún lado.</h1>
        <p className="not-found__description">
          La dirección puede haber cambiado o la página que buscás ya no está
          disponible.
        </p>
        <div className="not-found__actions">
          <Link className="not-found__primary-link" href="/">
            Volver al inicio
          </Link>
          <Link className="not-found__secondary-link" href="/proyectos">
            Ver proyectos Demo
          </Link>
        </div>
      </section>

      <div className="not-found__artwork" aria-hidden="true">
        <span className="not-found__orb not-found__orb--one" />
        <span className="not-found__orb not-found__orb--two" />
        <span className="not-found__line" />
      </div>
    </main>
  );
}
