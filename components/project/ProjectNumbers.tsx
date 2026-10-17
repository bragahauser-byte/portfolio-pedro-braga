import { Grid, TEXT_COLUMN } from "@/components/Grid";
import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/motion/FadeIn";
import type { ProjectNumber } from "@/data/projects";

// Cada número começa numa coluna do grid, como na referência ("8" na
// coluna 5, "430 m²" na 7, "3 à 4" na 10). Com 4 números, duas linhas de
// dois (colunas 5 e 9) para o maior ("28.995 m²") caber em 120px.
const XL_POSITIONS: Record<number, string[]> = {
  1: ["xl:col-start-5 xl:col-span-8"],
  2: ["xl:col-start-5 xl:col-span-4", "xl:col-start-9 xl:col-span-4"],
  3: ["xl:col-start-5 xl:col-span-2", "xl:col-start-7 xl:col-span-3", "xl:col-start-10 xl:col-span-3"],
  4: [
    "xl:col-start-5 xl:col-span-4",
    "xl:col-start-9 xl:col-span-4",
    "xl:col-start-5 xl:col-span-4",
    "xl:col-start-9 xl:col-span-4",
  ],
};
// Tablet: dois por linha a partir da coluna 3 (3 e 6). Mobile: dois por linha.
const MD_POSITIONS = ["md:col-start-3 md:col-span-3", "md:col-start-6 md:col-span-3"];

/**
 * "Números do projeto" (referência: "Diferenciais e ficha técnica"): título
 * 24/32 na coluna da tipografia, números de 120px com o rótulo 14/20
 * embaixo e a unidade em sobrescrito.
 */
export function ProjectNumbers({ numbers }: { numbers: ProjectNumber[] }) {
  const xl = XL_POSITIONS[numbers.length] ?? [];

  return (
    <section aria-labelledby="numeros" className="pt-20 md:pt-30 xl:pt-45">
      <Grid>
        <FadeIn className={TEXT_COLUMN}>
          <h2 id="numeros" className="text-20 md:text-24">
            Números do projeto
          </h2>
        </FadeIn>
      </Grid>
      <Grid as="dl" className="mt-12 gap-y-12 md:mt-16 xl:mt-28 xl:gap-y-20">
        {numbers.map((number, index) => (
          <FadeIn
            key={number.label}
            className={`col-span-2 flex flex-col-reverse ${MD_POSITIONS[index % 2]} ${xl[index] ?? "xl:col-span-4"}`}
          >
            <dt className="mt-4 text-14 md:mt-6">{number.label}</dt>
            <dd className="whitespace-nowrap text-40 md:text-56 xl:text-120">
              <CountUp value={number.value} animate={number.animate} plain={number.plain} />
              {number.unit && (
                <sup className="relative top-1 ml-1 align-top text-12 tracking-normal md:top-2 md:text-16 xl:top-4 xl:text-24">{number.unit}</sup>
              )}
            </dd>
          </FadeIn>
        ))}
      </Grid>
    </section>
  );
}
