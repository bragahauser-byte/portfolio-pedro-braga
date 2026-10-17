import { RevealImage } from "@/components/motion/RevealImage";
import { TransitionLink } from "@/components/providers/PageTransition";
import type { Project } from "@/data/projects";

// Imagens são as únicas peças que mudam de lugar no grid. Os projetos
// alternam de tamanho para a lista ter hierarquia: largura total
// (colunas 1–12) e metade, encostada à direita (colunas 7–12).
const POSITIONS = ["col-span-full", "col-span-full md:col-span-4 md:col-start-5 xl:col-span-6 xl:col-start-7"];

/**
 * Projeto na Home: imagem + legenda curta (nome [+ ano] em preto,
 * autor/contexto em cinza embaixo). Quando o autor é um escritório com site próprio,
 * o nome dele vira link externo separado — nunca um link dentro de outro.
 */
export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const href = `/projetos/${project.slug}`;

  return (
    <article className={POSITIONS[index % POSITIONS.length]}>
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
              sizes={index % 2 === 0 ? "(min-width: 768px) calc(100vw - 80px), 100vw" : "(min-width: 768px) 50vw, 100vw"}
              className=""
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
