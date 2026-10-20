import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLanguage, type Language } from "@/lib/i18n";
import { absoluteUrl, COMPANY_CITY } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";

interface ContactProps {
  params: { lang: string };
}

export function generateMetadata({ params }: ContactProps): Metadata {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);
  return {
    title: { absolute: dict.meta.contactTitle },
    description: dict.meta.contactDescription,
    alternates: {
      canonical: absoluteUrl(`/${lang}/contacto`),
      languages: {
        es: absoluteUrl("/es/contacto"),
        en: absoluteUrl("/en/contacto"),
        "x-default": absoluteUrl("/es/contacto"),
      },
    },
    openGraph: {
      title: dict.meta.contactTitle,
      description: dict.meta.contactDescription,
      url: absoluteUrl(`/${lang}/contacto`),
    },
  };
}

export default function ContactPage({ params }: ContactProps) {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);
  const contact = dict.contact;

  return (
    <>
      <PageHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.description}
        titleId="contacto-titulo"
      />

      <section className="bg-technical py-12 md:py-16" aria-labelledby="contacto-titulo">
        <div className="container-gyr grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="border border-graphite/15 bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-graphite/10 pb-4">
                <span className="font-mono text-[11px] tracking-[0.18em] text-graphite/65">
                  01
                </span>
                <h2 className="text-xl font-bold tracking-[-0.025em] text-graphite">
                  {contact.formTitle}
                </h2>
              </div>
              <ContactForm lang={lang} dict={contact} />
            </div>
          </Reveal>

          <div className="space-y-6 lg:col-span-5">
            <Reveal delay={80}>
              <aside
                className="tech-grid-dark relative overflow-hidden bg-graphite p-6 text-technical md:p-7"
                aria-labelledby="info-contacto"
              >
                <p className="eyebrow flex items-center gap-3 text-technical/60">
                  <span className="h-px w-7 bg-amber" aria-hidden="true" />
                  {contact.eyebrow}
                </p>
                <h2
                  id="info-contacto"
                  className="mt-4 text-2xl font-bold tracking-[-0.03em]"
                >
                  {contact.infoTitle}
                </h2>
                <p className="mt-4 flex items-start gap-2.5 text-sm text-technical/75">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {COMPANY_CITY}
                </p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-technical/60">
                    <span className="h-1.5 w-1.5 bg-amber" aria-hidden="true" />
                    {contact.statusLabel}: {contact.statusValue}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-technical/55">
                    {contact.infoBody}
                  </p>
                </div>
                <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-technical/60">
                  {dict.footer.channelNote}
                </p>
              </aside>
            </Reveal>

            <Reveal delay={140}>
              <aside
                className="border border-graphite/15 bg-white p-6 md:p-7"
                aria-labelledby="antes-contacto"
              >
                <h2
                  id="antes-contacto"
                  className="text-lg font-semibold tracking-[-0.02em] text-graphite"
                >
                  {contact.beforeTitle}
                </h2>
                <ul className="mt-4 space-y-3">
                  {contact.beforeItems.map((item, index) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-graphite/65">
                      <span className="mt-0.5 font-mono text-[11px] text-amber-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${lang}/cotizacion`}
                  className="mt-5 inline-flex items-center gap-2 border-b border-graphite/30 pb-1 text-sm font-semibold text-graphite transition-colors hover:border-amber-600 hover:text-amber-700"
                >
                  {dict.footer.quoteCta}
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                </Link>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
