import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { enabledTestimonials } from "@/src/data/testimonials";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="site-footer__brand" href="/" aria-label="INDEVOR — Inicio">
          <Image src="/brand/indevor-logo-oficial.png" alt="INDEVOR" width={1107} height={533} />
        </Link>
        <nav className="site-footer__nav" aria-label="Navegación del pie">
          {siteConfig.navigation
            .filter((item) => item.href !== "/#resenas" || enabledTestimonials.length > 0)
            .map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="site-footer__meta">
          <span>© {new Date().getFullYear()} INDEVOR.</span>
          <span>{siteConfig.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
