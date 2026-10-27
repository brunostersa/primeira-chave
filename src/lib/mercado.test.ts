import { describe, expect, it } from "vitest";
import { imovelQueARendaCompra, momentoDaRenda, RENDA } from "./mercado";

/** O João-de-barro só se assusta quando a conta de verdade assusta. */
describe("micro-momentos da renda", () => {
  it("na troca da faixa 1 para a 2, ganhar mais financia menos", () => {
    expect(imovelQueARendaCompra(3250)!.valor).toBeLessThan(imovelQueARendaCompra(3200)!.valor);
    expect(momentoDaRenda(3250).id).toBe("degrau-1");
  });

  it("ao sair do MCMV, o degrau é o maior", () => {
    const m = momentoDaRenda(13250);
    expect(m.id).toBe("degrau-4");
    expect(m.passaro).toBe("surpreso");
    expect(m.texto).toContain("saiu do Minha Casa Minha Vida");
  });

  it("no teto da faixa 3 o imóvel para de crescer", () => {
    expect(momentoDaRenda(9000).id).toBe("teto-3");
    expect(imovelQueARendaCompra(9000)!.valor).toBe(imovelQueARendaCompra(8500)!.valor);
  });

  it("da faixa 2 para a 3 o teto sobe e a conta melhora", () => {
    expect(momentoDaRenda(5250).id).toBe("subiu-2");
  });

  it("no máximo do controle, convida para o simulador", () => {
    expect(momentoDaRenda(RENDA.max).simulador).toBe(true);
  });

  it("todo valor do controle tem um momento", () => {
    for (let r = RENDA.min; r <= RENDA.max; r += RENDA.passo) expect(momentoDaRenda(r).texto.length).toBeGreaterThan(10);
  });
});
