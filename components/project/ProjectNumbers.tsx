import { Grid } from "@/components/Grid";
import { CountUp } from "@/components/motion/CountUp";
import { FadeIn } from "@/components/motion/FadeIn";
import type { ProjectNumber } from "@/data/projects";

/**
 * "Números do projeto" (referência: "Diferenciais e ficha técnica" da
 * Idea Zarvos): título pequeno, números enormes lado a lado com o rótulo
 * em caption embaixo e a unidade em sobrescrito.
 */
export function ProjectNumbers({ numbers }: { numbers: ProjectNumber[] }) {
  return (
    <section aria-labelledby="numeros" className="pt-space-7 md:pt-space-8">
      <Grid className="gap-y-space-5">
        <FadeIn className="col-span-full">
          <h2 id="numeros" className="text-h2">
            Números do projeto
          </h2>
        </FadeIn>
        <dl className="col-span-full flex flex-wrap gap-x-space-6 gap-y-space-5 xl:gap-x-space-7">
          {numbers.map((number) => (
            <FadeIn key={number.label} className="flex shrink-0 flex-col-reverse">
              <dt className="mt-space-2 text-caption">{number.label}</dt>
              <dd className="whitespace-nowrap text-display font-light">
                <CountUp value={number.value} animate={number.animate} plain={number.plain} />
                {number.unit && (
                  <sup className="relative top-[0.12em] ml-[0.08em] align-top text-[0.3em] font-normal leading-none tracking-normal">
                    {number.unit}
                  </sup>
                )}
              </dd>
            </FadeIn>
          ))}
        </dl>
      </Grid>
    </section>
  );
}
