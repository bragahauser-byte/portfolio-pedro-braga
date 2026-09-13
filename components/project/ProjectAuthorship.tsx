import { Grid } from "@/components/Grid";

export function ProjectAuthorship({ title, body }: { title: string; body: string }) {
  return (
    <section className="project-authorship pb-section-spacing">
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      <Grid>
        <div className="project-authorship-text col-span-2 flex flex-col gap-4 sm:col-span-6 sm:max-w-[794px] sm:gap-6">
          <h2 className="project-authorship-title text-[24px] leading-[28px] text-ink sm:text-section-title">
            {title}
          </h2>
          <p className="project-authorship-body text-caption text-muted">{body}</p>
        </div>
      </Grid>
    </section>
  );
}
