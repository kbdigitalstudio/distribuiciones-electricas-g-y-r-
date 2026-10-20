import Link from "next/link";
import Image from "next/image";
import type { Language } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import {
  catalogCategories,
  countFamilies,
  getCategory,
  getCategoryName,
  getFamily,
  getFamilyName,
} from "@/lib/catalog";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icons";
import { AddToQuoteButton } from "@/components/catalog/AddToQuoteButton";

interface SectionProps {
  lang: Language;
}

const featuredIds = [
  "conductores-thhn-thwn",
  "tuberia-pvc",
  "transformadores-monofasicos",
  "tierra-varillas",
];

export function Hero({ lang }: SectionProps) {
  const dict = getDictionary(lang).hero;

  return (
    <section
      className="relative overflow-hidden bg-graphite text-technical"
      aria-labelledby="titulo-hero"
    >
      <div
        className="tech-grid-dark pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/[0.025] to-transparent"
        aria-hidden="true"
      />

      <div className="container-gyr relative grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-24">
        <div className="min-w-0 lg:col-span-7">
          <p className="eyebrow flex flex-wrap items-center gap-3 text-technical/55">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 bg-amber" />
              <span className="node-in absolute -inset-1 border border-amber/40" />
            </span>
            {dict.eyebrow}
          </p>

          <h1
            id="titulo-hero"
            className="mt-6 max-w-4xl text-[clamp(2.9rem,6.3vw,5.2rem)] font-extrabold leading-[0.96] tracking-[-0.055em]"
          >
            {dict.titleA}{" "}
            <span className="text-amber">{dict.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-technical/65 md:text-xl">
            {dict.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/${lang}/productos`} className="btn-primary">
              {dict.primaryCta}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href={`/${lang}/cotizacion`} className="btn-outline-light">
              {dict.secondaryCta}
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:ml-auto lg:max-w-none">
            <span
              className="absolute -left-3 bottom-8 top-8 hidden w-px bg-amber/35 sm:block"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite-800">
              <Image
                src="/images/hero-electrical-panel.jpg"
                alt={
                  lang === "en"
                    ? "Electrical distribution panel with breakers, reference image"
                    : "Panel de distribución eléctrica con interruptores, imagen de referencia"
                }
                fill
                priority
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 100vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span className="border border-white/20 bg-graphite/80 px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-technical/80">
                  {dict.imageLabel}
                </span>
                <span className="bg-amber px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite">
                  {dict.chip}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <p className="max-w-[240px] font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-technical/65">
                  {dict.imageCaption}
                </p>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-amber/40 text-amber"
                  aria-hidden="true"
                >
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-gyr grid gap-2 py-4 sm:grid-cols-3">
          {dict.rail.map((item, index) => (
            <p
              key={item}
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-technical/60"
            >
              <span className="text-amber" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
              <span className="normal-case tracking-[0.12em]">{item}</span>
            </p>
          ))}
        </div>
        <div
          className="rule-draw h-px w-full bg-gradient-to-r from-amber via-amber/30 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export function ProcessBand({ lang }: SectionProps) {
  const dict = getDictionary(lang).process;
  return (
    <section
      className="border-b border-graphite/10 bg-technical"
      aria-labelledby="proceso-titulo"
    >
      <div className="container-gyr py-14 md:py-20">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={dict.eyebrow}
              title={dict.title}
              description={dict.description}
            />
          </div>
          <div className="lg:col-span-8">
            <ol className="grid gap-px border border-graphite/15 bg-graphite/15 sm:grid-cols-2">
              {dict.steps.map((step, index) => (
                <li key={step.title} className="bg-technical p-5 sm:p-6">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-amber-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold tracking-[-0.015em] text-graphite">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite/65">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-graphite/65">
              {dict.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategoryShowcase({ lang }: SectionProps) {
  const dict = getDictionary(lang).categories;
  const [lead, ...rest] = catalogCategories;
  const leadName = getCategoryName(lead, lang);
  const leadAlt = lang === "en" ? lead.imageAltEn : lead.imageAltEs;

  return (
    <section
      className="border-b border-graphite/10 bg-white py-16 md:py-24"
      aria-labelledby="lineas-titulo"
    >
      <div className="container-gyr">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />
          <Link
            href={`/${lang}/productos`}
            className="inline-flex shrink-0 items-center gap-2 border-b border-graphite/30 pb-1 text-sm font-semibold text-graphite transition-colors hover:border-amber-600 hover:text-amber-700"
          >
            {dict.viewAll}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Link
              href={`/${lang}/productos?linea=${lead.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden bg-graphite"
            >
              <Image
                src={lead.image}
                alt={leadAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-precise group-hover:scale-[1.025]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/35 to-graphite/5"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-5">
                <span className="border border-white/20 bg-graphite/55 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-technical/75">
                  {dict.lineLabel} {lead.code}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-technical/60">
                  {countFamilies(lead.slug)} {dict.families}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <h3 className="text-2xl font-bold tracking-[-0.035em] text-technical md:text-3xl">
                  {leadName}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-technical/65">
                  {lang === "en" ? lead.descriptionEn : lead.descriptionEs}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber">
                  {dict.explore}
                  <Icon
                    name="arrowUpRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="lg:col-span-6">
            <ul className="border-t border-graphite/15">
              {rest.map((category) => {
                const name = getCategoryName(category, lang);
                return (
                  <li key={category.slug} className="border-b border-graphite/15">
                    <Link
                      href={`/${lang}/productos?linea=${category.slug}`}
                      className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 py-3.5 sm:grid-cols-[96px_1fr_auto] sm:gap-5"
                    >
                      <span className="relative block h-16 overflow-hidden bg-graphite/5 sm:h-[74px]">
                        <Image
                          src={category.image}
                          alt={lang === "en" ? category.imageAltEn : category.imageAltEs}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-500 ease-precise group-hover:scale-105"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/65">
                          {dict.lineLabel} {category.code}
                          <span className="h-px w-4 bg-graphite/20" aria-hidden="true" />
                          {countFamilies(category.slug)} {dict.families}
                        </span>
                        <span className="mt-1 block text-base font-semibold tracking-[-0.015em] text-graphite transition-colors group-hover:text-amber-700 sm:text-lg">
                          {name}
                        </span>
                        <span className="mt-1 hidden text-xs leading-relaxed text-graphite/65 sm:block">
                          {lang === "en"
                            ? category.descriptionEn
                            : category.descriptionEs}
                        </span>
                      </span>
                      <Icon
                        name="arrowUpRight"
                        className="mr-1 h-5 w-5 text-graphite/65 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-700"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-graphite/65">
          * {dict.imageNote}. {getDictionary(lang).catalog.quoteNote}
        </p>
      </div>
    </section>
  );
}

export function FeaturedFamilies({ lang }: SectionProps) {
  const dict = getDictionary(lang).featured;
  const families = featuredIds
    .map((id) => getFamily(id))
    .filter((family): family is NonNullable<typeof family> => Boolean(family));

  return (
    <section
      className="border-b border-graphite/10 bg-technical py-16 md:py-24"
      aria-labelledby="seleccion-titulo"
    >
      <div className="container-gyr">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />
          <Link
            href={`/${lang}/productos`}
            className="btn-outline-dark shrink-0"
          >
            {dict.viewAll}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-px border border-graphite/15 bg-graphite/15 sm:grid-cols-2 lg:grid-cols-4">
          {families.map((family, index) => {
            const category = getCategory(family.category);
            if (!category) return null;
            return (
              <Reveal key={family.id} delay={Math.min(index * 60, 180)}>
                <article className="flex h-full min-h-[250px] flex-col bg-technical p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-graphite/65">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-graphite/65">
                      {getCategoryName(category, lang)}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-bold leading-tight tracking-[-0.03em] text-graphite">
                    {getFamilyName(family, lang)}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-graphite/65">
                    {dict.quoteNote}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-graphite/10 pt-5">
                    <AddToQuoteButton
                      familyId={family.id}
                      addLabel={dict.add}
                      addedLabel={dict.added}
                      className="min-w-0"
                    />
                    <Icon
                      name={category.icon}
                      className="h-5 w-5 shrink-0 text-graphite/50"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ValueSection({ lang }: SectionProps) {
  const dict = getDictionary(lang).value;
  const imageCategory = getCategory("transformadores");
  if (!imageCategory) return null;

  return (
    <section
      className="relative overflow-hidden bg-graphite text-technical"
      aria-labelledby="criterio-titulo"
    >
      <div
        className="tech-grid-dark pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div className="container-gyr relative grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
            <Image
              src={imageCategory.image}
              alt={lang === "en" ? imageCategory.imageAltEn : imageCategory.imageAltEs}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-transparent to-transparent"
              aria-hidden="true"
            />
            <p className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] uppercase tracking-[0.14em] text-technical/65">
              {dict.imageCaption}
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
            dark
          />
          <ul className="mt-8 border-t border-white/10">
            {dict.points.map((point, index) => (
              <li
                key={point.title}
                className="grid grid-cols-[auto_1fr] gap-4 border-b border-white/10 py-4"
              >
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center border border-amber/35 text-amber">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-technical">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-technical/55">
                    {point.description}
                  </p>
                </div>
                <span className="sr-only">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
          <Link href={`/${lang}/cotizacion`} className="btn-primary mt-8">
            {dict.cta}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ lang }: SectionProps) {
  const dict = getDictionary(lang).cta;
  return (
    <section className="bg-amber text-graphite" aria-labelledby="cta-titulo">
      <div className="container-gyr grid gap-8 py-14 md:grid-cols-12 md:items-center md:py-16">
        <div className="md:col-span-8">
          <p className="eyebrow flex items-center gap-3 text-graphite/90">
            <span className="h-px w-8 bg-graphite/40" aria-hidden="true" />
            {dict.eyebrow}
          </p>
          <h2
            id="cta-titulo"
            className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.045em]"
          >
            {dict.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite/85">
            {dict.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4">
          <Link href={`/${lang}/cotizacion`} className="btn-dark w-full">
            {dict.primary}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link
            href={`/${lang}/productos`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs border border-graphite/30 px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-graphite/5"
          >
            {dict.secondary}
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
