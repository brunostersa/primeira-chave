import { describe, expect, it } from "vitest";
import { ARVORE } from "@/lib/conteudo/arvore";
import { HUBS_TEXTOS, TEXTOS, GLOSSARIO_TEXTOS } from "@/lib/conteudo/textos";
import { conhecimento } from "./conhecimento";

describe("conhecimento do João", () => {
  const { trechos } = conhecimento();

  it("toda página publicada com texto entra no índice", () => {
    const noIndice = new Set(trechos.map((t) => t.pagina));
    const faltando = ARVORE.filter((n) => n.status === "publicado" && (TEXTOS[n.id] || HUBS_TEXTOS[n.id] || GLOSSARIO_TEXTOS[n.id.replace(/^g-/, "")])).filter((n) => !noIndice.has(n.id));
    expect(faltando.map((n) => n.id)).toEqual([]);
  });

  it("os ids são únicos e todo trecho tem URL pública e texto", () => {
    expect(new Set(trechos.map((t) => t.id)).size).toBe(trechos.length);
    for (const t of trechos) {
      expect(t.url).toMatch(/^https:\/\/primeirachave\.com\.br\//);
      expect(t.texto.length).toBeGreaterThan(0);
    }
  });

  it("não sobra marcação de texto rico", () => {
    for (const t of trechos) expect(t.texto).not.toMatch(/\*\*|\]\(#|\]\(g:/);
  });

  it("não inclui imóveis: por enquanto o João não sugere imóvel", () => {
    expect(trechos.some((t) => t.url.includes("/imoveis-de-ouro/"))).toBe(false);
  });
});
