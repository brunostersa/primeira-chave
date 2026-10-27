import type { Metadata } from "next";
import { SITE } from "./site-config";

/** Até onde o Google mostra o título sem cortar (aprox. 600 px ≈ 60–65 caracteres). */
export const TITULO_MAX = 62;
const SUFIXO = ` · ${SITE.nome}`;

/** Capa padrão nas redes para a página sem figura própria (molde "compartilhamento"). */
export const CAPA_PADRAO = { url: "/og.png", alt: "Primeira Chave: financiamento do primeiro imóvel, explicado", width: 1200, height: 630 };

/** O <title> final: com " · Primeira Chave" só quando ainda cabe inteiro. */
export const tituloFinal = (titulo: string) => (titulo.length + SUFIXO.length <= TITULO_MAX ? titulo + SUFIXO : titulo);

/**
 * Metadados de uma página de conteúdo. A página sobrescreve o openGraph do layout
 * inteiro (o Next não mescla), então título, URL e capa de cada uma vão aqui.
 */
export function metadadosPagina({
  titulo,
  descricao,
  slug,
  capa,
}: {
  titulo: string;
  descricao: string;
  slug: string;
  capa?: { url: string; alt: string; width: number; height: number } | null;
}): Metadata {
  return {
    title: { absolute: tituloFinal(titulo) },
    description: descricao,
    alternates: { canonical: slug },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: SITE.nome,
      url: slug,
      title: titulo,
      description: descricao,
      images: [capa ?? CAPA_PADRAO],
    },
    twitter: { card: "summary_large_image", title: titulo, description: descricao, images: [(capa ?? CAPA_PADRAO).url] },
  };
}
