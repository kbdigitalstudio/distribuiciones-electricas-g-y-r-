/**
 * Identidad y datos centrales del sitio.
 *
 * IMPORTANTE: los canales comerciales (teléfono, correo, WhatsApp y
 * dirección exacta) NO están confirmados por la empresa. No se publican
 * como datos definitivos ni se usan para generar enlaces de envío.
 * Ver README para los candidatos encontrados en fuentes públicas.
 */
export const BRAND_NAME = "Distribuciones Eléctricas G&R SAS";
export const BRAND_SHORT = "G&R";
export const BRAND_DESCRIPTOR = "Distribuciones Eléctricas";
export const COMMERCIAL_NAME = "G&R Electric";

export const SLOGAN_ES = "La energía de tus proyectos.";
export const SLOGAN_EN = "The energy behind your projects.";
export const SUPPORT_ES =
  "Materiales eléctricos para conectar ideas, instalaciones y soluciones.";
export const SUPPORT_EN =
  "Electrical materials that connect ideas, installations and solutions.";

export const COMPANY_CITY = "Bogotá D.C., Colombia";

export const CONTACT_STATUS = "pending-confirmation" as const;

export const CONTACT_NOTICE_ES =
  "Los canales oficiales de teléfono y correo están en proceso de confirmación. Por ahora, la solicitud se prepara y se revisa en este dispositivo antes de compartirla.";
export const CONTACT_NOTICE_EN =
  "Official phone and email channels are being confirmed. For now, your request is prepared and reviewed on this device before you share it.";

/**
 * URL canónica provisional. Si NEXT_PUBLIC_SITE_URL no está definida,
 * el sitio usa un dominio de referencia que NO resuelve. Debe configurarse
 * antes de publicar para evitar canónicas y sitemap incorrectos.
 */
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const SITE_URL = (configuredSiteUrl || "https://www.gyrsas.com").replace(
  /\/$/,
  "",
);
export const IS_SITE_URL_PROVISIONAL = !configuredSiteUrl;

export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
