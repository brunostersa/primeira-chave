import { SITE } from "@/lib/site-config";

/**
 * Os convites do fim dos e-mails do Recado do João, num lugar só. Cada e-mail aponta para um
 * id daqui (`cta` em sequencias.ts); o feed resolve o link e o Hub desenha o cartão amarelo.
 * Mudou o texto ou o destino de um convite? Muda aqui e vale para todos os e-mails que o usam.
 *
 * `destino`: id de um nó da árvore, "/slug/" de uma página fora da árvore, ou URL completa.
 * "proximo" não está aqui de propósito: é o próximo passo da fase de quem recebe (Fase.proximo).
 */
export type Cta = {
  /** O rótulo mono em cima ("Simula comigo"). */
  chamada: string;
  titulo: string;
  texto: string;
  botao: string;
  destino: string;
};

export const CTAS = {
  simular: {
    chamada: "Simula comigo",
    titulo: "Quanto cabe na sua renda?",
    texto: "Em uns 2 minutos, sem cadastro: o valor do imóvel, a parcela e quanto juntar de entrada.",
    botao: "Simular quanto posso comprar",
    destino: "simulador",
  },
  caminho: {
    chamada: "Do zero à chave",
    titulo: "O caminho inteiro da compra",
    texto: "Cada etapa explicada, com as armadilhas e os atalhos: do primeiro número até a chave na mão.",
    botao: "Conhecer a Primeira Chave",
    destino: "/mapa/",
  },
  custos: {
    chamada: "Antes de assinar",
    titulo: "Quanto separar além da entrada?",
    texto: "ITBI, cartório e avaliação saem do seu bolso, à vista. A calculadora mostra quanto no seu caso.",
    botao: "Calcular os custos da compra",
    destino: "custos-compra",
  },
  duvide: {
    chamada: "Duvide",
    titulo: "As frases que todo mundo repete",
    texto: "Armadilhas, verdades e segredos da compra, um por um, com a explicação de cada.",
    botao: "Ver o que é mito",
    destino: "/duvide/",
  },
  canal: {
    chamada: "Também no WhatsApp",
    titulo: "Prefere receber pelo WhatsApp?",
    texto: "O mesmo recado, no canal do João. Só a gente fala, ninguém vê o seu número.",
    botao: "Seguir o canal do João",
    destino: SITE.canalWhatsapp,
  },
} satisfies Record<string, Cta>;

export type CtaId = keyof typeof CTAS | "proximo";
