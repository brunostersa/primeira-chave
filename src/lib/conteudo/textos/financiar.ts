import type { Texto } from "../tipos";

export const TEXTOS_FINANCIAR: Record<string, Texto> = {
  "como-financiar-casa-caixa": {
    tituloSeo: "Como financiar uma casa pela Caixa: passo a passo",
    descricao: "O passo a passo para financiar uma casa pela Caixa, do simulador às chaves: renda, entrada, documentos, avaliação, contrato e registro.",
    resposta: "Em 6 passos: **simular**, **pedir a aprovação de crédito**, **escolher a casa**, **avaliação do banco**, **assinar o contrato** e **registrar**. A Caixa financia até 80% da [avaliação](g:avaliacao), com parcela de até 30% da sua renda.",
    secoes: [
      {
        titulo: "Quanto a Caixa empresta para a sua renda",
        blocos: [{ calculo: "renda-por-valor" }, { p: "Faça com os seus números no [simulador](#simulador)." }],
      },
      {
        titulo: "O passo a passo",
        blocos: [
          {
            passos: [
              { titulo: "Simule", texto: "Descubra a faixa ([Minha Casa Minha Vida](#minha-casa-minha-vida) ou [SBPE](g:sbpe)), o valor máximo e a parcela." },
              { titulo: "Peça a aprovação de crédito", texto: "Numa agência ou num correspondente Caixa Aqui, com os [documentos](#documentos-financiamento)." },
              { titulo: "Escolha a casa", texto: "Já sabendo seu teto. Confira a [matrícula](#certidao-matricula)." },
              { titulo: "Avaliação", texto: "O engenheiro da Caixa vistoria e dá o valor. Veja [o que muda](#avaliacao-do-imovel)." },
              { titulo: "Contrato", texto: "Comprador e vendedor assinam no dia marcado pela Caixa." },
              { titulo: "Registro e chaves", texto: "Pague o ITBI e registre em até 30 dias. Veja [registro e chaves](#registro-do-imovel)." },
            ],
          },
        ],
      },
      {
        titulo: "Os números que a Caixa usa",
        blocos: [
          {
            lista: [
              "Parcela de até **30% da [renda bruta](g:renda-bruta)**, descontadas outras parcelas.",
              "Prazo de até **35 anos**, desde que idade + prazo não passe de 80 anos e 6 meses.",
              "Até **80% da avaliação**, sem passar do preço de venda.",
              "Juros conforme a faixa de renda: veja a [tabela do MCMV](#mcmv-faixas).",
            ],
          },
        ],
      },
      {
        titulo: "Quanto tempo leva, etapa por etapa",
        blocos: [
          {
            figura: {
              id: "linha-do-tempo",
              alt: "Linha do tempo de como financiar uma casa pela Caixa: aprovação de crédito, avaliação do imóvel, contrato e registro até a entrega das chaves",
              etiqueta: "Financiamento pela Caixa",
              titulo: "Do pedido à chave,",
              destaque: "de 30 a 90 dias.",
              esquema: {
                tipo: "linha",
                marcos: [
                  { rotulo: "Pedido", detalhe: "documentos na agência ou correspondente" },
                  { rotulo: "Crédito aprovado", detalhe: "você já sabe o seu teto" },
                  { rotulo: "Avaliação", detalhe: "o engenheiro dá o valor" },
                  { rotulo: "Chave", detalhe: "contrato registrado" },
                ],
                trechos: [
                  { rotulo: "5 a 15 dias", tom: "planta" },
                  { rotulo: "7 a 15 dias", tom: "planta" },
                  { rotulo: "contrato + até 30 dias", tom: "mark" },
                ],
              },
              legenda: "Prazos médios. O que mais atrasa: documento que chega aos poucos e pendência na matrícula.",
            },
          },
          { p: "Os prazos de cada etapa e o que acelera estão em [quanto tempo demora o financiamento](#quanto-tempo-demora)." },
        ],
      },
    ],
    faq: [
      { q: "Preciso ter conta na Caixa?", a: "Não é obrigatório para pedir, mas ter conta e salário no banco pode ajudar nas condições." },
      { q: "Correspondente Caixa Aqui cobra?", a: "O correspondente é remunerado pelo banco. Desconfie de cobrança antecipada para aprovar crédito." },
      { q: "Dá para financiar casa usada pela Caixa?", a: "Dá. As regras são as mesmas; o que muda é a documentação do imóvel e do vendedor. Veja como financiar imóvel usado." },
      { q: "Posso juntar a renda com outra pessoa?", a: "Pode. Quem compra junto soma as rendas, e a parcela tem de caber em 30% da soma." },
    ],
  },

  "como-financiar-apartamento": {
    tituloSeo: "Como financiar um apartamento: regras e números",
    descricao: "As regras para financiar apartamento novo ou usado: quanto o banco empresta, renda necessária, condomínio e documentos do prédio.",
    resposta: "Para financiar apartamento, as regras são as mesmas da casa: até 80% da [avaliação](g:avaliacao), parcela de até 30% da renda e prazo de até 35 anos. A diferença está no **condomínio** e na **documentação do prédio**.",
    secoes: [
      { titulo: "Renda para cada valor de apartamento", blocos: [{ calculo: "renda-por-valor" }] },
      {
        titulo: "O que muda no apartamento",
        blocos: [
          {
            lista: [
              "**Condomínio** não entra nos 30% do banco, mas entra no seu mês. Some antes de decidir.",
              "A avaliação olha o prédio: idade, conservação, elevador, vagas.",
              "Peça a convenção e uma declaração de que não há dívidas de condomínio.",
              "Na planta, você paga a construtora durante a obra e financia o saldo na entrega.",
            ],
          },
        ],
      },
      { titulo: "Sem entrada?", blocos: [{ p: "Vale a mesma regra da avaliação: veja [apartamento sem entrada](#sem-entrada-apartamento)." }] },
    ],
    faq: [{ q: "Apartamento usado financia igual ao novo?", a: "Na Caixa, a cota é a mesma (até 80%). A avaliação de usado costuma ser mais rigorosa com conservação." }],
  },

  "imovel-usado": {
    tituloSeo: "Como financiar imóvel usado pela Caixa",
    h1: "Como financiar imóvel usado pela Caixa",
    descricao: "Regras para financiar imóvel usado na Caixa: cota, avaliação, documentação do vendedor e os cuidados que evitam surpresa.",
    resposta: "A Caixa financia até **80% da avaliação** de imóvel usado, no [Minha Casa Minha Vida](#minha-casa-minha-vida) ou na [SBPE](g:sbpe). O segredo do usado está em dois documentos: a [avaliação](g:avaliacao) e a [matrícula](g:matricula).",
    secoes: [
      {
        titulo: "Os cuidados do usado",
        blocos: [
          {
            passos: [
              { titulo: "Matrícula limpa", texto: "Veja dono, área e [ônus](g:onus) na [certidão](#certidao-matricula)." },
              { titulo: "Avaliação antes do sinal", texto: "Usado avaliado abaixo do preço é comum. Veja [o que fazer](#avaliacao-do-imovel)." },
              { titulo: "Dívidas do imóvel", texto: "IPTU e condomínio atrasados acompanham o imóvel. Peça as certidões." },
              { titulo: "Reforma", texto: "O financiamento cobre a compra, não a reforma. Separe esse dinheiro." },
            ],
          },
        ],
      },
      {
        titulo: "A oportunidade do usado",
        blocos: [
          { p: "Usado que precisa de reforma ou de venda rápida costuma sair abaixo do mercado. Se a avaliação vier bem acima do preço, a entrada cai — às vezes a zero. Veja [financiar sem entrada](#sem-entrada-casa)." },
          { p: "Quem vende também precisa entender isso: [vender para quem vai financiar](#vender-para-quem-financia)." },
        ],
      },
    ],
    faq: [{ q: "Imóvel sem habite-se financia?", a: "Em geral não: o banco exige a construção averbada na matrícula." }],
  },

  "quanto-custa-financiar": {
    tituloSeo: "Quanto custa financiar um apartamento: juros, seguros e taxas",
    h1: "Quanto custa financiar um apartamento (ou uma casa)",
    descricao: "Quanto custa financiar um apartamento, além do preço: juros, seguros obrigatórios, taxa de administração, TR, ITBI e cartório, com exemplo.",
    resposta: "Para saber quanto custa financiar um apartamento, some ao preço os **juros**, os **seguros** ([MIP e DFI](g:mip-dfi)), a **taxa de administração** e a correção pela [TR](g:tr) durante o contrato — e, na compra, **ITBI e cartório** (perto de 5%).",
    secoes: [
      {
        titulo: "Na compra",
        blocos: [{ calculo: "custos-da-compra" }],
      },
      {
        titulo: "Durante o contrato",
        blocos: [
          { calculo: "sac-x-price" },
          { p: "O total pago passa de duas vezes o valor financiado em 35 anos. Abater com o [FGTS](#amortizar-fgts) ou adiantar parcelas no começo reduz muito essa conta." },
        ],
      },
    ],
    faq: [{ q: "O que é CET?", a: "Custo Efetivo Total: a taxa que soma juros, seguros e tarifas. O banco é obrigado a informar antes de você assinar." }],
  },

  "sac-ou-price": {
    tituloSeo: "SAC ou PRICE: qual escolher no financiamento?",
    descricao: "SAC ou PRICE: qual escolher no financiamento imobiliário? O exemplo calculado mostra a parcela inicial, a última parcela e o total pago.",
    resposta: "SAC ou PRICE? No [SAC](g:sac), a parcela **começa mais alta e vai caindo**, e você paga **menos juros no total**. Na [PRICE](g:price), a parcela **fica igual**, começa menor, mas o total é maior. Se a primeira parcela do SAC cabe na renda, ele costuma valer mais.",
    secoes: [
      { titulo: "Lado a lado", blocos: [{ calculo: "sac-x-price" }] },
      {
        titulo: "Como escolher",
        blocos: [
          {
            tabela: {
              cabecalho: ["Se você…", "Prefira"],
              linhas: [
                ["quer pagar menos no total e a 1ª parcela cabe", "SAC"],
                ["precisa da menor parcela possível hoje", "PRICE"],
                ["quer financiar o máximo com a sua renda", "PRICE"],
                ["vai abater com FGTS e adiantar parcelas", "SAC"],
              ],
            },
          },
          { p: "Na Caixa, a linha de mercado ([SBPE](g:sbpe)) é simulada em SAC; no Minha Casa Minha Vida, em PRICE." },
        ],
      },
    ],
    faq: [{ q: "Posso trocar depois?", a: "Em geral não dentro do mesmo contrato. Uma saída é a portabilidade para outro banco." }],
  },

  "consorcio-ou-financiamento": {
    tituloSeo: "Como funciona o consórcio de imóvel e quando vale mais",
    h1: "Como funciona o consórcio de imóvel (e quando vale mais que financiar)",
    descricao: "Como funciona um consórcio de imóvel: taxa de administração, sorteio, lance e carta de crédito, comparados ao financiamento, com custos e prazos.",
    resposta: "Como funciona um consórcio de imóvel: o grupo junta dinheiro todo mês e, a cada assembleia, alguém recebe a [carta de crédito](g:carta-de-credito) por **sorteio** ou **lance**. Não tem juros, mas tem taxa de administração. **Financiamento**: a chave vem agora, com juros. Quem precisa morar logo financia; quem pode esperar pode considerar o consórcio.",
    secoes: [
      {
        titulo: "Lado a lado",
        blocos: [
          {
            tabela: {
              cabecalho: ["", "Financiamento", "Consórcio"],
              linhas: [
                ["Quando recebe", "Na compra", "No sorteio ou lance"],
                ["Custo", "Juros + seguros + TR", "Taxa de administração + fundo de reserva + correção"],
                ["Entrada", "Em geral 20%", "Não tem, mas o lance antecipa"],
                ["Melhor para", "Quem precisa morar já", "Quem pode esperar e tem disciplina"],
              ],
            },
          },
        ],
      },
      { titulo: "Faça a conta", blocos: [{ p: "Compare a parcela do consórcio com a do [simulador](#simulador) e com o aluguel que você paga hoje: veja também [alugar ou financiar](#alugar-ou-financiar)." }] },
    ],
    faq: [{ q: "Dá para usar FGTS no consórcio?", a: "Sim, em situações previstas nas regras do FGTS, como para dar lance ou complementar a carta." }],
  },

  "alugar-ou-financiar": {
    tituloSeo: "Alugar ou financiar um imóvel? A conta honesta",
    descricao: "Alugar ou financiar um imóvel? Compare aluguel, parcela, entrada parada e tempo de moradia para ver o que você constrói em cada caminho.",
    resposta: "Alugar ou financiar não tem resposta única: compare **a parcela com o aluguel**, o **custo da entrada parada** e **quanto tempo você vai morar** ali. Se a parcela fica perto do aluguel e você pretende ficar anos, financiar costuma fazer sentido.",
    secoes: [
      {
        titulo: "As perguntas que decidem",
        blocos: [
          {
            lista: [
              "A parcela do [simulador](#simulador) fica perto do aluguel que você paga?",
              "Você pretende ficar no mesmo lugar por 5 anos ou mais?",
              "Tem reserva de emergência além da entrada e dos custos?",
              "Sua renda é estável?",
            ],
          },
          { p: "Quatro \"sim\" apontam para financiar. Se a entrada é o problema, veja [o caminho sem entrada](#sem-entrada-casa)." },
        ],
      },
    ],
    faq: [{ q: "Aluguel é dinheiro jogado fora?", a: "Não: paga flexibilidade. A parcela também tem juros. A conta certa compara os dois, não só o valor do mês." }],
  },
};
