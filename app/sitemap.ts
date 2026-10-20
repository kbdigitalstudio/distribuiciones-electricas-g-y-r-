import type { MetadataRoute } from "next";
import { languages } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/productos", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/nosotros", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contacto", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return languages.flatMap((lang) =>
    routes.map((route) => ({
      url: absoluteUrl(`/${lang}${route.path}`),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          es: absoluteUrl(`/es${route.path}`),
          en: absoluteUrl(`/en${route.path}`),
          "x-default": absoluteUrl(`/es${route.path}`),
        },
      },
    })),
  );
}
