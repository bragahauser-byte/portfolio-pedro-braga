import { Grid, TEXT_COLUMN, TEXT_COLUMN_WIDE } from "@/components/Grid";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitLines } from "@/components/motion/SplitLines";
import type { Project } from "@/data/projects";

/**
 * Abertura do projeto, medida na referência (Idea Zarvos, "Edifício Oito"):
 * título 120px, frase de abertura 20/24 e linha cinza 14/20 — tudo na
 * coluna da tipografia. Desktop: título → frase 80px, frase → cinza 16px.
 */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="pt-20 md:pt-24 xl:pt-28">
      <Grid>
        <SplitLines
          text={project.title}
          immediate
          delay={0.15}
          className={`${TEXT_COLUMN_WIDE} text-balance text-40 md:text-80 xl:text-120`}
        />
        <div className={`${TEXT_COLUMN} mt-6 md:mt-12 xl:mt-20`}>
          <FadeIn as="p" immediate delay={0.45} className="max-w-text text-pretty text-16 md:text-20">
            {project.subtitle}
          </FadeIn>
          <FadeIn as="p" immediate delay={0.55} className="mt-4 max-w-text text-16-tight text-muted md:text-14">
            {project.shortText}
          </FadeIn>
        </div>
      </Grid>
    </section>
  );
}
