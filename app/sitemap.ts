import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { projects } from "@/src/data/projects";

async function getBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getBaseUrl();
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/proyectos`, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((project) => ({ url: `${baseUrl}/proyectos/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
