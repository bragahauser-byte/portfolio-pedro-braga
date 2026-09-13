import { Grid } from "@/components/Grid";
import { LightboxImage } from "@/components/project/LightboxImage";
import type { Project } from "@/data/projects";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <>
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      <section className="pb-hero-to-image pt-header-to-content">
        <Grid>
          <div className="project-hero-title col-span-2 flex flex-col gap-6 sm:col-span-6 sm:gap-12">
            <h1 className="text-[40px] leading-[44px] tracking-[-0.03em] text-ink sm:text-name-xl sm:leading-[96px]">
              {project.title}
            </h1>
            <div className="project-hero-summary flex flex-col gap-4 sm:max-w-[791px] sm:gap-6">
              <p className="text-[22px] leading-[28px] text-ink sm:text-hero">
                {project.subtitle}
              </p>
              <p className="text-caption text-muted">{project.shortText}</p>
            </div>
          </div>
        </Grid>
      </section>

      <Grid>
        <div className="project-hero-image col-span-2 relative aspect-[3/2] w-full overflow-hidden bg-[#8D8D8D] sm:col-span-6">
          <LightboxImage src={project.heroImage} alt={project.title} priority />
        </div>
      </Grid>
    </>
  );
}
