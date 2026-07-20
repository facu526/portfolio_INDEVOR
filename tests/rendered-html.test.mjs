import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete INDEVOR home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="es"/i);
  assert.match(html, /Pensamos\./);
  assert.match(html, /Diseñamos\./);
  assert.match(html, /Desarrollamos\./);
  assert.match(html, /Proyectos seleccionados/);
  assert.match(html, /Cinco personas, un mismo equipo/);
  assert.match(html, /¿Construimos algo juntos\?/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /(?:file:\/\/\/|[A-Z]:\/).*\.woff2/i);
});

test("renders the project index and every demo case", async () => {
  const indexResponse = await render("/proyectos");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /Todos los casos presentados son proyectos conceptuales/);

  for (const [slug, name] of [["nexo", "Nexo"], ["atlas", "Atlas"], ["umbral", "Umbral"]]) {
    const response = await render(`/proyectos/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<h1[^>]*>${name}<\\/h1>`));
    assert.match(html, /Caso conceptual/);
    assert.doesNotMatch(html, /href=["']#["']/i);
    assert.doesNotMatch(html, /href=["'](?:[^"']*\.example|https:\/\/wa\.me\/5491100000000)/i);
  }
});

test("keeps starter preview code and placeholder links out of the finished site", async () => {
  const [layout, page, packageJson, siteConfig] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../src/config/site.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(`${layout}\n${page}\n${packageJson}`, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.match(siteConfig, /href:\s*null/g);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(new URL("../public/brand/indevor-logo.png", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../app/sitemap.ts", import.meta.url));
  await access(new URL("../app/robots.ts", import.meta.url));
});
