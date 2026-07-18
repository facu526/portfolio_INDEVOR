# INDEVOR — sitio oficial

Portfolio multipágina de INDEVOR, un equipo de cinco estudiantes de Ingeniería Informática dedicado al diseño y desarrollo de experiencias digitales.

## Desarrollo local

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

Comandos de validación:

```bash
npm run lint
npm run build
npm test
```

## Contenido editable

- `src/config/site.ts`: textos generales, navegación, capacidades, correo y WhatsApp.
- `src/data/projects.ts`: proyectos, casos de estudio y galerías conceptuales.
- `src/data/team.ts`: integrantes, descripciones, fotos y enlaces.
- `public/brand/`: logo oficial preparado para web y piezas transparentes del símbolo.

El correo y WhatsApp permanecen intencionalmente sin configurar. Reemplazá `value`, `label` y `href` juntos antes de usar los canales de contacto.

## Implementación

- App Router, TypeScript y CSS mantenible.
- Rutas `/`, `/proyectos` y `/proyectos/[slug]`.
- Hero 2.5D construido con tres capas del símbolo original y transformaciones CSS.
- Portadas de proyectos generadas con composiciones CSS, sin imágenes externas.
- Metadata, Open Graph, favicon, sitemap, robots y 404 personalizada.
- Salida compatible con Cloudflare Workers mediante vinext.
