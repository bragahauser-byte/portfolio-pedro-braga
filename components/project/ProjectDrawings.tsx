"use client";

import { useState } from "react";
import { Grid, TEXT_COLUMN } from "@/components/Grid";
import { Picture } from "@/components/media/Picture";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Drawing } from "@/data/projects";
import { Lightbox } from "./Lightbox";

/**
 * "Plantas e cortes": título na coluna da tipografia; desenhos em grade
 * 2×N (colunas 1–6 / 7–12) sobre off-white, sempre inteiros
 * (object-contain), com legenda 12/16. Clique abre o lightbox.
 */
export function ProjectDrawings({ drawings }: { drawings: Drawing[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (drawings.length === 0) return null;

  return (
    <section aria-labelledby="desenhos" className="mt-20 bg-drawing py-20 md:mt-30 md:py-30 xl:mt-40 xl:py-40">
      <Grid>
        <FadeIn className={TEXT_COLUMN}>
          <h2 id="desenhos" className="text-20 md:text-24">
            Plantas e cortes
          </h2>
        </FadeIn>
      </Grid>
      <Grid as="ul" className="mt-12 gap-y-10 md:mt-16">
        {drawings.map((drawing, index) => (
          <FadeIn as="li" key={drawing.src} delay={(index % 2) * 0.08} className="col-span-full md:col-span-4 xl:col-span-6">
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`Ampliar: ${drawing.caption}`}
              className="focus-ring group block w-full text-left"
            >
              <span className="block aspect-[3/2] overflow-hidden bg-paper p-4 md:p-6">
                <Picture
                  src={drawing.src}
                  alt={drawing.alt}
                  fit="contain"
                  sizes="(min-width: 768px) 48vw, 100vw"
                  imgClassName="transition-transform duration-[1200ms] ease-expo-out group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </span>
              <span className="mt-2 flex gap-4 text-12">
                <span className="tnum text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span>{drawing.caption}</span>
              </span>
            </button>
          </FadeIn>
        ))}
      </Grid>

      <Lightbox items={drawings} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
