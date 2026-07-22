import type { PackagePlan } from "@/src/data/packages";
import { PackageContactLink } from "./PackageContactLink";

type PricingCardProps = Readonly<{
  packagePlan: PackagePlan;
}>;

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 0,
  }).format(price);
}

export function PricingCard({
  packagePlan,
}: PricingCardProps) {
  return (
    <article
      className="pricing-card"
      data-featured={packagePlan.featured ? "true" : "false"}
    >
      <header className="pricing-card__header">
        <div className="pricing-card__name-row">
          <h3>{packagePlan.name}</h3>
          {packagePlan.badge ? (
            <span className="pricing-card__badge">{packagePlan.badge}</span>
          ) : null}
        </div>
        <p className="pricing-card__description">{packagePlan.description}</p>
      </header>

      <p className="pricing-card__price" aria-label={`${packagePlan.pricePrefix} ${packagePlan.currencySymbol}${formatPrice(packagePlan.price)} ${packagePlan.currency}`}>
        <span>{packagePlan.pricePrefix}</span>
        <strong>
          {packagePlan.currencySymbol}
          {formatPrice(packagePlan.price)}
        </strong>
        <small>{packagePlan.currency}</small>
      </p>

      <div className="pricing-card__included">
        <p>Incluye</p>
        <ul>
          {packagePlan.features.map((feature) => (
            <li key={feature}>
              <span aria-hidden="true">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <PackageContactLink
        className="pricing-card__cta"
        packageName={packagePlan.name}
        projectType={packagePlan.contactProjectType}
        contactMessage={packagePlan.contactMessage}
      >
        Consultar este paquete
      </PackageContactLink>
    </article>
  );
}
