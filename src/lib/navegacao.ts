import { ARVORE, type EtapaId, type HubId, type No } from "@/lib/conteudo/arvore";
import { hubDe, no, trilha } from "@/lib/conteudo/links";

/**
 * Navegação derivada da árvore (header, rodapé, breadcrumbs). Decisões em docs/navegacao.md.
 *
 * Em cascata: poucas portas no topo (5), e cada uma mostra só o próximo nível. A maior,
 * "Comprar", abre por FASE da compra; só a fase escolhida mostra as suas páginas.
 * Tudo o que não cabe fica a um clique, em "Ver todos" (página Guias) e no Mapa do site.
 * Regra de ouro: página `planejado` aparece como texto "em breve", nunca como link.
 */

export type ItemNav = { id: string; titulo: string; resumo?: string; href: string | null };
export type ColunaNav = { id: string; rotulo: string; itens: ItemNav[] };
export type GrupoNav = { id: string; rotulo: string; pergunta: string; href: string; itens: ItemNav[]; total: number };
export type SecaoNav = {
  id: "comprar" | "ferramentas" | "vender" | "ajuda";
  rotulo: string;
  resumo: string;
  /** Página da seção ("Ver tudo"), se publicada. */
  href: string | null;
  /** Só "Comprar": o 2º nível são as fases; o 3º, as páginas da fase. */
  grupos?: GrupoNav[];
  itens: ItemNav[];
  /** Só "Ferramentas": as páginas separadas pelo que a pessoa quer fazer (simular, calcular, comparar). */
  colunas?: ColunaNav[];
  /** Atalhos laterais da seção (ex.: Minha Casa Minha Vida dentro de Comprar). */
  extras: ItemNav[];
};

export const publicado = (n: No) => n.status === "publicado";
const item = (n: No): ItemNav => ({ id: n.id, titulo: n.titulo, resumo: n.resumo, href: publicado(n) ? n.slug : null });
/** Atalho com rótulo curto (o título do nó é manchete de página, longo para menu). */
const atalho = (id: string, titulo: string): ItemNav => ({ ...item(no(id)), titulo });

/** Publicadas primeiro, depois a prioridade (1 = mais buscada). */
const porRelevancia = (a: No, b: No) => Number(publicado(b)) - Number(publicado(a)) || a.prioridade - b.prioridade;

/**
 * As 8 etapas da compra agrupadas em 5 fases: a cascata do menu "Comprar".
 * `vitrine` = as páginas que o menu mostra, NA ORDEM EM QUE A PESSOA PRECISA ENTENDER (não por
 * volume de busca), no máximo 4. O resto da fase fica em "Ver as N páginas". Atalhos vão em Ajuda,
 * ferramentas em Ferramentas: cada link aparece num lugar só do menu.
 */
const FASES: { id: string; rotulo: string; pergunta: string; etapas: EtapaId[]; vitrine: string[] }[] = [
  { id: "comecar", rotulo: "Antes de começar", pergunta: "Quanto eu posso comprar?", etapas: ["descobrir", "preparar"], vitrine: ["quanto-preciso-ganhar", "preparar-a-casa", "usar-fgts-comprar", "quanto-custa-financiar"] },
  { id: "aprovar", rotulo: "Aprovar o crédito", pergunta: "O banco vai aprovar?", etapas: ["aprovar"], vitrine: ["documentos-financiamento", "score", "quanto-tempo-demora", "financiamento-negado"] },
  { id: "escolher", rotulo: "Escolher o imóvel", pergunta: "Qual imóvel cabe e quanto ele vale?", etapas: ["escolher", "avaliar"], vitrine: ["imovel-usado", "avaliacao-do-imovel", "sem-entrada-casa", "sem-entrada-apartamento"] },
  { id: "fechar", rotulo: "Contrato e chaves", pergunta: "Quando a chave é minha?", etapas: ["contratar", "registrar"], vitrine: ["contrato-compra-venda", "registro-do-imovel", "primeiro-imovel-desconto"] },
  { id: "depois", rotulo: "Depois da chave", pergunta: "Como pago menos?", etapas: ["depois"], vitrine: ["amortizar-fgts", "sac-ou-price"] },
];

/** Vender, na ordem da venda: preparar, preço, papéis, o comprador financiado. O resto em "Ver tudo". */
const VITRINE_VENDER = ["preparar-para-vender", "quanto-vale", "documentos-vender", "vender-para-quem-financia"];
/** Ajuda: os atalhos que a pessoa mais procura antes de começar. */
const VITRINE_AJUDA = ["consultar-fgts", "registrato", "carteira-trabalho", "certidao-matricula"];
/** Ferramentas (rodapé e celular): do plano à conta fechada. No desktop o painel mostra todas, por família. */
const VITRINE_FERRAMENTAS = ["simulador", "quanto-preciso-ganhar", "custos-compra", "calculadora-itbi"];
const MAX_VITRINE = 4;
const vitrine = (ids: string[]) => ids.map(no).filter(publicado).slice(0, MAX_VITRINE).map(item);

/**
 * Leilão é público específico (quem arremata para revender): fica fora do menu, do rodapé e da
 * home, para não confundir quem compra o primeiro imóvel. As páginas seguem no ar, ligadas pelas
 * páginas vizinhas, pelo mapa do site e pelo sitemap. (Venda já fica fora de "Comprar": é outra etapa.)
 */
const FORA_DE_COMPRAR: (HubId | null)[] = ["leilao"];

function fase(f: (typeof FASES)[number]): GrupoNav {
  const todas = ARVORE.filter(
    (n) => n.etapa && f.etapas.includes(n.etapa) && !["hub", "glossario", "nucleo"].includes(n.tipo) && !FORA_DE_COMPRAR.includes(n.hub),
  ).sort(porRelevancia);
  return { id: f.id, rotulo: f.rotulo, pergunta: f.pergunta, href: `/guias/#${f.etapas[0]}`, itens: vitrine(f.vitrine), total: todas.length };
}

const linkDe = (id: string) => (publicado(no(id)) ? no(id).slug : null);

const MAPA: ItemNav = { id: "mapa", titulo: "Mapa do site", resumo: "Todas as páginas, conectadas.", href: "/mapa/" };
/** Duvide, Quem é quem, Sobre e Mídia kit ficam só na linha final do rodapé: não são ajuda. */
/** Modelos de contrato para baixar: ficam em Vender (quem compra chega a eles pelo guia do contrato). */
const MODELOS_CONTRATO: ItemNav = atalho("modelos-de-contrato", "Modelos de contrato");

/**
 * Ferramentas por família. Simulador = responde com o seu plano (renda, parcela, entrada);
 * calculadora = uma conta fechada (um imposto); mapa = compara preços de mercado.
 * Padrão pelo tipo do nó; a exceção vai em FAMILIA_POR_ID.
 */
const FAMILIAS = [
  { id: "simular", rotulo: "Simuladores" },
  { id: "calcular", rotulo: "Calculadoras" },
  { id: "comparar", rotulo: "Preços e mapas" },
] as const;
type FamiliaId = (typeof FAMILIAS)[number]["id"];
const FAMILIA_POR_TIPO: Partial<Record<No["tipo"], FamiliaId>> = { nucleo: "simular", ferramenta: "calcular", programatica: "comparar" };
const FAMILIA_POR_ID: Record<string, FamiliaId> = { "quanto-preciso-ganhar": "simular", "quanto-minha-renda-compra": "comparar" };
const familia = (n: No) => FAMILIA_POR_ID[n.id] ?? FAMILIA_POR_TIPO[n.tipo];

export function secoesMenu(): SecaoNav[] {
  const ferramentas = ARVORE.filter((n) => familia(n)).sort(porRelevancia);
  const colunas = FAMILIAS.map((f) => ({ id: f.id, rotulo: f.rotulo, itens: ferramentas.filter((n) => familia(n) === f.id).map(item) })).filter((c) => c.itens.length);
  return [
    {
      id: "comprar",
      rotulo: "Comprar",
      resumo: "O caminho do primeiro imóvel, fase por fase.",
      href: linkDe("comprar"),
      grupos: FASES.map(fase),
      itens: [],
      extras: [atalho("minha-casa-minha-vida", "Minha Casa Minha Vida"), atalho("financiamento-imobiliario", "Financiamento imobiliário")],
    },
    {
      id: "ferramentas",
      rotulo: "Ferramentas",
      resumo: "Simuladores, calculadoras e mapas que respondem com o seu número.",
      href: linkDe("ferramentas"),
      itens: vitrine(VITRINE_FERRAMENTAS),
      colunas,
      extras: [],
    },
    { id: "vender", rotulo: "Vender", resumo: no("vender").resumo, href: linkDe("vender"), itens: vitrine(VITRINE_VENDER), extras: [MODELOS_CONTRATO] },
    {
      id: "ajuda",
      rotulo: "Ajuda",
      resumo: "Os links difíceis de achar, os termos do banco e o mapa de tudo.",
      href: linkDe("atalhos"),
      itens: vitrine(VITRINE_AJUDA),
      extras: [atalho("glossario", "Glossário"), MAPA],
    },
  ];
}

/** Rodapé enxuto: as mesmas portas, só o 1º nível de cada (fases, ou as páginas principais). */
export function colunasRodape(): { id: string; rotulo: string; href: string | null; itens: ItemNav[] }[] {
  return secoesMenu().map((s) => ({
    id: s.id,
    rotulo: s.rotulo,
    href: s.href,
    itens: s.grupos
      ? [...s.grupos.map((g) => ({ id: g.id, titulo: g.rotulo, href: g.href })), ...s.extras.slice(0, 2)]
      : s.id === "ajuda"
        ? [{ id: "atalhos", titulo: "Atalhos", href: s.href }, atalho("glossario", "Glossário"), atalho("guias", "Todos os guias")]
        : s.itens.filter((i) => i.href).slice(0, 4),
  }));
}

/** O núcleo: o CTA "Simular" de todo o site. */
export const nucleo = () => no("simulador");

/**
 * Trilha de breadcrumb: início → hub → página. O hub só entra se estiver
 * publicado, para não gerar link quebrado nem item sem URL no JSON-LD.
 */
export function migalhas(id: string): ItemNav[] {
  const n = no(id);
  const h = hubDe(n);
  return trilha(n)
    .filter((x) => x.id !== h?.id || publicado(x))
    .map((x) => ({ id: x.id, titulo: x.id === "inicio" ? "Início" : x.titulo, href: x.slug }));
}
