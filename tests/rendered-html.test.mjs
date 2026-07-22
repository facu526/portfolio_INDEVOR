import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test, { after, before } from "node:test";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const testServerUrl = "http://127.0.0.1:3099";
let testServer;

before(async () => {
  testServer = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      "3099",
    ],
    {
      cwd: projectRoot,
      windowsHide: true,
      stdio: "ignore",
    },
  );

  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(testServerUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("El servidor de pruebas de Next.js no inició a tiempo.");
});

after(() => {
  testServer?.kill();
});

async function render(path = "/") {
  return fetch(`${testServerUrl}${path}`, {
    headers: { accept: "text/html" },
  });
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
  assert.match(html, /Paquetes INDEVOR/);
  assert.match(html, /Una solución para cada etapa/);
  assert.match(html, /Landing Page/);
  assert.match(html, /Sitio web/);
  assert.match(html, /Catálogo o tienda online/);
  assert.match(html, /300\.000/);
  assert.match(html, /450\.000/);
  assert.match(html, /700\.000/);
  assert.match(html, /Más elegido/);
  assert.match(html, /Armamos una propuesta a medida/);
  assert.match(html, /href="#contacto"/);
  assert.match(html, /Cinco personas, un mismo equipo/);
  assert.match(html, /¿Construimos algo juntos\?/);
  assert.match(html, /Contanos sobre tu proyecto/);
  assert.match(html, /Enviar consulta/);
  assert.match(html, /\+54 9 11 0000-0000/);
  assert.match(html, /hola@indevor\.com/);
  assert.match(html, /@indevor\.digital/);
  assert.doesNotMatch(html, /Por configurar|Datos de contacto provisionales|Se abrirá tu aplicación de correo/);
  assert.doesNotMatch(html, /href=["'](?:https:\/\/wa\.me\/5491100000000|mailto:hola@indevor\.com|https:\/\/www\.instagram\.com\/indevor\.digital\/)["']/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /file:\/\/\/[^"' ]*\.woff2/i);
  assert.doesNotMatch(
    html,
    /(?:src|href)=["'][A-Z]:[\\/][^"']*\.woff2/i,
  );
});

test("renders the project index and Áurea Eventos", async () => {
  const indexResponse = await render("/proyectos");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /Demo conceptual/);

  for (const [slug, name] of [["aurea-eventos", "Áurea Eventos"]]) {
    const response = await render(`/proyectos/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<h1[^>]*>${name}<\\/h1>`));
    assert.match(html, /Demo conceptual/);
    assert.doesNotMatch(html, /href=["']#["']/i);
    assert.doesNotMatch(html, /href=["'](?:[^"']*\.example|https:\/\/wa\.me\/5491100000000)/i);
  }
});

test("keeps starter preview code and placeholder links out of the finished site", async () => {
  const [layout, page, packageJson, siteConfig, packageData] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../src/config/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/data/packages.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(`${layout}\n${page}\n${packageJson}`, /codex-preview|SkeletonPreview|react-loading-skeleton/);
  assert.equal((siteConfig.match(/enabled:\s*false/g) ?? []).length, 3);
  assert.equal((packageData.match(/enabled:\s*true/g) ?? []).length, 3);
  assert.match(packageData, /TODO: Revisar precios, prestaciones y mensajes comerciales/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await access(new URL("../public/brand/indevor-logo-oficial.png", import.meta.url));
  await access(new URL("../public/brand/indevor-symbol.png", import.meta.url));
  await access(new URL("../public/brand/indevor-symbol.svg", import.meta.url));
  await access(new URL("../app/icon.png", import.meta.url));
  await access(new URL("../app/manifest.ts", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../app/sitemap.ts", import.meta.url));
  await access(new URL("../app/robots.ts", import.meta.url));
});
