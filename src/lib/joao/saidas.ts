/**
 * Saídas da conversa: quando o João não é a ajuda certa, a tela mostra para onde ir.
 * Crise, disputa e pedido de pessoa disparam por regra, sem passar pelo modelo, e o texto
 * dessas falas nem sai do navegador. Canais conferidos em 04/11/2026.
 */
export type TipoSaida = "crise" | "disputa" | "humano" | "geral";
export type Canal = { nome: string; para: string; url: string; rotulo: string };

const BANCO: Canal = { nome: "Banco ou correspondente", para: "Crédito, parcela e análise. Quem decide é o banco.", url: "/simulador/", rotulo: "Levar a simulação" };
const DEFENSORIA: Canal = { nome: "Defensoria Pública de Goiás", para: "Orientação jurídica para quem não pode pagar advogado.", url: "https://www.defensoria.go.def.br", rotulo: "Abrir o site" };
const PROCON: Canal = { nome: "Procon Goiás", para: "Reclamação contra empresa.", url: "https://goias.gov.br/procon/", rotulo: "Abrir o site" };
const CONSUMIDOR: Canal = { nome: "Consumidor.gov.br", para: "Reclamação direta com a empresa, pela internet.", url: "https://www.consumidor.gov.br", rotulo: "Abrir o site" };
const CRECI: Canal = { nome: "CRECI Goiás", para: "Conferir o registro de um corretor.", url: "https://www.crecigo.gov.br", rotulo: "Abrir o site" };

export const SAIDAS: Record<TipoSaida, { titulo: string; texto: string; canais: Canal[] }> = {
  crise: {
    titulo: "Isso é importante, e eu não sou a ajuda certa",
    texto: "O CVV atende de graça, 24 horas, e a conversa é sigilosa. Em perigo agora, ligue 192. A compra pode esperar. Quando quiser, continuamos daqui.",
    canais: [
      { nome: "CVV", para: "Ligação gratuita, a qualquer hora.", url: "tel:188", rotulo: "Ligar 188" },
      { nome: "SAMU", para: "Em perigo agora.", url: "tel:192", rotulo: "Ligar 192" },
    ],
  },
  disputa: {
    titulo: "Isso eu não resolvo por aqui",
    texto: "Disputa com vendedor, corretor ou banco pede alguém que veja o seu caso. Guarde contrato, comprovantes e mensagens. Estes canais podem ajudar:",
    canais: [DEFENSORIA, PROCON, CONSUMIDOR],
  },
  humano: {
    titulo: "Aqui não tem atendente ao vivo",
    texto: "Eu sou uma inteligência artificial. Para falar com uma pessoa, estes são os caminhos:",
    canais: [BANCO, CRECI, DEFENSORIA],
  },
  geral: {
    titulo: "Essa eu não consigo resolver por aqui",
    texto: "Para não dar voltas, quem pode responder é quem cuida dessa etapa:",
    canais: [BANCO, CRECI, DEFENSORIA],
  },
};

const REGRAS: [Exclude<TipoSaida, "geral">, RegExp][] = [
  ["crise", /me matar|suic[ií]d|quero morrer|tirar a (minha )?(pr[oó]pria )?vida|acabar com a minha vida|n[aã]o quero mais viver|me machucar/i],
  ["disputa", /ca[ií] (n|e)[ou]?m? ?(um )?golpe|sofri (um )?golpe|fui enganad|me enganou|me enganaram|n[aã]o (quer |querem )?devolve|(quero|vou) (processar|reclamar)|meu advogado/i],
  ["humano", /falar com (algu[eé]m|uma pessoa|um humano|um atendente|atendente|gente)|(quero|cad[eê]) (um )?(atendente|humano)|pessoa de verdade/i],
];

export const saidaPorRegra = (texto: string) => REGRAS.find(([, r]) => r.test(texto))?.[0] ?? null;

type Fala = { de: string; tipo?: string };

/** Duas respostas seguidas sem saber: a terceira tentativa só cansaria a pessoa. */
export function deuVoltas(falas: Fala[]) {
  const ultimas = falas.filter((f) => f.de === "joao" || f.de === "saida").slice(-2);
  return ultimas.length === 2 && ultimas.every((f) => f.de === "joao" && f.tipo === "nao_sei");
}
