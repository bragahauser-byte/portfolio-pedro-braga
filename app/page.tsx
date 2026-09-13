import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Grid } from "@/components/Grid";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroText } from "@/components/HeroText";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({ path: "/" });
}

export default function HomePage() {
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header theme="light" />

      <main>
        <section className="pb-16 pt-4 sm:pb-24">
          <Grid>
            <div className="col-span-2 sm:col-span-4">
              <HeroText />
            </div>
          </Grid>
        </section>

        <section className="flex flex-col gap-16 pb-24 sm:gap-24">
          {sortedProjects.map((project, index) => (
            <Grid key={project.slug}>
              <ProjectCard project={project} priority={index === 0} />
            </Grid>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
