import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Guia } from "@/components/conteudo/Guia";
import { HubPagina } from "@/components/conteudo/HubPagina";
import { GlossarioIndice, TermoPagina } from "@/components/conteudo/TermoPagina";
import { Secoes } from "@/components/conteudo/Blocos";
import { Calculo } from "@/components/conteudo/calculos";
import { Rico } from "@/components/conteudo/Rico";
import { ARVORE } from "@/lib/conteudo/arvore";
import { HUBS_TEXTOS, naRotaUnica, TEXTOS } from "@/lib/conteudo/textos";

/**
 * Rota única do conteúdo: monta qualquer página publicada da árvore com o molde
 * do tipo dela (guia, hub ou termo). Páginas com rota própria ficam de fora.
 */

export const dynamicParams = false;


const PAGINAS = ARVORE.filter(naRotaUnica);
type Props = { params: Promise<{ caminho: string[] }> };

const porCaminho = (caminho: string[]) => PAGINAS.find((n) => n.slug === `/${caminho.join("/")}/`);

export function generateStaticParams() {
  return PAGINAS.map((n) => ({ caminho: n.slug.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { caminho } = await params;
  const n = porCaminho(caminho);
  if (!n) return {};
  const texto = TEXTOS[n.id];
  const descricao = texto?.descricao ?? HUBS_TEXTOS[n.id]?.descricao ?? n.resumo;
  return {
    title: texto?.tituloSeo ?? (n.tipo === "glossario" ? `${n.titulo}: o que é` : n.titulo),
    description: descricao,
    alternates: { canonical: n.slug },
  };
}

export default async function PaginaConteudo({ params }: Props) {
  const { caminho } = await params;
  const n = porCaminho(caminho);
  if (!n) notFound();

  if (n.id === "glossario") return <GlossarioIndice />;
  if (n.tipo === "glossario") return <TermoPagina id={n.id} />;
  if (n.tipo === "hub") {
    const h = HUBS_TEXTOS[n.id];
    return <HubPagina id={n.id} intro={h.intro} extra={h.calculo && <Calculo nome={h.calculo} />} />;
  }
  const t = TEXTOS[n.id];
  return (
    <Guia id={n.id} faq={t.faq} resposta={<Rico texto={t.resposta} />}>
      <Secoes secoes={t.secoes} />
    </Guia>
  );
}
