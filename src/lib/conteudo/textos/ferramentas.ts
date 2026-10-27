import { rendaMinimaPara } from "../../financiamento/engine";
import { PARAMS } from "../../financiamento/params";
import { brl } from "../../format";
import type { Texto } from "../tipos";

// Renda para o imóvel de 300 mil, a busca mais feita: sai do motor validado, como a tabela.
const r300 = rendaMinimaPara(300000)!;
const mil = (v: number) => `R$ ${Math.round(v / 1000)} mil`;
const custos300 = (300000 * (PARAMS.itbi + PARAMS.cartorio + PARAMS.avaliacao)) / 100;

export const TEXTOS_FERRAMENTAS: Record<string, Texto> = {
  // Lido pela página própria do simulador (fora da rota única): regras e perguntas abaixo da ferramenta.
  simulador: {
    tituloSeo: "Simulador de financiamento: regras da Caixa Habitação",
    h1: "Simulador de financiamento com as regras da Caixa Habitação",
    descricao: "Simulador de financiamento grátis com as regras da Caixa Habitação, conferidas em 2026: sua faixa do Minha Casa Minha Vida, a parcela e a entrada.",
    resposta: "Este simulador usa **as mesmas regras do simulador da Caixa Habitação**, conferidas em outubro de 2026 em seis perfis de renda — e explica cada número: por que essa faixa, de onde vem a parcela, quanto falta de [entrada](g:entrada). Não é o simulador oficial: é a mesma conta, em português claro.",
    secoes: [
      {
        titulo: "Como o simulador da Caixa Habitação calcula",
        blocos: [
          { p: "A conta tem quatro travas, e o resultado é sempre a **menor** delas. Por isso duas pessoas com a mesma renda podem ter resultados diferentes: a idade muda o prazo, e uma parcela de carro muda o quanto sobra para a casa." },
          {
            figura: {
              id: "quatro-travas",
              alt: "As quatro travas do simulador de financiamento da Caixa Habitação: 30% da renda, faixa de juros, prazo pela idade e 80% da avaliação",
              etiqueta: "Como a Caixa calcula",
              titulo: "Quatro travas,",
              destaque: "vale a menor.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "30% da renda", texto: "A parcela cabe em 30% da renda bruta, já tirando outras dívidas." },
                  { titulo: "Faixa e juros", texto: "A renda define a faixa do programa, os juros e o teto do imóvel." },
                  { titulo: "Prazo pela idade", texto: "Até 420 meses, e idade + prazo até 80 anos e meio." },
                  { titulo: "80% da avaliação", texto: "O banco empresta até 80% do valor avaliado, sem passar do preço." },
                ],
              },
              legenda: "A parcela máxima, o prazo e os juros dizem quanto a renda aguenta; a avaliação diz quanto o imóvel aguenta.",
            },
          },
          {
            lista: [
              "**Renda bruta**, não líquida: é o salário antes dos descontos. Quem compra junto soma as rendas.",
              "**Outras parcelas** (carro, empréstimo, cartão parcelado) saem dos 30%. Quitar uma parcela pequena pode liberar dezenas de milhares no crédito: veja [antes de financiar](#preparar-a-casa).",
              "**Idade**: depois dos 45, o prazo encurta e a parcela sobe para o mesmo valor emprestado.",
            ],
          },
        ],
      },
      {
        titulo: "As regras que a Caixa usa",
        blocos: [
          { calculo: "faixas-mcmv" },
          {
            lista: [
              "Parcela de até **30% da [renda bruta](g:renda-bruta)**.",
              "Até **80% da [avaliação](g:avaliacao)**, sem passar do preço.",
              "Prazo de até 420 meses, com idade + prazo até 80 anos e 6 meses.",
              "Acima de R$ 13 mil de renda, linha de mercado ([SBPE](g:sbpe)) com 11,49% a.a. efetivos, em SAC.",
            ],
          },
        ],
      },
      {
        titulo: "De onde sai o dinheiro de um imóvel de R$ 300 mil",
        blocos: [
          {
            figura: {
              id: "imovel-300-mil",
              alt: "Divisão do pagamento de um imóvel de R$ 300 mil no financiamento: 80% financiado pelo banco, 20% de entrada e cerca de 5% de ITBI e cartório",
              etiqueta: "Exemplo: imóvel de R$ 300 mil",
              titulo: "Quem paga",
              destaque: "cada parte.",
              esquema: {
                tipo: "divisao",
                total: `total da compra: ${mil(300000 + custos300)}`,
                partes: [
                  { rotulo: "o banco financia (80%)", valor: 240000, texto: mil(240000), tom: "planta" },
                  { rotulo: "entrada: seu dinheiro ou FGTS", valor: 60000, texto: mil(60000), tom: "mark" },
                  { rotulo: "ITBI e cartório", valor: custos300, texto: mil(custos300), tom: "ink" },
                ],
              },
              legenda: `Do seu bolso saem ${mil(60000 + custos300)} na compra; o resto vira parcela. Pelas regras de 2026, esse imóvel pede renda a partir de ${brl(r300.renda)} (${r300.programa.curto}).`,
            },
          },
          { p: `Para esse imóvel, a primeira parcela fica perto de **${brl(r300.parcela)}** (${r300.programa.curto}). A [entrada](g:entrada) pode vir do FGTS, e há um caso em que ela zera: quando o banco avalia o imóvel **25% acima do preço**. Veja [o segredo da avaliação](#sem-entrada-casa).` },
          { aviso: { titulo: "ITBI e cartório não entram no financiamento", texto: "Separe perto de 5% do valor do imóvel para o [ITBI](g:itbi), o registro e a avaliação. O FGTS também não paga esses custos.", tom: "mark" } },
        ],
      },
      {
        titulo: "Simular pela renda ou pelo valor do imóvel",
        blocos: [
          {
            lista: [
              "**Pela renda** (você ainda não achou o imóvel): o simulador mostra até quanto o banco financia e quanto você precisa juntar.",
              "**Pelo valor do imóvel** (você já achou): mostra a parcela, a entrada e se a renda aguenta. Se o banco avaliar acima do preço, a entrada diminui.",
            ],
          },
          { p: "Nos dois casos, o resultado vem com o **próximo passo**: o que resolver antes de pedir o crédito, os documentos e quanto tempo leva. Quer comparar cidades? Veja [quanto a sua renda compra em cada capital](#quanto-minha-renda-compra)." },
        ],
      },
      {
        titulo: "Por que o banco pode aprovar um valor diferente",
        blocos: [
          {
            lista: [
              "**A avaliação real do imóvel**: se vier abaixo do preço, o banco empresta menos. Veja [como funciona a avaliação](#avaliacao-do-imovel).",
              "**O seu histórico**: dívidas em atraso e restrições no nome pesam mais que o [score](g:score). Confira tudo no [Registrato](#registrato).",
              "**Os seguros e a TR** da apólice do contrato mudam alguns reais na parcela.",
              "**Renda difícil de comprovar** (autônomo, informal) pode exigir extratos e declaração do imposto de renda.",
            ],
          },
          { calculo: "termometro" },
        ],
      },
    ],
    faq: [
      { q: "Este é o simulador oficial da Caixa?", a: "Não. É um simulador independente e educativo que reproduz as regras da Caixa. A simulação oficial e a aprovação são feitas pelo banco." },
      { q: "Por que meu resultado é diferente no banco?", a: "O banco considera seu histórico, a avaliação real do imóvel, a TR e os seguros da apólice. Aqui usamos as regras médias." },
      { q: "Serve para o Minha Casa Minha Vida?", a: "Sim. O simulador descobre sua faixa pela renda e já usa os juros e o teto de imóvel dela." },
      { q: "A simulação é aprovação?", a: "Não. É uma estimativa educativa; a aprovação depende da análise do banco." },
      { q: "Qual o prazo máximo do financiamento na Caixa?", a: "Até 420 meses (35 anos), desde que a sua idade mais o prazo não passem de 80 anos e 6 meses." },
      { q: "Precisa de cadastro para simular?", a: "Aqui, não: são umas 10 perguntas, sem CPF e sem cadastro. No banco, a simulação oficial e a análise de crédito pedem os seus dados." },
      { q: "Dá para simular financiamento sem entrada?", a: "Dá: informe o preço e a avaliação esperada. Se o banco avaliar o imóvel 25% ou mais acima do preço, ele financia o valor inteiro, e você paga só ITBI e cartório." },
      { q: "O simulador considera o FGTS?", a: "Sim. Com 3 anos de carteira assinada, o saldo pode entrar na entrada, e quem tem esse tempo de FGTS ganha juros um pouco menores nas faixas 1 a 3 do Minha Casa Minha Vida." },
    ],
  },

  "calculadora-itbi": {
    tituloSeo: "Calculadora de ITBI: quanto você paga na compra do imóvel",
    descricao: "Calcule o ITBI da compra do imóvel com a alíquota da sua cidade: a base de cálculo, quem paga, quando pagar e os descontos para o primeiro imóvel.",
    resposta: "O [ITBI](g:itbi) é o **valor do imóvel × a alíquota da sua cidade** (em geral de 2% a 3%). A base é o **maior** entre o preço e o valor que a prefeitura atribui. Pague antes do [registro](g:registro).",
    secoes: [
      { titulo: "Calcule", blocos: [{ calculo: "calculadora-itbi" }] },
      {
        titulo: "O que saber",
        blocos: [
          {
            lista: [
              "É pago à prefeitura onde fica o imóvel, antes do registro no cartório.",
              "O [FGTS](g:fgts) não paga o ITBI.",
              "Algumas cidades dão desconto para [primeiro imóvel ou MCMV](#primeiro-imovel-desconto).",
            ],
          },
          { p: "Veja todos os custos da compra em [registro e chaves](#registro-do-imovel)." },
        ],
      },
      {
        titulo: "Como o ITBI é calculado",
        blocos: [
          {
            figura: {
              id: "como-calcula",
              alt: "Como calcular o ITBI na compra do imóvel: base de cálculo vezes a alíquota da cidade, pago antes do registro no cartório",
              etiqueta: "ITBI, passo a passo",
              titulo: "Base × alíquota,",
              destaque: "antes do registro.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Ache a base", texto: "O maior entre o preço e o valor que a prefeitura atribui." },
                  { titulo: "Ache a alíquota", texto: "Na lei da sua cidade: em geral de 2% a 3%." },
                  { titulo: "Emita a guia", texto: "No site da prefeitura, com os dados do contrato." },
                  { titulo: "Pague e registre", texto: "Leve o comprovante ao cartório com o contrato." },
                ],
              },
            },
          },
          {
            lista: [
              "**Financiado**: algumas cidades cobram alíquota menor sobre a parte financiada. Confira na lei municipal.",
              "**Quem paga**: por lei, o comprador, salvo acordo diferente no contrato.",
              "**Sem ITBI pago, não há registro**: e sem registro o imóvel não é seu, e o banco não paga o vendedor.",
            ],
          },
        ],
      },
    ],
    faq: [{ q: "Quem paga o ITBI, comprador ou vendedor?", a: "Por lei, o comprador, salvo acordo diferente no contrato." },
      { q: "O ITBI pode ser financiado?", a: "Não. O financiamento cobre só o imóvel. Separe perto de 5% do valor para ITBI e cartório." },
      { q: "Qual a alíquota do ITBI na minha cidade?", a: "Está na lei municipal, e muitas prefeituras mostram no site da guia. Em geral fica entre 2% e 3%." },
    ],
  },

  "quanto-preciso-ganhar": {
    tituloSeo: "Renda para financiar imóvel de 300 mil (e outros valores)",
    h1: "Quanto preciso ganhar? A renda para financiar imóvel de 300 mil e outros valores",
    descricao: "A renda para financiar imóvel de 300 mil, 500 mil e até 1 milhão em 2026, com parcela, entrada e linha de crédito, pelas regras da Caixa.",
    resposta: `Para financiar um **imóvel de 300 mil**, a renda bruta da família precisa ser de pelo menos **${brl(r300.renda)}** (${r300.programa.curto}, parcela de ${brl(r300.parcela)}): a parcela tem de caber em **30% da sua [renda bruta](g:renda-bruta)**. Na tabela, a renda para financiar cada valor, de R$ 150 mil a R$ 1 milhão, pelas regras da Caixa de 2026.`,
    secoes: [
      { titulo: "A tabela", blocos: [{ calculo: "renda-por-valor" }] },
      {
        titulo: "O que muda a conta",
        blocos: [
          {
            lista: [
              "**Idade:** depois dos 45, o prazo encurta e a renda precisa ser maior.",
              "**Outras parcelas:** diminuem o espaço para a casa. Veja [antes de financiar](#preparar-a-casa).",
              "**Comprar junto:** dá para somar rendas.",
              "**FGTS e entrada maior:** diminuem o valor financiado.",
            ],
          },
          { p: "Faça com os seus números no [simulador](#simulador)." },
        ],
      },
    ],
    faq: [{ q: "Posso somar a renda do meu parceiro?", a: "Sim. A renda familiar de quem compra junto é somada." }],
  },

  "calculadora-ganho-capital": {
    tituloSeo: "Calculadora de ganho de capital na venda de imóvel",
    h1: "Calculadora de ganho de capital na venda de imóvel",
    descricao: "Calcule o ganho de capital na venda do imóvel: o imposto de 15% sobre o lucro, o que entra no custo e as isenções mais comuns, em uma conta rápida.",
    resposta: "Informe quanto pagou, quanto gastou em reformas com nota e por quanto vai vender. A calculadora estima o **[ganho de capital](g:ganho-de-capital) do imóvel** — os **15% sobre o lucro** — e mostra as **isenções** mais comuns.",
    secoes: [
      { titulo: "Calcule", blocos: [{ calculo: "calculadora-ganho-capital" }] },
      { titulo: "Entenda as regras", blocos: [{ p: "As isenções e como pagar estão em [imposto na venda](#imposto-venda)." }] },
      {
        titulo: "Como o ganho de capital do imóvel é calculado",
        blocos: [
          {
            figura: {
              id: "lucro-da-venda",
              alt: "Como calcular o ganho de capital na venda de imóvel: do valor de venda tire o custo de compra e as reformas com nota; sobre o lucro incidem 15%",
              etiqueta: "Ganho de capital do imóvel",
              titulo: "O imposto é sobre o lucro,",
              destaque: "não sobre a venda.",
              esquema: {
                tipo: "divisao",
                total: "exemplo: venda por R$ 400 mil",
                partes: [
                  { rotulo: "custo de compra", valor: 250000, texto: "R$ 250 mil", tom: "planta" },
                  { rotulo: "reformas com nota fiscal", valor: 30000, texto: "R$ 30 mil", tom: "ink" },
                  { rotulo: "lucro: paga 15% (R$ 18 mil)", valor: 120000, texto: "R$ 120 mil", tom: "mark" },
                ],
              },
              legenda: "Exemplo simplificado, sem os fatores de redução por tempo de posse, que diminuem o imposto de quem tem o imóvel há anos.",
            },
          },
          {
            lista: [
              "**Custo de compra**: o valor pago na aquisição, como está na declaração do imposto de renda.",
              "**Reformas e ampliações** entram no custo **só com nota fiscal** ou recibo e declaradas.",
              "**Corretagem** paga pelo vendedor reduz o valor de venda considerado.",
              "Até R$ 5 milhões de lucro, a alíquota é de **15%**.",
            ],
          },
        ],
      },
    ],
    faq: [{ q: "A calculadora substitui o contador?", a: "Não. É uma estimativa simplificada, sem os fatores de redução por tempo de posse." },
      { q: "Reforma sem nota fiscal entra no custo?", a: "Não. Só entram gastos comprovados com nota ou recibo e informados na declaração." },
      { q: "Quando pago o imposto?", a: "Até o último dia útil do mês seguinte à venda, por DARF, gerado no programa de ganho de capital da Receita." },
    ],
  },
};
