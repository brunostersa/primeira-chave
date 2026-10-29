import type { TextoTermo } from "../tipos";

/** Explicação completa de cada termo (a frase curta fica em arvore.ts). */
export const GLOSSARIO_TEXTOS: Record<string, TextoTermo> = {
  avaliacao: {
    explicacao: [
      "Antes de liberar o dinheiro, o banco manda um engenheiro vistoriar o imóvel. Ele compara com vendas parecidas na região, olha estado, tamanho e documentação, e chega a um valor: a **avaliação**.",
      "O banco empresta sobre esse valor, não sobre o preço que você combinou. Por isso a avaliação pode aumentar ou diminuir o quanto você precisa de [entrada](g:entrada).",
    ],
    exemplo: "Casa de R$ 200 mil avaliada em R$ 180 mil: o banco empresta 80% de R$ 180 mil (R$ 144 mil), e você cobre R$ 56 mil em vez de R$ 40 mil.",
    cuidado: "Peça a avaliação antes de pagar qualquer sinal. Veja [o guia da avaliação](#avaliacao-do-imovel).",
  },
  entrada: {
    explicacao: [
      "É a parte do preço que o banco não financia. Em geral, 20% do imóvel, que sai do seu dinheiro guardado ou do [FGTS](g:fgts).",
      "A entrada não inclui os custos da compra: [ITBI](g:itbi), cartório e taxas são à parte, perto de 5% do imóvel.",
    ],
    exemplo: "Imóvel de R$ 250 mil: entrada de R$ 50 mil + uns R$ 12,5 mil de custos.",
    cuidado: "Existe um caso em que a entrada zera: quando a avaliação vem 25% acima do preço. Veja [como funciona](#sem-entrada-casa).",
  },
  "cota-de-financiamento": {
    explicacao: [
      "É o percentual do imóvel que o banco aceita financiar. Na Caixa, até 80% da [avaliação](g:avaliacao), tanto no Minha Casa Minha Vida quanto na linha de mercado ([SBPE](g:sbpe)).",
      "Os bancos também limitam o empréstimo ao preço de venda: ninguém financia mais do que você vai pagar.",
    ],
    exemplo: "Avaliação de R$ 300 mil e preço de R$ 280 mil: o banco empresta até R$ 240 mil (80% da avaliação), que é menos que o preço.",
  },
  "renda-bruta": {
    explicacao: [
      "É o que você ganha antes dos descontos de INSS e imposto: o valor \"cheio\" do holerite. É a renda que o banco usa para calcular a parcela.",
      "Autônomos comprovam pela média do que entra, com extratos e declaração de imposto de renda. Dá para somar a renda de mais de uma pessoa.",
    ],
  },
  "comprometimento-de-renda": {
    explicacao: [
      "É a fatia da [renda bruta](g:renda-bruta) que a parcela pode ocupar. Na Caixa, até 30%.",
      "Outras parcelas que você já paga (carro, empréstimo, cartão parcelado) entram nessa conta e diminuem o espaço para a casa.",
    ],
    exemplo: "Renda de R$ 6.000: parcela de até R$ 1.800. Se você paga R$ 500 de carro, sobram R$ 1.300 para o imóvel.",
  },
  itbi: {
    explicacao: [
      "Imposto sobre Transmissão de Bens Imóveis. A prefeitura cobra quando o imóvel muda de dono. A alíquota varia por cidade, em geral entre 2% e 3%.",
      "A base é o maior valor entre o preço do negócio e o valor que a prefeitura atribui ao imóvel.",
    ],
    cuidado: "O FGTS não paga o ITBI. Calcule o valor na [calculadora de ITBI](#calculadora-itbi).",
  },
  fgts: {
    explicacao: [
      "O Fundo de Garantia do Tempo de Serviço, que o empregador deposita todo mês para quem tem carteira assinada.",
      "Na compra, pode virar parte da [entrada](g:entrada) — se você tiver 3 anos de carteira somados e nenhum imóvel no nome. Depois da compra, pode abater a dívida e pagar parte das parcelas.",
    ],
    cuidado: "O FGTS não paga [ITBI](g:itbi) nem cartório. Veja [como usar o FGTS](#usar-fgts-comprar).",
  },
  mcmv: {
    explicacao: [
      "O Minha Casa Minha Vida é o programa habitacional do governo federal. Divide as famílias em faixas de renda; quanto menor a renda, menores os juros, e nas faixas 1 e 2 pode haver subsídio.",
      "Só entra quem não tem imóvel no nome. Os limites de renda e de valor do imóvel são atualizados por portaria.",
    ],
    cuidado: "Veja as faixas atualizadas em [Minha Casa Minha Vida](#minha-casa-minha-vida).",
  },
  sbpe: {
    explicacao: [
      "Sistema Brasileiro de Poupança e Empréstimo: a linha de mercado, com dinheiro da poupança. É para quem não entra no Minha Casa Minha Vida (renda maior ou já tem imóvel).",
      "Os juros são maiores que os do programa. Na Caixa, a simulação dessa linha usa o sistema [SAC](g:sac).",
    ],
  },
  tr: {
    explicacao: [
      "Taxa Referencial. Corrige o saldo da dívida todo mês, além dos juros. Por anos ficou perto de zero; com juros altos na economia, volta a pesar.",
      "Os simuladores costumam mostrar a parcela sem a TR. Na prática, ela faz o saldo e a parcela andarem um pouco para cima.",
    ],
  },
  sac: {
    explicacao: [
      "Sistema de Amortização Constante. Você abate a mesma parte da dívida todo mês, e os juros caem junto com o saldo. A parcela começa mais alta e vai diminuindo.",
      "No total, paga-se menos juros que na [PRICE](g:price). Mas a primeira parcela precisa caber em 30% da renda.",
    ],
    cuidado: "Compare os dois em [SAC ou PRICE](#sac-ou-price).",
  },
  price: {
    explicacao: [
      "Tabela Price: a parcela fica igual do começo ao fim (sem contar seguros e TR). No começo, quase tudo é juros; a dívida cai devagar.",
      "Como a primeira parcela é menor que a do [SAC](g:sac), dá para financiar um valor um pouco maior com a mesma renda.",
    ],
  },
  "mip-dfi": {
    explicacao: [
      "Dois seguros obrigatórios que vêm dentro da parcela. O **MIP** (morte e invalidez permanente) quita a dívida se quem paga falecer ou ficar inválido; cresce com a idade. O **DFI** (danos físicos ao imóvel) cobre incêndio, desabamento e afins.",
      "O valor depende da apólice do banco e não é tabelado publicamente; os simuladores estimam.",
    ],
  },
  matricula: {
    explicacao: [
      "É o \"RG\" do imóvel no Cartório de Registro de Imóveis: tem o número, a descrição, os donos ao longo do tempo e tudo o que pesa sobre ele.",
      "O banco exige a certidão de inteiro teor atualizada, com os [ônus reais](g:onus).",
    ],
    cuidado: "Veja [como tirar a certidão online](#certidao-matricula).",
  },
  onus: {
    explicacao: [
      "Tudo o que pesa sobre o imóvel e passa para o próximo dono: hipoteca, [alienação fiduciária](g:alienacao-fiduciaria), penhora, usufruto, ação na justiça.",
      "Aparecem na [matrícula](g:matricula). Imóvel com ônus pode ser vendido, mas o problema precisa ser resolvido antes ou no momento da venda.",
    ],
  },
  "alienacao-fiduciaria": {
    explicacao: [
      "No financiamento, o imóvel fica no nome do banco como garantia até você quitar. Você mora, usa e pode até vender (com a anuência do banco), mas a propriedade plena só vem no fim.",
      "Se a dívida não for paga, o banco pode retomar o imóvel por um processo mais rápido que o da hipoteca.",
    ],
  },
  escritura: {
    explicacao: [
      "O documento que formaliza a compra e venda, feito em cartório de notas. No financiamento bancário, o contrato do banco tem força de escritura pública e substitui esse passo.",
      "A compra só fica completa com o [registro](g:registro) na matrícula.",
    ],
  },
  registro: {
    explicacao: [
      "É quando o contrato entra na [matrícula](g:matricula) do imóvel, no Cartório de Registro de Imóveis. Só aí você é dono perante todos.",
      "No financiamento, o banco só paga o vendedor depois do registro, que precisa ser feito em até 30 dias da assinatura.",
    ],
  },
  score: {
    explicacao: [
      "Uma nota de 0 a 1000 que os birôs de crédito dão ao seu CPF, com base em pagamentos em dia, dívidas e consultas. O banco considera a nota, mas também o histórico no próprio banco e no Banco Central.",
      "Nome negativado costuma barrar o crédito, mesmo com renda suficiente.",
    ],
    cuidado: "Confira suas dívidas de graça no [Registrato](#registrato).",
  },
  "carta-de-credito": {
    explicacao: [
      "A aprovação do crédito antes de você escolher o imóvel: o banco analisa sua renda e CPF e diz até quanto empresta.",
      "Com ela na mão, você negocia com segurança e sabe o teto da busca. No consórcio, a carta de crédito é o valor que você recebe quando é contemplado.",
    ],
  },
  laudo: {
    explicacao: [
      "O documento em que o engenheiro do banco registra a [avaliação](g:avaliacao) do imóvel: valor, estado, área e eventuais problemas.",
      "Tem validade limitada. Se o negócio demorar, pode ser preciso refazer.",
    ],
  },
  "ganho-de-capital": {
    explicacao: [
      "É o lucro na venda de um imóvel: o preço de venda menos o que você pagou e o que gastou com reformas comprovadas. Sobre esse lucro, a pessoa física paga 15% de imposto (até R$ 5 milhões).",
      "Há isenções, como para quem vende o único imóvel por até R$ 440 mil ou usa o dinheiro para comprar outro residencial em até 180 dias.",
    ],
    cuidado: "Faça uma estimativa na [calculadora](#calculadora-ganho-capital) e confirme com um contador.",
  },
  leilao: {
    explicacao: [
      "Venda pública de imóveis, muitas vezes retomados de quem não pagou o financiamento. Os preços costumam ficar abaixo do mercado.",
      "Exige cuidado com o edital, a ocupação do imóvel, dívidas de IPTU e condomínio e a [matrícula](g:matricula).",
    ],
    cuidado: "Comece pelo [guia do leilão da Caixa](#leilao-caixa).",
  },
};
