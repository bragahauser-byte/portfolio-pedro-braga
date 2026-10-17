import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectClosing } from "@/components/project/ProjectClosing";
import { ProjectDrawings } from "@/components/project/ProjectDrawings";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectNumbers } from "@/components/project/ProjectNumbers";
import { ProjectOpening } from "@/components/project/ProjectOpening";
import { ProjectSection } from "@/components/project/ProjectSection";
import { ProjectSpecs } from "@/components/project/ProjectSpecs";
import { getNextProject, getProjectBySlug, projects, sortedProjects } from "@/data/projects";
import { buildMetadata, projectJsonLd } from "@/lib/seo";

// Static export: toda rota dinâmica precisa ser gerada no build.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return buildMetadata({ path: `/projetos/${params.slug}` });
  }
  return buildMetadata({
    title: `${project.title} — Pedro Braga | Arquiteto e Urbanista`,
    description: project.metaDescription,
    path: `/projetos/${project.slug}`,
    image: { src: project.hero.src, alt: project.hero.alt },
    type: "article",
  });
}

/**
 * Página de projeto, de cima para baixo: hero (título + frase) → imagens
 * de abertura → seções com composições assimétricas
 * → plantas e cortes → números → ficha técnica → fechamento escuro com os
 * outros projetos e o próximo case → contato. Tudo vem de data/projects.ts.
 */
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const others = sortedProjects.filter((other) => other.slug !== project.slug);
  const next = getNextProject(project.slug);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <Header />

      <main>
        <ProjectHero project={project} />
        <ProjectOpening project={project} />
        {project.sections.map((section) => (
          <ProjectSection key={section.title} section={section} />
        ))}
        <ProjectDrawings drawings={project.drawings} />
        <ProjectNumbers numbers={project.numbers} />
        <ProjectSpecs project={project} />
        <ProjectClosing others={others} next={next} />
      </main>

      <Footer theme="dark" />
    </div>
  );
}
