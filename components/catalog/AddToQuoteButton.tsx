"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";
import { useQuote } from "../quote/QuoteProvider";

interface AddToQuoteButtonProps {
  familyId: string;
  addLabel: string;
  addedLabel: string;
  variant?: "outline" | "solid";
  className?: string;
}

export function AddToQuoteButton({
  familyId,
  addLabel,
  addedLabel,
  variant = "outline",
  className = "",
}: AddToQuoteButtonProps) {
  const { addLine } = useQuote();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    addLine(familyId);
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1800);
  };

  const base =
    variant === "solid"
      ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-xs bg-amber px-4 py-2.5 text-xs font-semibold text-graphite transition-colors hover:bg-amber-400"
      : "inline-flex min-h-9 items-center justify-center gap-2 rounded-xs border border-graphite/20 px-3 py-2 text-xs font-semibold text-graphite transition-colors hover:border-graphite hover:bg-graphite hover:text-technical";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${base} ${
        added && variant === "outline"
          ? "border-electric/50 bg-electric/10 text-electric-700 hover:border-electric/50 hover:bg-electric/10 hover:text-electric-700"
          : ""
      } ${className}`}
    >
      <Icon
        name={added ? "check" : "plus"}
        className="h-4 w-4 shrink-0"
      />
      <span>{added ? addedLabel : addLabel}</span>
      <span className="sr-only" aria-live="polite">
        {added ? addedLabel : ""}
      </span>
    </button>
  );
}
