"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";
import { Grid, TEXT_COLUMN, TEXT_COLUMN_WIDE } from "@/components/Grid";
import { Picture } from "@/components/media/Picture";
import { FadeIn } from "@/components/motion/FadeIn";
import { TransitionLink } from "@/components/providers/PageTransition";
import type { Project } from "@/data/projects";
import { EASE_EXPO_OUT } from "@/lib/motion";

/**
 * Índice no estilo Paravela, na coluna da tipografia: uma linha por projeto
 * (nome 24/32, tipo 14/20 em cinza) com fio #EEE. Em desktop, passar o
 * mouse mostra uma prévia da capa que segue o cursor.
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
    <section aria-labelledby="indice" className="pt-20 md:pt-30 xl:pt-40">
      <Grid>
        <FadeIn className={TEXT_COLUMN}>
          <h2 id="indice" className="text-14 text-muted">
            Projetos
          </h2>
        </FadeIn>
        <ul
          className={`${TEXT_COLUMN_WIDE} mt-4 border-b border-rule`}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
        >
          {projects.map((project) => (
            <li key={project.slug} className="border-t border-rule">
              <TransitionLink
                href={`/projetos/${project.slug}`}
                onMouseEnter={() => setHovered(project)}
                onFocus={() => setHovered(null)}
                className="group focus-ring block py-6"
              >
                <span className="block text-20 md:text-24">
                  <span className="link-underline">{project.title}</span>
                </span>
                <span className="block text-14 text-muted">{project.cardAuthor}</span>
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
              className="w-[320px] overflow-hidden"
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
