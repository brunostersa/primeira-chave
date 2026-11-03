import type { Metadata } from "next";
import Link from "next/link";
import { CartaoImovel } from "@/components/imoveis/CartaoImovel";
import { Eyebrow } from "@/components/ui/badge";
import { IMOVEIS_DE_OURO } from "@/lib/imoveis-de-ouro";
import { metadadosPagina } from "@/lib/seo";

export const metadata: Metadata = metadadosPagina({
  titulo: "Seleção de imóvel de ouro",
  descricao: "Poucos imóveis por cidade, cada um com preço, avaliação do banco, entrada, parcela, custos e o checklist do selo João aprova.",
  slug: "/imoveis-de-ouro/",
});

const CIDADES = [...new Map(IMOVEIS_DE_OURO.map((i) => [i.cidade.id, i.cidade])).values()];

/** Porta da Seleção de imóvel de ouro: as cidades e os imóveis de cada uma. */
export default function ImoveisDeOuroPage() {
  return (
    <article className="mx-auto flex max-w-4xl flex-col gap-12 px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
      <header className="flex flex-col gap-4">
        <Eyebrow>Seleção de imóvel de ouro</Eyebrow>
        <h1 className="font-display text-[clamp(36px,6vw,56px)] font-light leading-[1.03]">
          Poucos imóveis, <span className="marca-texto font-semibold">explicados como ninguém.</span>
        </h1>
        <p className="text-lg text-ink-2">
          Cada imóvel da seleção tem a página mais completa que você vai achar sobre ele: preço, avaliação do banco, entrada, parcela no SAC e no PRICE, renda mínima, custos da compra e o checklist do selo João aprova, com o que já foi conferido e o
          que falta.
        </p>
      </header>
      {CIDADES.map((c) => (
        <section key={c.id} aria-labelledby={`cidade-${c.id}`} className="flex flex-col gap-4">
          <h2 id={`cidade-${c.id}`} className="font-display text-2xl font-semibold">
            <Link href={`/imoveis-de-ouro/${c.id}/`} className="hover:underline">
              {c.nome} ({c.uf})
            </Link>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {IMOVEIS_DE_OURO.filter((i) => i.cidade.id === c.id).map((i) => (
              <CartaoImovel key={i.id} id={i.id} />
            ))}
          </div>
        </section>
      ))}
      <p className="text-sm text-muted">
        A Primeira Chave é conteúdo educativo: não é banco, correspondente nem imobiliária, e não intermedeia a venda. O contato é sempre direto com quem anuncia.
      </p>
    </article>
  );
}
