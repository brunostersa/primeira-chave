import { describe, expect, it } from "vitest";
import { ARVORE, ETAPAS, HUBS } from "./arvore";
import { chegando, distancias, existe, ferramenta, hubDe, proximoPasso, saindo } from "./links";
import { GLOSSARIO_TEXTOS, HUBS_TEXTOS, PAGINAS_PROPRIAS, TEXTOS } from "./textos";
import { idsCitados, termosCitados } from "./tipos";

/** As regras do organismo (docs/arquitetura-de-conteudo.md), verificadas a cada mudança. */
describe("árvore de conteúdo", () => {
  it("ids e slugs são únicos e slugs terminam em /", () => {
    const ids = ARVORE.map((n) => n.id);
    const slugs = ARVORE.map((n) => n.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s.endsWith("/"), s).toBe(true);
  });

  it("toda ligação aponta para um nó que existe", () => {
    for (const n of ARVORE) {
      for (const id of n.liga) expect(existe(id), `${n.id} → ${id}`).toBe(true);
      for (const g of n.glossario) expect(existe(`g-${g}`), `${n.id} → glossário ${g}`).toBe(true);
    }
    for (const e of ETAPAS) expect(existe(e.porta), `porta da etapa ${e.id}`).toBe(true);
    for (const h of HUBS) expect(existe(h.no), `hub ${h.id}`).toBe(true);
  });

  it("toda página tem hub, próximo passo ou ferramenta (nunca beco sem saída)", () => {
    for (const n of ARVORE.filter((x) => x.tipo !== "inicio")) {
      expect(hubDe(n), `${n.id} sem hub`).not.toBeNull();
      expect(saindo(n).length, `${n.id} com poucas saídas`).toBeGreaterThanOrEqual(2);
      if (n.tipo !== "glossario") expect(ferramenta(n)).toBeTruthy();
    }
  });

  it("nenhuma página órfã: pelo menos 2 links chegando", () => {
    for (const n of ARVORE.filter((x) => x.tipo !== "inicio")) {
      expect(chegando(n).length, `${n.id} órfã`).toBeGreaterThanOrEqual(2);
    }
  });

  it("toda página está a no máximo 3 cliques da home", () => {
    const d = distancias();
    for (const n of ARVORE) {
      expect(d.has(n.id), `${n.id} inalcançável`).toBe(true);
      expect(d.get(n.id)!, `${n.id} a ${d.get(n.id)} cliques`).toBeLessThanOrEqual(3);
    }
  });

  it("toda página publicada tem conteúdo (texto, hub, termo ou rota própria)", () => {
    for (const n of ARVORE.filter((x) => x.status === "publicado")) {
      const termo = n.id.replace(/^g-/, "");
      const tem =
        PAGINAS_PROPRIAS.has(n.id) || n.id === "glossario" || !!TEXTOS[n.id] || !!HUBS_TEXTOS[n.id] || (n.tipo === "glossario" && !!GLOSSARIO_TEXTOS[termo]);
      expect(tem, `${n.id} publicado sem conteúdo`).toBe(true);
    }
  });

  it("todo link e termo citado nos textos existe na árvore", () => {
    const textos = [
      ...Object.entries(TEXTOS).map(([id, t]) => [id, JSON.stringify(t)]),
      ...Object.entries(HUBS_TEXTOS).map(([id, t]) => [id, JSON.stringify(t)]),
      ...Object.entries(GLOSSARIO_TEXTOS).map(([id, t]) => [`g-${id}`, JSON.stringify(t)]),
    ];
    for (const [id, t] of textos) {
      for (const alvo of idsCitados(t)) expect(existe(alvo), `${id} cita #${alvo}`).toBe(true);
      for (const termo of termosCitados(t)) expect(existe(`g-${termo}`), `${id} cita g:${termo}`).toBe(true);
    }
  });

  it("FAQ é texto puro (vai igual para a página e para o schema)", () => {
    for (const [id, t] of Object.entries(TEXTOS))
      for (const f of t.faq) expect(/\*\*|\]\(/.test(f.q + f.a), `${id}: "${f.q}"`).toBe(false);
  });

  it("a jornada anda pra frente", () => {
    const n = ARVORE.find((x) => x.id === "preparar-a-casa")!;
    expect(proximoPasso(n)?.id).toBe("documentos-financiamento");
  });
});
