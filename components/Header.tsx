"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Language, NavLabels } from "@/lib/i18n";
import { BRAND_NAME, BRAND_DESCRIPTOR } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "./Icons";
import { useQuote } from "./quote/QuoteProvider";

interface HeaderProps {
  lang: Language;
  labels: NavLabels;
  header: Dictionary["header"];
}

const routes = [
  { key: "home", href: "" },
  { key: "products", href: "/productos" },
  { key: "about", href: "/nosotros" },
  { key: "contact", href: "/contacto" },
] as const;

export function Header({ lang, labels, header }: HeaderProps) {
  const pathname = usePathname() ?? "";
  const { count } = useQuote();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const links = routes.map((route) => ({
    ...route,
    href: `/${lang}${route.href}`,
    label: labels[route.key],
  }));
  const quoteHref = `/${lang}/cotizacion`;

  const isActive = (href: string) =>
    pathname === href || (href !== `/${lang}` && pathname.startsWith(href));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-graphite/95 backdrop-blur-md">
      <a
        href="#contenido"
        className="sr-only z-[60] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:inline-flex focus:min-h-11 focus:items-center focus:bg-amber focus:px-4 focus:text-sm focus:font-semibold focus:text-graphite"
      >
        {labels.skipToContent}
      </a>

      <div className="container-gyr flex h-[72px] items-center justify-between gap-5">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center gap-3 rounded-xs"
          aria-label={`${BRAND_NAME} — ${labels.home}`}
        >
          <span className="flex h-11 w-11 items-center justify-center bg-technical p-1">
            <Image
              src="/images/logo-gyr-crop.png"
              alt={`${BRAND_NAME} — logotipo`}
              width={544}
              height={506}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[17px] font-extrabold tracking-[-0.04em] text-technical">
              G<span className="text-amber">&</span>R
            </span>
            <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-technical/55">
              {BRAND_DESCRIPTOR}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label={lang === "en" ? "Main navigation" : "Navegación principal"}
        >
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-technical"
                    : "text-technical/65 hover:text-technical"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px bg-amber transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher lang={lang} />

          <Link
            href={quoteHref}
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-xs border transition-colors ${
              isActive(quoteHref)
                ? "border-amber/60 text-amber"
                : "border-white/20 text-technical/75 hover:border-amber hover:text-amber"
            }`}
            aria-label={`${header.quoteList}${
              count > 0
                ? ` — ${count} ${count === 1 ? header.quoteCountOne : header.quoteCount}`
                : ""
            }`}
          >
            <Icon name="quote" className="h-[18px] w-[18px]" />
            {count > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-amber px-1 font-mono text-[10px] font-bold leading-none text-graphite">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Link>

          <Link
            href={quoteHref}
            className="hidden min-h-10 items-center justify-center gap-2 rounded-xs bg-amber px-4 py-2.5 text-[13px] font-semibold text-graphite transition-colors hover:bg-amber-400 md:inline-flex"
          >
            {header.quoteCta}
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </Link>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? labels.menuClose : labels.menuOpen}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xs border border-white/20 text-technical transition-colors hover:border-amber hover:text-amber lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="menu-movil"
        hidden={!open}
        className="absolute inset-x-0 top-full min-h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] overflow-y-auto border-b border-white/10 bg-graphite shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] lg:hidden"
      >
        <nav
          className="container-gyr py-5"
          aria-label={lang === "en" ? "Mobile navigation" : "Navegación móvil"}
        >
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {links.map((link, index) => {
              const active = isActive(link.href);
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-14 items-center justify-between gap-4 py-3 text-base font-medium transition-colors ${
                      active ? "text-amber" : "text-technical/80 hover:text-technical"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-technical/55">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={quoteHref}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center justify-between gap-4 py-3 text-base font-medium text-technical/80 transition-colors hover:text-technical"
              >
                <span>{labels.quote}</span>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-amber">
                  {count > 0
                    ? `${count} ${count === 1 ? header.quoteCountOne : header.quoteCount}`
                    : "00"}
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                </span>
              </Link>
            </li>
          </ul>
          <Link
            href={quoteHref}
            onClick={() => setOpen(false)}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xs bg-amber px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-amber-400"
          >
            {header.quoteCta}
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
