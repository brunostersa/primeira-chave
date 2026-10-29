import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TopoDaPagina } from "@/components/brand/FotoRecorte";
import { Aviso, faqJsonLd, LinkNo, Perguntas, Secao } from "@/components/conteudo/pecas";
import { BaixarModelo } from "@/components/conteudo/ModeloContrato";
import { Eyebrow } from "@/components/ui/badge";
import { no } from "@/lib/conteudo/links";
import { MODELOS } from "@/lib/modelos/modelos";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

/**
 * Hub dos modelos de contrato: cada modelo com o download direto e o link para a página
 * que explica cláusula por cláusula. Os modelos moram em src/lib/modelos.
 */

const n = no("modelos-de-contrato");
const DESCRICAO =
  "Modelos grátis de contrato de compra e venda de imóvel (financiado e à vista), recibo de sinal, contrato de aluguel, distrato e declaração de primeiro imóvel, em Word e PDF.";

export const metadata: Metadata = metadadosPagina({ titulo: "Modelos de contrato de imóvel para baixar", descricao: DESCRICAO, slug: n.slug });

const FAQ = [
  { q: "Os modelos são grátis?", a: "Sim. Sem cadastro e sem e-mail: clique e baixe em Word ou PDF." },
  { q: "Posso usar sem advogado?", a: "Para um negócio simples entre pessoas, sim, lendo as notas de cada cláusula. Em negócio de valor alto, com pendência no imóvel, inventário ou empresa de um dos lados, peça a revisão de um advogado." },
  { q: "Por que não tem contrato de gaveta?", a: "Porque é atalho fora da regra. Comprar imóvel financiado sem o banco saber deixa o comprador sem a propriedade e sujeito às dívidas do vendedor." },
  { q: "Qual modelo usar se vou financiar?", a: "O contrato de compra e venda com financiamento. Ele tem a cláusula que devolve o sinal se o banco negar o crédito ou a avaliação vier abaixo." },
];

export default function ModelosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: n.titulo,
        description: DESCRICAO,
        inLanguage: "pt-BR",
        url: `${SITE.url}${n.slug}`,
        publisher: { "@id": `${SITE.url}/#org` },
        hasPart: MODELOS.map((m) => ({ "@type": "DigitalDocument", name: no(m.id).titulo, url: `${SITE.url}${no(m.id).slug}` })),
      },
      faqJsonLd(FAQ),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs id={n.id} />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-10 pt-8 sm:px-6">
        <header className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>Word e PDF · grátis · sem cadastro</Eyebrow>
            <h1 className="font-display text-[clamp(36px,5.6vw,60px)] font-light leading-[1.02]">
              Modelos de contrato <span className="marca-texto font-semibold">para baixar</span>
            </h1>
            <p className="text-lg text-ink-2">
              Os papéis que você vai assinar na compra ou na venda do primeiro imóvel, em português claro. Campos a preencher grifados, cada cláusula explicada e um prompt pronto para preencher com IA.
            </p>
          </div>
          <TopoDaPagina id={n.id} ilustracao={n.ilustracao} className="max-w-md justify-self-center" />
        </header>

        <ul className="grid gap-4 md:grid-cols-2">
          {MODELOS.map((m) => {
            const mn = no(m.id);
            return (
              <li key={m.id} className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-6">
                <Link href={mn.slug} className="flex flex-col gap-1 no-underline hover:underline">
                  <b className="font-display text-xl leading-snug">{mn.titulo}</b>
                  <span className="text-ink-2">{mn.resumo}</span>
                </Link>
                <p className="text-sm text-ink-2">{m.quando}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                  <BaixarModelo modelo={m} compacto />
                  <Link href={mn.slug} className="text-sm font-semibold underline underline-offset-4">
                    Ler as cláusulas
                  </Link>
                  <Link href={`${mn.slug}#preencha-com-uma-ia`} className="text-sm font-semibold underline underline-offset-4">
                    Preencher com IA
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex max-w-3xl flex-col gap-12">
          <Secao titulo="Antes de assinar">
            <ul className="list-disc pl-5">
              <li>
                Confira a <LinkNo id="certidao-matricula">certidão de matrícula</LinkNo> atualizada: o dono e as travas do imóvel estão lá, não no anúncio.
              </li>
              <li>
                Vai financiar? Pague o sinal só depois da <LinkNo id="avaliacao-do-imovel">avaliação do banco</LinkNo>, e com a cláusula do financiamento negado no
                contrato.
              </li>
              <li>Pague por PIX ou transferência, nunca em dinheiro vivo sem recibo.</li>
              <li>
                O que um contrato precisa ter, item por item: <LinkNo id="contrato-compra-venda">contrato de compra e venda, o que não pode faltar</LinkNo>.
              </li>
            </ul>
            <Aviso titulo="Modelo educativo, não parecer jurídico">
              Os modelos servem para negócios simples entre pessoas. Em negócio de valor alto ou com qualquer pendência, peça a revisão de um advogado.
            </Aviso>
          </Secao>

          <Secao titulo="O que não tem aqui (e por quê)">
            <ul className="list-disc pl-5">
              <li>
                <b>Contrato de gaveta</b> e <b>preço por fora</b>: são atalhos fora da regra e quem paga a conta é o comprador. Veja os riscos no{" "}
                <Link href="/duvide/" className="underline underline-offset-4">
                  Duvide
                </Link>
                .
              </li>
              <li>
                <b>Cessão de direitos de imóvel financiado</b>: sem o banco concordar, vira gaveta. Com ele, o banco tem papelada própria.
              </li>
              <li>
                <b>Compra na planta</b>: a construtora tem contrato próprio, com regras de devolução da Lei 13.786/2018.
              </li>
            </ul>
          </Secao>

          <Perguntas faq={FAQ} />
        </div>
      </div>
    </>
  );
}
