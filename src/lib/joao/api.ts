import { HUB } from "@/lib/hub";
import type { Humor } from "@/components/brand/JoaoDeBarro";
import type { Anotacao, Estado } from "./estado";

/**
 * A conversa passa pelo Hub, que guarda a chave do modelo, limita o uso e busca nas páginas.
 * O motor continua no navegador: quando o João precisa de uma conta, o Hub devolve o pedido
 * (`pendentes`), a tela calcula e manda o resultado de volta.
 * NEXT_PUBLIC_JOAO_API troca o endereço para testar com o Hub rodando local.
 */
const API = process.env.NEXT_PUBLIC_JOAO_API || "https://customerhub.com.br/api/joao";

export type Pendente = { id: string; nome: "calcular_plano" | "propor_anotacao"; entrada: Anotacao | Record<string, never> };
export type ResultadoFerramenta = { type: "tool_result"; tool_use_id: string; content: string };
export type Fonte = { titulo: string; url: string };
export type RespostaJoao = { texto: string; humor: Humor; tipo: "explicacao" | "conversa" | "nao_sei"; fontes: Fonte[] };
export type Turno = { api: unknown[]; pendentes?: Pendente[]; parciais?: ResultadoFerramenta[]; resposta?: RespostaJoao };

export const CONSENTIMENTO_LINK =
  "Quero guardar a minha conversa, o meu plano e os dados do imóvel num link só meu, por até 12 meses sem uso. Sei que quem tiver o link consegue abrir, e que posso apagar tudo a qualquer momento.";

async function post<T>(caminho: string, corpo: object): Promise<T> {
  const r = await fetch(`${API}${caminho}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: HUB.clientId, ...corpo }) });
  const dados = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(dados.error || "O João não conseguiu responder agora. Tente de novo em instantes.");
  return dados as T;
}

/** A pessoa apontou um erro: a pergunta e a resposta vão para a revisão, sem ligar a ela. */
export const avisarErro = (corpo: { pergunta: string; resposta: string }) => post<{ ok: true }>("", { acao: "erro", ...corpo });

export const falar = (corpo: { api: unknown[]; texto?: string; resultados?: ResultadoFerramenta[]; plano: object }) => post<Turno>("", corpo);

/** O que fica guardado no link: a tela, o histórico do modelo e o plano. */
export type Compra = { mensagens: unknown[]; api: unknown[]; estado: Estado };

export const criarLink = (compra: Compra) => post<{ token: string }>("/compra", { acao: "criar", consentimento: CONSENTIMENTO_LINK, compra });
export const abrirLink = (token: string) => post<{ compra: Compra }>("/compra", { acao: "abrir", token });
export const salvarLink = (token: string, compra: Compra) => post<{ ok: true }>("/compra", { acao: "salvar", token, compra });
export const apagarLink = (token: string) => post<{ ok: true }>("/compra", { acao: "apagar", token });
