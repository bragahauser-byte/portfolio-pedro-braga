import { ReactNode } from "react";
import { Grid, TEXT_COLUMN, TEXT_COLUMN_WIDE } from "@/components/Grid";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Project } from "@/data/projects";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <FadeIn className="border-t border-rule py-10 first:border-t-0 first:pt-0">
      <dt className="text-20 md:text-24">{label}</dt>
      <dd className="mt-2 max-w-small text-pretty text-14">{children}</dd>
    </FadeIn>
  );
}

/**
 * Ficha técnica nas linhas da referência ("Arquitetura Isay Weinfeld /
 * Paisagismo Rodrigo Oliveira"): rótulo 24/32 e valor 14/20 embaixo, fio
 * de 1px #EEE entre as linhas, tudo na coluna da tipografia.
 */
export function ProjectSpecs({ project }: { project: Project }) {
  const { specs, software, credits } = project;

  return (
    <section aria-labelledby="ficha" className="pt-20 md:pt-30 xl:pt-40">
      <Grid>
        <FadeIn className={TEXT_COLUMN}>
          <h2 id="ficha" className="text-20 md:text-24">
            Ficha técnica
          </h2>
        </FadeIn>
        <dl className={`${TEXT_COLUMN_WIDE} mt-12 border-b border-rule xl:mt-16`}>
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
