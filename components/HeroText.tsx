export function HeroText() {
  return (
    <p className="text-[24px] leading-[31px] text-ink sm:text-hero">
      Sou Pedro Braga, Arquiteto e Urbanista brasileiro, natural de São Paulo
      – SP, formado pela{" "}
      <a
        href="https://portal.fmu.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer underline decoration-transparent underline-offset-[3px] transition-[text-decoration-color] duration-150 ease-out hover:decoration-current focus-ring"
      >
        FMU – FIAM FAAM
      </a>
      .
    </p>
  );
}
