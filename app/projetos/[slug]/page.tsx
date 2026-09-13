import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectSection } from "@/components/project/ProjectSection";
import { ProjectGalleryImage } from "@/components/project/ProjectGalleryImage";
import { ProjectStats } from "@/components/project/ProjectStats";
import { ProjectAuthorship } from "@/components/project/ProjectAuthorship";
import { ProjectSpecs } from "@/components/project/ProjectSpecs";
import { ProjectSoftware } from "@/components/project/ProjectSoftware";
import { getProjectBySlug, projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

// Static export (output: 'export') requires every dynamic route to be
// pre-generated at build time — this is what makes /projetos/[slug] exist
// as real static files in /out.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    // notFound() further down handles the actual 404 render; this just
    // keeps generateMetadata from throwing on an already-invalid slug.
    return buildMetadata({ path: `/projetos/${params.slug}` });
  }
  return buildMetadata({
    title: `${project.title} — Pedro Braga | Arquiteto e Urbanista`,
    description: project.shortText,
    path: `/projetos/${project.slug}`,
  });
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const { gallery } = project;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header theme="light" />

      <main>
        <ProjectHero project={project} />

        {project.sections.map((section, index) => (
          <div key={section.title}>
            <ProjectSection section={section} align={index % 2 === 0 ? "left" : "right"} />
            {gallery.length > 0 && (
              <ProjectGalleryImage
                src={gallery[index % gallery.length]}
                alt={`${project.title} — ${section.title}`}
              />
            )}
          </div>
        ))}

        <ProjectStats title="Números do projeto" stats={project.bigNumbers} />
        <ProjectAuthorship title={project.authorship.title} body={project.authorship.body} />

        {project.detailedSpecs && <ProjectSpecs specs={project.detailedSpecs} />}

        {/* Any gallery images not already paired with a section (e.g. when
            there are more photos than sections) close out the page. */}
        {gallery.length > project.sections.length &&
          gallery.slice(project.sections.length).map((src, i) => (
            <ProjectGalleryImage key={src} src={src} alt={`${project.title} — foto ${i + 1}`} />
          ))}

        <ProjectSoftware value={project.software.value} label={project.software.label} />
      </main>

      <Footer />
    </div>
  );
}
