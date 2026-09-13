"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { withBasePath } from "@/lib/paths";

const SCROLL_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

// Zoom is a plain CSS transition (not Framer Motion), so reduced-motion is
// handled the idiomatic CSS way — the `motion-reduce:` variant, which maps
// to `@media (prefers-reduced-motion: reduce)` — rather than the JS
// useReducedMotion() hook, which is for driving Framer Motion values.
const IMAGE_HOVER =
  "transition-transform duration-300 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none";

/**
 * Image and caption for a project card. Split out so both the
 * "whole-card-is-one-link" layout and the "author is a separate external
 * link" layout can share the exact same image treatment.
 */
function CardImage({ project, priority }: { project: Project; priority: boolean }) {
  const image = <ProjectImage project={project} priority={priority} className={IMAGE_HOVER} />;
  const className = "relative aspect-[16/10] w-full overflow-hidden bg-[#8D8D8D] mobile-bleed";

  if (priority) {
    // No self-entrance animation — priority cards are staggered in by the
    // parent <EntranceItem> as part of the Home load-in, so animating here
    // too would double up.
    return <div className={className}>{image}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: SCROLL_REVEAL_EASE }}
      className={className}
    >
      {image}
    </motion.div>
  );
}

/**
 * `priority` (the first card on Home) skips scroll-reveal animation on
 * itself (handled by the Home entrance stagger instead) — `CardImage`
 * above takes care of that distinction. Every other card reveals on
 * scroll via `whileInView`, unchanged.
 *
 * When the project has `cardAuthorHref` (an outside office/collaborator
 * with their own site — e.g. Nathalia Trota Arquitetura), the author name
 * can't sit inside the same <a> as the rest of the card (nesting <a>
 * inside <a> is invalid HTML) — so it renders as its own external link,
 * a sibling of the internal <Link> that still covers the image + project
 * name. Without `cardAuthorHref` (Pedro himself / a TFG), the whole card
 * stays a single internal link, unchanged.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const href = `/projetos/${project.slug}`;
  const ariaLabel = `Ver projeto: ${project.title}`;

  // Mobile stacks caption ABOVE the image (author → project/year → image,
  // matching the reference mobile pattern); desktop keeps image first,
  // caption below. `order` (not DOM order) drives this so the reversal is
  // pure CSS — the flex `gap-4` supplies the mobile spacing and hands off
  // to the original `sm:mt-4` once desktop restores the normal order.
  if (project.cardAuthorHref) {
    return (
      <div className="col-span-2 flex flex-col gap-4 sm:col-span-6 sm:gap-0">
        <Link
          href={href}
          aria-label={ariaLabel}
          className="group order-2 block cursor-pointer focus-ring sm:order-1"
        >
          <CardImage project={project} priority={priority} />
        </Link>
        <div className="order-1 flex flex-wrap items-baseline gap-x-6 gap-y-1 sm:order-2 sm:mt-4">
          <a
            href={project.cardAuthorHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-caption text-ink hover-link focus-ring"
          >
            {project.cardAuthor}
          </a>
          <Link href={href} className="cursor-pointer text-caption text-muted hover-link focus-ring">
            {project.cardLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="group col-span-2 flex flex-col gap-4 cursor-pointer focus-ring sm:col-span-6 sm:gap-0"
    >
      <div className="order-2 sm:order-1">
        <CardImage project={project} priority={priority} />
      </div>
      <div className="order-1 flex flex-wrap items-baseline gap-x-6 gap-y-1 sm:order-2 sm:mt-4">
        <span className="text-caption text-ink hover-link">{project.cardAuthor}</span>
        <span className="text-caption text-muted hover-link">{project.cardLabel}</span>
      </div>
    </Link>
  );
}

function ProjectImage({
  project,
  priority = false,
  className = "",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={withBasePath(project.heroImage)}
      alt={`${project.title} — ${project.cardAuthor}`}
      fill
      priority={priority}
      sizes="(min-width: 640px) 100vw, 100vw"
      className={`object-cover ${className}`}
    />
  );
}
