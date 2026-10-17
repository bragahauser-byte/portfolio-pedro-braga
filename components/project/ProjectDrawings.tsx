"use client";

import { useState } from "react";
import { Grid } from "@/components/Grid";
import { Picture } from "@/components/media/Picture";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Drawing } from "@/data/projects";
import { Lightbox } from "./Lightbox";

/**
 * "Plantas e cortes": fundo off-white, grade 2×N, cada desenho inteiro
 * (object-contain, nunca cortado) com legenda curta. Clique abre o
 * lightbox; o cursor vira "+".
 */
export function ProjectDrawings({ drawings }: { drawings: Drawing[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (drawings.length === 0) return null;

  return (
    <section aria-labelledby="desenhos" className="mt-space-7 bg-drawing py-space-6 md:mt-space-8 md:py-space-7">
      <Grid className="gap-y-space-5">
        <FadeIn className="col-span-full xl:col-span-4">
          <h2 id="desenhos" className="text-h2">
            Plantas e cortes
          </h2>
        </FadeIn>
        <ul className="col-span-full grid grid-cols-1 gap-x-gutter gap-y-space-4 md:grid-cols-2">
          {drawings.map((drawing, index) => (
            <FadeIn as="li" key={drawing.src} delay={(index % 2) * 0.08}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                data-cursor="+"
                aria-label={`Ampliar: ${drawing.caption}`}
                className="focus-ring group block w-full text-left"
              >
                <span className="block aspect-[3/2] overflow-hidden rounded-image bg-paper p-space-2 md:p-space-3">
                  <Picture
                    src={drawing.src}
                    alt={drawing.alt}
                    fit="contain"
                    sizes="(min-width: 768px) 48vw, 100vw"
                    imgClassName="transition-transform duration-[1200ms] ease-expo-out group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </span>
                <span className="mt-space-1 flex gap-space-2 text-caption">
                  <span className="text-muted tnum">{String(index + 1).padStart(2, "0")}</span>
                  <span>{drawing.caption}</span>
                </span>
              </button>
            </FadeIn>
          ))}
        </ul>
      </Grid>

      <Lightbox items={drawings} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
