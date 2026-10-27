import { ARVORE, ETAPAS, HUBS, type EtapaId, type HubId, type No } from "./arvore";

/**
 * O motor de ligações: tudo o que uma página precisa saber sobre os vizinhos dela
 * sai daqui, nunca de link escrito à mão. Regras em docs/arquitetura-de-conteudo.md.
 */

const POR_ID = new Map(ARVORE.map((n) => [n.id, n]));

export function no(id: string): No {
  const n = POR_ID.get(id);
  if (!n) throw new Error(`Nó inexistente na árvore: ${id}`);
  return n;
}

export const existe = (id: string) => POR_ID.has(id);
export const publicadas = () => ARVORE.filter((n) => n.status === "publicado");
export const porSlug = (slug: string) => ARVORE.find((n) => n.slug === slug);

/** O hub de um nó (o próprio nó, se ele for o hub). */
export function hubDe(n: No): No | null {
  if (!n.hub) return null;
  const h = HUBS.find((x) => x.id === n.hub);
  return h ? no(h.no) : null;
}

export const doHub = (hub: HubId) => ARVORE.filter((n) => n.hub === hub && n.id !== HUBS.find((h) => h.id === hub)?.no);

/** Caminho para breadcrumb: início → hub → página. */
export function trilha(n: No): No[] {
  const h = hubDe(n);
  return [no("inicio"), ...(h && h.id !== n.id ? [h] : []), ...(n.id === "inicio" ? [] : [n])];
}

const ordemEtapa = (e: EtapaId) => ETAPAS.findIndex((x) => x.id === e);

/** O próximo passo da jornada: a porta da etapa seguinte. Vendedor e "depois" não têm próximo. */
export function proximoPasso(n: No): No | null {
  if (!n.etapa || n.etapa === "vender" || n.etapa === "depois") return null;
  const i = ordemEtapa(n.etapa);
  const seguinte = ETAPAS[i + 1];
  if (!seguinte || seguinte.id === "vender") return null;
  const porta = no(seguinte.porta);
  return porta.id === n.id ? null : porta;
}

/** A ferramenta do assunto: a primeira ferramenta ligada, ou o simulador. */
export function ferramenta(n: No): No {
  const ligada = n.liga.map(no).find((x) => x.tipo === "ferramenta" || x.tipo === "nucleo");
  return ligada ?? no("simulador");
}

/** Quem aponta para este nó (links explícitos). */
export function chegando(n: No): No[] {
  return ARVORE.filter((x) => x.id !== n.id && (x.liga.includes(n.id) || saindo(x).some((y) => y.id === n.id)));
}

/**
 * Todos os links que saem de uma página: hub, próximo passo, ferramenta,
 * ligações explícitas e termos do glossário. Sem repetição, sem ela mesma.
 */
export function saindo(n: No): No[] {
  const lista: (No | null)[] = [
    hubDe(n),
    proximoPasso(n),
    n.tipo === "glossario" || n.tipo === "inicio" ? null : ferramenta(n),
    ...n.liga.map(no),
    ...n.glossario.map((g) => no(`g-${g}`)),
  ];
  // Hubs listam as páginas do próprio hub; o glossário lista as páginas que usam cada termo.
  if (n.tipo === "hub" && n.hub && n.hub !== "glossario") lista.push(...doHub(n.hub));
  if (n.id === "glossario") lista.push(...ARVORE.filter((x) => x.tipo === "glossario"));
  if (n.tipo === "glossario") lista.push(...usamTermo(n.id.replace(/^g-/, "")));
  const vistos = new Set<string>();
  return lista.filter((x): x is No => !!x && x.id !== n.id && !vistos.has(x.id) && !!vistos.add(x.id));
}

/** Páginas que explicam ou usam um termo do glossário. */
export const usamTermo = (termo: string) => ARVORE.filter((x) => x.glossario.includes(termo));

/**
 * Relacionados para o rodapé da página: mesmo hub, mesma etapa ou termos em comum,
 * ordenados por afinidade e prioridade. Exclui o que já está em `saindo`.
 */
export function relacionados(n: No, quantos = 4): No[] {
  const ja = new Set(saindo(n).map((x) => x.id).concat(n.id));
  return ARVORE.filter((x) => !ja.has(x.id) && x.tipo !== "glossario" && x.tipo !== "inicio")
    .map((x) => ({
      x,
      pontos:
        (x.hub === n.hub ? 3 : 0) +
        (x.etapa && x.etapa === n.etapa ? 2 : 0) +
        x.glossario.filter((g) => n.glossario.includes(g)).length +
        (4 - x.prioridade) * 0.5,
    }))
    .filter((p) => p.pontos > 1)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, quantos)
    .map((p) => p.x);
}

/** Distância em cliques a partir da home (BFS sobre `saindo`). */
export function distancias(): Map<string, number> {
  const d = new Map<string, number>([["inicio", 0]]);
  const fila = ["inicio"];
  while (fila.length) {
    const atual = no(fila.shift()!);
    for (const v of saindo(atual)) {
      if (!d.has(v.id)) {
        d.set(v.id, d.get(atual.id)! + 1);
        fila.push(v.id);
      }
    }
  }
  return d;
}

/** Números do organismo, para /mapa. */
export function estatisticas() {
  const arestas = ARVORE.reduce((t, n) => t + saindo(n).length, 0);
  const volume = ARVORE.reduce((t, n) => t + n.termos.reduce((s, [, v]) => s + v, 0), 0);
  return {
    paginas: ARVORE.length,
    publicadas: publicadas().length,
    conexoes: arestas,
    mediaLinks: arestas / ARVORE.length,
    buscasMes: volume,
  };
}
