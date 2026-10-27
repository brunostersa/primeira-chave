import fipezap from "../data/mercado/fipezap.json";
import itbiSp from "../data/mercado/itbi-sp.json";
import ivgr from "../data/mercado/ivgr.json";
import mapaBrasil from "../data/mercado/mapa-brasil.json";
import { calcular, PERFIL_VAZIO } from "./financiamento/engine";

/**
 * Dados de mercado gerados por scripts/dados/atualizar.py (1x por mês).
 * Cada número que vai para a página leva fonte e data: anúncio (FipeZap) e
 * transação real (ITBI) nunca se misturam.
 */

export type Cidade = (typeof fipezap.cidades)[number] & { capital?: boolean; lat?: number; lon?: number };
export type Distrito = (typeof itbiSp.distritos)[number] & { m2?: number; valor?: number; financiado?: number };

export const FIPEZAP = fipezap as Omit<typeof fipezap, "cidades"> & { cidades: Cidade[] };
export const ITBI_SP = itbiSp as Omit<typeof itbiSp, "distritos"> & { distritos: Distrito[] };
export const MAPA_BRASIL = mapaBrasil as typeof mapaBrasil & { capitais: Record<string, [number, number]> };
export const IVGR = ivgr as { fonte: string; base: string; serie: [string, number][] };

export const capitais = () => FIPEZAP.cidades.filter((c) => c.capital);

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
/** "2026-09" → "set/2026" */
export const mesAno = (ym: string) => `${MESES[Number(ym.slice(5, 7)) - 1]}/${ym.slice(0, 4)}`;

/** Variação do IVG-R nos últimos `meses` meses, em %. */
export function variacaoIvgr(meses: number) {
  const s = IVGR.serie;
  const fim = s[s.length - 1];
  const ini = s[s.length - 1 - meses];
  return { pct: (fim[1] / ini[1] - 1) * 100, ate: fim[0] };
}

/**
 * Até quanto o banco financia o imóvel para essa renda (pessoa de 30 anos, sem dívidas),
 * pelo motor validado: o mesmo número do simulador.
 */
export function imovelQueARendaCompra(renda: number) {
  const r = calcular({ ...PERFIL_VAZIO, idade: 30, renda, dividasOpt: "nao", reservaOpt: "nada", fgtsOpt: "nao", imovel: "nao", achou: "nao" });
  if (r.blocked) return null;
  return { valor: r.Vbank ?? 0, programa: r.prog, noTeto: r.limTeto };
}

/** Escala de calor em 6 tons (tokens --calor-1…6), de mais barato a mais caro. */
export function tom(v: number, min: number, max: number) {
  const t = max > min ? (v - min) / (max - min) : 0;
  return Math.min(6, Math.max(1, Math.floor(t * 6) + 1));
}
