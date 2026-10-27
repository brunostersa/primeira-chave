import type { NomeCena } from "@/components/brand/ilustracoes";

/**
 * A árvore de conteúdo da Primeira Chave: fonte única de todas as páginas.
 * Links internos, breadcrumbs, "próximo passo", relacionados, sitemap e /mapa
 * são derivados daqui (ver links.ts). Regras em docs/arquitetura-de-conteudo.md.
 *
 * Volumes: Google Ads, Brasil, média mensal out/2025–set/2026.
 */

export type Tipo = "inicio" | "nucleo" | "hub" | "guia" | "ferramenta" | "atalho" | "glossario" | "programatica" | "local";
export type HubId = "comprar" | "financiar" | "programas" | "leilao" | "vender" | "atalhos" | "ferramentas" | "glossario" | "guias";
export type EtapaId = "descobrir" | "preparar" | "aprovar" | "escolher" | "avaliar" | "contratar" | "registrar" | "depois" | "vender";

export type No = {
  id: string;
  slug: string;
  titulo: string;
  /** Uma linha: a pergunta que a página responde. */
  resumo: string;
  tipo: Tipo;
  hub: HubId | null;
  etapa: EtapaId | null;
  /** Termos de busca-alvo com volume mensal. */
  termos: [string, number][];
  ilustracao?: NomeCena;
  /** Ligações explícitas (ids), além das automáticas. */
  liga: string[];
  /** Termos do glossário (ids sem o prefixo "g-") explicados ou usados na página. */
  glossario: string[];
  prioridade: 1 | 2 | 3;
  status: "publicado" | "planejado";
};

export const ETAPAS: { id: EtapaId; nome: string; pergunta: string; porta: string }[] = [
  { id: "descobrir", nome: "Descobrir", pergunta: "Quanto eu posso comprar?", porta: "simulador" },
  { id: "preparar", nome: "Preparar", pergunta: "O que eu arrumo antes?", porta: "preparar-a-casa" },
  { id: "aprovar", nome: "Aprovar o crédito", pergunta: "O banco vai aprovar?", porta: "documentos-financiamento" },
  { id: "escolher", nome: "Escolher o imóvel", pergunta: "Qual imóvel cabe?", porta: "sem-entrada-casa" },
  { id: "avaliar", nome: "Avaliação do banco", pergunta: "Quanto o banco acha que vale?", porta: "avaliacao-do-imovel" },
  { id: "contratar", nome: "Contrato", pergunta: "Como fecho o negócio?", porta: "contrato-compra-venda" },
  { id: "registrar", nome: "Registro e chaves", pergunta: "Quando a chave é minha?", porta: "registro-do-imovel" },
  { id: "depois", nome: "Depois da chave", pergunta: "Como pago menos?", porta: "amortizar-fgts" },
  { id: "vender", nome: "Vender", pergunta: "Como vendo meu usado?", porta: "vender" },
];

export const HUBS: { id: HubId; no: string; cor: "mark" | "planta" | "ink" }[] = [
  { id: "comprar", no: "comprar", cor: "mark" },
  { id: "financiar", no: "financiamento-imobiliario", cor: "planta" },
  { id: "programas", no: "minha-casa-minha-vida", cor: "planta" },
  { id: "leilao", no: "leilao-caixa", cor: "mark" },
  { id: "vender", no: "vender", cor: "ink" },
  { id: "atalhos", no: "atalhos", cor: "ink" },
  { id: "ferramentas", no: "ferramentas", cor: "mark" },
  { id: "glossario", no: "glossario", cor: "planta" },
  { id: "guias", no: "guias", cor: "ink" },
];

type Def = Omit<No, "liga" | "glossario" | "termos" | "prioridade" | "status"> &
  Partial<Pick<No, "liga" | "glossario" | "termos" | "prioridade" | "status">>;

const no = (d: Def): No => ({ liga: [], glossario: [], termos: [], prioridade: 2, status: "planejado", ...d });

const GLOSSARIO: [id: string, termo: string, resumo: string][] = [
  ["avaliacao", "Avaliação do imóvel", "O valor que o engenheiro do banco dá ao imóvel. É sobre ele que o banco empresta."],
  ["entrada", "Entrada", "A parte do preço que o banco não financia e sai do seu bolso ou do FGTS."],
  ["cota-de-financiamento", "Cota de financiamento", "Quanto do imóvel o banco empresta: até 80% da avaliação, sem passar do preço."],
  ["renda-bruta", "Renda bruta", "O que você ganha antes dos descontos. É ela que o banco usa."],
  ["comprometimento-de-renda", "Comprometimento de renda", "A fatia da renda que a parcela pode ocupar: em geral, 30%."],
  ["itbi", "ITBI", "O imposto da prefeitura sobre a compra. Varia por cidade, perto de 2% a 3%."],
  ["fgts", "FGTS", "O fundo da carteira assinada. Paga entrada e abate a dívida; não paga ITBI nem cartório."],
  ["mcmv", "Minha Casa Minha Vida", "O programa do governo com juros menores por faixa de renda."],
  ["sbpe", "SBPE", "A linha de mercado, com dinheiro da poupança, para quem não entra no MCMV."],
  ["tr", "TR", "Taxa que corrige o saldo todo mês, além dos juros."],
  ["sac", "SAC", "Sistema em que a parcela começa mais alta e vai caindo."],
  ["price", "PRICE", "Sistema em que a parcela fica igual do começo ao fim."],
  ["mip-dfi", "Seguros MIP e DFI", "Os seguros obrigatórios: morte e invalidez (MIP) e danos ao imóvel (DFI)."],
  ["matricula", "Matrícula do imóvel", "A certidão de nascimento do imóvel, no cartório de registro."],
  ["onus", "Ônus reais", "Dívidas e travas que pesam sobre o imóvel, como hipoteca ou penhora."],
  ["alienacao-fiduciaria", "Alienação fiduciária", "O imóvel fica em nome do banco como garantia até você quitar."],
  ["escritura", "Escritura", "O documento do negócio. No financiamento, o próprio contrato do banco faz esse papel."],
  ["registro", "Registro", "Quando o contrato entra na matrícula. Só aí o vendedor recebe."],
  ["score", "Score", "A nota de crédito do seu CPF, que pesa na aprovação."],
  ["carta-de-credito", "Carta de crédito", "A aprovação do banco antes de escolher o imóvel."],
  ["laudo", "Laudo de avaliação", "O documento com o valor da avaliação do engenheiro."],
  ["ganho-de-capital", "Ganho de capital", "O lucro na venda do imóvel, sobre o qual pode haver imposto."],
  ["leilao", "Leilão de imóvel", "Venda pública de imóveis retomados, muitas vezes abaixo do mercado."],
];

export const ARVORE: No[] = [
  // ——— raiz e núcleo
  no({ id: "inicio", slug: "/", titulo: "Primeira Chave", resumo: "Do zero à chave do primeiro imóvel.", tipo: "inicio", hub: null, etapa: null, prioridade: 1, status: "publicado", liga: ["simulador", "guias", "comprar", "vender", "atalhos", "leilao-caixa", "minha-casa-minha-vida", "financiamento-imobiliario", "sem-entrada-casa"] }),
  no({ id: "simulador", slug: "/simulador/", titulo: "Simulador de financiamento", resumo: "Quanto você pode comprar, quanto falta e o próximo passo.", tipo: "nucleo", hub: "ferramentas", etapa: "descobrir", ilustracao: "calcular", prioridade: 1, status: "publicado", termos: [["simulador caixa habitação", 301000], ["simulador caixa", 201000], ["simulação financiamento caixa", 165000], ["simulador de financiamento", 74000], ["simular financiamento", 40500]], glossario: ["renda-bruta", "comprometimento-de-renda", "entrada", "cota-de-financiamento", "mcmv", "sbpe"], liga: ["sem-entrada-casa", "quanto-preciso-ganhar", "preparar-a-casa"] }),

  // ——— hubs
  no({ id: "comprar", status: "publicado", slug: "/comprar/", titulo: "Do zero à chave", resumo: "As etapas da compra do primeiro imóvel, em ordem.", tipo: "hub", hub: "comprar", etapa: null, ilustracao: "a-chave", prioridade: 1, liga: ["simulador", "guias", "preparar-a-casa", "documentos-financiamento", "sem-entrada-casa", "avaliacao-do-imovel", "contrato-compra-venda", "registro-do-imovel", "amortizar-fgts"] }),
  no({ id: "financiamento-imobiliario", status: "publicado", slug: "/financiamento-imobiliario/", titulo: "Financiamento imobiliário, explicado", resumo: "Como funciona, quanto custa e o que o banco olha.", tipo: "hub", hub: "financiar", etapa: "descobrir", ilustracao: "banco", prioridade: 2, termos: [["financiamento imobiliário", 18100], ["financiamento caixa", 135000], ["financiamento de casa", 8100], ["como funciona o financiamento da caixa", 2900]], glossario: ["cota-de-financiamento", "sac", "price", "tr", "mip-dfi", "alienacao-fiduciaria"], liga: ["simulador", "como-financiar-casa-caixa", "como-financiar-apartamento", "sac-ou-price"] }),
  no({ id: "minha-casa-minha-vida", status: "publicado", slug: "/minha-casa-minha-vida/", titulo: "Minha Casa Minha Vida, sem complicação", resumo: "Quem pode, faixas, juros e como entrar.", tipo: "hub", hub: "programas", etapa: "descobrir", ilustracao: "fgts", prioridade: 1, termos: [["minha casa minha vida", 301000], ["financiamento minha casa minha vida", 9900]], glossario: ["mcmv", "fgts", "renda-bruta"], liga: ["simulador-mcmv", "mcmv-faixas", "casa-verde-amarela", "usar-fgts-comprar"] }),
  no({ id: "leilao-caixa", status: "publicado", slug: "/leilao-caixa/", titulo: "Leilão da Caixa: como funciona", resumo: "Como achar, avaliar e comprar imóvel de leilão — e se dá pra financiar.", tipo: "hub", hub: "leilao", etapa: "escolher", ilustracao: "avaliacao", prioridade: 1, termos: [["leilao caixa", 368000], ["imoveis caixa", 246000]], glossario: ["leilao", "matricula", "onus", "avaliacao"], liga: ["imoveis-caixa", "como-comprar-leilao", "financiar-leilao", "reforma-leilao"] }),
  no({ id: "vender", status: "publicado", slug: "/vender/", titulo: "Vender um imóvel usado sem susto", resumo: "Documentos, preço, comprador financiado, contrato e imposto.", tipo: "hub", hub: "vender", etapa: "vender", ilustracao: "vender", prioridade: 2, liga: ["vender-para-quem-financia", "documentos-vender", "vender-financiado", "imposto-venda", "quanto-vale", "contrato-compra-venda"] }),
  no({ id: "atalhos", status: "publicado", slug: "/atalhos/", titulo: "Atalhos: os links difíceis", resumo: "Onde fazer cada coisa, com passo a passo.", tipo: "hub", hub: "atalhos", etapa: null, ilustracao: "nome-limpo", prioridade: 1, liga: ["registrato", "consultar-fgts", "boleto-habitacao", "certidao-matricula", "carteira-trabalho"] }),
  no({ id: "ferramentas", status: "publicado", slug: "/ferramentas/", titulo: "Ferramentas", resumo: "Calculadoras que respondem com o seu número.", tipo: "hub", hub: "ferramentas", etapa: null, ilustracao: "calcular", prioridade: 2, liga: ["simulador", "simulador-caixa", "simulador-mcmv", "calculadora-itbi", "quanto-preciso-ganhar", "calculadora-ganho-capital"] }),
  no({ id: "guias", slug: "/guias/", titulo: "Guias", resumo: "Todos os guias, na ordem da compra: do quanto posso à chave.", tipo: "hub", hub: "guias", etapa: null, ilustracao: "documentos", prioridade: 1, status: "publicado", liga: ["sem-entrada-casa", "como-financiar-casa-caixa", "minha-casa-minha-vida", "leilao-caixa", "documentos-financiamento", "simulador"] }),
  no({ id: "glossario", status: "publicado", slug: "/glossario/", titulo: "Glossário do financiamento", resumo: "Cada termo de banco em uma frase.", tipo: "hub", hub: "glossario", etapa: null, ilustracao: "documentos", prioridade: 2 }),

  // ——— ferramentas
  no({ id: "simulador-caixa", status: "publicado", slug: "/simulador-financiamento-caixa/", titulo: "Simulador de financiamento da Caixa, explicado", resumo: "As regras da Caixa traduzidas, com o seu número.", tipo: "ferramenta", hub: "ferramentas", etapa: "descobrir", ilustracao: "calcular", prioridade: 1, termos: [["simulador de financiamento caixa", 74000], ["simulador caixa", 201000]], glossario: ["cota-de-financiamento", "sbpe", "mcmv"], liga: ["simulador", "como-financiar-casa-caixa"] }),
  no({ id: "simulador-mcmv", status: "publicado", slug: "/simulador-minha-casa-minha-vida/", titulo: "Simulador do Minha Casa Minha Vida", resumo: "Em qual faixa você entra e quanto pode financiar.", tipo: "ferramenta", hub: "programas", etapa: "descobrir", ilustracao: "fgts", prioridade: 1, termos: [["minha casa minha vida simulação", 60500], ["renda para financiar minha casa minha vida", 70]], glossario: ["mcmv", "fgts", "renda-bruta"], liga: ["minha-casa-minha-vida", "mcmv-faixas"] }),
  no({ id: "calculadora-itbi", status: "publicado", slug: "/calculadora-itbi/", titulo: "Calculadora de ITBI", resumo: "Quanto você paga de imposto na compra, por cidade.", tipo: "ferramenta", hub: "ferramentas", etapa: "registrar", ilustracao: "assinatura", prioridade: 2, termos: [["itbi", 49500], ["itbi o que é", 8100]], glossario: ["itbi"], liga: ["itbi-goiania", "primeiro-imovel-desconto", "registro-do-imovel"] }),
  no({ id: "quanto-preciso-ganhar", status: "publicado", slug: "/quanto-preciso-ganhar-para-financiar/", titulo: "Quanto preciso ganhar para financiar?", resumo: "A renda mínima para cada valor de imóvel.", tipo: "programatica", hub: "ferramentas", etapa: "descobrir", ilustracao: "calcular", prioridade: 3, termos: [["renda para financiar imovel de 300 mil", 90], ["quanto preciso ganhar para financiar um imóvel de 300 mil", 70]], glossario: ["renda-bruta", "comprometimento-de-renda"], liga: ["simulador"] }),
  no({ id: "calculadora-ganho-capital", status: "publicado", slug: "/calculadora-ganho-de-capital/", titulo: "Calculadora de imposto na venda", resumo: "Se você paga imposto ao vender e quanto.", tipo: "ferramenta", hub: "vender", etapa: "vender", ilustracao: "calcular", prioridade: 3, termos: [["ganho de capital imovel", 390]], glossario: ["ganho-de-capital"], liga: ["imposto-venda"] }),

  // ——— comprar / jornada
  no({ id: "preparar-a-casa", status: "publicado", slug: "/antes-de-financiar/", titulo: "Antes de financiar: arrume a casa", resumo: "Nome, dívidas, reserva e FGTS antes de ir ao banco.", tipo: "guia", hub: "comprar", etapa: "preparar", ilustracao: "juntar-entrada", prioridade: 2, glossario: ["score", "comprometimento-de-renda", "fgts"], liga: ["registrato", "consultar-fgts", "score", "usar-fgts-comprar"] }),
  no({ id: "usar-fgts-comprar", status: "publicado", slug: "/usar-fgts-para-comprar-imovel/", titulo: "Como usar o FGTS para comprar imóvel", resumo: "Quem pode, quanto e em quê (e em quê não).", tipo: "guia", hub: "comprar", etapa: "preparar", ilustracao: "fgts", prioridade: 2, termos: [["usar fgts para comprar imovel", 210]], glossario: ["fgts", "entrada", "itbi"], liga: ["consultar-fgts", "carteira-trabalho", "amortizar-fgts"] }),
  no({ id: "documentos-financiamento", status: "publicado", slug: "/documentos-para-financiar-imovel/", titulo: "Documentos para financiar um imóvel", resumo: "O checklist do comprador, do vendedor e do imóvel.", tipo: "guia", hub: "comprar", etapa: "aprovar", ilustracao: "documentos", prioridade: 2, termos: [["documentos para financiamento caixa", 480], ["o que precisa para financiar um apartamento", 210]], glossario: ["matricula", "carta-de-credito"], liga: ["certidao-matricula", "documentos-vender", "score", "quanto-tempo-demora"] }),
  no({ id: "score", status: "publicado", slug: "/score-para-financiamento/", titulo: "Score para financiamento", resumo: "Quanto pesa e como melhorar antes de pedir.", tipo: "guia", hub: "comprar", etapa: "aprovar", ilustracao: "nome-limpo", prioridade: 3, termos: [["score para financiamento de casa", 110]], glossario: ["score"], liga: ["registrato", "financiamento-negado"] }),
  no({ id: "financiamento-negado", status: "publicado", slug: "/financiamento-negado/", titulo: "Financiamento negado: e agora?", resumo: "Por que acontece, o que fazer e quando tentar de novo.", tipo: "guia", hub: "comprar", etapa: "aprovar", ilustracao: "negado", prioridade: 3, termos: [["financiamento negado quando posso tentar novamente", 110]], glossario: ["comprometimento-de-renda", "score"], liga: ["score", "preparar-a-casa", "simulador", "quanto-tempo-demora"] }),
  no({ id: "quanto-tempo-demora", status: "publicado", slug: "/quanto-tempo-demora-o-financiamento/", titulo: "Quanto tempo demora o financiamento?", resumo: "O prazo de cada etapa, do pedido à chave.", tipo: "guia", hub: "comprar", etapa: "aprovar", ilustracao: "prazo", prioridade: 3, termos: [["quanto tempo demora financiamento caixa", 50]], liga: ["comprar", "registro-do-imovel"] }),
  no({ id: "sem-entrada-casa", slug: "/financiar-casa-sem-entrada/", titulo: "Dá pra financiar uma casa sem entrada?", resumo: "O segredo da avaliação acima do preço, com a sua conta.", tipo: "guia", hub: "comprar", etapa: "escolher", ilustracao: "avaliacao", prioridade: 1, status: "publicado", termos: [["financiar casa sem entrada", 1900], ["financiamento sem entrada casa", 1900], ["financiamento sem entrada imovel", 480]], glossario: ["avaliacao", "cota-de-financiamento", "entrada", "itbi"], liga: ["sem-entrada-apartamento", "avaliacao-do-imovel", "simulador", "reforma-leilao"] }),
  no({ id: "sem-entrada-apartamento", status: "publicado", slug: "/financiar-apartamento-sem-entrada/", titulo: "Dá pra financiar apartamento sem entrada?", resumo: "A mesma regra, com os números de apartamento.", tipo: "guia", hub: "comprar", etapa: "escolher", ilustracao: "avaliacao", prioridade: 2, termos: [["financiar apartamento sem entrada", 390]], glossario: ["avaliacao", "entrada"], liga: ["sem-entrada-casa", "como-financiar-apartamento"] }),
  no({ id: "imovel-usado", status: "publicado", slug: "/financiar-imovel-usado/", titulo: "Como financiar um imóvel usado", resumo: "Regras, avaliação e cuidados com o usado.", tipo: "guia", hub: "financiar", etapa: "escolher", ilustracao: "avaliacao", prioridade: 2, termos: [["financiamento caixa imóvel usado", 4400], ["financiar imovel usado", 210]], glossario: ["avaliacao", "matricula", "sbpe"], liga: ["avaliacao-do-imovel", "certidao-matricula", "vender-para-quem-financia"] }),
  no({ id: "avaliacao-do-imovel", status: "publicado", slug: "/avaliacao-do-imovel-pela-caixa/", titulo: "Avaliação do imóvel pelo banco", resumo: "Quem faz, quem paga, e o que muda se vier abaixo ou acima.", tipo: "guia", hub: "comprar", etapa: "avaliar", ilustracao: "avaliacao", prioridade: 2, termos: [["avaliação do imovel pela caixa", 70], ["avaliação do imovel para financiamento", 20]], glossario: ["avaliacao", "laudo", "cota-de-financiamento"], liga: ["sem-entrada-casa", "vender-para-quem-financia", "imovel-usado"] }),
  no({ id: "contrato-compra-venda", status: "publicado", slug: "/contrato-de-compra-e-venda/", titulo: "Contrato de compra e venda de imóvel (modelo)", resumo: "O que não pode faltar, com modelo para baixar.", tipo: "guia", hub: "vender", etapa: "contratar", ilustracao: "assinatura", prioridade: 2, termos: [["contrato de compra e venda de imovel", 14800]], glossario: ["escritura", "matricula", "onus"], liga: ["documentos-vender", "registro-do-imovel", "documentos-financiamento"] }),
  no({ id: "registro-do-imovel", status: "publicado", slug: "/registro-do-imovel/", titulo: "Registro, ITBI e chaves", resumo: "O que acontece depois da assinatura até a chave.", tipo: "guia", hub: "comprar", etapa: "registrar", ilustracao: "a-chave", prioridade: 3, glossario: ["registro", "itbi", "escritura", "alienacao-fiduciaria"], liga: ["calculadora-itbi", "primeiro-imovel-desconto", "certidao-matricula"] }),
  no({ id: "primeiro-imovel-desconto", status: "publicado", slug: "/primeiro-imovel-tem-desconto/", titulo: "Primeiro imóvel tem desconto no registro e no ITBI?", resumo: "O desconto do cartório e como funciona o ITBI na sua cidade.", tipo: "guia", hub: "comprar", etapa: "registrar", ilustracao: "assinatura", prioridade: 2, termos: [["primeiro imovel paga itbi", 210], ["primeiro imovel tem desconto no registro", 90], ["primeiro imovel tem desconto de itbi", 70]], glossario: ["itbi", "registro"], liga: ["calculadora-itbi", "registro-do-imovel"] }),
  no({ id: "amortizar-fgts", status: "publicado", slug: "/amortizar-financiamento-com-fgts/", titulo: "Como usar o FGTS para abater o financiamento", resumo: "A cada 2 anos, abater ou quitar; ou pagar parte da parcela.", tipo: "guia", hub: "comprar", etapa: "depois", ilustracao: "fgts", prioridade: 3, termos: [["usar fgts para amortizar financiamento", 390], ["amortizar financiamento caixa com fgts", 170]], glossario: ["fgts", "sac", "price"], liga: ["sac-ou-price", "consultar-fgts", "boleto-habitacao"] }),

  // ——— financiar
  no({ id: "como-financiar-casa-caixa", status: "publicado", slug: "/como-financiar-uma-casa-pela-caixa/", titulo: "Como financiar uma casa pela Caixa", resumo: "O passo a passo, do simulador às chaves.", tipo: "guia", hub: "financiar", etapa: "descobrir", ilustracao: "banco", prioridade: 2, termos: [["financiar casa caixa", 9900], ["financiar casa pela caixa", 3600], ["como fazer financiamento pela caixa", 2400], ["financiamento de casa pela caixa", 2400]], glossario: ["cota-de-financiamento", "mcmv", "sbpe", "avaliacao"], liga: ["simulador-caixa", "comprar", "como-financiar-apartamento", "documentos-financiamento"] }),
  no({ id: "como-financiar-apartamento", status: "publicado", slug: "/como-financiar-um-apartamento/", titulo: "Como financiar um apartamento", resumo: "As regras, com os números de apartamento.", tipo: "guia", hub: "financiar", etapa: "descobrir", ilustracao: "banco", prioridade: 2, termos: [["financiar apartamento", 4400], ["financiar um apartamento", 4400], ["financiamento apartamento", 4400], ["como financiar um apartamento", 1300]], glossario: ["cota-de-financiamento", "entrada"], liga: ["como-financiar-casa-caixa", "sem-entrada-apartamento", "quanto-custa-financiar"] }),
  no({ id: "quanto-custa-financiar", status: "publicado", slug: "/quanto-custa-financiar-um-imovel/", titulo: "Quanto custa financiar um imóvel", resumo: "Juros, seguros, taxas, ITBI e cartório somados.", tipo: "guia", hub: "financiar", etapa: "descobrir", ilustracao: "calcular", prioridade: 3, termos: [["quanto custa financiar um apartamento", 140]], glossario: ["tr", "mip-dfi", "itbi"], liga: ["simulador", "calculadora-itbi", "sac-ou-price"] }),
  no({ id: "sac-ou-price", status: "publicado", slug: "/sac-ou-price/", titulo: "SAC ou PRICE: qual escolher?", resumo: "Parcela que cai × parcela fixa, com a sua conta.", tipo: "guia", hub: "financiar", etapa: "depois", ilustracao: "calcular", prioridade: 3, termos: [["sac ou price", 1300], ["sac ou price qual o melhor", 260]], glossario: ["sac", "price"], liga: ["amortizar-fgts", "simulador"] }),
  no({ id: "consorcio-ou-financiamento", status: "publicado", slug: "/consorcio-ou-financiamento/", titulo: "Consórcio ou financiamento?", resumo: "Quando cada um vale a pena, com números.", tipo: "guia", hub: "financiar", etapa: "descobrir", ilustracao: "calcular", prioridade: 3, termos: [["como funciona um consórcio de imóvel", 2400], ["consórcio ou financiamento", 880]], glossario: ["carta-de-credito"], liga: ["simulador", "alugar-ou-financiar"] }),
  no({ id: "alugar-ou-financiar", status: "publicado", slug: "/alugar-ou-financiar/", titulo: "Alugar ou financiar?", resumo: "A conta honesta para o seu caso.", tipo: "guia", hub: "financiar", etapa: "descobrir", ilustracao: "calcular", prioridade: 3, termos: [["alugar ou financiar", 260]], liga: ["simulador", "consorcio-ou-financiamento"] }),

  // ——— programas
  no({ id: "mcmv-faixas", status: "publicado", slug: "/minha-casa-minha-vida/faixas/", titulo: "Faixas do Minha Casa Minha Vida", resumo: "Renda, teto do imóvel e juros de cada faixa.", tipo: "guia", hub: "programas", etapa: "descobrir", ilustracao: "fgts", prioridade: 2, glossario: ["mcmv", "renda-bruta"], liga: ["simulador-mcmv", "minha-casa-minha-vida"] }),
  no({ id: "casa-verde-amarela", status: "publicado", slug: "/casa-verde-e-amarela/", titulo: "Casa Verde e Amarela virou o quê?", resumo: "O programa voltou a se chamar Minha Casa Minha Vida.", tipo: "guia", hub: "programas", etapa: "descobrir", ilustracao: "fgts", prioridade: 2, termos: [["casa verde e amarela", 2400], ["casa verde amarela", 480]], glossario: ["mcmv"], liga: ["minha-casa-minha-vida", "simulador-mcmv"] }),

  // ——— leilão
  no({ id: "imoveis-caixa", status: "publicado", slug: "/imoveis-caixa/", titulo: "Imóveis da Caixa à venda: como funciona", resumo: "Venda direta, licitação e leilão, explicados.", tipo: "guia", hub: "leilao", etapa: "escolher", ilustracao: "banco", prioridade: 1, termos: [["imoveis caixa", 246000], ["como comprar imovel pela caixa", 140]], glossario: ["leilao", "matricula"], liga: ["leilao-caixa", "como-comprar-leilao", "financiar-leilao"] }),
  no({ id: "como-comprar-leilao", status: "publicado", slug: "/como-comprar-imovel-de-leilao/", titulo: "Como comprar imóvel de leilão", resumo: "Do edital à posse, sem cair em armadilha.", tipo: "guia", hub: "leilao", etapa: "escolher", ilustracao: "documentos", prioridade: 2, termos: [["como comprar imovel de leilao", 590]], glossario: ["leilao", "onus", "matricula"], liga: ["certidao-matricula", "financiar-leilao", "reforma-leilao"] }),
  no({ id: "financiar-leilao", status: "publicado", slug: "/financiar-imovel-de-leilao/", titulo: "Dá pra financiar imóvel de leilão?", resumo: "Quando o banco financia e como entra a avaliação.", tipo: "guia", hub: "leilao", etapa: "escolher", ilustracao: "avaliacao", prioridade: 2, glossario: ["leilao", "avaliacao", "cota-de-financiamento"], liga: ["sem-entrada-casa", "simulador", "avaliacao-do-imovel"] }),
  no({ id: "reforma-leilao", status: "publicado", slug: "/imovel-de-leilao-vale-a-pena/", titulo: "Imóvel de leilão vale a pena? A conta da reforma", resumo: "Preço, reforma e avaliação: quando a conta fecha.", tipo: "guia", hub: "leilao", etapa: "escolher", ilustracao: "juntar-entrada", prioridade: 2, glossario: ["avaliacao", "leilao"], liga: ["sem-entrada-casa", "como-comprar-leilao", "quanto-vale"] }),

  // ——— vender
  no({ id: "vender-para-quem-financia", status: "publicado", slug: "/vender-para-quem-vai-financiar/", titulo: "Vender para quem vai financiar", resumo: "Como a avaliação do banco do comprador mexe no seu preço.", tipo: "guia", hub: "vender", etapa: "vender", ilustracao: "vender", prioridade: 2, glossario: ["avaliacao", "laudo", "cota-de-financiamento"], liga: ["avaliacao-do-imovel", "quanto-vale", "documentos-vender"] }),
  no({ id: "vender-financiado", status: "publicado", slug: "/vender-imovel-financiado/", titulo: "Como vender um imóvel financiado", resumo: "Quitar, transferir ou vender com a dívida: o caminho de cada um.", tipo: "guia", hub: "vender", etapa: "vender", ilustracao: "vender", prioridade: 3, termos: [["como vender imovel financiado", 260], ["vender imovel financiado caixa", 20]], glossario: ["alienacao-fiduciaria"], liga: ["boleto-habitacao", "contrato-compra-venda"] }),
  no({ id: "documentos-vender", status: "publicado", slug: "/documentos-para-vender-imovel/", titulo: "Documentos para vender um imóvel", resumo: "O que o comprador e o banco dele vão pedir.", tipo: "guia", hub: "vender", etapa: "vender", ilustracao: "documentos", prioridade: 3, termos: [["documentos para vender um imovel", 70]], glossario: ["matricula", "onus"], liga: ["certidao-matricula", "documentos-financiamento", "contrato-compra-venda"] }),
  no({ id: "imposto-venda", status: "publicado", slug: "/imposto-na-venda-de-imovel/", titulo: "Imposto na venda de imóvel", resumo: "Ganho de capital, isenções e como calcular.", tipo: "guia", hub: "vender", etapa: "vender", ilustracao: "calcular", prioridade: 3, termos: [["ganho de capital imovel", 390]], glossario: ["ganho-de-capital"], liga: ["calculadora-ganho-capital", "quanto-vale"] }),
  no({ id: "quanto-vale", status: "publicado", slug: "/quanto-vale-meu-imovel/", titulo: "Quanto vale meu imóvel?", resumo: "Preço de anúncio, preço de venda e avaliação do banco.", tipo: "guia", hub: "vender", etapa: "vender", ilustracao: "avaliacao", prioridade: 3, termos: [["quanto vale meu imovel", 390]], glossario: ["avaliacao"], liga: ["vender-para-quem-financia", "avaliacao-do-imovel"] }),

  // ——— atalhos
  no({ id: "registrato", status: "publicado", slug: "/atalhos/registrato/", titulo: "Registrato: consultar o CPF no Banco Central", resumo: "Onde entrar, o que aparece e o que fazer com isso.", tipo: "atalho", hub: "atalhos", etapa: "preparar", ilustracao: "nome-limpo", prioridade: 1, termos: [["registrato", 823000]], glossario: ["score"], liga: ["score", "preparar-a-casa"] }),
  no({ id: "consultar-fgts", status: "publicado", slug: "/atalhos/consultar-fgts/", titulo: "Consultar o saldo do FGTS pelo CPF", resumo: "No app FGTS, em 3 passos, e o que fazer com o saldo.", tipo: "atalho", hub: "atalhos", etapa: "preparar", ilustracao: "fgts", prioridade: 1, termos: [["consultar fgts pelo cpf", 22200]], glossario: ["fgts"], liga: ["usar-fgts-comprar", "simulador"] }),
  no({ id: "boleto-habitacao", status: "publicado", slug: "/atalhos/boleto-habitacao-caixa/", titulo: "2ª via do boleto da Habitação Caixa", resumo: "Onde tirar a segunda via e como antecipar parcelas.", tipo: "atalho", hub: "atalhos", etapa: "depois", ilustracao: "banco", prioridade: 1, termos: [["habitação caixa 2 via boleto", 8100]], liga: ["amortizar-fgts", "sac-ou-price"] }),
  no({ id: "certidao-matricula", status: "publicado", slug: "/atalhos/certidao-de-matricula/", titulo: "Certidão de matrícula do imóvel online", resumo: "Onde pedir, quanto custa e como ler. Ônus e inteiro teor, explicados.", tipo: "atalho", hub: "atalhos", etapa: "aprovar", ilustracao: "documentos", prioridade: 1, termos: [["certidão de matricula de imovel online", 320], ["certidão de onus e matricula é a mesma coisa", 20]], glossario: ["matricula", "onus"], liga: ["documentos-financiamento", "documentos-vender", "como-comprar-leilao"] }),
  no({ id: "carteira-trabalho", status: "publicado", slug: "/atalhos/tempo-de-carteira/", titulo: "Ver o tempo de carteira assinada", resumo: "Na Carteira de Trabalho Digital: a regra dos 3 anos do FGTS.", tipo: "atalho", hub: "atalhos", etapa: "preparar", ilustracao: "prazo", prioridade: 2, glossario: ["fgts", "mcmv"], liga: ["usar-fgts-comprar", "consultar-fgts"] }),

  // ——— local
  no({ id: "itbi-goiania", slug: "/goiania/itbi/", titulo: "ITBI em Goiânia", resumo: "Alíquota, como pagar e quanto fica no seu caso.", tipo: "local", hub: "ferramentas", etapa: "registrar", ilustracao: "assinatura", prioridade: 2, termos: [["itbi goiania", 1600], ["itbi goiania aliquota", 70]], glossario: ["itbi"], liga: ["calculadora-itbi", "registro-do-imovel"] }),

  // ——— glossário (tecido conectivo)
  ...GLOSSARIO.map(([id, termo, resumo]) =>
    no({ id: `g-${id}`, slug: `/glossario/${id}/`, titulo: termo, resumo, tipo: "glossario", hub: "glossario", etapa: null, prioridade: 3, status: "publicado" }),
  ),
];
