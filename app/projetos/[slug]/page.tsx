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

// Groups consecutive photos into rows of up to 2 (a trailing odd photo
// gets its own row) — this is what lets ProjectGalleryImage render either
// a single full-width photo or a side-by-side pair with the grid's 20px
// gutter, matching the reference PDFs' mix of single and paired images.
function chunkIntoPairs<T>(items: T[]): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    chunks.push(items.slice(i, i + 2));
  }
  return chunks;
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const galleryChunks = chunkIntoPairs(project.gallery);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header theme="light" />

      <main>
        <ProjectHero project={project} />

        {project.sections.map((section, index) => {
          const chunk = galleryChunks.length > 0 ? galleryChunks[index % galleryChunks.length] : [];
          return (
            <div key={section.title}>
              <ProjectSection section={section} align={index % 2 === 0 ? "left" : "right"} />
              <ProjectGalleryImage
                images={chunk.map((src, photoIndex) => ({
                  src,
                  alt: `${project.title} — ${section.title}${chunk.length > 1 ? ` (${photoIndex + 1}/${chunk.length})` : ""}`,
                }))}
              />
            </div>
          );
        })}

        <ProjectStats title="Números do projeto" stats={project.bigNumbers} />
        <ProjectAuthorship title={project.authorship.title} body={project.authorship.body} />

        {project.detailedSpecs && <ProjectSpecs specs={project.detailedSpecs} />}

        <ProjectSoftware value={project.software.value} label={project.software.label} />
      </main>

      <Footer />
    </div>
  );
}
