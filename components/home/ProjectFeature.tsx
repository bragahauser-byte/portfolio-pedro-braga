import { RevealImage } from "@/components/motion/RevealImage";
import { TransitionLink } from "@/components/providers/PageTransition";
import type { Project } from "@/data/projects";

/**
 * Projeto na Home: todos iguais — imagem na largura total do grid
 * (colunas 1–12) + legenda curta (nome [+ ano] em preto,
 * autor/contexto em cinza embaixo). Quando o autor é um escritório com site próprio,
 * o nome dele vira link externo separado — nunca um link dentro de outro.
 */
export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const href = `/projetos/${project.slug}`;

  return (
    <article className="col-span-full">
      <TransitionLink
        href={href}
        aria-label={`Ver projeto: ${project.title}`}
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
              sizes="(min-width: 768px) calc(100vw - 80px), 100vw"
            />
          </span>
        </span>
      </TransitionLink>

      {/* Legenda em duas linhas alinhadas à esquerda: projeto em preto,
          autor/contexto em cinza embaixo. */}
      <div className="mt-4 text-16">
        <TransitionLink href={href} className="link-underline focus-ring block w-fit">
          {project.cardLabel}
        </TransitionLink>
        {project.cardAuthorHref ? (
          <a
            href={project.cardAuthorHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline focus-ring block w-fit text-14 text-muted"
          >
            {project.cardAuthor}
          </a>
        ) : (
          <span className="block text-14 text-muted">{project.cardAuthor}</span>
        )}
      </div>
    </article>
  );
}
