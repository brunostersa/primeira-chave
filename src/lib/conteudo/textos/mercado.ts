import { brl, pct } from "../../format";
import { capitais, imovelQueARendaCompra, ITBI_CAPITAIS, ITBI_SP, mesAno, variacaoIvgr } from "../../mercado";
import type { Texto } from "../tipos";

/**
 * Páginas de dados de mercado. Os números do texto vêm dos mesmos JSONs dos mapas
 * (scripts/dados/atualizar.py): atualizou os dados, o texto acompanha.
 */

const caps = capitais().sort((a, b) => a.m2 - b.m2);
const exemplo = imovelQueARendaCompra(6000)!;
// O crédito para de crescer quando a renda sai do MCMV: juro sem subsídio e SAC.
const r8 = imovelQueARendaCompra(8000)!;
const r14 = imovelQueARendaCompra(14000)!;
const r13 = imovelQueARendaCompra(13000)!;
const r13mais = imovelQueARendaCompra(13250)!;
const reais = Object.entries(ITBI_CAPITAIS);
const spReal = ITBI_CAPITAIS["São Paulo"];
const spAnuncio = caps.find((c) => c.nome === "São Paulo")!;
const ivgr = variacaoIvgr(12);
const sp = ITBI_SP.cidade;
const distritos = ITBI_SP.distritos.filter((d) => d.m2).sort((a, b) => a.m2! - b.m2!);
const spBarato = distritos[0];
const spCaro = distritos[distritos.length - 1];
const periodoSp = `${mesAno(ITBI_SP.periodo.de)} a ${mesAno(ITBI_SP.periodo.ate)}`;

export const TEXTOS_MERCADO: Record<string, Texto> = {
  "quanto-minha-renda-compra": {
    tituloSeo: "Quanto a sua renda compra: valor do imóvel e m² nas capitais",
    descricao: `Até quanto o banco financia para a sua renda, pelas regras da Caixa, e quanto isso compra em ${caps.length} capitais: pelo preço real do ITBI e pelo anúncio.`,
    resposta: `Com **${brl(6000)} de renda**, o banco financia um imóvel de até **${brl(exemplo.valor)}**. Em São Paulo, pelo preço que as pessoas **pagaram de verdade**, isso dá uns **${Math.floor(exemplo.valor / spReal.m2)} m²**; pelo anúncio médio de apartamento, só ${Math.floor(exemplo.valor / spAnuncio.m2)} m². Mexa na renda e escolha a sua capital.`,
    secoes: [
      { titulo: "O mapa", blocos: [{ calculo: "mapa-capitais" }] },
      {
        titulo: "Ganhar mais nem sempre compra mais",
        blocos: [
          {
            p: `Com **${brl(8000)}** de renda, o banco financia até **${brl(r8.valor)}**. Com **${brl(14000)}**, quase o dobro de renda, só **${brl(r14.valor)}**. Quem sai do [Minha Casa Minha Vida](#minha-casa-minha-vida) perde o juro subsidiado e cai na linha de mercado, em [SAC](g:sac): a primeira parcela é a mais alta, e é ela que precisa caber em 30% da renda.`,
          },
          {
            aviso: {
              titulo: "O degrau de quem sai do programa",
              texto: `Com **${brl(13000)}** de renda, o banco financia até **${brl(r13.valor)}**. Com **${brl(13250)}**, só **${brl(r13mais.valor)}**: ${brl(r13.valor - r13mais.valor)} a menos por ganhar ${brl(250)} a mais. Se a sua renda está logo acima de um limite de faixa, faça a conta completa: entrada maior e FGTS ajudam a compensar.`,
              tom: "mark",
            },
          },
          { p: "Por isso, acima dessa faixa, o que mais muda o jogo é **entrada maior, FGTS e comprar junto**: veja no [simulador](#simulador)." },
        ],
      },
      {
        titulo: "Como ler esses números",
        blocos: [
          {
            lista: [
              `**O valor do imóvel é o número firme:** sai das regras da Caixa, conferidas no simulador oficial.`,
              `**O m² real** vem das compras registradas no ITBI, onde a prefeitura publica: ${reais.map(([nome]) => nome).join(", ")}.`,
              "**O m² de anúncio** (FipeZAP) é o preço **pedido** em anúncios de apartamentos prontos, puxado pelos bairros mais procurados. Use como teto, não como regra: casas e bairros mais simples saem bem mais em conta.",
              "**O banco empresta sobre a [avaliação](g:avaliacao)**, não sobre o anúncio. Se a avaliação vier abaixo do preço, a diferença sai do seu bolso.",
              `**O mercado está subindo:** as avaliações dos bancos subiram ${pct(ivgr.pct, 1)} em 12 meses (Banco Central).`,
              "**A média esconde o bairro:** em São Paulo, o m² pago vai de três a quatro vezes entre distritos. Veja [distrito por distrito](#metro-quadrado-sao-paulo).",
            ],
          },
          { calculo: "termometro" },
        ],
      },
    ],
    faq: [
      { q: "De onde vêm os preços do m²?", a: "O real, das compras registradas no ITBI que as prefeituras de São Paulo, Recife e Porto Alegre publicam. O de anúncio, do Índice FipeZAP (Fipe e Grupo OLX), que acompanha anúncios de apartamentos prontos em 56 cidades, em média móvel de 3 meses." },
      { q: "Por que o m² de anúncio é tão maior que o real?", a: "Anúncio é preço pedido, de apartamento, e se concentra nos bairros mais procurados. O ITBI registra o que foi pago, em todo tipo de bairro e também em casas. Parte da diferença vem da área usada: cada prefeitura publica uma." },
      { q: "Por que algumas capitais não aparecem?", a: "Porto Velho, Rio Branco, Macapá, Boa Vista e Palmas não entram no índice. Preferimos deixar em branco a inventar um número." },
      { q: "O financiamento considera o teto do Minha Casa Minha Vida?", a: "Sim. O cálculo usa a faixa da sua renda, com os juros e o teto de imóvel dela, como no simulador da Caixa." },
    ],
  },

  "metro-quadrado-sao-paulo": {
    tituloSeo: "Preço do m² em São Paulo por distrito (valor real, ITBI)",
    descricao: `Quanto as pessoas pagaram de verdade pelo m² em cada distrito de São Paulo: ${sp.n.toLocaleString("pt-BR")} compras registradas no ITBI de ${periodoSp}.`,
    resposta: `Em São Paulo, metade das compras de casa e apartamento saiu por menos de **${brl(sp.m2)} o m²**, num imóvel típico de **${brl(sp.valor)}**. Vai de **${brl(spBarato.m2!)} em ${spBarato.nome}** a **${brl(spCaro.m2!)} em ${spCaro.nome}**. São preços **pagos de verdade**, declarados no [ITBI](g:itbi), não preços de anúncio.`,
    secoes: [
      { titulo: "O mapa", blocos: [{ calculo: "mapa-sp" }] },
      {
        titulo: "O que esses números contam",
        blocos: [
          {
            lista: [
              `**${sp.financiado}% das compras foram financiadas**, a maioria pelo SFH. O financiamento típico foi de ${brl(sp.valorFinanciado)}.`,
              `**O Minha Casa Minha Vida pesa pouco na capital** (${pct(sp.mcmv, 1)} das compras de imóvel pronto): o teto do programa é baixo para o preço da cidade.`,
              "**Preço real × anúncio:** o valor do ITBI é o que foi pago. O anúncio é o que se pede. Use os dois, mas negocie olhando o primeiro.",
              "**É também o que o banco vê:** a [avaliação](g:avaliacao) do engenheiro parte de vendas parecidas na região.",
            ],
          },
          { calculo: "termometro" },
          { p: "Veja quanto a sua renda compra em [cada capital](#quanto-minha-renda-compra) e simule o seu caso completo no [simulador](#simulador)." },
        ],
      },
    ],
    faq: [
      { q: "De onde vêm esses dados?", a: "Das guias de ITBI pagas que a Prefeitura de São Paulo publica todo mês, sem nome de comprador ou vendedor. Usamos só compra e venda do imóvel inteiro, casas e apartamentos." },
      { q: "Por que o m² aqui é menor que o dos anúncios?", a: "O cadastro do IPTU usa a área construída, que inclui parte das áreas comuns do prédio. Os anúncios usam a área privativa, que é menor. Por isso o m² do ITBI fica abaixo." },
      { q: "Por que um distrito aparece em cinza?", a: "Teve menos de 30 compras no período. Com tão poucas, a mediana mudaria muito de um mês para o outro." },
    ],
  },
};
