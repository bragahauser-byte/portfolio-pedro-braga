import { Grid } from "@/components/Grid";
import { RevealImage } from "@/components/motion/RevealImage";
import type { Project } from "@/data/projects";

/**
 * Imagens de abertura logo abaixo do hero: a capa e as mais fortes,
 * empilhadas na largura total do grid (margem a margem), separadas pelo
 * gutter.
 */
export function ProjectOpening({ project }: { project: Project }) {
  const images = [project.hero, ...project.opening];

  return (
    <section aria-label="Imagens de abertura" className="pt-20 xl:pt-24">
      <Grid className="gap-y-gutter">
        {images.map((image, index) => (
          <RevealImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            focal={image.focal}
            priority={index === 0}
            parallax={index > 0}
            sizes="(min-width: 768px) calc(100vw - 80px), 100vw"
            className="mobile-bleed col-span-full"
          />
        ))}
      </Grid>
    </section>
  );
}
