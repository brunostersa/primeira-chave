import type { Texto } from "../tipos";

export const TEXTOS_COMPRAR: Record<string, Texto> = {
  "preparar-a-casa": {
    tituloSeo: "Antes de financiar um imóvel: o que arrumar primeiro",
    descricao: "Nome limpo, dívidas, reserva e FGTS: o que deixar em ordem antes de pedir o financiamento, para o banco aprovar e você não se apertar.",
    resposta:
      "Quatro coisas, nesta ordem: **nome limpo**, **parcelas atuais sob controle** (elas comem o espaço da parcela da casa), **dinheiro para entrada e custos** (perto de 25% do imóvel) e **saber se o FGTS pode entrar**.",
    secoes: [
      {
        titulo: "1. Confira seu CPF",
        blocos: [
          { p: "Com restrição no nome, o banco recusa o crédito mesmo com renda boa. Consulte de graça no [Registrato, do Banco Central](#registrato), que mostra todas as dívidas em seu nome, e nos birôs de crédito." },
          { aviso: { titulo: "Achou dívida esquecida?", texto: "Negocie e guarde o comprovante de quitação. O [score](g:score) não sobe na hora, mas a restrição sai em até 5 dias úteis depois do pagamento." } },
        ],
      },
      {
        titulo: "2. Olhe as parcelas que você já paga",
        blocos: [
          { p: "O banco aceita até 30% da [renda bruta](g:renda-bruta) para todas as parcelas somadas. Carro, consignado e cartão parcelado entram nessa conta." },
          { p: "Por isso, quitar uma parcela pequena antes de financiar pode liberar dezenas de milhares de reais em empréstimo. O [simulador](#simulador) mostra quanto." },
        ],
      },
      {
        titulo: "3. Junte para a entrada e os custos",
        blocos: [
          { p: "A [entrada](g:entrada) é em geral 20% do imóvel. Os custos de [ITBI](g:itbi), cartório e taxas somam mais uns 5%:" },
          { calculo: "custos-da-compra" },
          { p: "Existe um caminho com entrada menor: [imóvel avaliado acima do preço](#sem-entrada-casa)." },
        ],
      },
      {
        titulo: "4. Veja se o FGTS entra",
        blocos: [
          { p: "Com 3 anos de carteira somados e sem imóvel no nome, o FGTS pode pagar parte da entrada. Veja o saldo no [app FGTS](#consultar-fgts) e o tempo na [Carteira de Trabalho Digital](#carteira-trabalho)." },
        ],
      },
    ],
    faq: [
      { q: "Preciso ter a entrada toda antes de começar?", a: "Não para pedir a aprovação de crédito. Mas antes de assinar, sim: entrada, ITBI e cartório precisam estar disponíveis." },
      { q: "Quanto tempo antes devo me organizar?", a: "O ideal é de 3 a 6 meses: tempo para limpar o nome, quitar parcelas pequenas e juntar a reserva." },
    ],
  },

  "usar-fgts-comprar": {
    tituloSeo: "Como usar o FGTS para comprar imóvel: regras e limites",
    descricao: "Quem pode usar o FGTS na compra do imóvel, em quê pode usar (e em quê não), e como o FGTS ajuda depois, abatendo a dívida.",
    resposta:
      "Pode usar quem tem **3 anos de carteira somados** e **não tem imóvel residencial** na cidade onde mora ou trabalha. Na compra, o FGTS entra **só na entrada**: não paga [ITBI](g:itbi) nem cartório.",
    secoes: [
      {
        titulo: "Quem pode",
        blocos: [
          {
            lista: [
              "Ter pelo menos **3 anos de trabalho com FGTS**, somando todos os empregos (não precisa ser seguido).",
              "Não ter imóvel residencial no município onde mora ou trabalha, nem financiamento ativo pelo Sistema Financeiro da Habitação.",
              "Comprar imóvel residencial urbano, para morar, na cidade onde trabalha ou mora.",
            ],
          },
        ],
      },
      {
        titulo: "Onde o FGTS entra",
        blocos: [
          {
            tabela: {
              cabecalho: ["Momento", "Pode usar?"],
              linhas: [
                ["Entrada", "Sim"],
                ["ITBI e cartório", "Não"],
                ["Abater ou quitar a dívida depois", "Sim, com intervalo entre os usos"],
                ["Pagar parte das parcelas", "Sim, até 80% da parcela por 12 meses"],
              ],
            },
          },
          { p: "Quem tem 3 anos de FGTS ainda ganha desconto nos juros do [Minha Casa Minha Vida](#minha-casa-minha-vida) nas faixas 1 a 3." },
        ],
      },
      {
        titulo: "Passo a passo",
        blocos: [
          {
            passos: [
              { titulo: "Veja o saldo", texto: "No [app FGTS](#consultar-fgts), com seu CPF." },
              { titulo: "Confira o tempo de carteira", texto: "Na [Carteira de Trabalho Digital](#carteira-trabalho)." },
              { titulo: "Avise o banco", texto: "O correspondente ou a agência pede a autorização do saque na hora do financiamento." },
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "Posso usar o FGTS de duas pessoas?", a: "Sim. Se os dois compram juntos e cumprem as regras, os dois saldos podem entrar." },
      { q: "Autônomo pode usar FGTS?", a: "Só se tiver saldo de empregos anteriores com carteira e cumprir os 3 anos somados." },
    ],
  },

  "documentos-financiamento": {
    tituloSeo: "Documentos para financiar imóvel na Caixa: checklist completo",
    descricao: "O checklist dos documentos do comprador, do vendedor e do imóvel para o financiamento na Caixa, com dica de como entregar tudo de uma vez.",
    resposta: "São três grupos: **seus documentos** (identidade, renda e imposto de renda), **os do vendedor** (identidade e estado civil) e **os do imóvel** (a [matrícula](g:matricula) atualizada). Entregue tudo de uma vez.",
    secoes: [
      {
        titulo: "Do comprador",
        blocos: [
          {
            lista: [
              "Documento de identidade com foto e CPF (de todos que vão compor a renda).",
              "Comprovante de estado civil (certidão de nascimento ou casamento).",
              "Comprovante de residência atual.",
              "Comprovante de renda: holerites recentes; autônomo, extratos e declaração.",
              "Última declaração de imposto de renda com o recibo (se retificou fora do prazo, leve as duas).",
              "Extrato do FGTS, se for usar.",
            ],
          },
        ],
      },
      {
        titulo: "Do vendedor",
        blocos: [
          {
            tabela: {
              cabecalho: ["Vendedor", "Documentos"],
              linhas: [
                ["Pessoa física", "Identidade, CPF e comprovante de estado civil"],
                ["Empresa", "Contrato social, certidão simplificada da Junta (até 180 dias) e documentos dos representantes"],
              ],
            },
          },
          { p: "Quem vende também precisa saber o que o banco vai pedir: veja [documentos para vender](#documentos-vender)." },
        ],
      },
      {
        titulo: "Do imóvel",
        blocos: [
          { p: "A certidão de inteiro teor da [matrícula](g:matricula), atualizada, com [ônus reais](g:onus) e ações. Tire online: [certidão de matrícula](#certidao-matricula)." },
          { aviso: { titulo: "Dica", texto: "Entregue **todos** os documentos de uma vez. Documento que chega aos poucos é o motivo número 1 de financiamento demorado." } },
        ],
      },
    ],
    faq: [
      { q: "Precisa de certidões negativas do vendedor?", a: "Depende do banco e do caso. É comum pedirem certidões de ações e de débitos para avaliar o risco do negócio." },
      { q: "Quanto tempo vale a certidão da matrícula?", a: "Em geral, os bancos aceitam certidões emitidas há até 30 dias." },
    ],
  },

  score: {
    tituloSeo: "Score para financiamento imobiliário: quanto precisa?",
    descricao: "Não existe score mínimo público para financiar imóvel. Veja o que o banco olha de verdade e como melhorar antes de pedir.",
    resposta: "Não existe um [score](g:score) mínimo divulgado. O banco olha a nota, mas pesa mais **nome sem restrição**, **parcelas atuais** e o seu **histórico no Banco Central**.",
    secoes: [
      {
        titulo: "O que o banco realmente olha",
        blocos: [
          {
            lista: [
              "Se há restrição no CPF (negativação, protesto).",
              "O quanto da renda já está comprometido com outras parcelas.",
              "O histórico de crédito no Sistema de Informações de Crédito do Banco Central, que você vê no [Registrato](#registrato).",
              "Relacionamento com o próprio banco: conta, salário, cartão.",
            ],
          },
        ],
      },
      {
        titulo: "Como melhorar antes de pedir",
        blocos: [
          {
            passos: [
              { titulo: "Quite ou negocie o que está atrasado", texto: "É o que mais pesa." },
              { titulo: "Pague tudo em dia por alguns meses", texto: "O histórico recente conta mais que o antigo." },
              { titulo: "Evite pedir crédito em vários lugares", texto: "Muitas consultas seguidas derrubam a nota." },
            ],
          },
        ],
      },
    ],
    faq: [
      { q: "Score baixo impede o financiamento?", a: "Não necessariamente. Nome limpo e renda suficiente costumam pesar mais que a nota." },
      { q: "Onde vejo meu score?", a: "Nos sites e apps dos birôs de crédito. As dívidas em bancos você vê no Registrato, de graça." },
    ],
  },

  "financiamento-negado": {
    tituloSeo: "Financiamento negado: por quê, o que fazer e quando tentar de novo",
    descricao: "Os motivos mais comuns de recusa do financiamento imobiliário, o que fazer em cada caso e quando faz sentido tentar novamente.",
    resposta: "Quase sempre é um destes: **restrição no nome**, **renda comprometida demais**, **renda difícil de comprovar** ou **problema no imóvel**. Descubra qual foi, resolva e tente de novo — não há prazo fixo de espera.",
    secoes: [
      {
        titulo: "Os motivos e o que fazer",
        blocos: [
          {
            tabela: {
              cabecalho: ["Motivo", "O que fazer"],
              linhas: [
                ["Restrição no CPF", "Negocie e quite; confira no [Registrato](#registrato)."],
                ["[Comprometimento de renda](g:comprometimento-de-renda) acima de 30%", "Quite parcelas pequenas ou some a renda de outra pessoa."],
                ["Renda informal sem comprovação", "Organize extratos, declare imposto de renda, formalize como MEI."],
                ["Imóvel com problema na documentação", "Peça a [matrícula](#certidao-matricula) e veja os [ônus](g:onus)."],
                ["Avaliação abaixo do preço", "Renegocie o preço ou cubra a diferença. Veja [avaliação do imóvel](#avaliacao-do-imovel)."],
              ],
            },
          },
        ],
      },
      {
        titulo: "Quando tentar de novo",
        blocos: [
          { p: "Assim que o motivo estiver resolvido. Pedir de novo sem mudar nada tende a dar o mesmo resultado — e várias consultas seguidas pesam no [score](#score)." },
          { p: "Refaça a conta no [simulador](#simulador) com os números novos antes de voltar ao banco." },
        ],
      },
    ],
    faq: [
      { q: "O banco é obrigado a dizer o motivo?", a: "Você pode perguntar ao gerente ou correspondente. Nem sempre o detalhe é informado, mas o tipo de problema costuma ser." },
      { q: "Posso tentar em outro banco?", a: "Sim. As regras de cada banco variam um pouco, mas restrição no nome barra em todos." },
    ],
  },

  "quanto-tempo-demora": {
    tituloSeo: "Quanto tempo demora o financiamento da Caixa?",
    descricao: "Os prazos de cada etapa do financiamento imobiliário, da aprovação de crédito ao registro, e o que atrasa (ou acelera) o processo.",
    resposta: "Do pedido à chave, **de 30 a 90 dias** em média. O que mais atrasa é documento que chega aos poucos e pendência na [matrícula](g:matricula) do imóvel.",
    secoes: [
      { titulo: "O prazo de cada etapa", blocos: [{ calculo: "prazos" }] },
      {
        titulo: "Como andar mais rápido",
        blocos: [
          {
            lista: [
              "Peça a aprovação de crédito antes de escolher o imóvel.",
              "Entregue [todos os documentos](#documentos-financiamento) de uma vez.",
              "Confira a [matrícula](#certidao-matricula) antes de fechar negócio.",
              "Tenha o dinheiro do [ITBI](g:itbi) pronto: o registro só sai depois dele.",
            ],
          },
        ],
      },
    ],
    faq: [{ q: "O vendedor recebe quando?", a: "Depois do registro do contrato no cartório, que precisa sair em até 30 dias da assinatura." }],
  },

  "sem-entrada-apartamento": {
    tituloSeo: "Dá pra financiar apartamento sem entrada? A regra da avaliação",
    descricao: "A regra é a mesma da casa: se o banco avaliar o apartamento 25% acima do preço, ele financia o valor inteiro. Veja a conta e os cuidados.",
    resposta: "Dá, pela mesma regra da casa: o banco empresta até 80% da [avaliação](g:avaliacao), sem passar do preço. Se a avaliação vier **25% acima do preço**, a [entrada](g:entrada) zera — mas ITBI e cartório continuam.",
    secoes: [
      {
        titulo: "A conta",
        blocos: [
          {
            tabela: {
              cabecalho: ["Apartamento de", "Avaliação mínima para entrada zero"],
              linhas: [
                ["R$ 180.000", "R$ 225.000"],
                ["R$ 240.000", "R$ 300.000"],
                ["R$ 320.000", "R$ 400.000"],
              ],
            },
          },
          { p: "O passo a passo completo, com a conta da renda, está no guia da [casa sem entrada](#sem-entrada-casa)." },
        ],
      },
      {
        titulo: "O que muda no apartamento",
        blocos: [
          {
            lista: [
              "**Condomínio** entra no seu orçamento, embora não na conta do banco.",
              "A avaliação considera o prédio: idade, conservação e documentação do condomínio.",
              "Apartamento na planta tem regra própria: o financiamento é com a construtora ou na obra.",
            ],
          },
          { aviso: { titulo: "Sem atalhos", texto: "Nunca declare ao banco um preço diferente do que você paga. O caminho legítimo é comprar um imóvel que vale mais do que custa.", tom: "bad" } },
        ],
      },
    ],
    faq: [{ q: "O condomínio entra nos 30% da renda?", a: "Não na conta do banco, mas entra no seu bolso todo mês. Faça a conta com ele." }],
  },

  "avaliacao-do-imovel": {
    tituloSeo: "Avaliação do imóvel pela Caixa: quem faz, quem paga e o que muda",
    descricao: "Como funciona a avaliação do imóvel no financiamento: quem faz, quem paga, quanto demora e o que acontece se vier abaixo ou acima do preço.",
    resposta: "Um engenheiro do banco vistoria o imóvel e dá o valor de [avaliação](g:avaliacao). **Quem compra paga a tarifa.** O banco empresta até 80% desse valor: abaixo do preço, você cobre a diferença; acima, a entrada diminui.",
    secoes: [
      {
        titulo: "Como funciona",
        blocos: [
          {
            passos: [
              { titulo: "Você paga a tarifa de avaliação", texto: "Cobrada pelo banco, conforme a tabela de tarifas dele." },
              { titulo: "O engenheiro vistoria", texto: "Mede, fotografa, compara com vendas parecidas na região." },
              { titulo: "Sai o laudo", texto: "Com o valor e eventuais problemas. Leva de 7 a 15 dias." },
            ],
          },
        ],
      },
      {
        titulo: "Abaixo ou acima do preço",
        blocos: [
          {
            tabela: {
              cabecalho: ["Imóvel de R$ 200 mil avaliado em", "O banco empresta", "Sua entrada"],
              linhas: [
                ["R$ 180.000 (abaixo)", "R$ 144.000", "R$ 56.000"],
                ["R$ 200.000 (igual)", "R$ 160.000", "R$ 40.000"],
                ["R$ 250.000 (25% acima)", "R$ 200.000", "R$ 0"],
              ],
            },
          },
          { p: "Avaliação acima do preço é o caminho do [financiamento sem entrada](#sem-entrada-casa)." },
        ],
      },
      {
        titulo: "Para quem vende",
        blocos: [{ p: "A avaliação do banco do comprador define até onde ele consegue pagar. Veja [vender para quem vai financiar](#vender-para-quem-financia)." }],
      },
    ],
    faq: [
      { q: "Posso contestar a avaliação?", a: "Pode pedir revisão com argumentos (vendas parecidas, reformas). Não há garantia de mudança." },
      { q: "A avaliação vale para sempre?", a: "Não. O laudo tem validade limitada; se o negócio demorar, pode ser preciso refazer." },
    ],
  },

  "registro-do-imovel": {
    tituloSeo: "Registro do imóvel, ITBI e chaves: o que acontece depois da assinatura",
    descricao: "Depois de assinar o contrato: pagar o ITBI, registrar no cartório em até 30 dias e receber as chaves. O passo a passo e os custos.",
    resposta: "Depois da assinatura você paga o [ITBI](g:itbi), leva o contrato ao Cartório de Registro de Imóveis (prazo de **30 dias**) e, com o [registro](g:registro) feito, o banco paga o vendedor e a chave é sua.",
    secoes: [
      {
        titulo: "O passo a passo",
        blocos: [
          {
            passos: [
              { titulo: "Pague o ITBI", texto: "Na prefeitura, sobre o maior valor entre o preço e o valor venal. Calcule na [calculadora de ITBI](#calculadora-itbi)." },
              { titulo: "Registre o contrato", texto: "No Cartório de Registro de Imóveis da região, em até 30 dias da assinatura." },
              { titulo: "O banco paga o vendedor", texto: "Depois de conferir o registro na matrícula." },
              { titulo: "Chaves", texto: "Combinadas com o vendedor, em geral após o pagamento." },
            ],
          },
        ],
      },
      {
        titulo: "Quanto custa",
        blocos: [
          { calculo: "custos-da-compra" },
          { p: "Primeiro imóvel financiado tem desconto nos emolumentos do cartório: veja [se você tem direito](#primeiro-imovel-desconto)." },
        ],
      },
    ],
    faq: [{ q: "Preciso de escritura?", a: "No financiamento bancário, o contrato do banco já tem força de escritura. O que falta é o registro." }],
  },

  "primeiro-imovel-desconto": {
    tituloSeo: "Primeiro imóvel tem desconto no registro e no ITBI?",
    descricao: "Quem compra o primeiro imóvel financiado tem 50% de desconto nos emolumentos de cartório. O ITBI depende da cidade. Veja as regras.",
    resposta: "**No cartório, sim:** a primeira aquisição residencial financiada pelo Sistema Financeiro da Habitação tem **50% de desconto** nos emolumentos (Lei 6.015/73, art. 290). **No ITBI, depende da cidade.**",
    secoes: [
      {
        titulo: "O desconto do cartório",
        blocos: [
          { p: "A Lei de Registros Públicos garante redução de 50% nos emolumentos de escritura e [registro](g:registro) para a primeira aquisição de imóvel residencial financiada pelo SFH." },
          { lista: ["Precisa ser o primeiro imóvel residencial.", "Precisa ser financiado pelo Sistema Financeiro da Habitação.", "Peça o desconto no cartório: ele não é automático em todo lugar."] },
          { p: "No [Minha Casa Minha Vida](#minha-casa-minha-vida), pode haver reduções próprias do programa." },
        ],
      },
      {
        titulo: "E o ITBI?",
        blocos: [
          { p: "O [ITBI](g:itbi) é municipal: cada prefeitura decide. Algumas cidades dão desconto ou isenção para imóveis do MCMV ou de valor baixo; outras não. Consulte o site da prefeitura e faça a conta na [calculadora de ITBI](#calculadora-itbi)." },
        ],
      },
    ],
    faq: [{ q: "Como provo que é meu primeiro imóvel?", a: "Com declaração no próprio contrato. O cartório pode consultar registros; declarar falsamente é crime." }],
  },

  "amortizar-fgts": {
    tituloSeo: "Como usar o FGTS para abater o financiamento",
    descricao: "Depois da compra, o FGTS pode abater ou quitar o financiamento, ou pagar parte das parcelas. Veja quando vale a pena e como pedir.",
    resposta: "Dá para usar o [FGTS](g:fgts) de três jeitos: **abater** parte do saldo, **quitar** tudo ou **pagar até 80% da parcela por 12 meses**. Abater no começo do contrato é o que mais economiza juros.",
    secoes: [
      {
        titulo: "Prazo menor ou parcela menor?",
        blocos: [
          { p: "Ao abater, você escolhe: reduzir o **prazo** (economiza mais juros) ou reduzir a **parcela** (alivia o mês)." },
          { calculo: "sac-x-price" },
          { p: "Repare quanto de juros você paga no total: cada real abatido no começo deixa de render juros por décadas." },
        ],
      },
      {
        titulo: "Como pedir",
        blocos: [
          {
            passos: [
              { titulo: "Confira o saldo", texto: "No [app FGTS](#consultar-fgts)." },
              { titulo: "Peça pelo app Habitação Caixa ou na agência", texto: "O pedido indica se é para abater, quitar ou pagar parcelas." },
              { titulo: "Respeite o intervalo", texto: "Há um intervalo mínimo entre usos do FGTS no mesmo contrato." },
            ],
          },
        ],
      },
    ],
    faq: [{ q: "Vale mais abater ou deixar o FGTS rendendo?", a: "Em geral, abater: os juros do financiamento costumam ser bem maiores que o rendimento do FGTS." }],
  },
};
