import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLanguage, type Language } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import {
  catalogCategories,
  countFamilies,
  getCategoryName,
  productFamilies,
} from "@/lib/catalog";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";

interface AboutProps {
  params: { lang: string };
}

export function generateMetadata({ params }: AboutProps): Metadata {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);
  return {
    title: { absolute: dict.meta.aboutTitle },
    description: dict.meta.aboutDescription,
    alternates: {
      canonical: absoluteUrl(`/${lang}/nosotros`),
      languages: {
        es: absoluteUrl("/es/nosotros"),
        en: absoluteUrl("/en/nosotros"),
        "x-default": absoluteUrl("/es/nosotros"),
      },
    },
    openGraph: {
      title: dict.meta.aboutTitle,
      description: dict.meta.aboutDescription,
      url: absoluteUrl(`/${lang}/nosotros`),
    },
  };
}

export default function AboutPage({ params }: AboutProps) {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);
  const about = dict.about;

  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.description}
        titleId="nosotros-titulo"
      />

      <section className="bg-technical py-16 md:py-24" aria-labelledby="intro-titulo">
        <div className="container-gyr grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={about.focusTitle}
              title={about.introTitle}
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-graphite/65 md:text-lg">
              {about.introBody.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-px border border-graphite/15 bg-graphite/15 sm:grid-cols-3">
              {about.principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 70}>
                  <article className="h-full bg-technical p-5">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-amber-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-base font-semibold tracking-[-0.015em] text-graphite">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite/65">
                      {principle.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-5">
            <aside className="tech-grid-dark relative overflow-hidden bg-graphite p-7 text-technical md:p-8">
              <p className="eyebrow flex items-center gap-3 text-technical/60">
                <span className="h-px w-7 bg-amber" aria-hidden="true" />
                {lang === "en" ? "Operating profile" : "Perfil operativo"}
              </p>
              <h2 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.03em]">
                {about.focusTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-technical/60">
                {about.focusBody}
              </p>
              <dl className="mt-8 border-t border-white/10">
                {[
                  {
                    label: dict.catalog.linePlural,
                    value: String(catalogCategories.length).padStart(2, "0"),
                  },
                  {
                    label: dict.catalog.familyPlural,
                    value: String(productFamilies.length).padStart(2, "0"),
                  },
                  {
                    label: lang === "en" ? "Service" : "Atención",
                    value: dict.catalog.quoteOnRequest,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-technical/60">
                      {row.label}
                    </dt>
                    <dd className="text-right text-sm font-semibold text-technical">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-technical/60">
                {about.note}
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      <section
        className="border-y border-graphite/10 bg-white py-16 md:py-24"
        aria-labelledby="lineas-nosotros"
      >
        <div className="container-gyr">
          <SectionHeading
            eyebrow={dict.catalog.eyebrow}
            title={about.categoriesTitle}
            description={about.categoriesBody}
          />
          <div className="mt-10 grid gap-px border border-graphite/15 bg-graphite/15 md:grid-cols-2">
            {catalogCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/${lang}/productos?linea=${category.slug}`}
                className="group flex items-start gap-4 bg-white p-5 transition-colors hover:bg-technical md:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-graphite/15 text-graphite transition-colors group-hover:border-amber-600 group-hover:text-amber-700">
                  <Icon name={category.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite/65">
                    {dict.catalog.linePlural} {category.code}
                    <span className="h-px w-3 bg-graphite/20" aria-hidden="true" />
                    {countFamilies(category.slug)} {dict.catalog.familyPlural}
                  </span>
                  <span className="mt-1 block text-base font-semibold tracking-[-0.015em] text-graphite">
                    {getCategoryName(category, lang)}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-graphite/65">
                    {lang === "en"
                      ? category.descriptionEn
                      : category.descriptionEs}
                  </span>
                </span>
                <Icon
                  name="arrowUpRight"
                  className="mt-1 h-4 w-4 shrink-0 text-graphite/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-700"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-graphite py-16 text-technical md:py-24"
        aria-labelledby="proceso-nosotros"
      >
        <div
          className="tech-grid-dark pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div className="container-gyr relative grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={dict.process.eyebrow}
              title={about.processTitle}
              description={about.processBody}
              dark
            />
          </div>
          <div className="lg:col-span-8">
            <ol className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {dict.process.steps.map((step, index) => (
                <li key={step.title} className="bg-graphite p-5 md:p-6">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold tracking-[-0.015em] text-technical">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-technical/60">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-technical/60">
              * {about.note}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-amber text-graphite">
        <div className="container-gyr grid gap-7 py-14 md:grid-cols-12 md:items-center md:py-16">
          <div className="md:col-span-8">
            <p className="eyebrow flex items-center gap-3 text-graphite/90">
              <span className="h-px w-8 bg-graphite/40" aria-hidden="true" />
              {about.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              {about.ctaTitle}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-graphite/85">
              {about.ctaBody}
            </p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-4">
            <Link href={`/${lang}/productos`} className="btn-dark w-full">
              {about.ctaPrimary}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href={`/${lang}/cotizacion`}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xs border border-graphite/30 px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-graphite/5"
            >
              {about.ctaSecondary}
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
