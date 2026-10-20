import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary, isLanguage, languages, type Language } from "@/lib/i18n";
import { BRAND_NAME, SITE_URL } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteProvider } from "@/components/quote/QuoteProvider";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#101820",
  colorScheme: "light",
};

interface LangLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export function generateMetadata({ params }: LangLayoutProps): Metadata {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.homeTitle,
      template: `%s | ${BRAND_NAME}`,
    },
    description: dict.meta.homeDescription,
    applicationName: BRAND_NAME,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_US" : "es_CO",
      alternateLocale: lang === "en" ? "es_CO" : "en_US",
      siteName: BRAND_NAME,
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      images: [
        {
          url: "/images/hero-electrical-panel.jpg",
          width: 1800,
          height: 2700,
          alt:
            lang === "en"
              ? "Electrical distribution panel, reference image"
              : "Panel de distribución eléctrica, imagen de referencia",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      images: ["/images/hero-electrical-panel.jpg"],
    },
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  const lang: Language = isLanguage(params.lang) ? params.lang : "es";
  const dict = getDictionary(lang);

  return (
    <html lang={lang}>
      <body
        className={`${sans.variable} ${mono.variable} min-h-screen bg-technical font-sans text-graphite antialiased`}
      >
        <QuoteProvider>
          <Header lang={lang} labels={dict.nav} header={dict.header} />
          <main id="contenido">{children}</main>
          <Footer lang={lang} dict={dict} />
        </QuoteProvider>
      </body>
    </html>
  );
}
