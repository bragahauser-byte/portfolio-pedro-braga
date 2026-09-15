import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectSection } from "@/components/project/ProjectSection";
import { ProjectGalleryImage } from "@/components/project/ProjectGalleryImage";
import { ProjectStats } from "@/components/project/ProjectStats";
import { ProjectSpecs } from "@/components/project/ProjectSpecs";
import { ProjectSoftware } from "@/components/project/ProjectSoftware";
import { getProjectBySlug, projects } from "@/data/projects";
import { buildMetadata, projectJsonLd } from "@/lib/seo";

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
    description: project.metaDescription,
    path: `/projetos/${project.slug}`,
  });
}

// Groups consecutive photos into rows of up to 2 (a trailing odd photo
// gets its own row) — used for the technical-drawing tail in `gallery`,
// which always renders as plain symmetric pairs.
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

  // Trailing photos (plantas/cortes/elevações) not tied to any section —
  // always plain symmetric pairs, closing out the page after stats/specs.
  const extraChunks = chunkIntoPairs(project.gallery);

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* schema.org/CreativeWork — describes this project specifically and
          links it back to Pedro Braga as `creator` (see lib/seo.ts). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <Header theme="light" />

      <main>
        <ProjectHero project={project} />

        {project.sections.map((section) => {
          const photos = section.images?.photos ?? [];
          return (
            <div key={section.title}>
              <ProjectSection section={section} />
              <ProjectGalleryImage
                variant={section.images?.variant}
                images={photos.map((src, photoIndex) => ({
                  src,
                  alt: `${project.title} — ${section.title}${photos.length > 1 ? ` (${photoIndex + 1}/${photos.length})` : ""}`,
                }))}
              />
            </div>
          );
        })}

        <ProjectStats title="Números do projeto" stats={project.bigNumbers} />

        {project.detailedSpecs && <ProjectSpecs specs={project.detailedSpecs} />}

        {/* Any gallery images beyond what the sections above could pair up with
            (e.g. plantas/cortes technical drawings) close out the page here.
            Each already carries its own descriptive alt from data/projects.ts. */}
        {extraChunks.map((chunk) => (
          <ProjectGalleryImage key={chunk.map((image) => image.src).join("|")} images={chunk} />
        ))}

        <ProjectSoftware
          value={project.software.value}
          label={project.software.label}
          creditLine={project.creditLine}
        />
      </main>

      <Footer />
    </div>
  );
}
