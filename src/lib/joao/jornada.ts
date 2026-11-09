/**
 * A jornada do painel: a mesma fonte para a tela e para o teste. Só educa, organiza e
 * acompanha: quem marca é a pessoa e quem confirma de verdade está em `confirma`.
 * Nada aqui recebe documento nem diz que a Primeira Chave aprovou algo.
 */
export type StatusItem = "fazer" | "marcou" | "banco" | "atencao";

export const STATUS: Record<StatusItem, { rotulo: string; ajuda: string }> = {
  fazer: { rotulo: "A fazer", ajuda: "Ainda não começou." },
  marcou: { rotulo: "Você marcou", ajuda: "Você disse que fez. A Primeira Chave não conferiu." },
  banco: { rotulo: "Confirmado", ajuda: "Você informou que quem confirma já confirmou." },
  atencao: { rotulo: "Atenção", ajuda: "Algo pede cuidado. Vale conversar com quem confirma." },
};

export type Etapa = { id: string; nome: string; confirma: string; pagina: string; pergunta: string; itens: { id: string; texto: string }[] };

export const JORNADA: Etapa[] = [
  {
    id: "preparo",
    nome: "Preparação",
    confirma: "Você, com os números do plano",
    pagina: "preparar-a-casa",
    pergunta: "Como me preparar antes de pedir o financiamento?",
    itens: [
      { id: "cred-nome", texto: "Conferi o nome e as dívidas no Registrato" },
      { id: "prep-dividas", texto: "Listei as parcelas de dívidas que pago hoje" },
      { id: "cred-fgts", texto: "Conferi o saldo do FGTS e os 3 anos de carteira" },
      { id: "prep-reserva", texto: "Separei um valor por mês para a entrada e os custos" },
    ],
  },
  {
    id: "documentos",
    nome: "Documentos",
    confirma: "O banco",
    pagina: "documentos-financiamento",
    pergunta: "Quais documentos eu preciso?",
    itens: [
      { id: "doc-identidade", texto: "Identidade de quem compra" },
      { id: "doc-renda", texto: "Comprovante de renda" },
      { id: "doc-ir", texto: "Última declaração de IR com recibo" },
    ],
  },
  {
    id: "credito",
    nome: "Crédito",
    confirma: "O banco ou o correspondente",
    pagina: "score",
    pergunta: "Como funciona a análise de crédito?",
    itens: [
      { id: "cred-comparar", texto: "Comparei pelo menos dois bancos ou correspondentes" },
      { id: "cred-analise", texto: "Recebi o resultado da análise de crédito" },
    ],
  },
  {
    id: "avaliacao",
    nome: "Avaliação",
    confirma: "O engenheiro do banco",
    pagina: "avaliacao-do-imovel",
    pergunta: "Como funciona a avaliação do banco?",
    itens: [
      { id: "aval-pedido", texto: "Pedi a avaliação antes de pagar qualquer sinal" },
      { id: "aval-laudo", texto: "Recebi o valor da avaliação e anotei no painel" },
    ],
  },
  {
    id: "proposta",
    nome: "Proposta",
    confirma: "Você, com advogado se houver ônus",
    pagina: "certidao-matricula",
    pergunta: "O que conferir na matrícula do imóvel?",
    itens: [
      { id: "prop-matricula", texto: "Li a matrícula atualizada do imóvel" },
      { id: "prop-vendedor", texto: "Conferi os documentos do vendedor" },
      { id: "prop-sinal", texto: "Combinei a proposta e o sinal por escrito" },
    ],
  },
  {
    id: "contrato",
    nome: "Contrato",
    confirma: "O banco e as partes",
    pagina: "contrato-compra-venda",
    pergunta: "O que conferir no contrato?",
    itens: [
      { id: "cont-valores", texto: "Conferi valores, prazos e nomes" },
      { id: "cont-assinado", texto: "Assinei o contrato" },
    ],
  },
  {
    id: "itbi",
    nome: "ITBI",
    confirma: "A prefeitura",
    pagina: "calculadora-itbi",
    pergunta: "Quanto custa o ITBI em Goiânia?",
    itens: [
      { id: "itbi-valor", texto: "Confirmei o valor com a prefeitura" },
      { id: "itbi-pago", texto: "Paguei o ITBI (o FGTS não paga)" },
    ],
  },
  {
    id: "cartorio",
    nome: "Cartório",
    confirma: "O cartório",
    pagina: "custos-compra",
    pergunta: "Quanto custa o registro no cartório?",
    itens: [
      { id: "cart-valor", texto: "Confirmei o valor do registro" },
      { id: "cart-desconto", texto: "Perguntei sobre o desconto de primeiro imóvel" },
    ],
  },
  {
    id: "registro",
    nome: "Registro",
    confirma: "O cartório",
    pagina: "registro-do-imovel",
    pergunta: "Como funciona o registro do imóvel?",
    itens: [
      { id: "reg-entregue", texto: "Levei o contrato para registrar" },
      { id: "reg-matricula", texto: "A matrícula já mostra o novo dono" },
    ],
  },
  {
    id: "chaves",
    nome: "Chaves",
    confirma: "As partes",
    pagina: "modelo-termo-entrega-chaves",
    pergunta: "O que olhar na vistoria final?",
    itens: [
      { id: "chave-vistoria", texto: "Fiz a vistoria final" },
      { id: "chave-entrega", texto: "Recebi as chaves" },
    ],
  },
];
