import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/badge";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Grade } from "@/components/duvide/Grade";
import { CARTAS } from "@/lib/conteudo/duvide";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = metadadosPagina({
  titulo: "Duvide: armadilhas na compra e venda de imóvel",
  descricao: "Contrato de gaveta, ágio, preço por fora, sinal, leilão: as frases que todo mundo repete na compra e venda de imóvel, com o que é armadilha e o que é segredo.",
  slug: "/duvide/",
  capa: { url: "/cartas/contrato-de-gaveta.jpg", alt: "Duvide: contrato de gaveta é seguro? Armadilha.", width: 1080, height: 1350 },
});

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Duvide: armadilhas na compra e venda de imóvel",
  url: `${SITE.url}/duvide/`,
  inLanguage: "pt-BR",
  hasPart: CARTAS.map((c) => ({ "@type": "WebPage", name: c.pergunta, url: `${SITE.url}/duvide/${c.id}/` })),
};

export default function DuvidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-10 pt-12 sm:px-6">
        <header className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>Armadilhas, verdades e segredos</Eyebrow>
            <h1 className="font-display text-[clamp(40px,6.4vw,72px)] font-light leading-[0.98]">
              Ouviu falar? <span className="marca-texto font-semibold">Duvide.</span>
            </h1>
            <p className="max-w-xl text-lg text-ink-2">
              As frases que todo mundo repete na compra e venda de imóvel, com o veredito: o que é <b className="text-ink">armadilha</b> e o que é{" "}
              <b className="text-ink">segredo</b> de quem é do ramo. Cada carta vira imagem para mandar a quem está comprando ou vendendo.
            </p>
            <p className="text-[15px]">
              É corretor?{" "}
              <Link href="/duvide/corretor/" className="font-semibold underline underline-offset-4">
                Veja os posts prontos, com legenda
              </Link>
              .
            </p>
          </div>
          <JoaoDeBarro pose="frente" humor="surpreso" className="w-40 justify-self-center md:w-52" />
        </header>
        <Grade cartas={CARTAS} />
        <p className="max-w-3xl text-sm text-muted">
          Conteúdo educativo. Para o seu caso, confirme com o banco e, em questões jurídicas e de imposto, com um advogado ou contador.
        </p>
      </div>
    </>
  );
}
