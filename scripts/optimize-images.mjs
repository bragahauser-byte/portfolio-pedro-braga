// Gera versões responsivas (.avif + .webp) de cada imagem em
// public/images/projects/<slug>/ e um manifesto com as dimensões reais,
// lido por components/media/Picture.tsx para montar o srcset e reservar o
// aspect-ratio (zero layout shift). Os originais nunca são alterados.
//
// Uso: npm run images  (rodar de novo sempre que entrar uma imagem nova)
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "public/images/projects";
const OUTPUT_DIR = "public/images/optimized";
const MANIFEST = "data/image-manifest.json";
const WIDTHS = [640, 1080, 1600, 2400];
// Desenhos técnicos mantêm a folha inteira; nas fotos/renders, faixas
// brancas que vieram embutidas na exportação são aparadas (só nas variantes).
const DRAWING = /^(planta|corte|elevacao|legenda|estudo)-/;

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

const manifest = {};

for (const slug of (await readdir(SOURCE_DIR)).sort()) {
  const files = (await readdir(path.join(SOURCE_DIR, slug))).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  await mkdir(path.join(OUTPUT_DIR, slug), { recursive: true });

  for (const file of files) {
    const source = path.join(SOURCE_DIR, slug, file);
    let input = source;
    let { width, height } = await sharp(source).metadata();
    if (!DRAWING.test(file)) {
      const { data, info } = await sharp(source)
        .trim({ background: "#ffffff", threshold: 12 })
        .toBuffer({ resolveWithObject: true });
      if (info.width !== width || info.height !== height) {
        console.log(`  aparado: ${slug}/${file} ${width}x${height} → ${info.width}x${info.height}`);
        input = data;
        ({ width, height } = info);
      }
    }
    const name = file.replace(/\.[^.]+$/, "");
    // Nunca amplia: a maior versão é a própria largura original.
    const widths = [...new Set(WIDTHS.filter((w) => w < width).concat(Math.min(width, WIDTHS.at(-1))))];

    for (const w of widths) {
      const base = path.join(OUTPUT_DIR, slug, `${name}-${w}`);
      if (!(await exists(`${base}.webp`))) {
        await sharp(input).resize({ width: w }).webp({ quality: 78 }).toFile(`${base}.webp`);
      }
      if (!(await exists(`${base}.avif`))) {
        await sharp(input).resize({ width: w }).avif({ quality: 52, effort: 5 }).toFile(`${base}.avif`);
      }
    }

    manifest[`/images/projects/${slug}/${file}`] = {
      width,
      height,
      base: `/images/optimized/${slug}/${name}`,
      widths,
    };
    console.log(`${slug}/${file} → ${widths.join(", ")}`);
  }
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Manifesto: ${MANIFEST} (${Object.keys(manifest).length} imagens)`);
