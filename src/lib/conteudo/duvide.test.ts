import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { existe } from "./links";
import { CARTAS } from "./duvide";
import { idsCitados, termosCitados } from "./tipos";

/** As cartas do "Duvide.": cada uma leva a um guia que existe e tem a imagem gerada. */
describe("Duvide", () => {
  it("ids únicos e que não colidem com /duvide/corretor/", () => {
    const ids = CARTAS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).not.toContain("corretor");
  });

  it("guia, links e termos citados existem na árvore", () => {
    for (const c of CARTAS) {
      expect(existe(c.guia), `${c.id} → guia ${c.guia}`).toBe(true);
      const texto = c.explicacao.join(" ");
      for (const id of idsCitados(texto)) expect(existe(id), `${c.id} cita #${id}`).toBe(true);
      for (const t of termosCitados(texto)) expect(existe(`g-${t}`), `${c.id} cita g:${t}`).toBe(true);
    }
  });

  it("card cabe no post e tem imagem gerada (WebP e JPG)", () => {
    for (const c of CARTAS) {
      expect(c.frase.length, `${c.id}: frase longa para o card`).toBeLessThanOrEqual(64);
      expect(c.resumo.length, `${c.id}: resumo longo para o card`).toBeLessThanOrEqual(150);
      for (const ext of ["webp", "jpg"]) expect(existsSync(join(process.cwd(), "public", "cartas", `${c.id}.${ext}`)), `${c.id}.${ext}: rode npm run figuras`).toBe(true);
    }
  });
});
