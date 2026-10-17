"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";
import { Grid } from "@/components/Grid";
import { Picture } from "@/components/media/Picture";
import { FadeIn } from "@/components/motion/FadeIn";
import { TransitionLink } from "@/components/providers/PageTransition";
import type { Project } from "@/data/projects";
import { EASE_EXPO_OUT } from "@/lib/motion";

/**
 * Índice no estilo Paravela: uma linha por projeto (Nome — Tipo, em
 * colunas, com fio). Em desktop, passar o mouse mostra uma prévia da capa
 * que segue o cursor.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  function onMove(e: MouseEvent) {
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0)`;
    }
  }

  return (
    <section aria-labelledby="indice" className="pt-space-7 md:pt-space-8">
      <Grid>
        <FadeIn className="col-span-full">
          <h2 id="indice" className="text-caption text-muted">
            Projetos
          </h2>
        </FadeIn>
        <ul className="col-span-full mt-space-2 border-b border-rule" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
          {projects.map((project) => (
            <li key={project.slug} className="border-t border-rule">
              <TransitionLink
                href={`/projetos/${project.slug}`}
                onMouseEnter={() => setHovered(project)}
                onFocus={() => setHovered(null)}
                className="group focus-ring grid grid-cols-4 gap-x-gutter py-space-2 md:grid-cols-8 xl:grid-cols-12"
              >
                <span className="col-span-4 text-lead md:col-span-4 xl:col-span-6">
                  <span className="link-underline">{project.title}</span>
                </span>
                <span className="col-span-4 self-center text-nav text-muted md:col-span-4 xl:col-span-6">
                  {project.cardAuthor}
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </Grid>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.slug}
              className="w-[320px] overflow-hidden rounded-image"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.6, ease: EASE_EXPO_OUT }}
            >
              <Picture src={hovered.hero.src} alt="" sizes="320px" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
