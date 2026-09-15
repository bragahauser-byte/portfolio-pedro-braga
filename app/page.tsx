import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Grid } from "@/components/Grid";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroText } from "@/components/HeroText";
import { HomeEntrance, EntranceItem } from "@/components/HomeEntrance";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import { projects } from "@/data/projects";
import { buildMetadata, personJsonLd } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({ path: "/" });
}

export default function HomePage() {
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  const [firstProject, ...restProjects] = sortedProjects;

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* schema.org/Person — this is the site's primary page, describing
          who the whole site is about (see lib/seo.ts). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main>
        {/*
          Header → hero → first image: exact vertical rhythm via real
          padding-top in document flow (no flex/grid gap involved, so
          nothing "swallows" these values) + the Home entrance stagger.
        */}
        <HomeEntrance>
          <EntranceItem role="header">
            <Header theme="light" />
          </EntranceItem>

          <EntranceItem>
            <div className="pt-header-to-content">
              <Grid>
                <div className="col-span-2 sm:col-span-4">
                  <HeroText />
                </div>
              </Grid>
            </div>
          </EntranceItem>

          {firstProject && (
            <EntranceItem>
              {/* Only bears the min-232px-before-footer spacing itself when
                  it's the last project on the page (no restProjects) — see
                  the section below, which is the more common case. */}
              <div className={`pt-hero-to-image ${restProjects.length > 0 ? "pb-24" : "pb-before-footer"}`}>
                <Grid>
                  <ProjectCard project={firstProject} priority />
                </Grid>
              </div>
            </EntranceItem>
          )}
        </HomeEntrance>

        {restProjects.length > 0 && (
          <section className="flex flex-col gap-16 pb-before-footer sm:gap-24">
            {restProjects.map((project) => (
              <Grid key={project.slug}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </section>
        )}
      </main>

      <ScrollFadeIn>
        <Footer />
      </ScrollFadeIn>
    </div>
  );
}
