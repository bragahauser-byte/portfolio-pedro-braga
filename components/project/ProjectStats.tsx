import { GridMargin } from "@/components/Grid";
import type { BigNumber } from "@/data/projects";

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
          {stats.map((stat) => (
            <div key={stat.label} className="project-stat flex flex-col">
              {/* Plain string, one run, one font size — "²" (U+00B2) is
                  already a small raised glyph baked into the font itself,
                  so it renders as a proper superscript with zero custom
                  CSS. No <sup>, no separate differently-sized span: that
                  was splitting "m²" into its own 48px run next to the
                  112px number, which never lined up as a real superscript
                  should (it looked like a second, misaligned number). */}
              <span className="project-stat-value text-[56px] leading-[64px] tracking-[-0.03em] text-ink sm:text-stat-number">
                {stat.value}
              </span>
              <span className="project-stat-label text-caption text-ink">{stat.label}</span>
            </div>
          ))}
        </div>
      </GridMargin>
    </section>
  );
}
