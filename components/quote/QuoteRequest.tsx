"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { Dictionary, Language } from "@/lib/i18n";
import {
  buildQuoteText,
  MAX_QUANTITY,
  resolveQuoteLines,
} from "@/lib/quote";
import { copyText, downloadText } from "@/lib/clipboard";
import { useQuote } from "./QuoteProvider";
import { Icon } from "../Icons";

interface QuoteRequestProps {
  lang: Language;
  dict: Dictionary["quote"];
}

interface FormErrors {
  name?: string;
  email?: string;
}

type CopyStatus = "idle" | "copied" | "error";

export function QuoteRequest({ lang, dict }: QuoteRequestProps) {
  const {
    lines,
    hydrated,
    count,
    units,
    setQuantity,
    removeLine,
    clearLines,
  } = useQuote();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedText, setPreparedText] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const resolvedLines = useMemo(
    () => resolveQuoteLines(lines, lang),
    [lines, lang],
  );

  useEffect(() => {
    setPreparedText(null);
    setCopyStatus("idle");
  }, [lines]);

  useEffect(() => {
    if (preparedText) previewRef.current?.focus();
  }, [preparedText]);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (name.trim().length === 0) next.name = dict.required;
    if (email.trim().length === 0) next.email = dict.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = dict.invalidEmail;
    }
    setErrors(next);
    const firstError = Object.keys(next)[0];
    if (firstError) {
      requestAnimationFrame(() => {
        document.getElementById(`quote-${firstError}`)?.focus();
      });
      return false;
    }
    return true;
  };

  const handlePrepare = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setPreparedText(
      buildQuoteText(lang, lines, {
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
        phone: phone.trim() || undefined,
        city: city.trim() || undefined,
        notes: notes.trim() || undefined,
      }),
    );
    setCopyStatus("idle");
  };

  const handleCopy = async () => {
    if (!preparedText) return;
    const copied = await copyText(preparedText);
    setCopyStatus(copied ? "copied" : "error");
  };

  const handleDownload = () => {
    if (!preparedText) return;
    downloadText(dict.downloadName, preparedText);
  };

  const handleEdit = () => {
    setPreparedText(null);
    setCopyStatus("idle");
    window.setTimeout(() => {
      document.getElementById("quote-name")?.focus();
    }, 0);
  };

  if (!hydrated) {
    return (
      <div
        className="border border-graphite/15 bg-white p-8 text-sm text-graphite/65"
        role="status"
      >
        {dict.loading}
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="border border-dashed border-graphite/25 bg-white px-6 py-12 text-center md:px-12 md:py-16">
        <span className="mx-auto flex h-14 w-14 items-center justify-center border border-graphite/20 text-graphite/65">
          <Icon name="quote" className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-graphite">
          {dict.emptyTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-graphite/65">
          {dict.emptyBody}
        </p>
        <Link href={`/${lang}/productos`} className="btn-primary mt-6">
          {dict.emptyCta}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
        <p className="mt-5 font-mono text-[11px] tracking-[0.06em] text-graphite/65">
          {dict.localNote}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-end border-b border-graphite/15 pb-4">
        {showClearConfirm ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium text-graphite/65">
              {dict.clearConfirm}
            </span>
            <button
              type="button"
              onClick={() => {
                clearLines();
                setShowClearConfirm(false);
              }}
              className="text-xs font-semibold text-danger underline decoration-danger/30 underline-offset-4"
            >
              {dict.confirm}
            </button>
            <button
              type="button"
              onClick={() => setShowClearConfirm(false)}
              className="text-xs font-semibold text-graphite/65 underline decoration-graphite/30 underline-offset-4"
            >
              {dict.cancel}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-2 self-start text-xs font-semibold text-graphite/65 transition-colors hover:text-danger sm:self-auto"
          >
            <Icon name="trash" className="h-3.5 w-3.5" />
            {dict.clear}
          </button>
        )}
      </div>

      <form
        onSubmit={handlePrepare}
        noValidate
        className="grid gap-8 lg:grid-cols-12 lg:gap-10"
      >
        <div className="lg:col-span-7">
          <div className="border border-graphite/15 bg-white">
            <div className="flex items-center justify-between gap-4 border-b border-graphite/10 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.18em] text-graphite/65">
                  01
                </span>
                <h2 className="text-lg font-bold tracking-[-0.02em] text-graphite">
                  {dict.itemsTitle}
                </h2>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-graphite/65">
                {count} {count === 1 ? dict.itemSingular : dict.itemsCount}
              </span>
            </div>

            <ul className="divide-y divide-graphite/10">
              {resolvedLines.map((line) => (
                <li key={line.familyId} className="p-5 md:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite/65">
                        {line.categoryCode} · {line.categoryName}
                      </p>
                      <h3 className="mt-1 text-base font-semibold tracking-[-0.015em] text-graphite">
                        {line.familyName}
                      </h3>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <div>
                        <label
                          htmlFor={`qty-${line.familyId}`}
                          className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-graphite/65"
                        >
                          {dict.quantity}
                        </label>
                        <div className="inline-flex items-center border border-graphite/20">
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(line.familyId, line.quantity - 1)
                            }
                            disabled={line.quantity <= 1}
                            aria-label={dict.decrease}
                            className="flex h-9 w-9 items-center justify-center text-graphite/60 transition-colors hover:bg-graphite hover:text-technical disabled:pointer-events-none disabled:opacity-30"
                          >
                            <Icon name="minus" className="h-3.5 w-3.5" />
                          </button>
                          <input
                            id={`qty-${line.familyId}`}
                            type="number"
                            min={1}
                            max={MAX_QUANTITY}
                            value={line.quantity}
                            onChange={(event) =>
                              setQuantity(
                                line.familyId,
                                event.currentTarget.valueAsNumber,
                              )
                            }
                            className="qty-input h-9 w-12 border-x border-graphite/20 bg-white text-center font-mono text-xs text-graphite focus:outline-none focus:ring-2 focus:ring-electric/25"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(line.familyId, line.quantity + 1)
                            }
                            disabled={line.quantity >= MAX_QUANTITY}
                            aria-label={dict.increase}
                            className="flex h-9 w-9 items-center justify-center text-graphite/60 transition-colors hover:bg-graphite hover:text-technical disabled:pointer-events-none disabled:opacity-30"
                          >
                            <Icon name="plus" className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.familyId)}
                        aria-label={`${dict.remove}: ${line.familyName}`}
                        className="mt-5 flex h-9 w-9 items-center justify-center border border-graphite/15 text-graphite/65 transition-colors hover:border-danger/40 hover:text-danger"
                      >
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {preparedText ? (
            <div
              ref={previewRef}
              tabIndex={-1}
              className="mt-6 border border-electric/35 bg-white focus:outline-none"
              aria-labelledby="solicitud-preparada"
            >
              <div className="border-b border-graphite/10 p-5 md:p-6">
                <p className="eyebrow flex items-center gap-2 text-electric-700">
                  <span className="h-px w-6 bg-electric" aria-hidden="true" />
                  {dict.summaryTitle}
                </p>
                <h2
                  id="solicitud-preparada"
                  className="mt-3 text-xl font-bold tracking-[-0.025em] text-graphite"
                >
                  {dict.preparedTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-graphite/60">
                  {dict.preparedBody}
                </p>
              </div>
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words bg-graphite p-5 font-mono text-[11px] leading-relaxed text-technical/80">
                {preparedText}
              </pre>
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={handleCopy} className="btn-dark">
                    <Icon name="copy" className="h-4 w-4" />
                    {dict.copy}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="btn-outline-dark"
                  >
                    <Icon name="download" className="h-4 w-4" />
                    {dict.download}
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-graphite/60 underline decoration-graphite/30 underline-offset-4 transition-colors hover:text-graphite"
                  >
                    {dict.reset}
                  </button>
                </div>
                {copyStatus === "copied" ? (
                  <p className="mt-3 text-xs font-medium text-electric-700" role="status">
                    {dict.copied}
                  </p>
                ) : null}
                {copyStatus === "error" ? (
                  <p className="mt-3 text-xs font-medium text-danger" role="alert">
                    {dict.copyError}
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="mt-6 border border-graphite/15 bg-white">
              <div className="flex items-center gap-3 border-b border-graphite/10 p-5 md:p-6">
                <span className="font-mono text-[11px] tracking-[0.18em] text-graphite/65">
                  02
                </span>
                <h2 className="text-lg font-bold tracking-[-0.02em] text-graphite">
                  {dict.formTitle}
                </h2>
              </div>
              <div className="p-5 md:p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="quote-name" className="label">
                      {dict.name}{" "}
                      <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "error-quote-name" : undefined}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={dict.namePlaceholder}
                      className="field"
                    />
                    {errors.name ? (
                      <p id="error-quote-name" role="alert" className="field-error">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="quote-email" className="label">
                      {dict.email}{" "}
                      <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "error-quote-email" : undefined}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={dict.emailPlaceholder}
                      className="field"
                    />
                    {errors.email ? (
                      <p id="error-quote-email" role="alert" className="field-error">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="quote-company" className="label">
                      {dict.company}{" "}
                      <span className="font-normal text-graphite/65">
                        ({dict.companyOptional})
                      </span>
                    </label>
                    <input
                      id="quote-company"
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
                    <label htmlFor="quote-phone" className="label">
                      {dict.phone}{" "}
                      <span className="font-normal text-graphite/65">
                        ({dict.phoneOptional})
                      </span>
                    </label>
                    <input
                      id="quote-phone"
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
                    <label htmlFor="quote-city" className="label">
                      {dict.city}{" "}
                      <span className="font-normal text-graphite/65">
                        ({dict.cityOptional})
                      </span>
                    </label>
                    <input
                      id="quote-city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      placeholder={dict.cityPlaceholder}
                      className="field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="quote-notes" className="label">
                      {dict.notes}
                    </label>
                    <textarea
                      id="quote-notes"
                      name="notes"
                      rows={5}
                      maxLength={1200}
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder={dict.notesPlaceholder}
                      className="field resize-y"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-graphite p-6 text-technical lg:sticky lg:top-24">
            <p className="eyebrow flex items-center gap-2 text-technical/60">
              <span className="h-px w-6 bg-amber" aria-hidden="true" />
              {dict.summaryTitle}
            </p>
            <dl className="mt-5 border-b border-white/10 pb-4">
              <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
                <dt className="text-technical/55">{dict.itemsCount}</dt>
                <dd className="font-mono text-technical">{count}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
                <dt className="text-technical/55">{dict.units}</dt>
                <dd className="font-mono text-technical">{units}</dd>
              </div>
            </dl>
            <ul className="mt-4 max-h-56 divide-y divide-white/10 overflow-y-auto border-b border-white/10 pb-2">
              {resolvedLines.map((line) => (
                <li
                  key={line.familyId}
                  className="flex items-start justify-between gap-3 py-2 text-xs"
                >
                  <span className="min-w-0 text-technical/65">
                    {line.familyName}
                  </span>
                  <span className="shrink-0 font-mono text-amber">
                    ×{line.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-technical/60">
              {dict.priceNote}
            </p>
            {preparedText ? (
              <p className="mt-5 border border-electric/40 px-3 py-2.5 text-xs font-semibold text-electric">
                {dict.preparedTitle}
              </p>
            ) : (
              <button type="submit" className="btn-primary mt-5 w-full">
                {dict.prepare}
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            )}
            <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-technical/60">
              {dict.channelNote}
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
