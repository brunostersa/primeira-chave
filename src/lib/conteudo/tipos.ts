/**
 * Conteúdo das páginas como dados. Texto "rico" mínimo:
 *   **negrito** · [rótulo](#id-da-pagina) · [rótulo](g:termo) · [rótulo](https://...)
 * Link para página ainda planejada vira texto (nunca link quebrado).
 */
export type Rico = string;

export type NomeCalculo =
  | "faixas-mcmv"
  | "renda-por-valor"
  | "custos-da-compra"
  | "sac-x-price"
  | "calculadora-itbi"
  | "calculadora-ganho-capital"
  | "simulador"
  | "prazos"
  | "mapa-capitais"
  | "mapa-sp"
  | "termometro";

/** Tom de um trecho de figura: planta = banco e papéis, mark = o seu dinheiro, bad = risco, ink = neutro. */
export type Tom = "planta" | "mark" | "bad" | "ink";

/**
 * O desenho de um infográfico. Cada tipo é um esquema que se repete pelo site
 * (linha do tempo, passos, comparação...), sempre com poucas palavras.
 */
export type Esquema =
  | { tipo: "linha"; marcos: { rotulo: string; detalhe?: string }[]; trechos: { rotulo: string; tom: Tom }[] }
  | { tipo: "passos"; itens: { titulo: string; texto: string }[] }
  | { tipo: "comparar"; colunas: { titulo: string; tom: Tom; itens: string[] }[] }
  | { tipo: "numeros"; itens: { valor: string; rotulo: string; tom?: Tom }[] }
  | { tipo: "barras"; itens: { rotulo: string; valor: number; texto: string; tom?: Tom }[] }
  | { tipo: "divisao"; partes: { rotulo: string; valor: number; texto: string; tom: Tom }[]; total?: string };

/**
 * Infográfico de página: vira imagem WebP 1200x675 (scripts/gerar-figuras.mjs) com
 * texto alternativo, para o leitor, o Google Imagens e a capa nas redes.
 */
export type Figura = {
  /** Único na página; vira o nome do arquivo: /figuras/<pagina>-<id>.webp */
  id: string;
  /** Descreve o que a imagem mostra, com a palavra-chave quando for natural. */
  alt: string;
  etiqueta: string;
  titulo: string;
  /** Segunda linha da manchete, grifada de marca-texto. */
  destaque?: string;
  esquema: Esquema;
  legenda?: Rico;
};

export type Bloco =
  | { p: Rico }
  | { lista: Rico[]; ordenada?: boolean }
  | { passos: { titulo: string; texto: Rico }[] }
  | { aviso: { titulo: string; texto: Rico; tom?: "planta" | "mark" | "bad" } }
  | { tabela: { cabecalho: string[]; linhas: Rico[][] } }
  | { calculo: NomeCalculo }
  | { figura: Figura };

export type Texto = {
  /** <title> quando diferente do título da página. */
  tituloSeo?: string;
  /** H1 da página quando diferente do título da árvore (que é curto, para menu e trilha). */
  h1?: string;
  descricao: string;
  /** A resposta curta logo abaixo do título (número primeiro). */
  resposta: Rico;
  secoes: { titulo: string; blocos: Bloco[] }[];
  faq: { q: string; a: string }[];
};

/** Termo do glossário: a frase curta fica na árvore; aqui vai a explicação completa. */
export type TextoTermo = { explicacao: Rico[]; exemplo?: Rico; cuidado?: Rico };

/** Ids internos citados num texto rico (para o teste de integridade). */
export const idsCitados = (texto: string) => [...texto.matchAll(/\]\(#([\w-]+)\)/g)].map((m) => m[1]);
export const termosCitados = (texto: string) => [...texto.matchAll(/\]\(g:([\w-]+)\)/g)].map((m) => m[1]);
