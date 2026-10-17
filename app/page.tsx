import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Grid } from "@/components/Grid";
import { Header } from "@/components/Header";
import { ProjectFeature } from "@/components/home/ProjectFeature";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { FadeIn } from "@/components/motion/FadeIn";
import { sortedProjects } from "@/data/projects";
import { buildMetadata, personJsonLd } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({ path: "/" });
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />

      <main>
        {/* Frase de apresentação — o <h1> da página. */}
        <section className="pb-space-6 pt-space-7 md:pb-space-7 xl:pt-space-8">
          <Grid>
            <FadeIn immediate delay={0.1} className="col-span-full md:col-span-6 xl:col-span-6">
              <h1 className="text-pretty text-lead">
                Sou Pedro Braga, Arquiteto e Urbanista brasileiro, natural de São Paulo – SP, formado pela{" "}
                <a
                  href="https://portal.fmu.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline link-underline-static focus-ring"
                >
                  FMU – FIAM FAAM
                </a>
                .
              </h1>
            </FadeIn>
          </Grid>
        </section>

        <section id="projetos" aria-label="Projetos" className="scroll-mt-space-4">
          <Grid className="gap-y-space-6 md:gap-y-space-7">
            {sortedProjects.map((project, index) => (
              <ProjectFeature key={project.slug} project={project} index={index} />
            ))}
          </Grid>
        </section>

        <ProjectIndex projects={sortedProjects} />
      </main>

      <Footer />
    </div>
  );
}
