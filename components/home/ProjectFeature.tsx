import { RevealImage } from "@/components/motion/RevealImage";
import { TransitionLink } from "@/components/providers/PageTransition";
import type { Project } from "@/data/projects";

// Ritmo da lista: o primeiro projeto ocupa as 12 colunas, os seguintes
// alternam entre deslocado à direita (9 colunas) e largura total.
const POSITIONS = ["col-span-full", "col-span-full md:col-span-7 md:col-start-2 xl:col-span-9 xl:col-start-4"];

/**
 * Projeto na Home: imagem grande + legenda curta (autor/contexto em preto,
 * nome [+ ano] em cinza). Quando o autor é um escritório com site próprio,
 * o nome dele vira link externo separado — nunca um link dentro de outro.
 */
export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const href = `/projetos/${project.slug}`;

  return (
    <article className={POSITIONS[index % POSITIONS.length]}>
      <TransitionLink
        href={href}
        aria-label={`Ver projeto: ${project.title}`}
        data-cursor="Ver"
        className="group focus-ring block"
      >
        <span className="mobile-bleed block overflow-hidden">
          <span className="block transition-transform duration-[1200ms] ease-expo-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <RevealImage
              src={project.hero.src}
              alt={project.hero.alt}
              focal={project.hero.focal}
              priority={index === 0}
              parallax={index > 0}
              sizes="(min-width: 768px) calc(100vw - 64px), 100vw"
              className="max-md:rounded-none"
            />
          </span>
        </span>
      </TransitionLink>

      <p className="mt-space-2 flex flex-wrap items-baseline gap-x-space-3 gap-y-space-1 text-nav">
        {project.cardAuthorHref ? (
          <a
            href={project.cardAuthorHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline focus-ring"
          >
            {project.cardAuthor}
          </a>
        ) : (
          <span>{project.cardAuthor}</span>
        )}
        <TransitionLink href={href} className="link-underline focus-ring text-muted">
          {project.cardLabel}
        </TransitionLink>
      </p>
    </article>
  );
}
