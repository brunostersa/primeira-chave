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
    ],
    faq: [
      { q: "O Registrato mostra meu score?", a: "Não. Mostra dívidas e contas registradas pelos bancos no Banco Central. O score é dos birôs de crédito." },
      { q: "É pago?", a: "Não. É gratuito e oficial." },
    ],
  },

  "consultar-fgts": {
    tituloSeo: "Como consultar o saldo do FGTS pelo CPF",
    descricao: "Como ver o saldo do FGTS no aplicativo oficial, entender o extrato e usar o dinheiro na compra do imóvel.",
    resposta: "Baixe o **aplicativo FGTS** (oficial da Caixa), entre com o **CPF** e a conta gov.br e veja o saldo de cada emprego. O que estiver lá pode virar parte da [entrada](g:entrada).",
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
      { titulo: "E agora?", blocos: [{ p: "Veja [as regras para usar o FGTS na compra](#usar-fgts-comprar) e coloque o saldo no [simulador](#simulador)." }] },
    ],
    faq: [{ q: "Saldo bloqueado pode ser usado?", a: "Saldo comprometido com antecipação do saque-aniversário fica indisponível até a quitação da antecipação." }],
  },

  "boleto-habitacao": {
    tituloSeo: "2ª via do boleto da Habitação Caixa",
    descricao: "Onde tirar a segunda via do boleto do financiamento da Caixa, ver o saldo devedor e antecipar parcelas.",
    resposta: "Pelo **app Habitação CAIXA** ou no site [Habitação Digital](https://www.habitacaodigital.caixa.gov.br/acesso-cliente), em *Meu financiamento*. Lá também dá para ver o saldo e **antecipar parcelas**.",
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
    ],
    faq: [{ q: "Boleto que chegou por e-mail é seguro?", a: "Confira sempre no app ou no site oficial antes de pagar: boleto falso é golpe comum." }],
  },

  "certidao-matricula": {
    tituloSeo: "Certidão de matrícula do imóvel online: como pedir e ler",
    descricao: "Como pedir a certidão de matrícula do imóvel online, a diferença entre matrícula, ônus e inteiro teor, e o que olhar antes de comprar.",
    resposta: "Peça online no **[Registro de Imóveis do Brasil (ONR)](https://registradores.onr.org.br/)**, o serviço oficial dos cartórios. Para compra financiada, peça a **certidão de inteiro teor com [ônus](g:onus) e ações** — é a que o banco aceita.",
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
    ],
    faq: [{ q: "Ônus e matrícula são a mesma coisa?", a: "Não. A matrícula é o registro do imóvel; a certidão de ônus mostra só o que pesa sobre ele. Para financiar, peça as duas juntas (inteiro teor com ônus)." }],
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
    ],
    faq: [{ q: "Estágio conta?", a: "Não: estágio não recolhe FGTS. Contam os períodos com carteira assinada." }],
  },
};
