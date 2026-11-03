import { describe, expect, it } from "vitest";
import { fatorTempo, ganhoDeCapital, impostoPorFaixa, type EntradaGanho } from "./ganho-capital";

const base: EntradaGanho = {
  compra: 180_000,
  custosCompra: 0,
  corretagemCompra: 0,
  reformas: 30_000,
  juros: 0,
  venda: 280_000,
  corretagemVenda: 0,
  aquisicao: { ano: 2026, mes: 11 },
  alienacao: { ano: 2026, mes: 11 },
  unicoImovel: false,
  reaplicado: 0,
};

describe("ganho de capital", () => {
  it("sem redutores: 15% sobre venda menos custo", () => {
    const r = ganhoDeCapital(base);
    expect(r.ganho).toBe(70_000);
    expect(r.imposto).toBeCloseTo(10_500, 2);
  });

  it("custos da compra e corretagem da venda reduzem o ganho", () => {
    const r = ganhoDeCapital({ ...base, custosCompra: 8_000, corretagemCompra: 5_000, juros: 2_000, corretagemVenda: 14_000 });
    expect(r.valorVenda).toBe(266_000);
    expect(r.custo).toBe(225_000);
    expect(r.ganho).toBe(41_000);
  });

  it("FR2: 1/1,0035 elevado aos meses desde dez/2005 ou desde a compra", () => {
    expect(fatorTempo({ ano: 2016, mes: 11 }, { ano: 2026, mes: 11 })).toBeCloseTo(1 / 1.0035 ** 120, 10);
    expect(fatorTempo({ ano: 2000, mes: 1 }, { ano: 2005, mes: 11 })).toBeCloseTo(1 / 1.006 ** 70, 10);
    // comprado antes de 1996: FR1 conta a partir de jan/1996 (118 meses) e FR2 de dez/2005 (251 meses)
    expect(fatorTempo({ ano: 1990, mes: 6 }, { ano: 2026, mes: 11 })).toBeCloseTo(1 / 1.006 ** 118 / 1.0035 ** 251, 10);
  });

  it("até 1988, 5% por ano de redução; antes de 1970, isento", () => {
    expect(fatorTempo({ ano: 1988, mes: 1 }, { ano: 1996, mes: 1 })).toBeCloseTo(0.95, 10);
    expect(ganhoDeCapital({ ...base, aquisicao: { ano: 1969, mes: 5 } }).isencao).toBe("antes-1969");
  });

  it("isenções: único imóvel até R$ 440 mil e venda de até R$ 35 mil", () => {
    expect(ganhoDeCapital({ ...base, unicoImovel: true }).isencao).toBe("unico-imovel");
    expect(ganhoDeCapital({ ...base, unicoImovel: true, venda: 440_001 }).isencao).toBeNull();
    expect(ganhoDeCapital({ ...base, compra: 10_000, venda: 35_000 }).isencao).toBe("pequeno-valor");
  });

  it("180 dias: isenção proporcional ao que vai para o novo imóvel", () => {
    expect(ganhoDeCapital({ ...base, reaplicado: 140_000 }).imposto).toBeCloseTo(5_250, 2);
    expect(ganhoDeCapital({ ...base, reaplicado: 300_000 }).isencao).toBe("reaplicacao");
  });

  it("alíquotas por faixa acima de R$ 5 milhões", () => {
    expect(impostoPorFaixa(5_000_000)).toBeCloseTo(750_000, 2);
    expect(impostoPorFaixa(6_000_000)).toBeCloseTo(750_000 + 175_000, 2);
  });
});
