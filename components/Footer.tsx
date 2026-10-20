import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Language } from "@/lib/i18n";
import { BRAND_NAME, BRAND_SHORT } from "@/lib/site";
import { catalogCategories, getCategoryName } from "@/lib/catalog";
import { Icon } from "./Icons";

interface FooterProps {
  lang: Language;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-graphite text-technical">
      <div className="container-gyr py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_1fr_1.2fr] lg:gap-12">
          <div>
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-3"
              aria-label={`${BRAND_NAME} — ${dict.nav.home}`}
            >
              <span className="flex h-12 w-12 items-center justify-center bg-technical p-1">
                <Image
                  src="/images/logo-gyr-crop.png"
                  alt={`${BRAND_NAME} — logotipo`}
                  width={544}
                  height={506}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-[-0.04em] text-technical">
                  G<span className="text-amber">&</span>R
                </span>
                <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-technical/60">
                  {BRAND_SHORT} Electric
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-technical/60">
              {dict.footer.tagline}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-technical/55">
              <span className="h-1.5 w-1.5 bg-amber" aria-hidden="true" />
              {dict.footer.statusLabel}: {dict.footer.statusValue}
            </p>
          </div>

          <nav aria-label={dict.footer.company}>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-technical/60">
              {dict.footer.company}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: `/${lang}`, label: dict.nav.home },
                { href: `/${lang}/productos`, label: dict.nav.products },
                { href: `/${lang}/nosotros`, label: dict.nav.about },
                { href: `/${lang}/contacto`, label: dict.nav.contact },
                { href: `/${lang}/cotizacion`, label: dict.footer.quoteCta },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    className="inline-flex items-center gap-2 text-technical/65 transition-colors hover:text-amber"
                    href={link.href}
                  >
                    <span
                      className="h-px w-2 bg-technical/20"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.catalog}>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-technical/60">
              {dict.footer.catalog}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {catalogCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    className="inline-flex items-center gap-2 text-technical/65 transition-colors hover:text-amber"
                    href={`/${lang}/productos?linea=${category.slug}`}
                  >
                    <span
                      className="font-mono text-[10px] text-technical/55"
                      aria-hidden="true"
                    >
                      {category.code}
                    </span>
                    {getCategoryName(category, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-technical/60">
              {dict.footer.contactTitle}
            </h2>
            <p className="mt-4 flex items-start gap-2 text-sm text-technical/70">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              {dict.footer.location}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-technical/60">
              {dict.footer.channelNote}
            </p>
            <Link
              href={`/${lang}/cotizacion`}
              className="mt-5 inline-flex items-center gap-2 border-b border-amber/50 pb-1 text-sm font-semibold text-amber transition-colors hover:border-amber"
            >
              {dict.footer.quoteCta}
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-gyr flex flex-col justify-between gap-3 py-5 text-xs text-technical/60 sm:flex-row sm:items-center">
          <p>
            © {year} {BRAND_NAME}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
              {BRAND_SHORT} Electric · BT / MT
            </span>
            <a
              href="#contenido"
              className="transition-colors hover:text-amber"
            >
              {dict.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
