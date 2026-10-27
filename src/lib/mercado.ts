import fipezap from "../data/mercado/fipezap.json";
import itbiCapitais from "../data/mercado/itbi-capitais.json";
import itbiSp from "../data/mercado/itbi-sp.json";
import ivgr from "../data/mercado/ivgr.json";
import mapaBrasil from "../data/mercado/mapa-brasil.json";
import { calcular, PERFIL_VAZIO } from "./financiamento/engine";
import { PARAMS } from "./financiamento/params";
import { brl, pct } from "./format";

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
/** Preço REAL (ITBI) das capitais que publicam os dados, por nome da cidade. */
export type ItbiCidade = (typeof itbiCapitais.cidades)["São Paulo"];
export const ITBI_CAPITAIS = itbiCapitais.cidades as Record<string, ItbiCidade>;
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

// ——— Micro-momentos do controle de renda ——————————————————————————————————

export const RENDA = { min: 1500, max: 20000, passo: 250 } as const;

/** Juros nominais (como nos parâmetros) → efetivos ao ano, como a Caixa mostra. */
const efetivo = (nominal: number) => ((1 + nominal / 1200) ** 12 - 1) * 100;
const juros = (nominal: number) => pct(efetivo(nominal), 2);

export type Momento = {
  id: string;
  /** Rosto no puxador do controle. */
  puxador: "gentil" | "feliz" | "triste" | "surpreso";
  /** Rosto do João-de-barro no balão. */
  passaro: "feliz" | "surpreso" | "pensativo" | "triste" | "curioso";
  texto: string;
  /** Mostra o convite para o simulador completo. */
  simulador?: boolean;
};

/**
 * O que o João-de-barro comenta para cada renda. As regras saem do motor: os degraus
 * (ganhar mais e financiar menos) acontecem de verdade na troca de faixa.
 */
export function momentoDaRenda(renda: number): Momento {
  const c = imovelQueARendaCompra(renda);
  if (!c) {
    return { id: "nao-cabe", puxador: "triste", passaro: "triste", texto: "Com essa renda, a parcela ainda não cabe. Somar a renda de quem compra junto costuma resolver." };
  }
  if (renda >= RENDA.max) {
    return { id: "maximo", puxador: "feliz", passaro: "feliz", texto: `Ganha mais de ${brl(RENDA.max)}? Faça a conta exata no simulador: ele aceita qualquer renda.`, simulador: true };
  }

  // Degrau: a renda passou de um limite de faixa e o banco financia MENOS do que no limite.
  const limite = [...PARAMS.faixas].reverse().find((f) => renda > f.rendaAte);
  if (limite) {
    const antes = imovelQueARendaCompra(limite.rendaAte)!;
    if (c.valor < antes.valor) {
      const saiu = !c.programa.mcmv;
      return {
        id: `degrau-${limite.faixa}`,
        puxador: "surpreso",
        passaro: "surpreso",
        texto: `Epa! Passou de ${brl(limite.rendaAte)} e ${saiu ? "saiu do Minha Casa Minha Vida" : `foi para a ${c.programa.curto}`}: juros de ${juros(antes.programa.juros)} para ${juros(c.programa.juros)} ao ano. Ganhando mais, o banco financia ${brl(antes.valor - c.valor)} a menos do que com ${brl(limite.rendaAte)}.`,
      };
    }
    if (renda - limite.rendaAte <= RENDA.passo * 2 && c.programa.mcmv) {
      return { id: `subiu-${limite.faixa}`, puxador: "feliz", passaro: "feliz", texto: `Subiu para a ${c.programa.curto}: o teto do imóvel vai a ${brl(c.programa.teto)}.` };
    }
  }

  if (c.noTeto) {
    const faixa = PARAMS.faixas.find((f) => f.faixa === c.programa.faixa);
    return {
      id: `teto-${c.programa.faixa}`,
      puxador: "triste",
      passaro: "pensativo",
      texto: `Bateu no teto da ${c.programa.curto}: ${brl(c.programa.teto)}. ${faixa ? `Até ${brl(faixa.rendaAte)} de renda, ganhar mais não aumenta o imóvel.` : ""}`.trim(),
    };
  }
  if (!c.programa.mcmv) {
    return { id: "mercado", puxador: "gentil", passaro: "curioso", texto: `Fora do Minha Casa Minha Vida: juros de mercado (${juros(c.programa.juros)} ao ano) e SAC, em que a primeira parcela é a mais alta. Aqui, entrada maior e FGTS pesam mais que a renda.` };
  }
  const prox = imovelQueARendaCompra(renda + RENDA.passo);
  const ganho = prox && prox.programa.curto === c.programa.curto ? prox.valor - c.valor : 0;
  return {
    id: `cresce-${c.programa.faixa}`,
    puxador: "feliz",
    passaro: "feliz",
    texto: `${c.programa.curto}, juros de ${juros(c.programa.juros)} ao ano.${ganho > 0 ? ` Aqui, cada ${brl(RENDA.passo)} a mais de renda aumenta o imóvel em uns ${brl(Math.round(ganho / 1000) * 1000)}.` : ""}`,
  };
}
