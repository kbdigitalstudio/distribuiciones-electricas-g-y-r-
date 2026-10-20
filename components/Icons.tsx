import type { IconName } from "@/lib/catalog";

type UiIconName =
  | "arrow"
  | "arrowUpRight"
  | "check"
  | "quote"
  | "pin"
  | "bolt"
  | "menu"
  | "close"
  | "globe"
  | "plus"
  | "minus"
  | "trash"
  | "copy"
  | "download"
  | "filter"
  | "search"
  | "spark";

interface IconProps {
  name: IconName | UiIconName;
  className?: string;
}

const paths: Record<IconProps["name"], string> = {
  cable:
    "M4 17c2-6 4-9 8-9 3 0 4 2 8 2M4 17c4 0 6 4 10 4 2.5 0 4-1 6-2M4 17h16",
  pipe: "M4 9h9a4 4 0 0 1 4 4v5M4 9v11M4 9H2m18 6h-5m5 0v3m0-3h2",
  shield:
    "M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3zM9.5 12l2 2 3.5-4",
  transformer:
    "M6 4v4m12-4v4M4 8h4m8 0h4M7 8v3m10-3v3M7 11H4m3 0h10m-7 0h4M4 11v2m16-2v2M12 13v8M8 21h8",
  ground:
    "M12 3v10m0 0l-4-4m4 4l4-4M5 17h14M7 20.5h10M9.5 24h5",
  hardware:
    "M14.5 6.5a4 4 0 0 0-5.6 5L4 16.4V20h3.6l4.9-4.9a4 4 0 0 0 5-5.6l-2.8 2.8-2.5-.7-.7-2.5 3-2.6z",
  arrow: "M4 12h15m0 0l-6-6m6 6l-6 6",
  arrowUpRight: "M7 17L17 7M9 7h8v8",
  check: "M4.5 12.5l5 5 10-11",
  quote:
    "M6 3h9l3 3v15H6V3zM9 8h6M9 12h6M9 16h4M15 3v4h3",
  pin: "M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  globe:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  trash:
    "M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6",
  copy:
    "M8 8V4h12v12h-4M4 8h12v12H4V8z",
  download: "M12 3v12m0 0l-4-4m4 4l4-4M4 19h16",
  filter: "M3 5h18M6 12h12M9 19h6",
  search: "M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zM16 16l5 5",
  spark: "M12 3v5M12 16v5M3 12h5M16 12h5M5.6 5.6l3.5 3.5M14.9 14.9l3.5 3.5M18.4 5.6l-3.5 3.5M9.1 14.9l-3.5 3.5",
};

export function Icon({ name, className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
