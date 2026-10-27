import type { Metadata } from "next";
import { Aviso, Guia, LinkNo, Secao, Termo, type Pergunta } from "@/components/conteudo/Guia";
import { calcular, PERFIL_VAZIO, rendaMinimaPara, type Resultado } from "@/lib/financiamento/engine";
import { PARAMS } from "@/lib/financiamento/params";
import { no } from "@/lib/conteudo/links";
import { brl } from "@/lib/format";
import { FiguraPagina } from "@/components/conteudo/Blocos";
import { capaDe, figuraPropria } from "@/lib/conteudo/figuras";
import { metadadosPagina } from "@/lib/seo";

const ID = "sem-entrada-casa";
const n = no(ID);

export const metadata: Metadata = metadadosPagina({
  titulo: "Dá pra financiar casa sem entrada? A regra da avaliação",
  descricao: "Dá pra financiar casa sem entrada quando o banco avalia o imóvel 25% acima do preço. Veja a conta com números da Caixa, os cuidados e o passo a passo.",
  slug: n.slug,
  capa: capaDe(ID),
});

// Exemplo calculado pelo motor (o mesmo que bate com o simulador da Caixa).
const PRECO = 200_000;
// Renda que aguenta financiar o preço inteiro (o banco empresta 80% de um imóvel de PRECO ÷ 0,8).
const renda = rendaMinimaPara(PRECO / (PARAMS.mcmvLtv / 100))!.renda;
const perfil = { ...PERFIL_VAZIO, quem: "sozinho" as const, idade: 31, renda, dividasOpt: "nao" as const, reservaOpt: "nada" as const, fgtsOpt: "nao" as const, imovel: "nao" as const, nome: "sim" as const, achou: "sim" as const, valor: PRECO };
const comum = calcular({ ...perfil, avaliou: true, avalReal: PRECO }) as Resultado;
const segredo = calcular({ ...perfil, avaliou: true, avalReal: PRECO / (PARAMS.mcmvLtv / 100) }) as Resultado;
const custosPct = PARAMS.itbi + PARAMS.cartorio + PARAMS.avaliacao;

const FAQ: Pergunta[] = [
  {
    q: "Dá pra financiar 100% do imóvel?",
    a: "Do preço, sim, quando a avaliação do banco fica 25% ou mais acima dele: o banco empresta até 80% da avaliação, e 80% de uma avaliação 25% maior é o preço inteiro. Os custos de ITBI e cartório continuam por sua conta.",
  },
  {
    q: "O FGTS pode pagar o ITBI e o cartório?",
    a: "Não. Na compra, o FGTS só entra na entrada. ITBI e cartório saem do seu bolso; o cartório, em alguns casos, pode entrar no financiamento — pergunte no banco.",
  },
  {
    q: "Vale para apartamento?",
    a: "Vale a mesma regra: o que conta é a avaliação do banco em relação ao preço, seja casa ou apartamento.",
  },
  {
    q: "Vale para imóvel de leilão da Caixa?",
    a: "Não do mesmo jeito. Para imóveis retomados pela Caixa, a regra usa o menor valor entre venda e avaliação, então a avaliação acima do preço não aumenta o empréstimo.",
  },
  {
    q: "Posso combinar com o vendedor um preço maior no contrato?",
    a: "Não. Declarar ao banco um valor diferente do que você realmente paga é fraude. O caminho legítimo é comprar um imóvel que vale mais do que custa — e quem diz quanto vale é o engenheiro do banco, não você nem o vendedor.",
  },
];

export default function Page() {
  return (
    <Guia
      id={ID}
      faq={FAQ}
      indice={["A conta, com números da Caixa", "Por que funciona", "Quando isso acontece na vida real", "Os 4 cuidados", "O passo a passo"]}
      resposta={
        <>
          Dá, em um caso: quando o <b>banco avalia o imóvel 25% ou mais acima do preço</b>. Ele empresta até {PARAMS.mcmvLtv}% da{" "}
          <Termo id="avaliacao">avaliação</Termo>, sem passar do preço, e aí financia o preço inteiro. Você ainda paga ITBI e cartório (perto de {custosPct}%
          do imóvel).
        </>
      }
    >
      <Secao titulo="A conta, com números da Caixa">
        <p>
          Imagine uma casa de <b>{brl(PRECO)}</b> e uma pessoa de 31 anos com renda de <b>{brl(renda)}</b> por mês, o que a Caixa pede para emprestar os {brl(PRECO)} inteiros. Veja o que
          muda só com a avaliação:
        </p>
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
          <table className="w-full min-w-[520px] text-left text-[15px] tabular-nums">
            <thead className="text-sm text-muted">
              <tr>
                <th className="p-3 font-normal" />
                <th className="p-3 font-normal">Avaliação = preço</th>
                <th className="bg-mark-soft p-3 font-semibold text-ink">Avaliação 25% acima</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["O banco avaliou em", brl(comum.base), brl(segredo.base)],
                ["O banco empresta", brl(comum.P), brl(segredo.P)],
                ["Sua entrada", brl(comum.entrada), segredo.entrada < 1 ? "R$ 0" : brl(segredo.entrada)],
                ["ITBI, cartório e taxas", brl(comum.custos), brl(segredo.custos)],
                ["Total que sai do seu bolso", brl(comum.entrada + comum.custos), brl(segredo.entrada + segredo.custos)],
                ["1ª parcela (Price)", brl(comum.price.first.pg), brl(segredo.price.first.pg)],
              ].map(([k, a, b]) => (
                <tr key={k} className="border-t border-line">
                  <td className="p-3 text-ink-2">{k}</td>
                  <td className="p-3">{a}</td>
                  <td className="bg-mark-soft/60 p-3 font-semibold text-ink">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          A diferença de <b>{brl(comum.entrada + comum.custos - (segredo.entrada + segredo.custos))}</b> no seu bolso vem de um único número: quanto o engenheiro do banco
          acha que o imóvel vale. A parcela sobe um pouco porque você financia mais — por isso a renda precisa aguentar o valor inteiro.
        </p>
        <FiguraPagina figura={figuraPropria(ID, "avaliacao-muda-tudo")} pagina={ID} />
      </Secao>

      <Secao titulo="Por que funciona">
        <p>
          O banco não empresta sobre o preço que você combinou. Ele empresta sobre a <Termo id="avaliacao">avaliação</Termo> que o engenheiro dele faz do imóvel: a{" "}
          <Termo id="cota-de-financiamento">cota de financiamento</Termo> é de até {PARAMS.mcmvLtv}% desse valor. É o que diz a Resolução 4.676 do Conselho Monetário
          Nacional, que regula o crédito imobiliário.
        </p>
        <p>
          Na prática, os bancos também limitam o empréstimo ao preço de venda: ninguém financia mais do que você vai pagar. Então, quando a avaliação passa de{" "}
          <b>preço ÷ 0,8</b> (ou seja, 25% acima), o empréstimo bate no preço e a entrada some.
        </p>
        <FiguraPagina figura={figuraPropria(ID, "regra-dos-125")} pagina={ID} />
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
          <table className="w-full min-w-[420px] text-left text-[15px] tabular-nums">
            <thead className="text-sm text-muted">
              <tr>
                <th className="p-3 font-normal">Preço do imóvel</th>
                <th className="p-3 font-normal">Avaliação mínima para entrada zero</th>
              </tr>
            </thead>
            <tbody>
              {[150_000, 200_000, 250_000, 300_000, 400_000].map((p) => (
                <tr key={p} className="border-t border-line">
                  <td className="p-3">{brl(p)}</td>
                  <td className="p-3 font-semibold text-ink">{brl(p / (PARAMS.mcmvLtv / 100))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Secao>

      <Secao titulo="Quando isso acontece na vida real">
        <p>A avaliação fica bem acima do preço quando o imóvel foi comprado — ou está sendo vendido — abaixo do que vale no mercado. Os casos mais comuns:</p>
        <ul className="ml-5 flex list-disc flex-col gap-2">
          <li>
            <b>Usado que precisou de reforma.</b> Quem compra, reforma e revende costuma vender abaixo da avaliação para girar rápido.
          </li>
          <li>
            <b>Venda com pressa:</b> herança, mudança de cidade, divórcio.
          </li>
          <li>
            <b>Imóvel parado há tempo</b>, com dono que prefere vender a manter.
          </li>
        </ul>
        <p>
          Imóvel de <LinkNo id="leilao-caixa">leilão da Caixa</LinkNo> é outra história: para retomados, a regra usa o <b>menor</b> valor entre venda e avaliação.
        </p>
      </Secao>

      <Aviso titulo="O que não fazer" tom="bad">
        Nunca declare ao banco um preço diferente do que você paga, nem combine “valor por fora” com o vendedor. Isso é fraude e pode cancelar o financiamento — além
        de ser crime. O caminho legítimo é um só: comprar um imóvel que <b>vale</b> mais do que <b>custa</b>, e deixar o engenheiro do banco dizer quanto vale.
      </Aviso>

      <Secao titulo="Os 4 cuidados">
        <ol className="ml-5 flex list-decimal flex-col gap-3">
          <li>
            <b>Só conta o laudo.</b> Anúncio, corretor e vendedor não definem a avaliação. Peça a <LinkNo id="avaliacao-do-imovel">avaliação do banco</LinkNo> antes de
            pagar qualquer sinal.
          </li>
          <li>
            <b>A renda precisa aguentar o valor inteiro.</b> Financiando 100% do preço, a parcela é maior. Se ela passar de {PARAMS.comp}% da renda, o que o banco não
            empresta volta a ser entrada.
          </li>
          <li>
            <b>Guarde para ITBI e cartório.</b> Perto de {custosPct}% do imóvel, e o <Termo id="fgts">FGTS</Termo> não paga essa parte. Em alguns casos o cartório
            entra no financiamento.
          </li>
          <li>
            <b>Confirme a política do banco.</b> A regra da avaliação vem da norma; o limite pelo preço é política de cada banco. Confirme com o correspondente antes de
            fechar.
          </li>
        </ol>
      </Secao>

      <Secao titulo="O passo a passo">
        <ol className="ml-5 flex list-decimal flex-col gap-2">
          <li>
            Descubra quanto sua renda aguenta no <LinkNo id="simulador">simulador</LinkNo>.
          </li>
          <li>Peça a aprovação de crédito antes de escolher o imóvel.</li>
          <li>Procure imóveis abaixo do valor de mercado da região.</li>
          <li>Peça a avaliação do banco antes do sinal.</li>
          <li>Com o laudo na mão, feche o negócio pelo preço real.</li>
        </ol>
      </Secao>
    </Guia>
  );
}
