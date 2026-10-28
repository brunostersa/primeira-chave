import { PARAMS } from "./params";

/**
 * Custos da compra além da entrada: ITBI, registro no cartório e avaliação do banco.
 *
 * O registro segue a tabela oficial de cada estado: valor fixo por faixa do valor do
 * título, não um percentual. No financiamento são DOIS registros na matrícula: a compra
 * (sobre o preço) e a alienação fiduciária (sobre o valor financiado).
 * Pesquisa e fontes: docs/pesquisa/calculadora-custos-compra.md.
 */

export type Uf = "SP" | "GO";

export type TabelaRegistro = {
  uf: Uf;
  estado: string;
  /** [valor do título até, valor do registro], em ordem crescente. */
  faixas: [ate: number, valor: number][];
  /** Valor acima da última faixa. */
  acima: number;
  prenotacao: number;
  /** Percentual somado por cima da tabela (fundos e ISS), em pontos. */
  acrescimoPct: number;
  acrescimoNota: string;
  fonte: string;
  vigencia: string;
};

/**
 * SP: Tabela II (Registro de Imóveis), item 1 "registro com valor declarado". Os totais já
 * incluem oficial, Estado, Sefaz, Registro Civil, TJ e MP. Fonte: ARISP, vigente desde 08/01/2026.
 */
const SP: TabelaRegistro = {
  uf: "SP",
  estado: "São Paulo",
  faixas: [
    [2_306, 257.2],
    [5_761, 412.72],
    [9_603, 740.42],
    [19_210, 1_098.57],
    [38_420, 1_335.6],
    [115_260, 1_489.46],
    [192_100, 1_901.09],
    [230_520, 2_311.88],
    [268_940, 2_516.87],
    [307_360, 2_723.02],
    [345_780, 2_870.61],
    [384_200, 2_945.43],
    [768_400, 3_284.18],
    [1_152_600, 3_846.1],
    [1_536_800, 4_427.79],
    [1_921_000, 5_009.53],
    [2_305_200, 5_310.3],
    [3_842_000, 6_814.06],
    [5_763_000, 9_520.82],
  ],
  // Faixa "t" (até R$ 7,684 mi). Acima disso a tabela segue subindo; fora do público do site.
  acima: 12_528.33,
  prenotacao: 79.16,
  acrescimoPct: 2,
  acrescimoNota: "ISS da cidade (2% na capital; varia por município)",
  fonte: "Tabela de custas e emolumentos do Registro de Imóveis de SP (ARISP), 2026",
  vigencia: "2026-01",
};

/**
 * GO: Tabela XIV, item 76 (registro sobre o valor do documento). Só emolumentos: por cima
 * entram os fundos estaduais (24,25% desde 24/03/2025, Lei 23.163/2024) e o ISS (5% em Goiânia).
 * Fonte: TJGO, Provimento Conjunto 179/2025, vigente em 2026.
 */
const GO: TabelaRegistro = {
  uf: "GO",
  estado: "Goiás",
  faixas: [
    [653.8, 61.56],
    [1_307.62, 93.32],
    [2_615.24, 119.13],
    [5_230.47, 172.76],
    [10_460.94, 339.54],
    [15_691.43, 363.35],
    [26_152.37, 462.64],
    [39_228.54, 585.76],
    [52_304.74, 776.37],
    [65_380.92, 923.29],
    [104_609.47, 1_294.6],
    [156_914.21, 1_945.88],
    [261_523.68, 2_620.98],
    [392_285.51, 3_441.04],
    [523_047.35, 4_054.59],
    [784_571.03, 4_866.7],
    [1_176_856.54, 5_831.7],
    [1_569_142.07, 6_780.81],
  ],
  acima: 7_407.33,
  prenotacao: 11.14,
  acrescimoPct: 29.25,
  acrescimoNota: "fundos estaduais (24,25%) e ISS de Goiânia (5%); a taxa judiciária vem à parte",
  fonte: "Tabela XIV do Regimento de Custas de Goiás (TJGO, Provimento Conjunto 179/2025), 2026",
  vigencia: "2026-01",
};

export const TABELAS_REGISTRO: Record<Uf, TabelaRegistro> = { SP, GO };

/** Valor de UM registro (sem prenotação nem acréscimos) para um título de `valor`. */
export function valorTabela(t: TabelaRegistro, valor: number): number {
  return t.faixas.find(([ate]) => valor <= ate)?.[1] ?? t.acima;
}

export type EntradaCustos = {
  /** "outro": estado ainda sem tabela; usa a estimativa do motor (PARAMS.cartorio). */
  uf: Uf | "outro";
  valor: number;
  financiado: number;
  /** % do ITBI da cidade. */
  itbiPct: number;
  /** Primeira aquisição residencial financiada pelo SFH: 50% nos emolumentos (Lei 6.015/73, art. 290). */
  primeiroImovelSfh: boolean;
};

export type Custos = {
  itbi: number;
  /** Registro da compra + da alienação + prenotação + acréscimos, já com o desconto se houver. */
  registro: number;
  /** O mesmo registro sem o desconto do primeiro imóvel (para mostrar a diferença). */
  registroSemDesconto: number;
  avaliacao: number;
  total: number;
  /** Total sobre o valor do imóvel, em %. */
  pct: number;
  /** false quando o registro é estimativa (estado sem tabela). */
  exato: boolean;
};

const centavos = (v: number) => Math.round(v * 100) / 100;

export function registro(t: TabelaRegistro, valor: number, financiado: number): number {
  const atos = valorTabela(t, valor) + (financiado > 0 ? valorTabela(t, financiado) : 0) + t.prenotacao;
  return centavos(atos * (1 + t.acrescimoPct / 100));
}

export function custosDaCompra(e: EntradaCustos, p = PARAMS): Custos {
  const valor = Math.max(0, e.valor);
  const financiado = Math.min(Math.max(0, e.financiado), valor);
  const t = e.uf === "outro" ? null : TABELAS_REGISTRO[e.uf];
  const cheio = t ? registro(t, valor, financiado) : centavos((valor * p.cartorio) / 100);
  // O desconto só existe quando há financiamento pelo SFH.
  const comDesconto = e.primeiroImovelSfh && financiado > 0 ? centavos(cheio / 2) : cheio;
  const itbi = centavos((valor * e.itbiPct) / 100);
  const avaliacao = financiado > 0 ? centavos((valor * p.avaliacao) / 100) : 0;
  const total = centavos(itbi + comDesconto + avaliacao);
  return { itbi, registro: comDesconto, registroSemDesconto: cheio, avaliacao, total, pct: valor ? (total / valor) * 100 : 0, exato: !!t };
}
