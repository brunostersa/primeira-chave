import { custosDaCompra, type Custos } from "@/lib/financiamento/custos";
import { calcular, PERFIL_VAZIO, proximosPassos, type Perfil, type Tarefa } from "@/lib/financiamento/engine";
import { PARAMS, PARAMS_ATUALIZADOS_EM } from "@/lib/financiamento/params";
import { brl, pct } from "@/lib/format";
import { JORNADA, type StatusItem } from "./jornada";

/** O plano da pessoa: o briefing, o imóvel e a jornada. A conta sempre sai do motor. */
export type Imovel = { preco: number; avaliacao: number; tipo: "usado" | "novo"; bairro: string; itbiPct: number };
export type Momento = "pesquisando" | "dividas" | "entrada" | "imovel" | "banco";
export type Estado = { perfil: Perfil; familia: string; imovel: Imovel; etapas: Record<string, StatusItem>; aluguel?: number; guardaMes?: number; momento?: Momento; comecou?: boolean };

/** Primeira versão: só Goiânia. */
export const CIDADE = "Goiânia";

export const ESTADO_VAZIO: Estado = {
  perfil: { ...PERFIL_VAZIO },
  familia: "",
  imovel: { preco: 0, avaliacao: 0, tipo: "usado", bairro: "", itbiPct: PARAMS.itbi },
  etapas: {},
};

/** Campos que o João pode propor anotar. O nome é o contrato com a ferramenta `propor_anotacao`. */
export type Anotacao = {
  renda?: number;
  idade?: number;
  compra_com_alguem?: boolean;
  dividas_mes?: number;
  reserva?: number;
  fgts?: number;
  fgts_3_anos?: boolean;
  tem_imovel_no_nome?: boolean;
  nome_limpo?: boolean;
  familia?: string;
  preco_imovel?: number;
  avaliacao_imovel?: number;
  tipo_imovel?: "usado" | "novo";
  bairro?: string;
};

export const ROTULOS: Record<keyof Anotacao, string> = {
  renda: "Renda bruta da família",
  idade: "Idade de quem é mais velho",
  compra_com_alguem: "Compra com outra pessoa",
  dividas_mes: "Parcelas de dívidas por mês",
  reserva: "Dinheiro guardado",
  fgts: "Saldo do FGTS",
  fgts_3_anos: "3 anos ou mais de carteira",
  tem_imovel_no_nome: "Já tem imóvel no nome",
  nome_limpo: "Nome limpo",
  familia: "Família",
  preco_imovel: "Preço do imóvel",
  avaliacao_imovel: "Avaliação do banco",
  tipo_imovel: "Tipo do imóvel",
  bairro: "Bairro",
};

const DINHEIRO = new Set<keyof Anotacao>(["renda", "dividas_mes", "reserva", "fgts", "preco_imovel", "avaliacao_imovel"]);

export function textoDoCampo(k: keyof Anotacao, v: Anotacao[keyof Anotacao]) {
  if (typeof v === "boolean") return v ? "Sim" : "Não";
  if (typeof v === "number") return DINHEIRO.has(k) ? brl(v) : String(v);
  return String(v);
}

/** Aplica o que a pessoa confirmou. Campo desconhecido é ignorado, nunca salvo. */
export function aplicar(e: Estado, a: Anotacao): Estado {
  const sn = (b: boolean) => (b ? "sim" : "nao") as "sim" | "nao";
  const p = { ...e.perfil };
  const i = { ...e.imovel };
  if (a.renda !== undefined) p.renda = a.renda;
  if (a.idade !== undefined) p.idade = a.idade;
  if (a.compra_com_alguem !== undefined) p.quem = a.compra_com_alguem ? "junto" : "sozinho";
  if (a.dividas_mes !== undefined) Object.assign(p, { dividasOpt: a.dividas_mes > 0 ? "sim" : "nao", dividas: a.dividas_mes });
  if (a.reserva !== undefined) Object.assign(p, { reservaOpt: a.reserva > 0 ? "sim" : "nada", reserva: a.reserva });
  if (a.fgts !== undefined) Object.assign(p, { fgtsOpt: a.fgts > 0 ? "sim" : "nao", fgts: a.fgts });
  if (a.fgts_3_anos !== undefined) p.fgts3 = sn(a.fgts_3_anos);
  if (a.tem_imovel_no_nome !== undefined) p.imovel = sn(a.tem_imovel_no_nome);
  if (a.nome_limpo !== undefined) p.nome = sn(a.nome_limpo);
  if (a.preco_imovel !== undefined) i.preco = a.preco_imovel;
  if (a.avaliacao_imovel !== undefined) i.avaliacao = a.avaliacao_imovel;
  if (a.tipo_imovel !== undefined) i.tipo = a.tipo_imovel;
  if (a.bairro !== undefined) i.bairro = a.bairro;
  return { ...e, perfil: p, imovel: i, familia: a.familia ?? e.familia };
}

export type Conta =
  | { pronta: false; falta: string[] }
  | { pronta: false; bloqueio: "idade" | "renda" | "valor"; falta: [] }
  | {
      pronta: true;
      temImovel: boolean;
      programa: string;
      /** Fração do imóvel que o programa financia (0,8 = 80%). */
      ltv: number;
      imovel: number;
      financiado: number;
      entrada: number;
      fgtsNaEntrada: number;
      parcelaPrice: number;
      parcelaSac: number;
      parcelaMaxima: number;
      custos: Custos | null;
      naMao: number;
      limitadoPelaRenda: boolean;
      juros: number;
      prazoMeses: number;
    };

function rodarMotor({ perfil, imovel }: Estado) {
  const temImovel = imovel.preco > 0;
  return calcular({
    ...perfil,
    achou: temImovel ? "sim" : "nao",
    valor: imovel.preco,
    tipo: imovel.tipo,
    avaliou: temImovel && imovel.avaliacao > 0,
    avalReal: imovel.avaliacao,
  });
}

/** A conta do plano: com imóvel, a compra daquele imóvel; sem, o que a renda alcança. */
export function contaDoPlano(e: Estado): Conta {
  const { perfil: p, imovel } = e;
  const falta = [!p.renda && "renda", !p.idade && "idade"].filter((x): x is string => !!x);
  if (falta.length) return { pronta: false, falta };
  const temImovel = imovel.preco > 0;
  const r = rodarMotor(e);
  if (r.blocked) return { pronta: false, bloqueio: r.blocked, falta: [] };
  const custos = temImovel ? custosDaCompra({ uf: "GO", valor: imovel.preco, financiado: r.P, itbiPct: imovel.itbiPct, primeiroImovelSfh: p.imovel !== "sim" }) : null;
  const fgtsNaEntrada = Math.min(r.fgtsUse, r.entrada);
  return {
    pronta: true,
    temImovel,
    programa: r.prog.nome,
    ltv: r.prog.ltv,
    imovel: r.V,
    financiado: r.P,
    entrada: r.entrada,
    fgtsNaEntrada,
    parcelaPrice: r.price.first.pg,
    parcelaSac: r.sac.first.pg,
    parcelaMaxima: r.C,
    custos,
    naMao: r.entrada - fgtsNaEntrada + (custos?.total ?? r.custos),
    limitadoPelaRenda: r.extraRenda > 1,
    juros: r.prog.juros,
    prazoMeses: r.n,
  };
}

/** Quanto dá para guardar por mês: o que a pessoa disse ou, até lá, 10% da renda como conta inicial. */
export const guardaPorMes = (e: Estado) => e.guardaMes || Math.max(50, Math.round((e.perfil.renda * 0.1) / 50) * 50);

/** O que fazer antes do banco, com os mesmos passos do simulador. Etapas do banco ficam na própria parada. */
export function rotaDePreparo(e: Estado): Tarefa[] {
  if (!e.perfil.renda || !e.perfil.idade) return [];
  const r = rodarMotor(e);
  const passos = proximosPassos(e.perfil, r, guardaPorMes(e), brl).filter((t) => !t.titulo.startsWith("Peça"));
  if (r.blocked === "renda") passos.push({ titulo: "Abra espaço na parcela", texto: "Hoje a parte da renda que pode ir para a parcela não cobre o financiamento. Quitar dívidas ou somar a renda de outra pessoa muda essa conta." });
  return passos;
}

/** Resultado da ferramenta `calcular_plano`: em texto pronto, para o João citar sem refazer conta. */
export function contaParaOJoao(e: Estado) {
  const c = contaDoPlano(e);
  if (!c.pronta) return "bloqueio" in c ? { status: "bloqueado", motivo: c.bloqueio } : { status: "falta_dado", falta: c.falta };
  return {
    status: "estimativa",
    regras_de: PARAMS_ATUALIZADOS_EM,
    achou_imovel: c.temImovel,
    programa: c.programa,
    imovel: brl(c.imovel),
    financiado: brl(c.financiado),
    entrada: brl(c.entrada),
    fgts_na_entrada: brl(c.fgtsNaEntrada),
    parcela_price: brl(c.parcelaPrice),
    primeira_parcela_sac: brl(c.parcelaSac),
    parcela_maxima_pela_renda: brl(c.parcelaMaxima),
    parcela_ate_da_renda: `${PARAMS.comp}%`,
    banco_financia_ate: `${Math.round(c.ltv * 100)}% da avaliação`,
    itbi: c.custos ? brl(c.custos.itbi) : null,
    itbi_aliquota: pct(e.imovel.itbiPct, 1) + " (estimativa: confirmar na prefeitura)",
    registro_cartorio: c.custos ? brl(c.custos.registro) : null,
    custos_total: c.custos ? brl(c.custos.total) : null,
    dinheiro_na_mao: brl(c.naMao),
    limitado_pela_renda: c.limitadoPelaRenda,
    juros_ao_ano: pct(c.juros),
    prazo_meses: c.prazoMeses,
    aviso: "Simulação educativa com as regras públicas. Não é aprovação de crédito: quem confirma é o banco.",
  };
}

/** Uma parada da linha do tempo. `atual` é a primeira que ainda não foi resolvida. */
export type Parada = { id: string; nome: string; pergunta: string; tipo: "dados" | "imovel" | "etapa"; feitos: number; total: number; feita: boolean; atencao: boolean; atual: boolean };

/**
 * A compra em ordem: os dados, o que dá para adiantar, o imóvel e as etapas até as chaves.
 * Renda e idade bastam para a parada de dados porque é o que libera a conta do motor.
 */
export function linhaDoTempo(e: Estado): Parada[] {
  const propria = (id: "dados" | "imovel", nome: string, pergunta: string, feitos: number, total: number) => ({ id, nome, pergunta, tipo: id, feitos, total, feita: feitos === total, atencao: false, atual: false });
  const etapa = (et: (typeof JORNADA)[number]) => {
    const status = et.itens.map((i) => e.etapas[i.id] ?? "fazer");
    const feitos = status.filter((s) => s === "marcou" || s === "banco").length;
    return { id: et.id, nome: et.nome, pergunta: et.pergunta, tipo: "etapa" as const, feitos, total: et.itens.length, feita: feitos === et.itens.length, atencao: status.includes("atencao"), atual: false };
  };
  const etapas = JORNADA.map(etapa);
  const antes = JORNADA.findIndex((et) => et.id === "avaliacao");
  const paradas: Parada[] = [
    propria("dados", "Seus dados", "Quais dados mudam a minha simulação?", [e.perfil.renda > 0, !!e.perfil.idade].filter(Boolean).length, 2),
    ...etapas.slice(0, antes),
    propria("imovel", "O imóvel", "O que olhar antes de escolher o imóvel?", e.imovel.preco > 0 ? 1 : 0, 1),
    ...etapas.slice(antes),
  ];
  // Quem já está mais à frente começa dali, sem marcar como feito o que não contou.
  const inicio = e.momento === "banco" ? "credito" : e.momento === "imovel" ? "imovel" : "dados";
  const desde = paradas[0].feita ? paradas.findIndex((p) => p.id === inicio) : 0;
  const adiante = paradas.findIndex((p, i) => i >= desde && !p.feita);
  const atual = adiante >= 0 ? adiante : paradas.findIndex((p) => !p.feita);
  return paradas.map((p, i) => ({ ...p, atual: i === atual }));
}

/** As paradas em cinco fases, para o plano caber numa tela. A ordem e o progresso vêm da linha do tempo. */
const FASES = [
  { id: "preparar", nome: "Preparar", paradas: ["dados", "preparo"] },
  { id: "credito", nome: "Crédito", paradas: ["documentos", "credito"] },
  { id: "imovel", nome: "Imóvel", paradas: ["imovel", "avaliacao", "proposta"] },
  { id: "fechar", nome: "Fechar a compra", paradas: ["contrato", "itbi", "cartorio", "registro"] },
  { id: "chaves", nome: "Chaves", paradas: ["chaves"] },
];

export type Fase = { id: string; nome: string; resumo: string; paradas: Parada[]; feita: boolean; atual: boolean; atencao: boolean };

export function fases(paradas: Parada[]): Fase[] {
  return FASES.map((f) => {
    const dela = f.paradas.map((id) => paradas.find((p) => p.id === id)).filter((p): p is Parada => !!p);
    return { id: f.id, nome: f.nome, resumo: dela.map((p) => p.nome).join(", "), paradas: dela, feita: dela.every((p) => p.feita), atual: dela.some((p) => p.atual), atencao: dela.some((p) => p.atencao) };
  });
}

/** O que o João recebe a cada turno: só o que serve à conversa, sem nome nem documento. */
export function resumoDoPlano(e: Estado) {
  const p = e.perfil;
  const feitos = JORNADA.flatMap((et) => et.itens.filter((i) => e.etapas[i.id] && e.etapas[i.id] !== "fazer").map((i) => `${et.nome}: ${i.texto} (${e.etapas[i.id]})`));
  return {
    cidade: CIDADE,
    momento: e.momento ?? null,
    etapa_atual: linhaDoTempo(e).find((x) => x.atual)?.nome ?? null,
    compra: p.quem,
    idade: p.idade,
    renda: p.renda || null,
    dividas_mes: p.dividasOpt === "sim" ? p.dividas : p.dividasOpt === "nao" ? 0 : null,
    reserva: p.reservaOpt === "sim" ? p.reserva : p.reservaOpt === "nada" ? 0 : null,
    fgts: p.fgtsOpt === "sim" ? p.fgts : p.fgtsOpt === "nao" ? 0 : null,
    fgts_3_anos: p.fgts3,
    tem_imovel_no_nome: p.imovel,
    nome_limpo: p.nome,
    familia: e.familia || null,
    aluguel: e.aluguel || null,
    guarda_por_mes: e.guardaMes || null,
    imovel: e.imovel.preco ? { preco: e.imovel.preco, avaliacao: e.imovel.avaliacao || null, tipo: e.imovel.tipo, bairro: e.imovel.bairro || null } : null,
    jornada: feitos,
  };
}
