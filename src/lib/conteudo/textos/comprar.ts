import type { Texto } from "../tipos";

export const TEXTOS_COMPRAR: Record<string, Texto> = {
  "preparar-a-casa": {
    tituloSeo: "Antes de financiar um imóvel: o que arrumar primeiro",
    descricao: "Nome limpo, dívidas, reserva e FGTS: o que deixar em ordem antes de pedir o financiamento, para o banco aprovar e você não se apertar.",
    resposta:
      "Quatro coisas, nesta ordem: **nome limpo**, **parcelas atuais sob controle** (elas comem o espaço da parcela da casa), **dinheiro para entrada e custos** (perto de 25% do imóvel) e **saber se o FGTS pode entrar**.",
    secoes: [
      {
        titulo: "O checklist em uma imagem",
        blocos: [
          {
            figura: {
              id: "quatro-passos",
              alt: "O que fazer antes de financiar um imóvel: conferir o CPF, olhar as parcelas atuais, juntar entrada e custos e ver se o FGTS entra",
              etiqueta: "Antes de financiar",
              titulo: "Arrume a casa",
              destaque: "antes de pedir.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Confira o CPF", texto: "Registrato e restrições no nome." },
                  { titulo: "Some as parcelas", texto: "Elas saem dos 30% da renda." },
                  { titulo: "Junte entrada e custos", texto: "20% de entrada e uns 5% de ITBI e cartório." },
                  { titulo: "Veja o FGTS", texto: "Com 3 anos de carteira, ele entra na entrada." },
                ],
              },
            },
          },
        ],
      },
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
      { q: "Vale quitar um empréstimo antes de financiar?", a: "Muitas vezes, sim: cada parcela a menos libera espaço nos 30% da renda e aumenta o valor que o banco empresta. Faça a conta no simulador." },
    ],
  },

  "usar-fgts-comprar": {
    tituloSeo: "Como usar o FGTS para comprar imóvel: regras e limites",
    descricao: "Quem pode usar o FGTS na compra do imóvel, em quê pode usar (e em quê não), e como o FGTS ajuda depois, abatendo a dívida.",
    resposta:
      "Pode usar quem tem **3 anos de carteira somados** e **não tem imóvel residencial** na cidade onde mora ou trabalha. Na compra, o FGTS entra **só na entrada**: não paga [ITBI](g:itbi) nem cartório.",
    secoes: [
      {
        titulo: "Onde o FGTS entra (e onde não entra)",
        blocos: [
          {
            figura: {
              id: "pode-e-nao-pode",
              alt: "Usar FGTS para comprar imóvel: pode na entrada, para abater ou quitar e para pagar parte das parcelas; não pode no ITBI, no cartório nem em imóvel para alugar",
              etiqueta: "Usar FGTS para comprar imóvel",
              titulo: "Onde o FGTS",
              destaque: "entra.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Pode", tom: "mark", itens: ["Entrada", "Abater ou quitar a dívida", "Até 80% da parcela por 12 meses"] },
                  { titulo: "Não pode", tom: "bad", itens: ["ITBI e cartório", "Imóvel comercial ou para alugar", "Quem já tem imóvel na cidade"] },
                ],
              },
            },
          },
        ],
      },
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
      { q: "O FGTS bloqueado pelo saque-aniversário pode ser usado?", a: "A parte comprometida com a antecipação fica bloqueada até a quitação. O saldo livre pode ser usado." },
      { q: "Posso usar o FGTS em imóvel na planta?", a: "Pode, nas condições do FGTS, para pagar parte do valor na contratação do financiamento." },
    ],
  },

  "documentos-financiamento": {
    tituloSeo: "Documentos para financiar imóvel na Caixa: checklist completo",
    h1: "Documentos para financiamento na Caixa: o checklist",
    descricao: "O checklist dos documentos para financiamento na Caixa: do comprador (CLT, autônomo, MEI ou dono de empresa), do vendedor e do imóvel.",
    resposta: "Os documentos para financiamento na Caixa formam três grupos: **seus documentos** (identidade, estado civil, renda e carteira de trabalho), **os do vendedor** e **os do imóvel** (a [matrícula](g:matricula) atualizada). O que muda de pessoa para pessoa é a **prova de renda**: CLT leva holerite; MEI e dono de empresa levam extratos e os papéis da empresa.",
    secoes: [
      {
        titulo: "Os três grupos de documentos",
        blocos: [
          {
            figura: {
              id: "tres-grupos",
              alt: "Documentos para financiamento na Caixa em três grupos: do comprador, do vendedor e do imóvel, com a matrícula atualizada",
              etiqueta: "Documentos para financiamento",
              titulo: "Três pastas,",
              destaque: "entregues de uma vez.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Seus", tom: "mark", itens: ["Identidade e CPF", "Estado civil", "Renda e imposto de renda"] },
                  { titulo: "Do vendedor", tom: "planta", itens: ["Identidade e CPF", "Estado civil", "Empresa: contrato social"] },
                  { titulo: "Do imóvel", tom: "ink", itens: ["Matrícula atualizada", "Com ônus e ações", "IPTU e condomínio"] },
                ],
                sinal: "+",
              },
            },
          },
        ],
      },
      {
        titulo: "Do comprador",
        blocos: [
          {
            lista: [
              "RG e CPF, ou CNH.",
              "Certidão de nascimento (solteiro) ou de casamento. **Casado:** leve também RG e CPF (ou CNH) e o comprovante de renda do cônjuge.",
              "Comprovante de endereço recente, de até 60 dias.",
              "Comprovante de renda recente, de até 2 meses. O que vale como prova muda conforme o seu trabalho: veja a tabela abaixo.",
              "Declaração do imposto de renda do ano, com o recibo, se você declara.",
              "Carteira de trabalho: a página da foto, a da qualificação e **todas** as páginas com contratos registrados, inclusive os antigos.",
              "Número do PIS.",
              "Extrato do FGTS (obrigatório para quem é CLT), dizendo se vai usar o saldo.",
              "Se já tem conta corrente na Caixa: agência, operação e número da conta.",
              "Telefone, e-mail e grau de escolaridade, que vão para o cadastro.",
            ],
          },
          { aviso: { titulo: "De onde vem esta lista", texto: "É a lista que um correspondente Caixa Aqui pede hoje (outubro de 2026). Agência ou correspondente podem pedir algo a mais no seu caso: confirme antes de juntar tudo.", tom: "planta" } },
        ],
      },
      {
        titulo: "Comprovante de renda: o que levar em cada caso",
        blocos: [
          { p: "O banco só conta a renda que você consegue provar. Quem tem carteira assinada prova com o holerite. Quem é dono do próprio negócio prova com os extratos da conta e com os papéis da empresa." },
          {
            tabela: {
              cabecalho: ["Como você ganha", "O que levar"],
              linhas: [
                ["CLT (carteira assinada)", "Holerites recentes (até 2 meses), carteira de trabalho e extrato do FGTS."],
                ["MEI", "Certificado do MEI e comprovantes do DAS-MEI, mais os extratos bancários dos últimos 6 meses."],
                ["Empresa no Simples Nacional", "Contrato social, extrato do PGDAS e a DEFIS, mais os extratos bancários dos últimos 6 meses."],
                ["Empresa no Lucro Presumido ou Real", "Contrato social e a ECF, mais os extratos bancários dos últimos 6 meses."],
                ["Autônomo ou informal", "Extratos bancários dos últimos 6 meses e a declaração do imposto de renda. Confirme com o correspondente o que mais ele aceita no seu caso."],
              ],
            },
          },
          { aviso: { titulo: "Dica para quem tem negócio próprio", texto: "Peça ao contador o PGDAS, a DEFIS ou a ECF já em PDF. E faça o dinheiro passar pela sua conta: renda que entra em espécie e não aparece no extrato **não conta** para o banco." } },
          { p: "Quem é MEI ou autônomo e quer usar o FGTS precisa de saldo de empregos com carteira e de 3 anos somados de registro. Veja [como usar o FGTS](#usar-fgts-comprar)." },
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
      { q: "Autônomo consegue financiar?", a: "Pode, se provar a renda: extratos bancários dos últimos 6 meses e declaração do imposto de renda. Renda que não aparece no extrato não conta." },
      { q: "MEI consegue financiar?", a: "Pode, se provar a renda. Leve o certificado do MEI, os comprovantes do DAS-MEI e os extratos bancários dos últimos 6 meses, além dos documentos pessoais." },
      { q: "Casado precisa levar os documentos do cônjuge?", a: "Precisa: RG e CPF (ou CNH) e o comprovante de renda do cônjuge, além da certidão de casamento." },
    ],
  },

  score: {
    tituloSeo: "Score para financiamento de casa: quanto precisa?",
    h1: "Score para financiamento de casa: quanto precisa?",
    descricao: "Score para financiamento de casa: não existe nota mínima pública. Veja o que o banco olha de verdade e como melhorar antes de pedir o crédito.",
    resposta: "Não existe um [score](g:score) mínimo divulgado para financiamento de casa. O banco olha a nota, mas pesa mais **nome sem restrição**, **parcelas atuais** e o seu **histórico no Banco Central**.",
    secoes: [
      {
        titulo: "Quatro passos antes de pedir o crédito",
        blocos: [
          {
            figura: {
              id: "antes-de-pedir",
              alt: "Score para financiamento de casa: quatro passos antes de pedir o crédito, do Registrato à comprovação de renda",
              etiqueta: "Score para financiamento",
              titulo: "Mais que a nota,",
              destaque: "o que o banco enxerga.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Veja o Registrato", texto: "Tudo o que você deve, banco a banco, de graça." },
                  { titulo: "Negocie atrasos", texto: "Dívida vencida é o que mais barra o crédito." },
                  { titulo: "Quite o pequeno", texto: "Uma parcela a menos libera espaço nos 30% da renda." },
                  { titulo: "Organize a renda", texto: "Holerites, extratos e imposto de renda em dia." },
                ],
              },
            },
          },
        ],
      },
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
      { q: "Nome sujo consegue financiar?", a: "Em regra, não: restrição no CPF barra a aprovação. Negocie a dívida, guarde o comprovante e espere a baixa antes de pedir." },
      { q: "Consultar o próprio score derruba a nota?", a: "Não. Consultar o seu próprio CPF não afeta a nota." },
    ],
  },

  "financiamento-negado": {
    tituloSeo: "Financiamento negado: quando posso tentar novamente?",
    h1: "Financiamento negado: quando posso tentar novamente?",
    descricao: "Financiamento negado? Os motivos mais comuns, o que fazer em cada caso e quando posso tentar novamente, sem perder tempo nem a próxima análise.",
    resposta: "Financiamento negado quase sempre é por um destes motivos: **restrição no nome**, **renda comprometida demais**, **renda difícil de comprovar** ou **problema no imóvel**. Quando posso tentar novamente? **Assim que resolver o motivo** — não há prazo fixo de espera.",
    secoes: [
      {
        titulo: "Negado? Faça nesta ordem",
        blocos: [
          {
            figura: {
              id: "o-que-fazer",
              alt: "Financiamento negado: o que fazer e quando posso tentar novamente, em quatro passos, do motivo da recusa à nova simulação",
              etiqueta: "Financiamento negado",
              titulo: "Descubra o motivo,",
              destaque: "resolva e tente de novo.",
              esquema: {
                tipo: "passos",
                itens: [
                  { titulo: "Pergunte o motivo", texto: "O correspondente ou o gerente costuma indicar o que barrou." },
                  { titulo: "Veja o Registrato", texto: "Confira atrasos e parcelas que o banco enxergou." },
                  { titulo: "Resolva o ponto", texto: "Negocie, quite parcelas, comprove renda ou troque o imóvel." },
                  { titulo: "Simule de novo", texto: "Com os números novos, antes de voltar ao banco." },
                ],
              },
            },
          },
        ],
      },
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
          { p: "Simule de novo no [simulador](#simulador) com os números novos antes de voltar ao banco." },
        ],
      },
    ],
    faq: [
      { q: "O banco é obrigado a dizer o motivo?", a: "Você pode perguntar ao gerente ou correspondente. Nem sempre o detalhe é informado, mas o tipo de problema costuma ser." },
      { q: "Posso tentar em outro banco?", a: "Sim. As regras de cada banco variam um pouco, mas restrição no nome barra em todos." },
      { q: "Ser negado na Caixa impede de tentar em outro banco?", a: "Não. Cada banco faz a sua análise. Mas, se o motivo for restrição no nome ou renda, ele vai aparecer em qualquer banco." },
      { q: "A recusa fica registrada no meu CPF?", a: "A recusa em si não vira dívida nem restrição. O que pesa são os atrasos e as parcelas que já existem." },
    ],
  },

  "quanto-tempo-demora": {
    tituloSeo: "Quanto tempo demora o financiamento da Caixa?",
    h1: "Quanto tempo demora o financiamento da Caixa?",
    descricao: "Quanto tempo demora o financiamento da Caixa, etapa por etapa: da aprovação do crédito ao registro, e o que atrasa (ou acelera) o processo.",
    resposta: "Quanto tempo demora o financiamento da Caixa? Do pedido à chave, **de 30 a 90 dias** em média. O que mais atrasa é documento que chega aos poucos e pendência na [matrícula](g:matricula) do imóvel.",
    secoes: [
      {
        titulo: "Os prazos em números",
        blocos: [
          {
            figura: {
              id: "prazos",
              alt: "Quanto tempo demora o financiamento da Caixa: prazos médios da aprovação de crédito, da avaliação, da assinatura e do registro",
              etiqueta: "Quanto tempo demora",
              titulo: "Do pedido à chave,",
              destaque: "etapa por etapa.",
              esquema: {
                tipo: "numeros",
                itens: [
                  { valor: "5–15 dias", rotulo: "para a aprovação do crédito" },
                  { valor: "7–15 dias", rotulo: "para a avaliação do imóvel" },
                  { valor: "1 dia", rotulo: "para assinar o contrato" },
                  { valor: "até 30 dias", rotulo: "para o registro no cartório", tom: "mark" },
                ],
              },
              legenda: "Prazos médios. Documento incompleto e pendência na matrícula são os maiores atrasos.",
            },
          },
        ],
      },
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
    faq: [{ q: "O vendedor recebe quando?", a: "Depois do registro do contrato no cartório, que precisa sair em até 30 dias da assinatura." },
      { q: "Quanto tempo vale a aprovação de crédito?", a: "A aprovação tem validade definida pelo banco. Se vencer antes de você achar o imóvel, é preciso atualizar a análise." },
    ],
  },

  "sem-entrada-apartamento": {
    tituloSeo: "Dá pra financiar apartamento sem entrada? A regra da avaliação",
    descricao: "Dá pra financiar apartamento sem entrada? Sim, se o banco avaliar o imóvel 25% acima do preço. Veja a regra, a conta e os cuidados.",
    resposta: "Dá para financiar apartamento sem entrada pela mesma regra da casa: o banco empresta até 80% da [avaliação](g:avaliacao), sem passar do preço. Se a avaliação vier **25% acima do preço**, a [entrada](g:entrada) zera — mas ITBI e cartório continuam.",
    secoes: [
      {
        titulo: "A conta em uma imagem",
        blocos: [
          {
            figura: {
              id: "avaliado-acima",
              alt: "Como financiar apartamento sem entrada: apartamento de R$ 240 mil avaliado em R$ 300 mil, o banco financia o preço inteiro e você paga só ITBI e cartório",
              etiqueta: "Apartamento sem entrada",
              titulo: "Avaliado 25% acima,",
              destaque: "entrada zero.",
              esquema: {
                tipo: "divisao",
                total: "preço R$ 240 mil · avaliação R$ 300 mil",
                partes: [
                  { rotulo: "o banco financia 80% da avaliação = o preço inteiro", valor: 240000, texto: "R$ 240 mil", tom: "planta" },
                  { rotulo: "ITBI e cartório, do seu bolso", valor: 12000, texto: "R$ 12 mil", tom: "mark" },
                ],
              },
              legenda: "80% de R$ 300 mil são R$ 240 mil: o preço inteiro. A renda ainda precisa aguentar a parcela.",
            },
          },
        ],
      },
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
    faq: [{ q: "O condomínio entra nos 30% da renda?", a: "Não na conta do banco, mas entra no seu bolso todo mês. Inclua ele no seu orçamento." },
      { q: "Funciona com apartamento na planta?", a: "Em geral não: na planta você paga a construtora durante a obra. A regra da avaliação vale para o imóvel pronto financiado." },
      { q: "A renda precisa aguentar a parcela maior?", a: "Sim. Sem entrada, você financia mais, e a parcela tem de caber em 30% da renda." },
    ],
  },

  "avaliacao-do-imovel": {
    tituloSeo: "Avaliação do imóvel pela Caixa: quem faz, quem paga e o que muda",
    h1: "Avaliação do imóvel pela Caixa: quem faz, quem paga e o que muda",
    descricao: "Como funciona a avaliação do imóvel pela Caixa no financiamento: quem faz, quem paga, quanto demora e o que muda se vier abaixo ou acima do preço.",
    resposta: "Na avaliação do imóvel pela Caixa, um engenheiro vistoria o imóvel e define o valor de [avaliação](g:avaliacao). **Quem compra paga a tarifa.** O banco empresta até 80% desse valor: abaixo do preço, você cobre a diferença; acima, a entrada diminui.",
    secoes: [
      {
        titulo: "Abaixo ou acima: o que muda no seu bolso",
        blocos: [
          {
            figura: {
              id: "abaixo-x-acima",
              alt: "Avaliação do imóvel pela Caixa abaixo ou acima do preço: abaixo, o banco empresta menos e você cobre a diferença; acima, a entrada diminui",
              etiqueta: "Avaliação do imóvel pela Caixa",
              titulo: "O laudo",
              destaque: "muda a entrada.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Abaixo do preço", tom: "bad", itens: ["Banco empresta menos", "Você cobre a diferença", "Hora de renegociar o preço"] },
                  { titulo: "Acima do preço", tom: "mark", itens: ["A entrada diminui", "25% acima: entrada zero", "A renda precisa aguentar"] },
                ],
              },
            },
          },
        ],
      },
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
      { q: "Dá para contestar a avaliação?", a: "Dá para pedir revisão com argumentos, como vendas parecidas na região, mas a decisão final é do banco." },
      { q: "A avaliação é feita antes ou depois do sinal?", a: "O ideal é antes: peça a avaliação e só pague sinal com o laudo na mão." },
    ],
  },

  "registro-do-imovel": {
    tituloSeo: "Registro do imóvel, ITBI e chaves: o que vem depois",
    descricao: "Depois de assinar o contrato: pagar o ITBI, registrar no cartório em até 30 dias e receber as chaves. O passo a passo e os custos.",
    resposta: "Depois da assinatura você paga o [ITBI](g:itbi), leva o contrato ao Cartório de Registro de Imóveis (prazo de **30 dias**) e, com o [registro](g:registro) feito, o banco paga o vendedor e a chave é sua.",
    secoes: [
      {
        titulo: "Da assinatura à chave",
        blocos: [
          {
            figura: {
              id: "da-assinatura-a-chave",
              alt: "Registro do imóvel depois da assinatura: pagar o ITBI, registrar no cartório em até 30 dias e o banco liberar o dinheiro ao vendedor",
              etiqueta: "Registro do imóvel",
              titulo: "Sem registro,",
              destaque: "a chave não é sua.",
              esquema: {
                tipo: "linha",
                marcos: [
                  { rotulo: "Assinatura", detalhe: "contrato com o banco" },
                  { rotulo: "ITBI pago", detalhe: "guia da prefeitura" },
                  { rotulo: "Registro", detalhe: "no Cartório de Imóveis" },
                  { rotulo: "Chave", detalhe: "o banco paga o vendedor" },
                ],
                trechos: [
                  { rotulo: "pague o ITBI", tom: "mark" },
                  { rotulo: "até 30 dias", tom: "planta" },
                  { rotulo: "liberação", tom: "planta" },
                ],
              },
            },
          },
        ],
      },
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
    faq: [{ q: "Preciso de escritura?", a: "No financiamento bancário, o contrato do banco já tem força de escritura. O que falta é o registro." },
      { q: "O vendedor recebe antes do registro?", a: "Não. O banco libera o dinheiro ao vendedor depois que o contrato é registrado na matrícula." },
      { q: "O registro pode entrar no financiamento?", a: "Em alguns casos o banco permite incluir custos de cartório. Pergunte no momento da contratação." },
    ],
  },

  "primeiro-imovel-desconto": {
    tituloSeo: "Primeiro imóvel paga ITBI? E o desconto no cartório",
    h1: "Primeiro imóvel paga ITBI? E o desconto no cartório",
    descricao: "Primeiro imóvel paga ITBI? Depende da cidade. No cartório, o primeiro financiado pelo SFH tem 50% de desconto nos emolumentos. Veja as regras.",
    resposta: "**Primeiro imóvel paga ITBI, sim — o desconto depende da cidade.** **No cartório, a regra é nacional:** a primeira aquisição residencial financiada pelo Sistema Financeiro da Habitação tem **50% de desconto** nos emolumentos (Lei 6.015/73, art. 290).",
    secoes: [
      {
        titulo: "Cartório e ITBI: regras diferentes",
        blocos: [
          {
            figura: {
              id: "cartorio-x-itbi",
              alt: "Primeiro imóvel paga ITBI? O desconto de 50% no cartório é regra nacional para o primeiro imóvel financiado pelo SFH; o ITBI depende da lei de cada cidade",
              etiqueta: "Primeiro imóvel",
              titulo: "Cartório tem desconto;",
              destaque: "ITBI depende da cidade.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Cartório", tom: "mark", itens: ["50% nos emolumentos", "Regra nacional (Lei 6.015)", "1º imóvel residencial financiado pelo SFH"] },
                  { titulo: "ITBI", tom: "planta", itens: ["Imposto da prefeitura", "Cada cidade tem sua lei", "Algumas dão desconto ao MCMV"] },
                ],
              },
            },
          },
        ],
      },
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
    faq: [{ q: "Como provo que é meu primeiro imóvel?", a: "Com declaração no próprio contrato. O cartório pode consultar registros; declarar falsamente é crime." },
      { q: "O desconto do cartório é automático?", a: "Nem sempre. Peça no cartório e declare no contrato que é o seu primeiro imóvel residencial." },
      { q: "Comprou à vista, tem desconto no cartório?", a: "O desconto da Lei 6.015 vale para a primeira aquisição financiada pelo Sistema Financeiro da Habitação." },
    ],
  },

  "amortizar-fgts": {
    tituloSeo: "Usar o FGTS para amortizar o financiamento: como e quando",
    h1: "Como usar o FGTS para amortizar o financiamento",
    descricao: "Como usar o FGTS para amortizar o financiamento: abater o saldo, quitar ou pagar parte das parcelas. Veja as regras, quando vale e como pedir.",
    resposta: "Dá para usar o [FGTS](g:fgts) para amortizar o financiamento de três jeitos: **abater** parte do saldo, **quitar** tudo ou **pagar até 80% da parcela por 12 meses**. Abater no começo do contrato é o que mais economiza juros.",
    secoes: [
      {
        titulo: "Reduzir o prazo ou a parcela?",
        blocos: [
          {
            figura: {
              id: "prazo-x-parcela",
              alt: "Usar o FGTS para amortizar o financiamento: reduzir o prazo economiza mais juros; reduzir a parcela alivia o orçamento do mês",
              etiqueta: "Amortizar com FGTS",
              titulo: "O mesmo FGTS,",
              destaque: "dois efeitos.",
              esquema: {
                tipo: "comparar",
                colunas: [
                  { titulo: "Reduzir o prazo", tom: "mark", itens: ["Economiza mais juros", "Parcela continua parecida", "Termina de pagar antes"] },
                  { titulo: "Reduzir a parcela", tom: "planta", itens: ["Alivia o mês", "Prazo continua o mesmo", "Economiza menos juros"] },
                ],
              },
            },
          },
        ],
      },
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
    faq: [{ q: "Vale mais abater ou deixar o FGTS rendendo?", a: "Em geral, abater: os juros do financiamento costumam ser bem maiores que o rendimento do FGTS." },
      { q: "De quanto em quanto tempo posso usar o FGTS para amortizar?", a: "Para abater ou quitar o saldo, em geral a cada 2 anos no mesmo contrato." },
      { q: "Quem não tem 3 anos de FGTS pode amortizar?", a: "A regra dos 3 anos de trabalho com FGTS também vale para amortizar. Confira o seu tempo na Carteira de Trabalho Digital." },
    ],
  },
};
