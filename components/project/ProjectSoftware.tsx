import { Grid } from "@/components/Grid";
import type { CreditLine } from "@/data/projects";

export function ProjectSoftware({
  value,
  label,
  creditLine,
}: {
  value: string;
  label: string;
  creditLine?: CreditLine;
}) {
  return (
    <section className="project-software pb-before-footer pt-hero-to-image">
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      <Grid>
        <div className="project-software-text col-span-2 flex flex-col gap-2 sm:col-span-6 sm:max-w-[791px] sm:gap-3">
          <p className="project-software-value text-[24px] leading-[28px] text-ink sm:text-section-title">
            {value}
          </p>
          <p className="project-software-label text-caption text-muted">{label}</p>
          {creditLine && (
            <p className="project-software-credit text-sm leading-5 text-muted">
              Projeto de autoria de{" "}
              <a
                href={creditLine.authorHref}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover-link focus-ring"
              >
                {creditLine.authorName}
              </a>
              . Modelagem e desenho técnico por Pedro Braga.
            </p>
          )}
        </div>
      </Grid>
    </section>
  );
}
