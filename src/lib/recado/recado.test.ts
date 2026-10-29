import { describe, expect, it } from "vitest";
import { feedRecado } from "./feed";
import { FASES } from "./sequencias";

describe("Recado do João", () => {
  it("todo link do feed aponta para página publicada", () => {
    expect(() => feedRecado()).not.toThrow();
  });

  it("cada fase tem boas-vindas no dia 0 e dias em ordem", () => {
    for (const f of FASES) {
      expect(f.sequencia[0].dia, f.id).toBe(0);
      const dias = f.sequencia.map((p) => p.dia);
      expect([...dias].sort((a, b) => a - b), f.id).toEqual(dias);
    }
  });

  it("assunto e prévia cabem na caixa de entrada do celular", () => {
    for (const f of FASES)
      for (const p of f.sequencia) {
        expect(p.assunto.length, p.assunto).toBeLessThanOrEqual(50);
        expect(p.previa.length, p.previa).toBeLessThanOrEqual(90);
      }
  });

  it("o feed tem número, Duvide e atalho para rodar semanas", () => {
    const f = feedRecado();
    expect(f.numeros.length).toBeGreaterThanOrEqual(4);
    expect(f.duvide.length).toBeGreaterThanOrEqual(4);
    expect(f.paginas.some((p) => p.tipo === "atalho")).toBe(true);
  });

  it("nenhum texto soa como criar conta", () => {
    const tudo = JSON.stringify(FASES).toLowerCase();
    expect(tudo).not.toMatch(/crie sua conta|criar conta|faça a sua conta|cadastre-se/);
  });
});
