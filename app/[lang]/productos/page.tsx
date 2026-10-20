import type { Metadata } from "next";
import { getDictionary, isLanguage, type Language } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { catalogCategories, productFamilies } from "@/lib/catalog";
import { PageHeader } from "@/components/PageHeader";
import { ProductCatalog } from "@/components/ProductCatalog";

interface CatalogProps {
  params: { lang: string };
}

export function generateMetadata({ params }: CatalogProps): Metadata {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);
  return {
    title: { absolute: dict.meta.productsTitle },
    description: dict.meta.productsDescription,
    alternates: {
      canonical: absoluteUrl(`/${lang}/productos`),
      languages: {
        es: absoluteUrl("/es/productos"),
        en: absoluteUrl("/en/productos"),
        "x-default": absoluteUrl("/es/productos"),
      },
    },
    openGraph: {
      title: dict.meta.productsTitle,
      description: dict.meta.productsDescription,
      url: absoluteUrl(`/${lang}/productos`),
    },
  };
}

export default function CatalogPage({ params }: CatalogProps) {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);

  return (
    <>
      <PageHeader
        eyebrow={dict.catalog.eyebrow}
        title={dict.catalog.title}
        description={dict.catalog.description}
        titleId="catalogo-titulo"
      />
      <section className="bg-technical py-10 md:py-14" aria-labelledby="catalogo-titulo">
        <div className="container-gyr">
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-graphite/15 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-graphite/65">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-amber" aria-hidden="true" />
              {String(catalogCategories.length).padStart(2, "0")}{" "}
              {dict.catalog.linePlural}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-electric" aria-hidden="true" />
              {String(productFamilies.length).padStart(2, "0")}{" "}
              {dict.catalog.familyPlural}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-graphite/30" aria-hidden="true" />
              {dict.catalog.quoteOnRequest}
            </span>
          </div>
          <ProductCatalog lang={lang} dict={dict.catalog} />
        </div>
      </section>
    </>
  );
}
