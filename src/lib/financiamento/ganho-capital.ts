/**
 * Imposto sobre o ganho de capital na venda de imóvel por pessoa física residente.
 *
 * Fontes (conferidas em 02/11/2026):
 * - O que entra no custo: IN SRF 84/2001, art. 17, I — obras e reformas (com projeto aprovado,
 *   quando exigido, e pequenas obras), corretagem paga na compra, ITBI, juros pagos para a
 *   aquisição, laudêmio, contribuição de melhoria. Escritura e registro: Solução de Consulta da Receita.
 * - Corretagem paga na venda sai do valor de venda: IN SRF 84/2001, art. 19, § 4º.
 * - Redução para imóvel comprado até 1988 (5% por ano, 100% até 1969): Lei 7.713/1988, art. 18.
 * - Fatores FR1 e FR2: Lei 11.196/2005, art. 40.
 * - Isenção de quem compra outro residencial em 180 dias, proporcional ao que aplica e uma vez
 *   a cada 5 anos: Lei 11.196/2005, art. 39, §§ 2º e 5º.
 * - Único imóvel vendido por até R$ 440 mil: Lei 9.250/1995, art. 23. Venda de até R$ 35 mil: art. 22.
 * - Alíquotas por faixa do ganho: Lei 8.981/1995, art. 21 (redação da Lei 13.259/2016).
 */

export type Mes = { ano: number; mes: number };

export type EntradaGanho = {
  compra: number;
  /** ITBI, escritura e registro pagos na compra. */
  custosCompra: number;
  corretagemCompra: number;
  /** Obras e reformas com nota fiscal ou recibo. */
  reformas: number;
  /** Juros do financiamento já pagos e declarados. */
  juros: number;
  venda: number;
  corretagemVenda: number;
  aquisicao: Mes;
  alienacao: Mes;
  unicoImovel: boolean;
  /** Quanto do dinheiro da venda vai para outro imóvel residencial em até 180 dias. */
  reaplicado: number;
};

export type ResultadoGanho = {
  valorVenda: number;
  custo: number;
  ganho: number;
  /** Quanto os redutores por tempo de posse (Lei 7.713 e FR1 × FR2) tiram do ganho, de 0 a 1. */
  reducaoTempo: number;
  /** Fatia do ganho isenta pela compra de outro residencial, de 0 a 1. */
  isentoReaplicacao: number;
  base: number;
  imposto: number;
  isencao: "pequeno-valor" | "unico-imovel" | "reaplicacao" | "antes-1969" | null;
};

const FAIXAS: [ate: number, aliquota: number][] = [
  [5_000_000, 0.15],
  [10_000_000, 0.175],
  [30_000_000, 0.2],
  [Infinity, 0.225],
];

/** Imposto por faixa: cada alíquota só sobre a parte do ganho dentro dela. */
export function impostoPorFaixa(base: number) {
  let resto = base;
  let piso = 0;
  let total = 0;
  for (const [ate, aliquota] of FAIXAS) {
    const fatia = Math.min(resto, ate - piso);
    if (fatia <= 0) break;
    total += fatia * aliquota;
    resto -= fatia;
    piso = ate;
  }
  return total;
}

const indice = (m: Mes) => m.ano * 12 + (m.mes - 1);
const JAN_1996 = indice({ ano: 1996, mes: 1 });
/** Mês da publicação da Lei 11.196 (FR1 vai até ele) e o seguinte (FR2 começa nele). */
const NOV_2005 = indice({ ano: 2005, mes: 11 });
const DEZ_2005 = indice({ ano: 2005, mes: 12 });

/** Os fatores de redução por tempo de posse, multiplicados. 1 = nenhuma redução. */
export function fatorTempo(aquisicao: Mes, alienacao: Mes) {
  const aq = indice(aquisicao);
  const al = indice(alienacao);
  const lei7713 = aquisicao.ano <= 1988 ? 1 - Math.min(100, (1989 - aquisicao.ano) * 5) / 100 : 1;
  const m1 = aq <= NOV_2005 ? Math.max(0, Math.min(al, NOV_2005) - Math.max(aq, JAN_1996)) : 0;
  const m2 = Math.max(0, al - Math.max(aq, DEZ_2005));
  return lei7713 * (1 / 1.006 ** m1) * (1 / 1.0035 ** m2);
}

export function ganhoDeCapital(e: EntradaGanho): ResultadoGanho {
  const valorVenda = Math.max(0, e.venda - e.corretagemVenda);
  const custo = e.compra + e.custosCompra + e.corretagemCompra + e.reformas + e.juros;
  const ganho = Math.max(0, valorVenda - custo);
  const fator = fatorTempo(e.aquisicao, e.alienacao);
  const aplicado = valorVenda > 0 ? Math.min(1, Math.max(0, e.reaplicado) / valorVenda) : 0;
  const zero = { valorVenda, custo, ganho, reducaoTempo: 1 - fator, isentoReaplicacao: aplicado, base: 0, imposto: 0 };

  if (e.venda <= 35_000) return { ...zero, isencao: "pequeno-valor" };
  if (e.unicoImovel && e.venda <= 440_000) return { ...zero, isencao: "unico-imovel" };
  if (fator === 0) return { ...zero, isencao: "antes-1969" };
  if (aplicado >= 1) return { ...zero, isencao: "reaplicacao" };

  const base = ganho * fator * (1 - aplicado);
  return { ...zero, base, imposto: impostoPorFaixa(base), isencao: null };
}
