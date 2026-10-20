"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Dictionary, Language } from "@/lib/i18n";
import {
  catalogCategories,
  getCategory,
  getCategoryName,
  getFamilyName,
  productFamilies,
  type CategorySlug,
  type ProductFamily,
} from "@/lib/catalog";
import { AddToQuoteButton } from "./catalog/AddToQuoteButton";
import { Icon } from "./Icons";

type CategoryFilter = CategorySlug | "all";
type SortMode = "category" | "name";

const catalogOrder = new Map(
  productFamilies.map((family, index) => [family.id, index]),
);

interface ProductCatalogProps {
  lang: Language;
  dict: Dictionary["catalog"];
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function priceLabel(family: ProductFamily, lang: Language): string | null {
  if (!family.price) return null;
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "es-CO", {
    style: "currency",
    currency: family.price.currency,
    maximumFractionDigits: 0,
  }).format(family.price.amount);
}

export function ProductCatalog({ lang, dict }: ProductCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortMode>("category");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("linea");
    if (requested && catalogCategories.some((item) => item.slug === requested)) {
      setCategory(requested as CategorySlug);
    }
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query);
    const matches = productFamilies.filter((family) => {
      const familyCategory = getCategory(family.category);
      if (!familyCategory) return false;
      if (category !== "all" && family.category !== category) return false;
      if (!normalizedQuery) return true;
      const haystack = normalize(
        [
          family.nameEs,
          family.nameEn,
          familyCategory.nameEs,
          familyCategory.nameEn,
          familyCategory.descriptionEs,
          familyCategory.descriptionEn,
          familyCategory.code,
          family.reference ?? "",
          family.brand ?? "",
        ].join(" "),
      );
      return haystack.includes(normalizedQuery);
    });

    return matches.sort((a, b) => {
      if (sort === "name") {
        return getFamilyName(a, lang).localeCompare(
          getFamilyName(b, lang),
          lang === "en" ? "en" : "es",
        );
      }
      const categoryOrder = catalogCategories.findIndex(
        (item) => item.slug === a.category,
      );
      const otherCategoryOrder = catalogCategories.findIndex(
        (item) => item.slug === b.category,
      );
      if (categoryOrder !== otherCategoryOrder) {
        return categoryOrder - otherCategoryOrder;
      }
      // Dentro de cada línea conservamos el orden editorial del catálogo.
      return (catalogOrder.get(a.id) ?? 0) - (catalogOrder.get(b.id) ?? 0);
    });
  }, [query, category, sort, lang]);

  const hasFilters = query.trim().length > 0 || category !== "all";
  const resultWord =
    filtered.length === 1 ? dict.familySingular : dict.familyPlural;

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div>
      <div className="border border-graphite/15 bg-white">
        <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-end md:p-6">
          <div>
            <label htmlFor="catalog-search" className="label">
              {dict.searchLabel}
            </label>
            <div className="relative">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/65"
              />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={dict.searchPlaceholder}
                autoComplete="off"
                className="field pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-52">
            <label htmlFor="catalog-sort" className="label">
              {dict.sortLabel}
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="field cursor-pointer py-[11px]"
            >
              <option value="category">{dict.sortCategory}</option>
              <option value="name">{dict.sortName}</option>
            </select>
          </div>
        </div>

        <div className="border-t border-graphite/10 p-5 md:p-6">
          <p className="eyebrow mb-3 text-graphite/65">{dict.categoryFilter}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label={dict.categoryFilter}>
            <FilterButton
              active={category === "all"}
              onClick={() => setCategory("all")}
              label={dict.allCategories}
            />
            {catalogCategories.map((item) => (
              <FilterButton
                key={item.slug}
                active={category === item.slug}
                onClick={() =>
                  setCategory(category === item.slug ? "all" : item.slug)
                }
                label={getCategoryName(item, lang)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-b border-graphite/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-graphite/65"
          aria-live="polite"
        >
          {dict.resultsPrefix} {filtered.length} {dict.of}{" "}
          {productFamilies.length} {resultWord}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-2 self-start text-xs font-semibold text-graphite underline decoration-graphite/30 underline-offset-4 transition-colors hover:text-amber-700 sm:self-auto"
          >
            <Icon name="close" className="h-3.5 w-3.5" />
            {dict.clearFilters}
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 border border-dashed border-graphite/25 bg-white px-6 py-12 text-center md:px-10 md:py-16">
          <span className="mx-auto flex h-12 w-12 items-center justify-center border border-graphite/20 text-graphite/65">
            <Icon name="search" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-xl font-bold tracking-[-0.02em] text-graphite">
            {dict.noResultsTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-graphite/65">
            {dict.noResultsBody}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={clearFilters} className="btn-dark">
              {dict.reset}
            </button>
            <Link
              href={`/${lang}/cotizacion`}
              className="inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-graphite transition-colors hover:text-amber-700"
            >
              {dict.generalQuote}
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((family, index) => {
            const familyCategory = getCategory(family.category);
            if (!familyCategory) return null;
            const price = priceLabel(family, lang);
            return (
              <article
                key={family.id}
                id={`familia-${family.slug}`}
                className="group flex h-full scroll-mt-24 flex-col border border-graphite/15 bg-white p-5 transition-colors hover:border-graphite/35"
              >
                {family.image ? (
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-graphite/5">
                    <Image
                      src={family.image}
                      alt={getFamilyName(family, lang)}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite/65">
                    {familyCategory.code} · {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    name={familyCategory.icon}
                    className="h-5 w-5 text-graphite/50 transition-colors group-hover:text-amber-700"
                  />
                </div>
                <p className="eyebrow mt-6 text-graphite/65">
                  {getCategoryName(familyCategory, lang)}
                </p>
                <h2 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em] text-graphite">
                  {getFamilyName(family, lang)}
                </h2>
                {family.brand || family.reference ? (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-graphite/65">
                    {[family.brand, family.reference ? `Ref. ${family.reference}` : ""]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                ) : null}
                <div className="mt-auto flex items-end justify-between gap-3 border-t border-graphite/10 pt-4">
                  <div>
                    {price ? (
                      <p className="text-sm font-semibold text-graphite">{price}</p>
                    ) : (
                      <p className="max-w-[150px] text-[11px] leading-relaxed text-graphite/65">
                        {dict.quoteNote}
                      </p>
                    )}
                    <AddToQuoteButton
                      familyId={family.id}
                      addLabel={dict.add}
                      addedLabel={dict.added}
                      className="mt-3"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-12 grid gap-6 border-t border-graphite/15 pt-8 md:grid-cols-2 md:items-start md:gap-12">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-graphite">
            {dict.missingDataTitle}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite/65">
            {dict.missingDataBody}
          </p>
        </div>
        <div className="md:justify-self-end">
          <p className="max-w-md font-mono text-[11px] leading-relaxed tracking-[0.06em] text-graphite/65">
            * {dict.catalogNote}
          </p>
          <Link
            href={`/${lang}/cotizacion`}
            className="mt-4 inline-flex items-center gap-2 border-b border-graphite/30 pb-1 text-sm font-semibold text-graphite transition-colors hover:border-amber-600 hover:text-amber-700"
          >
            {dict.generalQuote}
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-9 items-center rounded-xs border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-graphite bg-graphite text-technical"
          : "border-graphite/20 bg-white text-graphite/65 hover:border-graphite/50 hover:text-graphite"
      }`}
    >
      {label}
    </button>
  );
}
