import { describe, expect, it } from "vitest";
import { feedRecado } from "./feed";
import { CTAS } from "./ctas";
import { FASES, TRILHA } from "./sequencias";

describe("Recado do João", () => {
  it("todo link do feed aponta para página publicada", () => {
    expect(() => feedRecado()).not.toThrow();
  });

  it("cada fase abre com as boas-vindas no dia 0 e nunca manda dois e-mails no mesmo dia", () => {
    for (const f of FASES) {
      expect(f.sequencia[0].dia, f.id).toBe(0);
      const dias = f.sequencia.map((p) => p.dia);
      expect(new Set(dias).size, f.id).toBe(dias.length);
    }
  });

  it("a trilha comum não cai no mesmo dia que a sequência da fase", () => {
    for (const t of TRILHA) {
      if (t.gatilho.tipo !== "dia") continue;
      const dia = t.gatilho.dia;
      for (const f of FASES) if (!t.exceto?.includes(f.id)) expect(f.sequencia.map((p) => p.dia), `${t.id} × ${f.id}`).not.toContain(dia);
    }
    expect(new Set(TRILHA.map((t) => t.id)).size).toBe(TRILHA.length);
  });

  it("todo convite do fim existe e leva a outro lugar que o botão do e-mail", () => {
    const f = feedRecado();
    for (const fase of f.fases)
      for (const p of fase.sequencia) {
        const cta = p.cta === "proximo" ? fase.proximo : f.ctas[p.cta];
        expect(cta, `${fase.id}: ${p.assunto}`).toBeTruthy();
        expect(cta.url, `${fase.id}: ${p.assunto}`).not.toBe(p.link.url);
      }
    for (const p of f.trilha) {
      // Na trilha comum não há fase fixa: o convite tem de ser do catálogo.
      expect(p.cta, p.id).not.toBe("proximo");
      expect(f.ctas[p.cta as keyof typeof CTAS].url, p.id).not.toBe(p.link.url);
    }
  });

  it("assunto e prévia cabem na caixa de entrada do celular", () => {
    for (const p of [...FASES.flatMap((f) => f.sequencia), ...TRILHA])
      {
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
    const tudo = JSON.stringify([FASES, TRILHA, CTAS]).toLowerCase();
    expect(tudo).not.toMatch(/crie sua conta|criar conta|faça a sua conta|cadastre-se/);
  });
});
