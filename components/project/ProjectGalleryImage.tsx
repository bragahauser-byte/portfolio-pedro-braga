import { Grid } from "@/components/Grid";
import { LightboxImage } from "@/components/project/LightboxImage";

type GalleryPhoto = { src: string; alt: string };

/**
 * One or two photos in a row, always inside the site <Grid> — a single
 * photo spans all 6 columns; two sit side by side (3 columns each) with
 * the grid's own 20px gutter between them, matching the reference PDFs.
 */
export function ProjectGalleryImage({ images }: { images: GalleryPhoto[] }) {
  if (images.length === 0) return null;
  const isPaired = images.length >= 2;
  const shown = images.slice(0, 2);

  return (
    <Grid>
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      {shown.map((image) => (
        <div
          key={image.src}
          className={`project-gallery-image relative aspect-[3/2] w-full overflow-hidden bg-[#8D8D8D] ${
            isPaired ? "col-span-2 sm:col-span-3" : "col-span-2 sm:col-span-6"
          }`}
        >
          <LightboxImage src={image.src} alt={image.alt} />
        </div>
      ))}
    </Grid>
  );
}
