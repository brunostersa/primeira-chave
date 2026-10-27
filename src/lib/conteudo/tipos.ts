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
  | "prazos";

export type Bloco =
  | { p: Rico }
  | { lista: Rico[]; ordenada?: boolean }
  | { passos: { titulo: string; texto: Rico }[] }
  | { aviso: { titulo: string; texto: Rico; tom?: "planta" | "mark" | "bad" } }
  | { tabela: { cabecalho: string[]; linhas: Rico[][] } }
  | { calculo: NomeCalculo };

export type Texto = {
  /** <title> quando diferente do título da página. */
  tituloSeo?: string;
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
