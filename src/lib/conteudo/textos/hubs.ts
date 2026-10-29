import { PARAMS } from "../../financiamento/params";
import { pct } from "../../format";
import type { Bloco, NomeCalculo } from "../tipos";

/** Juros nominais dos parâmetros → efetivos ao ano, como a Caixa mostra. */
const efetivo = (nominal: number) => ((1 + nominal / 1200) ** 12 - 1) * 100;
const faixas = PARAMS.faixas;
const rendaMax = faixas[faixas.length - 1].rendaAte;

/**
 * Abertura de cada hub e, se houver, o cálculo que aparece antes da lista de páginas.
 * Hubs que disputam busca grande (leilão, MCMV, financiamento) têm também seções e FAQ
 * próprias: viram páginas completas, não só índices.
 */
export type TextoHub = {
  intro: string;
  descricao: string;
  tituloSeo?: string;
  calculo?: NomeCalculo;
  secoes?: { titulo: string; blocos: Bloco[] }[];
  faq?: { q: string; a: string }[];
};

export const HUBS_TEXTOS: Record<string, TextoHub> = {
  comprar: {
    intro:
      "A compra do primeiro imóvel tem uma ordem: saber quanto pode, arrumar a casa, aprovar o crédito, escolher, avaliar, assinar e registrar. Cada guia abaixo responde uma etapa e te leva à próxima.",
    descricao: "Como comprar o primeiro imóvel, etapa por etapa: quanto posso, documentos, aprovação, avaliação, contrato e registro, em português claro.",
    calculo: "prazos",
    secoes: [
      {
        titulo: "As cinco fases da compra",
        blocos: [
          {
            figura: {
              id: "cinco-fases",
              alt: "Como comprar o primeiro imóvel em cinco fases: antes de começar, aprovar o crédito, escolher o imóvel, contrato e chaves, e depois da chave",
              etiqueta: "Do zero à chave",
              titulo: "O primeiro imóvel",
              destaque: "em cinco fases.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Antes de começar", texto: "Quanto posso comprar e o que arrumar." },
                  { titulo: "Aprovar o crédito", texto: "Documentos e análise do banco." },
                  { titulo: "Escolher o imóvel", texto: "Dentro do teto, com a avaliação." },
                  { titulo: "Contrato e chaves", texto: "Assinatura, ITBI e registro." },
                  { titulo: "Depois da chave", texto: "FGTS e parcelas a menos." },
                ],
              },
            },
          },
          { p: "Cada fase tem os seus guias abaixo, na ordem. Comece pelo seu número no [simulador](#simulador)." },
        ],
      },
    ],
    faq: [
      { q: "Quanto tempo leva para comprar o primeiro imóvel financiado?", a: "Do pedido de crédito à chave, de 30 a 90 dias em média, se os documentos estiverem prontos." },
      { q: "Por onde começo?", a: "Pelo seu número: simule quanto pode comprar, confira o CPF e veja se o FGTS entra. Depois peça a aprovação de crédito." },
    ],
  },
  "financiamento-imobiliario": {
    intro:
      "No financiamento imobiliário, o banco empresta até 80% do valor do imóvel, a parcela pode ocupar até 30% da sua renda e o prazo vai até 35 anos. Aqui está o resto: juros, [SAC](g:sac) ou [PRICE](g:price), seguros, [TR](g:tr) e quanto custa no total.",
    descricao: "Como funciona o financiamento imobiliário: quanto o banco empresta, juros, SAC ou PRICE, seguros e custos, com números da Caixa.",
    calculo: "renda-por-valor",
    secoes: [
      {
        titulo: "Como funciona o financiamento imobiliário",
        blocos: [
          {
            figura: {
              id: "regras-de-ouro",
              alt: "As regras do financiamento imobiliário em números: até 80% do valor avaliado, parcela de até 30% da renda, prazo de até 35 anos e cerca de 5% de ITBI e cartório",
              etiqueta: "Financiamento imobiliário",
              titulo: "Quatro números",
              destaque: "que explicam tudo.",
              esquema: {
                tipo: "numeros",
                itens: [
                  { valor: "80%", rotulo: "do valor avaliado é o máximo que o banco empresta", tom: "mark" },
                  { valor: "30%", rotulo: "da renda bruta é o teto da parcela" },
                  { valor: "35 anos", rotulo: "de prazo, se a idade permitir" },
                  { valor: "~5%", rotulo: "do valor vão para ITBI e cartório, fora do financiamento" },
                ],
              },
            },
          },
          { p: "O banco paga o vendedor e você paga o banco, em parcelas com juros. O imóvel fica em [alienação fiduciária](g:alienacao-fiduciaria) até a última parcela: é seu para morar, mas é a garantia do banco." },
        ],
      },
      {
        titulo: "Do pedido à chave",
        blocos: [
          {
            figura: {
              id: "do-pedido-a-chave",
              alt: "Etapas do financiamento imobiliário com prazos médios: aprovação de crédito, avaliação do imóvel, contrato e registro no cartório",
              etiqueta: "As etapas",
              titulo: "Do pedido à chave,",
              destaque: "de 30 a 90 dias.",
              esquema: {
                tipo: "linha",
                marcos: [
                  { rotulo: "Pedido", detalhe: "simulação e documentos" },
                  { rotulo: "Crédito", detalhe: "o banco aprova o seu teto" },
                  { rotulo: "Avaliação", detalhe: "o engenheiro dá o valor" },
                  { rotulo: "Chave", detalhe: "contrato registrado" },
                ],
                trechos: [
                  { rotulo: "5 a 15 dias", tom: "planta" },
                  { rotulo: "7 a 15 dias", tom: "planta" },
                  { rotulo: "contrato + até 30 dias", tom: "mark" },
                ],
              },
            },
          },
          { p: "O passo a passo completo, com os documentos de cada etapa, está em [como financiar uma casa pela Caixa](#como-financiar-casa-caixa)." },
        ],
      },
      {
        titulo: "Quanto custa, além do preço",
        blocos: [
          {
            lista: [
              "**Juros**: dependem da faixa de renda e do banco. No [SAC](g:sac), a parcela começa maior e cai; na [PRICE](g:price), é fixa. Veja [SAC ou PRICE](#sac-ou-price).",
              "**Seguros obrigatórios** ([MIP e DFI](g:mip-dfi)) e **taxa de administração**, dentro da parcela.",
              "**Correção pela [TR](g:tr)** do saldo devedor.",
              "**Na compra**: [ITBI](g:itbi), registro e a tarifa de avaliação. Some tudo em [quanto custa financiar](#quanto-custa-financiar).",
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "Quanto o banco financia do imóvel?", a: "Até 80% do valor de avaliação, sem passar do preço de venda. O resto é a entrada, que pode vir do FGTS." },
      { q: "Dá para financiar 100% do imóvel?", a: "Só num caso: se a avaliação vier 25% ou mais acima do preço. Mesmo assim, ITBI e cartório ficam por sua conta." },
      { q: "Posso financiar com outra pessoa?", a: "Pode. Quem compra junto soma as rendas, e a parcela tem de caber em 30% da soma." },
    ],
  },
  "minha-casa-minha-vida": {
    intro:
      "O Minha Casa Minha Vida é o programa do governo com juros menores para quem ganha menos e não tem imóvel no nome. A faixa depende da renda bruta da família, e cada faixa tem um teto de valor do imóvel.",
    descricao: "Minha Casa Minha Vida 2026: faixas de renda, teto do imóvel, juros e como entrar, conferidos no simulador da Caixa.",
    calculo: "faixas-mcmv",
    secoes: [
      {
        titulo: "Quem pode entrar no Minha Casa Minha Vida",
        blocos: [
          {
            lista: [
              `Renda bruta da família de até **R$ ${rendaMax.toLocaleString("pt-BR")} por mês**, somando quem compra junto.`,
              "**Não ter imóvel residencial** no nome.",
              "**Não ter recebido** subsídio de outro programa habitacional do governo.",
              "Ter a **parcela dentro de 30% da renda** e o nome sem restrição, como em qualquer financiamento.",
            ],
          },
        ],
      },
      {
        titulo: "Os juros de cada faixa",
        blocos: [
          {
            figura: {
              id: "juros-por-faixa",
              alt: "Juros do Minha Casa Minha Vida por faixa de renda em 2026, comparados aos juros da linha de mercado (SBPE) da Caixa",
              etiqueta: "Minha Casa Minha Vida 2026",
              titulo: "Quanto menor a renda,",
              destaque: "menor o juro.",
              esquema: {
                tipo: "barras",
                itens: [
                  ...faixas.map((f) => ({ rotulo: `Faixa ${f.faixa}`, valor: efetivo(f.juros), texto: `${pct(efetivo(f.juros), 2)} a.a.`, tom: "mark" as const })),
                  { rotulo: "Fora do programa", valor: efetivo(PARAMS.sbpeJuros), texto: `${pct(efetivo(PARAMS.sbpeJuros), 2)} a.a.`, tom: "planta" as const },
                ],
              },
              legenda: "Juros efetivos ao ano para quem não tem 3 anos de FGTS, conferidos no simulador da Caixa. Com 3 anos de FGTS, as faixas 1 a 3 ganham desconto.",
            },
          },
          { p: "A faixa também define o **teto do imóvel**. Veja a tabela completa em [faixas do Minha Casa Minha Vida](#mcmv-faixas) e descubra a sua no [simulador](#simulador)." },
        ],
      },
      {
        titulo: "Como entrar no programa",
        blocos: [
          {
            passos: [
              { titulo: "Simule", texto: "Descubra a faixa, o teto do imóvel e a parcela no [simulador](#simulador)." },
              { titulo: "Junte os documentos", texto: "Identidade, comprovantes de renda e estado civil: veja a [lista](#documentos-financiamento)." },
              { titulo: "Peça o crédito", texto: "Numa agência ou correspondente. A aprovação diz o seu teto." },
              { titulo: "Escolha o imóvel", texto: "Novo ou usado, dentro do teto da faixa. O banco avalia antes de assinar." },
            ],
          },
          { p: "O FGTS pode entrar na entrada: veja [como usar o FGTS na compra](#usar-fgts-comprar)." },
        ],
      },
    ],
    faq: [
      { q: "Qual a renda máxima para o Minha Casa Minha Vida?", a: "Em 2026, renda bruta familiar de até R$ 13 mil por mês, na faixa 4. Acima disso, o financiamento é pela linha de mercado." },
      { q: "Posso comprar imóvel usado pelo programa?", a: "Pode, desde que dentro do teto da sua faixa e aprovado na avaliação do banco." },
      { q: "Quem já tem imóvel pode entrar?", a: "Em regra, não: o programa é para quem não tem imóvel residencial no nome." },
      { q: "Casa Verde e Amarela ainda existe?", a: "Não. O programa voltou a se chamar Minha Casa Minha Vida em 2023, com novas faixas e juros." },
    ],
  },
  "leilao-caixa": {
    intro:
      "A Caixa vende imóveis retomados por venda direta, licitação e leilão, muitas vezes abaixo do mercado. Dá para usar FGTS e financiamento em parte deles, mas o cuidado com edital, ocupação e dívidas é maior.",
    descricao: "Leilão e imóveis da Caixa: como funciona, como comprar, se dá para financiar e quando a conta da reforma fecha.",
    secoes: [
      {
        titulo: "Como funciona o leilão da Caixa",
        blocos: [
          { p: "A Caixa vende os imóveis que retomou de financiamentos não pagos. Todos ficam no site oficial de venda de imóveis da Caixa, com **preço**, **valor de avaliação**, **desconto** e se o imóvel **aceita financiamento e FGTS**. Há três modalidades: venda direta online, licitação aberta e [leilão](g:leilao) com data marcada. Veja a diferença em [imóveis da Caixa](#imoveis-caixa)." },
          {
            figura: {
              id: "do-anuncio-a-chave",
              alt: "Como comprar no leilão da Caixa em quatro passos: achar o imóvel, ler o edital e a matrícula, fazer a conta do lance e pagar e registrar",
              etiqueta: "Leilão da Caixa",
              titulo: "Do anúncio à chave",
              destaque: "em 4 passos.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Ache o imóvel", texto: "Filtre por cidade e modalidade no site oficial da Caixa." },
                  { titulo: "Leia edital e matrícula", texto: "Ocupação, dívidas e quem paga o quê." },
                  { titulo: "Calcule o lance", texto: "Lance + custos + reforma + desocupação." },
                  { titulo: "Lance e registro", texto: "Pague no prazo do edital e registre no cartório." },
                ],
              },
            },
          },
        ],
      },
      {
        titulo: "Dá para financiar e usar o FGTS?",
        blocos: [
          { p: "Depende de cada imóvel: o anúncio diz se aceita **financiamento** e **FGTS**. Quando aceita, a Caixa financia sobre o **menor valor entre o preço e a avaliação**. Por isso, no imóvel da própria Caixa, a regra da avaliação acima do preço não zera a entrada. Detalhes em [financiar imóvel de leilão](#financiar-leilao)." },
        ],
      },
      {
        titulo: "Quanto custa além do lance",
        blocos: [
          {
            figura: {
              id: "alem-do-lance",
              alt: "Exemplo de custos do leilão da Caixa além do lance: ITBI e registro, comissão do leiloeiro e reserva para reforma, desocupação e dívidas",
              etiqueta: "Exemplo: lance de R$ 200 mil",
              titulo: "O lance",
              destaque: "não é o preço final.",
              esquema: {
                tipo: "divisao",
                total: "exemplo: perto de R$ 245 mil no total",
                partes: [
                  { rotulo: "lance", valor: 200000, texto: "R$ 200 mil", tom: "mark" },
                  { rotulo: "ITBI e registro", valor: 10000, texto: "R$ 10 mil", tom: "ink" },
                  { rotulo: "comissão do leiloeiro (leilão)", valor: 10000, texto: "R$ 10 mil", tom: "ink" },
                  { rotulo: "reforma, desocupação e dívidas", valor: 25000, texto: "R$ 25 mil", tom: "bad" },
                ],
              },
              legenda: "Valores ilustrativos. A comissão do leiloeiro existe na modalidade leilão; reforma e dívidas variam de imóvel para imóvel.",
            },
          },
          { p: "Faça essa conta **antes** de dar o lance e defina um teto. O passo a passo da reforma está em [imóvel de leilão vale a pena?](#reforma-leilao)." },
        ],
      },
      {
        titulo: "Os riscos que mais pegam",
        blocos: [
          {
            lista: [
              "**Imóvel ocupado**: a desocupação pode levar meses e exigir ação judicial, por sua conta.",
              "**Dívidas de condomínio e IPTU**: quem paga depende do edital. Leia a cláusula de despesas.",
              "**No estado em que se encontra**: muitas vezes não dá para visitar por dentro. Reserve para reforma.",
              "**Prazo de pagamento curto**: à vista ou financiado, o edital dá poucos dias. Tenha o dinheiro e os documentos prontos.",
            ],
          },
          { aviso: { titulo: "Só pelo site oficial", texto: "Golpes com falsos leilões da Caixa são comuns. Confira o imóvel no site oficial da Caixa e nunca pague boleto ou Pix de sites desconhecidos.", tom: "bad" } },
        ],
      },
    ],
    faq: [
      { q: "O leilão da Caixa é seguro?", a: "É uma venda oficial, mas o risco está no imóvel: ocupação, dívidas e estado. Leia o edital e a matrícula antes do lance." },
      { q: "Imóvel do leilão da Caixa pode ser financiado?", a: "Só os que o anúncio marca como aceitando financiamento. A Caixa financia sobre o menor valor entre o preço e a avaliação." },
      { q: "Quem paga o condomínio e o IPTU atrasados?", a: "Depende do edital de cada imóvel. A cláusula de despesas diz o que fica com o comprador." },
      { q: "Dá para visitar o imóvel antes?", a: "Quando está desocupado, às vezes. Ocupado, quase nunca. Por isso a reserva para reforma é obrigatória na conta." },
    ],
  },
  vender: {
    intro:
      "Vender um usado é entender o comprador: quase todo mundo financia, e o banco dele vai avaliar o seu imóvel. Aqui estão documentos, preço, imóvel financiado, contrato e imposto.",
    descricao: "Como vender um imóvel usado: documentos, preço e avaliação do banco do comprador, imóvel financiado, contrato e imposto.",
    secoes: [
      {
        titulo: "Vender um usado em quatro passos",
        blocos: [
          {
            figura: {
              id: "quatro-passos",
              alt: "Como vender um imóvel usado em quatro passos: documentos, preço que cabe na avaliação, contrato com o comprador financiado e imposto",
              etiqueta: "Vender imóvel usado",
              titulo: "Quem compra financia;",
              destaque: "venda pensando nele.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Documentos", texto: "Matrícula atualizada e certidões antes do anúncio." },
                  { titulo: "Preço", texto: "Que caiba na avaliação do banco do comprador." },
                  { titulo: "Contrato", texto: "Sinal, prazos e o que acontece se o crédito não sair." },
                  { titulo: "Imposto", texto: "Ganho de capital e as isenções." },
                ],
              },
            },
          },
        ],
      },
    ],
    faq: [
      { q: "Quando o vendedor recebe o dinheiro?", a: "No financiamento, depois do registro do contrato no cartório: em geral até 30 dias depois da assinatura." },
      { q: "Dá para vender imóvel ainda financiado?", a: "Dá. O mais comum é quitar o seu saldo com o dinheiro da venda, no mesmo processo." },
    ],
  },
  atalhos: {
    intro: "Os links que todo mundo procura e ninguém acha de primeira — com o passo a passo e o que fazer com cada resultado.",
    descricao: "Atalhos para os sites difíceis: Registrato, saldo do FGTS, boleto da Caixa, certidão de matrícula e tempo de carteira.",
    secoes: [
      {
        titulo: "Por que estes atalhos",
        blocos: [
          { p: "São os serviços que mais travam quem vai financiar: o relatório de dívidas no Banco Central ([Registrato](#registrato)), o [saldo do FGTS](#consultar-fgts), o [tempo de carteira](#carteira-trabalho), a [certidão de matrícula](#certidao-matricula) e a [2ª via do boleto](#boleto-habitacao). Todos com o link oficial e o que fazer com o resultado." },
          { aviso: { titulo: "Só links oficiais", texto: "Nenhum destes serviços exige pagamento a intermediários. Desconfie de quem cobra para tirar relatório ou liberar FGTS.", tom: "bad" } },
        ],
      },
    ],
    faq: [
      { q: "Esses serviços são pagos?", a: "O Registrato, o app FGTS, a Carteira de Trabalho Digital e a 2ª via do boleto são gratuitos. A certidão de matrícula tem a taxa do cartório." },
    ],
  },
  ferramentas: {
    intro: "Calculadoras que respondem com o seu número, usando as mesmas regras do simulador da Caixa.",
    descricao: "Ferramentas gratuitas: simulador de financiamento, simulador do Minha Casa Minha Vida, calculadora de ITBI e de imposto na venda.",
    secoes: [
      {
        titulo: "Qual ferramenta usar",
        blocos: [
          {
            lista: [
              "**Quer saber quanto pode comprar?** Use o [simulador](#simulador).",
              "**Quer comparar cidades?** Veja [quanto a sua renda compra em cada capital](#quanto-minha-renda-compra).",
              "**Já tem um valor em mente?** Veja [quanto precisa ganhar](#quanto-preciso-ganhar).",
              "**Vai pagar o ITBI?** Use a [calculadora de ITBI](#calculadora-itbi).",
              "**Vai vender?** Estime o imposto na [calculadora de ganho de capital](#calculadora-ganho-capital).",
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "As ferramentas são gratuitas?", a: "Sim, sem cadastro. Os números usam as regras da Caixa conferidas no simulador oficial e dados públicos de mercado." },
    ],
  },
};
