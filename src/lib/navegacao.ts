import { ARVORE, type EtapaId, type HubId, type No } from "@/lib/conteudo/arvore";
import { doHub, hubDe, no, trilha } from "@/lib/conteudo/links";

/**
 * Navegação derivada da árvore (header, rodapé, breadcrumbs). Decisões em docs/navegacao.md.
 *
 * Em cascata: poucas portas no topo (5), e cada uma mostra só o próximo nível. A maior,
 * "Comprar", abre por FASE da compra; só a fase escolhida mostra as suas páginas.
 * Tudo o que não cabe fica a um clique, em "Ver todos" (página Guias) e no Mapa do site.
 * Regra de ouro: página `planejado` aparece como texto "em breve", nunca como link.
 */

export type ItemNav = { id: string; titulo: string; resumo?: string; href: string | null };
export type GrupoNav = { id: string; rotulo: string; pergunta: string; href: string; itens: ItemNav[]; total: number };
export type SecaoNav = {
  id: "comprar" | "ferramentas" | "leilao" | "vender" | "ajuda";
  rotulo: string;
  resumo: string;
  /** Página da seção ("Ver tudo"), se publicada. */
  href: string | null;
  /** Só "Comprar": o 2º nível são as fases; o 3º, as páginas da fase. */
  grupos?: GrupoNav[];
  itens: ItemNav[];
  /** Atalhos laterais da seção (ex.: Minha Casa Minha Vida dentro de Comprar). */
  extras: ItemNav[];
};

export const publicado = (n: No) => n.status === "publicado";
const item = (n: No): ItemNav => ({ id: n.id, titulo: n.titulo, resumo: n.resumo, href: publicado(n) ? n.slug : null });
/** Atalho com rótulo curto (o título do nó é manchete de página, longo para menu). */
const atalho = (id: string, titulo: string): ItemNav => ({ ...item(no(id)), titulo });

/** Publicadas primeiro, depois a prioridade (1 = mais buscada). */
const porRelevancia = (a: No, b: No) => Number(publicado(b)) - Number(publicado(a)) || a.prioridade - b.prioridade;
const MAX_ITENS = 6;

/** As 8 etapas da compra agrupadas em 5 fases: a cascata do menu "Comprar". */
const FASES: { id: string; rotulo: string; pergunta: string; etapas: EtapaId[] }[] = [
  { id: "comecar", rotulo: "Antes de começar", pergunta: "Quanto eu posso comprar?", etapas: ["descobrir", "preparar"] },
  { id: "aprovar", rotulo: "Aprovar o crédito", pergunta: "O banco vai aprovar?", etapas: ["aprovar"] },
  { id: "escolher", rotulo: "Escolher o imóvel", pergunta: "Qual imóvel cabe e quanto ele vale?", etapas: ["escolher", "avaliar"] },
  { id: "fechar", rotulo: "Contrato e chaves", pergunta: "Quando a chave é minha?", etapas: ["contratar", "registrar"] },
  { id: "depois", rotulo: "Depois da chave", pergunta: "Como pago menos?", etapas: ["depois"] },
];

/** Leilão tem porta própria no menu: não repete dentro de "Comprar". (Venda já fica fora: é outra etapa.) */
const FORA_DE_COMPRAR: (HubId | null)[] = ["leilao"];

function fase(f: (typeof FASES)[number]): GrupoNav {
  const todas = ARVORE.filter(
    (n) => n.etapa && f.etapas.includes(n.etapa) && !["hub", "glossario", "nucleo"].includes(n.tipo) && !FORA_DE_COMPRAR.includes(n.hub),
  ).sort(porRelevancia);
  return { id: f.id, rotulo: f.rotulo, pergunta: f.pergunta, href: `/guias/#${f.etapas[0]}`, itens: todas.slice(0, MAX_ITENS).map(item), total: todas.length };
}

const paginasDoHub = (hub: HubId) => doHub(hub).filter((n) => n.tipo !== "hub" && n.tipo !== "glossario").sort(porRelevancia);
const linkDe = (id: string) => (publicado(no(id)) ? no(id).slug : null);

const MAPA: ItemNav = { id: "mapa", titulo: "Mapa do site", resumo: "Todas as páginas, conectadas.", href: "/mapa/" };
const DUVIDE: ItemNav = { id: "duvide", titulo: "Duvide: armadilhas e segredos", resumo: "Contrato de gaveta, ágio, preço por fora e mais.", href: "/duvide/" };
const PROFISSIONAIS: ItemNav = { id: "para", titulo: "Para profissionais", resumo: "Corretor, correspondente, investidor, construtor e imobiliária.", href: "/para/" };
const SOBRE: ItemNav = { id: "sobre", titulo: "Sobre a Primeira Chave", resumo: "Quem faz, por quê e como trabalhamos.", href: "/sobre/" };

export function secoesMenu(): SecaoNav[] {
  const ferramentas = ARVORE.filter((n) => ["nucleo", "ferramenta", "programatica"].includes(n.tipo)).sort(porRelevancia);
  return [
    {
      id: "comprar",
      rotulo: "Comprar",
      resumo: "O caminho do primeiro imóvel, fase por fase.",
      href: linkDe("comprar"),
      grupos: FASES.map(fase),
      itens: [],
      extras: [atalho("minha-casa-minha-vida", "Minha Casa Minha Vida"), atalho("financiamento-imobiliario", "Financiamento imobiliário"), atalho("guias", "Todos os guias")],
    },
    {
      id: "ferramentas",
      rotulo: "Ferramentas",
      resumo: "Calculadoras e mapas que respondem com o seu número.",
      href: linkDe("ferramentas"),
      itens: ferramentas.slice(0, MAX_ITENS).map(item),
      extras: [],
    },
    { id: "leilao", rotulo: "Leilão", resumo: no("leilao-caixa").resumo, href: linkDe("leilao-caixa"), itens: paginasDoHub("leilao").slice(0, MAX_ITENS).map(item), extras: [] },
    { id: "vender", rotulo: "Vender", resumo: no("vender").resumo, href: linkDe("vender"), itens: paginasDoHub("vender").slice(0, MAX_ITENS).map(item), extras: [] },
    {
      id: "ajuda",
      rotulo: "Ajuda",
      resumo: "Os links difíceis de achar, os termos do banco e o mapa de tudo.",
      href: linkDe("atalhos"),
      itens: paginasDoHub("atalhos").slice(0, MAX_ITENS).map(item),
      extras: [DUVIDE, PROFISSIONAIS, atalho("glossario", "Glossário"), atalho("guias", "Todos os guias"), MAPA, SOBRE],
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
        ? [{ id: "atalhos", titulo: "Atalhos", href: s.href }, ...s.extras]
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
