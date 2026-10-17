import { Grid } from "@/components/Grid";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealImage } from "@/components/motion/RevealImage";
import type { ImageLayout, ProjectSection as SectionData, SectionMedia } from "@/data/projects";

// Posição do bloco de texto, alternando entre seções para o ritmo
// assimétrico da Idea Zarvos (começa na coluna 5 / na coluna 8).
const TEXT_POSITIONS = [
  "md:col-start-3 md:col-span-5 xl:col-start-5 xl:col-span-5",
  "md:col-start-4 md:col-span-5 xl:col-start-8 xl:col-span-4",
];

const SIZES: Record<ImageLayout, string> = {
  full: "(min-width: 768px) calc(100vw - 64px), 100vw",
  panorama: "(min-width: 768px) calc(100vw - 64px), 100vw",
  "offset-left": "(min-width: 1280px) 58vw, (min-width: 768px) 75vw, 100vw",
  "offset-right": "(min-width: 1280px) 40vw, (min-width: 768px) 62vw, 100vw",
  pair: "(min-width: 1280px) 58vw, (min-width: 768px) 62vw, 100vw",
};

function MediaBlock({ media, raised }: { media: SectionMedia; raised: boolean }) {
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
            className="mobile-bleed col-span-full md:col-span-6 xl:col-span-7"
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
            aspect="4/5"
            sizes={SIZES["offset-right"]}
            className={`mobile-bleed col-span-full md:col-span-5 md:col-start-4 xl:col-span-5 xl:col-start-8 ${
              raised ? "xl:-mt-space-7" : ""
            }`}
          />
        </Grid>
      );
    case "pair":
      return (
        <Grid className="items-end gap-y-space-2">
          <RevealImage
            src={first.src}
            alt={first.alt}
            focal={first.focal}
            aspect="4/5"
            sizes={SIZES["offset-right"]}
            className="mobile-bleed col-span-full md:col-span-3 xl:col-span-5"
          />
          {second && (
            <RevealImage
              src={second.src}
              alt={second.alt}
              focal={second.focal}
              aspect="3/2"
              sizes={SIZES.pair}
              className="mobile-bleed col-span-full md:col-span-5 xl:col-span-7"
            />
          )}
        </Grid>
      );
  }
}

/**
 * Um bloco do corpo do projeto: título de seção + parágrafo deslocados no
 * grid, seguidos das composições de imagem da seção (data/projects.ts).
 */
export function ProjectSection({ section, index }: { section: SectionData; index: number }) {
  const media = section.media ?? [];

  return (
    <section className="pt-space-6 md:pt-space-7 xl:pt-space-8">
      <Grid>
        <FadeIn className={`col-span-full ${TEXT_POSITIONS[index % TEXT_POSITIONS.length]}`}>
          <h2 className="text-balance text-h2">{section.title}</h2>
          <p className="mt-space-2 max-w-measure text-pretty text-body">{section.body}</p>
        </FadeIn>
      </Grid>

      {media.length > 0 && (
        <div className="mt-space-5 flex flex-col gap-space-5 md:mt-space-6 md:gap-space-6">
          {media.map((block, i) => (
            <MediaBlock
              key={block.images.map((image) => image.src).join("|")}
              media={block}
              raised={block.layout === "offset-right" && media[i - 1]?.layout === "offset-left"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
