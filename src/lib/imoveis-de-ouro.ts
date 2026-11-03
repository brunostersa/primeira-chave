/**
 * Seleção de imóvel de ouro: poucos imóveis por cidade, cada um com a página mais completa
 * sobre ele. Os números (entrada, parcela, renda, custos) não ficam aqui: saem do motor do
 * simulador na hora do build, com as regras de params.ts.
 */

export type Situacao = "ok" | "analise" | "atencao";

export type Categoria = "escola" | "saude" | "mercado" | "farmacia" | "padaria";

export const CATEGORIAS: Record<Categoria, { nome: string; cor: string }> = {
  escola: { nome: "Escolas e creches", cor: "#2f6fd6" },
  saude: { nome: "Saúde", cor: "#d64545" },
  mercado: { nome: "Supermercados", cor: "#2f9e5b" },
  farmacia: { nome: "Farmácias", cor: "#8a4fd6" },
  padaria: { nome: "Padarias", cor: "#c9821f" },
};

export type Proximo = { categoria: Categoria; nome: string; lat: number; lng: number };

/** Distância em linha reta, em metros (aproximação plana, boa até alguns km). */
export function distancia(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const y = (a.lat - b.lat) * 111320;
  const x = (a.lng - b.lng) * 111320 * Math.cos((a.lat * Math.PI) / 180);
  return Math.hypot(x, y);
}

export type ItemSelo = { item: string; situacao: Situacao; nota: string };

export type ImovelDeOuro = {
  id: string;
  cidade: { id: string; nome: string; uf: "GO" };
  bairro: string;
  rua: string;
  titulo: string;
  resumo: string;
  tipo: "casa" | "apartamento";
  estado: "usado" | "novo";
  preco: number;
  /** Avaliação do banco informada por quem vende; `laudo` quando o documento foi conferido. */
  avaliacao: { valor: number; banco: string; laudo: boolean };
  iptuMes: number;
  condominioMes: number | null;
  /** % do ITBI da cidade e se foi conferido na lei municipal. */
  itbi: { pct: number; conferido: boolean };
  areaTerreno: number;
  areaConstruida: number;
  quartos: number;
  suites: number;
  banheiros: number;
  vagas: number;
  caracteristicas: string[];
  historico: string[];
  bairroPontos: string[];
  /** Como sair da casa sem carro; aparece em destaque no bloco da cidade. */
  transporte?: string;
  /** Ponto no mapa e o link para abrir no Google Maps. */
  mapa: { lat: number; lng: number; url: string };
  /** Escolas, saúde e comércio em volta, levantados no Google Maps na data da análise. */
  proximos: Proximo[];
  fotos: { arquivo: string; legenda: string }[];
  /** WhatsApp de quem atende o interessado (com DDI e DDD). O lead entra no Hub antes. */
  whatsapp: string;
  /** Anúncio original na plataforma (referência interna; a página não manda para lá). */
  anuncio: { url: string; plataforma: string; anunciante: string };
  /** Relação do imóvel com a Primeira Chave, mostrada sempre que houver. */
  vinculo: string | null;
  selo: ItemSelo[];
  analisadoEm: string;
};

const pasta = "/imoveis-de-ouro/goianira-casa-parque-los-angeles";

export const IMOVEIS_DE_OURO: ImovelDeOuro[] = [
  {
    id: "casa-2-quartos-parque-los-angeles",
    cidade: { id: "goianira", nome: "Goianira", uf: "GO" },
    bairro: "Parque Los Angeles, 1ª etapa",
    rua: "Rua San Antonio",
    titulo: "Casa de 2 quartos com suíte e lavabo no Parque Los Angeles",
    resumo: "Reformada, pronta para morar, na rua principal do setor, com ônibus na porta. O laudo da Caixa avaliou em R$ 244 mil, praticamente o preço pedido.",
    tipo: "casa",
    estado: "usado",
    preco: 245000,
    avaliacao: { valor: 244000, banco: "Caixa", laudo: true },
    iptuMes: 121,
    condominioMes: null,
    itbi: { pct: 2, conferido: false },
    areaTerreno: 180,
    areaConstruida: 81.55,
    quartos: 2,
    suites: 1,
    banheiros: 3,
    vagas: 3,
    caracteristicas: [
      "Um dos quartos é suíte",
      "Banheiro social e lavabo para visitas",
      "Garagem coberta e espaço para 3 carros",
      "Área de serviço privativa",
      "Laje, piso cerâmico e estrutura em alvenaria",
      "Lote murado, aceita pet",
      "Planta que separa a área íntima da sala",
    ],
    historico: ["Reforma finalizada em 2026", "Pintura, pisos e banheiros novos (ver fotos)"],
    transporte: "Esta casa tem ônibus na porta: dá para chegar ao Terminal Goianira e seguir para Goiânia pela rede metropolitana, sem depender de carro.",
    bairroPontos: ["Na rua principal do setor", "Linha de ônibus na porta", "Para urgência: SAMU e Hospital Municipal de Goianira a uns 3 km; a UPA mais perto é a de Trindade, a uns 13 km"],
    mapa: { lat: -16.522116, lng: -49.405643, url: "https://maps.app.goo.gl/pxn3HngQGpe3VKJHA" },
    proximos: [
      { categoria: "escola", nome: "Escola Municipal Chico Martins", lat: -16.5215414, lng: -49.4069826 },
      { categoria: "escola", nome: "Colégio Estadual da Polícia Militar Padre Pelágio", lat: -16.5193218, lng: -49.4207283 },
      { categoria: "escola", nome: "Escola Municipal Jardim Imperial", lat: -16.5188658, lng: -49.4206737 },
      { categoria: "escola", nome: "Colégio Estadual Walter Bernadino Borges", lat: -16.537091, lng: -49.4059676 },
      { categoria: "escola", nome: "CEPI Professora Lazara de Fátima e Silva Flores", lat: -16.5372711, lng: -49.4059937 },
      { categoria: "escola", nome: "CMEI América Benícia de Souza (creche)", lat: -16.5387957, lng: -49.4003607 },
      { categoria: "saude", nome: "UBS Maria de Sousa Soares, do Parque Los Angeles", lat: -16.521463, lng: -49.4087041 },
      { categoria: "saude", nome: "UBS Jardim Imperial", lat: -16.5182772, lng: -49.4269887 },
      { categoria: "saude", nome: "SAMU Goianira", lat: -16.5183418, lng: -49.4271165 },
      { categoria: "saude", nome: "Hospital Municipal Santos Dangoni", lat: -16.50689, lng: -49.4280031 },
      { categoria: "saude", nome: "Hospital e Maternidade Inova", lat: -16.4958228, lng: -49.4250255 },
      { categoria: "mercado", nome: "Super Bom Preço", lat: -16.5209476, lng: -49.4099798 },
      { categoria: "mercado", nome: "Supermercado América", lat: -16.5209088, lng: -49.4103184 },
      { categoria: "mercado", nome: "Super Cristal", lat: -16.5227632, lng: -49.4110367 },
      { categoria: "mercado", nome: "Rede Loreto, Nova Goianira", lat: -16.5283093, lng: -49.4097035 },
      { categoria: "mercado", nome: "Atacarejo Batista", lat: -16.5234661, lng: -49.4139314 },
      { categoria: "farmacia", nome: "Drogaria Efatá", lat: -16.5209194, lng: -49.410278 },
      { categoria: "farmacia", nome: "Drogaria Atalaia", lat: -16.5178528, lng: -49.4125668 },
      { categoria: "padaria", nome: "CR Pães", lat: -16.5205713, lng: -49.4120089 },
      { categoria: "padaria", nome: "Confeitaria Los Angeles", lat: -16.5204095, lng: -49.4125224 },
    ],
    fotos: [
      { arquivo: `${pasta}/12.jpg`, legenda: "Fachada, vista da rua" },
      { arquivo: `${pasta}/16.jpg`, legenda: "Frente com gramado e garagem" },
      { arquivo: `${pasta}/02.jpg`, legenda: "Quintal da frente e entrada" },
      { arquivo: `${pasta}/10.jpg`, legenda: "Lateral do lote" },
      { arquivo: `${pasta}/08.jpg`, legenda: "Área coberta da frente" },
      { arquivo: `${pasta}/15.jpg`, legenda: "Quintal dos fundos" },
      { arquivo: `${pasta}/03.jpg`, legenda: "Quarto" },
      { arquivo: `${pasta}/06.jpg`, legenda: "Segundo quarto" },
      { arquivo: `${pasta}/04.jpg`, legenda: "Corredor da área íntima" },
      { arquivo: `${pasta}/11.jpg`, legenda: "Acesso ao banheiro" },
      { arquivo: `${pasta}/05.jpg`, legenda: "Cozinha com bancada" },
      { arquivo: `${pasta}/13.jpg`, legenda: "Lavabo" },
      { arquivo: `${pasta}/14.jpg`, legenda: "Banheiro" },
      { arquivo: `${pasta}/09.jpg`, legenda: "Corredor lateral" },
      { arquivo: `${pasta}/17.jpg`, legenda: "Área de serviço" },
      { arquivo: `${pasta}/18.jpg`, legenda: "Entrada pela garagem" },
    ],
    whatsapp: "5562982058386",
    anuncio: {
      url: "https://go.olx.com.br/grande-goiania-e-anapolis/imoveis/casa-ampla-de-2-quartos-completa-aceita-financiamento-1545230296",
      plataforma: "OLX",
      anunciante: "Cryssia",
    },
    vinculo: "Esta é uma página de imóvel como todas deveriam ser: cada item conferido e cada número com a origem à mostra, para você decidir sem precisar confiar na gente.",
    selo: [
      { item: "Aceita financiamento", situacao: "ok", nota: "Informado no anúncio; a casa é de alvenaria, com laje, como o banco pede." },
      { item: "Avaliação do banco perto do preço", situacao: "ok", nota: "Laudo da Caixa de R$ 244 mil, R$ 1 mil abaixo do preço: a entrada sobe só R$ 800, sem susto." },
      { item: "Pronta para morar", situacao: "ok", nota: "Reforma finalizada; as fotos mostram pisos, pintura e banheiros novos." },
      { item: "Cabe no Minha Casa Minha Vida", situacao: "ok", nota: "Abaixo do teto de R$ 400 mil da Faixa 3." },
      { item: "Matrícula sem nada que trave a venda", situacao: "ok", nota: "Certidão de matrícula conferida: sem penhora, hipoteca ou usufruto que impeça a venda." },
      { item: "Construção averbada na matrícula", situacao: "ok", nota: "A casa consta na matrícula: o banco financia o imóvel inteiro, não só o terreno." },
      { item: "Laudo de avaliação conferido", situacao: "ok", nota: "Laudo da Caixa conferido: R$ 244 mil." },
    ],
    analisadoEm: "2026-11-03",
  },
];

/** O que vale saber da cidade, com fonte: o mesmo bloco serve para todos os imóveis dela. */
export type SobreCidade = {
  resumo: string;
  /** A referência de Goiânia mais útil para quem mora ali, de carro a partir da casa (Google Maps). */
  destaque: { rotulo: string; km: number; minutos: number; via: string };
  populacao: { censo2022: number; estimativa: number; anoEstimativa: number };
  /** Tempos de carro a partir da casa, sem trânsito pesado. */
  tempos: { destino: string; minutos: number; nota?: string }[];
  pontos: string[];
  fontes: string;
};

export const SOBRE_CIDADES: Record<string, SobreCidade> = {
  goianira: {
    resumo: "Cidade da Região Metropolitana de Goiânia, ligada à capital pela GO-070. Cresceu ao longo da rodovia e hoje é praticamente emendada à zona noroeste de Goiânia.",
    destaque: { rotulo: "Até o Portal Shopping, em Goiânia", km: 19, minutos: 23, via: "GO-070" },
    populacao: { censo2022: 71916, estimativa: 81495, anoEstimativa: 2025 },
    tempos: [
      { destino: "Terminal Goianira", minutos: 10, nota: "ônibus metropolitano para Goiânia" },
      { destino: "Basílica do Divino Pai Eterno, Trindade", minutos: 27 },
      { destino: "Passeio das Águas Shopping, Goiânia", minutos: 37 },
      { destino: "Centro de Goiânia (Praça Cívica)", minutos: 45, nota: "29 km, com trânsito normal" },
      { destino: "Aeroporto Santa Genoveva", minutos: 45 },
    ],
    pontos: [
      "Faz parte da rede de ônibus metropolitano da Grande Goiânia, com terminal próprio na cidade.",
      "Ganhou quase 10 mil moradores entre o Censo 2022 e a estimativa de 2025: cidade em crescimento, com comércio e serviços chegando junto.",
      "Vizinha de Trindade, onde fica a UPA mais perto e a Basílica do Divino Pai Eterno.",
      "Quem trabalha em Goiânia costuma ir pela GO-070; nos horários de pico, conte com mais tempo.",
    ],
    fontes: "População: IBGE (Censo 2022 e estimativa 2025). Tempos e distâncias: Google Maps, saindo da casa, em 03/11/2026.",
  },
};

export const porCidade = (cidade: string) => IMOVEIS_DE_OURO.filter((i) => i.cidade.id === cidade);
export const imovelDeOuro = (cidade: string, id: string) => IMOVEIS_DE_OURO.find((i) => i.cidade.id === cidade && i.id === id);
export const slugImovel = (i: ImovelDeOuro) => `/imoveis-de-ouro/${i.cidade.id}/${i.id}/`;

/** O selo só sai com todos os itens conferidos; antes disso o imóvel aparece "em análise". */
export const seloAprovado = (i: ImovelDeOuro) => i.selo.every((s) => s.situacao === "ok");
