"use client";

import { LinkArrow } from "./LinkArrow";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  PACKAGE_SELECTION_EVENT,
  PACKAGE_SELECTION_STORAGE_KEY,
  type PackageSelection,
} from "./PackageContactLink";

type ContactFormProps = { email: string | null };
type FieldName = "name" | "email" | "phone" | "projectType" | "message";
type Errors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ email }: ContactFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"error" | "info">("info");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const applyPackageSelection = (selection: PackageSelection) => {
      if (!selection.projectType) return;

      setProjectType(selection.projectType);
      setMessage(selection.message ?? "");
      setErrors((current) => ({
        ...current,
        projectType: undefined,
        message: undefined,
      }));
      setStatus("");
      window.sessionStorage.removeItem(PACKAGE_SELECTION_STORAGE_KEY);
    };

    const storedSelection = window.sessionStorage.getItem(
      PACKAGE_SELECTION_STORAGE_KEY,
    );

    if (storedSelection) {
      try {
        applyPackageSelection(JSON.parse(storedSelection) as PackageSelection);
      } catch {
        window.sessionStorage.removeItem(PACKAGE_SELECTION_STORAGE_KEY);
      }
    }

    const handlePackageSelection = (event: Event) => {
      applyPackageSelection(
        (event as CustomEvent<PackageSelection>).detail,
      );
    };

    window.addEventListener(PACKAGE_SELECTION_EVENT, handlePackageSelection);
    return () => {
      window.removeEventListener(
        PACKAGE_SELECTION_EVENT,
        handlePackageSelection,
      );
    };
  }, []);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = event.currentTarget.name as FieldName;
    setErrors((current) => ({ ...current, [fieldName]: undefined }));
    setStatus("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "").trim();
    const senderEmail = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const projectType = String(form.get("projectType") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: Errors = {};

    if (!name) nextErrors.name = "Ingresá tu nombre completo.";
    if (!senderEmail) {
      nextErrors.email = "Ingresá tu email.";
    } else if (!emailPattern.test(senderEmail)) {
      nextErrors.email = "Ingresá un email válido.";
    }
    if (!projectType) {
      nextErrors.projectType = "Seleccioná un tipo de proyecto.";
    }
    if (!message) nextErrors.message = "Contanos brevemente qué necesitás.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatusTone("error");
      setStatus("Revisá los campos marcados antes de continuar.");
      const firstInvalidField = Object.keys(nextErrors)[0] as FieldName;
      requestAnimationFrame(() => {
        const invalidControl = formElement.elements.namedItem(firstInvalidField);
        if (invalidControl instanceof HTMLElement) invalidControl.focus();
      });
      return;
    }

    if (!email) {
      setStatusTone("error");
      setStatus("El canal de correo todavía no está disponible.");
      return;
    }

    const subject = encodeURIComponent(
      `Nueva consulta desde INDEVOR — ${name}`,
    );
    const body = encodeURIComponent(
      [
        `Nombre completo: ${name}`,
        `Email: ${senderEmail}`,
        `Teléfono o WhatsApp: ${phone || "No informado"}`,
        `Tipo de proyecto: ${projectType}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    );

    setStatusTone("info");
    setStatus(
      "Abrimos tu aplicación de correo; revisá el mensaje y completá el envío.",
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form__field">
        <label htmlFor="contact-name">Nombre completo</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          onChange={handleFieldChange}
        />
        {errors.name ? (
          <span id="contact-name-error" className="contact-form__error">
            {errors.name}
          </span>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Email</label>
        {/* Algunas extensiones de temp-mail modifican este input antes de que React hidrate. */}
        <input
          id="contact-email"
          name="email"
          type="email"
          suppressHydrationWarning
          inputMode="email"
          autoComplete="email"
          placeholder="nombre@correo.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          onChange={handleFieldChange}
        />
        {errors.email ? (
          <span id="contact-email-error" className="contact-form__error">
            {errors.email}
          </span>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-phone">Teléfono o WhatsApp</label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Opcional"
          onChange={handleFieldChange}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-project-type">Tipo de proyecto</label>
        <select
          id="contact-project-type"
          name="projectType"
          value={projectType}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={
            errors.projectType ? "contact-project-type-error" : undefined
          }
          onChange={(event) => {
            setProjectType(event.currentTarget.value);
            handleFieldChange(event);
          }}
        >
          <option value="" disabled>
            Seleccioná una opción
          </option>
          <option value="Sitio web">Sitio web</option>
          <option value="Landing page">Landing page</option>
          <option value="Tienda o catálogo">Tienda o catálogo</option>
          <option value="Sistema web">Sistema web</option>
          <option value="Rediseño">Rediseño</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.projectType ? (
          <span
            id="contact-project-type-error"
            className="contact-form__error"
          >
            {errors.projectType}
          </span>
        ) : null}
      </div>

      <div className="contact-form__field contact-form__field--message">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          placeholder="Contanos brevemente qué necesitás, si ya tenés una idea y para cuándo te gustaría tenerlo."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          onChange={(event) => {
            setMessage(event.currentTarget.value);
            handleFieldChange(event);
          }}
        />
        {errors.message ? (
          <span id="contact-message-error" className="contact-form__error">
            {errors.message}
          </span>
        ) : null}
      </div>

      <div className="contact-form__footer">
        <button className="contact-form__submit" type="submit">
          Enviar consulta
          <LinkArrow />
        </button>
        <p
          className="contact-form__status"
          data-tone={statusTone}
          aria-live="polite"
        >
          {status}
        </p>
      </div>
    </form>
  );
}
