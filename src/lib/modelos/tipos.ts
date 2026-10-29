/**
 * Modelos de contrato como dados: a mesma fonte gera a página, o .docx e o PDF.
 *
 * Texto das cláusulas: frases curtas e {{campo}} onde a pessoa preenche. Campo vazio
 * vira "[rótulo do campo]" no arquivo, para ninguém assinar com lacuna escondida.
 */

export type TipoCampo = "texto" | "cpf" | "dinheiro" | "data" | "numero" | "longo";

export type Campo = {
  id: string;
  rotulo: string;
  tipo: TipoCampo;
  /** Uma dica curta para quem preenche. */
  ajuda?: string;
  /** Grupo do formulário (ex.: "Vendedor", "O imóvel"). */
  grupo: string;
};

export type Clausula = {
  titulo: string;
  /** Parágrafos com {{campo}}. Começar com "- " vira item de lista. */
  texto: string[];
  /** O que a cláusula faz, em português de amigo. Fica na página e no anexo do arquivo. */
  nota: string;
};

export type Modelo = {
  /** Id do nó na árvore. */
  id: string;
  /** Pedaço final da URL e nome do arquivo baixado. */
  arquivo: string;
  /** Título que vai no topo do documento. */
  tituloDocumento: string;
  /** Para quem e quando serve, em uma frase. */
  quando: string;
  /** Quando NÃO usar este modelo. */
  naoUse: string;
  /** Leis citadas nas notas, para a seção "base legal". */
  base: string[];
  campos: Campo[];
  /** Parágrafo antes das cláusulas (quem são as partes). */
  abertura: string[];
  clausulas: Clausula[];
  /** O que a IA (e a pessoa) deve conferir antes de dar o documento por pronto. */
  conferir: string[];
  /** Linhas de assinatura (rótulos). */
  assinaturas: string[];
  /** Com duas testemunhas (CPC, art. 784, III). */
  testemunhas: boolean;
  /** Cidade e data acima das assinaturas usam estes campos. */
  local: { cidade: string; data: string };
  /** SEO da página do modelo. */
  seo: { titulo: string; h1: string; descricao: string; resposta: string };
  faq: { q: string; a: string }[];
};

export type Valores = Record<string, string>;
