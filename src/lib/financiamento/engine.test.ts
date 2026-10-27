import { describe, expect, it } from "vitest";
import { calcular, PERFIL_EXEMPLO, PERFIL_VAZIO, previaPrecoAvaliacao, rendaMinimaPara, semEntrada, type Perfil, type Resultado } from "./engine";

const ok = (r: ReturnType<typeof calcular>) => {
  if (r.blocked) throw new Error(`bloqueado: ${r.blocked}`);
  return r as Resultado;
};

/**
 * Casos conferidos no simulador oficial da Caixa (simulação rápida "pela renda",
 * nascido em 01/01/1995, 27/10/2026). Se a Caixa mudar a regra, estes testes avisam.
 */
const CAIXA: { renda: number; imovel: number; financiado: number; efetiva: number; parcela: number; programa: string }[] = [
  { renda: 2800, imovel: 194218.42, financiado: 155374.74, efetiva: 5.12, parcela: 840, programa: "MCMV Faixa 1" },
  { renda: 4500, imovel: 210000, financiado: 168000, efetiva: 7.23, parcela: 1131.63, programa: "MCMV Faixa 2" },
  { renda: 6000, imovel: 299119, financiado: 239295, efetiva: 8.47, parcela: 1800, programa: "MCMV Faixa 3" },
  { renda: 8000, imovel: 400000, financiado: 320000, efetiva: 8.47, parcela: 2398.64, programa: "MCMV Faixa 3" },
  { renda: 11000, imovel: 465499.78, financiado: 372399.82, efetiva: 10.47, parcela: 3300, programa: "MCMV Faixa 4" },
  { renda: 15000, imovel: 478737.48, financiado: 382989.99, efetiva: 11.49, parcela: 4500, programa: "SBPE" },
];

describe("bate com o simulador da Caixa", () => {
  for (const c of CAIXA) {
    it(`renda de R$ ${c.renda}`, () => {
      const r = ok(
        calcular({ ...PERFIL_VAZIO, quem: "sozinho", idade: 31, renda: c.renda, dividasOpt: "nao", reservaOpt: "nada", fgtsOpt: "nao", imovel: "nao", nome: "sim", achou: "nao" }),
      );
      const tab = r.prog.sistema === "sac" ? r.sac : r.price;
      expect(r.prog.curto).toBe(c.programa);
      expect(r.ef).toBeCloseTo(c.efetiva, 1);
      // tolerância de 1%: os seguros MIP/DFI da Caixa não são públicos (estimamos por idade)
      expect(Math.abs((r.Vbank ?? 0) / c.imovel - 1)).toBeLessThan(0.01);
      expect(Math.abs(r.P / c.financiado - 1)).toBeLessThan(0.01);
      expect(Math.abs(tab.first.pg / c.parcela - 1)).toBeLessThan(0.01);
    });
  }
});

describe("motor de financiamento", () => {
  it("bate com o simulador da Caixa (31 anos, renda 6 mil, faixa 3)", () => {
    const s: Perfil = { ...PERFIL_VAZIO, quem: "sozinho", idade: 31, renda: 6000, dividasOpt: "nao", reservaOpt: "nada", fgtsOpt: "nao", imovel: "nao", nome: "sim", achou: "nao" };
    const r = ok(calcular(s));
    expect(r.prog.curto).toBe("MCMV Faixa 3");
    expect(r.n).toBe(420);
    expect(r.ef).toBeCloseTo(8.47, 2);
    expect(r.price.first.pg).toBeCloseTo(1800, 0);
    // Caixa: 299.119 de imóvel / 239.295 financiados
    expect(Math.abs((r.Vbank ?? 0) - 299119)).toBeLessThan(50);
    expect(Math.abs(r.P - 239295)).toBeLessThan(50);
  });

  it("avaliação abaixo do preço: financia 80% da avaliação", () => {
    const r = ok(calcular({ ...PERFIL_EXEMPLO, achou: "sim", valor: 280000, avaliou: true, avalReal: 255000 }));
    expect(r.P).toBeCloseTo(204000, 0);
    expect(r.extraAval).toBeCloseTo(20000, 0);
  });

  it("avaliação 50% acima do preço: entrada zero, limitado ao preço", () => {
    const r = ok(calcular({ ...PERFIL_EXEMPLO, reservaOpt: "nada", achou: "sim", valor: 100000, avaliou: true, avalReal: 150000 }));
    expect(r.P).toBeCloseTo(100000, 0);
    expect(r.entrada).toBeLessThan(1);
    expect(r.gap).toBeCloseTo(5000, 0); // só ITBI + cartório + taxas
  });

  it("SBPE usado financia 80%", () => {
    const r = ok(calcular({ ...PERFIL_EXEMPLO, renda: 14000, achou: "sim", valor: 245000, avaliou: true, avalReal: 244000 }));
    expect(r.prog.curto).toBe("SBPE");
    expect(r.P).toBeCloseTo(195200, 0);
  });

  it("o segredo aparece para quem não tem a entrada, comparando falta com falta", () => {
    const r = calcular({ ...PERFIL_EXEMPLO, reservaOpt: "nada", reserva: 0, fgtsOpt: "nao", fgts: 0 });
    const z = semEntrada(r);
    expect(z).not.toBeNull();
    expect(z!.falta).toBeLessThan(z!.gap);
    expect(z!.aval).toBeCloseTo(z!.V / 0.8, 0);
  });

  it("prévia preço × avaliação: 125% do preço zera a entrada", () => {
    const r = ok(calcular({ ...PERFIL_EXEMPLO, reservaOpt: "nada", fgtsOpt: "nao" }));
    const p = previaPrecoAvaliacao(r, 150000, 125);
    expect(p.entrada).toBeLessThan(1);
    expect(previaPrecoAvaliacao(r, 150000, 100).entrada).toBeCloseTo(30000, 0);
  });

  it("renda mínima para um valor de imóvel é coerente com o simulador", () => {
    const x = rendaMinimaPara(300000);
    expect(x).not.toBeNull();
    const r = ok(calcular({ ...PERFIL_VAZIO, idade: 30, renda: x!.renda, dividasOpt: "nao", reservaOpt: "nada", fgtsOpt: "nao", imovel: "nao", achou: "nao" }));
    expect(r.Vbank!).toBeGreaterThanOrEqual(299999);
    expect(x!.parcela).toBeLessThanOrEqual(x!.renda * 0.3 + 1);
  });

  it("bloqueia idade e renda", () => {
    expect(calcular({ ...PERFIL_EXEMPLO, idade: 80 }).blocked).toBe("idade");
    expect(calcular({ ...PERFIL_EXEMPLO, dividasOpt: "sim", dividas: 2000 }).blocked).toBe("renda");
  });
});
