import { describe, expect, it } from "vitest";
import { ARVORE } from "./arvore";
import { CARTAS } from "./duvide";
import { PERSONAS } from "./personas";

/** As personas só apontam para páginas que existem (árvore publicada ou rotas fixas). */
const FIXAS = ["/duvide/", "/duvide/corretor/", "/sobre/", "/mapa/", ...CARTAS.map((c) => `/duvide/${c.id}/`)];
const existe = (href: string) => FIXAS.includes(href) || ARVORE.some((n) => n.slug === href && n.status === "publicado");

describe("personas", () => {
  it("ids únicos", () => {
    const ids = PERSONAS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("todo link e toda carta citada existem", () => {
    for (const p of PERSONAS) {
      for (const a of p.ajuda) expect(existe(a.href), `${p.id} → ${a.href}`).toBe(true);
      for (const c of p.cartas) expect(CARTAS.some((x) => x.id === c), `${p.id} → carta ${c}`).toBe(true);
    }
  });

  it("título e descrição no tamanho do Google", () => {
    for (const p of PERSONAS) {
      expect(p.tituloSeo.length, p.id).toBeLessThanOrEqual(62);
      expect(p.descricao.length, p.id).toBeGreaterThanOrEqual(110);
      expect(p.descricao.length, p.id).toBeLessThanOrEqual(160);
    }
  });
});
