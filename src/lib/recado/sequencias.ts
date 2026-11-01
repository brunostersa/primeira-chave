import { PARAMS } from "@/lib/financiamento/params";
import { brl } from "@/lib/format";
import type { CtaId } from "./ctas";

/**
 * "Recado do João": a newsletter da Primeira Chave. Este arquivo é o TEXTO; quem envia é o
 * Hub da CustomerHub, que lê o feed (/recado/feed.json) e monta a fila de envios.
 *
 * Quem se inscreve recebe duas trilhas ao mesmo tempo, além do recado semanal:
 *   - a da FASE que escolheu (FASES[].sequencia: dias 0, 3, 5 e 7);
 *   - a COMUM a todos (TRILHA): lembretes por dia e por gatilho (clicou ou não no simulador, sumiu).
 * O Hub segura tudo em no máximo um e-mail por dia e nada no dia do recado.
 *
 * Os links apontam para ids da árvore ("duvide:<id>" para uma carta, "/slug/" para página fora
 * da árvore) e o teste garante que todos existem. O convite do fim (`cta`) é um id de ctas.ts.
 * Mudou um texto? O Hub pede de novo o ok antes de enviar.
 */

export type FaseId = "pesquisando" | "juntando" | "banco" | "imovel" | "vender";

export type Passo = {
  /** Dias depois da inscrição (0 = na hora). Na troca de fase, conta a partir da troca. */
  dia: number;
  assunto: string;
  /** O texto cinza depois do assunto na caixa de entrada. */
  previa: string;
  paragrafos: string[];
  /** Para onde o botão leva: id da árvore, "duvide:<id>" ou "/slug/". */
  link: string;
  botao: string;
  /** O convite do fim do e-mail (ctas.ts). Não pode levar ao mesmo lugar que o botão. */
  cta: CtaId;
};

export type Fase = {
  id: FaseId;
  /** Como aparece no formulário. */
  rotulo: string;
  pergunta: string;
  /** O "seu próximo passo": fecha todo recado semanal e é o cta "proximo". */
  proximo: string;
  /**
   * A ordem do array é a identidade do e-mail no Hub (seq:<fase>:<índice>): e-mail novo entra
   * no FIM, mesmo que saia antes, para não mudar o índice (e a aprovação) dos que já existem.
   */
  sequencia: Passo[];
};

/**
 * Quando um e-mail da trilha comum sai.
 *   dia            → N dias depois da inscrição
 *   sem-clique     → N dias depois da inscrição, só se a pessoa ainda não clicou no destino
 *   depois-clique  → N dias depois do primeiro clique no destino
 *   sumiu          → depois de N e-mails seguidos sem nenhum clique (uma vez só)
 */
export type Gatilho =
  | { tipo: "dia"; dia: number }
  | { tipo: "sem-clique"; dia: number; destino: string }
  | { tipo: "depois-clique"; dias: number; destino: string }
  | { tipo: "sumiu"; emails: number };

/**
 * Partes do e-mail que o Hub monta com o token de quem recebe:
 *   fases     → um botão por fase, que leva a /recado/fase/ para trocar
 *   continuar → o botão principal confirma que a pessoa quer continuar recebendo
 */
export type Especial = "fases" | "continuar";

export type PassoTrilha = Omit<Passo, "dia"> & {
  /** Identidade no Hub (trilha:<id>): não mude depois de publicado. */
  id: string;
  gatilho: Gatilho;
  /** Fases que NÃO recebem (já têm um e-mail igual na sequência delas). */
  exceto?: FaseId[];
  especial?: Especial;
};

const comp = PARAMS.comp;
const cota = PARAMS.sbpeLtvUsado;

export const FASES: Fase[] = [
  {
    id: "pesquisando",
    rotulo: "Só pesquisando",
    pergunta: "Quanto eu posso comprar?",
    proximo: "simulador",
    sequencia: [
      {
        dia: 0,
        assunto: "O primeiro número da sua compra",
        previa: "Antes de olhar imóvel, descubra quanto cabe na sua renda.",
        paragrafos: [
          "Oi! Aqui é o João. Toda semana eu mando um recado curto sobre a compra do primeiro imóvel: um número, uma armadilha e um atalho. Nada de economês.",
          "Pra começar: antes de olhar imóvel, vale saber quanto você pode comprar. O banco olha a sua renda bruta (o valor do holerite antes dos descontos) e o quanto a parcela pode ocupar dela.",
          "O simulador faz essa conta em uns 2 minutos, sem cadastro. Você sai com um número e o seu próximo passo.",
        ],
        link: "simulador",
        botao: "Simular quanto posso comprar",
        cta: "caminho",
      },
      {
        dia: 3,
        assunto: `A regra dos ${comp}%`,
        previa: "Por que a parcela, e não o preço, decide o imóvel que cabe.",
        paragrafos: [
          `O banco deixa a parcela ocupar até ${comp}% da sua renda bruta. Com renda de ${brl(5000)}, a parcela pode chegar a ${brl((5000 * comp) / 100)}.`,
          "É essa parcela que define quanto o banco empresta, e não o preço do imóvel que você gostou. Por isso duas pessoas com o mesmo salário podem financiar valores diferentes: o prazo e os juros mudam a conta.",
          "Quer ver a renda mínima para cada valor de imóvel?",
        ],
        link: "quanto-preciso-ganhar",
        botao: "Ver quanto preciso ganhar",
        cta: "simular",
      },
      {
        dia: 7,
        assunto: "Dá pra comprar sem entrada?",
        previa: "O segredo está na avaliação do banco, não no preço.",
        paragrafos: [
          `O banco empresta até ${cota}% do valor de avaliação do imóvel (o que o engenheiro do banco acha que ele vale), sem passar do preço que você paga.`,
          "Se a avaliação vier bem acima do preço, a parte que o banco empresta pode cobrir quase tudo. Não é regra, é conta: depende do imóvel e da avaliação.",
          "Eu explico com números, e com o que confirmar antes de contar com isso.",
        ],
        link: "sem-entrada-casa",
        botao: "Entender a avaliação",
        cta: "simular",
      },
      {
        dia: 5,
        assunto: "Score alto não aprova financiamento",
        previa: "O que o banco olha antes da sua nota de crédito.",
        paragrafos: [
          "Muita gente acha que score alto é financiamento garantido. Não é.",
          "O banco pesa mais a sua renda, as parcelas que você já paga e os atrasos do que a nota. Score alto com a renda apertada não aprova.",
          "Antes de se preocupar com a nota, vale saber se a parcela cabe.",
        ],
        link: "duvide:score-alto-aprova",
        botao: "Ler a explicação",
        cta: "simular",
      },
    ],
  },
  {
    id: "juntando",
    rotulo: "Juntando a entrada",
    pergunta: "O que eu arrumo antes?",
    proximo: "preparar-a-casa",
    sequencia: [
      {
        dia: 0,
        assunto: "Quanto você já tem de FGTS?",
        previa: "O saldo pode entrar na entrada. Veja em 3 passos.",
        paragrafos: [
          "Oi! Aqui é o João. Toda semana eu mando um recado curto sobre a compra do primeiro imóvel. Como você está juntando a entrada, vou começar pelo dinheiro que muita gente esquece.",
          "O FGTS (o fundo da carteira assinada) pode pagar parte da entrada. Ele não paga ITBI nem cartório, mas ajuda muito no começo.",
          "Consultar o saldo leva 3 passos no app do FGTS.",
        ],
        link: "consultar-fgts",
        botao: "Consultar o meu FGTS",
        cta: "simular",
      },
      {
        dia: 3,
        assunto: "Quem pode usar o FGTS para comprar",
        previa: "As regras: tempo de carteira, imóvel e o que ele não paga.",
        paragrafos: [
          "Para usar o FGTS na compra, é preciso somar 3 anos de carteira assinada (não precisam ser seguidos) e não ter outro imóvel na mesma cidade.",
          "Ele pode ir para a entrada, para abater o saldo e até para pagar parte das parcelas. Quem tem 3 anos ou mais de FGTS ainda ganha juros um pouco menores no Minha Casa Minha Vida.",
        ],
        link: "usar-fgts-comprar",
        botao: "Ver as regras do FGTS",
        cta: "simular",
      },
      {
        dia: 7,
        assunto: "Os custos que ninguém conta",
        previa: "ITBI e cartório saem do seu bolso, à vista.",
        paragrafos: [
          `Além da entrada, tem o ITBI (o imposto da prefeitura, perto de ${PARAMS.itbi}% do imóvel) e o registro no cartório. Somados, passam fácil de 4% do preço.`,
          "Esses custos não entram no financiamento e o FGTS não paga. Melhor juntar desde já.",
        ],
        link: "custos-compra",
        botao: "Calcular os meus custos",
        cta: "simular",
      },
      {
        dia: 5,
        assunto: "O FGTS não serve para qualquer imóvel",
        previa: "As três condições, e as duas contas que ele nunca paga.",
        paragrafos: [
          "Dá para usar o FGTS em qualquer imóvel? Não.",
          "Só em imóvel residencial, para você morar, com 3 anos de FGTS somados e sem outro imóvel na mesma cidade. E ele nunca paga o ITBI nem o cartório.",
          "Conferir isso antes evita contar com um dinheiro que não vai entrar.",
        ],
        link: "duvide:fgts-qualquer-imovel",
        botao: "Ler a explicação",
        cta: "proximo",
      },
    ],
  },
  {
    id: "banco",
    rotulo: "Já vou ao banco",
    pergunta: "O banco vai aprovar?",
    proximo: "documentos-financiamento",
    sequencia: [
      {
        dia: 0,
        assunto: "O checklist antes de ir ao banco",
        previa: "Os documentos seus, do vendedor e do imóvel.",
        paragrafos: [
          "Oi! Aqui é o João. Toda semana eu mando um recado curto sobre a compra do primeiro imóvel. Como você já vai ao banco, vou direto ao que mais atrasa: documento faltando.",
          "O banco pede papéis de três lados: os seus, os de quem vende e os do imóvel. Chegar com tudo em ordem encurta semanas.",
        ],
        link: "documentos-financiamento",
        botao: "Ver o checklist",
        cta: "simular",
      },
      {
        dia: 3,
        assunto: "O que o banco vê no seu CPF",
        previa: "O Registrato mostra, de graça, o mesmo que o banco olha.",
        paragrafos: [
          "Antes de o banco analisar o seu crédito, você pode ver o que ele vai ver. O Registrato, do Banco Central, mostra empréstimos, cartões e dívidas no seu CPF, de graça.",
          "Achou algo estranho? Dá tempo de resolver antes de pedir o financiamento.",
        ],
        link: "registrato",
        botao: "Consultar o Registrato",
        cta: "proximo",
      },
      {
        dia: 7,
        assunto: "Se o financiamento vier negado",
        previa: "Por que acontece e quando vale tentar de novo.",
        paragrafos: [
          "Negativa não é fim de linha. Quase sempre é renda que não cobre a parcela, nome com restrição ou documento faltando.",
          "Cada motivo tem um caminho, e às vezes é só mudar o prazo ou somar a renda de outra pessoa.",
        ],
        link: "financiamento-negado",
        botao: "Ver o que fazer",
        cta: "simular",
      },
      {
        dia: 5,
        assunto: "Ninguém aprova crédito por fora",
        previa: "Se alguém cobra para liberar o financiamento, desconfie.",
        paragrafos: [
          "Quem promete aprovar o seu financiamento em troca de uma taxa está mentindo.",
          "Ninguém aprova crédito por fora do banco. Cobrança antecipada para liberar financiamento é sinal de golpe.",
          "Na dúvida, fale direto com o banco, pelos canais oficiais.",
        ],
        link: "duvide:cobram-para-aprovar",
        botao: "Ler a explicação",
        cta: "duvide",
      },
    ],
  },
  {
    id: "imovel",
    rotulo: "Já escolhi o imóvel",
    pergunta: "Quanto o banco acha que vale?",
    proximo: "avaliacao-do-imovel",
    sequencia: [
      {
        dia: 0,
        assunto: "A avaliação do banco decide a sua entrada",
        previa: "Quem faz, quem paga e o que muda se vier abaixo do preço.",
        paragrafos: [
          "Oi! Aqui é o João. Toda semana eu mando um recado curto sobre a compra do primeiro imóvel. Como você já escolheu o imóvel, o próximo número importante é a avaliação.",
          `O banco empresta até ${cota}% do valor que o engenheiro dele dá ao imóvel. Se a avaliação vier abaixo do preço, a entrada aumenta. Se vier acima, pode diminuir.`,
        ],
        link: "avaliacao-do-imovel",
        botao: "Entender a avaliação",
        cta: "custos",
      },
      {
        dia: 3,
        assunto: "Peça a matrícula antes de assinar",
        previa: "A certidão de nascimento do imóvel conta as dívidas dele.",
        paragrafos: [
          "A matrícula é o documento do imóvel no cartório. Ela mostra quem é o dono e se há ônus (dívidas e travas, como penhora ou hipoteca).",
          "Pedir a certidão online é rápido e evita comprar um problema.",
        ],
        link: "certidao-matricula",
        botao: "Como pedir a matrícula",
        cta: "proximo",
      },
      {
        dia: 7,
        assunto: "O que não pode faltar no contrato",
        previa: "Prazo, sinal, multa e o que acontece se o banco negar.",
        paragrafos: [
          "O contrato de compra e venda protege os dois lados. Ele precisa dizer o que acontece com o sinal se o financiamento não sair.",
          "Tem modelo para baixar e a lista do que conferir.",
        ],
        link: "contrato-compra-venda",
        botao: "Ver o modelo de contrato",
        cta: "custos",
      },
      {
        dia: 5,
        assunto: "O sinal não garante a compra",
        previa: "O que acontece com o seu dinheiro se o banco negar.",
        paragrafos: [
          "Pagou o sinal, o negócio está garantido? Não exatamente.",
          "O sinal prende os dois lados ao negócio. Se o banco negar o crédito e o contrato não disser nada sobre isso, você pode perder o dinheiro.",
          "Por isso vale escrever no contrato o que acontece se o financiamento não sair.",
        ],
        link: "duvide:sinal-garante",
        botao: "Ler a explicação",
        cta: "proximo",
      },
    ],
  },
  {
    id: "vender",
    rotulo: "Quero vender",
    pergunta: "Como vendo meu usado?",
    proximo: "vender-para-quem-financia",
    sequencia: [
      {
        dia: 0,
        assunto: "Quanto vale o seu imóvel?",
        previa: "Preço de anúncio, preço de venda e avaliação do banco.",
        paragrafos: [
          "Oi! Aqui é o João. Toda semana eu mando um recado curto sobre compra e venda de imóvel. Como você quer vender, vou começar pelo preço.",
          "Existem três números: o que você anuncia, o que o comprador paga e o que o banco do comprador avalia. É o terceiro que costuma decidir o negócio.",
        ],
        link: "quanto-vale",
        botao: "Ver os três preços",
        cta: "proximo",
      },
      {
        dia: 3,
        assunto: "Vender para quem vai financiar",
        previa: "Como a avaliação do banco do comprador mexe no seu preço.",
        paragrafos: [
          "A maioria dos compradores financia. O banco deles manda um engenheiro avaliar o seu imóvel, e se a avaliação vier abaixo do preço o comprador precisa de mais entrada.",
          "Saber disso antes ajuda a precificar e a não perder a venda no meio do caminho.",
        ],
        link: "vender-para-quem-financia",
        botao: "Entender o lado do comprador",
        cta: "caminho",
      },
      {
        dia: 7,
        assunto: "Tem imposto na venda?",
        previa: "Ganho de capital, isenções e como calcular.",
        paragrafos: [
          "Se você vender por mais do que pagou, pode haver imposto sobre o lucro (ganho de capital). Há isenções, como usar o dinheiro para comprar outro imóvel em até 180 dias.",
          "A calculadora mostra se você paga e quanto.",
        ],
        link: "imposto-venda",
        botao: "Ver se pago imposto",
        cta: "caminho",
      },
      {
        dia: 5,
        assunto: "Anunciar alto pode travar a venda",
        previa: "Quem compra financia, e o banco dele avalia.",
        paragrafos: [
          "Anunciar acima do mercado, para negociar depois, parece esperto. Costuma travar.",
          "Quem compra quase sempre financia, e o banco dele avalia o seu imóvel. Preço acima da avaliação pede mais entrada do comprador, e o negócio para.",
        ],
        link: "duvide:anuncio-alto",
        botao: "Ler a explicação",
        cta: "proximo",
      },
    ],
  },
];

const custosTotal = (PARAMS.itbi + PARAMS.cartorio + PARAMS.avaliacao).toLocaleString("pt-BR");

/** A trilha comum a todas as fases (os e-mails 2, 6, 7, 8, 9 e 10 da régua de boas-vindas). */
export const TRILHA: PassoTrilha[] = [
  {
    id: "lembrete-simulador",
    gatilho: { tipo: "sem-clique", dia: 1, destino: "simulador" },
    exceto: ["vender"],
    assunto: "Você já sabe o seu número?",
    previa: "2 minutos, sem cadastro, e você sai com o valor que cabe.",
    paragrafos: [
      "Antes de olhar imóvel, vale ter um número na mão: quanto a sua renda compra.",
      "É ele que separa o imóvel que dá do imóvel que só dá dor de cabeça. E evita se apaixonar pelo apartamento errado.",
      "O simulador faz essa conta com as regras de hoje da Caixa. Você não precisa se cadastrar.",
    ],
    link: "simulador",
    botao: "Simular agora",
    cta: "caminho",
  },
  {
    id: "depois-do-simulador",
    gatilho: { tipo: "depois-clique", dias: 2, destino: "simulador" },
    exceto: ["vender"],
    assunto: "Tenho o meu número. E agora?",
    previa: "Três coisas para fazer com o resultado do simulador.",
    paragrafos: [
      "Você simulou, e isso já te coloca na frente de muita gente. Agora, três coisas para fazer com o resultado.",
      "Primeiro, confira se usou a renda bruta, a do holerite antes dos descontos. Depois, some à entrada os custos da compra, que não entram no financiamento. Por último, veja se o seu FGTS pode ajudar.",
      "Eu juntei tudo isso num passo a passo do que arrumar antes de ir ao banco.",
    ],
    link: "preparar-a-casa",
    botao: "Ver o que arrumar antes",
    cta: "custos",
  },
  {
    id: "custos",
    gatilho: { tipo: "dia", dia: 10 },
    exceto: ["juntando", "vender"],
    assunto: "O dinheiro que não entra no financiamento",
    previa: "ITBI, cartório e avaliação: quanto separar à vista.",
    paragrafos: [
      "Tem um dinheiro que pega muita gente de surpresa: os custos da compra.",
      `ITBI, cartório e avaliação somam perto de ${custosTotal}% do preço, numa conta média. Eles saem do seu bolso, à vista, e o FGTS não paga.`,
      "A calculadora mostra quanto fica no seu caso.",
    ],
    link: "custos-compra",
    botao: "Calcular os custos da compra",
    cta: "simular",
  },
  {
    id: "trocar-fase",
    gatilho: { tipo: "dia", dia: 14 },
    especial: "fases",
    assunto: "Em que fase você está agora?",
    previa: "Um clique e eu ajusto os próximos recados.",
    paragrafos: [
      "Já faz duas semanas que a gente conversa. Muita coisa pode ter mudado.",
      "Me conta em que fase você está agora. Com um clique eu ajusto os próximos e-mails para o que faz sentido pra você.",
    ],
    link: "/recado/",
    botao: "Mudar a minha fase",
    cta: "simular",
  },
  {
    id: "sumiu",
    gatilho: { tipo: "sumiu", emails: 4 },
    especial: "continuar",
    assunto: "Ainda quer receber o recado?",
    previa: "Um clique para continuar. Sem resposta, eu paro de mandar.",
    paragrafos: [
      "Faz um tempo que você não abre um link dos recados. Tudo bem, a vida corre.",
      "Se ainda quer receber, é só clicar no botão. Se não, não precisa fazer nada: daqui a uma semana eu paro de mandar.",
    ],
    link: "/recado/",
    botao: "Quero continuar recebendo",
    cta: "canal",
  },
  {
    id: "um-mes",
    gatilho: { tipo: "dia", dia: 30 },
    assunto: "Um mês de recado",
    previa: "O caminho do zero à chave, numa página só.",
    paragrafos: [
      "Um mês de recado! Obrigado por ler até aqui.",
      "Se quiser ver o caminho inteiro da compra de uma vez, do primeiro número até a chave na mão, eu montei um mapa com todas as etapas.",
      "E se preferir o recado no WhatsApp, o João também está por lá.",
    ],
    link: "/mapa/",
    botao: "Ver o caminho completo",
    cta: "canal",
  },
];

/** O texto que a pessoa aceita ao se inscrever (fica gravado junto com a inscrição). */
export const CONSENTIMENTO =
  "Quero receber o Recado do João por e-mail: um recado por semana e os e-mails da minha fase da compra. Posso sair quando quiser, com um clique.";
