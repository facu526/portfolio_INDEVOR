import { getEnabledPackages } from "@/src/data/packages";
import { PackageContactLink } from "./PackageContactLink";
import { PricingCard } from "./PricingCard";
import { Reveal } from "./Reveal";

const customProposalMessage =
  "Hola, somos [nombre o empresa]. Vimos los paquetes en la web de INDEVOR y queremos pedir un presupuesto personalizado.";

export function Pricing() {
  const enabledPackages = getEnabledPackages();

  return (
    <section
      id="paquetes"
      className="section pricing"
      aria-labelledby="pricing-title"
    >
      <div className="section-shell">
        <Reveal className="section-heading pricing__heading">
          <div>
            <h2 id="pricing-title">
              Una solución para <span className="title-accent">cada etapa<span className="title-caret" aria-hidden="true">|</span></span>
            </h2>
          </div>
          <div className="pricing__intro">
            <p>
              Elegí una base según lo que necesita tu proyecto. Todos los
              paquetes se adaptan a cada negocio y pueden ampliarse según sus
              necesidades.
            </p>
            <small>
              Los valores son orientativos. El precio final depende del alcance
              y las funcionalidades del proyecto.
            </small>
          </div>
        </Reveal>

        <ol className="pricing__grid">
          {enabledPackages.map((packagePlan, index) => (
            <li className="pricing__item" key={packagePlan.id}>
              <Reveal delay={index * 70}>
                <PricingCard
                  packagePlan={packagePlan}
                />
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="pricing__custom" delay={120}>
          <div>
            <p className="pricing__custom-kicker">¿Necesitás algo diferente?</p>
            <h3>Armamos una propuesta a medida.</h3>
            <p>
              También desarrollamos sistemas web, paneles de gestión,
              funcionalidades personalizadas y mantenimiento. Contanos qué
              necesitás y armamos una propuesta a medida.
            </p>
            <small>
              Dominio, hosting, cuentas de correo, mantenimiento y servicios
              externos se cotizan según cada proyecto.
            </small>
          </div>
          <PackageContactLink
            className="pricing__custom-cta"
            packageName="Presupuesto personalizado"
            projectType="Otro"
            contactMessage={customProposalMessage}
          >
            Pedir presupuesto personalizado
          </PackageContactLink>
        </Reveal>
      </div>
    </section>
  );
}
