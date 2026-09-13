import { Grid } from "@/components/Grid";

export function ProjectSoftware({ value, label }: { value: string; label: string }) {
  return (
    <section className="project-software pb-header-to-content pt-hero-to-image">
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      <Grid>
        <div className="project-software-text col-span-2 flex flex-col gap-2 sm:col-span-6 sm:max-w-[791px] sm:gap-3">
          <p className="project-software-value text-[24px] leading-[28px] text-ink sm:text-section-title">
            {value}
          </p>
          <p className="project-software-label text-caption text-muted">{label}</p>
        </div>
      </Grid>
    </section>
  );
}
