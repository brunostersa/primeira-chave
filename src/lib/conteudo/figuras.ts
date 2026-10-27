import { HUBS_TEXTOS, TEXTOS } from "./textos";
import { FIGURAS_PROPRIAS } from "./textos/proprias";
import type { Bloco, Figura } from "./tipos";

/**
 * As figuras (infográficos) declaradas nos textos. Cada uma vira um arquivo
 * /figuras/<pagina>-<id>.webp gerado por scripts/gerar-figuras.mjs.
 */

export const arquivoFigura = (pagina: string, id: string) => `/figuras/${pagina}-${id}.webp`;

const blocosDe = (pagina: string): Bloco[] => {
  const t = TEXTOS[pagina] ?? HUBS_TEXTOS[pagina];
  return t?.secoes?.flatMap((s) => s.blocos) ?? [];
};

export const figurasDe = (pagina: string): Figura[] => [
  ...blocosDe(pagina).flatMap((b) => ("figura" in b ? [b.figura] : [])),
  ...(FIGURAS_PROPRIAS[pagina] ?? []),
];

/** A figura de uma página escrita à mão, pelo id. */
export const figuraPropria = (pagina: string, id: string) => FIGURAS_PROPRIAS[pagina].find((f) => f.id === id)!;

/** Todas, para a rota de exportação e o teste (arquivo existe, texto alternativo bom). */
export const todasAsFiguras = () =>
  [...new Set([...Object.keys(TEXTOS), ...Object.keys(HUBS_TEXTOS), ...Object.keys(FIGURAS_PROPRIAS)])].flatMap((pagina) => figurasDe(pagina).map((figura) => ({ pagina, figura })));

/** A capa da página nas redes: a primeira figura dela, se houver. */
export const capaDe = (pagina: string) => {
  const f = figurasDe(pagina)[0];
  return f ? { url: arquivoFigura(pagina, f.id), alt: f.alt, width: 1200, height: 675 } : null;
};
