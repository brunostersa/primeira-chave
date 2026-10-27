import type { Texto } from "../tipos";

export const TEXTOS_FERRAMENTAS: Record<string, Texto> = {
  // Lido pela página própria do simulador (fora da rota única): regras e perguntas abaixo da ferramenta.
  simulador: {
    tituloSeo: "Simulador de financiamento Caixa e Minha Casa Minha Vida",
    descricao: "Simule o financiamento com as mesmas regras do simulador da Caixa (conferidas em 2026): sua faixa do Minha Casa Minha Vida, quanto pode financiar, a parcela e a entrada.",
    resposta: "Este simulador usa **as mesmas regras do simulador da Caixa**, conferidas em outubro de 2026 em seis perfis de renda — e explica cada número: por que essa faixa, de onde vem a parcela, quanto falta de [entrada](g:entrada).",
    secoes: [
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
    ],
    faq: [
      { q: "Este é o simulador oficial da Caixa?", a: "Não. É um simulador independente e educativo que reproduz as regras da Caixa. A simulação oficial e a aprovação são feitas pelo banco." },
      { q: "Por que meu resultado é diferente no banco?", a: "O banco considera seu histórico, a avaliação real do imóvel, a TR e os seguros da apólice. Aqui usamos as regras médias." },
      { q: "Serve para o Minha Casa Minha Vida?", a: "Sim. O simulador descobre sua faixa pela renda e já usa os juros e o teto de imóvel dela." },
      { q: "A simulação é aprovação?", a: "Não. É uma estimativa educativa; a aprovação depende da análise do banco." },
    ],
  },

  "calculadora-itbi": {
    tituloSeo: "Calculadora de ITBI: quanto você paga na compra do imóvel",
    descricao: "Calcule o ITBI da compra do imóvel com a alíquota da sua cidade, entenda a base de cálculo e quando pagar.",
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
    ],
    faq: [{ q: "Quem paga o ITBI, comprador ou vendedor?", a: "Por lei, o comprador, salvo acordo diferente no contrato." }],
  },

  "quanto-preciso-ganhar": {
    tituloSeo: "Quanto preciso ganhar para financiar um imóvel? Tabela 2026",
    descricao: "A renda mínima para financiar imóveis de R$ 150 mil a R$ 1 milhão, com parcela, entrada e linha, pelas regras da Caixa em 2026.",
    resposta: "Para financiar um imóvel, a parcela precisa caber em **30% da sua [renda bruta](g:renda-bruta)**. Na tabela, a renda mínima para cada valor, calculada com as regras da Caixa de 2026.",
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
    tituloSeo: "Calculadora de imposto na venda de imóvel (ganho de capital)",
    descricao: "Estime o imposto sobre o lucro na venda do imóvel (15%) e veja se você se encaixa em uma isenção.",
    resposta: "Informe quanto pagou, quanto gastou em reformas com nota e por quanto vai vender. A calculadora estima os **15% sobre o lucro** e mostra as **isenções** mais comuns.",
    secoes: [
      { titulo: "Calcule", blocos: [{ calculo: "calculadora-ganho-capital" }] },
      { titulo: "Entenda as regras", blocos: [{ p: "As isenções e como pagar estão em [imposto na venda](#imposto-venda)." }] },
    ],
    faq: [{ q: "A calculadora substitui o contador?", a: "Não. É uma estimativa simplificada, sem os fatores de redução por tempo de posse." }],
  },
};
