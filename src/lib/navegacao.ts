import { ETAPAS, HUBS, type HubId, type No } from "@/lib/conteudo/arvore";
import { doHub, hubDe, no, trilha } from "@/lib/conteudo/links";

/**
 * Navegação derivada da árvore (header, rodapé, breadcrumbs). Decisões em docs/navegacao.md.
 * Regra de ouro: página `planejado` aparece como texto "em breve", nunca como link.
 */

/** Rótulo curto de cada hub no menu. `curto` entra quando falta espaço (lg). */
const ROTULOS: Record<HubId, { rotulo: string; curto?: string }> = {
  comprar: { rotulo: "Comprar" },
  financiar: { rotulo: "Financiar" },
  programas: { rotulo: "Minha Casa Minha Vida", curto: "MCMV" },
  leilao: { rotulo: "Leilão" },
  vender: { rotulo: "Vender" },
  atalhos: { rotulo: "Atalhos" },
  ferramentas: { rotulo: "Ferramentas" },
  glossario: { rotulo: "Glossário" },
  guias: { rotulo: "Guias" },
};

/** Hubs do menu principal, na ordem da jornada. Ferramentas e glossário ficam no rodapé. */
const MENU: HubId[] = ["comprar", "financiar", "programas", "leilao", "vender", "atalhos", "guias"];
const RODAPE: HubId[] = [...MENU.filter((h) => h !== "guias"), "ferramentas"];

export type ItemNav = { id: string; titulo: string; href: string | null };
export type HubNav = {
  id: HubId;
  rotulo: string;
  curto?: string;
  resumo: string;
  /** Link da página do hub, se publicada. */
  href: string | null;
  itens: ItemNav[];
};

export const publicado = (n: No) => n.status === "publicado";
const item = (n: No): ItemNav => ({ id: n.id, titulo: n.titulo, href: publicado(n) ? n.slug : null });

const ordemEtapa = (n: No) => (n.etapa ? ETAPAS.findIndex((e) => e.id === n.etapa) : ETAPAS.length);

/** Páginas do hub na ordem da jornada (etapa, depois prioridade). Publicadas primeiro dentro da mesma etapa. */
function paginas(hub: HubId): No[] {
  return doHub(hub)
    .filter((n) => n.tipo !== "glossario")
    .sort((a, b) => ordemEtapa(a) - ordemEtapa(b) || Number(publicado(b)) - Number(publicado(a)) || a.prioridade - b.prioridade);
}

function hubNav(id: HubId): HubNav {
  const raiz = no(HUBS.find((h) => h.id === id)!.no);
  return { id, ...ROTULOS[id], resumo: raiz.resumo, href: publicado(raiz) ? raiz.slug : null, itens: paginas(id).map(item) };
}

export const menuPrincipal = (): HubNav[] => MENU.map(hubNav);
export const colunasRodape = (): HubNav[] => RODAPE.map(hubNav);
export const glossarioNav = (): HubNav => hubNav("glossario");

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
