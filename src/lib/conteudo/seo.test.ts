import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TITULO_MAX, tituloFinal } from "../seo";
import { ARVORE, type No } from "./arvore";
import { arquivoFigura, todasAsFiguras } from "./figuras";
import { HUBS_TEXTOS, TEXTOS } from "./textos";

/**
 * SEO on-page de cada página, verificado a cada mudança: a palavra-chave principal
 * (o 1º termo do nó na árvore) tem de estar no título, no H1, na descrição e na
 * resposta curta; título e descrição no tamanho que o Google mostra inteiro.
 */

const PARADAS = new Set(["de", "da", "do", "das", "dos", "para", "pra", "um", "uma", "o", "a", "os", "as", "e", "com", "em", "no", "na", "pelo", "pela", "que", "se", "meu", "minha", "como", "o que"]);
const sem = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
/** Palavras da busca que importam, reduzidas ao radical (imovel/imoveis, financiar/financiamento). */
const radicais = (busca: string) =>
  sem(busca)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !PARADAS.has(w))
    .map((w) => (w.length >= 6 ? w.slice(0, 5) : w));
const contem = (texto: string, busca: string) => {
  const t = sem(texto);
  return radicais(busca).every((r) => t.includes(r));
};

type Pagina = { n: No; titulo: string; h1: string; descricao: string; abertura: string };

function paginas(): Pagina[] {
  return ARVORE.filter((n) => n.status === "publicado" && n.tipo !== "glossario").flatMap((n) => {
    const t = TEXTOS[n.id];
    if (t) return [{ n, titulo: t.tituloSeo ?? n.titulo, h1: t.h1 ?? n.titulo, descricao: t.descricao, abertura: t.resposta }];
    const h = HUBS_TEXTOS[n.id];
    if (h) return [{ n, titulo: h.tituloSeo ?? n.titulo, h1: n.titulo, descricao: h.descricao, abertura: h.intro }];
    return [];
  });
}

describe("SEO on-page", () => {
  const todas = paginas();

  it("título cabe inteiro no Google", () => {
    for (const p of todas) expect(tituloFinal(p.titulo).length, `${p.n.id}: "${p.titulo}"`).toBeLessThanOrEqual(TITULO_MAX + 3);
  });

  it("descrição entre 110 e 160 caracteres", () => {
    for (const p of todas) {
      expect(p.descricao.length, `${p.n.id} (${p.descricao.length})`).toBeGreaterThanOrEqual(110);
      expect(p.descricao.length, `${p.n.id} (${p.descricao.length})`).toBeLessThanOrEqual(160);
    }
  });

  it("palavra-chave principal no título, no H1, na descrição e na abertura", () => {
    for (const p of todas.filter((x) => x.n.termos.length)) {
      const kw = p.n.termos[0][0];
      expect(contem(p.titulo, kw), `${p.n.id}: título sem "${kw}"`).toBe(true);
      expect(contem(p.h1, kw), `${p.n.id}: H1 sem "${kw}"`).toBe(true);
      expect(contem(p.descricao, kw), `${p.n.id}: descrição sem "${kw}"`).toBe(true);
      expect(contem(p.abertura, kw), `${p.n.id}: abertura sem "${kw}"`).toBe(true);
    }
  });

  it("toda figura tem arquivo gerado e texto alternativo que descreve", () => {
    const vistos = new Set<string>();
    for (const { pagina, figura } of todasAsFiguras()) {
      const chave = `${pagina}-${figura.id}`;
      expect(vistos.has(chave), `figura repetida: ${chave}`).toBe(false);
      vistos.add(chave);
      expect(figura.alt.length, `${chave}: alt curto`).toBeGreaterThanOrEqual(50);
      expect(figura.alt.length, `${chave}: alt longo`).toBeLessThanOrEqual(180);
      expect(existsSync(join(process.cwd(), "public", arquivoFigura(pagina, figura.id))), `${chave}: rode npm run figuras`).toBe(true);
    }
  });
});
