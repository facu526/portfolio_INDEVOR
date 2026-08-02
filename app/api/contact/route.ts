import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const CONTACT_RECIPIENT = "indevoroficial@gmail.com";
const CONTACT_SENDER = "INDEVOR <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROJECT_TYPES = new Set([
  "Sitio web",
  "Landing page",
  "Tienda o catálogo",
  "Sistema web",
  "Rediseño",
  "Mantenimiento",
  "Otro",
]);

type FieldName = "name" | "email" | "phone" | "projectType" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "La solicitud no contiene datos válidos." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { ok: false, message: "La solicitud no contiene datos válidos." },
      { status: 400 },
    );
  }

  const payload = body as Record<string, unknown>;
  const website = readString(payload.website);

  // Honeypot: respondemos como si se hubiera enviado para no dar pistas al bot.
  if (website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = readString(payload.name);
  const email = readString(payload.email).toLowerCase();
  const phone = readString(payload.phone);
  const projectType = readString(payload.projectType);
  const message = readString(payload.message);
  const errors: FieldErrors = {};

  if (!name) {
    errors.name = "Ingresá tu nombre completo.";
  } else if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name)) {
    errors.name = "El nombre debe tener entre 2 y 100 caracteres.";
  }

  if (!email) {
    errors.email = "Ingresá tu email.";
  } else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = "Ingresá un email válido.";
  }

  if (!phone) {
    errors.phone = "Ingresá tu teléfono o WhatsApp.";
  } else if (phone.length > 50 || /[\r\n]/.test(phone)) {
    errors.phone = "El teléfono no puede superar los 50 caracteres.";
  }

  if (!projectType) {
    errors.projectType = "Seleccioná un tipo de proyecto.";
  } else if (projectType.length > 80 || !PROJECT_TYPES.has(projectType)) {
    errors.projectType = "Seleccioná un tipo de proyecto válido.";
  }

  if (!message) {
    errors.message = "Contanos brevemente qué necesitás.";
  } else if (message.length > 5000) {
    errors.message = "El mensaje no puede superar los 5000 caracteres.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Revisá los campos marcados antes de continuar.",
        errors,
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "El servicio de contacto no está configurado temporalmente.",
      },
      { status: 503 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeProjectType = escapeHtml(projectType);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
  const subject = `Nueva consulta desde la web de INDEVOR — ${name}`;
  const text = [
    `Nombre completo: ${name}`,
    `Email: ${email}`,
    `Teléfono o WhatsApp: ${phone}`,
    `Tipo de proyecto: ${projectType}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_SENDER,
      to: [CONTACT_RECIPIENT],
      subject,
      replyTo: email,
      text,
      html: `
        <div style="font-family:Arial,sans-serif;color:#16161d;line-height:1.6">
          <h1 style="font-size:22px;margin:0 0 24px">Nueva consulta desde INDEVOR</h1>
          <table style="border-collapse:collapse;width:100%;max-width:680px">
            <tbody>
              <tr><th style="padding:8px 16px 8px 0;text-align:left;vertical-align:top">Nombre completo</th><td style="padding:8px 0">${safeName}</td></tr>
              <tr><th style="padding:8px 16px 8px 0;text-align:left;vertical-align:top">Email</th><td style="padding:8px 0">${safeEmail}</td></tr>
              <tr><th style="padding:8px 16px 8px 0;text-align:left;vertical-align:top">Teléfono o WhatsApp</th><td style="padding:8px 0">${safePhone}</td></tr>
              <tr><th style="padding:8px 16px 8px 0;text-align:left;vertical-align:top">Tipo de proyecto</th><td style="padding:8px 0">${safeProjectType}</td></tr>
            </tbody>
          </table>
          <h2 style="font-size:18px;margin:24px 0 8px">Mensaje</h2>
          <p style="margin:0;white-space:normal">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, message: "No se pudo enviar la consulta." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, message: "No se pudo enviar la consulta." },
      { status: 502 },
    );
  }
}
