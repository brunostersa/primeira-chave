import type { Texto } from "../tipos";

export const TEXTOS_ATALHOS: Record<string, Texto> = {
  registrato: {
    tituloSeo: "Registrato: como consultar seu CPF no Banco Central (grátis)",
    descricao: "Como entrar no Registrato do Banco Central, ver todas as dívidas e contas no seu CPF e o que fazer com o relatório antes de financiar.",
    resposta: "O Registrato é o serviço **gratuito do Banco Central** que mostra **todas as dívidas, empréstimos e contas** no seu CPF. Entre com a conta **gov.br** em [bcb.gov.br/registrato](https://www.bcb.gov.br/cidadaniafinanceira/registrato).",
    secoes: [
      {
        titulo: "Passo a passo",
        blocos: [
          {
            passos: [
              { titulo: "Abra o Registrato", texto: "No site do [Banco Central](https://www.bcb.gov.br/cidadaniafinanceira/registrato)." },
              { titulo: "Entre com o gov.br", texto: "Contas nível prata ou ouro acessam direto." },
              { titulo: "Peça o relatório de empréstimos e financiamentos", texto: "Ele mostra o que você deve em cada banco, mês a mês." },
            ],
          },
        ],
      },
      {
        titulo: "O que fazer com o relatório",
        blocos: [
          {
            lista: [
              "**Dívida em atraso?** Negocie antes de pedir o financiamento: é o que mais barra o crédito.",
              "**Parcelas em dia?** Some todas: elas entram no limite de 30% da renda. Veja [antes de financiar](#preparar-a-casa).",
              "**Algo que você não reconhece?** Conteste com o banco que informou.",
            ],
          },
          { p: "Depois, refaça a conta no [simulador](#simulador)." },
        ],
      },
      {
        titulo: "Os relatórios do Registrato",
        blocos: [
          {
            figura: {
              id: "como-acessar",
              alt: "Como acessar o Registrato do Banco Central em quatro passos: conta gov.br prata ou ouro, site do BC, relatório de empréstimos e soma das parcelas",
              etiqueta: "Registrato, passo a passo",
              titulo: "Seu CPF no Banco Central",
              destaque: "em 4 passos.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Conta gov.br", texto: "Nível prata ou ouro. É o mesmo login dos serviços do governo." },
                  { titulo: "Site do BC", texto: "Entre no Registrato pelo site oficial do Banco Central." },
                  { titulo: "Empréstimos", texto: "Peça o relatório de empréstimos e financiamentos." },
                  { titulo: "Some as parcelas", texto: "Elas entram no limite de 30% da renda do financiamento." },
                ],
              },
              legenda: "O Registrato é gratuito. Ninguém precisa cobrar para tirar o relatório para você.",
            },
          },
          {
            lista: [
              "**Empréstimos e financiamentos**: o que você deve em cada banco, mês a mês, separado em a vencer, vencido e prejuízo.",
              "**Contas e relacionamentos**: os bancos e instituições em que você tem conta.",
              "**Chaves Pix**: todas as chaves cadastradas no seu CPF.",
              "**Cheques sem fundos**: se o seu CPF está no cadastro de emitentes.",
              "**Câmbio**: operações e transferências internacionais.",
            ],
          },
        ],
      },
      {
        titulo: "Como ler o relatório de empréstimos",
        blocos: [
          {
            tabela: {
              cabecalho: ["O que aparece", "O que significa para o financiamento"],
              linhas: [
                ["A vencer", "Dívida em dia. Não barra o crédito, mas a parcela conta nos 30% da renda."],
                ["Vencido", "Parcela em atraso. É o que mais barra: negocie antes de pedir o financiamento."],
                ["Prejuízo", "O banco já deu a dívida como perdida. Pesa muito: regularize e guarde o comprovante."],
                ["Limite de crédito", "Cheque especial e cartão disponíveis. Não é dívida, mas o banco enxerga."],
              ],
            },
          },
          { p: "Quer saber quanto essas parcelas tiram do seu financiamento? Coloque o valor no [simulador](#simulador): ele desconta das 30% da renda." },
        ],
      },
      {
        titulo: "Registrato, score e Serasa: qual a diferença",
        blocos: [
          {
            figura: {
              id: "registrato-x-score",
              alt: "Diferença entre o Registrato do Banco Central e o score de crédito: o que cada um mostra antes de pedir o financiamento",
              etiqueta: "O que o banco enxerga",
              titulo: "Registrato",
              destaque: "× score.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Registrato", tom: "planta", itens: ["Do Banco Central, gratuito", "Mostra cada dívida, banco a banco", "É o mesmo sistema que o banco consulta"] },
                  { titulo: "Score", tom: "mark", itens: ["De empresas privadas (birôs)", "Uma nota de 0 a 1.000", "Não mostra o detalhe das dívidas"] },
                ],
              },
            },
          },
          { p: "Na análise do financiamento, o banco consulta o mesmo sistema do Registrato (o SCR), com a sua autorização. A nota de [score](g:score) ajuda, mas o que mais pesa é **não ter atraso** e **ter parcelas que cabem na renda**. Veja [score para financiamento](#score)." },
          { aviso: { titulo: "Cuidado com sites que cobram", texto: "O Registrato é gratuito e fica no site do Banco Central, com login gov.br. Não informe senha em links recebidos por mensagem.", tom: "bad" } },
        ],
      },
    ],
    faq: [
      { q: "O Registrato mostra meu score?", a: "Não. Mostra dívidas e contas registradas pelos bancos no Banco Central. O score é dos birôs de crédito." },
      { q: "É pago?", a: "Não. É gratuito e oficial." },
      { q: "Precisa ter conta gov.br prata ou ouro?", a: "Sim. O Registrato aceita login gov.br de nível prata ou ouro. Dá para subir de nível no próprio app gov.br, com validação facial ou pelo banco." },
      { q: "O relatório sai na hora?", a: "Sai: o pedido é online e o relatório fica disponível para baixar em PDF." },
      { q: "O banco olha o Registrato para aprovar o financiamento?", a: "O banco consulta o mesmo sistema (SCR) com a sua autorização. Por isso vale ver antes o que ele vai ver." },
    ],
  },

  "consultar-fgts": {
    tituloSeo: "Como consultar o saldo do FGTS pelo CPF",
    descricao: "Como consultar o FGTS pelo CPF no aplicativo oficial: ver o saldo de cada emprego, entender o extrato e usar o dinheiro na compra do imóvel.",
    resposta: "Para consultar o FGTS pelo CPF, baixe o **aplicativo FGTS** (oficial da Caixa), entre com o **CPF** e a conta gov.br e veja o saldo de cada emprego. O que estiver lá pode virar parte da [entrada](g:entrada).",
    secoes: [
      {
        titulo: "Passo a passo",
        blocos: [
          {
            passos: [
              { titulo: "Baixe o app FGTS", texto: "Na loja do celular, publicado pela Caixa. Desconfie de apps de terceiros." },
              { titulo: "Entre com CPF e gov.br", texto: "O app mostra todas as contas, inclusive de empregos antigos." },
              { titulo: "Some os saldos", texto: "É esse total que pode entrar na compra." },
            ],
          },
          { aviso: { titulo: "Cuidado com golpes", texto: "A Caixa não pede senha nem código por mensagem. Use só o app oficial." } },
        ],
      },
      {
        titulo: "Quando o FGTS pode entrar na compra",
        blocos: [
          {
            figura: {
              id: "fgts-na-compra",
              alt: "Regras para usar o saldo do FGTS na compra do imóvel: 3 anos de carteira assinada, sem imóvel na cidade e imóvel residencial dentro do teto",
              etiqueta: "FGTS na compra do imóvel",
              titulo: "Três regras",
              destaque: "para o FGTS entrar.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "3 anos de FGTS", texto: "Somando todos os empregos com carteira assinada." },
                  { titulo: "Sem imóvel na cidade", texto: "Não ter imóvel residencial onde mora ou trabalha." },
                  { titulo: "Imóvel residencial", texto: "Para morar, dentro do teto do Sistema Financeiro da Habitação." },
                ],
              },
              legenda: "Com as três regras cumpridas, o saldo pode virar parte da entrada.",
            },
          },
          { p: "Os detalhes e as exceções estão em [como usar o FGTS para comprar imóvel](#usar-fgts-comprar). Para conferir os 3 anos, veja o [tempo de carteira](#carteira-trabalho)." },
        ],
      },
      { titulo: "E agora?", blocos: [{ p: "Veja [as regras para usar o FGTS na compra](#usar-fgts-comprar) e coloque o saldo no [simulador](#simulador)." }] },
    ],
    faq: [{ q: "Saldo bloqueado pode ser usado?", a: "Saldo comprometido com antecipação do saque-aniversário fica indisponível até a quitação da antecipação." },
      { q: "Dá para consultar o FGTS sem o aplicativo?", a: "Dá: pelo site da Caixa ou numa agência, com documento. O aplicativo FGTS é o caminho mais rápido." },
      { q: "O FGTS paga o ITBI e o cartório?", a: "Não. Na compra, o FGTS entra só na entrada (ou no valor financiado). ITBI e cartório saem do seu bolso." },
    ],
  },

  "boleto-habitacao": {
    tituloSeo: "2ª via do boleto da Habitação Caixa",
    descricao: "Onde tirar a 2ª via do boleto da Habitação Caixa: app, site e WhatsApp oficiais, como ver o saldo devedor e como antecipar parcelas.",
    resposta: "A 2ª via do boleto da Habitação Caixa sai pelo **app Habitação CAIXA** ou no site [Habitação Digital](https://www.habitacaodigital.caixa.gov.br/acesso-cliente), em *Meu financiamento*. Lá também dá para ver o saldo e **antecipar parcelas**.",
    secoes: [
      {
        titulo: "Onde tirar",
        blocos: [
          {
            lista: [
              "App Habitação CAIXA.",
              "Site [Habitação Digital](https://www.habitacaodigital.caixa.gov.br/acesso-cliente) → Meu financiamento → Ver contrato.",
              "App CAIXA Tem.",
              "WhatsApp da Caixa: 0800 104 0104.",
            ],
          },
        ],
      },
      {
        titulo: "Já que está aí: adiante parcelas",
        blocos: [
          { p: "Adiantar no começo do contrato reduz muito os juros totais. Dá para usar o [FGTS para abater](#amortizar-fgts). Entenda a diferença em [SAC ou PRICE](#sac-ou-price)." },
          { aviso: { titulo: "Atrasou?", texto: "O saldo é corrigido com juros, multa e mora. Se apertar, procure o banco antes de atrasar: dá para mudar a data de vencimento." } },
        ],
      },
      {
        titulo: "Boleto verdadeiro ou golpe?",
        blocos: [
          {
            figura: {
              id: "verdadeiro-x-golpe",
              alt: "Como saber se o boleto da Habitação Caixa é verdadeiro: tirado no app ou site oficial, código 104 e beneficiário Caixa, contra os sinais de golpe",
              etiqueta: "2ª via do boleto da Caixa",
              titulo: "Antes de pagar,",
              destaque: "confira três coisas.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Verdadeiro", tom: "planta", itens: ["Tirado no app ou site oficial", "Código de barras começa com 104", "Beneficiário: Caixa Econômica Federal"] },
                  { titulo: "Golpe", tom: "bad", itens: ["Chega por mensagem ou e-mail", "Pede Pix para pessoa ou empresa", "Beneficiário com outro nome"] },
                ],
              },
            },
          },
          { p: "O **104** é o código da Caixa no sistema bancário: é por ele que a linha digitável começa. Na dúvida, não pague: gere a 2ª via de novo pelo app oficial." },
        ],
      },
    ],
    faq: [{ q: "Boleto que chegou por e-mail é seguro?", a: "Confira sempre no app ou no site oficial antes de pagar: boleto falso é golpe comum." },
      { q: "Perdi a data. Posso pagar o boleto vencido?", a: "Gere uma nova 2ª via pelo app ou site: ela sai com o valor atualizado (juros e multa do atraso)." },
      { q: "Onde vejo o saldo devedor?", a: "No app Habitação CAIXA ou no site Habitação Digital, em Meu financiamento." },
    ],
  },

  "certidao-matricula": {
    tituloSeo: "Certidão de matrícula do imóvel online: como pedir e ler",
    descricao: "Como pedir a certidão de matrícula do imóvel online, a diferença entre matrícula, ônus e inteiro teor, e o que olhar antes de comprar.",
    resposta: "Para pedir a certidão de matrícula de imóvel online, use o **[Registro de Imóveis do Brasil (ONR)](https://registradores.onr.org.br/)**, o serviço oficial dos cartórios. Para compra financiada, peça a **certidão de inteiro teor com [ônus](g:onus) e ações** — é a que o banco aceita.",
    secoes: [
      {
        titulo: "Matrícula, ônus ou inteiro teor?",
        blocos: [
          {
            tabela: {
              cabecalho: ["Certidão", "O que mostra"],
              linhas: [
                ["Inteiro teor da matrícula", "Tudo o que está escrito na matrícula: donos, área, registros."],
                ["Ônus reais", "Só o que pesa sobre o imóvel: hipoteca, penhora, alienação."],
                ["Inteiro teor com ônus e ações", "As duas coisas, e as ações reipersecutórias. É a que o banco pede."],
              ],
            },
          },
        ],
      },
      {
        titulo: "Passo a passo",
        blocos: [
          {
            passos: [
              { titulo: "Ache o número da matrícula", texto: "Está no IPTU, na escritura ou com o vendedor." },
              { titulo: "Peça no ONR", texto: "Em [registradores.onr.org.br](https://registradores.onr.org.br/), escolha o cartório da região do imóvel." },
              { titulo: "Pague a taxa e receba", texto: "A certidão digital chega por e-mail, em geral em poucos dias." },
            ],
          },
        ],
      },
      {
        titulo: "O que olhar",
        blocos: [
          { lista: ["Se o vendedor é mesmo o dono (e o cônjuge).", "Se há penhora, hipoteca ou ação.", "Se a área construída está averbada.", "Se a certidão foi emitida há até 30 dias."] },
          { p: "Comprador: veja [documentos para financiar](#documentos-financiamento). Vendedor: [documentos para vender](#documentos-vender)." },
        ],
      },
      {
        titulo: "O que conferir na certidão",
        blocos: [
          {
            figura: {
              id: "o-que-olhar",
              alt: "O que conferir na certidão de matrícula do imóvel antes de comprar: dono e cônjuge, ônus e ações, área construída averbada e data de emissão",
              etiqueta: "Certidão de matrícula",
              titulo: "Quatro coisas",
              destaque: "antes do sinal.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Quem é o dono", texto: "O vendedor (e o cônjuge) está na matrícula?" },
                  { titulo: "Ônus e ações", texto: "Hipoteca, penhora, alienação ou ação na Justiça." },
                  { titulo: "Área averbada", texto: "A construção está registrada, com habite-se?" },
                  { titulo: "Data", texto: "Emitida há até 30 dias para o banco." },
                ],
              },
            },
          },
        ],
      },
    ],
    faq: [{ q: "Ônus e matrícula são a mesma coisa?", a: "Não. A matrícula é o registro do imóvel; a certidão de ônus mostra só o que pesa sobre ele. Para financiar, peça as duas juntas (inteiro teor com ônus)." },
      { q: "Quanto custa a certidão de matrícula?", a: "O valor é tabelado por estado e aparece no pedido, antes de pagar." },
      { q: "Matrícula com alienação fiduciária pode ser vendida?", a: "Pode, se a dívida for quitada na venda ou o banco aprovar a transferência. Veja vender imóvel financiado." },
    ],
  },

  "carteira-trabalho": {
    tituloSeo: "Como ver o tempo de carteira assinada (regra dos 3 anos do FGTS)",
    descricao: "Como conferir o tempo de carteira assinada na Carteira de Trabalho Digital e por que os 3 anos importam para usar o FGTS e ter juros menores.",
    resposta: "Na **Carteira de Trabalho Digital** (app ou gov.br) aparecem todos os seus contratos. Some os períodos: com **3 anos de FGTS**, você usa o saldo na compra e ganha desconto nos juros do [Minha Casa Minha Vida](#minha-casa-minha-vida).",
    secoes: [
      {
        titulo: "Passo a passo",
        blocos: [
          {
            passos: [
              { titulo: "Abra a Carteira de Trabalho Digital", texto: "App oficial ou o site [gov.br](https://www.gov.br/trabalho-e-emprego/pt-br/servicos/trabalhador/carteira-de-trabalho)." },
              { titulo: "Veja os contratos", texto: "Cada emprego com data de entrada e saída." },
              { titulo: "Some o tempo", texto: "Não precisa ser seguido nem no mesmo emprego." },
            ],
          },
          { p: "Depois, veja [como usar o FGTS na compra](#usar-fgts-comprar) e o [saldo no app FGTS](#consultar-fgts)." },
        ],
      },
      {
        titulo: "Como somar os 3 anos",
        blocos: [
          {
            figura: {
              id: "somar-tempo",
              alt: "Como somar o tempo de carteira assinada para usar o FGTS: períodos de empregos diferentes somam até completar 3 anos",
              etiqueta: "Tempo de carteira assinada",
              titulo: "Não precisa ser seguido:",
              destaque: "o tempo soma.",
              esquema: {
                tipo: "numeros",
                itens: [
                  { valor: "14 meses", rotulo: "no primeiro emprego" },
                  { valor: "10 meses", rotulo: "no segundo" },
                  { valor: "12 meses", rotulo: "no emprego atual" },
                  { valor: "= 3 anos", rotulo: "de FGTS: já pode usar na compra", tom: "mark" },
                ],
              },
              legenda: "Exemplo. Contam os períodos com carteira assinada (e FGTS recolhido), em qualquer empresa.",
            },
          },
        ],
      },
    ],
    faq: [{ q: "Estágio conta?", a: "Não: estágio não recolhe FGTS. Contam os períodos com carteira assinada." },
      { q: "Empregada doméstica com carteira conta?", a: "Conta. Desde 2015 o FGTS é obrigatório para o trabalho doméstico com carteira assinada." },
      { q: "MEI conta para os 3 anos?", a: "Não: o MEI não recolhe FGTS para si. Contam só os períodos como empregado com carteira assinada." },
    ],
  },
};
