import { PARAMS } from "../../financiamento/params";
import type { Texto } from "../tipos";

const milP = (v: number) => `R$ ${Math.round(v / 1000)} mil`;

export const TEXTOS_PROGRAMAS: Record<string, Texto> = {
  "mcmv-faixas": {
    tituloSeo: "Faixas do Minha Casa Minha Vida 2026: renda, teto e juros",
    descricao: "As 4 faixas do Minha Casa Minha Vida em 2026: renda bruta familiar, valor máximo do imóvel e juros de cada uma, conferidos no simulador da Caixa.",
    resposta: "São **4 faixas pela renda bruta da família**: até R$ 3.200, até R$ 5.000, até R$ 9.600 e até R$ 13.000. Quanto menor a renda, **menores os juros**; nas faixas 1 e 2 pode haver subsídio.",
    secoes: [
      {
        titulo: "O teto do imóvel em cada faixa",
        blocos: [
          {
            figura: {
              id: "teto-por-faixa",
              alt: "Faixas do Minha Casa Minha Vida em 2026: valor máximo do imóvel em cada faixa de renda, de R$ 210 mil na faixa 1 a R$ 600 mil na faixa 4",
              etiqueta: "Faixas do Minha Casa Minha Vida",
              titulo: "Quanto maior a faixa,",
              destaque: "maior o teto do imóvel.",
              esquema: {
                tipo: "barras",
                itens: PARAMS.faixas.map((f) => ({
                  rotulo: `Faixa ${f.faixa} · até R$ ${f.rendaAte.toLocaleString("pt-BR")}`,
                  valor: f.tetoImovel,
                  texto: `imóvel até ${milP(f.tetoImovel)}${f.faixa <= 2 ? "*" : ""}`,
                  tom: "mark" as const,
                })),
              },
              legenda: "Renda bruta da família por mês. *Nas faixas 1 e 2 o teto vai de R$ 210 mil a R$ 275 mil conforme a cidade.",
            },
          },
        ],
      },
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
      { q: "Posso comprar um imóvel acima do teto da minha faixa?", a: "Pelo programa, não. Acima do teto, o financiamento vai para a linha de mercado, com juros maiores." },
    ],
  },

  "casa-verde-amarela": {
    tituloSeo: "Casa Verde e Amarela virou o quê? (agora é Minha Casa Minha Vida)",
    descricao: "O Casa Verde e Amarela foi substituído pelo Minha Casa Minha Vida em 2023. Veja o que mudou e as regras atuais.",
    resposta: "O **Casa Verde e Amarela acabou em 2023**: o programa voltou a se chamar [Minha Casa Minha Vida](#minha-casa-minha-vida), com novas faixas de renda e juros. Quem procura o nome antigo deve olhar as regras do MCMV.",
    secoes: [
      {
        titulo: "A linha do tempo do programa",
        blocos: [
          {
            figura: {
              id: "linha-do-tempo",
              alt: "Linha do tempo do programa habitacional: Minha Casa Minha Vida em 2009, Casa Verde e Amarela em 2021 e a volta do Minha Casa Minha Vida em 2023",
              etiqueta: "Casa Verde e Amarela",
              titulo: "O nome mudou duas vezes;",
              destaque: "hoje é Minha Casa Minha Vida.",
              esquema: {
                tipo: "linha",
                marcos: [
                  { rotulo: "2009", detalhe: "nasce o Minha Casa Minha Vida" },
                  { rotulo: "2021", detalhe: "vira Casa Verde e Amarela" },
                  { rotulo: "2023", detalhe: "volta o Minha Casa Minha Vida" },
                ],
                trechos: [
                  { rotulo: "Minha Casa Minha Vida", tom: "mark" },
                  { rotulo: "Casa Verde e Amarela", tom: "planta" },
                ],
              },
            },
          },
        ],
      },
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
          { p: "Descubra em qual faixa você entra no [simulador](#simulador)." },
        ],
      },
    ],
    faq: [{ q: "Meu contrato do Casa Verde e Amarela muda?", a: "Não: contratos assinados seguem as condições que você assinou." },
      { q: "Ainda dá para se inscrever no Casa Verde e Amarela?", a: "Não. Quem procura o programa hoje entra pelo Minha Casa Minha Vida, com as faixas de renda atuais." },
      { q: "O que acontece com quem comprou pelo Casa Verde e Amarela?", a: "Nada muda no contrato: ele segue com as condições assinadas." },
    ],
  },
};
