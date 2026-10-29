import type { Texto } from "../tipos";

export const TEXTOS_VENDER: Record<string, Texto> = {
  "vender-para-quem-financia": {
    tituloSeo: "Vender imóvel para quem vai financiar: como funciona",
    descricao: "Como a venda para um comprador que financia funciona: a avaliação do banco dele, os documentos que você entrega e quando você recebe.",
    resposta: "Quase todo comprador financia, e o banco dele vai **avaliar o seu imóvel**. Se a [avaliação](g:avaliacao) vier abaixo do preço, o comprador precisa cobrir a diferença — ou o negócio trava. Você recebe **depois do [registro](g:registro)**.",
    secoes: [
      {
        titulo: "A conta do comprador",
        blocos: [
          {
            figura: {
              id: "avaliacao-abaixo",
              alt: "Vender para quem vai financiar: com a avaliação abaixo do preço, o banco empresta menos e o comprador precisa de mais entrada",
              etiqueta: "Vender para quem financia",
              titulo: "Avaliação abaixo,",
              destaque: "entrada maior para o comprador.",
              esquema: {
                tipo: "divisao",
                total: "preço R$ 300 mil · avaliação R$ 280 mil",
                partes: [
                  { rotulo: "o banco empresta (80% de R$ 280 mil)", valor: 224000, texto: "R$ 224 mil", tom: "planta" },
                  { rotulo: "entrada do comprador", valor: 76000, texto: "R$ 76 mil", tom: "mark" },
                ],
              },
              legenda: "Se a avaliação viesse em R$ 300 mil, a entrada seria de R$ 60 mil: R$ 16 mil a menos. Preço que cabe na avaliação vende mais rápido.",
            },
          },
        ],
      },
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
    faq: [{ q: "Posso entregar as chaves antes de receber?", a: "Não é recomendado. Combine a entrega das chaves para depois do pagamento." },
      { q: "Quem pede a avaliação, eu ou o comprador?", a: "O comprador, no banco dele, e é ele quem paga a tarifa. Você só precisa liberar a visita do engenheiro e os documentos do imóvel." },
      { q: "O comprador pode usar FGTS?", a: "Pode, se cumprir as regras do FGTS. O dinheiro entra na compra junto com o financiamento." },
    ],
  },

  "vender-financiado": {
    tituloSeo: "Como vender um imóvel financiado",
    descricao: "Três caminhos para vender imóvel ainda financiado: quitar com o dinheiro do comprador, transferir a dívida ou vender e quitar antes — e o que evitar.",
    resposta: "Dá para vender. O caminho mais comum é o **comprador financiar e o dinheiro quitar o seu saldo** no próprio processo. O imóvel está em [alienação fiduciária](g:alienacao-fiduciaria): o banco precisa participar.",
    secoes: [
      {
        titulo: "Para onde vai o dinheiro da venda",
        blocos: [
          {
            figura: {
              id: "dinheiro-da-venda",
              alt: "Como vender imóvel financiado: o banco do comprador paga, parte quita o saldo devedor do vendedor e o restante vai para quem vende",
              etiqueta: "Vender imóvel financiado",
              titulo: "A venda quita a dívida;",
              destaque: "o resto é seu.",
              esquema: {
                tipo: "divisao",
                total: "exemplo: venda por R$ 400 mil",
                partes: [
                  { rotulo: "quita o seu saldo devedor", valor: 180000, texto: "R$ 180 mil", tom: "planta" },
                  { rotulo: "vai para você", valor: 220000, texto: "R$ 220 mil", tom: "mark" },
                ],
              },
              legenda: "Valores ilustrativos. O saldo devedor atualizado vem do seu banco.",
            },
          },
        ],
      },
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
    faq: [{ q: "Pago imposto na venda?", a: "Pode haver imposto sobre o lucro; o guia de imposto na venda explica as isenções." },
      { q: "Preciso quitar antes de vender?", a: "Não. O caminho mais comum é quitar com o dinheiro da própria venda, no mesmo processo." },
      { q: "O comprador pode usar FGTS?", a: "Pode, se ele cumprir as regras do FGTS: o dinheiro entra na compra como em qualquer outra." },
    ],
  },

  "documentos-vender": {
    tituloSeo: "Documentos para vender um imóvel: checklist",
    descricao: "Os documentos para vender um imóvel: os pessoais, os do imóvel e as certidões que o comprador e o banco dele vão pedir, com checklist.",
    resposta: "Os documentos para vender um imóvel formam três grupos: **seus documentos** (identidade e estado civil), **os do imóvel** ([matrícula](g:matricula) atualizada, IPTU, condomínio) e **certidões** que mostram que não há dívidas ou ações que travem a venda.",
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
      {
        titulo: "Os três grupos de documentos",
        blocos: [
          {
            figura: {
              id: "tres-grupos",
              alt: "Documentos para vender um imóvel em três grupos: os do vendedor, os do imóvel e as certidões de débitos e ações",
              etiqueta: "Documentos para vender um imóvel",
              titulo: "Três pastas",
              destaque: "para não travar a venda.",
              esquema: {
                tipo: "comparar",
                sinal: "+",
                colunas: [
                  { titulo: "Seus", tom: "mark", itens: ["Identidade e CPF", "Estado civil (e cônjuge)", "Comprovante de endereço"] },
                  { titulo: "Do imóvel", tom: "planta", itens: ["Matrícula atualizada", "IPTU em dia", "Declaração do condomínio"] },
                  { titulo: "Certidões", tom: "ink", itens: ["Débitos e protestos", "Ações na Justiça", "Emitidas há pouco tempo"] },
                ],
              },
            },
          },
        ],
      },
    ],
    faq: [{ q: "Imóvel de herança pode ser vendido?", a: "Depois do inventário e da partilha registrados na matrícula, sim." },
      { q: "Quanto tempo valem as certidões?", a: "O banco do comprador costuma pedir certidões recentes, em geral de até 30 dias. Tire perto da data do contrato." },
      { q: "O cônjuge precisa assinar a venda?", a: "Em regra, sim, conforme o regime de bens. Confira na certidão de casamento antes de fechar." },
    ],
  },

  "imposto-venda": {
    tituloSeo: "Imposto na venda de imóvel: ganho de capital e isenções",
    h1: "Imposto na venda de imóvel: ganho de capital e isenções",
    descricao: "Imposto na venda de imóvel: quando o ganho de capital paga 15% sobre o lucro, as isenções mais comuns e como calcular antes de vender.",
    resposta: "Se você vende **por mais do que pagou**, o lucro é [ganho de capital](g:ganho-de-capital) e paga **15% de imposto** — salvo isenções, como **único imóvel vendido por até R$ 440 mil** ou **comprar outro residencial em até 180 dias** com o dinheiro.",
    secoes: [
      {
        titulo: "As isenções em uma imagem",
        blocos: [
          {
            figura: {
              id: "isencoes",
              alt: "Isenções do imposto de ganho de capital na venda de imóvel: único imóvel até R$ 440 mil, compra de outro residencial em 180 dias e imóvel adquirido antes de 1969",
              etiqueta: "Imposto na venda de imóvel",
              titulo: "Quando o ganho de capital",
              destaque: "não paga imposto.",
              esquema: {
                tipo: "numeros",
                itens: [
                  { valor: "R$ 440 mil", rotulo: "único imóvel, sem outra venda em 5 anos", tom: "mark" },
                  { valor: "180 dias", rotulo: "para comprar outro residencial com o dinheiro" },
                  { valor: "1969", rotulo: "imóvel comprado antes disso é isento" },
                  { valor: "15%", rotulo: "sobre o lucro, fora das isenções" },
                ],
              },
              legenda: "Cada isenção tem condições. Confirme a sua com um contador antes de vender.",
            },
          },
        ],
      },
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
    faq: [{ q: "Quem paga o imposto, comprador ou vendedor?", a: "O vendedor, sobre o próprio lucro. O comprador paga o ITBI." },
      { q: "A isenção dos 180 dias vale se eu financiar o novo imóvel?", a: "Vale: o dinheiro da venda precisa ir para a compra do novo imóvel residencial, mesmo que o resto seja financiado." },
      { q: "Vendi com prejuízo. Pago imposto?", a: "Não há ganho de capital quando a venda sai por menos que o custo. Mesmo assim, informe a venda na declaração." },
    ],
  },

  "quanto-vale": {
    tituloSeo: "Quanto vale meu imóvel? Preço, venda e avaliação do banco",
    descricao: "Quanto vale meu imóvel? A diferença entre preço de anúncio, preço de venda e avaliação do banco, e como chegar a um preço que vende.",
    resposta: "Quanto vale meu imóvel? Ele tem três valores: o **de anúncio** (o que você pede), o **de venda** (o que alguém paga) e a **[avaliação](g:avaliacao) do banco** (o que o banco do comprador acha que vale). O que vende rápido é o preço que **cabe na avaliação**.",
    secoes: [
      {
        titulo: "Um imóvel, três valores",
        blocos: [
          {
            figura: {
              id: "tres-valores",
              alt: "Quanto vale meu imóvel: a diferença entre o preço de anúncio, o preço de venda e a avaliação do banco do comprador, com valores ilustrativos",
              etiqueta: "Quanto vale meu imóvel?",
              titulo: "Um imóvel,",
              destaque: "três valores.",
              esquema: {
                tipo: "barras",
                itens: [
                  { rotulo: "Anúncio", valor: 400, texto: "R$ 400 mil · o que você pede", tom: "ink" },
                  { rotulo: "Venda", valor: 370, texto: "R$ 370 mil · o que alguém paga", tom: "mark" },
                  { rotulo: "Avaliação do banco", valor: 360, texto: "R$ 360 mil · base do empréstimo", tom: "planta" },
                ],
              },
              legenda: "Valores ilustrativos. O comprador financiado só consegue pagar o que a avaliação e a entrada dele cobrem.",
            },
          },
          { p: "Para ter uma referência real, veja quanto as pessoas pagaram por m² em [São Paulo, distrito por distrito](#metro-quadrado-sao-paulo), e o preço de anúncio [nas capitais](#quanto-minha-renda-compra)." },
        ],
      },
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
    faq: [{ q: "Vale pagar uma avaliação particular?", a: "Para imóveis de valor alto ou muito diferentes da vizinhança, um laudo de corretor ou engenheiro ajuda a defender o preço." },
      { q: "O valor venal do IPTU é o valor do imóvel?", a: "Não. O valor venal é uma base de imposto da prefeitura e costuma ficar abaixo do mercado." },
      { q: "Como saber se o banco vai avaliar no meu preço?", a: "Compare com vendas reais parecidas na região: é o que o engenheiro do banco faz. Imóvel muito acima disso tende a ser avaliado abaixo do preço." },
    ],
  },

  "contrato-compra-venda": {
    tituloSeo: "Contrato de compra e venda de imóvel: o que não pode faltar",
    descricao: "O que um contrato de compra e venda de imóvel precisa ter: partes, imóvel, preço, forma de pagamento, prazos, multa e condição do financiamento.",
    resposta: "O contrato de compra e venda de imóvel precisa amarrar **quem**, **qual imóvel** (com a [matrícula](g:matricula)), **quanto e como paga**, **prazos**, **multa** e — se houver financiamento — o que acontece **se o banco não aprovar**.",
    secoes: [
      {
        titulo: "O checklist do contrato",
        blocos: [
          {
            figura: {
              id: "checklist",
              alt: "Checklist do contrato de compra e venda de imóvel: as partes, o imóvel com a matrícula, o preço e o pagamento, os prazos e a multa, e a cláusula do financiamento",
              etiqueta: "Contrato de compra e venda",
              titulo: "Cinco coisas",
              destaque: "que não podem faltar.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Quem", texto: "Comprador, vendedor e cônjuges, com documentos." },
                  { titulo: "Qual imóvel", texto: "Endereço e número da matrícula." },
                  { titulo: "Quanto e como", texto: "Preço, sinal, FGTS e parte financiada." },
                  { titulo: "Prazos e multa", texto: "Datas de pagamento e entrega, e a multa." },
                  { titulo: "Se o banco negar", texto: "O que acontece com o sinal se o crédito não sair." },
                ],
              },
            },
          },
          { p: "Comprando financiado, o contrato do banco **vale como escritura**: o contrato particular entre vocês é o compromisso até lá. Por isso a cláusula do financiamento negado é a que mais protege o comprador." },
        ],
      },
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
      {
        titulo: "Modelos para baixar",
        blocos: [
          { p: "Em Word e PDF, grátis, com os campos a preencher grifados e cada cláusula explicada:" },
          {
            lista: [
              "[Compra e venda com financiamento](#modelo-compra-venda-financiada): com a cláusula que devolve o sinal se o banco negar.",
              "[Compra e venda à vista](#modelo-compra-venda-a-vista): sinal agora, saldo na escritura.",
              "[Recibo de sinal](#modelo-recibo-de-sinal): quando o sinal sai antes do contrato completo.",
              "[Distrato](#modelo-distrato): para desfazer o negócio de comum acordo.",
            ],
          },
          { p: "Todos os modelos, inclusive aluguel e declaração de primeiro imóvel, em [modelos de contrato](#modelos-de-contrato)." },
        ],
      },
    ],
    faq: [{ q: "Preciso de advogado?", a: "Para negócios de valor alto ou com pendências, sim. Um contrato bem feito custa menos que um problema." },
      { q: "Preciso de advogado para fazer o contrato?", a: "Não é obrigatório, mas é recomendável numa compra desse tamanho, principalmente se houver sinal alto ou prazos longos." },
      { q: "O sinal é devolvido se o financiamento for negado?", a: "Depende do que o contrato diz. Por isso vale escrever, antes de pagar o sinal, o que acontece se o banco negar." },
    ],
  },
};
