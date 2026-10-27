import type { Rico } from "./tipos";

/**
 * "Duvide.": as frases que todo mundo repete na compra e venda de imóvel, com o veredito.
 * Cada carta vira página própria (/duvide/<id>/), card de post (1080x1350) e legenda
 * pronta para o corretor. Explicar o risco, nunca ensinar o atalho.
 */

export type Veredito = "armadilha" | "verdade" | "segredo";
export type Publico = "comprador" | "vendedor" | "corretor";

export type Carta = {
  /** Vira a URL: /duvide/<id>/ */
  id: string;
  veredito: Veredito;
  publico: Publico[];
  /** A frase que as pessoas repetem, entre aspas no card. */
  frase: string;
  /** A pergunta como as pessoas buscam (título da página). */
  pergunta: string;
  /** Uma ou duas linhas: o que cabe no card. */
  resumo: string;
  explicacao: Rico[];
  fazer: string[];
  /** Guia da árvore para continuar. */
  guia: string;
  /** Legenda sugerida para o post do corretor. */
  legenda: string;
};

export const VEREDITOS: Record<Veredito, { rotulo: string; frase: string }> = {
  armadilha: { rotulo: "Armadilha", frase: "Parece atalho, mas cobra caro." },
  verdade: { rotulo: "Verdade", frase: "É isso mesmo, e pouca gente usa." },
  segredo: { rotulo: "Segredo", frase: "O que quem é do ramo sabe." },
};

export const PUBLICOS: Record<Publico, string> = { comprador: "Quem compra", vendedor: "Quem vende", corretor: "Corretor" };

const RODAPE = "\n\nSalve para mostrar a quem vai comprar. Simule grátis em primeirachave.com.br";

export const CARTAS: Carta[] = [
  {
    id: "contrato-de-gaveta",
    veredito: "armadilha",
    publico: ["comprador", "vendedor", "corretor"],
    frase: "Contrato de gaveta é seguro, todo mundo faz.",
    pergunta: "Contrato de gaveta é seguro?",
    resumo: "O imóvel e a dívida continuam no nome de quem vendeu. Para o banco e para a Justiça, você não existe.",
    explicacao: [
      "No **contrato de gaveta**, alguém compra um imóvel financiado e passa a pagar as parcelas, mas o banco não fica sabendo. A [matrícula](g:matricula) continua no nome do vendedor, e o imóvel segue em [alienação fiduciária](g:alienacao-fiduciaria) para o banco.",
      "Os riscos são de quem comprou: se o vendedor morrer, o imóvel entra no **inventário** dele; se ele tiver dívidas, o imóvel pode ser **penhorado**; se agir de má-fé, pode **vender de novo**. E o seguro do financiamento cobre o vendedor, não você.",
      "Para quem vende, também é ruim: se o comprador parar de pagar, o nome sujo e a dívida são **seus**.",
    ],
    fazer: ["Transfira o financiamento com aprovação do banco, ou faça um novo financiamento no seu nome.", "Registre a compra na matrícula: só assim o imóvel é seu.", "Se já tem um contrato de gaveta, procure um advogado para regularizar."],
    guia: "vender-financiado",
    legenda: "Contrato de gaveta parece economia, mas o imóvel e a dívida continuam no nome de quem vendeu. Se o vendedor morrer, se endividar ou agir de má-fé, quem perde é você.\n\nO caminho seguro: transferir o financiamento com o banco, ou financiar no seu nome." + RODAPE,
  },
  {
    id: "agio",
    veredito: "armadilha",
    publico: ["comprador", "vendedor", "corretor"],
    frase: "No ágio, é só pagar a diferença e assumir as parcelas.",
    pergunta: "Comprar imóvel com ágio é seguro?",
    resumo: "Ágio só é seguro com a transferência aprovada pelo banco. Sem ela, é contrato de gaveta com outro nome.",
    explicacao: [
      "Na **venda com ágio**, o comprador paga ao vendedor o que ele já quitou do imóvel e passa a pagar o financiamento que falta. A conta pode ser boa, mas o contrato com o banco é do vendedor.",
      "Para o comprador **assumir a dívida**, o banco precisa aprovar: ele faz análise de crédito do comprador, como num financiamento novo. Sem essa aprovação, a transferência não vale para o banco, e o negócio vira um **contrato de gaveta**.",
    ],
    fazer: ["Peça ao vendedor o saldo devedor atualizado e as condições do contrato.", "Leve a proposta de transferência ao banco antes de pagar o ágio.", "Compare com um financiamento novo no seu nome: às vezes sai melhor."],
    guia: "vender-financiado",
    legenda: "Ágio: você paga ao vendedor o que ele já quitou e assume o resto do financiamento. Só é seguro com a transferência aprovada pelo banco. Sem isso, é contrato de gaveta com outro nome." + RODAPE,
  },
  {
    id: "preco-por-fora",
    veredito: "armadilha",
    publico: ["comprador", "vendedor", "corretor"],
    frase: "Declara um valor menor na escritura que paga menos imposto.",
    pergunta: "Declarar valor menor na escritura compensa?",
    resumo: "É sonegação, pode ser crime e ainda sai caro depois: quando você vender, o lucro tributado fica maior.",
    explicacao: [
      "Declarar na escritura um preço menor do que o pago reduz o [ITBI](g:itbi) e o imposto do vendedor, mas é **sonegação** e pode configurar **falsidade**. Se a prefeitura ou a Receita perceberem, cobram a diferença com multa.",
      "E tem um custo escondido: o valor declarado vira o **seu custo de compra**. Quando você vender, o [ganho de capital](g:ganho-de-capital) é calculado a partir dele. Pagar menos ITBI hoje costuma significar **mais imposto amanhã**.",
      "No financiamento, declarar ao banco um valor diferente do real é **fraude** e pode cancelar o contrato.",
    ],
    fazer: ["Declare o valor real, sempre.", "Se a prefeitura cobrar ITBI sobre valor acima do mercado, conteste pelo caminho administrativo.", "Faça a conta do ganho de capital antes de aceitar qualquer proposta de \"valor por fora\"."],
    guia: "imposto-venda",
    legenda: "\"Declara um valor menor que paga menos imposto.\" Além de ser sonegação, o valor declarado vira o seu custo de compra. Quando você vender, o lucro tributado fica maior. A economia de hoje vira imposto amanhã." + RODAPE,
  },
  {
    id: "avaliacao-acima-zera-entrada",
    veredito: "segredo",
    publico: ["comprador", "corretor"],
    frase: "Dá para financiar sem entrada, de forma legal.",
    pergunta: "Dá para financiar imóvel sem entrada?",
    resumo: "O banco empresta até 80% da avaliação, sem passar do preço. Avaliado 25% acima do preço, a entrada zera.",
    explicacao: [
      "O banco não empresta sobre o preço combinado: empresta até 80% da [avaliação](g:avaliacao) que o engenheiro dele faz, sem passar do preço de venda. Se o imóvel vale bem mais do que custa, 80% da avaliação cobre o preço inteiro.",
      "Isso acontece de verdade com imóvel abaixo do mercado: usado que precisava de reforma, venda com pressa, herança. O jeito legítimo é um só: **comprar um imóvel que vale mais do que custa** e deixar o laudo dizer quanto vale.",
    ],
    fazer: ["Procure imóveis abaixo do valor de mercado da região.", "Peça a avaliação do banco antes de pagar sinal.", "Separe perto de 5% para ITBI e cartório: eles não entram no financiamento."],
    guia: "sem-entrada-casa",
    legenda: "O segredo que pouca gente conta: o banco empresta até 80% da AVALIAÇÃO, sem passar do preço. Se o imóvel for avaliado 25% acima do preço, ele financia o preço inteiro. Entrada zero, dentro da regra." + RODAPE,
  },
  {
    id: "quitar-parcela-pequena",
    veredito: "segredo",
    publico: ["comprador", "corretor"],
    frase: "Quitar uma parcela pequena aumenta o financiamento.",
    pergunta: "Quitar dívidas aumenta o valor do financiamento?",
    resumo: "Cada parcela que você paga sai dos 30% da renda. Quitar uma de R$ 300 pode liberar dezenas de milhares no crédito.",
    explicacao: [
      "A parcela da casa precisa caber em **30% da [renda bruta](g:renda-bruta)**, já descontadas as outras parcelas que você paga: carro, empréstimo, cartão parcelado.",
      "Por isso, uma parcela pequena pesa muito. Em 35 anos, cada R$ 100 de parcela a menos vira um bom pedaço de crédito a mais. Às vezes vale quitar o empréstimo antes de pedir o financiamento.",
    ],
    fazer: ["Veja todas as suas parcelas no Registrato.", "Simule com e sem a parcela para ver a diferença.", "Quite antes de pedir a aprovação de crédito, não depois."],
    guia: "preparar-a-casa",
    legenda: "Sabia que quitar uma parcela pequena pode aumentar muito o seu financiamento? A parcela da casa tem que caber em 30% da renda, já tirando as outras. Uma parcela a menos libera espaço para a casa." + RODAPE,
  },
  {
    id: "sinal-garante",
    veredito: "armadilha",
    publico: ["comprador", "vendedor", "corretor"],
    frase: "Paguei o sinal, o negócio está garantido.",
    pergunta: "O sinal garante a compra do imóvel?",
    resumo: "O sinal prende os dois ao negócio. Se o banco negar o crédito e o contrato não disser nada, você pode perder o dinheiro.",
    explicacao: [
      "Pelo Código Civil, em regra, **quem desiste perde o sinal**, e se for o vendedor, devolve em dobro. O problema é quando ninguém desiste, mas o **banco nega o crédito** ou a **avaliação vem abaixo do preço**.",
      "Se o contrato não disser o que acontece nesses casos, a discussão vira briga. A cláusula do financiamento negado é a que mais protege o comprador.",
    ],
    fazer: ["Peça a aprovação de crédito e a avaliação antes do sinal.", "Escreva no contrato o que acontece com o sinal se o banco negar.", "Pague o sinal de forma rastreável, nunca em dinheiro vivo sem recibo."],
    guia: "contrato-compra-venda",
    legenda: "Sinal não é garantia de negócio fechado. Se o banco negar o crédito e o contrato não disser nada, a discussão sobre o dinheiro vira briga. Antes do sinal: crédito aprovado, avaliação feita e cláusula escrita." + RODAPE,
  },
  {
    id: "banco-avaliou-esta-ok",
    veredito: "armadilha",
    publico: ["comprador"],
    frase: "Se o banco avaliou, o imóvel está em ordem.",
    pergunta: "A avaliação do banco é uma vistoria completa?",
    resumo: "A avaliação diz quanto o imóvel vale como garantia. Não é vistoria de defeitos nem confere toda a documentação por você.",
    explicacao: [
      "O engenheiro do banco olha o imóvel para dizer **quanto ele vale como garantia** do empréstimo. Não é uma vistoria técnica completa: infiltração escondida, instalação elétrica velha e problema de vizinhança podem passar.",
      "A documentação também é sua responsabilidade: [matrícula](#certidao-matricula), dívidas de condomínio e IPTU, ações contra o vendedor.",
    ],
    fazer: ["Visite em dia de chuva e em horários diferentes.", "Leve alguém de confiança para olhar instalações e estrutura.", "Confira a matrícula e peça declaração de que não há dívida de condomínio."],
    guia: "avaliacao-do-imovel",
    legenda: "\"O banco avaliou, então está tudo certo.\" Não é bem assim: a avaliação diz quanto o imóvel vale como garantia, não procura defeito escondido. Vistoria e documentação continuam por sua conta." + RODAPE,
  },
  {
    id: "leilao-sempre-barato",
    veredito: "armadilha",
    publico: ["comprador", "corretor"],
    frase: "Imóvel de leilão é sempre negócio da China.",
    pergunta: "Imóvel de leilão vale a pena?",
    resumo: "O desconto é sobre uma avaliação que pode não valer. Ocupação, dívidas e reforma comem a vantagem se você não fizer a conta.",
    explicacao: [
      "O anúncio mostra um desconto grande, mas sobre a **avaliação de quem vende**, que pode estar desatualizada. O imóvel pode estar **ocupado**, ter **dívidas** de condomínio e IPTU e precisar de **reforma** que só aparece depois.",
      "Quem ganha dinheiro com leilão faz a conta de trás para frente: começa pelo valor de venda do imóvel pronto e desconta tudo. O que sobra é o teto do lance.",
    ],
    fazer: ["Leia o edital inteiro: quem paga as dívidas e em quanto tempo.", "Calcule o teto do lance a partir do valor de mercado, não do desconto.", "Deixe uma folga de 20% para imprevistos."],
    guia: "como-comprar-leilao",
    legenda: "Leilão pode ser ótimo negócio, mas o desconto do anúncio engana. Ele é sobre uma avaliação que pode não valer. A conta certa começa pelo valor de mercado e desconta reforma, dívidas, desocupação e custos." + RODAPE,
  },
  {
    id: "planta-preco-fechado",
    veredito: "armadilha",
    publico: ["comprador"],
    frase: "Na planta, o preço que assinei é o que vou pagar.",
    pergunta: "Imóvel na planta tem preço fechado?",
    resumo: "Durante a obra, o saldo costuma ser corrigido pelo INCC. O valor a financiar na entrega pode ser bem maior.",
    explicacao: [
      "Na compra na planta, você paga parcelas à construtora durante a obra e financia o saldo na entrega. Esse saldo costuma ser **corrigido pelo INCC**, o índice do custo da construção, mês a mês.",
      "Em obras longas, a correção pode fazer o saldo crescer bastante, e a renda precisa aguentar o financiamento maior na entrega.",
    ],
    fazer: ["Leia no contrato o índice, a periodicidade da correção e o prazo de entrega.", "Simule o financiamento com o saldo corrigido, não com o original.", "Guarde os boletos: eles mostram se o reajuste está de acordo com o contrato."],
    guia: "como-financiar-apartamento",
    legenda: "Comprou na planta? O saldo que você vai financiar na entrega costuma ser corrigido pelo INCC durante a obra. Simule com o valor corrigido, não com o do contrato." + RODAPE,
  },
  {
    id: "anuncio-alto",
    veredito: "armadilha",
    publico: ["vendedor", "corretor"],
    frase: "Anuncio alto, que sempre dá para negociar para baixo.",
    pergunta: "Anunciar o imóvel acima do mercado ajuda a vender?",
    resumo: "Quem compra financia, e o banco dele avalia. Preço acima da avaliação pede entrada maior e o negócio trava.",
    explicacao: [
      "Quase todo comprador financia, e o banco empresta sobre a [avaliação](g:avaliacao). Se o preço passa dela, o comprador precisa cobrir a diferença do bolso, e muitos não têm.",
      "Imóvel anunciado muito acima do mercado também fica parado, e anúncio parado vira sinal de problema para quem procura.",
    ],
    fazer: ["Pesquise vendas reais, não anúncios.", "Pense no preço que cabe na avaliação do banco do comprador.", "Tenha a documentação pronta: ela pesa tanto quanto o preço."],
    guia: "vender-para-quem-financia",
    legenda: "Anunciar alto para negociar depois costuma travar a venda. Quem compra financia, e o banco empresta sobre a avaliação. Preço acima dela pede entrada maior, e a maioria não tem." + RODAPE,
  },
  {
    id: "recebo-na-assinatura",
    veredito: "armadilha",
    publico: ["vendedor"],
    frase: "Assinou o contrato, o dinheiro cai na conta.",
    pergunta: "Quando o vendedor recebe no financiamento?",
    resumo: "No financiamento, o banco só paga o vendedor depois do registro no cartório, em geral até 30 dias após a assinatura.",
    explicacao: [
      "Na venda financiada, o dinheiro do banco é liberado **depois que o contrato é registrado** na matrícula do imóvel. O [ITBI](g:itbi) precisa ser pago antes do registro.",
      "Por isso, combinar a entrega das chaves ou a mudança para o dia da assinatura pode deixar o vendedor sem o dinheiro e sem o imóvel por algumas semanas.",
    ],
    fazer: ["Combine a entrega das chaves para depois da liberação.", "Acompanhe o pagamento do ITBI e o registro.", "Se você também vai comprar outro imóvel, conte com esse prazo."],
    guia: "registro-do-imovel",
    legenda: "Vendedor: no financiamento, o dinheiro não cai na assinatura. O banco paga depois do registro no cartório, em geral até 30 dias depois. Combine a entrega das chaves pensando nisso." + RODAPE,
  },
  {
    id: "reinvestir-isenta",
    veredito: "armadilha",
    publico: ["vendedor"],
    frase: "Se eu reinvestir o dinheiro, não pago imposto.",
    pergunta: "Reinvestir o dinheiro da venda isenta do imposto?",
    resumo: "Só isenta se o dinheiro for para comprar outro imóvel residencial em até 180 dias. Aplicação, carro ou terreno não contam.",
    explicacao: [
      "A isenção do [ganho de capital](g:ganho-de-capital) por reinvestimento tem regra: o dinheiro da venda precisa ir para a **compra de outro imóvel residencial** em até **180 dias**.",
      "Aplicar no banco, comprar terreno, carro ou imóvel comercial não isenta. E a isenção é proporcional ao que for usado na nova compra.",
    ],
    fazer: ["Planeje a nova compra antes de vender.", "Guarde os comprovantes das duas operações.", "Confirme o seu caso com um contador."],
    guia: "imposto-venda",
    legenda: "\"Se reinvestir, não paga imposto.\" Só vale se o dinheiro da venda for para comprar outro imóvel residencial em até 180 dias. Aplicação, carro ou terreno não contam." + RODAPE,
  },
  {
    id: "cobram-para-aprovar",
    veredito: "armadilha",
    publico: ["comprador", "corretor"],
    frase: "Paga uma taxa que eu aprovo o seu financiamento.",
    pergunta: "Pode cobrar para aprovar financiamento?",
    resumo: "Ninguém aprova crédito por fora do banco. Cobrança antecipada para \"liberar\" financiamento é sinal de golpe.",
    explicacao: [
      "Quem aprova o financiamento é o banco, depois da análise de crédito. O correspondente bancário é remunerado pelo banco e não precisa cobrar do cliente para encaminhar o pedido.",
      "Promessa de aprovação garantida, \"limpar o nome\" ou pagamento antecipado para liberar crédito são os sinais mais comuns de golpe.",
    ],
    fazer: ["Não pague nada antecipado para aprovar crédito.", "Confira se o correspondente é credenciado no banco.", "Desconfie de aprovação garantida."],
    guia: "documentos-financiamento",
    legenda: "Ninguém aprova financiamento por fora do banco. Cobrança antecipada para \"liberar\" crédito é o golpe mais comum de quem está tentando comprar o primeiro imóvel." + RODAPE,
  },
  {
    id: "score-alto-aprova",
    veredito: "armadilha",
    publico: ["comprador", "corretor"],
    frase: "Score alto é financiamento aprovado.",
    pergunta: "Score alto garante a aprovação do financiamento?",
    resumo: "O banco pesa mais renda, parcelas atuais e atrasos do que a nota. Score alto com renda apertada não aprova.",
    explicacao: [
      "O [score](g:score) ajuda, mas não é ele que decide. O banco olha se a parcela cabe em 30% da renda, se você tem atrasos e o que já deve, banco a banco, no sistema do Banco Central.",
      "Dá para ter nota alta e crédito negado por renda comprometida, e nota média com crédito aprovado por ter as contas em dia.",
    ],
    fazer: ["Veja o seu Registrato antes do score.", "Some as parcelas que você já paga.", "Simule com a renda real, não com a desejada."],
    guia: "score",
    legenda: "Score alto não é aprovação garantida. O banco pesa mais a renda, as parcelas que você já paga e os atrasos. Antes de olhar a nota, olhe o Registrato." + RODAPE,
  },
  {
    id: "fgts-qualquer-imovel",
    veredito: "armadilha",
    publico: ["comprador"],
    frase: "Com FGTS, dá para comprar qualquer imóvel.",
    pergunta: "Posso usar o FGTS em qualquer imóvel?",
    resumo: "Só em imóvel residencial para morar, com 3 anos de FGTS e sem outro imóvel na cidade. E nunca no ITBI nem no cartório.",
    explicacao: [
      "O [FGTS](g:fgts) entra na compra com regras: **3 anos** de trabalho com carteira assinada (somando empregos), **não ter imóvel residencial** na cidade onde mora ou trabalha e comprar **imóvel residencial para morar**.",
      "E ele não paga [ITBI](g:itbi) nem cartório: esses custos saem do seu bolso.",
    ],
    fazer: ["Some o seu tempo de carteira.", "Veja o saldo no app FGTS.", "Separe o dinheiro de ITBI e cartório à parte."],
    guia: "usar-fgts-comprar",
    legenda: "FGTS não compra qualquer imóvel: precisa ser residencial, para morar, com 3 anos de carteira e sem outro imóvel na cidade. E ele não paga ITBI nem cartório." + RODAPE,
  },
  {
    id: "aprovado-fechado",
    veredito: "armadilha",
    publico: ["corretor"],
    frase: "Cliente com crédito aprovado é venda fechada.",
    pergunta: "Crédito aprovado garante a compra do imóvel?",
    resumo: "A aprovação diz quanto o cliente pode pegar. Ainda faltam a avaliação do imóvel e a documentação do vendedor.",
    explicacao: [
      "A aprovação de crédito é sobre o **comprador**. O imóvel ainda passa pela [avaliação](g:avaliacao) e pela análise de documentos: se a avaliação vier abaixo do preço ou a matrícula tiver pendência, o negócio trava.",
      "A aprovação também tem validade. Se o imóvel demora a aparecer, o cliente pode precisar refazer a análise.",
    ],
    fazer: ["Peça a matrícula do imóvel antes de levar o cliente.", "Confira se o preço cabe na avaliação provável.", "Acompanhe a validade da aprovação de crédito."],
    guia: "quanto-tempo-demora",
    legenda: "Corretor: crédito aprovado não é venda fechada. Ainda faltam a avaliação do imóvel e a documentação do vendedor. Matrícula limpa e preço que cabe na avaliação fecham mais negócios." + RODAPE,
  },
];

export const cartaPorId = (id: string) => CARTAS.find((c) => c.id === id);
