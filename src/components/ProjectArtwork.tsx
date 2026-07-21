import Image from "next/image";
import type { ReactNode } from "react";

type ProjectArtworkProps = Readonly<{
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
}>;

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function ProjectArtwork({
  image,
  imageAlt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  children,
}: ProjectArtworkProps) {
  return (
    <div className={joinClassNames("project-artwork", className)}>
      <Image
        className="project-artwork__image"
        src={image}
        alt={imageAlt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      {children}
    </div>
  );
}
