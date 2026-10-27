/**
 * Personas profissionais: quem trabalha com o comprador do primeiro imóvel e o que a
 * Primeira Chave entrega para cada um. Cada persona vira /para/<id>/.
 * Nada aqui promete comissão, indicação paga ou aprovação de crédito.
 */

export type Persona = {
  id: string;
  /** Rótulo curto (menu, cartões). */
  nome: string;
  /** "Quem é o corretor?": o título do cartão em "Quem é quem na fila do pão?". */
  quem: string;
  /** O papel em uma frase, para quem não é do ramo. */
  papel: string;
  /** H1 da página. */
  titulo: string;
  tituloSeo: string;
  descricao: string;
  /** A promessa em uma frase. */
  promessa: string;
  /** O que trava o dia a dia hoje. */
  trava: string[];
  /** O que entregamos: título, texto e destino (id da árvore ou rota). */
  ajuda: { titulo: string; texto: string; href: string }[];
  /** Como usar no dia a dia. */
  passos: { titulo: string; texto: string }[];
  /** Cartas do Duvide para mandar ao cliente. */
  cartas: string[];
  faq: { q: string; a: string }[];
};

const SIMULADOR = "/simulador-financiamento-caixa/";

export const PERSONAS: Persona[] = [
  {
    id: "corretor",
    nome: "Corretor",
    quem: "Quem é o corretor?",
    papel: "O profissional com CRECI que aproxima comprador e vendedor e acompanha o negócio até a assinatura.",
    titulo: "Para o corretor: cliente que entende financiamento fecha mais rápido",
    tituloSeo: "Ferramentas grátis para corretor de imóveis",
    descricao: "Simulador com as regras da Caixa, posts prontos e guias para mandar ao cliente: ferramentas grátis para o corretor de imóveis vender para quem vai financiar.",
    promessa: "Cliente que chega sabendo quanto pode comprar, com a documentação encaminhada e sem medo do banco.",
    trava: [
      "O cliente se encanta por um imóvel que a renda dele não financia.",
      "A avaliação vem abaixo do preço e o negócio trava na reta final.",
      "Documento que chega aos poucos atrasa o processo em semanas.",
      "Explicar SAC, faixa e entrada para cada cliente toma o dia.",
    ],
    ajuda: [
      { titulo: "Simulador para o atendimento", texto: "As regras da Caixa em 10 perguntas, com o próximo passo do cliente.", href: SIMULADOR },
      { titulo: "Posts prontos", texto: "Cards 1080×1350 com legenda para copiar.", href: "/duvide/corretor/" },
      { titulo: "Guias para mandar no WhatsApp", texto: "Cada dúvida do cliente tem uma página com resposta curta.", href: "/guias/" },
      { titulo: "Preço do m² real", texto: "Mapa de preço pago por distrito, para conversar com dados.", href: "/metro-quadrado-sao-paulo/" },
    ],
    passos: [
      { titulo: "Antes da visita", texto: "Mande o simulador: o cliente chega sabendo o teto dele." },
      { titulo: "Na escolha", texto: "Confira se o preço cabe na avaliação provável do imóvel." },
      { titulo: "Na proposta", texto: "Mande o checklist de documentos e a regra do sinal." },
      { titulo: "No feed", texto: "Poste um card por semana: cliente educado volta." },
    ],
    cartas: ["aprovado-fechado", "avaliacao-acima-zera-entrada", "sinal-garante"],
    faq: [
      { q: "Posso usar os posts com a minha marca?", a: "Pode postar os cards como estão, à vontade. A marca da Primeira Chave no card leva o cliente às explicações completas." },
      { q: "O simulador substitui a simulação do banco?", a: "Não: ele reproduz as regras da Caixa para orientar. A simulação oficial e a aprovação são do banco." },
    ],
  },
  {
    id: "corretor-parceiro",
    nome: "Corretor em parceria",
    quem: "Quem é o corretor em parceria?",
    papel: "Quando dois corretores dividem a venda: um traz o comprador, o outro tem o imóvel.",
    titulo: "Para quem vende em parceria: o mesmo roteiro para os dois lados",
    tituloSeo: "Venda em parceria entre corretores: o roteiro",
    descricao: "Na venda em parceria entre corretores, cada um tem um cliente. Um roteiro único de financiamento, documentos e contrato evita ruído entre comprador e vendedor.",
    promessa: "Comprador e vendedor com a mesma informação, do crédito ao registro, mesmo com dois corretores no negócio.",
    trava: [
      "Cada corretor explica o financiamento de um jeito, e o cliente fica inseguro.",
      "Ninguém sabe quem está cuidando dos documentos do vendedor.",
      "O prazo do dinheiro (só depois do registro) pega o vendedor de surpresa.",
      "O sinal é pago sem cláusula para o caso de o banco negar.",
    ],
    ajuda: [
      { titulo: "Roteiro do comprador", texto: "Do quanto posso à chave, fase por fase.", href: "/comprar/" },
      { titulo: "Roteiro do vendedor", texto: "Documentos, preço que cabe na avaliação e quando recebe.", href: "/vender/" },
      { titulo: "O contrato", texto: "As cinco coisas que não podem faltar, inclusive o financiamento negado.", href: "/contrato-de-compra-e-venda/" },
      { titulo: "Prazos", texto: "Quanto tempo leva cada etapa, para alinhar expectativas.", href: "/quanto-tempo-demora-o-financiamento/" },
    ],
    passos: [
      { titulo: "Combine o roteiro", texto: "Os dois corretores mandam as mesmas páginas aos clientes." },
      { titulo: "Divida as pastas", texto: "Um cuida dos documentos do comprador, o outro dos do vendedor." },
      { titulo: "Escreva o sinal", texto: "O que acontece se o banco negar, antes do pagamento." },
      { titulo: "Alinhe o prazo", texto: "O vendedor recebe depois do registro, não na assinatura." },
    ],
    cartas: ["recebo-na-assinatura", "sinal-garante", "anuncio-alto"],
    faq: [
      { q: "Como evitar ruído entre os dois clientes?", a: "Mandando a mesma informação aos dois: as páginas de comprar e vender seguem as mesmas regras e os mesmos prazos." },
    ],
  },
  {
    id: "cca",
    nome: "Correspondente (CCA)",
    quem: "Quem é o correspondente (CCA)?",
    papel: "O Correspondente Caixa Aqui recebe os documentos e encaminha o financiamento ao banco, que é quem aprova.",
    titulo: "Para o correspondente: cliente que chega pronto para a análise",
    tituloSeo: "Correspondente Caixa Aqui: cliente que chega pronto",
    descricao: "Para o correspondente Caixa Aqui: clientes que chegam sabendo a faixa, com o CPF conferido no Registrato e a lista de documentos em mãos. Menos retrabalho.",
    promessa: "Menos retrabalho: o cliente chega sabendo a faixa, com o CPF conferido e a lista de documentos em mãos.",
    trava: [
      "Cliente com restrição no nome descobre só na análise.",
      "Documentos incompletos voltam e voltam.",
      "Expectativa errada sobre entrada, FGTS e prazo.",
      "Tempo gasto explicando o básico, caso a caso.",
    ],
    ajuda: [
      { titulo: "Simulador com as regras da Caixa", texto: "Conferido no simulador oficial em seis perfis de renda.", href: SIMULADOR },
      { titulo: "Registrato e score", texto: "O cliente vê antes o que o banco vai ver.", href: "/atalhos/registrato/" },
      { titulo: "Checklist de documentos", texto: "Comprador, vendedor e imóvel, para entregar de uma vez.", href: "/documentos-para-financiar-imovel/" },
      { titulo: "FGTS", texto: "As três regras para o FGTS entrar na compra.", href: "/usar-fgts-para-comprar-imovel/" },
    ],
    passos: [
      { titulo: "No primeiro contato", texto: "Mande o simulador e o Registrato." },
      { titulo: "Antes da análise", texto: "Mande o checklist de documentos." },
      { titulo: "Na avaliação", texto: "Mande a página que explica abaixo e acima do preço." },
      { titulo: "No contrato", texto: "Mande registro e chaves: o cliente sabe o que vem depois." },
    ],
    cartas: ["cobram-para-aprovar", "score-alto-aprova", "fgts-qualquer-imovel"],
    faq: [
      { q: "A Primeira Chave é correspondente bancário?", a: "Não. Somos um conteúdo educativo. O que fazemos é preparar o cliente para chegar ao correspondente e ao banco com a documentação e a expectativa certas." },
    ],
  },
  {
    id: "agente-financiamento",
    nome: "Agente de financiamento",
    quem: "Quem é o agente de financiamento?",
    papel: "Quem compara e encaminha o crédito em mais de um banco, para o cliente escolher a melhor condição.",
    titulo: "Para o agente de financiamento: o cliente entende a comparação",
    tituloSeo: "Agente de financiamento: material para explicar ao cliente",
    descricao: "Para o agente de financiamento que trabalha com vários bancos: material para explicar SAC ou PRICE, custo total, faixas e avaliação, e o cliente decidir rápido.",
    promessa: "Quem trabalha com vários bancos precisa que o cliente entenda a comparação. Aqui está a base, em português claro.",
    trava: [
      "O cliente compara só a primeira parcela, não o custo total.",
      "SAC e PRICE confundem até quem já financiou.",
      "Faixa do MCMV e linha de mercado parecem a mesma coisa.",
      "A avaliação muda a entrada e o cliente não entende por quê.",
    ],
    ajuda: [
      { titulo: "SAC ou PRICE", texto: "A comparação em uma imagem e em números.", href: "/sac-ou-price/" },
      { titulo: "Quanto custa financiar", texto: "O total pago em 35 anos, com juros, seguros e taxas.", href: "/quanto-custa-financiar-um-imovel/" },
      { titulo: "Faixas do MCMV", texto: "Renda, teto e juros de cada faixa.", href: "/minha-casa-minha-vida/faixas/" },
      { titulo: "Avaliação", texto: "Por que o laudo muda a entrada.", href: "/avaliacao-do-imovel-pela-caixa/" },
    ],
    passos: [
      { titulo: "Explique o custo total", texto: "Mande a página do quanto custa financiar." },
      { titulo: "Compare os sistemas", texto: "SAC ou PRICE, com a renda do cliente." },
      { titulo: "Mostre o degrau", texto: "Quem está perto do limite de faixa precisa saber." },
      { titulo: "Prepare a avaliação", texto: "Preço que cabe no laudo evita surpresa." },
    ],
    cartas: ["quitar-parcela-pequena", "avaliacao-acima-zera-entrada", "score-alto-aprova"],
    faq: [
      { q: "Os juros do site valem para todos os bancos?", a: "Não: usamos as regras da Caixa conferidas no simulador oficial. Outros bancos têm taxas e políticas próprias; o site explica a lógica, que é a mesma." },
    ],
  },
  {
    id: "investidor",
    nome: "Investidor",
    quem: "Quem é o investidor?",
    papel: "Quem compra para reformar e revender, ou para alugar, e quase sempre vende para quem vai financiar.",
    titulo: "Para o investidor: compre bem, reforme e venda para quem financia",
    tituloSeo: "Investir em imóvel para reformar e revender: a conta",
    descricao: "Para quem compra, reforma e revende: teto do lance no leilão, preço real do m², imposto na venda e o comprador final que financia. A conta antes da compra.",
    promessa: "Quem compra para reformar e revender vende, quase sempre, para alguém que vai financiar. A conta começa por ele.",
    trava: [
      "Começar pelo desconto do anúncio, e não pelo valor de mercado.",
      "Esquecer ocupação, dívidas e reforma na conta do lance.",
      "Anunciar acima do que o banco do comprador vai avaliar.",
      "Descobrir o imposto da venda só depois de vender.",
    ],
    ajuda: [
      { titulo: "Teto do lance", texto: "A conta de trás para frente, a partir do valor de mercado.", href: "/como-comprar-imovel-de-leilao/" },
      { titulo: "Reforma no leilão", texto: "Quando a conta fecha, com folga de 20%.", href: "/imovel-de-leilao-vale-a-pena/" },
      { titulo: "Preço real do m²", texto: "O que as pessoas pagaram de verdade, distrito por distrito.", href: "/metro-quadrado-sao-paulo/" },
      { titulo: "Imposto na venda", texto: "Ganho de capital, isenções e a calculadora.", href: "/imposto-na-venda-de-imovel/" },
    ],
    passos: [
      { titulo: "Valor de mercado primeiro", texto: "Pelo preço pago, não pelo anúncio." },
      { titulo: "Teto do lance", texto: "Desconte reforma, custos, dívidas e margem." },
      { titulo: "Venda que financia", texto: "Preço que cabe na avaliação do banco do comprador." },
      { titulo: "Imposto no plano", texto: "Calcule o ganho de capital antes de comprar." },
    ],
    cartas: ["leilao-sempre-barato", "preco-por-fora", "anuncio-alto"],
    faq: [
      { q: "Imóvel reformado é avaliado acima do preço de compra?", a: "Costuma ser, porque a reforma aumenta o valor de mercado. É isso que permite ao comprador final financiar com pouca ou nenhuma entrada." },
    ],
  },
  {
    id: "construtor",
    nome: "Construtor",
    quem: "Quem é o construtor?",
    papel: "Quem constrói e vende o imóvel novo, na planta ou pronto, e depende de o comprador conseguir financiar.",
    titulo: "Para o construtor: produto que cabe na faixa do comprador",
    tituloSeo: "Construtor: imóvel na faixa do Minha Casa Minha Vida",
    descricao: "Para o construtor: teto do imóvel em cada faixa do Minha Casa Minha Vida, renda do comprador por valor, habite-se e INCC. Produto que o banco financia.",
    promessa: "Imóvel que o comprador consegue financiar vende mais rápido. A faixa do comprador define o teto do seu produto.",
    trava: [
      "Produto acima do teto da faixa do público da região.",
      "Comprador que não sabe se a renda dele aguenta.",
      "Imóvel sem habite-se ou sem averbação não financia.",
      "Correção pelo INCC na obra assusta o comprador na entrega.",
    ],
    ajuda: [
      { titulo: "Teto por faixa", texto: "Renda e valor máximo do imóvel em cada faixa do MCMV.", href: "/minha-casa-minha-vida/faixas/" },
      { titulo: "Renda por valor", texto: "A renda mínima para cada valor de imóvel.", href: "/quanto-preciso-ganhar-para-financiar/" },
      { titulo: "Quanto a renda compra", texto: "Valor financiado e m² em cada capital.", href: "/quanto-minha-renda-compra/" },
      { titulo: "Na planta e INCC", texto: "Como explicar a correção da obra ao comprador.", href: "/como-financiar-um-apartamento/" },
    ],
    passos: [
      { titulo: "Defina o público", texto: "Qual faixa de renda compra na sua região." },
      { titulo: "Ajuste o produto", texto: "Preço dentro do teto da faixa." },
      { titulo: "Documente a obra", texto: "Habite-se e averbação na matrícula." },
      { titulo: "Explique o INCC", texto: "Antes da venda, não na entrega." },
    ],
    cartas: ["planta-preco-fechado", "fgts-qualquer-imovel", "avaliacao-acima-zera-entrada"],
    faq: [
      { q: "Imóvel sem habite-se pode ser financiado?", a: "Em geral não: o banco exige a construção averbada na matrícula." },
    ],
  },
  {
    id: "imobiliaria",
    nome: "Imobiliária",
    quem: "Quem é a imobiliária?",
    papel: "A empresa que reúne os corretores, os anúncios e a estrutura do atendimento.",
    titulo: "Para a imobiliária: a equipe falando a mesma língua",
    tituloSeo: "Imobiliária: treinamento e conteúdo sobre financiamento",
    descricao: "Para a imobiliária: material para treinar a equipe em financiamento, posts prontos para as redes e um simulador para padronizar o atendimento.",
    promessa: "Equipe que explica financiamento do mesmo jeito, e conteúdo para as redes sem precisar produzir do zero.",
    trava: [
      "Cada corretor explica o financiamento de um jeito.",
      "Corretor novo leva meses para dominar crédito e documentação.",
      "Produzir conteúdo para as redes toda semana.",
      "Negócios que caem na avaliação ou na documentação.",
    ],
    ajuda: [
      { titulo: "Treinamento da equipe", texto: "Os guias, na ordem da compra, servem de trilha.", href: "/guias/" },
      { titulo: "Posts prontos", texto: "Cards com legenda para o feed da imobiliária.", href: "/duvide/corretor/" },
      { titulo: "Simulador padrão", texto: "O mesmo cálculo em todos os atendimentos.", href: SIMULADOR },
      { titulo: "Duvide", texto: "As armadilhas que derrubam negócios, para a equipe evitar.", href: "/duvide/" },
    ],
    passos: [
      { titulo: "Trilha do corretor novo", texto: "Guias de comprar e financiar, em uma semana." },
      { titulo: "Atendimento padrão", texto: "Simulador no primeiro contato com o cliente." },
      { titulo: "Calendário de posts", texto: "Um card do Duvide por semana." },
      { titulo: "Revisão de negócios", texto: "Avaliação e documentação antes do sinal." },
    ],
    cartas: ["contrato-de-gaveta", "agio", "aprovado-fechado"],
    faq: [
      { q: "Posso usar os guias para treinar a equipe?", a: "Pode. Os guias são abertos e seguem a ordem da compra, do quanto posso à chave." },
    ],
  },
];

export const personaPorId = (id: string) => PERSONAS.find((p) => p.id === id);
