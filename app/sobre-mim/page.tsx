import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Grid } from "@/components/Grid";
import { BioSection } from "@/components/BioSection";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Sobre mim — Pedro Braga | Arquiteto e Urbanista",
    description:
      "Conheça Pedro Braga, arquiteto e urbanista paulistano — sua trajetória, o interesse por design de interiores e o processo criativo no desenho à mão livre.",
    path: "/sobre-mim",
  });
}

const BIO_PARAGRAPHS = [
  "Nasci e cresci em São Paulo, uma cidade que, pela sua escala, diversidade e constante transformação, despertou em mim diferentes formas de observar e compreender a arquitetura. Viajar e conhecer novos lugares, culturas e modos de viver ampliou ainda mais esse olhar, fazendo da observação uma parte importante do meu processo de aprendizado.",
  "Minha relação com a arquitetura vai além do projeto. Tenho grande interesse pelas artes e procuro compreender os espaços também através do cotidiano: dos percursos, das rotinas, das relações entre as pessoas e das diferentes maneiras de ocupar e transformar um lugar. Acredito que muito do que aprendemos sobre arquitetura está justamente no viver.",
  "Tenho especial interesse por Design de Interiores e pelos elementos que influenciam diretamente a experiência dos ambientes, como iluminação, acústica, materialidade e conforto. Gosto de entender como cada uma dessas escolhas pode transformar não apenas a percepção de um espaço, mas também a forma como ele é utilizado.",
  "A curiosidade é uma característica presente no meu processo criativo. Mesmo em meio às ferramentas digitais, mantenho o desenho à mão como uma forma de explorar ideias, observar e pensar arquitetura — do primeiro traço às decisões que constroem o projeto.",
];

export default function SobreMimPage() {
  return (
    <div className="theme-dark min-h-screen bg-night text-paper">
      <Header theme="dark" />

      <main>
        {/* Same 164px header→content distance used on Home, for vertical consistency between screens. */}
        <section className="pb-before-footer pt-header-to-content">
          <Grid>
            {/* Page's single <h1> — was missing entirely before (the bio
                paragraphs had no heading above them at all). */}
            <h1 className="col-span-2 mb-8 text-[24px] leading-[31px] text-paper sm:col-span-5 sm:mb-12 sm:text-hero">
              Sobre mim
            </h1>
            <BioSection paragraphs={BIO_PARAGRAPHS} />
          </Grid>
        </section>
      </main>

      <Footer />
    </div>
  );
}
