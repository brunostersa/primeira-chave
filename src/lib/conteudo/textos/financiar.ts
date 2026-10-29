import { mipRate, tabela } from "../../financiamento/engine";
import { PARAMS } from "../../financiamento/params";
import type { Texto } from "../tipos";

// Quanto custa financiar: R$ 240 mil (imóvel de R$ 300 mil) na faixa 3, em 35 anos, pelo motor validado.
const F3 = PARAMS.faixas[2];
const custo = tabela(240000, F3.juros / 100 / 12, PARAMS.prazoMax, 300000, "price", mipRate(30), PARAMS.dfi / 100, PARAMS.taxaAdm);
const milR = (v: number) => `R$ ${Math.round(v / 1000)} mil`;

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
      {
        titulo: "Casa ou apartamento: o que muda no financiamento",
        blocos: [
          {
            figura: {
              id: "casa-x-apartamento",
              alt: "Diferenças entre financiar casa e financiar apartamento: condomínio, avaliação do prédio e documentos do condomínio",
              etiqueta: "Financiar apartamento",
              titulo: "Mesma regra,",
              destaque: "outros custos.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Casa", tom: "planta", itens: ["Sem condomínio", "Avaliação do terreno e da construção", "Manutenção toda por sua conta"] },
                  { titulo: "Apartamento", tom: "mark", itens: ["Condomínio todo mês", "Avaliação olha o prédio inteiro", "Documentos do condomínio"] },
                ],
              },
              legenda: "O banco usa as mesmas regras (80% da avaliação, 30% da renda, até 35 anos). O que muda é o seu orçamento do mês.",
            },
          },
        ],
      },
      {
        titulo: "Apartamento na planta: como funciona o pagamento",
        blocos: [
          {
            figura: {
              id: "na-planta",
              alt: "Como funciona a compra de apartamento na planta: sinal, parcelas à construtora durante a obra corrigidas pelo INCC e financiamento do saldo na entrega das chaves",
              etiqueta: "Apartamento na planta",
              titulo: "Na obra, a construtora;",
              destaque: "na chave, o banco.",
              esquema: {
                tipo: "linha",
                marcos: [
                  { rotulo: "Compra", detalhe: "sinal e contrato com a construtora" },
                  { rotulo: "Habite-se", detalhe: "obra pronta e averbada" },
                  { rotulo: "Chave", detalhe: "o banco financia o saldo" },
                ],
                trechos: [
                  { rotulo: "obra: parcelas corrigidas pelo INCC", tom: "mark" },
                  { rotulo: "financiamento do saldo", tom: "planta" },
                ],
              },
              legenda: "Em alguns empreendimentos o financiamento começa já na obra, com a construtora como parceira do banco.",
            },
          },
          { p: "Durante a obra, as parcelas da construtora costumam ser corrigidas pelo **INCC**, o índice do custo da construção: o saldo que você vai financiar na entrega pode ficar maior que o previsto. Leia no contrato o índice, a periodicidade da correção e o **prazo de entrega**." },
        ],
      },
      { titulo: "Sem entrada?", blocos: [{ p: "Vale a mesma regra da avaliação: veja [apartamento sem entrada](#sem-entrada-apartamento)." }] },
    ],
    faq: [{ q: "Apartamento usado financia igual ao novo?", a: "Na Caixa, a cota é a mesma (até 80%). A avaliação de usado costuma ser mais rigorosa com conservação." },
      { q: "Dá para financiar apartamento na planta pela Caixa?", a: "Dá. Em geral você paga a construtora durante a obra e financia o saldo na entrega; em alguns empreendimentos, o financiamento já começa na obra." },
      { q: "O que é o INCC?", a: "É o índice que mede o custo da construção. Ele costuma corrigir as parcelas pagas à construtora durante a obra." },
      { q: "O condomínio entra na análise do banco?", a: "Não entra nos 30% da renda, mas pese no seu orçamento: ele vem todo mês junto com a parcela." },
    ],
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
      {
        titulo: "Usado ou novo: o que pesa na escolha",
        blocos: [
          {
            figura: {
              id: "usado-x-novo",
              alt: "Comparação entre financiar imóvel usado e imóvel novo pela Caixa: preço, avaliação, reforma, prazo para morar e documentação",
              etiqueta: "Financiar imóvel usado",
              titulo: "Usado ou novo:",
              destaque: "cada um tem seu custo.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Usado", tom: "mark", itens: ["Mora logo", "Preço mais negociável", "Avaliação rigorosa com conservação", "Pode pedir reforma"] },
                  { titulo: "Novo", tom: "planta", itens: ["Sem reforma", "Na planta, espera a obra", "Saldo corrigido pelo INCC na obra", "Documentação da construtora"] },
                ],
              },
            },
          },
        ],
      },
    ],
    faq: [{ q: "Imóvel sem habite-se financia?", a: "Em geral não: o banco exige a construção averbada na matrícula." },
      { q: "A Caixa financia imóvel usado no Minha Casa Minha Vida?", a: "Sim, dentro do teto da sua faixa e com a avaliação aprovada." },
      { q: "Quem paga a avaliação do imóvel usado?", a: "O comprador paga a tarifa de avaliação ao banco, como em qualquer financiamento." },
    ],
  },

  "quanto-custa-financiar": {
    tituloSeo: "Quanto custa financiar um apartamento: juros, seguros e taxas",
    h1: "Quanto custa financiar um apartamento (ou uma casa)",
    descricao: "Quanto custa financiar um apartamento, além do preço: juros, seguros obrigatórios, taxa de administração, TR, ITBI e cartório, com exemplo.",
    resposta: "Para saber quanto custa financiar um apartamento, some ao preço os **juros**, os **seguros** ([MIP e DFI](g:mip-dfi)), a **taxa de administração** e a correção pela [TR](g:tr) durante o contrato — e, na compra, **ITBI e cartório** (perto de 5%).",
    secoes: [
      {
        titulo: "Quanto você paga no total",
        blocos: [
          {
            figura: {
              id: "total-pago",
              alt: "Quanto custa financiar um apartamento: R$ 240 mil financiados em 35 anos na faixa 3 do Minha Casa Minha Vida e o total pago com juros, seguros e taxas",
              etiqueta: "Quanto custa financiar",
              titulo: "Em 35 anos,",
              destaque: "o total passa do dobro.",
              esquema: {
                tipo: "divisao",
                total: `total pago em 35 anos: ${milR(custo.total)}`,
                partes: [
                  { rotulo: "o que você pegou emprestado", valor: 240000, texto: "R$ 240 mil", tom: "planta" },
                  { rotulo: "juros, seguros e taxas", valor: custo.total - 240000, texto: milR(custo.total - 240000), tom: "bad" },
                ],
              },
              legenda: `Imóvel de R$ 300 mil, R$ 240 mil financiados na faixa 3 (PRICE, sem TR). Calculado com as regras da Caixa conferidas no simulador.`,
            },
          },
          { p: "O que mais reduz essa conta é **amortizar cedo**: cada real abatido nos primeiros anos deixa de pagar juros por décadas. Veja [como usar o FGTS para amortizar](#amortizar-fgts)." },
        ],
      },
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
    faq: [{ q: "O que é CET?", a: "Custo Efetivo Total: a taxa que soma juros, seguros e tarifas. O banco é obrigado a informar antes de você assinar." },
      { q: "Quanto custa financiar um apartamento de R$ 300 mil?", a: "Na faixa 3, com R$ 240 mil financiados em 35 anos, o total de parcelas passa do dobro do valor emprestado. A conta exata depende da sua faixa, do prazo e do sistema (SAC ou PRICE)." },
      { q: "Os seguros são obrigatórios?", a: "Sim: o MIP (morte e invalidez) e o DFI (danos ao imóvel) vêm na parcela de todo financiamento habitacional." },
    ],
  },

  "sac-ou-price": {
    tituloSeo: "SAC ou PRICE: qual escolher no financiamento?",
    descricao: "SAC ou PRICE: qual escolher no financiamento imobiliário? O exemplo calculado mostra a parcela inicial, a última parcela e o total pago.",
    resposta: "SAC ou PRICE? No [SAC](g:sac), a parcela **começa mais alta e vai caindo**, e você paga **menos juros no total**. Na [PRICE](g:price), a parcela **fica igual**, começa menor, mas o total é maior. Se a primeira parcela do SAC cabe na renda, ele costuma valer mais.",
    secoes: [
      {
        titulo: "SAC ou PRICE em uma imagem",
        blocos: [
          {
            figura: {
              id: "sac-x-price",
              alt: "SAC ou PRICE: no SAC a parcela começa maior e cai, com menos juros no total; na PRICE a parcela é fixa, começa menor e soma mais juros",
              etiqueta: "SAC ou PRICE",
              titulo: "Parcela que cai",
              destaque: "× parcela fixa.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "SAC", tom: "mark", itens: ["1ª parcela maior", "Parcela cai todo mês", "Menos juros no total"] },
                  { titulo: "PRICE", tom: "planta", itens: ["1ª parcela menor", "Parcela fixa (mais TR)", "Mais juros no total"] },
                ],
              },
              legenda: "No SAC, você amortiza mais no começo; por isso os juros caem mais rápido.",
            },
          },
        ],
      },
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
    faq: [{ q: "Posso trocar depois?", a: "Em geral não dentro do mesmo contrato. Uma saída é a portabilidade para outro banco." },
      { q: "Qual sistema a Caixa usa?", a: "Na simulação, a linha de mercado (SBPE) sai em SAC e o Minha Casa Minha Vida em PRICE. Na contratação, o banco informa as opções do seu caso." },
      { q: "No SAC eu financio menos?", a: "Com a mesma renda, sim: a primeira parcela é a mais alta, e é ela que precisa caber em 30% da renda." },
    ],
  },

  "consorcio-ou-financiamento": {
    tituloSeo: "Como funciona o consórcio de imóvel e quando vale mais",
    h1: "Como funciona o consórcio de imóvel (e quando vale mais que financiar)",
    descricao: "Como funciona um consórcio de imóvel: taxa de administração, sorteio, lance e carta de crédito, comparados ao financiamento, com custos e prazos.",
    resposta: "Como funciona um consórcio de imóvel: o grupo junta dinheiro todo mês e, a cada assembleia, alguém recebe a [carta de crédito](g:carta-de-credito) por **sorteio** ou **lance**. Não tem juros, mas tem taxa de administração. **Financiamento**: a chave vem agora, com juros. Quem precisa morar logo financia; quem pode esperar pode considerar o consórcio.",
    secoes: [
      {
        titulo: "Como funciona o consórcio de imóvel, na prática",
        blocos: [
          {
            figura: {
              id: "consorcio-na-pratica",
              alt: "Como funciona um consórcio de imóvel: grupo, parcelas mensais, sorteio ou lance na assembleia e uso da carta de crédito para comprar o imóvel",
              etiqueta: "Consórcio de imóvel",
              titulo: "Sem juros,",
              destaque: "mas sem data certa.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Entra no grupo", texto: "Escolhe o valor da carta e paga parcelas todo mês." },
                  { titulo: "Assembleia", texto: "Todo mês alguém é contemplado por sorteio ou lance." },
                  { titulo: "Carta de crédito", texto: "Contemplado, usa o crédito para comprar o imóvel." },
                  { titulo: "Segue pagando", texto: "As parcelas continuam até o fim do grupo." },
                ],
              },
              legenda: "O lance antecipa a contemplação: é como uma entrada, paga para sair antes.",
            },
          },
          {
            lista: [
              "**Taxa de administração**: é o custo do consórcio no lugar dos juros. Some ao **fundo de reserva** e ao **seguro**.",
              "**Correção da carta**: o valor do crédito e das parcelas é corrigido por um índice ao longo dos anos.",
              "**Lance**: pode ser com dinheiro próprio ou parte da própria carta (lance embutido), conforme o regulamento do grupo.",
            ],
          },
        ],
      },
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
      { titulo: "Compare as parcelas", blocos: [{ p: "Compare a parcela do consórcio com a do [simulador](#simulador) e com o aluguel que você paga hoje: veja também [alugar ou financiar](#alugar-ou-financiar)." }] },
    ],
    faq: [{ q: "Dá para usar FGTS no consórcio?", a: "Sim, em situações previstas nas regras do FGTS, como para dar lance ou complementar a carta." },
      { q: "Consórcio tem juros?", a: "Não. O custo é a taxa de administração, mais fundo de reserva e seguros, e as parcelas são corrigidas por um índice." },
      { q: "Quanto tempo demora para ser contemplado?", a: "Não há data certa: depende do sorteio ou de um lance vencedor. Pode ser no primeiro mês ou no último." },
    ],
  },

  "alugar-ou-financiar": {
    tituloSeo: "Alugar ou financiar um imóvel? A conta honesta",
    descricao: "Alugar ou financiar um imóvel? Compare aluguel, parcela, entrada parada e tempo de moradia para ver o que você constrói em cada caminho.",
    resposta: "Alugar ou financiar não tem resposta única: compare **a parcela com o aluguel**, o **custo da entrada parada** e **quanto tempo você vai morar** ali. Se a parcela fica perto do aluguel e você pretende ficar anos, financiar costuma fazer sentido.",
    secoes: [
      {
        titulo: "Os dois caminhos lado a lado",
        blocos: [
          {
            figura: {
              id: "alugar-x-financiar",
              alt: "Alugar ou financiar um imóvel: o aluguel dá flexibilidade e não exige entrada; o financiamento pede entrada e custos, mas a parcela vira patrimônio",
              etiqueta: "Alugar ou financiar?",
              titulo: "Flexibilidade",
              destaque: "× patrimônio.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Alugar", tom: "planta", itens: ["Muda quando quiser", "Sem entrada nem ITBI", "Reajuste todo ano"] },
                  { titulo: "Financiar", tom: "mark", itens: ["Parcela vira patrimônio", "Entrada e ~5% de custos", "Juros, mas o imóvel é seu"] },
                ],
              },
            },
          },
        ],
      },
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
    faq: [{ q: "Aluguel é dinheiro jogado fora?", a: "Não: paga flexibilidade. A parcela também tem juros. A conta certa compara os dois, não só o valor do mês." },
      { q: "Compensa financiar se a parcela for maior que o aluguel?", a: "Pode compensar se você vai ficar muitos anos e a parcela cabe com folga. Se aperta o mês, o risco é maior que o ganho." },
      { q: "E se eu guardar a diferença e comprar à vista depois?", a: "Funciona para quem tem disciplina e renda estável, mas os preços sobem no caminho: as avaliações dos bancos subiram perto de 5% no último ano." },
    ],
  },
};
