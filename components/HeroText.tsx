// The page's single <h1> (site-wide heading hierarchy: one h1 per page,
// see lib/seo.ts's JSON-LD and each page's own h1/h2 structure) — same
// visual treatment as before, just the semantically correct tag: this
// sentence IS the page's main heading, not a plain paragraph.
export function HeroText() {
  return (
    <h1 className="text-[24px] font-normal leading-[31px] text-ink sm:text-hero">
      Sou Pedro Braga, Arquiteto e Urbanista brasileiro, natural de São Paulo
      – SP, formado pela{" "}
      <a
        href="https://portal.fmu.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover-link focus-ring"
      >
        FMU – FIAM FAAM
      </a>
      .
    </h1>
  );
}
