"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The first card on Home animates in with the initial page-load stagger
 * (`priority=true`); every other card reveals on scroll via `whileInView`.
 * Same component either way — used by Home now and by any future
 * /projetos/[slug] gallery.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const caption = project.year ? `${project.title} — ${project.year}` : project.title;

  return (
    <div className="col-span-2 sm:col-span-6">
      {priority ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="relative aspect-[16/10] w-full overflow-hidden bg-[#8D8D8D]"
        >
          <ProjectImage project={project} priority />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative aspect-[16/10] w-full overflow-hidden bg-[#8D8D8D]"
        >
          <ProjectImage project={project} />
        </motion.div>
      )}

      {priority ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
        >
          <span className="text-caption text-ink">{project.author}</span>
          <span className="text-caption text-muted">{caption}</span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
        >
          <span className="text-caption text-ink">{project.author}</span>
          <span className="text-caption text-muted">{caption}</span>
        </motion.div>
      )}
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
