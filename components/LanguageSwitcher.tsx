"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Language } from "@/lib/i18n";
import { Icon } from "./Icons";

interface LanguageSwitcherProps {
  lang: Language;
}

/** Cambia ES/EN conservando la ruta actual. */
export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const other: Language = lang === "es" ? "en" : "es";
  const target = pathname.replace(/^\/(es|en)/, `/${other}`);

  return (
    <Link
      href={target}
      hrefLang={other}
      aria-label={
        lang === "es"
          ? "Cambiar el sitio a inglés"
          : "Cambiar el sitio a español"
      }
      className="inline-flex h-10 items-center gap-1.5 rounded-xs border border-white/20 px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-technical/70 transition-colors hover:border-amber hover:text-amber"
    >
      <Icon name="globe" className="h-3.5 w-3.5" />
      <span className="text-technical/60">{lang}</span>
      <span aria-hidden="true" className="text-white/20">
        /
      </span>
      <span className="text-technical">{other}</span>
    </Link>
  );
}
