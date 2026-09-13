import { Grid } from "@/components/Grid";
import type { TechSpec } from "@/data/projects";

/** Optional denser spec sheet — only some projects have one (e.g. a TFG's "Ficha técnica"). */
export function ProjectSpecs({ specs }: { specs: TechSpec[] }) {
  return (
    <section className="project-specs py-section-spacing">
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      <Grid>
        <h2 className="project-specs-title col-span-2 mb-8 text-[24px] leading-[28px] text-ink sm:col-span-6 sm:mb-12 sm:text-section-title">
          Ficha técnica
        </h2>
        <dl className="project-specs-list col-span-2 grid grid-cols-1 gap-x-12 gap-y-6 sm:col-span-6 sm:grid-cols-2">
          {specs.map((spec) => (
            <div key={spec.label} className="project-spec flex flex-col gap-1 border-t border-ink/10 pt-4">
              <dt className="project-spec-label text-caption text-muted">{spec.label}</dt>
              <dd className="project-spec-value text-[18px] leading-[24px] text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </Grid>
    </section>
  );
}
