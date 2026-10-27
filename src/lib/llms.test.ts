import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ARVORE } from "./conteudo/arvore";
import { CARTAS } from "./conteudo/duvide";
import { PERSONAS } from "./conteudo/personas";
import { llmsFullTxt, llmsTxt } from "./llms";
import { SITE } from "./site-config";

/** O que os assistentes de IA leem: só páginas que existem, sem marcação interna vazando. */
const FIXAS = ["/", "/duvide/", "/para/", "/sobre/", "/mapa/", "/glossario/", "/llms-full.txt", ...CARTAS.map((c) => `/duvide/${c.id}/`), ...PERSONAS.map((p) => `/para/${p.id}/`)];
const existe = (slug: string) => FIXAS.includes(slug) || ARVORE.some((n) => n.slug === slug && n.status === "publicado");

describe("llms.txt", () => {
  it("começa pelo título e pelo resumo, como pede o padrão", () => {
    const t = llmsTxt();
    expect(t.startsWith(`# ${SITE.nome}\n\n> `)).toBe(true);
  });

  it("todo link aponta para uma página publicada", () => {
    for (const texto of [llmsTxt(), llmsFullTxt()]) {
      for (const [, u] of texto.matchAll(new RegExp(`${SITE.url.replace(/\./g, "\\.")}(/[^\\s)]*)`, "g"))) expect(existe(u), u).toBe(true);
    }
  });

  it("o texto completo não vaza marcação interna", () => {
    const t = llmsFullTxt();
    expect(t).not.toMatch(/\]\((#|g:)/);
    expect(t).not.toContain("**");
  });

  it("imagens da marca geradas (capa padrão, logo, ícones)", () => {
    for (const f of ["og.png", "logo.png", "icone-192.png", "icone-512.png"]) expect(existsSync(join(process.cwd(), "public", f)), `${f}: rode npm run figuras`).toBe(true);
  });
});
