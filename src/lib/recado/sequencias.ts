import { PARAMS } from "@/lib/financiamento/params";
import { brl } from "@/lib/format";

/**
 * "Recado do João": a newsletter da Primeira Chave. Este arquivo é o TEXTO; quem envia é o
 * Hub da CustomerHub, que lê o feed (/recado/feed.json) e monta a fila de envios.
 *
 * Quem se inscreve escolhe a fase da compra e recebe a sequência daquela fase (dias 0, 3 e 7);
 * depois, o recado semanal. Os links apontam para ids da árvore e o teste garante que
 * todos estão publicados. Mudou um texto? O Hub pede de novo o ok antes de enviar.
 */

export type FaseId = "pesquisando" | "juntando" | "banco" | "imovel" | "vender";

export type Passo = {
  /** Dias depois da inscrição (0 = na hora). */
  dia: number;
  assunto: string;
  /** O texto cinza depois do assunto na caixa de entrada. */
  previa: string;
  paragrafos: string[];
  /** Id do nó da árvore para onde o botão leva. */
  link: string;
  botao: string;
};

export type Fase = {
  id: FaseId;
  /** Como aparece no formulário. */
  rotulo: string;
  pergunta: string;
  /** O "seu próximo passo" que vai no fim de todo recado semanal. */
  proximo: string;
  sequencia: Passo[];
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
      },
    ],
  },
];

/** O texto que a pessoa aceita ao se inscrever (fica gravado junto com a inscrição). */
export const CONSENTIMENTO =
  "Quero receber o Recado do João por e-mail: um recado por semana e os e-mails da minha fase da compra. Posso sair quando quiser, com um clique.";
