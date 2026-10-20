import {
  getCategory,
  getCategoryName,
  getFamily,
  getFamilyName,
} from "./catalog";
import { getDictionary, type Language } from "./i18n";

export const MAX_QUANTITY = 9999;

export interface QuoteLine {
  familyId: string;
  quantity: number;
}

export interface ResolvedQuoteLine {
  familyId: string;
  quantity: number;
  familyName: string;
  categoryName: string;
  categoryCode: string;
}

export interface QuoteContact {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  city?: string;
  notes?: string;
}

export function normalizeQuantity(value: unknown): number {
  const parsed =
    typeof value === "number" ? value : Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.trunc(parsed)));
}

export function resolveQuoteLines(
  lines: QuoteLine[],
  lang: Language,
): ResolvedQuoteLine[] {
  return lines.flatMap((line) => {
    const family = getFamily(line.familyId);
    if (!family) return [];
    const category = getCategory(family.category);
    if (!category) return [];
    return [
      {
        familyId: family.id,
        quantity: normalizeQuantity(line.quantity),
        familyName: getFamilyName(family, lang),
        categoryName: getCategoryName(category, lang),
        categoryCode: category.code,
      },
    ];
  });
}

export function totalUnits(lines: QuoteLine[]): number {
  return lines.reduce((total, line) => total + normalizeQuantity(line.quantity), 0);
}

export function appendQuoteLinesToMessage(
  message: string,
  lines: QuoteLine[],
  lang: Language,
): string {
  const resolved = resolveQuoteLines(lines, lang);
  if (resolved.length === 0) return message;
  const dict = getDictionary(lang).quote;
  const details = resolved
    .map(
      (line, index) =>
        `${String(index + 1).padStart(2, "0")}. ${line.categoryName} — ${line.familyName} · ${dict.quantityShort} ${line.quantity}`,
    )
    .join("\n");
  return `${message.trim()}\n\n${dict.itemsHeading.toUpperCase()}\n${details}\n\n${dict.priceNote}`.trim();
}

export function buildQuoteText(
  lang: Language,
  lines: QuoteLine[],
  contact: QuoteContact,
  createdAt = new Date(),
): string {
  const dict = getDictionary(lang).quote;
  const resolved = resolveQuoteLines(lines, lang);
  const locale = lang === "en" ? "en-US" : "es-CO";
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    createdAt,
  );

  const contactRows = [
    `${dict.name}: ${contact.name}`,
    contact.company ? `${dict.company}: ${contact.company}` : "",
    `${dict.email}: ${contact.email}`,
    contact.phone ? `${dict.phone}: ${contact.phone}` : "",
    contact.city ? `${dict.city}: ${contact.city}` : "",
  ].filter(Boolean);

  const itemRows = resolved.map(
    (line, index) =>
      `${String(index + 1).padStart(2, "0")}. ${line.categoryName} — ${line.familyName} · ${dict.quantityShort} ${line.quantity}`,
  );

  const blocks = [
    `${dict.requestHeading.toUpperCase()} — G&R ELECTRIC`,
    `${dict.dateLabel}: ${date}`,
    `${dict.contactHeading.toUpperCase()}\n${contactRows.join("\n")}`,
    `${dict.itemsHeading.toUpperCase()}\n${itemRows.length > 0 ? itemRows.join("\n") : dict.noItems}`,
    contact.notes?.trim()
      ? `${dict.notesHeading.toUpperCase()}\n${contact.notes.trim()}`
      : "",
    dict.priceNote,
    lang === "en"
      ? "Request prepared from the website. It has not been sent automatically. Official channels are being confirmed."
      : "Solicitud preparada desde el sitio web. No se ha enviado automáticamente. Los canales oficiales están en proceso de confirmación.",
  ].filter(Boolean);

  return blocks.join("\n\n");
}
