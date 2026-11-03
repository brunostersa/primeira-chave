import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CartaoImovel } from "@/components/imoveis/CartaoImovel";
import { Eyebrow } from "@/components/ui/badge";
import { IMOVEIS_DE_OURO, porCidade } from "@/lib/imoveis-de-ouro";
import { metadadosPagina } from "@/lib/seo";

/** Vitrine de uma cidade na Seleção de imóvel de ouro. */

export const dynamicParams = false;
type Props = { params: Promise<{ cidade: string }> };

const cidades = () => [...new Map(IMOVEIS_DE_OURO.map((i) => [i.cidade.id, i.cidade])).values()];

export function generateStaticParams() {
  return cidades().map((c) => ({ cidade: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const c = cidades().find((x) => x.id === cidade);
  if (!c) return {};
  return metadadosPagina({
    titulo: `Imóveis de ouro em ${c.nome}`,
    descricao: `Imóveis escolhidos a dedo em ${c.nome} (${c.uf}), cada um com preço, avaliação do banco, entrada, parcela e o checklist do selo João aprova.`,
    slug: `/imoveis-de-ouro/${c.id}/`,
  });
}

export default async function VitrineCidade({ params }: Props) {
  const { cidade } = await params;
  const c = cidades().find((x) => x.id === cidade);
  if (!c) notFound();
  return (
    <article className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <nav aria-label="Você está em" className="text-sm text-muted">
        <Link href="/imoveis-de-ouro/" className="underline underline-offset-4">
          Imóveis de ouro
        </Link>
      </nav>
      <header className="flex flex-col gap-4">
        <Eyebrow>Seleção de imóvel de ouro</Eyebrow>
        <h1 className="font-display text-[clamp(32px,5.5vw,52px)] font-light leading-[1.05]">
          Imóveis de ouro em <span className="marca-texto font-semibold">{c.nome}</span>
        </h1>
        <p className="text-lg text-ink-2">Poucos, escolhidos a dedo, e cada um explicado como ninguém: preço, avaliação do banco, entrada, parcela, custos e o que falta conferir.</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2">
        {porCidade(c.id).map((i) => (
          <CartaoImovel key={i.id} id={i.id} />
        ))}
      </div>
    </article>
  );
}
