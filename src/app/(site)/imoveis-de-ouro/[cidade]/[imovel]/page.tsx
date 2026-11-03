import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { ListaProximos, MapaProximos } from "@/components/imoveis/MapaProximos";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { custosDaCompra } from "@/lib/financiamento/custos";
import { calcular, PERFIL_VAZIO, rendaMinimaPara, type Resultado } from "@/lib/financiamento/engine";
import { PARAMS_ATUALIZADOS_EM } from "@/lib/financiamento/params";
import { brl } from "@/lib/format";
import { distancia, IMOVEIS_DE_OURO, imovelDeOuro, seloAprovado, slugImovel, type ImovelDeOuro, type Situacao } from "@/lib/imoveis-de-ouro";
import { metadadosPagina } from "@/lib/seo";

/** Página de um imóvel de ouro: tudo sobre ele, com os números saídos do motor do simulador. */

export const dynamicParams = false;
type Props = { params: Promise<{ cidade: string; imovel: string }> };

export function generateStaticParams() {
  return IMOVEIS_DE_OURO.map((i) => ({ cidade: i.cidade.id, imovel: i.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade, imovel } = await params;
  const i = imovelDeOuro(cidade, imovel);
  if (!i) return {};
  return metadadosPagina({
    titulo: `${i.titulo}, ${i.cidade.nome}`,
    descricao: `${brl(i.preco)}, avaliação ${i.avaliacao.banco} de ${brl(i.avaliacao.valor)}. Entrada, parcela, renda mínima e custos da compra, tudo calculado. ${i.resumo}`,
    slug: slugImovel(i),
    capa: { url: i.fotos[0].arquivo, alt: i.fotos[0].legenda, width: 1200, height: 630 },
  });
}

/** Comprador de referência: 30 anos, sem outras dívidas, renda que cabe com folga, sem FGTS. */
function numeros(i: ImovelDeOuro) {
  const minima = rendaMinimaPara(i.preco);
  const renda = Math.max(9000, Math.ceil((minima?.renda ?? 0) / 100) * 100);
  const r = calcular({
    ...PERFIL_VAZIO,
    idade: 30,
    renda,
    dividasOpt: "nao",
    reservaOpt: "nada",
    fgtsOpt: "nao",
    imovel: "nao",
    achou: "sim",
    valor: i.preco,
    tipo: i.estado,
    avaliou: true,
    avalReal: i.avaliacao.valor,
  }) as Resultado;
  const custos = custosDaCompra({ uf: i.cidade.uf, valor: i.preco, financiado: r.P, itbiPct: i.itbi.pct, primeiroImovelSfh: true });
  const semDesconto = custosDaCompra({ uf: i.cidade.uf, valor: i.preco, financiado: r.P, itbiPct: i.itbi.pct, primeiroImovelSfh: false });
  return { minima, r, custos, semDesconto, avalParaZerar: i.preco / r.prog.ltv };
}

const TOM: Record<Situacao, "ok" | "warn" | "bad"> = { ok: "ok", analise: "warn", atencao: "bad" };
const ROTULO: Record<Situacao, string> = { ok: "Conferido", analise: "Em análise", atencao: "Atenção" };
const dataBr = (iso: string) => iso.split("-").reverse().join("/");

function Linha({ rotulo, valor, nota }: { rotulo: string; valor: string; nota?: string }) {
  return (
    <li className="grid gap-1 py-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
      <span className="text-ink-2">{rotulo}</span>
      <span>
        <b>{valor}</b>
        {nota && <span className="block text-sm text-muted">{nota}</span>}
      </span>
    </li>
  );
}

function Secao({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="font-display text-2xl font-semibold sm:text-3xl">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default async function PaginaImovelDeOuro({ params }: Props) {
  const { cidade, imovel } = await params;
  const i = imovelDeOuro(cidade, imovel);
  if (!i) notFound();
  const { minima, r, custos, semDesconto, avalParaZerar } = numeros(i);
  const aprovado = seloAprovado(i);
  const pendentes = i.selo.filter((s) => s.situacao !== "ok").length;
  const dinheiroNaMao = r.entrada + custos.total;
  const [capa, ...fotos] = i.fotos;
  const maisPerto = (cat: string) => i.proximos.filter((p) => p.categoria === cat).map((p) => ({ ...p, d: distancia(i.mapa, p) })).sort((a, b) => a.d - b.d)[0];
  const perto = [
    { cat: "escola", texto: "Escola" },
    { cat: "saude", texto: "posto de saúde" },
    { cat: "mercado", texto: "supermercado" },
    { cat: "farmacia", texto: "farmácia" },
  ]
    .map((x) => ({ ...maisPerto(x.cat), texto: x.texto }))
    .filter((x) => x.nome);

  return (
    <article className="mx-auto flex max-w-4xl flex-col gap-14 px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <nav aria-label="Você está em" className="text-sm text-muted">
        <Link href="/imoveis-de-ouro/" className="underline underline-offset-4">
          Imóveis de ouro
        </Link>{" "}
        ›{" "}
        <Link href={`/imoveis-de-ouro/${i.cidade.id}/`} className="underline underline-offset-4">
          {i.cidade.nome}
        </Link>
      </nav>

      <header className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Eyebrow>
            Seleção de imóvel de ouro · {i.bairro}, {i.cidade.nome}
          </Eyebrow>
          <h1 className="font-display text-[clamp(32px,5.5vw,52px)] font-light leading-[1.05]">{i.titulo}</h1>
          <p className="text-lg text-ink-2">{i.resumo}</p>
          <div className="flex flex-wrap gap-2">
            <Badge tone={aprovado ? "ok" : "warn"}>{aprovado ? "João aprova" : `Selo em análise · falta ${pendentes} ${pendentes === 1 ? "item" : "itens"}`}</Badge>
            <Badge tone="ok">Aceita financiamento</Badge>
            <Badge>{r.prog.curto}</Badge>
          </div>
        </div>
        <figure className="flex flex-col gap-2">
          <Image src={capa.arquivo} alt={capa.legenda} width={1200} height={800} priority className="aspect-[3/2] w-full rounded-[var(--radius-card)] object-cover" />
        </figure>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Preço", brl(i.preco)],
            [`Avaliação ${i.avaliacao.banco}`, brl(i.avaliacao.valor)],
            ["Entrada", brl(r.entrada)],
            ["Parcela (PRICE)", `${brl(r.price.first.pg)}/mês`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[var(--radius-card)] border border-line bg-surface p-4">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="font-display text-2xl font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {i.vinculo && (
        <Card variant="planta">
          <p>
            <b>Transparência:</b> {i.vinculo}
          </p>
        </Card>
      )}

      <Secao id="numeros" titulo="Quanto custa de verdade">
        <p className="text-ink-2">
          Conta feita pelo motor do simulador da Primeira Chave, com as regras da Caixa de {PARAMS_ATUALIZADOS_EM.split("-").reverse().join("/")}, para alguém de 30 anos, sem outras dívidas e sem usar FGTS. Com o seu perfil o número muda:{" "}
          <Link href="/simulador-financiamento-caixa/" className="underline underline-offset-2">
            refaça no simulador
          </Link>
          .
        </p>
        <ul className="divide-y divide-line border-y border-line">
          <Linha rotulo="Linha de crédito" valor={r.prog.nome} nota={`Juros de ${r.prog.juros.toLocaleString("pt-BR")}% ao ano (${r.ef.toFixed(2).replace(".", ",")}% efetivos), prazo de ${r.n / 12} anos.`} />
          <Linha rotulo="O banco financia" valor={brl(r.P)} nota={`${Math.round(r.prog.ltv * 100)}% da avaliação de ${brl(i.avaliacao.valor)} (o banco usa o menor valor entre preço e avaliação).`} />
          <Linha rotulo="Entrada" valor={brl(r.entrada)} nota="Pode sair do FGTS de quem tem 3 anos ou mais de carteira e não tem outro imóvel na região." />
          <Linha rotulo="Custos da compra" valor={brl(custos.total)} nota={`ITBI ${brl(custos.itbi)} (${i.itbi.pct}%${i.itbi.conferido ? "" : ", estimativa: confirme na prefeitura"}), cartório ${brl(custos.registro)} com o desconto de primeiro imóvel (sem ele, ${brl(semDesconto.registro)}) e avaliação ${brl(custos.avaliacao)}.`} />
          <Linha rotulo="Dinheiro na mão" valor={brl(dinheiroNaMao)} nota="Entrada mais custos, antes de usar o FGTS." />
          <Linha rotulo="Renda mínima" valor={minima ? `${brl(minima.renda)} por mês` : "acima do simulador"} nota="Renda bruta da família, somando quem compra junto, sem outras dívidas." />
          <Linha rotulo="IPTU" valor={`${brl(i.iptuMes)} por mês`} nota={i.condominioMes ? `Condomínio ${brl(i.condominioMes)} por mês.` : "Sem condomínio."} />
        </ul>
      </Secao>

      <Secao id="parcela" titulo="A parcela, nos dois sistemas">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <Eyebrow>PRICE · parcela fixa</Eyebrow>
            <p className="mt-2 font-display text-3xl font-semibold">{brl(r.price.first.pg)}</p>
            <p className="text-sm text-ink-2">Quase a mesma do começo ao fim (muda só com a TR e o seguro). Total pago: {brl(r.price.total)}.</p>
          </Card>
          <Card>
            <Eyebrow>SAC · parcela que cai</Eyebrow>
            <p className="mt-2 font-display text-3xl font-semibold">
              {brl(r.sac.first.pg)} <span className="text-lg font-normal text-muted">→ {brl(r.sac.last)}</span>
            </p>
            <p className="text-sm text-ink-2">Começa mais alta e termina perto de {brl(r.sac.last)}. Total pago: {brl(r.sac.total)}.</p>
          </Card>
        </div>
        <p className="text-sm text-muted">
          Parcelas com seguros (MIP e DFI) e a taxa de administração.{" "}
          <Link href="/sac-ou-price/" className="underline underline-offset-2">
            SAC ou PRICE: qual escolher
          </Link>
          .
        </p>
      </Secao>

      <Card variant="mark" className="flex flex-col gap-2">
        <Eyebrow className="text-ink">O segredo, neste imóvel</Eyebrow>
        <p>
          Aqui a entrada não zera: a Caixa avaliou em {brl(i.avaliacao.valor)}, praticamente o preço, então o banco financia {Math.round(r.prog.ltv * 100)}% disso e a diferença sai do seu bolso. Para sair sem entrada, a avaliação teria de chegar a {brl(avalParaZerar)}. O lado bom: o laudo já está pronto, então não tem o susto da avaliação vir bem abaixo do preço, que é o mais comum.{" "}
          <Link href="/financiar-casa-sem-entrada/" className="underline underline-offset-2">
            Como funciona o segredo
          </Link>
          .
        </p>
      </Card>

      <Secao id="casa" titulo="A casa">
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {[
            `${i.areaConstruida.toLocaleString("pt-BR")} m² construídos em lote de ${i.areaTerreno} m²`,
            `${i.quartos} quartos, ${i.banheiros} banheiros, ${i.vagas} vagas`,
            ...i.caracteristicas,
            ...i.historico,
          ].map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden className="text-planta-deep">
                ✓
              </span>
              {c}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {fotos.map((f) => (
            <figure key={f.arquivo} className="flex flex-col gap-1">
              <Image src={f.arquivo} alt={f.legenda} width={600} height={450} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <figcaption className="text-xs text-muted">{f.legenda}</figcaption>
            </figure>
          ))}
        </div>
      </Secao>

      <Secao id="bairro" titulo={`O bairro: ${i.bairro}`}>
        <p className="text-ink-2">
          {i.rua}, {i.cidade.nome} ({i.cidade.uf}), na região metropolitana de Goiânia.{" "}
          <a href={i.mapa.url} rel="noopener" className="underline underline-offset-2">
            Abrir no Google Maps
          </a>
          .
        </p>
        <ul className="flex flex-col gap-2">
          {i.bairroPontos.map((p) => (
            <li key={p} className="flex gap-2">
              <span aria-hidden className="text-planta-deep">
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>
        <p className="text-lg">
          {perto.map((p, k) => (
            <span key={p.categoria}>
              {k > 0 && (k === perto.length - 1 ? " e " : ", ")}
              {p.texto} a <b>{Math.round(p.d / 10) * 10} m</b>
            </span>
          ))}
          .
        </p>
        <MapaProximos centro={i.mapa} proximos={i.proximos} rotulo="A casa" />
        <p className="text-sm text-muted">Distâncias em linha reta a partir da casa; a pé ou de carro o caminho é um pouco maior. Pontos levantados no Google Maps em {dataBr(i.analisadoEm)}.</p>
        <ListaProximos centro={i.mapa} proximos={i.proximos} />
      </Secao>

      <Secao id="selo" titulo="Selo João aprova">
        <div className="grid items-center gap-6 sm:grid-cols-[1fr_160px]">
          <p className="text-ink-2">
            O selo não é carimbo: só sai quando cada item abaixo for conferido, e a página mostra o que já foi visto e o que falta.{" "}
            {aprovado ? "Todos os itens foram conferidos." : `Faltam ${pendentes} ${pendentes === 1 ? "item" : "itens"}, por isso o imóvel está em análise.`} Análise de {dataBr(i.analisadoEm)}.
          </p>
          <JoaoDeBarro pose={aprovado ? "comemora" : "parado"} humor={aprovado ? "feliz" : "curioso"} className="mx-auto w-32" titulo="João-de-barro" />
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {i.selo.map((s) => (
            <li key={s.item} className="grid gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_140px] sm:items-start">
              <span>
                <b>{s.item}</b>
                <span className="block text-sm text-ink-2">{s.nota}</span>
              </span>
              <Badge tone={TOM[s.situacao]} className="justify-self-start sm:justify-self-end">
                {ROTULO[s.situacao]}
              </Badge>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">
          Antes de dar sinal, peça a certidão de matrícula atualizada (o banco aceita com até 30 dias).{" "}
          <Link href="/documentos-para-financiar-imovel/" className="underline underline-offset-2">
            Os documentos do imóvel e do vendedor
          </Link>
          .
        </p>
      </Secao>

      <Card variant="strong" className="flex flex-col items-start gap-4">
        <p className="font-display text-2xl font-semibold">Gostou da casa?</p>
        <p className="text-ink-2">
          O contato é direto com quem vende, pelo anúncio na {i.anuncio.plataforma}. Antes, veja se a parcela cabe no seu bolso.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/simulador-financiamento-caixa/">Simular com a minha renda</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={i.anuncio.url} rel="noopener nofollow">
              Ver o anúncio e falar com quem vende
            </a>
          </Button>
        </div>
      </Card>

      <p className="text-sm text-muted">
        A Primeira Chave é conteúdo educativo: não é banco, correspondente nem imobiliária, e não intermedeia a venda. Os números são simulação, não aprovação de crédito; quem aprova é o banco, com a sua renda e os documentos. Preço e fotos informados por quem vende; matrícula, averbação e laudo conferidos pela Primeira Chave em {dataBr(i.analisadoEm)}.
      </p>
    </article>
  );
}
