import { describe, expect, it } from "vitest";
import { custosDaCompra, registro, TABELAS_REGISTRO, valorTabela } from "./custos";

/** Valores conferidos nas tabelas oficiais de 2026 (docs/pesquisa/calculadora-custos-compra.md). */
describe("tabelas de registro", () => {
  it("SP: faixa pelo valor do título, limite incluído", () => {
    expect(valorTabela(TABELAS_REGISTRO.SP, 300_000)).toBe(2_723.02);
    expect(valorTabela(TABELAS_REGISTRO.SP, 307_360)).toBe(2_723.02);
    expect(valorTabela(TABELAS_REGISTRO.SP, 307_360.01)).toBe(2_870.61);
    expect(valorTabela(TABELAS_REGISTRO.SP, 240_000)).toBe(2_516.87);
  });

  it("GO: faixa pelo valor do documento e valor acima da última faixa", () => {
    expect(valorTabela(TABELAS_REGISTRO.GO, 300_000)).toBe(3_441.04);
    expect(valorTabela(TABELAS_REGISTRO.GO, 240_000)).toBe(2_620.98);
    expect(valorTabela(TABELAS_REGISTRO.GO, 2_000_000)).toBe(7_407.33);
  });

  it("faixas em ordem crescente, de valor e de preço", () => {
    for (const t of Object.values(TABELAS_REGISTRO)) {
      t.faixas.forEach(([ate, v], i) => {
        if (i === 0) return;
        expect(ate).toBeGreaterThan(t.faixas[i - 1][0]);
        expect(v).toBeGreaterThan(t.faixas[i - 1][1]);
      });
      expect(t.acima).toBeGreaterThan(t.faixas.at(-1)![1]);
    }
  });
});

describe("registro de um financiamento (compra + alienação fiduciária)", () => {
  it("SP, imóvel de 300 mil com 240 mil financiados: ≈ R$ 5,4 mil com ISS", () => {
    expect(registro(TABELAS_REGISTRO.SP, 300_000, 240_000)).toBe(5_425.43);
  });

  it("GO, o mesmo imóvel: ≈ R$ 7,8 mil com fundos e ISS", () => {
    expect(registro(TABELAS_REGISTRO.GO, 300_000, 240_000)).toBe(7_849.56);
  });

  it("compra à vista: só o registro da compra", () => {
    expect(registro(TABELAS_REGISTRO.SP, 300_000, 0)).toBe(2_858.22);
  });
});

describe("custos da compra", () => {
  const base = { valor: 300_000, financiado: 240_000, itbiPct: 3, primeiroImovelSfh: false };

  it("soma ITBI, registro e avaliação", () => {
    const c = custosDaCompra({ ...base, uf: "SP" });
    expect(c.itbi).toBe(9_000);
    expect(c.registro).toBe(5_425.43);
    expect(c.avaliacao).toBe(1_500);
    expect(c.total).toBe(15_925.43);
    expect(c.pct).toBeCloseTo(5.31, 2);
    expect(c.exato).toBe(true);
  });

  it("primeiro imóvel pelo SFH: metade do registro", () => {
    const c = custosDaCompra({ ...base, uf: "GO", primeiroImovelSfh: true });
    expect(c.registroSemDesconto).toBe(7_849.56);
    expect(c.registro).toBe(3_924.78);
  });

  it("sem financiamento não há desconto nem avaliação do banco", () => {
    const c = custosDaCompra({ ...base, uf: "GO", financiado: 0, primeiroImovelSfh: true });
    expect(c.registro).toBe(c.registroSemDesconto);
    expect(c.avaliacao).toBe(0);
  });

  it("estado sem tabela usa a estimativa do motor (1,5%)", () => {
    const c = custosDaCompra({ ...base, uf: "outro" });
    expect(c.registro).toBe(4_500);
    expect(c.exato).toBe(false);
  });

  it("financiado nunca passa do valor do imóvel", () => {
    const a = custosDaCompra({ ...base, uf: "SP", financiado: 999_999 });
    const b = custosDaCompra({ ...base, uf: "SP", financiado: 300_000 });
    expect(a.registro).toBe(b.registro);
  });
});
