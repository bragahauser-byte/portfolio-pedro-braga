import { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Site-wide grid: 80px side margin / 6 columns / 20px gutter on desktop
 * (Figma spec). Collapses to a 24px margin / 2 columns / 16px gutter on
 * small screens, preserving the same relative proportions.
 *
 * Every page and project component MUST use this instead of hardcoding
 * margins, so new project pages stay pixel-consistent with Home/Sobre mim.
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
    <Tag
      className={`mx-auto grid w-full max-w-site grid-cols-2 gap-x-gutter-sm px-grid-margin-sm sm:grid-cols-6 sm:gap-x-gutter sm:px-grid-margin ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Thin wrapper for content that only needs the side margins, no column grid. */
export function GridMargin({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-site px-grid-margin-sm sm:px-grid-margin ${className}`}
    >
      {children}
    </div>
  );
}
