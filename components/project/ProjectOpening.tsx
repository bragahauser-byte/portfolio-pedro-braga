"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Grid } from "@/components/Grid";
import { RevealImage } from "@/components/motion/RevealImage";
import { TransitionLink } from "@/components/providers/PageTransition";
import type { Project } from "@/data/projects";

/**
 * Abertura no estilo do case da Paravela: coluna esquerda sticky (3 de 12)
 * com breadcrumb, frase de abertura e metadados, enquanto a coluna direita
 * (9 de 12) rola as imagens mais fortes empilhadas (gap 12px, cantos 6px).
 * Quando a seção termina, o texto sai de cena com um fade. Abaixo de
 * 1280px vira uma coluna só: texto em cima, imagens de borda a borda.
 */
export function ProjectOpening({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end 95%", "end 55%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const images = [project.hero, ...project.opening];

  return (
    <section ref={ref} aria-label="Abertura do projeto">
      <Grid className="gap-y-space-4">
        <motion.aside
          style={reducedMotion ? undefined : { opacity }}
          className="col-span-full self-start md:col-span-6 md:col-start-2 xl:sticky xl:top-space-4 xl:col-span-3 xl:col-start-1"
        >
          <nav aria-label="Navegação estrutural" className="text-nav text-muted">
            <TransitionLink href="/#projetos" className="link-underline focus-ring">
              Projetos
            </TransitionLink>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <p className="mt-space-4 text-pretty text-body xl:mt-space-6">{project.shortText}</p>

          <dl className="mt-space-4 grid grid-cols-2 gap-x-space-3 gap-y-space-2 xl:grid-cols-1">
            {project.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-caption text-muted">{item.label}</dt>
                <dd className="text-body">{item.value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>

        <div className="col-span-full flex flex-col gap-stack-gap xl:col-span-9 xl:col-start-4">
          {images.map((image, index) => (
            <RevealImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              focal={image.focal}
              priority={index === 0}
              sizes="(min-width: 1280px) 74vw, (min-width: 768px) calc(100vw - 64px), 100vw"
              className="mobile-bleed"
            />
          ))}
        </div>
      </Grid>
    </section>
  );
}
