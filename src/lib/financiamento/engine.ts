import { PARAMS, type Params } from "./params";

export type Resposta = "sim" | "nao" | "naosei";

/** Respostas da conversa do simulador. Valores em reais. */
export type Perfil = {
  quem: "sozinho" | "junto" | null;
  idade: number | null;
  renda: number;
  dividasOpt: "sim" | "nao" | null;
  dividas: number;
  reservaOpt: "sim" | "nada" | null;
  reserva: number;
  fgtsOpt: Resposta | null;
  fgts: number;
  fgts3: Resposta | null;
  imovel: "sim" | "nao" | null; // já tem imóvel no nome
  nome: Resposta | null; // nome limpo
  achou: "sim" | "nao" | null;
  valor: number; // preço pedido
  tipo: "usado" | "novo";
  avaliou: boolean;
  avalReal: number; // valor do laudo
};

export const PERFIL_VAZIO: Perfil = {
  quem: null,
  idade: null,
  renda: 0,
  dividasOpt: null,
  dividas: 0,
  reservaOpt: null,
  reserva: 0,
  fgtsOpt: null,
  fgts: 0,
  fgts3: null,
  imovel: null,
  nome: null,
  achou: null,
  valor: 0,
  tipo: "usado",
  avaliou: false,
  avalReal: 0,
};

export const PERFIL_EXEMPLO: Perfil = {
  ...PERFIL_VAZIO,
  quem: "junto",
  idade: 31,
  renda: 6000,
  dividasOpt: "nao",
  reservaOpt: "sim",
  reserva: 25000,
  fgtsOpt: "sim",
  fgts: 18000,
  fgts3: "sim",
  imovel: "nao",
  nome: "naosei",
  achou: "nao",
};

export type Programa = {
  curto: string;
  nome: string;
  juros: number; // % a.a. nominal
  ltv: number; // fração financiável
  /** Sistema que a Caixa usa para medir quanto cabe na renda: a 1ª parcela é a mais alta no SAC. */
  sistema: "price" | "sac";
  teto: number;
  mcmv: boolean;
  cotista: boolean;
  faixa?: number;
};

export type Parcela = { j: number; amort: number; seg: number; adm: number; pg: number };
export type Tabela = { first: Parcela; last: number; total: number; pts: [number, number][] };

/** Taxa mensal do seguro MIP por idade (estimativa). */
export function mipRate(idade: number): number {
  const faixas: [number, number][] = [
    [30, 0.0095], [35, 0.011], [40, 0.014], [45, 0.019], [50, 0.027],
    [55, 0.04], [60, 0.06], [65, 0.09], [200, 0.13],
  ];
  for (const [ate, r] of faixas) if (idade <= ate) return r / 100;
  return 0.13 / 100;
}

export function sbpe(s: Pick<Perfil, "tipo">, p: Params = PARAMS): Programa {
  return {
    curto: "SBPE",
    nome: "linha de mercado (SBPE)",
    juros: p.sbpeJuros,
    ltv: (s.tipo === "novo" ? p.sbpeLtvNovo : p.sbpeLtvUsado) / 100,
    teto: p.sfhTeto,
    mcmv: false,
    sistema: p.sbpeSistema,
    cotista: false,
  };
}

export function programa(s: Perfil, p: Params = PARAMS): Programa {
  const cotista = s.fgts3 === "sim" && s.fgtsOpt !== "nao";
  if (s.imovel !== "sim") {
    for (const f of p.faixas) {
      if (s.renda <= f.rendaAte) {
        const c = cotista && f.faixa <= 3;
        return {
          curto: `MCMV Faixa ${f.faixa}`,
          nome: `Minha Casa Minha Vida, Faixa ${f.faixa}`,
          faixa: f.faixa,
          juros: f.juros - (c ? p.cotistaDesc : 0),
          ltv: p.mcmvLtv / 100,
          teto: f.tetoImovel,
          mcmv: true,
          sistema: "price",
          cotista: c,
        };
      }
    }
  }
  return sbpe(s, p);
}

/** Quanto da 1ª parcela (juros + amortização) cada real emprestado custa, no sistema da linha. */
export function fatorParcela(sistema: "price" | "sac", i: number, n: number) {
  return sistema === "sac" ? 1 / n + i : i / (1 - Math.pow(1 + i, -n));
}

export function tabela(P: number, i: number, n: number, V: number, sistema: "price" | "sac", mip: number, dfi: number, adm: number): Tabela {
  let saldo = P;
  let total = 0;
  let first: Parcela | null = null;
  let last = 0;
  const pts: [number, number][] = [];
  const base = (P * i) / (1 - Math.pow(1 + i, -n));
  const am = P / n;
  for (let m = 1; m <= n; m++) {
    const j = saldo * i;
    const amort = sistema === "price" ? base - j : am;
    const seg = saldo * mip + V * dfi;
    const pg = j + amort + seg + adm;
    if (m === 1) first = { j, amort, seg, adm, pg };
    if (m === 1 || m % 12 === 0 || m === n) pts.push([m, pg]);
    total += pg;
    last = pg;
    saldo -= amort;
  }
  return { first: first ?? { j: 0, amort: 0, seg: 0, adm, pg: adm }, last, total, pts };
}

type Base = {
  modo: "renda" | "imovel";
  prog: Programa;
  n: number; // prazo em meses
  C: number; // parcela máxima
  dividas: number;
  reserva: number;
  idade: number;
  saiuMcmv: boolean;
};

export type Bloqueio = Base & { blocked: "idade" | "renda" | "valor" };

export type Resultado = Base & {
  blocked: null;
  i: number;
  ef: number; // juros efetivos % a.a.
  mip: number;
  dfi: number;
  adm: number;
  custoPct: number;
  fgtsUse: number;
  fgtsNaEntrada: number;
  V: number; // valor do imóvel considerado
  P: number; // valor financiado
  Pcap: number; // máximo que a renda permite
  base: number;
  Vbank: number | null; // modo renda: imóvel que a renda aguenta
  Vbolso: number | null; // modo renda: imóvel que cabe hoje com o dinheiro guardado
  limTeto: boolean;
  entrada: number;
  entradaPadrao: number;
  extraAval: number; // >0 avaliação abaixo do preço pesa; <0 avaliação acima ajuda
  extraRenda: number;
  custos: number;
  precisaDinheiro: number;
  gap: number; // quanto falta juntar
  sobra: number;
  price: Tabela;
  sac: Tabela;
};

export function calcular(s: Perfil, p: Params = PARAMS): Resultado | Bloqueio {
  const idade = s.idade ?? 18;
  const dividas = s.dividasOpt === "sim" ? s.dividas : 0;
  const reserva = s.reservaOpt === "sim" ? s.reserva : 0;
  const C = (s.renda * p.comp) / 100 - dividas;
  const modo = s.achou === "sim" ? "imovel" : "renda";
  let prog = programa(s, p);
  let saiuMcmv = false;
  if (modo === "imovel" && prog.mcmv && s.valor > prog.teto) {
    prog = sbpe(s, p);
    saiuMcmv = true;
  }
  const n = Math.max(0, Math.min(p.prazoMax, Math.floor(p.idadeLimite * 12 - idade * 12)));
  const base0: Base = { modo, prog, n, C, dividas, reserva, idade, saiuMcmv };
  if (n < 12) return { ...base0, blocked: "idade" };
  if (C <= p.taxaAdm + 50) return { ...base0, blocked: "renda" };
  if (modo === "imovel" && s.valor < 30000) return { ...base0, blocked: "valor" };

  const i = prog.juros / 100 / 12;
  const a = fatorParcela(prog.sistema, i, n);
  const mip = mipRate(idade);
  const dfi = p.dfi / 100;
  const adm = p.taxaAdm;
  const custoPct = (p.itbi + p.cartorio + p.avaliacao) / 100;
  const fgtsUse = s.fgtsOpt === "sim" && s.fgts3 === "sim" && s.imovel !== "sim" ? s.fgts : 0;

  let V: number, P: number, Pcap: number, base: number;
  let Vbank: number | null = null;
  let Vbolso: number | null = null;
  let limTeto = false;
  let extraAval = 0;
  let extraRenda = 0;

  if (modo === "renda") {
    Pcap = Math.max(0, (C - adm) / (a + mip + dfi / prog.ltv));
    Vbank = Pcap / prog.ltv;
    if (Vbank > prog.teto) {
      Vbank = prog.teto;
      limTeto = true;
    }
    const cabe = (v: number) => {
      const emp = Math.min(Pcap, prog.ltv * v);
      return Math.max(0, v - emp - fgtsUse) + custoPct * v <= reserva;
    };
    if (cabe(Vbank)) Vbolso = Vbank;
    else {
      let lo = 0;
      let hi = Vbank;
      for (let k = 0; k < 60; k++) {
        const m = (lo + hi) / 2;
        if (cabe(m)) lo = m;
        else hi = m;
      }
      Vbolso = lo;
    }
    V = Vbank;
    base = V;
    P = Math.min(Pcap, prog.ltv * V);
  } else {
    // o banco empresta % da avaliação, mas nunca mais que o preço de venda
    V = s.valor;
    base = s.avaliou && s.avalReal > 0 ? s.avalReal : V;
    Pcap = Math.max(0, (C - adm - dfi * V) / (a + mip));
    const maxAval = Math.min(prog.ltv * base, V);
    P = Math.min(maxAval, Pcap);
    extraAval = prog.ltv * V - maxAval;
    extraRenda = maxAval - P;
  }

  const entrada = V - P;
  const entradaPadrao = V * (1 - prog.ltv);
  const custos = custoPct * V;
  const fgtsNaEntrada = Math.min(fgtsUse, entrada);
  const precisaDinheiro = entrada - fgtsNaEntrada + custos;
  const gap = Math.max(0, precisaDinheiro - reserva);
  const sobra = Math.max(0, reserva - precisaDinheiro);

  return {
    ...base0,
    blocked: null,
    i,
    ef: (Math.pow(1 + i, 12) - 1) * 100,
    mip,
    dfi,
    adm,
    custoPct,
    fgtsUse,
    fgtsNaEntrada,
    V,
    P,
    Pcap,
    base,
    Vbank,
    Vbolso,
    limTeto,
    entrada,
    entradaPadrao,
    extraAval,
    extraRenda,
    custos,
    precisaDinheiro,
    gap,
    sobra,
    price: tabela(P, i, n, V, "price", mip, dfi, adm),
    sac: tabela(P, i, n, V, "sac", mip, dfi, adm),
  };
}

/** "O segredo": maior imóvel que sai sem entrada se a avaliação vier ≥ preço ÷ LTV. */
export type SemEntrada = {
  V: number;
  aval: number;
  custos: number;
  falta: number;
  ltv: number;
  comum: number;
  gap: number;
};

export function semEntrada(r: Resultado | Bloqueio): SemEntrada | null {
  if (r.blocked || r.modo !== "renda" || r.gap <= 0) return null;
  const a = fatorParcela(r.prog.sistema, r.i, r.n);
  const V = Math.floor(Math.min((r.C - r.adm) / (a + r.mip + r.dfi), r.prog.teto) / 1000) * 1000;
  if (V < 30000) return null;
  const custos = r.custoPct * V;
  const falta = Math.max(0, custos - r.reserva);
  if (falta >= r.gap) return null;
  return { V, aval: V / r.prog.ltv, custos, falta, ltv: r.prog.ltv, comum: r.precisaDinheiro, gap: r.gap };
}

/** Prévia do simulador preço × avaliação (avaliação em % do preço). */
export function previaPrecoAvaliacao(r: Resultado, preco: number, avalPct: number) {
  const a = fatorParcela(r.prog.sistema, r.i, r.n);
  const aval = (preco * avalPct) / 100;
  const pcap = Math.max(0, (r.C - r.adm - r.dfi * preco) / (a + r.mip));
  const pAval = Math.min(r.prog.ltv * aval, preco);
  const P = Math.min(pAval, pcap);
  const entrada = preco - P;
  return {
    aval,
    P,
    entrada,
    custos: r.custoPct * preco,
    parcela: P * (a + r.mip) + r.dfi * preco + r.adm,
    limitadoPelaRenda: P < pAval - 1,
    avalParaZerar: preco / r.prog.ltv,
  };
}

/**
 * Renda mínima (bruta, por mês) para o banco financiar um imóvel de `valor`,
 * sem outras dívidas. Base das páginas "quanto preciso ganhar para financiar…".
 */
export function rendaMinimaPara(valor: number, idade = 30, p: Params = PARAMS) {
  const perfil = (renda: number): Perfil => ({ ...PERFIL_VAZIO, idade, renda, dividasOpt: "nao", reservaOpt: "nada", fgtsOpt: "nao", imovel: "nao", achou: "nao" });
  const aguenta = (renda: number) => {
    const r = calcular(perfil(renda), p);
    return !r.blocked && (r.Vbank ?? 0) >= valor - 1 && !(r.limTeto && r.prog.teto < valor);
  };
  // "Mais renda, mais crédito" NÃO vale sempre: na troca de faixa o juro sobe e o crédito cai
  // (ex.: R$ 13.000 financia mais que R$ 13.250). Então primeiro varre a renda em passos de
  // R$ 100 até achar a primeira que aguenta, e só depois refina entre ela e a anterior.
  const PASSO = 100;
  let hi = 1000;
  while (hi <= 200000 && !aguenta(hi)) hi += PASSO;
  if (hi > 200000) return null;
  let lo = Math.max(0, hi - PASSO);
  for (let k = 0; k < 30; k++) {
    const m = (lo + hi) / 2;
    if (aguenta(m)) hi = m;
    else lo = m;
  }
  const renda = Math.ceil(hi / 10) * 10;
  const r = calcular(perfil(renda), p) as Resultado;
  const tab = r.prog.sistema === "sac" ? r.sac : r.price;
  return { renda, programa: r.prog, parcela: tab.first.pg, entrada: valor * (1 - r.prog.ltv), prazo: r.n };
}

/** Uma tarefa do "Seu próximo passo". */
export type Tarefa = { titulo: string; texto: string };

export function proximosPassos(s: Perfil, r: Resultado | Bloqueio, poupancaMensal: number, fmt: (v: number) => string): Tarefa[] {
  const t: Tarefa[] = [];
  if (s.nome === "nao") t.push({ titulo: "Regularize seu CPF antes de tudo", texto: "Com restrição, o banco recusa. Negocie as dívidas em aberto. É o passo que destrava o resto." });
  if (s.nome === "naosei") t.push({ titulo: "Consulte seu CPF, de graça", texto: "No app da Serasa ou no Registrato, do Banco Central. Leva 5 minutos." });
  if (s.fgtsOpt === "naosei") t.push({ titulo: "Veja o saldo do seu FGTS", texto: "No app FGTS. Esse dinheiro pode entrar na entrada e mudar seu resultado." });
  if (s.fgts3 === "naosei") t.push({ titulo: "Confira seu tempo de carteira", texto: "Na Carteira de Trabalho Digital. Com 3 anos somados, você usa o FGTS e paga menos juros." });
  if (!r.blocked && r.dividas > s.renda * 0.05) {
    const sem = calcular({ ...s, dividasOpt: "nao" });
    if (!sem.blocked) {
      const ganho = r.modo === "renda" ? (sem.Vbank ?? 0) - (r.Vbank ?? 0) : sem.P - r.P;
      if (ganho > 5000)
        t.push({
          titulo: `Quitar suas parcelas libera ${fmt(ganho)}`,
          texto: `Hoje elas ocupam ${fmt(r.dividas)} do espaço da parcela. Sem elas, ${r.modo === "renda" ? "o imóvel que cabe na sua renda sobe" : "o banco empresta mais"}.`,
        });
    }
  }
  if (!r.blocked && r.gap > 0) {
    const m = Math.ceil(r.gap / poupancaMensal);
    t.push({ titulo: `Junte mais ${fmt(r.gap)}`, texto: `Guardando ${fmt(poupancaMensal)} por mês, são ${m} ${m === 1 ? "mês" : "meses"}. Lembre: o FGTS não paga ITBI e cartório.` });
  }
  if (!r.blocked && r.modo === "imovel" && !s.avaliou)
    t.push({ titulo: "Peça a avaliação do banco antes de pagar sinal", texto: "Se o imóvel for avaliado abaixo do preço, a diferença sai do seu bolso." });
  if (!r.blocked && r.gap === 0 && s.nome === "sim" && r.modo === "renda")
    t.push({ titulo: "Peça a aprovação de crédito", texto: "Antes de escolher o imóvel. Com a carta de crédito na mão, você negocia com segurança." });
  return t.slice(0, 3);
}
