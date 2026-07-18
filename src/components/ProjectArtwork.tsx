import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import {
  projectArtworkThemes,
  type ProjectArtworkComposition,
  type ProjectVisual,
} from "@/src/data/projects";

type ProjectArtworkProps = Readonly<{
  visual: ProjectVisual;
  className?: string;
  priority?: boolean;
  sizes?: string;
}>;

type ArtworkStyle = CSSProperties & {
  "--project-artwork-background": string;
  "--project-artwork-surface": string;
  "--project-artwork-foreground": string;
  "--project-artwork-accent": string;
  "--project-artwork-accent-alt": string;
  "--project-artwork-line": string;
  "--project-artwork-glow": string;
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function ConnectedNodesArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__nodes">
      <div className="project-artwork__grid" />
      <span className="project-artwork__connection project-artwork__connection--one" />
      <span className="project-artwork__connection project-artwork__connection--two" />
      <span className="project-artwork__connection project-artwork__connection--three" />
      <span className="project-artwork__connection project-artwork__connection--four" />
      <span className="project-artwork__node project-artwork__node--one" />
      <span className="project-artwork__node project-artwork__node--two" />
      <span className="project-artwork__node project-artwork__node--three" />
      <span className="project-artwork__node project-artwork__node--four" />
      <div className="project-artwork__node-core">
        <span />
      </div>
    </div>
  );
}

function CommandCenterArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__dashboard">
      <div className="project-artwork__window">
        <div className="project-artwork__window-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="project-artwork__dashboard-layout">
          <div className="project-artwork__sidebar">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="project-artwork__dashboard-content">
            <div className="project-artwork__metric-row">
              <span />
              <span />
              <span />
            </div>
            <div className="project-artwork__chart">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="project-artwork__activity-row">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModularFlowArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__flow">
      <span className="project-artwork__flow-line project-artwork__flow-line--one" />
      <span className="project-artwork__flow-line project-artwork__flow-line--two" />
      <div className="project-artwork__flow-column">
        <span className="project-artwork__flow-label" />
        <span className="project-artwork__flow-card" />
        <span className="project-artwork__flow-card" />
      </div>
      <div className="project-artwork__flow-column project-artwork__flow-column--active">
        <span className="project-artwork__flow-label" />
        <span className="project-artwork__flow-card" />
        <span className="project-artwork__flow-card" />
        <span className="project-artwork__flow-card" />
      </div>
      <div className="project-artwork__flow-column">
        <span className="project-artwork__flow-label" />
        <span className="project-artwork__flow-card" />
        <span className="project-artwork__flow-card" />
      </div>
    </div>
  );
}

function EditorialGridArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__editorial">
      <div className="project-artwork__editorial-masthead">
        <span />
        <span />
      </div>
      <div className="project-artwork__editorial-grid">
        <div className="project-artwork__editorial-feature">
          <span />
          <span />
          <span />
        </div>
        <div className="project-artwork__editorial-column">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function MapLayersArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__map">
      <div className="project-artwork__map-grid" />
      <span className="project-artwork__route project-artwork__route--one" />
      <span className="project-artwork__route project-artwork__route--two" />
      <span className="project-artwork__route project-artwork__route--three" />
      <span className="project-artwork__pin project-artwork__pin--one" />
      <span className="project-artwork__pin project-artwork__pin--two" />
      <span className="project-artwork__pin project-artwork__pin--three" />
      <div className="project-artwork__map-panel">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function StoryCardsArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__stories">
      <article className="project-artwork__story-card project-artwork__story-card--one">
        <span />
        <span />
        <span />
      </article>
      <article className="project-artwork__story-card project-artwork__story-card--two">
        <span />
        <span />
        <span />
      </article>
      <article className="project-artwork__story-card project-artwork__story-card--three">
        <span />
        <span />
        <span />
      </article>
    </div>
  );
}

function ProductStageArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__product-stage">
      <span className="project-artwork__product-orbit" />
      <span className="project-artwork__product-light" />
      <div className="project-artwork__product-object">
        <span />
      </div>
      <div className="project-artwork__pedestal">
        <span />
      </div>
    </div>
  );
}

function CatalogGridArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__catalog">
      <div className="project-artwork__catalog-toolbar">
        <span />
        <span />
      </div>
      <div className="project-artwork__catalog-layout">
        <div className="project-artwork__catalog-filters">
          <span />
          <span />
          <span />
        </div>
        <div className="project-artwork__catalog-products">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function CheckoutFlowArtwork() {
  return (
    <div className="project-artwork__canvas project-artwork__checkout">
      <div className="project-artwork__checkout-steps">
        <span className="project-artwork__checkout-step project-artwork__checkout-step--active" />
        <span className="project-artwork__checkout-line" />
        <span className="project-artwork__checkout-step" />
        <span className="project-artwork__checkout-line" />
        <span className="project-artwork__checkout-step" />
      </div>
      <div className="project-artwork__checkout-form">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="project-artwork__checkout-summary">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function getComposition(composition: ProjectArtworkComposition): ReactNode {
  switch (composition) {
    case "connected-nodes":
      return <ConnectedNodesArtwork />;
    case "command-center":
      return <CommandCenterArtwork />;
    case "modular-flow":
      return <ModularFlowArtwork />;
    case "editorial-grid":
      return <EditorialGridArtwork />;
    case "map-layers":
      return <MapLayersArtwork />;
    case "story-cards":
      return <StoryCardsArtwork />;
    case "product-stage":
      return <ProductStageArtwork />;
    case "catalog-grid":
      return <CatalogGridArtwork />;
    case "checkout-flow":
      return <CheckoutFlowArtwork />;
  }
}

export function ProjectArtwork({
  visual,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ProjectArtworkProps) {
  if (visual.kind === "image") {
    return (
      <div className={joinClassNames("project-artwork", className)}>
        <Image
          className="project-artwork__image"
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={sizes}
          preload={priority}
        />
      </div>
    );
  }

  const theme = projectArtworkThemes[visual.theme];
  const style: ArtworkStyle = {
    "--project-artwork-background": theme.background,
    "--project-artwork-surface": theme.surface,
    "--project-artwork-foreground": theme.foreground,
    "--project-artwork-accent": theme.accent,
    "--project-artwork-accent-alt": theme.accentAlt,
    "--project-artwork-line": theme.line,
    "--project-artwork-glow": theme.glow,
  };

  return (
    <div
      className={joinClassNames(
        "project-artwork",
        `project-artwork--${visual.composition}`,
        className,
      )}
      style={style}
      role="img"
      aria-label={visual.alt}
    >
      <div className="project-artwork__frame" aria-hidden="true">
        {getComposition(visual.composition)}
      </div>
    </div>
  );
}
