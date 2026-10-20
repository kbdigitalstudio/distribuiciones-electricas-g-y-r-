import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "mx-auto text-center items-center" : "text-left";

  return (
    <Reveal className={`flex max-w-3xl flex-col ${alignClass}`}>
      <p
        className={`eyebrow inline-flex items-center gap-3 ${
          dark ? "text-technical/60" : "text-graphite/65"
        }`}
      >
        <span
          className={`h-px w-8 ${dark ? "bg-amber" : "bg-amber-600"}`}
          aria-hidden="true"
        />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-[clamp(1.9rem,3.5vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.04em] ${
          dark ? "text-technical" : "text-graphite"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${
            dark ? "text-technical/60" : "text-graphite/60"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
