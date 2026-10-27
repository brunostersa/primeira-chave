import { PARAMS } from "../../financiamento/params";
import type { Figura } from "../tipos";

/**
 * Figuras das páginas escritas à mão (fora da rota única). Ficam aqui, como dados,
 * para entrarem no mesmo gerador de imagens, no teste e na capa das redes.
 */

const preco = 200_000;
const avaliacaoZero = preco / (PARAMS.mcmvLtv / 100);
const custos = (preco * (PARAMS.itbi + PARAMS.cartorio + PARAMS.avaliacao)) / 100;
const mil = (v: number) => `R$ ${Math.round(v / 1000)} mil`;

export const FIGURAS_PROPRIAS: Record<string, Figura[]> = {
  "sem-entrada-casa": [
    {
      id: "avaliacao-muda-tudo",
      alt: "Como financiar casa sem entrada: com a avaliação igual ao preço você paga 20% de entrada; com a avaliação 25% acima, o banco financia o preço inteiro",
      etiqueta: "Financiar casa sem entrada",
      titulo: "A mesma casa,",
      destaque: "duas avaliações.",
      esquema: {
        tipo: "comparar",
        colunas: [
          { titulo: `Avaliada em ${mil(preco)}`, tom: "planta", itens: [`Banco financia ${mil(preco * 0.8)}`, `Entrada de ${mil(preco * 0.2)}`, `Mais ${mil(custos)} de ITBI e cartório`] },
          { titulo: `Avaliada em ${mil(avaliacaoZero)}`, tom: "mark", itens: [`Banco financia ${mil(preco)}`, "Entrada zero", `Só ${mil(custos)} de ITBI e cartório`] },
        ],
      },
      legenda: `Casa de ${mil(preco)}. O banco empresta até ${PARAMS.mcmvLtv}% da avaliação, sem passar do preço.`,
    },
    {
      id: "regra-dos-125",
      alt: "A regra para financiar casa sem entrada em números: avaliação de 125% do preço, banco empresta 80% da avaliação, entrada zero e cerca de 5% de custos",
      etiqueta: "A regra da avaliação",
      titulo: "Quatro números",
      destaque: "do segredo.",
      esquema: {
        tipo: "numeros",
        itens: [
          { valor: "125%", rotulo: "do preço é a avaliação mínima para zerar a entrada", tom: "mark" },
          { valor: `${PARAMS.mcmvLtv}%`, rotulo: "da avaliação é o máximo que o banco empresta" },
          { valor: "R$ 0", rotulo: "de entrada quando 80% da avaliação cobre o preço" },
          { valor: `~${PARAMS.itbi + PARAMS.cartorio + PARAMS.avaliacao}%`, rotulo: "do preço para ITBI e cartório, do seu bolso" },
        ],
      },
    },
  ],
};
