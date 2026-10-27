import type { Texto } from "../tipos";

export const TEXTOS_LEILAO: Record<string, Texto> = {
  "imoveis-caixa": {
    tituloSeo: "Imóveis da Caixa à venda: como funciona a compra",
    descricao: "Como funcionam os imóveis à venda pela Caixa: venda direta, licitação e leilão, quem pode comprar, FGTS, financiamento e cuidados.",
    resposta: "A Caixa vende imóveis retomados de três jeitos: **venda direta online**, **licitação** e **[leilão](g:leilao)**. O anúncio de cada imóvel diz se aceita **FGTS** e **financiamento**, se está **ocupado** e quem paga as dívidas.",
    secoes: [
      {
        titulo: "As três modalidades",
        blocos: [
          {
            tabela: {
              cabecalho: ["Modalidade", "Como funciona"],
              linhas: [
                ["Venda direta online", "Preço fixo; quem envia a proposta primeiro leva."],
                ["Licitação aberta", "Propostas em prazo definido; vence a maior."],
                ["Leilão", "Lances ao vivo ou online, com leiloeiro; pode ter comissão."],
              ],
            },
          },
        ],
      },
      {
        titulo: "O que conferir em cada anúncio",
        blocos: [
          {
            lista: [
              "Se aceita [FGTS](g:fgts) e financiamento.",
              "Se está **ocupado**: a desocupação pode ficar por sua conta.",
              "Quem paga IPTU e condomínio atrasados (o edital diz).",
              "A [matrícula](#certidao-matricula) e os [ônus](g:onus).",
            ],
          },
          { p: "Antes de dar lance, faça [a conta da reforma](#reforma-leilao) e veja [se dá para financiar](#financiar-leilao)." },
        ],
      },
      {
        titulo: "Venda direta, licitação ou leilão: qual escolher",
        blocos: [
          {
            figura: {
              id: "tres-modalidades",
              alt: "As três modalidades de venda dos imóveis da Caixa: venda direta online com preço fixo, licitação aberta com propostas e leilão com lances",
              etiqueta: "Imóveis da Caixa à venda",
              titulo: "Três jeitos",
              destaque: "de comprar da Caixa.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Venda direta", tom: "mark", itens: ["Preço fixo", "Quem propõe primeiro leva", "Sem disputa de lance"] },
                  { titulo: "Licitação", tom: "planta", itens: ["Propostas num prazo", "Vence a maior", "Data de abertura no edital"] },
                  { titulo: "Leilão", tom: "ink", itens: ["Lances com leiloeiro", "Pode ter comissão", "Data e hora marcadas"] },
                ],
              },
            },
          },
          { p: "Na **venda direta**, o preço já está posto: vale ser rápido, mas sem pular a leitura da [matrícula](#certidao-matricula). Na **licitação** e no **[leilão](#leilao-caixa)**, você disputa: defina o teto antes, com a [conta da reforma](#reforma-leilao)." },
        ],
      },
      {
        titulo: "O desconto é sobre o quê?",
        blocos: [
          { p: "O anúncio mostra o **desconto sobre o valor de avaliação da Caixa**. Essa avaliação pode estar desatualizada ou não refletir o estado real do imóvel, principalmente se ele estiver ocupado. Compare com o preço de imóveis parecidos na região e com o [preço do m²](#quanto-minha-renda-compra) antes de decidir." },
          { aviso: { titulo: "Financiamento sobre o menor valor", texto: "Quando o imóvel aceita financiamento, a Caixa empresta sobre o **menor** entre o preço e a avaliação. A regra da avaliação acima do preço não zera a entrada aqui. Veja [financiar imóvel de leilão](#financiar-leilao).", tom: "mark" } },
        ],
      },
    ],
    faq: [{ q: "Qualquer pessoa pode comprar?", a: "Sim, pessoa física ou jurídica, seguindo as regras do edital de cada imóvel." },
      { q: "Onde vejo os imóveis da Caixa à venda?", a: "No site oficial de venda de imóveis da Caixa, com filtro por estado, cidade e modalidade. Desconfie de sites e perfis que vendem 'imóveis da Caixa' por fora." },
      { q: "Dá para usar o FGTS?", a: "Em parte dos imóveis, sim: o anúncio diz se aceita FGTS e financiamento." },
      { q: "O imóvel pode estar ocupado?", a: "Pode, e o anúncio informa. A desocupação costuma ficar por conta de quem compra." },
    ],
  },

  "como-comprar-leilao": {
    tituloSeo: "Como comprar imóvel de leilão sem cair em armadilha",
    descricao: "O passo a passo para comprar imóvel de leilão: edital, matrícula, ocupação, dívidas, lance, pagamento e registro.",
    resposta: "Para comprar imóvel de leilão com segurança, leia o **edital** inteiro, confira a **[matrícula](g:matricula)**, descubra se o imóvel está **ocupado** e quanto há de **dívidas**, defina um **teto de lance** que já inclua reforma e custos — e só então dê o lance.",
    secoes: [
      {
        titulo: "O passo a passo",
        blocos: [
          {
            passos: [
              { titulo: "Edital", texto: "Forma de pagamento, comissão do leiloeiro, quem paga dívidas, prazos." },
              { titulo: "Matrícula", texto: "Peça a [certidão atualizada](#certidao-matricula) e veja [ônus](g:onus) e ações." },
              { titulo: "Ocupação", texto: "Imóvel ocupado pode exigir ação de desocupação, com tempo e custo." },
              { titulo: "Visita", texto: "Nem sempre dá para entrar. Veja a vizinhança e o estado externo." },
              { titulo: "Teto do lance", texto: "Preço + reforma + ITBI + cartório + comissão + dívidas. Veja [a conta](#reforma-leilao)." },
              { titulo: "Pagamento e registro", texto: "À vista, com FGTS ou [financiado](#financiar-leilao), conforme o edital. Depois, [registro](#registro-do-imovel)." },
            ],
          },
          { aviso: { titulo: "O maior risco", texto: "Comprar pelo preço sem somar ocupação, dívidas e reforma. O \"barato\" some rápido se a conta não estiver completa.", tom: "bad" } },
        ],
      },
    ],
    faq: [{ q: "Posso desistir depois do lance?", a: "Desistir costuma gerar multa e perda de valores, conforme o edital. Decida antes." }],
  },

  "financiar-leilao": {
    tituloSeo: "Dá pra financiar imóvel de leilão da Caixa?",
    descricao: "Quando dá para financiar imóvel de leilão ou venda direta da Caixa, como entra a avaliação e por que a regra é diferente da compra comum.",
    resposta: "**Dá, quando o anúncio diz que aceita financiamento.** Mas, para imóveis retomados, a regra usa o **menor valor entre o preço e a [avaliação](g:avaliacao)** — então, diferente da compra comum, avaliação acima do preço **não** reduz a entrada.",
    secoes: [
      {
        titulo: "A regra que muda",
        blocos: [
          { p: "Numa compra comum, o banco empresta até 80% da avaliação, limitado ao preço: avaliação alta pode zerar a entrada ([veja como](#sem-entrada-casa)). Nos imóveis retomados pela própria Caixa, a norma do programa usa o menor dos valores entre venda e avaliação." },
          {
            tabela: {
              cabecalho: ["Imóvel de leilão por R$ 150 mil, avaliado em R$ 220 mil", "Compra comum", "Retomado da Caixa"],
              linhas: [
                ["Base do empréstimo", "R$ 220.000 (avaliação)", "R$ 150.000 (o menor)"],
                ["O banco empresta (80%)", "até R$ 150.000 (limitado ao preço)", "R$ 120.000"],
                ["Sua entrada", "R$ 0", "R$ 30.000"],
              ],
            },
          },
          { p: "Mesmo assim, comprar abaixo do mercado é vantagem: você paga menos pelo mesmo imóvel." },
        ],
      },
      { titulo: "Antes do lance", blocos: [{ p: "Simule a parcela no [simulador](#simulador) com o preço do lance e confirme no anúncio se aceita FGTS e financiamento." }] },
    ],
    faq: [{ q: "E leilão de outros bancos?", a: "Cada banco e edital tem regras próprias. Confirme com o banco que vai financiar." }],
  },

  "reforma-leilao": {
    tituloSeo: "Imóvel de leilão vale a pena? A conta da reforma",
    descricao: "Quando comprar imóvel de leilão ou abaixo do mercado vale a pena: a conta com preço, reforma, custos, dívidas e o valor de mercado.",
    resposta: "Vale quando **preço + reforma + custos + dívidas** fica bem abaixo do **valor de mercado** do imóvel pronto. Uma folga de 20% ou mais costuma cobrir imprevistos.",
    secoes: [
      {
        titulo: "A conta",
        blocos: [
          {
            tabela: {
              cabecalho: ["Item", "Exemplo"],
              linhas: [
                ["Preço (lance)", "R$ 150.000"],
                ["Reforma", "R$ 35.000"],
                ["ITBI, cartório e comissão", "R$ 15.000"],
                ["Dívidas (IPTU, condomínio)", "R$ 5.000"],
                ["**Custo total**", "**R$ 205.000**"],
                ["Valor de mercado reformado", "R$ 260.000"],
                ["**Folga**", "**R$ 55.000 (21%)**"],
              ],
            },
          },
        ],
      },
      {
        titulo: "Os cuidados",
        blocos: [
          {
            lista: [
              "Orce a reforma com quem entende de obra, com margem para imprevistos.",
              "Some o tempo: meses de reforma são meses pagando sem morar.",
              "O financiamento não cobre reforma: separe esse dinheiro.",
              "Pesquise vendas reais na região, não só anúncios.",
            ],
          },
          { p: "Quem compra para morar ganha casa pronta abaixo do mercado; quem compra para revender vende para alguém que vai financiar — veja [vender para quem financia](#vender-para-quem-financia)." },
        ],
      },
    ],
    faq: [{ q: "Imóvel reformado é avaliado mais alto?", a: "Em geral sim: estado de conservação pesa na avaliação. Reformas com nota fiscal também reduzem o imposto na venda." }],
  },
};
