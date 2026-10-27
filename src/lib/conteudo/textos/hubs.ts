import type { NomeCalculo } from "../tipos";

/** Abertura de cada hub e, se houver, o cálculo que aparece antes da lista de páginas. */
export const HUBS_TEXTOS: Record<string, { intro: string; descricao: string; calculo?: NomeCalculo }> = {
  comprar: {
    intro:
      "A compra do primeiro imóvel tem uma ordem: saber quanto pode, arrumar a casa, aprovar o crédito, escolher, avaliar, assinar e registrar. Cada guia abaixo responde uma etapa e te leva à próxima.",
    descricao: "As etapas da compra do primeiro imóvel, em ordem: do quanto posso à chave, com guias em português claro.",
    calculo: "prazos",
  },
  "financiamento-imobiliario": {
    intro:
      "O banco empresta até 80% do valor do imóvel, a parcela pode ocupar até 30% da sua renda e o prazo vai até 35 anos. Aqui está o resto: juros, [SAC](g:sac) ou [PRICE](g:price), seguros, [TR](g:tr) e quanto custa no total.",
    descricao: "Como funciona o financiamento imobiliário: quanto o banco empresta, juros, SAC ou PRICE, seguros e custos, com números da Caixa.",
    calculo: "renda-por-valor",
  },
  "minha-casa-minha-vida": {
    intro:
      "O programa do governo tem juros menores para quem ganha menos e não tem imóvel no nome. A faixa depende da renda bruta da família, e cada faixa tem um teto de valor do imóvel.",
    descricao: "Minha Casa Minha Vida 2026: faixas de renda, teto do imóvel, juros e como entrar, conferidos no simulador da Caixa.",
    calculo: "faixas-mcmv",
  },
  "leilao-caixa": {
    intro:
      "A Caixa vende imóveis retomados por venda direta, licitação e leilão, muitas vezes abaixo do mercado. Dá para usar FGTS e financiamento em parte deles, mas o cuidado com edital, ocupação e dívidas é maior.",
    descricao: "Leilão e imóveis da Caixa: como funciona, como comprar, se dá para financiar e quando a conta da reforma fecha.",
  },
  vender: {
    intro:
      "Vender um usado é entender o comprador: quase todo mundo financia, e o banco dele vai avaliar o seu imóvel. Aqui estão documentos, preço, imóvel financiado, contrato e imposto.",
    descricao: "Como vender um imóvel usado: documentos, preço e avaliação do banco do comprador, imóvel financiado, contrato e imposto.",
  },
  atalhos: {
    intro: "Os links que todo mundo procura e ninguém acha de primeira — com o passo a passo e o que fazer com cada resultado.",
    descricao: "Atalhos para os sites difíceis: Registrato, saldo do FGTS, boleto da Caixa, certidão de matrícula e tempo de carteira.",
  },
  ferramentas: {
    intro: "Calculadoras que respondem com o seu número, usando as mesmas regras do simulador da Caixa.",
    descricao: "Ferramentas gratuitas: simulador de financiamento, simulador do Minha Casa Minha Vida, calculadora de ITBI e de imposto na venda.",
  },
};
