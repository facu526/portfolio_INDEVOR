"use client";

import type { MouseEvent } from "react";

export const PACKAGE_SELECTION_EVENT = "indevor:package-selected";
export const PACKAGE_SELECTION_STORAGE_KEY = "indevor:selected-package";

export type PackageSelection = Readonly<{
  packageName: string;
  projectType: string;
}>;

type PackageContactLinkProps = Readonly<{
  packageName: string;
  projectType: string;
  whatsappMessage: string;
  whatsappUrl: string | null;
  className: string;
  children: string;
}>;

export function PackageContactLink({
  packageName,
  projectType,
  whatsappMessage,
  whatsappUrl,
  className,
  children,
}: PackageContactLinkProps) {
  const href = whatsappUrl
    ? `${whatsappUrl}${whatsappUrl.includes("?") ? "&" : "?"}text=${encodeURIComponent(whatsappMessage)}`
    : "#contacto";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (whatsappUrl) return;

    const selection: PackageSelection = { packageName, projectType };
    window.sessionStorage.setItem(
      PACKAGE_SELECTION_STORAGE_KEY,
      JSON.stringify(selection),
    );
    window.dispatchEvent(
      new CustomEvent<PackageSelection>(PACKAGE_SELECTION_EVENT, {
        detail: selection,
      }),
    );

    if (window.location.pathname !== "/") {
      event.preventDefault();
      window.location.assign(`/#contacto`);
    }
  };

  return (
    <a
      className={className}
      href={href}
      target={whatsappUrl ? "_blank" : undefined}
      rel={whatsappUrl ? "noreferrer" : undefined}
      aria-label={`${children}: ${packageName}`}
      onClick={handleClick}
    >
      {children}
      <span aria-hidden="true">
        <svg viewBox="0 0 16 16" focusable="false">
          <path d="M4 12 12 4M6 4h6v6" />
        </svg>
      </span>
    </a>
  );
}
