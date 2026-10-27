import type { Metadata } from "next";
import { SITE } from "./site-config";

/** Até onde o Google mostra o título sem cortar (aprox. 600 px ≈ 60–65 caracteres). */
export const TITULO_MAX = 62;
const SUFIXO = ` · ${SITE.nome}`;

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
      ...(capa && { images: [capa] }),
    },
    twitter: { card: "summary_large_image", title: titulo, description: descricao, ...(capa && { images: [capa.url] }) },
  };
}
