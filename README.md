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

- `src/config/site.ts`: textos generales, navegación, servicios y canales de contacto.
- `src/data/projects.ts`: proyectos, casos de estudio y galerías conceptuales.
- `src/data/team.ts`: integrantes, descripciones, fotos y enlaces.
- `public/brand/`: logo oficial preparado para web y piezas transparentes del símbolo.

El correo e Instagram permanecen intencionalmente sin configurar. El número visible de WhatsApp es provisorio; reemplazá `value`, `label` y `href` juntos cuando se confirme el definitivo.

## Implementación

- App Router, TypeScript y CSS mantenible.
- Rutas `/`, `/proyectos` y `/proyectos/[slug]`.
- Hero 3D construido con Three.js a partir del símbolo original.
- Portadas de proyectos generadas con composiciones CSS, sin imágenes externas.
- Metadata, Open Graph, favicon, sitemap, robots y 404 personalizada.
- Build y despliegue nativos con Next.js, compatibles con Vercel.
