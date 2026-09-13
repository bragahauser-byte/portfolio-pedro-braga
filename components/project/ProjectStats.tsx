import { GridMargin } from "@/components/Grid";
import type { BigNumber } from "@/data/projects";

// Splits a value like "106m²" into a giant number + a smaller unit run,
// matching the Figma treatment (112px number, 48px unit). Falls back to
// rendering the whole string at the number size when there's no unit —
// plain string matching, not a layout calculation, so it stays easy to
// swap out once the real CSS lands.
function splitValue(value: string): { number: string; unit: string | null } {
  const match = value.match(/^([\d.,]+)\s*(m²|%)?$/);
  if (match && match[2]) {
    return { number: match[1], unit: match[2] };
  }
  return { number: value, unit: null };
}

export function ProjectStats({ title, stats }: { title: string; stats: BigNumber[] }) {
  return (
    <section className="project-stats py-section-spacing">
      {/* Estilo provisório — será substituído pelo CSS exportado do Figma */}
      {/* <GridMargin>, not a hand-rolled div — same margin the title/text
          blocks sit in, so stats align to the same column as everything else. */}
      <GridMargin>
        <h2 className="project-stats-title mb-8 text-[24px] leading-[28px] text-ink sm:mb-12 sm:text-section-title">
          {title}
        </h2>
        <div className="project-stats-list flex flex-wrap items-end gap-x-12 gap-y-8 sm:gap-x-20">
          {stats.map((stat) => {
            const { number, unit } = splitValue(stat.value);
            return (
              <div key={stat.label} className="project-stat flex flex-col">
                <div className="flex items-end">
                  <span className="project-stat-value text-[56px] leading-[64px] tracking-[-0.03em] text-ink sm:text-stat-number">
                    {number}
                  </span>
                  {unit && (
                    <span className="project-stat-unit text-[24px] leading-[28px] tracking-[-0.03em] text-ink sm:text-stat-unit">
                      {unit}
                    </span>
                  )}
                </div>
                <span className="project-stat-label text-caption text-ink">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </GridMargin>
    </section>
  );
}
