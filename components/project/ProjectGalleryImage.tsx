import Image from "next/image";
import { Grid } from "@/components/Grid";
import { withBasePath } from "@/lib/paths";

export function ProjectGalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Grid>
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      <div className="project-gallery-image col-span-2 relative aspect-[3/2] w-full overflow-hidden bg-[#8D8D8D] sm:col-span-6">
        <Image src={withBasePath(src)} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
    </Grid>
  );
}
