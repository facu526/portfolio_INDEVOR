"use client";

import type { MouseEvent } from "react";
import { LinkArrow } from "./LinkArrow";

export const PACKAGE_SELECTION_EVENT = "indevor:package-selected";
export const PACKAGE_SELECTION_STORAGE_KEY = "indevor:selected-package";

export type PackageSelection = Readonly<{
  packageName: string;
  projectType: string;
  message: string;
}>;

type PackageContactLinkProps = Readonly<{
  packageName: string;
  projectType: string;
  contactMessage: string;
  className: string;
  children: string;
}>;

export function PackageContactLink({
  packageName,
  projectType,
  contactMessage,
  className,
  children,
}: PackageContactLinkProps) {
  const href = "#contacto";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const selection: PackageSelection = {
      packageName,
      projectType,
      message: contactMessage,
    };
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
      aria-label={`${children}: ${packageName}`}
      onClick={handleClick}
    >
      {children}
      <span aria-hidden="true">
        <LinkArrow direction="down-right" />
      </span>
    </a>
  );
}
