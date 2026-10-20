interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  titleId: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  titleId,
}: PageHeaderProps) {
  return (
    <section
      className="relative overflow-hidden bg-graphite text-technical"
      aria-labelledby={titleId}
    >
      <div
        className="tech-grid-dark pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-amber/40 to-transparent"
        aria-hidden="true"
      />
      <div className="container-gyr relative py-14 md:py-20">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="eyebrow inline-flex items-center gap-3 text-technical/55">
              <span className="h-px w-8 bg-amber" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1
              id={titleId}
              className="mt-5 max-w-4xl text-[clamp(2.3rem,5vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.045em]"
            >
              {title}
            </h1>
          </div>
          <p className="max-w-xl border-l border-amber/60 pl-5 text-base leading-relaxed text-technical/65 lg:col-span-4">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
