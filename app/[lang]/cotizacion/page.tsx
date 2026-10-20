import type { Metadata } from "next";
import { getDictionary, isLanguage, type Language } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { QuoteRequest } from "@/components/quote/QuoteRequest";

interface QuotePageProps {
  params: { lang: string };
}

export function generateMetadata({ params }: QuotePageProps): Metadata {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);
  return {
    title: { absolute: dict.meta.quoteTitle },
    description: dict.meta.quoteDescription,
    alternates: {
      canonical: absoluteUrl(`/${lang}/cotizacion`),
      languages: {
        es: absoluteUrl("/es/cotizacion"),
        en: absoluteUrl("/en/cotizacion"),
        "x-default": absoluteUrl("/es/cotizacion"),
      },
    },
    openGraph: {
      title: dict.meta.quoteTitle,
      description: dict.meta.quoteDescription,
      url: absoluteUrl(`/${lang}/cotizacion`),
    },
    robots: { index: false, follow: true },
  };
}

export default function QuotePage({ params }: QuotePageProps) {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);

  return (
    <>
      <PageHeader
        eyebrow={dict.quote.eyebrow}
        title={dict.quote.title}
        description={dict.quote.description}
        titleId="cotizacion-titulo"
      />
      <section className="bg-technical py-10 md:py-14" aria-labelledby="cotizacion-titulo">
        <div className="container-gyr">
          <div className="mb-8 flex flex-col gap-2 border-y border-graphite/15 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-graphite/65 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-amber" aria-hidden="true" />
              {dict.quote.localNote}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-electric" aria-hidden="true" />
              {dict.quote.channelNote}
            </span>
          </div>
          <QuoteRequest lang={lang} dict={dict.quote} />
        </div>
      </section>
    </>
  );
}
