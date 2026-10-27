import type { Texto } from "../tipos";

export const TEXTOS_VENDER: Record<string, Texto> = {
  "vender-para-quem-financia": {
    tituloSeo: "Vender imóvel para quem vai financiar: como funciona",
    descricao: "Como a venda para um comprador que financia funciona: a avaliação do banco dele, os documentos que você entrega e quando você recebe.",
    resposta: "Quase todo comprador financia, e o banco dele vai **avaliar o seu imóvel**. Se a [avaliação](g:avaliacao) vier abaixo do preço, o comprador precisa cobrir a diferença — ou o negócio trava. Você recebe **depois do [registro](g:registro)**.",
    secoes: [
      {
        titulo: "Como a avaliação mexe no seu preço",
        blocos: [
          {
            tabela: {
              cabecalho: ["Seu preço: R$ 250 mil · avaliado em", "O banco empresta", "O comprador precisa ter"],
              linhas: [
                ["R$ 220.000", "R$ 176.000", "R$ 74.000 + custos"],
                ["R$ 250.000", "R$ 200.000", "R$ 50.000 + custos"],
                ["R$ 312.500", "R$ 250.000", "só os custos"],
              ],
            },
          },
          { p: "Preço acima do que o banco avalia afasta compradores. Preço abaixo da avaliação atrai quem tem pouca entrada — é a lógica do [financiamento sem entrada](#sem-entrada-casa)." },
        ],
      },
      {
        titulo: "Quando você recebe",
        blocos: [
          {
            passos: [
              { titulo: "Sinal", texto: "Combinado em contrato de compra e venda. Veja [o que não pode faltar](#contrato-compra-venda)." },
              { titulo: "Documentos", texto: "Você entrega os seus e os do imóvel: [lista completa](#documentos-vender)." },
              { titulo: "Assinatura no banco", texto: "Você assina junto com o comprador." },
              { titulo: "Registro e pagamento", texto: "Registrado o contrato (até 30 dias), o banco deposita o valor financiado." },
            ],
          },
        ],
      },
    ],
    faq: [{ q: "Posso entregar as chaves antes de receber?", a: "Não é recomendado. Combine a entrega das chaves para depois do pagamento." }],
  },

  "vender-financiado": {
    tituloSeo: "Como vender um imóvel financiado",
    descricao: "Três caminhos para vender imóvel ainda financiado: quitar com o dinheiro do comprador, transferir a dívida ou vender e quitar antes — e o que evitar.",
    resposta: "Dá para vender. O caminho mais comum é o **comprador financiar e o dinheiro quitar o seu saldo** no próprio processo. O imóvel está em [alienação fiduciária](g:alienacao-fiduciaria): o banco precisa participar.",
    secoes: [
      {
        titulo: "Os caminhos",
        blocos: [
          {
            tabela: {
              cabecalho: ["Caminho", "Como funciona"],
              linhas: [
                ["Quitar com a venda", "O banco do comprador paga; parte quita sua dívida e o resto vai para você."],
                ["Transferir a dívida", "O comprador assume seu contrato, se o banco aprovar o crédito dele."],
                ["Quitar antes", "Você quita (com reserva ou FGTS) e vende livre."],
              ],
            },
          },
          { aviso: { titulo: "Evite o \"contrato de gaveta\"", texto: "Vender sem o banco saber deixa a dívida e o imóvel no seu nome. Se o comprador parar de pagar, o problema é seu.", tom: "bad" } },
        ],
      },
      {
        titulo: "O primeiro passo",
        blocos: [{ p: "Peça o **saldo devedor atualizado** ao seu banco (no app ou na agência; na Caixa, veja o [atalho do Habitação](#boleto-habitacao)). É ele que define quanto sobra para você." }],
      },
    ],
    faq: [{ q: "Pago imposto na venda?", a: "Pode haver imposto sobre o lucro. Veja [imposto na venda](#imposto-venda)." }],
  },

  "documentos-vender": {
    tituloSeo: "Documentos para vender um imóvel: checklist",
    descricao: "Os documentos que o vendedor precisa entregar ao comprador e ao banco dele: pessoais, do imóvel e certidões.",
    resposta: "Três grupos: **seus documentos** (identidade e estado civil), **os do imóvel** ([matrícula](g:matricula) atualizada, IPTU, condomínio) e **certidões** que mostram que não há dívidas ou ações que travem a venda.",
    secoes: [
      {
        titulo: "O checklist",
        blocos: [
          {
            lista: [
              "Identidade, CPF e certidão de estado civil (de todos os donos e cônjuges).",
              "Certidão de inteiro teor da matrícula com ônus — tire em [certidão de matrícula](#certidao-matricula).",
              "Certidão negativa de IPTU e, em apartamento, declaração de quitação do condomínio.",
              "Certidões de ações e débitos, se o banco do comprador pedir.",
              "Se o imóvel for financiado: o saldo devedor ([veja como vender](#vender-financiado)).",
            ],
          },
          { p: "Do outro lado, o comprador junta os dele: [documentos para financiar](#documentos-financiamento)." },
        ],
      },
    ],
    faq: [{ q: "Imóvel de herança pode ser vendido?", a: "Depois do inventário e da partilha registrados na matrícula, sim." }],
  },

  "imposto-venda": {
    tituloSeo: "Imposto na venda de imóvel: ganho de capital e isenções",
    descricao: "Quando você paga imposto ao vender um imóvel, quanto (15% sobre o lucro), as isenções e como calcular.",
    resposta: "Se você vende **por mais do que pagou**, o lucro é [ganho de capital](g:ganho-de-capital) e paga **15% de imposto** — salvo isenções, como **único imóvel vendido por até R$ 440 mil** ou **comprar outro residencial em até 180 dias** com o dinheiro.",
    secoes: [
      { titulo: "Calcule", blocos: [{ calculo: "calculadora-ganho-capital" }] },
      {
        titulo: "As isenções mais usadas",
        blocos: [
          {
            lista: [
              "Único imóvel, vendido por até R$ 440 mil, sem outra venda nos últimos 5 anos.",
              "Usar o dinheiro para comprar outro imóvel residencial em até 180 dias (pode ser financiado).",
              "Imóvel comprado antes de 1969.",
            ],
          },
          { p: "Reformas com nota fiscal somam ao custo e reduzem o lucro. O imposto é pago por DARF até o último dia útil do mês seguinte à venda, com o programa de ganho de capital da Receita." },
          { aviso: { titulo: "Confirme com um contador", texto: "Há fatores de redução por tempo de posse e regras específicas. A calculadora é uma estimativa." } },
        ],
      },
    ],
    faq: [{ q: "Quem paga o imposto, comprador ou vendedor?", a: "O vendedor, sobre o próprio lucro. O comprador paga o ITBI." }],
  },

  "quanto-vale": {
    tituloSeo: "Quanto vale meu imóvel? Preço, venda e avaliação do banco",
    descricao: "A diferença entre preço de anúncio, preço de venda e avaliação do banco, e como chegar a um preço que vende.",
    resposta: "Seu imóvel tem três valores: o **de anúncio** (o que você pede), o **de venda** (o que alguém paga) e a **[avaliação](g:avaliacao) do banco** (o que o banco do comprador acha que vale). O que vende rápido é o preço que **cabe na avaliação**.",
    secoes: [
      {
        titulo: "Como chegar ao preço",
        blocos: [
          {
            passos: [
              { titulo: "Vendas reais, não anúncios", texto: "Pergunte a corretores e cartórios o preço de vendas parecidas na região." },
              { titulo: "Ajuste por estado e documentação", texto: "Reforma recente sobe; pendência na matrícula derruba." },
              { titulo: "Pense na avaliação do comprador", texto: "Se o banco avaliar abaixo do seu preço, o comprador precisa de mais entrada. Veja [vender para quem financia](#vender-para-quem-financia)." },
            ],
          },
        ],
      },
    ],
    faq: [{ q: "Vale pagar uma avaliação particular?", a: "Para imóveis de valor alto ou muito diferentes da vizinhança, um laudo de corretor ou engenheiro ajuda a defender o preço." }],
  },

  "contrato-compra-venda": {
    tituloSeo: "Contrato de compra e venda de imóvel: o que não pode faltar",
    descricao: "O que um contrato de compra e venda de imóvel precisa ter: partes, imóvel, preço, forma de pagamento, prazos, multa e condição do financiamento.",
    resposta: "O contrato precisa amarrar **quem**, **qual imóvel** (com a [matrícula](g:matricula)), **quanto e como paga**, **prazos**, **multa** e — se houver financiamento — o que acontece **se o banco não aprovar**.",
    secoes: [
      {
        titulo: "O que não pode faltar",
        blocos: [
          {
            lista: [
              "Qualificação completa de compradores e vendedores (e cônjuges).",
              "Descrição do imóvel com o número da matrícula e o cartório.",
              "Preço, sinal e como o restante será pago (recursos próprios, FGTS, financiamento).",
              "**Condição suspensiva:** se o financiamento for negado, o sinal volta (ou não) — escreva.",
              "Prazo para entrega de documentos, assinatura no banco e entrega das chaves.",
              "Quem paga o quê: ITBI, cartório, dívidas anteriores de IPTU e condomínio.",
              "Multa por desistência e por atraso.",
            ],
          },
          { aviso: { titulo: "Sinal só depois da avaliação", texto: "Se depende de financiamento, combine o sinal para depois da [avaliação do banco](#avaliacao-do-imovel), ou deixe claro no contrato o que acontece se ela vier abaixo." } },
          { aviso: { titulo: "Preço real no contrato", texto: "O valor no contrato tem que ser o valor pago. Declarar preço diferente ao banco é fraude.", tom: "bad" } },
        ],
      },
      { titulo: "E a escritura?", blocos: [{ p: "No financiamento, o contrato do banco faz o papel da [escritura](g:escritura). O contrato particular vem antes, para amarrar o negócio até lá." }] },
    ],
    faq: [{ q: "Preciso de advogado?", a: "Para negócios de valor alto ou com pendências, sim. Um contrato bem feito custa menos que um problema." }],
  },
};
