import { Grid } from "@/components/Grid";
import { Picture } from "@/components/media/Picture";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitLines } from "@/components/motion/SplitLines";
import { TransitionLink } from "@/components/providers/PageTransition";
import type { Project } from "@/data/projects";

/**
 * Fechamento escuro (referência: bloco "Magazine / Edifício Oito"):
 * "Outros projetos / Pedro Braga" com a segunda parte em cinza, cards dos
 * outros projetos (zoom lento na imagem + título sublinhando no hover) e,
 * por fim, o link grande para o próximo case.
 */
export function ProjectClosing({ others, next }: { others: Project[]; next: Project }) {
  return (
    <section aria-labelledby="outros" className="theme-dark mt-space-7 bg-night pt-space-6 text-paper md:mt-space-8 md:pt-space-7">
      {/* TODO: a referência tem um subtítulo pequeno sob este título — não
          há texto para ele nos dados; incluir quando o Pedro definir. */}
      <Grid className="gap-y-space-4">
        <FadeIn className="col-span-full">
          <h2 id="outros" className="text-h2">
            Outros projetos <span className="text-muted">/ Pedro Braga</span>
          </h2>
        </FadeIn>

        {others.map((project) => (
          <TransitionLink
            key={project.slug}
            href={`/projetos/${project.slug}`}
            data-cursor="Ver"
            className="group focus-ring col-span-full md:col-span-4 xl:col-span-6"
          >
            <span className="block aspect-[3/2] overflow-hidden rounded-image">
              <Picture
                src={project.hero.src}
                alt={project.hero.alt}
                focal={project.hero.focal}
                sizes="(min-width: 768px) 48vw, 100vw"
                imgClassName="transition-transform duration-[1200ms] ease-expo-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </span>
            <span className="mt-space-2 flex flex-wrap items-baseline gap-x-space-2">
              <span className="link-underline text-body">{project.title}</span>
              <span className="text-caption text-muted">{project.cardAuthor}</span>
            </span>
          </TransitionLink>
        ))}
      </Grid>

      <Grid className="pt-space-7 md:pt-space-8">
        <TransitionLink
          href={`/projetos/${next.slug}`}
          className="group focus-ring col-span-full block border-t border-white/15 pt-space-3"
        >
          <span className="text-caption text-muted">Próximo projeto</span>
          <span className="mt-space-2 flex items-end justify-between gap-space-3">
            <SplitLines as="span" text={next.title} className="link-underline text-balance text-display font-light" />
            <span
              aria-hidden="true"
              className="mb-[0.15em] text-h1 font-light transition-transform duration-700 ease-expo-out group-hover:translate-x-2 motion-reduce:transition-none"
            >
              →
            </span>
          </span>
        </TransitionLink>
      </Grid>
    </section>
  );
}
