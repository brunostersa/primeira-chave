import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GradeFotos, MosaicoCapa } from "@/components/imoveis/Galeria";
import { BairroInterativo } from "@/components/imoveis/MapaProximos";
import { MenuDossie, type ItemMenu } from "@/components/imoveis/MenuDossie";
import { BarraDaConta, Carimbo, GraficoParcelas } from "@/components/imoveis/pecas";
import { SimuladorCasa } from "@/components/imoveis/SimuladorCasa";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { custosDaCompra } from "@/lib/financiamento/custos";
import { calcular, PERFIL_VAZIO, rendaMinimaPara, type Resultado } from "@/lib/financiamento/engine";
import { PARAMS_ATUALIZADOS_EM } from "@/lib/financiamento/params";
import { brl } from "@/lib/format";
import { distancia, IMOVEIS_DE_OURO, imovelDeOuro, seloAprovado, slugImovel, type ImovelDeOuro, type Situacao } from "@/lib/imoveis-de-ouro";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

/**
 * Dossiê de um imóvel de ouro, em tela cheia. A ordem segue o que a pessoa precisa saber
 * para decidir: cabe no bolso? quanto ter na mão? como é a casa? onde fica? é seguro?
 * Os números saem do motor do simulador na hora do build.
 */

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

const SECOES: (ItemMenu & { pergunta: string })[] = [
  { id: "bolso", rotulo: "Cabe no bolso?", pergunta: "Cabe no seu bolso?" },
  { id: "na-mao", rotulo: "Dinheiro na mão", pergunta: "Quanto ter na mão" },
  { id: "casa", rotulo: "A casa", pergunta: "A casa por dentro" },
  { id: "bairro", rotulo: "Onde fica", pergunta: "Onde fica e o que tem perto" },
  { id: "selo", rotulo: "O que foi conferido", pergunta: "O que já foi conferido" },
  { id: "parcela", rotulo: "Parcela no tempo", pergunta: "A parcela ao longo dos anos" },
  { id: "contato", rotulo: "Próximo passo", pergunta: "Gostou? O próximo passo" },
];
const MENU: ItemMenu[] = SECOES.map(({ id, rotulo }) => ({ id, rotulo }));

function Secao({ id, children, intro }: { id: string; children: React.ReactNode; intro?: React.ReactNode }) {
  const k = SECOES.findIndex((s) => s.id === id);
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="flex scroll-mt-32 flex-col gap-6 border-t border-line pt-10 xl:scroll-mt-24">
      <header className="flex flex-col gap-2">
        <span className="font-mono text-sm text-muted">{String(k + 1).padStart(2, "0")}</span>
        <h2 id={`${id}-titulo`} className="font-display text-[clamp(30px,3.6vw,48px)] font-light leading-[1.05]">
          {SECOES[k].pergunta}
        </h2>
        {intro && <div className="max-w-3xl text-lg text-ink-2">{intro}</div>}
      </header>
      {children}
    </section>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-planta text-xs font-bold text-ink">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export default async function PaginaImovelDeOuro({ params }: Props) {
  const { cidade, imovel } = await params;
  const i = imovelDeOuro(cidade, imovel);
  if (!i) notFound();
  const { minima, r, custos, semDesconto, avalParaZerar } = numeros(i);
  const aprovado = seloAprovado(i);
  const naMao = r.entrada + custos.total;
  const url = `${SITE.url}${slugImovel(i)}`;
  const maisPerto = (cat: string) => i.proximos.filter((p) => p.categoria === cat).map((p) => ({ ...p, d: distancia(i.mapa, p) })).sort((a, b) => a.d - b.d)[0];
  const perto = [
    { cat: "escola", texto: "Escola" },
    { cat: "saude", texto: "Posto de saúde" },
    { cat: "mercado", texto: "Supermercado" },
    { cat: "farmacia", texto: "Farmácia" },
  ]
    .map((x) => ({ ...maisPerto(x.cat), texto: x.texto }))
    .filter((x) => x.nome);

  const ficha = [
    { k: "Preço", v: brl(i.preco) },
    { k: `Laudo ${i.avaliacao.banco}`, v: brl(i.avaliacao.valor) },
    { k: "Na mão", v: brl(naMao), marca: true },
    { k: "Parcela", v: `${brl(r.price.first.pg)}/mês` },
  ];

  return (
    <article className="pb-28 xl:pb-16">
      {/* Capa de borda a borda, com o carimbo do selo. */}
      <div className="px-1.5 pt-1.5 sm:px-2 sm:pt-2">
        <MosaicoCapa fotos={i.fotos}>
          <a href="#selo" className="absolute top-4 right-4 hidden transition-transform hover:scale-105 sm:block" aria-label={aprovado ? "Selo João aprova: ver o que foi conferido" : "Selo em análise"}>
            <Carimbo aprovado={aprovado} className="w-32 lg:w-40" />
          </a>
        </MosaicoCapa>
      </div>

      <div className="mx-auto grid max-w-[1760px] grid-cols-[minmax(0,1fr)] gap-x-10 px-4 sm:px-6 xl:grid-cols-[200px_minmax(0,1fr)_320px] 2xl:gap-x-16 2xl:px-10">
        {/* Cabeçalho: o que é, onde fica e os sinais que importam. */}
        <header className="flex flex-col gap-4 py-8 xl:col-span-3 xl:grid xl:grid-cols-[200px_minmax(0,1fr)_320px] xl:gap-x-10 2xl:gap-x-16">
          <nav aria-label="Você está em" className="text-sm text-muted xl:pt-3">
            <Link href="/imoveis-de-ouro/" className="underline underline-offset-4">
              Imóveis de ouro
            </Link>{" "}
            ›{" "}
            <Link href={`/imoveis-de-ouro/${i.cidade.id}/`} className="underline underline-offset-4">
              {i.cidade.nome}
            </Link>
          </nav>
          <div className="flex flex-col gap-4">
            <Eyebrow>
              {i.bairro} · {i.cidade.nome} ({i.cidade.uf})
            </Eyebrow>
            <h1 className="font-display text-[clamp(34px,4.6vw,68px)] font-light leading-[1.02]">{i.titulo}</h1>
            <p className="max-w-3xl text-lg text-ink-2">{i.resumo}</p>
            <div className="flex flex-wrap gap-2">
              <Badge tone={aprovado ? "ok" : "warn"}>{aprovado ? "Selo João aprova" : "Selo em análise"}</Badge>
              <Badge tone="ok">Aceita financiamento</Badge>
              <Badge>{r.prog.curto}</Badge>
              <Badge>
                {i.quartos} quartos · {i.areaConstruida.toLocaleString("pt-BR")} m² · lote {i.areaTerreno} m²
              </Badge>
            </div>
            <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 lg:grid-cols-4">
              {ficha.map((f) => (
                <div key={f.k}>
                  <dt className="font-mono text-xs uppercase tracking-[0.07em] text-muted">{f.k}</dt>
                  <dd className="font-display text-[clamp(24px,2.6vw,36px)] font-semibold tabular-nums">{f.marca ? <span className="marca-texto">{f.v}</span> : f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* Menu: faixa presa no topo até o desktop largo, coluna à esquerda nele. */}
        <aside className="sticky top-16 z-30 -mx-4 border-y border-line bg-paper/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 xl:top-24 xl:mx-0 xl:self-start xl:border-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none">
          <MenuDossie itens={MENU} />
        </aside>

        <div className="flex min-w-0 flex-col gap-16 pt-6 xl:pt-0">
          <Secao
            id="bolso"
            intro={
              <>
                Mexa na renda e no FGTS: a conta é refeita na hora, com o preço e o laudo desta casa. Renda mínima para o banco financiar 80%: <b>{minima ? brl(minima.renda) : "—"}</b> por mês.
              </>
            }
          >
            <SimuladorCasa preco={i.preco} avaliacao={i.avaliacao.valor} tipo={i.estado} uf={i.cidade.uf} itbiPct={i.itbi.pct} rendaMinima={minima?.renda ?? null} />
          </Secao>

          <Secao
            id="na-mao"
            intro={
              <>
                Sem FGTS, quem compra precisa de <b className="marca-texto">{brl(naMao)}</b>: a entrada e os custos de papel. O resto o banco paga direto a quem vende.
              </>
            }
          >
            <BarraDaConta preco={i.preco} financiado={r.P} custos={custos.total} />
            <ul className="grid gap-x-10 gap-y-3 text-[15px] lg:grid-cols-2">
              <Check>
                <b>Entrada de {brl(r.entrada)}:</b> o banco financia {Math.round(r.prog.ltv * 100)}% do laudo de {brl(i.avaliacao.valor)}. Pode sair do FGTS de quem tem 3 anos de carteira e não tem outro imóvel na região.
              </Check>
              <Check>
                <b>ITBI de {brl(custos.itbi)}</b>, imposto da prefeitura ({i.itbi.pct}%{i.itbi.conferido ? "" : `, estimativa: confirme na prefeitura de ${i.cidade.nome}`}).
              </Check>
              <Check>
                <b>Cartório de {brl(custos.registro)}</b> com o desconto de 50% de primeiro imóvel financiado (sem ele, {brl(semDesconto.registro)}).
              </Check>
              <Check>
                <b>Avaliação de {brl(custos.avaliacao)}</b>, a taxa que o banco cobra pelo laudo. IPTU de {brl(i.iptuMes)} por mês{i.condominioMes ? `, condomínio ${brl(i.condominioMes)}` : ", sem condomínio"}.
              </Check>
            </ul>
            <div className="flex flex-col gap-2 rounded-[var(--radius-card)] bg-mark p-6">
              <Eyebrow className="text-ink">O segredo, nesta casa</Eyebrow>
              <p className="text-[17px]">
                Aqui a entrada não zera: o laudo veio em {brl(i.avaliacao.valor)}, praticamente o preço. Para sair sem entrada, a avaliação teria de chegar a {brl(avalParaZerar)}. O lado bom: o laudo já está pronto, então não tem o susto
                da avaliação vir bem abaixo do preço.{" "}
                <Link href="/financiar-casa-sem-entrada/" className="underline underline-offset-2">
                  Como funciona o segredo
                </Link>
                .
              </p>
            </div>
          </Secao>

          <Secao id="casa" intro={<>{i.areaConstruida.toLocaleString("pt-BR")} m² construídos num lote de {i.areaTerreno} m². Toque numa foto para ver em tela cheia.</>}>
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 2xl:grid-cols-3">
              {[`${i.quartos} quartos, ${i.banheiros} banheiros, ${i.vagas} vagas`, ...i.caracteristicas, ...i.historico].map((c) => (
                <Check key={c}>{c}</Check>
              ))}
            </ul>
            <GradeFotos fotos={i.fotos} />
          </Secao>

          <Secao
            id="bairro"
            intro={
              <>
                {i.rua}, {i.bairro}, {i.cidade.nome}.{" "}
                <a href={i.mapa.url} rel="noopener" className="underline underline-offset-2">
                  Abrir no Google Maps
                </a>
              </>
            }
          >
            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {perto.map((p) => (
                <div key={p.categoria} className="rounded-[var(--radius-card)] border border-line bg-surface p-4">
                  <dt className="text-sm text-ink-2">{p.texto}</dt>
                  <dd className="font-display text-3xl font-semibold tabular-nums">{Math.round(p.d / 10) * 10} m</dd>
                  <dd className="truncate text-xs text-muted" title={p.nome}>
                    {p.nome}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="flex flex-col gap-2 text-[15px]">
              {i.bairroPontos.map((p) => (
                <Check key={p}>{p}</Check>
              ))}
            </ul>
            <BairroInterativo centro={i.mapa} proximos={i.proximos} />
            <p className="text-sm text-muted">Distâncias em linha reta a partir da casa; a pé ou de carro o caminho é um pouco maior. Pontos levantados no Google Maps em {dataBr(i.analisadoEm)}.</p>
          </Secao>

          <Secao id="selo" intro={<>O selo só sai quando cada item abaixo é conferido. Análise de {dataBr(i.analisadoEm)}.</>}>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_200px]">
              <ul className="divide-y divide-line border-y border-line">
                {i.selo.map((s) => (
                  <li key={s.item} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_140px] sm:items-start">
                    <span>
                      <b className="text-[17px]">{s.item}</b>
                      <span className="block text-ink-2">{s.nota}</span>
                    </span>
                    <Badge tone={TOM[s.situacao]} className="justify-self-start sm:justify-self-end">
                      {ROTULO[s.situacao]}
                    </Badge>
                  </li>
                ))}
              </ul>
              <Carimbo aprovado={aprovado} className="mx-auto w-44" />
            </div>
            {i.vinculo && (
              <p className="rounded-[var(--radius-card)] bg-planta p-5">
                <b>Transparência:</b> {i.vinculo}
              </p>
            )}
          </Secao>

          <Secao
            id="parcela"
            intro={
              <>
                {r.prog.nome}, {r.prog.juros.toLocaleString("pt-BR")}% ao ano ({r.ef.toFixed(2).replace(".", ",")}% efetivos), em {r.n / 12} anos, para alguém de 30 anos sem FGTS. Com seguros e taxa de administração.{" "}
                <Link href="/sac-ou-price/" className="underline underline-offset-2">
                  SAC ou PRICE: qual escolher
                </Link>
              </>
            }
          >
            <GraficoParcelas price={r.price} sac={r.sac} meses={r.n} />
          </Secao>

          <Secao id="contato">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-6 rounded-[var(--radius-card)] bg-ink p-6 text-paper sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="flex flex-col gap-2">
                <p className="font-display text-3xl font-light leading-tight sm:text-4xl">Fale direto com quem vende.</p>
                <p className="text-paper/80">O contato é pelo anúncio na {i.anuncio.plataforma}. Leve a sua simulação: ela mostra que você sabe o que está fazendo.</p>
              </div>
              <div className="flex flex-col gap-3 [&_a]:h-auto [&_a]:min-h-12 [&_a]:py-3 [&_a]:whitespace-normal [&_a]:text-center">
                <Button asChild size="lg" variant="mark">
                  <a href={i.anuncio.url} rel="noopener nofollow">
                    Ver o anúncio e falar com quem vende
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`https://wa.me/?text=${encodeURIComponent(`${i.titulo}: ${url}`)}`} rel="noopener">
                    Mandar para alguém no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted">
              A Primeira Chave é conteúdo educativo: não é banco, correspondente nem imobiliária, e não intermedeia a venda. Os números são simulação com as regras de {PARAMS_ATUALIZADOS_EM.split("-").reverse().join("/")}, não aprovação de
              crédito; quem aprova é o banco, com a sua renda e os documentos. Preço e fotos informados por quem vende; matrícula, averbação e laudo conferidos pela Primeira Chave em {dataBr(i.analisadoEm)}.
            </p>
          </Secao>
        </div>

        {/* Ficha fixa: os números e o contato sempre à mão no desktop largo. */}
        <aside className="hidden xl:sticky xl:top-24 xl:flex xl:flex-col xl:gap-4 xl:self-start">
          <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5">
            <Badge tone={aprovado ? "ok" : "warn"} className="self-start">
              {aprovado ? "Selo João aprova" : "Selo em análise"}
            </Badge>
            <dl className="flex flex-col divide-y divide-line">
              {ficha.map((f) => (
                <div key={f.k} className="flex items-baseline justify-between gap-3 py-2">
                  <dt className="text-sm text-ink-2">{f.k}</dt>
                  <dd className={f.marca ? "marca-texto font-display text-xl font-semibold tabular-nums" : "font-display text-xl font-semibold tabular-nums"}>{f.v}</dd>
                </div>
              ))}
            </dl>
            <Button asChild size="lg" variant="mark">
              <a href="#bolso">Ver se cabe no meu bolso</a>
            </Button>
            <Button asChild variant="outline">
              <a href={i.anuncio.url} rel="noopener nofollow">
                Falar com quem vende
              </a>
            </Button>
          </div>
          <p className="px-1 text-xs text-muted">Simulação para 30 anos, sem FGTS e sem outras dívidas. A sua pode mudar.</p>
        </aside>
      </div>

      {/* No celular e no tablet, a ficha vira uma barra presa embaixo. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur xl:hidden">
        <div className="leading-tight">
          <p className="font-display text-lg font-semibold tabular-nums">{brl(i.preco)}</p>
          <p className="text-xs whitespace-nowrap text-ink-2">{brl(r.price.first.pg)}/mês</p>
        </div>
        <Button asChild variant="mark">
          <a href="#bolso">Cabe no meu bolso?</a>
        </Button>
      </div>
    </article>
  );
}
