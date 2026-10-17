import { ReactNode } from "react";
import { Grid } from "@/components/Grid";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Project } from "@/data/projects";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <FadeIn className="grid grid-cols-1 gap-y-space-1 border-t border-rule py-space-3 md:grid-cols-8 md:gap-x-gutter xl:grid-cols-8">
      <dt className="text-h2 md:col-span-3">{label}</dt>
      <dd className="max-w-measure text-pretty text-body md:col-span-5">{children}</dd>
    </FadeIn>
  );
}

/**
 * Ficha técnica em linhas (estilo "Arquitetura Isay Weinfeld / Paisagismo
 * Rodrigo Oliveira"): rótulo à esquerda, valor à direita, fio de 1px.
 * Só entram as linhas que existem em data/projects.ts; Ferramentas e
 * Autoria/Créditos vêm de `software` e `credits`.
 */
export function ProjectSpecs({ project }: { project: Project }) {
  const { specs, software, credits } = project;

  return (
    <section aria-labelledby="ficha" className="pt-space-7 md:pt-space-8">
      <Grid className="gap-y-space-4">
        <FadeIn className="col-span-full xl:col-span-4">
          <h2 id="ficha" className="text-h2">
            Ficha técnica
          </h2>
        </FadeIn>
        <dl className="col-span-full border-b border-rule xl:col-span-8 xl:col-start-5">
          {specs.map((spec) => (
            <Row key={spec.label} label={spec.label}>
              {spec.value}
            </Row>
          ))}
          <Row label="Ferramentas">
            {software.value}
            <span className="block text-muted">{software.label}</span>
          </Row>
          {credits.office ? (
            <Row label="Créditos">
              Projeto de autoria de{" "}
              <a
                href={credits.office.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline link-underline-static focus-ring"
              >
                {credits.office.name}
              </a>
              . Modelagem e desenho técnico por Pedro Braga.
            </Row>
          ) : (
            credits.authorship && (
              <Row label="Autoria">
                {credits.authorship.title}
                <span className="block text-muted">{credits.authorship.body}</span>
              </Row>
            )
          )}
        </dl>
      </Grid>
    </section>
  );
}
