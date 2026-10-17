import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Grid, TEXT_COLUMN } from "@/components/Grid";
import { Header } from "@/components/Header";
import { ProjectFeature } from "@/components/home/ProjectFeature";
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
        <section className="pb-20 pt-20 md:pb-30 md:pt-24 xl:pb-40 xl:pt-28">
          <Grid>
            <FadeIn immediate delay={0.1} className={TEXT_COLUMN}>
              <h1 className="max-w-text text-pretty text-24 md:text-32 xl:text-40-text">
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

        <section id="projetos" aria-label="Projetos" className="scroll-mt-24 pb-20 md:pb-30 xl:pb-40">
          <Grid className="gap-y-20 md:gap-y-30 xl:gap-y-40">
            {sortedProjects.map((project, index) => (
              <ProjectFeature key={project.slug} project={project} index={index} />
            ))}
          </Grid>
        </section>

      </main>

      <Footer />
    </div>
  );
}
