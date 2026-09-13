import { Grid } from "@/components/Grid";
import type { ProjectSection as ProjectSectionData } from "@/data/projects";

/**
 * Editorial text block. Alternates left/right down the page (matching the
 * Figma rhythm) — `align="right"` on odd steps, computed by the caller.
 */
export function ProjectSection({
  section,
  align = "left",
}: {
  section: ProjectSectionData;
  align?: "left" | "right";
}) {
  return (
    <section className="project-section py-section-spacing">
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      <Grid>
        <div
          className={`project-section-text col-span-2 flex flex-col gap-4 sm:col-span-4 sm:gap-6 ${
            align === "right" ? "sm:col-start-3 sm:text-right" : ""
          }`}
        >
          <h2 className="project-section-title text-[24px] leading-[28px] text-ink sm:text-section-title">
            {section.title}
          </h2>
          <p className="project-section-body text-caption text-muted">{section.body}</p>
        </div>
      </Grid>
    </section>
  );
}
