import type { Texto } from "../tipos";

export const TEXTOS_VENDER: Record<string, Texto> = {
  "vender-para-quem-financia": {
    tituloSeo: "Como vender um imóvel pela Caixa (para quem vai financiar)",
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
    tituloSeo: "Como vender um imóvel financiado (sem quitar antes)",
    descricao: "Como vender imóvel financiado sem quitar antes: o financiamento do comprador paga o seu saldo devedor e a diferença cai na sua conta. Com exemplo.",
    resposta: "Dá para vender um imóvel financiado sem quitar antes, e pouca gente sabe disso. O **financiamento do comprador paga o seu saldo devedor** direto ao seu banco, no mesmo processo, e **a diferença cai na sua conta**. Seu banco entra no contrato como **interveniente quitante**.",
    secoes: [
      {
        titulo: "Você não precisa se preocupar com o saldo devedor",
        blocos: [
          { p: "É comum achar que só dá para vender depois de quitar o financiamento. Não é preciso. O imóvel está em [alienação fiduciária](g:alienacao-fiduciaria) com o seu banco, mas a venda resolve isso: **o dinheiro da própria venda quita a dívida**, e o banco libera o imóvel para o comprador." },
          { p: "A única conta que importa é esta: **o preço de venda precisa ser maior que o saldo devedor**. É o que acontece quase sempre, porque o imóvel valoriza e a dívida cai a cada parcela. Se o preço não cobrir o saldo, você teria de completar a diferença do próprio bolso, e aí vender raramente faz sentido." },
        ],
      },
      {
        titulo: "Um exemplo, do começo ao fim",
        blocos: [
          {
            figura: {
              id: "dinheiro-da-venda",
              alt: "Como vender imóvel financiado: venda por R$ 290 mil, R$ 95 mil quitam o saldo devedor no banco do vendedor e R$ 195 mil vão para quem vende",
              etiqueta: "Vender imóvel financiado",
              titulo: "A venda quita a dívida;",
              destaque: "o resto é seu.",
              esquema: {
                tipo: "divisao",
                total: "venda por R$ 290 mil",
                partes: [
                  { rotulo: "quita o seu saldo devedor", valor: 95000, texto: "R$ 95 mil", tom: "planta" },
                  { rotulo: "vai para a sua conta", valor: 195000, texto: "R$ 195 mil", tom: "mark" },
                ],
              },
              legenda: "Exemplo: imóvel comprado por R$ 130 mil, com R$ 35 mil abatidos em cerca de 10 anos de parcelas.",
            },
          },
          {
            passos: [
              { titulo: "A compra", texto: "O imóvel foi comprado por **R$ 130 mil**, financiado." },
              { titulo: "Dez anos de parcelas", texto: "Em cerca de 10 anos, as parcelas abateram **R$ 35 mil** da dívida. O saldo devedor ficou em **R$ 95 mil**." },
              { titulo: "A venda", texto: "O imóvel foi vendido por **R$ 290 mil** para alguém que financiou." },
              { titulo: "A quitação", texto: "No dia do pagamento, o banco do comprador mandou **R$ 95 mil** ao banco do vendedor, que deu a dívida por quitada." },
              { titulo: "A diferença", texto: "Os **R$ 195 mil** restantes foram para a conta do vendedor. E começou um financiamento novo, no nome do comprador." },
            ],
          },
          {
            tabela: {
              cabecalho: ["De onde vem", "Quanto", "Para onde vai"],
              linhas: [
                ["Entrada do comprador", "R$\u00a058\u00a0mil", "Direto para você"],
                ["Financiamento do comprador (80%)", "R$\u00a0232\u00a0mil", "R$ 95 mil para o seu banco e R$ 137 mil para você"],
                ["**Total**", "**R$\u00a0290\u00a0mil**", "**R$ 195 mil para você**, dívida quitada"],
              ],
            },
          },
          { p: "Quanto o comprador consegue financiar depende da [avaliação do banco](#avaliacao-do-imovel) e da renda dele, não do seu saldo. Veja [como vender pela Caixa](#vender-para-quem-financia)." },
        ],
      },
      {
        titulo: "O nome técnico: interveniente quitante",
        blocos: [
          { p: "No contrato de financiamento do comprador, o seu banco aparece como **interveniente quitante**: a parte que entra no negócio só para **receber o saldo devedor e dar a quitação**. Depois do registro, ele libera a alienação fiduciária na matrícula, e o imóvel passa limpo para o comprador, já com a garantia do banco dele." },
          { p: "Funciona mesmo quando os bancos são diferentes. Você assina junto com o comprador, e cada banco cuida da sua parte." },
          {
            passos: [
              { titulo: "Peça o saldo para quitação", texto: "No seu banco, peça o saldo devedor atualizado para quitação. Na Caixa, veja o [atalho do Habitação](#boleto-habitacao)." },
              { titulo: "Defina o preço", texto: "Acima do saldo e dentro do que o banco do comprador vai avaliar. Veja [quanto vale meu imóvel](#quanto-vale)." },
              { titulo: "Crédito e avaliação do comprador", texto: "O banco dele aprova a renda e avalia o imóvel. Os seus documentos estão em [documentos para vender](#documentos-vender)." },
              { titulo: "Assinatura e registro", texto: "Você, o comprador e os bancos assinam. O contrato vai ao cartório (até 30 dias)." },
              { titulo: "Pagamento", texto: "Registrado, o banco do comprador quita o seu saldo e deposita a diferença para você." },
            ],
          },
        ],
      },
      {
        titulo: "E o ágio?",
        blocos: [
          { p: "Antigamente era comum o **ágio**: o comprador pagava ao vendedor o que ele já tinha quitado e passava a pagar as parcelas dele. Hoje o mercado não trabalha assim. A forma correta é a que está acima: **quitação pelo interveniente quitante e financiamento novo no nome de quem compra**, nas taxas e no prazo dele." },
          { aviso: { titulo: "Repassar as parcelas é contrato de gaveta", texto: "Vender sem o banco saber deixa a dívida e o imóvel no seu nome. Se o comprador parar de pagar, o problema é seu. Para fechar o negócio do jeito certo, use um [contrato de compra e venda](#contrato-compra-venda).", tom: "bad" } },
        ],
      },
      {
        titulo: "E o imposto?",
        blocos: [{ p: "O imposto não olha o que caiu na sua conta, e sim o lucro: no exemplo, a venda por R$ 290 mil de um imóvel comprado por R$ 130 mil. Há isenções comuns, como comprar outro imóvel residencial em até 180 dias. Veja [imposto na venda](#imposto-venda)." }],
      },
    ],
    faq: [
      { q: "Preciso quitar o financiamento antes de vender?", a: "Não. O financiamento do comprador quita o seu saldo devedor no mesmo processo, e a diferença vai para você. Seu banco entra no contrato como interveniente quitante." },
      { q: "O que é interveniente quitante?", a: "É o banco do vendedor quando ele participa do contrato de financiamento do comprador só para receber o saldo devedor, dar a quitação e liberar a alienação fiduciária na matrícula." },
      { q: "E se o saldo devedor for maior que o preço de venda?", a: "Aí você teria de completar a diferença do próprio bolso para quitar. É raro, porque a dívida cai a cada parcela e o imóvel costuma valorizar, mas faça a conta antes de anunciar." },
      { q: "Ainda existe venda com ágio?", a: "Na prática, não. O comprador faz um financiamento novo no nome dele, que quita o seu. Repassar as parcelas sem o banco é contrato de gaveta e deixa a dívida no seu nome." },
      { q: "Quando eu recebo o dinheiro?", a: "Depois do registro do contrato no cartório, que leva até 30 dias da assinatura. O banco do comprador quita o seu saldo e deposita a diferença na sua conta." },
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

  "preparar-para-vender": {
    tituloSeo: "Como preparar o imóvel para vender: reforma, dívidas e avaliação",
    descricao: "Como preparar o imóvel para vender: que reforma se paga, IPTU e condomínio atrasados, averbação na matrícula e a hora certa da avaliação do banco.",
    resposta: "Para preparar o imóvel para vender, a ordem é: **papéis e dívidas em dia**, **só a reforma que se paga** e, por último, a **[avaliação](g:avaliacao) do banco do comprador**. O engenheiro avalia o imóvel como ele está no dia da visita: reforme antes, não depois.",
    secoes: [
      {
        titulo: "Reformar para vender: o que se paga",
        blocos: [
          {
            figura: {
              id: "reforma-retorno",
              alt: "Como preparar o imóvel para vender: pintura e reparos quase sempre se pagam, cozinha e banheiro às vezes, reforma pesada raramente",
              etiqueta: "Preparar o imóvel para vender",
              titulo: "Reforma para vender:",
              destaque: "quanto menor, mais se paga.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Quase sempre vale", tom: "mark", itens: ["Pintura", "Vazamentos e infiltração", "Tomadas, portas, metais"] },
                  { titulo: "Às vezes vale", tom: "planta", itens: ["Cozinha", "Banheiro", "Piso muito gasto"] },
                  { titulo: "Raramente vale", tom: "bad", itens: ["Mudar a planta", "Ampliar", "Acabamento de luxo"] },
                ],
              },
              legenda: "O teto é o preço da vizinhança: reforma que passa dele não volta na venda.",
            },
          },
          {
            tabela: {
              cabecalho: ["Nível", "O que entra", "Quando vale"],
              linhas: [
                ["Pintura e reparos", "Paredes, infiltração, vazamento, elétrica, portas e janelas", "Quase sempre: custa pouco, melhora as fotos e o estado de conservação que o engenheiro anota."],
                ["Cozinha e banheiro", "Trocar louças, bancada e revestimento, sem quebrar tudo", "Quando estão estragados ou muito atrás dos vizinhos. Refaça o básico, não o sonho."],
                ["Reforma pesada", "Derrubar paredes, ampliar, trocar tudo", "Raramente. É caro, demora e, se a área muda, exige averbação na matrícula."],
              ],
            },
          },
          {
            aviso: {
              titulo: "Quando não vale reformar",
              texto: "Quando você precisa vender rápido, quando o imóvel já está no teto de preço do bairro, ou quando o comprador provável vai querer reformar do jeito dele. Nesses casos, venda como está e ajuste o preço. É o mesmo raciocínio de quem compra para reformar: veja [a conta da reforma](#reforma-leilao).",
            },
          },
          { p: "Guarde as notas fiscais: reforma comprovada soma ao custo do imóvel e reduz o [imposto na venda](#imposto-venda)." },
        ],
      },
      {
        titulo: "IPTU, condomínio, água e luz atrasados",
        blocos: [
          { p: "Dá para vender imóvel com IPTU atrasado ou com dívida de condomínio, mas **a dívida vai junto com o imóvel**. Por isso o comprador e o banco dele pedem as certidões antes de assinar, e ninguém financia um imóvel com débito aberto." },
          {
            tabela: {
              cabecalho: ["Conta", "De quem é a dívida", "Como aparece para o comprador"],
              linhas: [
                ["IPTU", "Do imóvel: passa para o comprador, a menos que a escritura prove a quitação (Código Tributário Nacional, art. 130)", "Na certidão de débitos imobiliários da prefeitura. Se virou cobrança na Justiça, pode chegar à [matrícula](g:matricula) como penhora."],
                ["Condomínio", "Do imóvel: quem compra responde pelos atrasados (Código Civil, art. 1.345)", "Na declaração de quitação assinada pelo síndico, que o comprador vai pedir."],
                ["Água e luz", "Em regra, de quem consumiu, não do imóvel", "Não entra na matrícula, mas vira briga na entrega das chaves. Quite e troque a titularidade."],
              ],
            },
          },
          {
            passos: [
              { titulo: "Tire as certidões primeiro", texto: "Certidão de débitos do IPTU na prefeitura e declaração do condomínio. Assim você sabe o tamanho do problema antes do comprador." },
              { titulo: "Quite ou parcele", texto: "Com o débito parcelado e em dia, a prefeitura costuma emitir certidão positiva com efeito de negativa, que serve para a venda." },
              { titulo: "Ou acerte no preço", texto: "Sem dinheiro para quitar antes, combine por escrito que a dívida é paga com o dinheiro da venda, no ato. Escreva isso no [contrato](#contrato-compra-venda)." },
            ],
          },
          { aviso: { titulo: "Penhora trava a venda", texto: "Dívida que virou processo pode gerar penhora registrada na matrícula, um [ônus](g:onus). Com ela, o banco do comprador não aceita o imóvel como garantia até a baixa.", tom: "bad" } },
        ],
      },
      {
        titulo: "Matrícula em dia: a averbação",
        blocos: [
          { p: "O banco empresta sobre o que está no papel. Se você construiu, ampliou ou fechou uma área e isso **não está averbado na matrícula** (anotado no cartório), o imóvel real e o registrado não batem. Isso pode baixar o valor considerado ou travar o financiamento do comprador." },
          {
            lista: [
              "**Construção ou ampliação**: peça o habite-se na prefeitura e averbe no cartório de registro. Em obra nova, o cartório também pede a certidão da obra no INSS.",
              "**Reforma sem mudar a área** (pintura, piso, cozinha): em regra, não precisa averbar.",
              "**Casamento, divórcio ou óbito** desde a compra: atualize o estado civil na matrícula, ou o cartório vai pedir antes do registro.",
              "Confira se a área do carnê do IPTU bate com a da matrícula.",
            ],
          },
          { p: "Comece pela certidão de inteiro teor: [onde tirar e como ler](#certidao-matricula). A lista completa está em [documentos para vender](#documentos-vender)." },
        ],
      },
      {
        titulo: "A hora certa da avaliação do banco",
        blocos: [
          { p: "A avaliação do banco não é uma visita que você agenda sozinho. Ela faz parte da proposta de financiamento do comprador: na Caixa, é o banco que pede a vistoria ao engenheiro, **depois da análise de crédito do comprador**, e cada avaliação é cobrada à parte." },
          {
            tabela: {
              cabecalho: ["Pergunta", "Resposta (Caixa)"],
              linhas: [
                ["Quem pede", "A Caixa, dentro da proposta de financiamento do comprador, depois da análise de crédito."],
                ["Quem paga", "O comprador, pela tarifa de avaliação: uma parte na entrega dos documentos, o resto na assinatura."],
                ["Quanto custa (SBPE)", "De R$ 841,44 a R$ 954,13 por imóvel residencial, com R$ 750 pagos na entrega dos documentos."],
                ["Quanto custa (FGTS e MCMV)", "1,5% do valor financiado, com R$ 750 pagos na entrega dos documentos."],
                ["Quanto tempo vale o laudo", "A Caixa não publica o prazo. No mercado, fala-se em até 6 meses. Vencido, é preciso nova avaliação e nova tarifa."],
              ],
            },
          },
          {
            aviso: {
              titulo: "Reforme antes da avaliação, nunca depois",
              texto: "O [laudo](g:laudo) descreve o imóvel do dia da vistoria: área, estado de conservação, acabamento. Avaliado antes da reforma, ele registra o imóvel velho, e refazer custa outra tarifa ao comprador e mais semanas de espera. Termine a obra e a averbação **antes de aceitar proposta de quem vai financiar**.",
              tom: "mark",
            },
          },
          { p: "Quer saber o valor antes de ter comprador? Contrate uma avaliação particular, de engenheiro ou corretor: ela ajuda a definir o preço, mas o banco faz a dele de qualquer jeito. Veja [quanto vale meu imóvel](#quanto-vale) e como a avaliação mexe no seu preço em [como vender um imóvel pela Caixa](#vender-para-quem-financia)." },
          { p: "Fonte: página de financiamento de imóveis e Tabela de Tarifas da Caixa (divulgada em 01/10/2026). Os valores mudam: confirme na agência ou com o correspondente." },
        ],
      },
      {
        titulo: "A ordem certa, do começo à venda",
        blocos: [
          {
            passos: [
              { titulo: "Certidões", texto: "Matrícula, IPTU e condomínio. Você descobre o que falta antes do comprador." },
              { titulo: "Dívidas e averbação", texto: "Quite ou parcele os débitos e regularize o que foi construído." },
              { titulo: "Reforma que se paga", texto: "Pintura e reparos; cozinha e banheiro só se estiverem ruins." },
              { titulo: "Preço", texto: "Um preço que caiba na avaliação do banco do comprador." },
              { titulo: "Anúncio e comprador", texto: "A avaliação do banco vem com a proposta dele. Imóvel financiado? Veja [como vender](#vender-financiado)." },
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "Posso vender imóvel com IPTU atrasado?", a: "Pode, mas a dívida acompanha o imóvel e o banco do comprador pede a certidão de débitos. O caminho é quitar ou parcelar antes, ou combinar por escrito que o débito é pago com o dinheiro da venda." },
      { q: "Quem paga a dívida de IPTU depois da venda?", a: "Pela lei, a dívida de IPTU passa para quem compra, a menos que a escritura prove a quitação. Por isso nenhum comprador atento assina sem a certidão." },
      { q: "Reformar aumenta a avaliação do banco?", a: "O engenheiro considera o estado de conservação e a área registrada. Reparos e pintura ajudam; ampliação só conta direito depois de averbada na matrícula." },
      { q: "Posso pedir a avaliação da Caixa antes de ter comprador?", a: "Na Caixa, a avaliação faz parte da proposta de financiamento de quem compra, e é o comprador quem paga. Para ter uma referência antes, contrate uma avaliação particular de engenheiro ou corretor." },
      { q: "Quanto tempo vale o laudo de avaliação?", a: "A Caixa não publica o prazo. No mercado, fala-se em até 6 meses. Se o negócio demorar mais, o banco pode pedir nova avaliação, com nova tarifa." },
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
              { titulo: "Pense na avaliação do comprador", texto: "Se o banco avaliar abaixo do seu preço, o comprador precisa de mais entrada. Veja [como vender um imóvel pela Caixa](#vender-para-quem-financia)." },
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
              "[Termo de entrega de chaves e vistoria](#modelo-termo-entrega-chaves): o estado do imóvel no dia das chaves.",
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
