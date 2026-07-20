import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { siteConfig } from "@/src/config/site";
import "./globals.css";
import "./project-pages.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["monospace"],
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const socialImage = `${baseUrl}/og.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: { default: siteConfig.metadata.title, template: "%s — INDEVOR" },
    description: siteConfig.metadata.description,
    applicationName: "INDEVOR",
    category: "technology",
    icons: { icon: "/brand/favicon.png", shortcut: "/brand/favicon.png", apple: "/brand/favicon.png" },
    openGraph: {
      type: "website",
      locale: siteConfig.metadata.locale,
      siteName: "INDEVOR",
      url: baseUrl,
      title: siteConfig.metadata.title,
      description: siteConfig.metadata.description,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "INDEVOR — Pensamos. Diseñamos. Desarrollamos." }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.metadata.title,
      description: siteConfig.metadata.description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
