import { Grid, TEXT_COLUMN } from "@/components/Grid";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImage } from "@/components/motion/RevealImage";
import type { ImageLayout, ProjectSection as SectionData, SectionMedia } from "@/data/projects";

const SIZES: Record<ImageLayout, string> = {
  full: "(min-width: 768px) calc(100vw - 80px), 100vw",
  panorama: "(min-width: 768px) calc(100vw - 80px), 100vw",
  "offset-left": "(min-width: 1280px) 60vw, (min-width: 768px) 75vw, 100vw",
  "offset-right": "(min-width: 1280px) 45vw, (min-width: 768px) 62vw, 100vw",
  pair: "(min-width: 768px) 48vw, 100vw",
};

/**
 * Composições de imagem — as únicas peças que mudam de posição no grid
 * (posições medidas na referência, 12 colunas):
 * - full / panorama: colunas 1–12
 * - offset-left: colunas 1–8, proporção natural
 * - offset-right: colunas 7–12, vertical 3:4
 * - pair: colunas 1–6 e 7–12, 3:2
 */
function MediaBlock({ media }: { media: SectionMedia }) {
  const [first, second] = media.images;

  switch (media.layout) {
    case "full":
    case "panorama":
      return (
        <Grid>
          <RevealImage
            src={first.src}
            alt={first.alt}
            focal={first.focal}
            aspect={media.layout === "panorama" ? "21/9" : undefined}
            sizes={SIZES[media.layout]}
            parallax
            className="mobile-bleed col-span-full"
          />
        </Grid>
      );
    case "offset-left":
      return (
        <Grid>
          <RevealImage
            src={first.src}
            alt={first.alt}
            focal={first.focal}
            sizes={SIZES["offset-left"]}
            className="mobile-bleed col-span-full md:col-span-6 xl:col-span-8"
          />
        </Grid>
      );
    case "offset-right":
      return (
        <Grid>
          <RevealImage
            src={first.src}
            alt={first.alt}
            focal={first.focal}
            aspect="3/4"
            sizes={SIZES["offset-right"]}
            className="mobile-bleed col-span-full md:col-span-5 md:col-start-4 xl:col-span-6 xl:col-start-7"
          />
        </Grid>
      );
    case "pair":
      return (
        <Grid className="gap-y-gutter">
          {[first, second].filter(Boolean).map((image) => (
            <RevealImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              focal={image.focal}
              aspect="3/2"
              sizes={SIZES.pair}
              className="mobile-bleed col-span-full md:col-span-4 xl:col-span-6"
            />
          ))}
        </Grid>
      );
  }
}

/**
 * Bloco do corpo do projeto: título de seção (24/32) e parágrafo em lead
 * (32/40 no desktop) na coluna da tipografia, seguidos das imagens da seção.
 * Ritmo vertical medido na referência: 160px entre imagem e texto.
 */
export function ProjectSection({ section }: { section: SectionData }) {
  const media = section.media ?? [];

  return (
    <section className="pt-20 md:pt-30 xl:pt-40">
      <Grid>
        <FadeIn className={TEXT_COLUMN}>
          <h2 className="text-balance text-20 md:text-24">{section.title}</h2>
          <p className="mt-4 max-w-text text-pretty text-20-loose md:mt-6 md:text-24 xl:text-32">{section.body}</p>
        </FadeIn>
      </Grid>

      {media.length > 0 && (
        <div className="mt-16 flex flex-col gap-16 md:mt-30 md:gap-30 xl:mt-40 xl:gap-40">
          {media.map((block) => (
            <MediaBlock key={block.images.map((image) => image.src).join("|")} media={block} />
          ))}
        </div>
      )}
    </section>
  );
}
