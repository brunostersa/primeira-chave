import type { Metadata } from "next";
import Link from "next/link";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Ilustracao } from "@/components/brand/ilustracoes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/badge";
import { Secao } from "@/components/conteudo/pecas";
import { estatisticas, no } from "@/lib/conteudo/links";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

/**
 * Página institucional: por que a Primeira Chave existe, quem está por trás e o que
 * ela é (e não é). Tudo aqui é afirmação sobre nós: só fatos confirmados pelo Bruno.
 */

export const metadata: Metadata = metadadosPagina({
  titulo: "Sobre a Primeira Chave: quem faz e por quê",
  descricao: "A Primeira Chave traduz as regras do financiamento do primeiro imóvel em português claro. Conheça a proposta, quem está por trás e como trabalhamos.",
  slug: "/sobre/",
});

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre a Primeira Chave",
  url: `${SITE.url}/sobre/`,
  inLanguage: "pt-BR",
  about: { "@id": `${SITE.url}/#org` },
  publisher: { "@type": "Organization", name: "CustomerHub", url: "https://customerhub.com.br" },
};

export default function SobrePage() {
  const est = estatisticas();
  const simulador = no("simulador");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <article className="mx-auto flex max-w-6xl flex-col gap-14 px-4 pb-10 pt-12 sm:px-6">
        <header className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>Sobre a Primeira Chave</Eyebrow>
            <h1 className="font-display text-[clamp(36px,5.6vw,60px)] font-light leading-[1.02]">
              Comprar o primeiro imóvel não precisa ser <span className="marca-texto font-semibold">um idioma estrangeiro.</span>
            </h1>
            <p className="max-w-xl text-lg text-ink-2">
              Cota, avaliação, SAC, TR, faixa, ônus, ITBI. As regras do financiamento existem, mas estão espalhadas em PDF, sigla e simulador que dá o número sem
              explicar nada. A Primeira Chave nasceu para traduzir tudo isso.
            </p>
          </div>
          <Ilustracao nome="a-chave" className="max-w-md justify-self-center" />
        </header>

        <div className="flex max-w-3xl flex-col gap-12">
          <Secao titulo="A proposta">
            <p>
              Construir um sistema <b>fácil</b>, <b>informativo</b> e que <b>traduza as informações do mercado</b> para quem vai comprar pela primeira vez. Não um
              blog a mais: um caminho, do “quanto eu posso comprar?” até a chave na mão, em que cada página responde uma pergunta e leva à próxima.
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                Um <Link href={simulador.slug} className="font-semibold underline underline-offset-4">simulador</Link> que usa as mesmas regras do simulador da
                Caixa, conferidas em seis perfis de renda, e explica cada número.
              </li>
              <li>
                {est.paginas} páginas conectadas, na ordem da compra, com os termos do banco explicados em uma frase.
              </li>
              <li>
                Dados de mercado de fonte pública: avaliações do Banco Central, preços de anúncio do FipeZAP e compras registradas no ITBI das prefeituras.
              </li>
            </ul>
          </Secao>

          <Secao titulo="Quem está por trás">
            <Card className="grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)]">
              <JoaoDeBarro pose="frente" humor="feliz" className="h-24 w-auto justify-self-center" />
              <div className="flex flex-col gap-3 text-[17px] leading-relaxed text-ink-2">
                <p>
                  A Primeira Chave é uma iniciativa do <b className="text-ink">Bruno</b>, que compra imóveis usados, reforma e revende, e arremata imóveis em leilão. O
                  projeto é feito pela{" "}
                  <a href="https://customerhub.com.br" rel="noopener" className="font-semibold text-ink underline underline-offset-4">
                    CustomerHub
                  </a>
                  , a empresa por trás da plataforma.
                </p>
                <p>
                  Do outro lado do balcão, ele acompanha de perto o que trava quem vai comprar financiado: a avaliação que veio abaixo do preço, o documento que faltou,
                  a entrada que ninguém explicou que podia ser menor. A ideia foi colocar esse conhecimento, que costuma ficar com quem é do ramo, ao alcance de quem
                  está comprando o primeiro imóvel.
                </p>
              </div>
            </Card>
          </Secao>

          <Secao titulo="Como trabalhamos com os números">
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>
                <b>Regras conferidas na fonte.</b> Faixas, juros, prazos e limites saem das normas e do simulador da Caixa, e viram testes automáticos: se a regra
                muda, o site acusa.
              </li>
              <li>
                <b>Fonte e data em cada número.</b> Preço de anúncio é chamado de anúncio; preço pago é chamado de pago. Nunca misturamos os dois.
              </li>
              <li>
                <b>Atualização mensal</b> dos dados de mercado.
              </li>
            </ul>
          </Secao>

          <Secao titulo="O que não somos">
            <ul className="ml-5 flex list-disc flex-col gap-2">
              <li>Não somos banco nem correspondente bancário, e nada aqui é aprovação de crédito.</li>
              <li>Não somos o simulador oficial da Caixa: reproduzimos as regras dela para explicar, e a simulação oficial é do banco.</li>
              <li>Não cobramos para “liberar” financiamento. Desconfie de quem cobra.</li>
            </ul>
          </Secao>

          <Card variant="mark" className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <b className="font-display text-2xl leading-tight">Comece pelo seu número.</b>
              <span>Umas 10 perguntas, sem cadastro.</span>
            </div>
            <Button asChild>
              <Link href={simulador.slug}>Abrir o simulador</Link>
            </Button>
          </Card>

          <p className="text-sm text-muted">
            Fale com a gente pelo{" "}
            <a href={SITE.instagram} rel="noopener" className="underline underline-offset-4">
              Instagram
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
