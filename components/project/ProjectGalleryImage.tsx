import { Grid } from "@/components/Grid";
import { LightboxImage } from "@/components/project/LightboxImage";
import type { SectionImageVariant } from "@/data/projects";

type GalleryPhoto = { src: string; alt: string };

const PHOTO_FRAME = "relative aspect-[3/2] w-full overflow-hidden bg-[#8D8D8D]";

/** One full-width photo. */
function FullBleedImage({ image }: { image: GalleryPhoto }) {
  return (
    <Grid>
      <div className={`project-gallery-image col-span-2 sm:col-span-6 ${PHOTO_FRAME}`}>
        <LightboxImage src={image.src} alt={image.alt} />
      </div>
    </Grid>
  );
}

/**
 * Two photos side by side, equal width, standard 20px gutter — a classic
 * symmetric diptych. Stacks full-width on mobile with a real vertical gap
 * (the grid's own gap is x-only, so a paired row wouldn't otherwise get
 * one when it wraps to two mobile rows).
 */
function SymmetricDiptychImage({ images }: { images: GalleryPhoto[] }) {
  return (
    <Grid className="gap-y-4 sm:gap-y-0">
      {images.map((image) => (
        <div key={image.src} className={`project-gallery-image col-span-2 sm:col-span-3 ${PHOTO_FRAME}`}>
          <LightboxImage src={image.src} alt={image.alt} />
        </div>
      ))}
    </Grid>
  );
}

/**
 * Two photos as two separate editorial moments, not a paired "gallery":
 * the first medium-sized and left-anchored, the second lower and
 * right-anchored, with generous whitespace between them. Never lets the
 * two share a grid row, so the vertical gap stays real regardless of
 * viewport. On mobile both collapse to full width, stacked, with the same
 * generous gap (no attempt at the lateral offset, which reads as
 * misalignment on a narrow screen).
 */
function AsymmetricOpenImage({ images }: { images: GalleryPhoto[] }) {
  const [first, second] = images;
  return (
    <div className="flex flex-col gap-8 sm:gap-0">
      <Grid>
        <div
          className={`project-gallery-image col-span-2 sm:col-span-3 sm:col-start-1 ${PHOTO_FRAME}`}
        >
          <LightboxImage src={first.src} alt={first.alt} />
        </div>
      </Grid>
      <Grid className="mt-0 sm:mt-asymmetric-gap">
        <div
          className={`project-gallery-image col-span-2 sm:col-span-3 sm:col-start-4 ${PHOTO_FRAME}`}
        >
          <LightboxImage src={second.src} alt={second.alt} />
        </div>
      </Grid>
    </div>
  );
}

/**
 * Renders a section's photo(s) with the layout picked explicitly in
 * `data/projects.ts` (`SectionImageVariant`) — full-bleed, symmetric
 * diptych, or the open asymmetric composition — instead of one generic
 * component treating every image block the same way.
 */
export function ProjectGalleryImage({
  images,
  variant = "diptico-simetrico",
}: {
  images: GalleryPhoto[];
  variant?: SectionImageVariant;
}) {
  if (images.length === 0) return null;

  if (variant === "full-bleed" || images.length === 1) {
    return <FullBleedImage image={images[0]} />;
  }

  const pair = images.slice(0, 2);
  if (variant === "assimetrica-aberta") {
    return <AsymmetricOpenImage images={pair} />;
  }
  return <SymmetricDiptychImage images={pair} />;
}
