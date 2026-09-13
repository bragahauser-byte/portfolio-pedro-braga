import { Grid } from "@/components/Grid";
import type { ProjectSection as ProjectSectionData } from "@/data/projects";

/**
 * Editorial text block. Used to alternate left/right down the page (an
 * `align="right"` step shifted the block to `sm:col-start-3` and set
 * `sm:text-right`) — dropped site-wide: every text block always starts at
 * the Grid's own 80px left margin, never right-aligned or right-shifted.
 */
export function ProjectSection({ section }: { section: ProjectSectionData }) {
  return (
    <section className="project-section py-section-spacing">
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      <Grid>
        <div className="project-section-text col-span-2 flex flex-col gap-4 sm:col-span-4 sm:gap-6">
          <h2 className="project-section-title text-[24px] leading-[28px] text-ink sm:text-section-title">
            {section.title}
          </h2>
          <p className="project-section-body text-caption text-muted">{section.body}</p>
        </div>
      </Grid>
    </section>
  );
}
