import { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Grid do site: 12 colunas ≥1280px (margem 48px, gutter 20px), 8 no
 * tablet (margem 32px) e 4 no mobile (margem 20px, gutter 14px). Os
 * valores vêm das CSS vars --grid-* em app/globals.css.
 *
 * Toda página e componente DEVE usar este grid em vez de margens
 * hardcoded. Os spans são escritos por breakpoint, ex.:
 * `col-span-4 md:col-span-6 xl:col-span-5 xl:col-start-5`.
 * Compatibilidade com a base antiga de 6 colunas: cada coluna antiga =
 * span 2 no desktop (col-span-3 de 6 → xl:col-span-6 de 12).
 *
 * Exceção deliberada: `.mobile-bleed` (globals.css) faz uma imagem correr
 * de borda a borda no mobile.
 */
export function Grid({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={`site-grid ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/** Só as margens laterais do grid, sem colunas. */
export function GridMargin({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-site px-grid-margin ${className}`}>{children}</Tag>
  );
}
