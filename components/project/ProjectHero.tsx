import { Grid } from "@/components/Grid";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitLines } from "@/components/motion/SplitLines";
import type { Project } from "@/data/projects";

/** Título grande + frase de abertura, deslocados no grid (Idea Zarvos). */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="pb-space-6 pt-space-6 md:pb-space-7 md:pt-space-7">
      <Grid>
        <SplitLines
          text={project.title}
          immediate
          delay={0.15}
          className="col-span-full text-balance text-h1 font-light md:col-span-7 md:col-start-2 xl:col-span-7 xl:col-start-5"
        />
        <FadeIn
          as="p"
          immediate
          delay={0.45}
          className="col-span-full mt-space-3 max-w-measure text-pretty text-lead md:col-span-6 md:col-start-2 md:mt-space-4 xl:col-span-6 xl:col-start-5"
        >
          {project.subtitle}
        </FadeIn>
      </Grid>
    </section>
  );
}
