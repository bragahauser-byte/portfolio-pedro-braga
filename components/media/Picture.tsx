/// <reference types="react-dom/canary" />
import { CSSProperties } from "react";
import { preload } from "react-dom";
import manifest from "@/data/image-manifest.json";
import { withBasePath } from "@/lib/paths";

type ManifestEntry = { width: number; height: number; base: string; widths: number[] };

const entries = manifest as Record<string, ManifestEntry>;

/** Dimensões reais da imagem (data/image-manifest.json). */
export function getImageSize(src: string) {
  const entry = entries[src];
  return entry ? { width: entry.width, height: entry.height } : { width: 3, height: 2 };
}

function srcSet(entry: ManifestEntry, ext: "avif" | "webp") {
  return entry.widths.map((w) => `${withBasePath(`${entry.base}-${w}.${ext}`)} ${w}w`).join(", ");
}

/**
 * <picture> com AVIF/WebP responsivos gerados por `npm run images`, com
 * fallback para o arquivo original. Sempre leva width/height reais (zero
 * layout shift) e é lazy, exceto a imagem prioritária (hero), que ganha
 * preload com fetchpriority alta.
 *
 * `fit="contain"` é obrigatório para plantas, cortes e croquis — desenho
 * técnico nunca é cortado.
 */
export function Picture({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  fit = "cover",
  focal,
  className = "",
  imgClassName = "",
  style,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  focal?: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
}) {
  const entry = entries[src];
  const { width, height } = getImageSize(src);

  if (entry && priority) {
    preload(withBasePath(`${entry.base}-${entry.widths.at(-1)}.avif`), {
      as: "image",
      type: "image/avif",
      imageSrcSet: srcSet(entry, "avif"),
      imageSizes: sizes,
      fetchPriority: "high",
    });
  }

  return (
    <picture className={className}>
      {entry && <source type="image/avif" srcSet={srcSet(entry, "avif")} sizes={sizes} />}
      {entry && <source type="image/webp" srcSet={srcSet(entry, "webp")} sizes={sizes} />}
      {/* eslint-disable-next-line @next/next/no-img-element -- static export: as variantes vêm do script de imagens, não do next/image */}
      <img
        src={withBasePath(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={`block h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${imgClassName}`}
        style={{ objectPosition: focal, ...style }}
      />
    </picture>
  );
}
