"use client";

import { LinkArrow } from "./LinkArrow";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  PACKAGE_SELECTION_EVENT,
  PACKAGE_SELECTION_STORAGE_KEY,
  type PackageSelection,
} from "./PackageContactLink";

type FieldName = "name" | "email" | "phone" | "projectType" | "message";
type Errors = Partial<Record<FieldName, string>>;

type ContactResponse = Readonly<{
  ok?: boolean;
  errors?: Errors;
}>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"error" | "info" | "success">("info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const submissionLock = useRef(false);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submissionLock.current) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "").trim();
    const senderEmail = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const projectType = String(form.get("projectType") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const website = String(form.get("website") ?? "").trim();
    const nextErrors: Errors = {};

    if (!name) {
      nextErrors.name = "Ingresá tu nombre completo.";
    } else if (name.length < 2 || name.length > 100) {
      nextErrors.name = "El nombre debe tener entre 2 y 100 caracteres.";
    }
    if (!senderEmail) {
      nextErrors.email = "Ingresá tu email.";
    } else if (senderEmail.length > 254 || !emailPattern.test(senderEmail)) {
      nextErrors.email = "Ingresá un email válido.";
    }
    if (!phone) {
      nextErrors.phone = "Ingresá tu teléfono o WhatsApp.";
    } else if (phone.length > 50) {
      nextErrors.phone = "El teléfono no puede superar los 50 caracteres.";
    }
    if (!projectType) {
      nextErrors.projectType = "Seleccioná un tipo de proyecto.";
    }
    if (!message) {
      nextErrors.message = "Contanos brevemente qué necesitás.";
    } else if (message.length > 5000) {
      nextErrors.message = "El mensaje no puede superar los 5000 caracteres.";
    }

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

    submissionLock.current = true;
    setIsSubmitting(true);
    setStatusTone("info");
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: senderEmail,
          phone,
          projectType,
          message,
          website,
        }),
      });
      const responseBody = (await response.json().catch(() => null)) as
        | ContactResponse
        | null;

      if (!response.ok || !responseBody?.ok) {
        if (responseBody?.errors) setErrors(responseBody.errors);
        throw new Error("Contact request failed");
      }

      formElement.reset();
      setProjectType("");
      setMessage("");
      setErrors({});
      setStatusTone("success");
      setStatus(
        "¡Consulta enviada! Nos pondremos en contacto con vos a la brevedad.",
      );
    } catch {
      setStatusTone("error");
      setStatus(
        "No pudimos enviar tu consulta. Intentá nuevamente o escribinos por WhatsApp.",
      );
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
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
          maxLength={100}
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
          maxLength={254}
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
          placeholder="Tu número"
          maxLength={50}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          onChange={handleFieldChange}
        />
        {errors.phone ? (
          <span id="contact-phone-error" className="contact-form__error">
            {errors.phone}
          </span>
        ) : null}
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
          maxLength={5000}
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

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "-10000px",
          width: 1,
          height: 1,
          margin: 0,
          padding: 0,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <label htmlFor="contact-website">Sitio web</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="contact-form__footer">
        <button
          className="contact-form__submit"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          <span>{isSubmitting ? "Enviando…" : "Enviar consulta"}</span>
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
