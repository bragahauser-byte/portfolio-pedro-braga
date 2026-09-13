"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const SCROLL_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/**
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
  const caption = project.year ? `${project.title} — ${project.year}` : project.title;

  if (priority) {
    return (
      <div className="col-span-2 sm:col-span-6">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#8D8D8D]">
          <ProjectImage project={project} priority />
        </div>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="text-caption text-ink">{project.author}</span>
          <span className="text-caption text-muted">{caption}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-2 sm:col-span-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: SCROLL_REVEAL_EASE }}
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#8D8D8D]"
      >
        <ProjectImage project={project} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease: SCROLL_REVEAL_EASE }}
        className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
      >
        <span className="text-caption text-ink">{project.author}</span>
        <span className="text-caption text-muted">{caption}</span>
      </motion.div>
    </div>
  );
}

function ProjectImage({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Image
      src={project.coverImage}
      alt={`${project.title} — ${project.author}`}
      fill
      priority={priority}
      sizes="(min-width: 640px) 100vw, 100vw"
      className="object-cover"
    />
  );
}
