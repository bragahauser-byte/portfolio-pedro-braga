import { Grid, TEXT_COLUMN, TEXT_COLUMN_WIDE } from "@/components/Grid";
import { Picture } from "@/components/media/Picture";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitLines } from "@/components/motion/SplitLines";
import { TransitionLink } from "@/components/providers/PageTransition";
import type { Project } from "@/data/projects";

/**
 * Fechamento escuro (referência: bloco "Magazine / Edifício Oito"): título
 * 24/32 com a segunda parte em cinza na coluna da tipografia, cards dos
 * outros projetos nas colunas 1–6 / 7–12 e o link para o próximo case.
 */
export function ProjectClosing({ others, next }: { others: Project[]; next: Project }) {
  return (
    <section
      aria-labelledby="outros"
      className="theme-dark mt-20 bg-night pt-20 text-paper md:mt-30 md:pt-30 xl:mt-45 xl:pt-40"
    >
      {/* TODO: a referência tem um subtítulo pequeno sob este título — não
          há texto para ele nos dados; incluir quando o Pedro definir. */}
      <Grid>
        <FadeIn className={TEXT_COLUMN}>
          <h2 id="outros" className="text-20 md:text-24">
            Outros projetos <span className="text-muted">/ Pedro Braga</span>
          </h2>
        </FadeIn>
      </Grid>

      <Grid className="mt-12 gap-y-12 md:mt-16">
        {others.map((project) => (
          <TransitionLink
            key={project.slug}
            href={`/projetos/${project.slug}`}
            data-cursor="Ver"
            className="group focus-ring col-span-full md:col-span-4 xl:col-span-6"
          >
            <span className="block aspect-[3/2] overflow-hidden">
              <Picture
                src={project.hero.src}
                alt={project.hero.alt}
                focal={project.hero.focal}
                sizes="(min-width: 768px) 48vw, 100vw"
                imgClassName="transition-transform duration-[1200ms] ease-expo-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </span>
            <span className="mt-4 block text-16">
              <span className="link-underline">{project.title}</span>
            </span>
            <span className="block text-14 text-muted">{project.cardAuthor}</span>
          </TransitionLink>
        ))}
      </Grid>

      <Grid className="pt-20 md:pt-30 xl:pt-40">
        <TransitionLink href={`/projetos/${next.slug}`} className={`group focus-ring ${TEXT_COLUMN_WIDE} block`}>
          <span className="block text-14 text-muted">Próximo projeto</span>
          <SplitLines
            as="span"
            text={next.title}
            className="link-underline mt-4 block text-balance text-40 md:text-80 xl:text-120"
          />
        </TransitionLink>
      </Grid>
    </section>
  );
}
