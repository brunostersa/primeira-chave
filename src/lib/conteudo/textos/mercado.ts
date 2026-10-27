import { brl, pct } from "../../format";
import { capitais, FIPEZAP, imovelQueARendaCompra, ITBI_SP, mesAno, variacaoIvgr } from "../../mercado";
import type { Texto } from "../tipos";

/**
 * Páginas de dados de mercado. Os números do texto vêm dos mesmos JSONs dos mapas
 * (scripts/dados/atualizar.py): atualizou os dados, o texto acompanha.
 */

const caps = capitais().sort((a, b) => a.m2 - b.m2);
const barata = caps[0];
const cara = caps[caps.length - 1];
const exemplo = imovelQueARendaCompra(6000)!;
const ivgr = variacaoIvgr(12);
const sp = ITBI_SP.cidade;
const distritos = ITBI_SP.distritos.filter((d) => d.m2).sort((a, b) => a.m2! - b.m2!);
const spBarato = distritos[0];
const spCaro = distritos[distritos.length - 1];
const periodoSp = `${mesAno(ITBI_SP.periodo.de)} a ${mesAno(ITBI_SP.periodo.ate)}`;

export const TEXTOS_MERCADO: Record<string, Texto> = {
  "quanto-minha-renda-compra": {
    tituloSeo: "Preço do m² nas capitais e quanto a sua renda compra",
    descricao: `O preço médio do m² em ${caps.length} capitais (FipeZAP, ${mesAno(FIPEZAP.ref)}) e quantos metros cabem no financiamento da sua renda, pelas regras da Caixa.`,
    resposta: `Com **${brl(6000)} de renda**, o banco financia um imóvel de até **${brl(exemplo.valor)}**. Isso dá uns **${Math.floor(exemplo.valor / barata.m2)} m² em ${barata.nome}** e só **${Math.floor(exemplo.valor / cara.m2)} m² em ${cara.nome}**, pelo preço médio de anúncio. Mexa na renda e escolha a sua capital.`,
    secoes: [
      { titulo: "O mapa", blocos: [{ calculo: "mapa-capitais" }] },
      {
        titulo: "Como ler esses números",
        blocos: [
          {
            lista: [
              "**É preço de anúncio**, não de venda: o que o dono pede. Na negociação, o preço costuma cair.",
              "**O banco empresta sobre a [avaliação](g:avaliacao)**, não sobre o anúncio. Se a avaliação vier abaixo do preço, a diferença sai do seu bolso.",
              `**O mercado está subindo:** as avaliações dos bancos subiram ${pct(ivgr.pct, 1)} em 12 meses (Banco Central).`,
              "**A média esconde o bairro:** dentro da mesma cidade, o m² pode variar mais de três vezes. Veja [São Paulo distrito por distrito](#metro-quadrado-sao-paulo).",
            ],
          },
          { calculo: "termometro" },
          { p: "Quer o número com a sua idade, suas dívidas e o seu FGTS? Faça a conta completa no [simulador](#simulador)." },
        ],
      },
    ],
    faq: [
      { q: "De onde vêm os preços do m²?", a: "Do Índice FipeZAP, da Fipe com o Grupo OLX, que acompanha os anúncios de venda em 56 cidades. É o preço pedido, em média móvel de 3 meses." },
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
          { p: "Veja quanto a sua renda compra em [cada capital](#quanto-minha-renda-compra) e faça a conta completa no [simulador](#simulador)." },
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
