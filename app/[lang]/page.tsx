import type { Metadata } from "next";
import { getDictionary, isLanguage, type Language } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import {
  Hero,
  ProcessBand,
  CategoryShowcase,
  FeaturedFamilies,
  ValueSection,
  CtaBand,
} from "@/components/home/Sections";

interface HomeProps {
  params: { lang: string };
}

export function generateMetadata({ params }: HomeProps): Metadata {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);
  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    alternates: {
      canonical: absoluteUrl(`/${lang}`),
      languages: {
        es: absoluteUrl("/es"),
        en: absoluteUrl("/en"),
        "x-default": absoluteUrl("/es"),
      },
    },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      url: absoluteUrl(`/${lang}`),
    },
  };
}

export default function HomePage({ params }: HomeProps) {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  return (
    <>
      <Hero lang={lang} />
      <ProcessBand lang={lang} />
      <CategoryShowcase lang={lang} />
      <FeaturedFamilies lang={lang} />
      <ValueSection lang={lang} />
      <CtaBand lang={lang} />
    </>
  );
}
