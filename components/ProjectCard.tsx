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
 * The whole card — image and caption — is one link to the project page.
 * `priority` (the first card on Home) renders as plain markup — its
 * fade-in is handled by the parent <EntranceItem> as part of the Home
 * entrance stagger, so it doesn't animate itself (that would double up).
 * Every other card reveals on scroll via `whileInView`, unchanged.
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

  if (priority) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className="group col-span-2 block cursor-pointer focus-ring sm:col-span-6"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#8D8D8D]">
          <ProjectImage project={project} priority className={IMAGE_HOVER} />
        </div>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="text-caption text-ink">{project.cardAuthor}</span>
          <span className="text-caption text-muted">{project.cardLabel}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="group col-span-2 block cursor-pointer focus-ring sm:col-span-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: SCROLL_REVEAL_EASE }}
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#8D8D8D]"
      >
        <ProjectImage project={project} className={IMAGE_HOVER} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease: SCROLL_REVEAL_EASE }}
        className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
      >
        <span className="text-caption text-ink">{project.cardAuthor}</span>
        <span className="text-caption text-muted">{project.cardLabel}</span>
      </motion.div>
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
