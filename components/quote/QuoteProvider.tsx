"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFamily } from "@/lib/catalog";
import { MAX_QUANTITY, normalizeQuantity, totalUnits, type QuoteLine } from "@/lib/quote";

const STORAGE_KEY = "gyr-quote-lines-v1";

interface QuoteContextValue {
  lines: QuoteLine[];
  hydrated: boolean;
  count: number;
  units: number;
  addLine: (familyId: string, quantity?: number) => void;
  setQuantity: (familyId: string, quantity: number) => void;
  removeLine: (familyId: string) => void;
  clearLines: () => void;
  quantityFor: (familyId: string) => number;
}

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

function readStoredLines(): QuoteLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed.flatMap((entry) => {
      if (typeof entry !== "object" || entry === null) return [];
      const record = entry as Record<string, unknown>;
      const familyId =
        typeof record.familyId === "string" ? record.familyId : "";
      if (!familyId || seen.has(familyId) || !getFamily(familyId)) return [];
      seen.add(familyId);
      return [
        {
          familyId,
          quantity: normalizeQuantity(record.quantity),
        },
      ];
    });
  } catch {
    return [];
  }
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<QuoteLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readStoredLines());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // El navegador puede bloquear localStorage; la lista sigue en memoria.
    }
  }, [lines, hydrated]);

  const addLine = useCallback((familyId: string, quantity = 1) => {
    if (!getFamily(familyId)) return;
    const nextQuantity = normalizeQuantity(quantity);
    setLines((current) => {
      const existing = current.find((line) => line.familyId === familyId);
      if (existing) {
        return current.map((line) =>
          line.familyId === familyId
            ? {
                ...line,
                quantity: Math.min(
                  MAX_QUANTITY,
                  line.quantity + nextQuantity,
                ),
              }
            : line,
        );
      }
      return [...current, { familyId, quantity: nextQuantity }];
    });
  }, []);

  const setQuantity = useCallback((familyId: string, quantity: number) => {
    setLines((current) =>
      current.map((line) =>
        line.familyId === familyId
          ? { ...line, quantity: normalizeQuantity(quantity) }
          : line,
      ),
    );
  }, []);

  const removeLine = useCallback((familyId: string) => {
    setLines((current) => current.filter((line) => line.familyId !== familyId));
  }, []);

  const clearLines = useCallback(() => setLines([]), []);

  const value = useMemo<QuoteContextValue>(() => {
    const quantityMap = new Map(
      lines.map((line) => [line.familyId, line.quantity]),
    );
    return {
      lines,
      hydrated,
      count: lines.length,
      units: totalUnits(lines),
      addLine,
      setQuantity,
      removeLine,
      clearLines,
      quantityFor: (familyId: string) => quantityMap.get(familyId) ?? 0,
    };
  }, [lines, hydrated, addLine, setQuantity, removeLine, clearLines]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used inside QuoteProvider");
  }
  return context;
}
