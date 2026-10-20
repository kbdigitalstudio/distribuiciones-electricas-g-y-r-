"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Dictionary, Language } from "@/lib/i18n";
import { getCategory, getCategoryName } from "@/lib/catalog";
import { appendQuoteLinesToMessage, resolveQuoteLines } from "@/lib/quote";
import { copyText } from "@/lib/clipboard";
import { useQuote } from "./quote/QuoteProvider";
import { Icon } from "./Icons";

interface ContactFormProps {
  lang: Language;
  dict: Dictionary["contact"];
}

type Status = "idle" | "sending" | "success" | "not-configured" | "error";
type CopyStatus = "idle" | "copied" | "error";

export function ContactForm({ lang, dict }: ContactFormProps) {
  const { lines, count } = useQuote();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const resolvedLines = useMemo(
    () => resolveQuoteLines(lines, lang),
    [lines, lang],
  );

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("linea") ?? "";
    const category = getCategory(slug);
    if (!category) return;
    setReason((current) => current || "cotizacion");
    setMessage((current) => {
      if (current) return current;
      const categoryName = getCategoryName(category, lang);
      return lang === "en"
        ? `Hello, I would like a quote for the "${categoryName}" line. `
        : `Hola, quisiera solicitar una cotización para la línea "${categoryName}". `;
    });
  }, [lang]);

  const messageWithItems = useMemo(
    () => appendQuoteLinesToMessage(message, lines, lang),
    [message, lines, lang],
  );

  const copyPayload = useMemo(() => {
    const reasonLabel =
      dict.reasons.find((item) => item.value === reason)?.label ?? "";
    return [
      `${dict.name}: ${name}`,
      company ? `${dict.company}: ${company}` : "",
      `${dict.email}: ${email}`,
      phone ? `${dict.phone}: ${phone}` : "",
      reasonLabel ? `${dict.reason}: ${reasonLabel}` : "",
      "",
      messageWithItems,
      "",
      dict.privacy,
    ]
      .filter(Boolean)
      .join("\n");
  }, [company, dict, email, messageWithItems, name, phone, reason]);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (name.trim().length === 0) next.name = dict.required;
    if (email.trim().length === 0) next.email = dict.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = dict.invalidEmail;
    }
    if (reason.trim().length === 0) next.reason = dict.required;
    if (message.trim().length === 0) next.message = dict.required;
    else if (message.trim().length < 10) next.message = dict.tooShort;
    setErrors(next);
    const firstError = Object.keys(next)[0];
    if (firstError) {
      requestAnimationFrame(() => {
        document.getElementById(`contact-${firstError}`)?.focus();
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("idle");
    setCopyStatus("idle");
    if (!validate()) return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          reason,
          message: messageWithItems,
          lang,
        }),
      });
      const data = (await response.json()) as { ok: boolean; code?: string };
      if (response.ok && data.ok) {
        setStatus("success");
      } else if (data.code === "QUOTE_BACKEND_NOT_CONFIGURED") {
        setStatus("not-configured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleCopy = async () => {
    const copied = await copyText(copyPayload);
    setCopyStatus(copied ? "copied" : "error");
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="estado-formulario">
      <div className="mb-6 border border-amber/45 bg-amber/[0.08] p-4">
        <div className="flex items-start gap-3">
          <Icon name="spark" className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <div>
            <p className="text-sm font-semibold text-graphite">
              {dict.channelNoticeTitle}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-graphite/60">
              {dict.channelNoticeBody}
            </p>
          </div>
        </div>
      </div>

      {count > 0 ? (
        <div className="mb-6 border border-electric/30 bg-electric/[0.05] p-4">
          <div className="flex items-start gap-3">
            <Icon name="quote" className="mt-0.5 h-4 w-4 shrink-0 text-electric-700" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-graphite">
                {dict.quoteListTitle}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-graphite/60">
                {count}{" "}
                {count === 1 ? dict.quoteListBodyOne : dict.quoteListBody}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-graphite/65">
                {resolvedLines.slice(0, 4).map((line) => (
                  <li key={line.familyId}>
                    {line.familyName} · {line.quantity}
                  </li>
                ))}
                {resolvedLines.length > 4 ? (
                  <li>+{resolvedLines.length - 4}</li>
                ) : null}
              </ul>
              <Link
                href={`/${lang}/cotizacion`}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-electric-700 underline decoration-electric/40 underline-offset-4 hover:decoration-electric"
              >
                {dict.quoteListLink}
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label">
            {dict.name} <span className="text-danger" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-contact-name" : undefined}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={dict.namePlaceholder}
            className="field"
          />
          {errors.name ? (
            <p id="error-contact-name" role="alert" className="field-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="label">
            {dict.email} <span className="text-danger" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-contact-email" : undefined}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={dict.emailPlaceholder}
            className="field"
          />
          {errors.email ? (
            <p id="error-contact-email" role="alert" className="field-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-company" className="label">
            {dict.company}{" "}
            <span className="font-normal text-graphite/65">
              ({dict.companyOptional})
            </span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder={dict.companyPlaceholder}
            className="field"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="label">
            {dict.phone}{" "}
            <span className="font-normal text-graphite/65">
              ({dict.phoneOptional})
            </span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={dict.phonePlaceholder}
            className="field"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="contact-reason" className="label">
            {dict.reason} <span className="text-danger" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-reason"
              name="reason"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={errors.reason ? "error-contact-reason" : undefined}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="field cursor-pointer appearance-none pr-10"
            >
              <option value="">{dict.reasonPlaceholder}</option>
              {dict.reasons.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <Icon
              name="arrow"
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-graphite/65"
            />
          </div>
          {errors.reason ? (
            <p id="error-contact-reason" role="alert" className="field-error">
              {errors.reason}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="label">
          {dict.message} <span className="text-danger" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "error-contact-message" : undefined}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={dict.messagePlaceholder}
          className="field resize-y"
        />
        {errors.message ? (
          <p id="error-contact-message" role="alert" className="field-error">
            {errors.message}
          </p>
        ) : null}
        {count > 0 ? (
          <p className="field-hint">{dict.quoteItemsIncluded}</p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary self-start disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? dict.sending : dict.submit}
          <Icon name="arrow" className="h-4 w-4" />
        </button>
        <p className="max-w-xl text-xs leading-relaxed text-graphite/65">
          {dict.privacy}
        </p>
      </div>

      <div id="estado-formulario" aria-live="polite" className="mt-5">
        {status === "success" ? (
          <div role="status" className="border border-electric/40 bg-electric/[0.06] p-5">
            <h2 className="text-sm font-semibold text-graphite">
              {dict.successTitle}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-graphite/65">
              {dict.successBody}
            </p>
          </div>
        ) : null}

        {status === "not-configured" ? (
          <div role="alert" className="border border-amber/50 bg-amber/[0.08] p-5">
            <h2 className="text-sm font-semibold text-graphite">
              {dict.notConfiguredTitle}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-graphite/65">
              {dict.notConfiguredBody}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xs bg-graphite px-4 py-2.5 text-xs font-semibold text-technical transition-colors hover:bg-graphite-800"
            >
              <Icon name="copy" className="h-4 w-4" />
              {dict.copy}
            </button>
            {copyStatus === "copied" ? (
              <p className="mt-2 text-xs font-medium text-electric-700" role="status">
                {dict.copied}
              </p>
            ) : null}
            {copyStatus === "error" ? (
              <p className="mt-2 text-xs font-medium text-danger" role="alert">
                {dict.copyError}
              </p>
            ) : null}
          </div>
        ) : null}

        {status === "error" ? (
          <div role="alert" className="border border-danger/40 bg-danger/[0.04] p-5">
            <h2 className="text-sm font-semibold text-graphite">
              {dict.errorTitle}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-graphite/65">
              {dict.errorBody}
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
