import type { Campo, Modelo } from "./tipos";

/**
 * Os modelos de contrato da Primeira Chave. Escolhidos pelo que a pessoa comum usa
 * na compra ou venda do primeiro imóvel sem advogado, ou com uma revisão simples.
 *
 * Fora de propósito: contrato de gaveta e "preço por fora" (atalho fora da regra) e
 * cessão de direitos de imóvel financiado (sem o banco concordar, vira gaveta).
 * Base legal citada só onde ela existe; nada de número inventado.
 */

const pessoa = (p: string, grupo: string): Campo[] => {
  const de = ` do ${grupo.toLowerCase()}`;
  return [
    { id: `${p}_nome`, rotulo: `nome completo${de}`, tipo: "texto", grupo },
    { id: `${p}_nacionalidade`, rotulo: `nacionalidade${de}`, tipo: "texto", grupo, ajuda: "Ex.: brasileiro(a)" },
    { id: `${p}_estado_civil`, rotulo: `estado civil${de}`, tipo: "texto", grupo, ajuda: "Se casado(a), diga o regime de bens." },
    { id: `${p}_profissao`, rotulo: `profissão${de}`, tipo: "texto", grupo },
    { id: `${p}_rg`, rotulo: `RG e órgão emissor${de}`, tipo: "texto", grupo },
    { id: `${p}_cpf`, rotulo: `CPF${de}`, tipo: "cpf", grupo },
    { id: `${p}_endereco`, rotulo: `endereço completo${de}`, tipo: "longo", grupo },
  ];
};

const qualificacao = (p: string) =>
  `{{${p}_nome}}, {{${p}_nacionalidade}}, {{${p}_estado_civil}}, {{${p}_profissao}}, RG {{${p}_rg}}, CPF {{${p}_cpf}}, residente em {{${p}_endereco}}`;

const conjuge = (p: string, grupo: string): Campo => ({
  id: `${p}_conjuge`,
  rotulo: `nome e CPF do cônjuge do ${grupo.toLowerCase()}, ou "não se aplica"`,
  tipo: "texto",
  grupo,
  ajuda: "Casado(a)? O cônjuge também assina (Código Civil, art. 1.647), salvo separação total de bens.",
});

const IMOVEL: Campo[] = [
  { id: "imovel_descricao", rotulo: "descrição do imóvel", tipo: "longo", grupo: "O imóvel", ajuda: "Ex.: apartamento 42 do Edifício Sol, com 1 vaga, 60 m² de área privativa." },
  { id: "imovel_endereco", rotulo: "endereço do imóvel", tipo: "longo", grupo: "O imóvel" },
  { id: "matricula", rotulo: "número da matrícula", tipo: "texto", grupo: "O imóvel", ajuda: "Está na certidão de matrícula." },
  { id: "cartorio", rotulo: "cartório de registro de imóveis", tipo: "texto", grupo: "O imóvel", ajuda: "Ex.: 2º Registro de Imóveis de Goiânia." },
  { id: "iptu", rotulo: "inscrição do IPTU", tipo: "texto", grupo: "O imóvel" },
];

const LOCAL: Campo[] = [
  { id: "cidade", rotulo: "cidade da assinatura", tipo: "texto", grupo: "Assinatura" },
  { id: "data", rotulo: "data da assinatura", tipo: "data", grupo: "Assinatura" },
];

const FORO: Campo = { id: "foro", rotulo: "cidade do foro", tipo: "texto", grupo: "Assinatura", ajuda: "Em geral, a cidade do imóvel." };

const CLAUSULA_IMOVEL = {
  titulo: "O imóvel",
  texto: [
    "O objeto deste contrato é o imóvel {{imovel_descricao}}, localizado em {{imovel_endereco}}, registrado na matrícula nº {{matricula}} do {{cartorio}}, com inscrição de IPTU nº {{iptu}}.",
    "O VENDEDOR declara que é o dono do imóvel e que ele está livre de dívidas, penhoras, hipotecas, ações judiciais e de qualquer outra trava, e que não há atraso de IPTU, condomínio ou contas de consumo.",
  ],
  nota: "Imóvel se identifica pela matrícula, não só pelo endereço. Confira na certidão de matrícula atualizada se o nome do vendedor é o mesmo do contrato e se não há ônus (hipoteca, penhora, alienação a banco).",
};

const CLAUSULA_DESPESAS = {
  titulo: "Quem paga o quê",
  texto: [
    "O COMPRADOR paga o ITBI, a escritura (quando houver), o registro na matrícula e as taxas do banco.",
    "O VENDEDOR paga as certidões dele e todas as dívidas do imóvel até a entrega das chaves: IPTU, condomínio, água, luz e gás. Dívida que aparecer depois, mas for de antes, é do VENDEDOR.",
  ],
  nota: "Sem nada escrito, a regra do Código Civil já é essa: escritura e registro com o comprador (art. 490). Escrever evita discussão sobre IPTU e condomínio atrasados, que acompanham o imóvel.",
};

const CLAUSULA_FINAL = {
  titulo: "Disposições finais",
  texto: [
    "Este contrato é assinado em caráter irrevogável e irretratável: nenhuma das partes pode simplesmente se arrepender, salvo nos casos previstos nele. Ele vale também para herdeiros e sucessores.",
    "Fica eleito o foro da comarca de {{foro}} para resolver qualquer questão sobre este contrato.",
  ],
  nota: "Sem direito de arrependimento, o compromisso pode ser registrado na matrícula e dá ao comprador o direito de exigir a escritura (Código Civil, arts. 1.417 e 1.418). Com duas testemunhas, vira título executivo: dá para cobrar na Justiça sem um processo longo antes (CPC, art. 784, III).",
};

export const MODELOS: Modelo[] = [
  // ——— 1. compra e venda com financiamento
  {
    id: "modelo-compra-venda-financiada",
    arquivo: "contrato-compra-e-venda-com-financiamento",
    tituloDocumento: "Instrumento particular de compromisso de compra e venda de imóvel com financiamento bancário",
    quando: "Você vai comprar (ou vender) um imóvel usado e parte do preço vem de financiamento do banco, com ou sem FGTS.",
    naoUse: "Imóvel na planta comprado da construtora (ela tem contrato próprio) ou imóvel que ainda está financiado em nome do vendedor sem a quitação combinada com o banco.",
    base: ["Código Civil, arts. 125, 413, 417 a 420, 481 a 504, 490, 1.417, 1.418 e 1.647", "Lei 9.514/1997, art. 38 (contrato do banco com força de escritura)", "CPC, art. 784, III (título executivo)"],
    campos: [
      ...pessoa("vendedor", "Vendedor"),
      conjuge("vendedor", "Vendedor"),
      ...pessoa("comprador", "Comprador"),
      conjuge("comprador", "Comprador"),
      ...IMOVEL,
      { id: "preco", rotulo: "preço total", tipo: "dinheiro", grupo: "Preço e pagamento" },
      { id: "sinal", rotulo: "valor do sinal", tipo: "dinheiro", grupo: "Preço e pagamento" },
      { id: "data_sinal", rotulo: "data do sinal", tipo: "data", grupo: "Preço e pagamento" },
      { id: "forma_sinal", rotulo: "como o sinal é pago", tipo: "texto", grupo: "Preço e pagamento", ajuda: "PIX ou transferência, com os dados da conta do vendedor." },
      { id: "recursos_proprios", rotulo: "valor com recursos próprios (além do sinal)", tipo: "dinheiro", grupo: "Preço e pagamento" },
      { id: "fgts", rotulo: "valor com FGTS", tipo: "dinheiro", grupo: "Preço e pagamento", ajuda: "Sem FGTS? Escreva 0,00." },
      { id: "financiamento", rotulo: "valor financiado", tipo: "dinheiro", grupo: "Preço e pagamento" },
      { id: "banco", rotulo: "banco do financiamento", tipo: "texto", grupo: "Preço e pagamento" },
      { id: "prazo_aprovacao", rotulo: "prazo para aprovação (em dias)", tipo: "numero", grupo: "Prazos" },
      { id: "prazo_devolucao", rotulo: "prazo para devolver o sinal (em dias)", tipo: "numero", grupo: "Prazos" },
      { id: "prazo_documentos", rotulo: "prazo para entregar documentos (em dias)", tipo: "numero", grupo: "Prazos" },
      { id: "entrega_chaves", rotulo: "quando as chaves são entregues", tipo: "texto", grupo: "Prazos", ajuda: "Ex.: em até 5 dias depois que o banco pagar o vendedor." },
      { id: "multa", rotulo: "multa por atraso (% do preço)", tipo: "numero", grupo: "Prazos" },
      FORO,
      ...LOCAL,
    ],
    abertura: [
      "VENDEDOR: " + qualificacao("vendedor") + ". Cônjuge: {{vendedor_conjuge}}.",
      "COMPRADOR: " + qualificacao("comprador") + ". Cônjuge: {{comprador_conjuge}}.",
      "As partes acima combinam a compra e venda do imóvel descrito abaixo, nas condições seguintes.",
    ],
    clausulas: [
      CLAUSULA_IMOVEL,
      {
        titulo: "Preço e forma de pagamento",
        texto: [
          "O preço total é de R$ {{preco}}, pago assim:",
          "- R$ {{sinal}} de sinal, pago em {{data_sinal}} por {{forma_sinal}}, como princípio de pagamento e arras confirmatórias;",
          "- R$ {{recursos_proprios}} com recursos próprios, pagos na assinatura do contrato com o banco;",
          "- R$ {{fgts}} com saldo do FGTS do COMPRADOR, liberados pelo banco conforme as regras do FGTS;",
          "- R$ {{financiamento}} por financiamento do {{banco}}, pagos pelo banco diretamente ao VENDEDOR depois do registro do contrato na matrícula.",
          "O valor deste contrato é o valor real do negócio, o mesmo que será declarado ao banco, ao cartório e à prefeitura.",
        ],
        nota: "A soma das linhas tem que dar o preço total. O banco só paga o vendedor depois do registro, e isso leva semanas: o vendedor precisa saber disso desde o início. Preço diferente do real (\"preço por fora\") é fraude: o banco empresta sobre o valor declarado e o ITBI é cobrado sobre ele.",
      },
      {
        titulo: "Se o banco negar o financiamento",
        texto: [
          "Este negócio depende da aprovação do financiamento de R$ {{financiamento}} e de a avaliação do banco permitir esse valor. O COMPRADOR tem {{prazo_aprovacao}} dias, contados da assinatura, para conseguir a aprovação.",
          "Se o banco negar o crédito, ou a avaliação vier abaixo e o COMPRADOR não conseguir cobrir a diferença, sem culpa dele, este contrato fica desfeito. O VENDEDOR devolve o sinal inteiro, corrigido pela inflação, em até {{prazo_devolucao}} dias, sem multa para nenhum dos dois.",
          "O COMPRADOR se compromete a entregar ao banco os documentos pedidos e a não assumir dívidas novas até a aprovação. Se o crédito for negado por culpa dele (documento não entregue, desistência, dívida nova), vale a cláusula de desistência.",
        ],
        nota: "É a cláusula que mais protege o comprador. Sem ela, se o banco negar e ninguém tiver desistido, a briga pelo sinal vai parar na Justiça. Juridicamente é uma condição suspensiva: o negócio só produz efeito se o crédito sair (Código Civil, art. 125). Melhor ainda: pague o sinal só depois da avaliação do banco.",
      },
      {
        titulo: "Documentos e prazos",
        texto: [
          "Em até {{prazo_documentos}} dias, o VENDEDOR entrega ao COMPRADOR e ao banco: certidão de matrícula atualizada com negativa de ônus, certidões negativas de IPTU e de condomínio e os documentos pessoais e certidões que o banco pedir.",
          "As partes assinam o contrato do banco assim que ele for liberado. Esse contrato tem força de escritura pública, e o COMPRADOR leva ao registro na matrícula.",
        ],
        nota: "No financiamento, o contrato do banco vale como escritura (Lei 9.514/1997, art. 38): não precisa ir ao tabelião. Pendência em certidão do vendedor é o que mais atrasa a compra; por isso o prazo para entregar.",
      },
      {
        titulo: "Chaves e posse",
        texto: [
          "As chaves são entregues {{entrega_chaves}}, com o imóvel desocupado e no estado em que o COMPRADOR o visitou.",
          "Até a entrega das chaves, as contas do imóvel são do VENDEDOR. Depois, do COMPRADOR.",
        ],
        nota: "Entregar as chaves antes de receber tudo é risco do vendedor; receber tudo antes das chaves é risco do comprador. O meio-termo comum é amarrar a entrega ao pagamento do banco.",
      },
      CLAUSULA_DESPESAS,
      {
        titulo: "Desistência e multa",
        texto: [
          "Se o COMPRADOR desistir, perde o sinal para o VENDEDOR. Se o VENDEDOR desistir, devolve o sinal mais o mesmo valor, com correção pela inflação.",
          "Quem atrasar uma obrigação deste contrato paga multa de {{multa}}% do preço total, além da correção pela inflação, sem prejuízo de a outra parte cobrar perdas maiores que provar.",
        ],
        nota: "É a regra das arras confirmatórias: quem deu o sinal e desiste perde; quem recebeu e desiste devolve o sinal mais o equivalente (Código Civil, arts. 417 a 419). Multa alta demais pode ser reduzida pelo juiz (art. 413): combine um valor que você aceitaria pagar.",
      },
      CLAUSULA_FINAL,
    ],
    conferir: [
      "A soma de sinal, recursos próprios, FGTS e valor financiado é exatamente o preço total.",
      "O valor financiado não passa do que o banco aprovou ou simulou, e o preço é o valor real do negócio.",
      "Existe prazo em dias para a aprovação, para devolver o sinal e para entregar documentos.",
      "Nomes e CPFs iguais aos documentos, e o cônjuge de quem é casado incluído (salvo separação total de bens).",
      "Matrícula e cartório preenchidos como estão na certidão de matrícula.",
    ],
    assinaturas: ["VENDEDOR", "Cônjuge do VENDEDOR", "COMPRADOR", "Cônjuge do COMPRADOR"],
    testemunhas: true,
    local: { cidade: "cidade", data: "data" },
    seo: {
      titulo: "Contrato de compra e venda com financiamento: modelo",
      h1: "Modelo de contrato de compra e venda de imóvel com financiamento",
      descricao: "Modelo grátis em Word e PDF do contrato de compra e venda de imóvel financiado, com a cláusula do financiamento negado e cada cláusula explicada.",
      resposta: "Baixe o modelo em **Word ou PDF**, preencha os campos entre colchetes e leia as notas. A cláusula que mais importa é a do **financiamento negado**: ela diz que o sinal volta se o banco não aprovar.",
    },
    faq: [
      { q: "Esse contrato substitui a escritura?", a: "Não. Ele é o compromisso entre vocês até o banco liberar o financiamento. Quem faz o papel da escritura é o contrato do banco, que depois vai para o registro na matrícula." },
      { q: "Quando pagar o sinal?", a: "O mais seguro é depois da aprovação de crédito e da avaliação do banco. Se pagar antes, a cláusula do financiamento negado precisa estar no contrato." },
      { q: "Precisa reconhecer firma?", a: "Para valer entre vocês, não. Para registrar o compromisso na matrícula, o cartório pede firma reconhecida. Pergunte no cartório do imóvel." },
      { q: "Posso usar esse modelo sem advogado?", a: "Pode, para um negócio simples entre pessoas físicas. Com sinal alto, imóvel com pendência, inventário ou vendedor empresa, pague uma revisão de advogado: custa menos que um problema." },
    ],
  },

  // ——— 2. compra e venda à vista
  {
    id: "modelo-compra-venda-a-vista",
    arquivo: "contrato-compra-e-venda-a-vista",
    tituloDocumento: "Instrumento particular de compromisso de compra e venda de imóvel à vista",
    quando: "O comprador paga com dinheiro próprio, sem banco: um sinal agora e o restante na escritura.",
    naoUse: "Quando parte do preço vem de financiamento (use o modelo com financiamento) ou quando o imóvel tem pendência na matrícula ainda não resolvida.",
    base: ["Código Civil, arts. 108, 413, 417 a 420, 481 a 504, 490, 1.417, 1.418 e 1.647", "CPC, art. 784, III (título executivo)"],
    campos: [
      ...pessoa("vendedor", "Vendedor"),
      conjuge("vendedor", "Vendedor"),
      ...pessoa("comprador", "Comprador"),
      conjuge("comprador", "Comprador"),
      ...IMOVEL,
      { id: "preco", rotulo: "preço total", tipo: "dinheiro", grupo: "Preço e pagamento" },
      { id: "sinal", rotulo: "valor do sinal", tipo: "dinheiro", grupo: "Preço e pagamento" },
      { id: "data_sinal", rotulo: "data do sinal", tipo: "data", grupo: "Preço e pagamento" },
      { id: "forma_sinal", rotulo: "como o sinal é pago", tipo: "texto", grupo: "Preço e pagamento", ajuda: "PIX ou transferência, com os dados da conta do vendedor." },
      { id: "saldo", rotulo: "saldo pago na escritura", tipo: "dinheiro", grupo: "Preço e pagamento" },
      { id: "prazo_escritura", rotulo: "prazo para a escritura (em dias)", tipo: "numero", grupo: "Prazos" },
      { id: "prazo_documentos", rotulo: "prazo para entregar documentos (em dias)", tipo: "numero", grupo: "Prazos" },
      { id: "prazo_devolucao", rotulo: "prazo para devolver o sinal (em dias)", tipo: "numero", grupo: "Prazos" },
      { id: "entrega_chaves", rotulo: "quando as chaves são entregues", tipo: "texto", grupo: "Prazos", ajuda: "Ex.: no dia da escritura, com o saldo pago." },
      { id: "multa", rotulo: "multa por atraso (% do preço)", tipo: "numero", grupo: "Prazos" },
      FORO,
      ...LOCAL,
    ],
    abertura: [
      "VENDEDOR: " + qualificacao("vendedor") + ". Cônjuge: {{vendedor_conjuge}}.",
      "COMPRADOR: " + qualificacao("comprador") + ". Cônjuge: {{comprador_conjuge}}.",
      "As partes acima combinam a compra e venda do imóvel descrito abaixo, nas condições seguintes.",
    ],
    clausulas: [
      CLAUSULA_IMOVEL,
      {
        titulo: "Preço e forma de pagamento",
        texto: [
          "O preço total é de R$ {{preco}}, pago assim:",
          "- R$ {{sinal}} de sinal, pago em {{data_sinal}} por {{forma_sinal}}, como princípio de pagamento e arras confirmatórias;",
          "- R$ {{saldo}} no dia da assinatura da escritura pública, por transferência para a conta do VENDEDOR.",
          "O valor deste contrato é o valor real do negócio, o mesmo que será declarado na escritura e à prefeitura.",
        ],
        nota: "Pague sempre por transferência ou PIX, que deixam rastro. Dinheiro vivo sem recibo é a pior prova que existe. O ITBI é calculado sobre o valor declarado: declarar menos é sonegação.",
      },
      {
        titulo: "Escritura e documentos",
        texto: [
          "Em até {{prazo_documentos}} dias, o VENDEDOR entrega ao COMPRADOR a certidão de matrícula atualizada com negativa de ônus, as certidões negativas de IPTU e de condomínio e as certidões pessoais que o tabelião pedir.",
          "A escritura pública é assinada em até {{prazo_escritura}} dias, no tabelionato de notas escolhido pelo COMPRADOR, que depois leva a escritura ao registro na matrícula.",
          "Se as certidões mostrarem dívida, ação ou trava que impeça a escritura e o VENDEDOR não resolver no prazo, o COMPRADOR pode desfazer o negócio e recebe o sinal de volta, corrigido, em até {{prazo_devolucao}} dias.",
        ],
        nota: "Imóvel acima de 30 salários mínimos só se transfere por escritura pública (Código Civil, art. 108), e só é seu depois do registro. Este contrato amarra o negócio até lá. A última frase protege o comprador de pagar sinal por um imóvel que não pode ser escriturado.",
      },
      {
        titulo: "Chaves e posse",
        texto: [
          "As chaves são entregues {{entrega_chaves}}, com o imóvel desocupado e no estado em que o COMPRADOR o visitou.",
          "Até a entrega das chaves, as contas do imóvel são do VENDEDOR. Depois, do COMPRADOR.",
        ],
        nota: "O jeito mais seguro para os dois: saldo pago, escritura assinada e chaves entregues no mesmo dia.",
      },
      CLAUSULA_DESPESAS,
      {
        titulo: "Desistência e multa",
        texto: [
          "Se o COMPRADOR desistir, perde o sinal para o VENDEDOR. Se o VENDEDOR desistir, devolve o sinal mais o mesmo valor, com correção pela inflação.",
          "Quem atrasar uma obrigação deste contrato paga multa de {{multa}}% do preço total, além da correção pela inflação, sem prejuízo de a outra parte cobrar perdas maiores que provar.",
        ],
        nota: "Regra das arras confirmatórias (Código Civil, arts. 417 a 419). Multa alta demais pode ser reduzida pelo juiz (art. 413).",
      },
      CLAUSULA_FINAL,
    ],
    conferir: [
      "Sinal mais saldo dá exatamente o preço total, e o preço é o valor real do negócio.",
      "Existe prazo em dias para a escritura, para devolver o sinal e para entregar documentos.",
      "Nomes e CPFs iguais aos documentos, e o cônjuge de quem é casado incluído (salvo separação total de bens).",
      "Matrícula e cartório preenchidos como estão na certidão de matrícula.",
    ],
    assinaturas: ["VENDEDOR", "Cônjuge do VENDEDOR", "COMPRADOR", "Cônjuge do COMPRADOR"],
    testemunhas: true,
    local: { cidade: "cidade", data: "data" },
    seo: {
      titulo: "Contrato de compra e venda de imóvel à vista: modelo",
      h1: "Modelo de contrato de compra e venda de imóvel à vista",
      descricao: "Modelo grátis em Word e PDF do contrato de compra e venda de imóvel à vista: sinal, saldo na escritura, certidões e multa, com cada cláusula explicada.",
      resposta: "Baixe o modelo em **Word ou PDF**. À vista, o caminho é **sinal agora, saldo no dia da escritura** e registro logo depois. O contrato amarra o negócio até a escritura.",
    },
    faq: [
      { q: "Compra à vista precisa de escritura?", a: "Sim, se o imóvel vale mais de 30 salários mínimos. O contrato particular não transfere a propriedade: só a escritura registrada na matrícula." },
      { q: "Quem escolhe o cartório da escritura?", a: "Em geral o comprador, que paga a escritura. Pode ser qualquer tabelionato de notas, mesmo de outra cidade." },
      { q: "Posso pagar tudo antes da escritura?", a: "Pode, mas é risco: se aparecer uma dívida ou ação contra o vendedor, você pagou e ainda não é dono. O mais seguro é pagar o saldo no dia da escritura." },
    ],
  },

  // ——— 3. recibo de sinal
  {
    id: "modelo-recibo-de-sinal",
    arquivo: "recibo-de-sinal-de-imovel",
    tituloDocumento: "Recibo de sinal e princípio de pagamento (arras)",
    quando: "O sinal vai ser pago antes de o contrato completo ficar pronto e vocês querem deixar as regras escritas desde já.",
    naoUse: "No lugar do contrato de compra e venda. O recibo prende o negócio; o contrato completo vem depois, no prazo combinado.",
    base: ["Código Civil, arts. 125, 413 e 417 a 420", "CPC, art. 784, III (título executivo)"],
    campos: [
      { id: "vendedor_nome", rotulo: "nome completo de quem recebe (vendedor)", tipo: "texto", grupo: "Vendedor" },
      { id: "vendedor_cpf", rotulo: "CPF do vendedor", tipo: "cpf", grupo: "Vendedor" },
      { id: "comprador_nome", rotulo: "nome completo de quem paga (comprador)", tipo: "texto", grupo: "Comprador" },
      { id: "comprador_cpf", rotulo: "CPF do comprador", tipo: "cpf", grupo: "Comprador" },
      ...IMOVEL.filter((c) => c.id !== "iptu"),
      { id: "sinal", rotulo: "valor do sinal", tipo: "dinheiro", grupo: "Valores" },
      { id: "forma_sinal", rotulo: "como foi pago", tipo: "texto", grupo: "Valores", ajuda: "PIX ou transferência, com data e conta." },
      { id: "preco", rotulo: "preço total combinado", tipo: "dinheiro", grupo: "Valores" },
      { id: "como_restante", rotulo: "como o restante será pago", tipo: "longo", grupo: "Valores", ajuda: "Ex.: R$ 40.000,00 com FGTS e R$ 200.000,00 financiados pela Caixa." },
      { id: "prazo_contrato", rotulo: "prazo para assinar o contrato (em dias)", tipo: "numero", grupo: "Prazos" },
      { id: "prazo_devolucao", rotulo: "prazo para devolver o sinal (em dias)", tipo: "numero", grupo: "Prazos" },
      ...LOCAL,
    ],
    abertura: [
      "Eu, {{vendedor_nome}}, CPF {{vendedor_cpf}}, VENDEDOR, recebi de {{comprador_nome}}, CPF {{comprador_cpf}}, COMPRADOR, a quantia de R$ {{sinal}}, paga por {{forma_sinal}}, como sinal e princípio de pagamento na compra do imóvel abaixo.",
    ],
    clausulas: [
      {
        titulo: "O imóvel e o preço",
        texto: [
          "Imóvel: {{imovel_descricao}}, em {{imovel_endereco}}, matrícula nº {{matricula}} do {{cartorio}}.",
          "Preço total combinado: R$ {{preco}}. O sinal entra nesse preço. O restante será pago assim: {{como_restante}}.",
        ],
        nota: "O sinal desconta do preço, não é um valor a mais. Por lei, sinal é princípio de pagamento quando o negócio se cumpre (Código Civil, art. 417).",
      },
      {
        titulo: "Contrato completo",
        texto: ["As partes assinam o contrato de compra e venda completo em até {{prazo_contrato}} dias, com as mesmas condições deste recibo."],
        nota: "Recibo não tem espaço para tudo: documentos, chaves, despesas, multa. Ponha um prazo curto para o contrato completo.",
      },
      {
        titulo: "Se o banco negar o financiamento",
        texto: [
          "Se parte do preço depende de financiamento e o banco negar o crédito, ou a avaliação vier abaixo e o COMPRADOR não conseguir cobrir a diferença, sem culpa dele, o negócio fica desfeito e o VENDEDOR devolve o sinal inteiro, corrigido pela inflação, em até {{prazo_devolucao}} dias, sem multa para ninguém.",
        ],
        nota: "Sem esta frase, quem paga o sinal e tem o crédito negado pode perder o dinheiro. Se a compra é à vista, apague esta cláusula.",
      },
      {
        titulo: "Desistência",
        texto: ["Se o COMPRADOR desistir, perde o sinal. Se o VENDEDOR desistir, devolve o sinal mais o mesmo valor, com correção pela inflação."],
        nota: "É a regra do Código Civil para o sinal confirmatório (art. 418). Quer que os dois possam desistir pagando só o sinal? Isso é sinal penitencial (art. 420): escreva \"com direito de arrependimento\" e saiba que aí não cabe indenização a mais.",
      },
    ],
    conferir: [
      "O sinal é menor que o preço total e o restante descrito fecha a conta.",
      "Se a compra for à vista, a cláusula do financiamento negado foi apagada; se for financiada, ela continua.",
      "Existe prazo em dias para o contrato completo e para devolver o sinal.",
      "Forma de pagamento rastreável (PIX ou transferência), com data.",
    ],
    assinaturas: ["VENDEDOR (quem recebeu)", "COMPRADOR (quem pagou)"],
    testemunhas: true,
    local: { cidade: "cidade", data: "data" },
    seo: {
      titulo: "Recibo de sinal de imóvel: modelo grátis",
      h1: "Modelo de recibo de sinal de imóvel (arras)",
      descricao: "Modelo de recibo de sinal de compra de imóvel em Word e PDF, com a cláusula do financiamento negado e a regra das arras do Código Civil explicada.",
      resposta: "Baixe o modelo em **Word ou PDF**. Um bom recibo de sinal diz **quanto foi pago, de qual imóvel, o preço total** e **o que acontece com o sinal se o banco negar o crédito** ou alguém desistir.",
    },
    faq: [
      { q: "Recibo de sinal garante a compra?", a: "Ele prende os dois ao negócio, mas não transfere o imóvel. Se o banco negar o crédito e o recibo não disser nada, a devolução do sinal vira discussão." },
      { q: "Quanto dar de sinal?", a: "Não há valor na lei: é o que vocês combinarem. Quanto maior o sinal, maior a perda de quem desiste, então combine depois da avaliação do banco." },
      { q: "Qual a diferença entre sinal confirmatório e penitencial?", a: "No confirmatório, quem desiste perde o sinal e a outra parte ainda pode cobrar prejuízo maior. No penitencial, os dois podem se arrepender pagando só o sinal, sem indenização a mais." },
    ],
  },

  // ——— 4. locação residencial
  {
    id: "modelo-contrato-de-aluguel",
    arquivo: "contrato-de-aluguel-residencial",
    tituloDocumento: "Contrato de locação residencial",
    quando: "Você vai alugar um imóvel para morar, ou pôr o seu para alugar, direto com a outra parte.",
    naoUse: "Aluguel por temporada (até 90 dias), imóvel comercial ou aluguel por plataforma de hospedagem: as regras são outras.",
    base: ["Lei 8.245/1991 (Lei do Inquilinato), arts. 4º, 8º, 13, 17, 22, 23, 27, 35, 36, 37, 38, 46 e 47", "Código Civil, art. 413", "CPC, art. 784, III (título executivo)"],
    campos: [
      ...pessoa("locador", "Locador"),
      ...pessoa("locatario", "Locatário"),
      { id: "imovel_descricao", rotulo: "descrição do imóvel", tipo: "longo", grupo: "O imóvel", ajuda: "Ex.: casa com 2 quartos, sala, cozinha, banheiro e garagem." },
      { id: "imovel_endereco", rotulo: "endereço do imóvel", tipo: "longo", grupo: "O imóvel" },
      { id: "prazo_meses", rotulo: "prazo (em meses)", tipo: "numero", grupo: "Prazo e aluguel" },
      { id: "data_inicio", rotulo: "data de início", tipo: "data", grupo: "Prazo e aluguel" },
      { id: "aluguel", rotulo: "valor do aluguel", tipo: "dinheiro", grupo: "Prazo e aluguel" },
      { id: "dia_vencimento", rotulo: "dia do vencimento", tipo: "numero", grupo: "Prazo e aluguel" },
      { id: "forma_pagamento", rotulo: "como o aluguel é pago", tipo: "texto", grupo: "Prazo e aluguel", ajuda: "PIX para a chave do locador, por exemplo." },
      { id: "indice", rotulo: "índice de reajuste", tipo: "texto", grupo: "Prazo e aluguel", ajuda: "Ex.: IPCA (IBGE). Não pode ser salário mínimo nem moeda estrangeira." },
      { id: "encargos", rotulo: "encargos pagos pelo locatário", tipo: "texto", grupo: "Prazo e aluguel", ajuda: "Ex.: IPTU, condomínio ordinário, água, luz e gás." },
      { id: "garantia", rotulo: "garantia escolhida (só uma)", tipo: "longo", grupo: "Garantia", ajuda: "Ex.: caução de R$ 4.500,00 (3 aluguéis) depositada em poupança; ou fiador: nome, CPF e endereço." },
      { id: "multa_atraso", rotulo: "multa por atraso do aluguel (%)", tipo: "numero", grupo: "Multas" },
      { id: "multa_rescisao", rotulo: "multa por devolução antecipada (nº de aluguéis)", tipo: "numero", grupo: "Multas" },
      FORO,
      ...LOCAL,
    ],
    abertura: [
      "LOCADOR: " + qualificacao("locador") + ".",
      "LOCATÁRIO: " + qualificacao("locatario") + ".",
      "As partes acima combinam a locação residencial do imóvel descrito abaixo, pela Lei 8.245/1991, nas condições seguintes.",
    ],
    clausulas: [
      {
        titulo: "O imóvel",
        texto: [
          "O LOCADOR aluga ao LOCATÁRIO, só para moradia dele e da família, o imóvel {{imovel_descricao}}, localizado em {{imovel_endereco}}.",
          "O estado do imóvel na entrega das chaves está descrito no laudo de vistoria, com fotos, assinado pelos dois e que faz parte deste contrato.",
        ],
        nota: "A lei manda o locador entregar a descrição do estado do imóvel, com os defeitos (Lei 8.245/1991, art. 22, V). Laudo com fotos é o que resolve a briga na devolução.",
      },
      {
        titulo: "Prazo",
        texto: ["A locação dura {{prazo_meses}} meses, a partir de {{data_inicio}}. Se o LOCATÁRIO continuar no imóvel depois disso sem oposição do LOCADOR, a locação segue por prazo indeterminado, nas mesmas condições."],
        nota: "Prazo de 30 meses ou mais permite ao locador pedir o imóvel de volta no fim do prazo sem dar motivo (art. 46). Com menos de 30 meses, depois do fim do prazo ele só retoma nos casos da lei (art. 47). Escolha sabendo disso.",
      },
      {
        titulo: "Aluguel e reajuste",
        texto: [
          "O aluguel é de R$ {{aluguel}} por mês, pago até o dia {{dia_vencimento}} de cada mês por {{forma_pagamento}}.",
          "O aluguel é reajustado a cada 12 meses pela variação do {{indice}}.",
          "Atraso gera multa de {{multa_atraso}}% sobre o valor devido, mais correção pelo mesmo índice.",
        ],
        nota: "O valor é livre, mas não pode ser atrelado a salário mínimo nem a moeda estrangeira (art. 17). O reajuste é anual. Multa alta demais pode ser reduzida pelo juiz (Código Civil, art. 413).",
      },
      {
        titulo: "Encargos",
        texto: [
          "Além do aluguel, o LOCATÁRIO paga: {{encargos}}.",
          "As despesas extraordinárias de condomínio (obras na estrutura, pintura de fachada, fundo de reserva) são do LOCADOR.",
        ],
        nota: "IPTU é do locador, a não ser que o contrato passe para o inquilino (art. 22, VIII). Condomínio do dia a dia é do inquilino; obra e fundo de reserva, do dono (arts. 22, X, e 23, XII).",
      },
      {
        titulo: "Garantia",
        texto: ["Para garantir este contrato, o LOCATÁRIO oferece: {{garantia}}."],
        nota: "A lei proíbe mais de uma garantia no mesmo contrato (art. 37, parágrafo único). As opções são caução, fiador, seguro-fiança ou cessão de cotas de fundo (art. 37). Caução em dinheiro vai até 3 aluguéis, em poupança, e volta com o rendimento (art. 38).",
      },
      {
        titulo: "Uso, conservação e reformas",
        texto: [
          "O LOCATÁRIO cuida do imóvel como se fosse dele e o devolve no estado do laudo de vistoria, salvo o desgaste normal do uso.",
          "O LOCATÁRIO não pode sublocar, emprestar ou ceder o imóvel sem autorização por escrito do LOCADOR.",
          "Obras e reformas só com autorização por escrito do LOCADOR. Benfeitorias necessárias são reembolsadas; as úteis, só se autorizadas; as de enfeite ficam ou são retiradas sem estragar o imóvel.",
        ],
        nota: "Desgaste normal (pintura gasta pelo tempo) não é dano. Sublocar sem autorização é proibido (art. 13). Regras de benfeitorias: arts. 35 e 36.",
      },
      {
        titulo: "Devolução antecipada",
        texto: [
          "Se o LOCATÁRIO devolver o imóvel antes do fim do prazo, paga multa de {{multa_rescisao}} aluguéis, reduzida na proporção do tempo que já cumpriu.",
          "Não há multa se a devolução for porque o empregador do LOCATÁRIO o transferiu para outra cidade, com aviso por escrito de 30 dias.",
        ],
        nota: "A multa é sempre proporcional ao tempo que falta, e a transferência pelo empregador dispensa a multa (art. 4º). O locador não pode pedir o imóvel antes do fim do prazo.",
      },
      {
        titulo: "Venda do imóvel",
        texto: ["Se o LOCADOR decidir vender o imóvel, o LOCATÁRIO tem preferência para comprar nas mesmas condições oferecidas a terceiros, e deve ser avisado por escrito."],
        nota: "É o direito de preferência do inquilino (art. 27). Para a venda não desfazer a locação, o contrato precisa de cláusula de vigência averbada na matrícula (art. 8º); pergunte ao cartório.",
      },
      {
        titulo: "Disposições finais",
        texto: ["Fica eleito o foro da comarca de {{foro}} para resolver qualquer questão sobre este contrato."],
        nota: "Com duas testemunhas, o contrato vira título executivo para cobrar aluguel atrasado (CPC, art. 784, III).",
      },
    ],
    conferir: [
      "Só uma garantia (caução, fiador ou seguro-fiança), e caução em dinheiro de no máximo 3 aluguéis.",
      "O índice de reajuste não é salário mínimo nem moeda estrangeira.",
      "Prazo, data de início, valor, vencimento e encargos preenchidos.",
      "Se houver fiador, o nome dele e do cônjuge entram nas assinaturas.",
    ],
    assinaturas: ["LOCADOR", "LOCATÁRIO", "FIADOR e cônjuge (se houver)"],
    testemunhas: true,
    local: { cidade: "cidade", data: "data" },
    seo: {
      titulo: "Contrato de aluguel residencial: modelo grátis",
      h1: "Modelo de contrato de aluguel residencial",
      descricao: "Modelo de contrato de aluguel de casa ou apartamento em Word e PDF, pela Lei do Inquilinato: prazo, reajuste, garantia, vistoria e multa, explicados.",
      resposta: "Baixe o modelo em **Word ou PDF**. O que mais evita briga no aluguel: **laudo de vistoria com fotos**, **uma garantia só**, **índice de reajuste escrito** e a **multa proporcional** na saída antecipada.",
    },
    faq: [
      { q: "Contrato de aluguel precisa de registro em cartório?", a: "Não para valer entre vocês. O registro só é preciso se o inquilino quiser que o aluguel continue mesmo se o imóvel for vendido." },
      { q: "Posso pedir caução e fiador juntos?", a: "Não. A Lei do Inquilinato permite só uma garantia por contrato." },
      { q: "Qual o melhor prazo?", a: "Para o dono, 30 meses ou mais facilita retomar o imóvel no fim do prazo. Para o inquilino, prazo longo dá estabilidade, e a multa de saída é sempre proporcional." },
    ],
  },

  // ——— 5. distrato
  {
    id: "modelo-distrato",
    arquivo: "distrato-de-compra-e-venda-de-imovel",
    tituloDocumento: "Instrumento particular de distrato de compromisso de compra e venda",
    quando: "Vocês assinaram um compromisso de compra e venda entre pessoas físicas e decidiram desfazer, de comum acordo, por exemplo porque o financiamento foi negado.",
    naoUse: "Compra na planta com construtora (há lei própria, a Lei 13.786/2018), ou quando uma das partes não concorda: aí não é distrato, é rescisão, e vale procurar advogado.",
    base: ["Código Civil, arts. 472 e 473", "Lei 6.015/1973, art. 250, II (cancelamento do registro)", "CPC, art. 784, III (título executivo)"],
    campos: [
      ...pessoa("vendedor", "Vendedor"),
      ...pessoa("comprador", "Comprador"),
      ...IMOVEL.filter((c) => c.id !== "iptu"),
      { id: "data_contrato", rotulo: "data do contrato original", tipo: "data", grupo: "O contrato desfeito" },
      { id: "motivo", rotulo: "motivo (opcional)", tipo: "longo", grupo: "O contrato desfeito", ajuda: "Ex.: o financiamento foi negado pelo banco." },
      { id: "valor_pago", rotulo: "total já pago pelo comprador", tipo: "dinheiro", grupo: "Devolução" },
      { id: "retencao", rotulo: "valor que o vendedor fica (se houver)", tipo: "dinheiro", grupo: "Devolução", ajuda: "Nada? Escreva 0,00." },
      { id: "valor_devolvido", rotulo: "valor devolvido ao comprador", tipo: "dinheiro", grupo: "Devolução" },
      { id: "forma_devolucao", rotulo: "como e até quando é devolvido", tipo: "longo", grupo: "Devolução", ajuda: "Ex.: PIX em parcela única até 10/12/2026." },
      ...LOCAL,
    ],
    abertura: [
      "VENDEDOR: " + qualificacao("vendedor") + ".",
      "COMPRADOR: " + qualificacao("comprador") + ".",
      "As partes acima, de comum acordo, desfazem o compromisso de compra e venda assinado entre elas em {{data_contrato}}, nas condições seguintes.",
    ],
    clausulas: [
      {
        titulo: "O contrato desfeito",
        texto: [
          "Fica desfeito o compromisso de compra e venda do imóvel {{imovel_descricao}}, localizado em {{imovel_endereco}}, matrícula nº {{matricula}} do {{cartorio}}, assinado em {{data_contrato}}.",
          "Motivo: {{motivo}}.",
        ],
        nota: "Distrato é o desfazer de comum acordo. Ele precisa ter a mesma forma do contrato original (Código Civil, art. 472): contrato particular se desfaz por instrumento particular.",
      },
      {
        titulo: "Devolução de valores",
        texto: [
          "O COMPRADOR pagou ao todo R$ {{valor_pago}}. O VENDEDOR fica com R$ {{retencao}} e devolve R$ {{valor_devolvido}} ao COMPRADOR, da seguinte forma: {{forma_devolucao}}.",
        ],
        nota: "Se o contrato original tinha a cláusula do financiamento negado e o crédito foi negado sem culpa do comprador, o normal é devolver tudo. Retenção só faz sentido se o contrato previa ou se as partes concordam.",
      },
      {
        titulo: "Chaves e imóvel",
        texto: ["Se o COMPRADOR recebeu as chaves ou a posse, devolve ao VENDEDOR em até 5 dias da assinatura, no mesmo estado em que recebeu."],
        nota: "Apague esta cláusula se as chaves nunca foram entregues.",
      },
      {
        titulo: "Quitação",
        texto: [
          "Paga a devolução acima, as partes dão uma à outra quitação total: nada mais têm a cobrar uma da outra por causa do contrato desfeito.",
          "Se o compromisso foi registrado na matrícula, as partes assinam com firma reconhecida o pedido de cancelamento do registro, e o custo é dividido entre elas.",
        ],
        nota: "A quitação só vale depois que o dinheiro cair: por isso a frase começa com \"paga a devolução\". Compromisso registrado na matrícula sai com requerimento das duas partes, com firma reconhecida (Lei 6.015/1973, art. 250, II).",
      },
    ],
    conferir: [
      "Valor pago menos valor que o vendedor fica é igual ao valor devolvido.",
      "Forma e data da devolução estão claras, e a quitação só vale depois do pagamento.",
      "Se as chaves nunca foram entregues, a cláusula de chaves foi apagada.",
      "Data do contrato original e dados do imóvel iguais aos do contrato que está sendo desfeito.",
    ],
    assinaturas: ["VENDEDOR", "COMPRADOR"],
    testemunhas: true,
    local: { cidade: "cidade", data: "data" },
    seo: {
      titulo: "Distrato de compra e venda de imóvel: modelo",
      h1: "Modelo de distrato de contrato de compra e venda de imóvel",
      descricao: "Modelo de distrato de compromisso de compra e venda de imóvel entre particulares, em Word e PDF: devolução do sinal, chaves e quitação, explicados.",
      resposta: "Baixe o modelo em **Word ou PDF**. O distrato desfaz o negócio **de comum acordo** e precisa dizer **quanto volta, como e quando**, e dar **quitação só depois do pagamento**.",
    },
    faq: [
      { q: "Distrato e rescisão são a mesma coisa?", a: "Não. Distrato é quando os dois concordam em desfazer. Rescisão é quando um quer desfazer por culpa do outro, e pode acabar na Justiça." },
      { q: "Financiamento negado dá direito ao sinal de volta?", a: "Se o contrato tinha a cláusula do financiamento negado e você não teve culpa, em regra sim. Sem a cláusula, depende do acordo entre vocês." },
      { q: "Serve para imóvel na planta?", a: "Não. Compra de construtora segue a Lei 13.786/2018, com regras próprias de devolução. Este modelo é para negócio entre pessoas." },
    ],
  },

  // ——— 6. declaração de primeiro imóvel
  {
    id: "modelo-declaracao-primeiro-imovel",
    arquivo: "declaracao-de-primeiro-imovel",
    tituloDocumento: "Declaração de primeira aquisição de imóvel residencial",
    quando: "Você está comprando o primeiro imóvel residencial financiado pelo Sistema Financeiro da Habitação e vai pedir ao cartório o desconto de 50% nos emolumentos.",
    naoUse: "Se você já tem ou já teve imóvel residencial: declarar falso é crime. E se o banco ou o cartório tiver formulário próprio, use o deles.",
    base: ["Lei 6.015/1973, art. 290 (redução de 50% nos emolumentos)", "Código Penal, art. 299 (falsidade ideológica)"],
    campos: [
      ...pessoa("comprador", "Comprador"),
      { id: "imovel_descricao", rotulo: "descrição do imóvel", tipo: "longo", grupo: "O imóvel" },
      { id: "imovel_endereco", rotulo: "endereço do imóvel", tipo: "longo", grupo: "O imóvel" },
      { id: "matricula", rotulo: "número da matrícula", tipo: "texto", grupo: "O imóvel" },
      { id: "cartorio", rotulo: "cartório de registro de imóveis", tipo: "texto", grupo: "O imóvel" },
      { id: "banco", rotulo: "banco do financiamento", tipo: "texto", grupo: "O imóvel" },
      ...LOCAL,
    ],
    abertura: ["Eu, " + qualificacao("comprador") + ", declaro, para fins do art. 290 da Lei 6.015/1973, o seguinte:"],
    clausulas: [
      {
        titulo: "O que eu declaro",
        texto: [
          "- Esta é a minha primeira aquisição de imóvel residencial;",
          "- O imóvel {{imovel_descricao}}, em {{imovel_endereco}}, matrícula nº {{matricula}} do {{cartorio}}, é para a minha moradia;",
          "- A compra é financiada pelo {{banco}}, no âmbito do Sistema Financeiro da Habitação.",
          "Peço a redução de 50% nos emolumentos dos atos de registro desta aquisição. Sei que declarar fato falso é crime.",
        ],
        nota: "A redução de 50% nos emolumentos vale para a primeira aquisição residencial financiada pelo SFH (Lei 6.015/1973, art. 290). Nem todo cartório aplica sozinho: leve a declaração e peça. Comprador casado? Cada um que entra na compra assina a sua.",
      },
    ],
    conferir: [
      "A pessoa realmente nunca teve imóvel residencial: se já teve, não deve assinar.",
      "A compra é financiada pelo Sistema Financeiro da Habitação; compra à vista não tem esse desconto.",
      "Matrícula, cartório e banco preenchidos.",
    ],
    assinaturas: ["Declarante"],
    testemunhas: false,
    local: { cidade: "cidade", data: "data" },
    seo: {
      titulo: "Declaração de primeiro imóvel: modelo para o cartório",
      h1: "Modelo de declaração de primeiro imóvel (desconto no cartório)",
      descricao: "Modelo de declaração de primeira aquisição de imóvel residencial, em Word e PDF, para pedir o desconto de 50% nos emolumentos do registro (Lei 6.015/73, art. 290).",
      resposta: "Baixe o modelo em **Word ou PDF**. O primeiro imóvel residencial **financiado pelo SFH** tem **50% de desconto** nos emolumentos do registro (Lei 6.015/73, art. 290). Leve a declaração e peça ao cartório.",
    },
    faq: [
      { q: "O desconto é automático?", a: "Nem sempre. Muitos cartórios pedem uma declaração assinada. Leve a sua e peça o desconto na hora de registrar." },
      { q: "Vale para compra à vista?", a: "Não. A regra da lei é para a primeira aquisição residencial financiada pelo Sistema Financeiro da Habitação." },
      { q: "E o ITBI, tem desconto?", a: "O ITBI é da prefeitura e cada cidade tem a sua regra. A declaração serve para o cartório, não para o imposto." },
    ],
  },
];

export const modelo = (id: string) => {
  const m = MODELOS.find((x) => x.id === id);
  if (!m) throw new Error(`Modelo inexistente: ${id}`);
  return m;
};

export const modeloPorArquivo = (arquivo: string) => MODELOS.find((m) => m.arquivo === arquivo);

export type Formato = "docx" | "pdf";

/** Onde o arquivo em branco é servido (gerado no build por src/app/arquivos/modelos/[arquivo]/route.ts). */
export const urlArquivo = (m: Modelo, formato: Formato) => `/arquivos/modelos/${m.arquivo}.${formato}`;
