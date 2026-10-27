import type { Texto } from "../tipos";

export const TEXTOS_PROGRAMAS: Record<string, Texto> = {
  "mcmv-faixas": {
    tituloSeo: "Faixas do Minha Casa Minha Vida 2026: renda, teto e juros",
    descricao: "As 4 faixas do Minha Casa Minha Vida em 2026: renda bruta familiar, valor máximo do imóvel e juros de cada uma, conferidos no simulador da Caixa.",
    resposta: "São **4 faixas pela renda bruta da família**: até R$ 3.200, até R$ 5.000, até R$ 9.600 e até R$ 13.000. Quanto menor a renda, **menores os juros**; nas faixas 1 e 2 pode haver subsídio.",
    secoes: [
      { titulo: "A tabela", blocos: [{ calculo: "faixas-mcmv" }] },
      {
        titulo: "Como ler",
        blocos: [
          {
            lista: [
              "A renda é a **[renda bruta](g:renda-bruta) familiar**: a soma de quem vai comprar junto.",
              "O teto é o valor máximo do imóvel em cada faixa. Nas faixas 1 e 2, ele muda conforme a cidade.",
              "Quem tem 3 anos de [FGTS](g:fgts) ganha desconto nos juros das faixas 1 a 3.",
              "Imóvel acima do teto sai do programa e vai para a linha de mercado ([SBPE](g:sbpe)), com juros maiores.",
            ],
          },
          { p: "Fontes: Portaria MCID 333/2026 (rendas) e Conselho Curador do FGTS (tetos). Juros conferidos no simulador da Caixa em outubro de 2026." },
        ],
      },
    ],
    faq: [
      { q: "Quem já tem imóvel pode entrar?", a: "Não. O programa é para quem não tem imóvel no nome." },
      { q: "Autônomo pode participar?", a: "Pode, comprovando a renda com extratos e declaração." },
    ],
  },

  "casa-verde-amarela": {
    tituloSeo: "Casa Verde e Amarela virou o quê? (agora é Minha Casa Minha Vida)",
    descricao: "O Casa Verde e Amarela foi substituído pelo Minha Casa Minha Vida em 2023. Veja o que mudou e as regras atuais.",
    resposta: "O **Casa Verde e Amarela acabou em 2023**: o programa voltou a se chamar [Minha Casa Minha Vida](#minha-casa-minha-vida), com novas faixas de renda e juros. Quem procura o nome antigo deve olhar as regras do MCMV.",
    secoes: [
      {
        titulo: "O que mudou",
        blocos: [
          {
            lista: [
              "O nome voltou a ser Minha Casa Minha Vida (Lei 14.620/2023).",
              "As faixas passaram a ser por renda bruta familiar, hoje em 4 faixas.",
              "Os limites de renda e de valor do imóvel são atualizados por portaria.",
            ],
          },
          { calculo: "faixas-mcmv" },
          { p: "Descubra em qual faixa você entra no [simulador do Minha Casa Minha Vida](#simulador-mcmv)." },
        ],
      },
    ],
    faq: [{ q: "Meu contrato do Casa Verde e Amarela muda?", a: "Não: contratos assinados seguem as condições que você assinou." }],
  },

  "simulador-mcmv": {
    tituloSeo: "Simulador do Minha Casa Minha Vida 2026",
    descricao: "Simule o Minha Casa Minha Vida com as regras de 2026: sua faixa, quanto pode financiar, a parcela e a entrada, em português claro.",
    resposta: "Responda umas 10 perguntas: o simulador descobre sua **faixa do Minha Casa Minha Vida**, quanto a Caixa empresta, a parcela e quanto falta de entrada — com as mesmas regras do simulador oficial.",
    secoes: [
      { titulo: "Simule agora", blocos: [{ calculo: "simulador" }] },
      { titulo: "As faixas usadas", blocos: [{ calculo: "faixas-mcmv" }] },
    ],
    faq: [{ q: "A simulação é aprovação?", a: "Não. É uma estimativa educativa com regras médias; a aprovação depende da análise do banco." }],
  },
};
