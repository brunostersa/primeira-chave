import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Organismo } from "@/components/conteudo/Organismo";
import { ARVORE, ETAPAS, HUBS, type No } from "@/lib/conteudo/arvore";
import { doHub, estatisticas, no, usamTermo } from "@/lib/conteudo/links";
import { TecidoGlossario, type FioTecido, type TermoTecido } from "@/components/conteudo/TecidoGlossario";

export const metadata: Metadata = {
  title: "Mapa do site",
  description: "Todos os assuntos da Primeira Chave, organizados pela jornada do primeiro imóvel: do quanto posso comprar até a chave.",
  alternates: { canonical: "/mapa/" },
};

/**
 * Dados do "tecido conectivo": cada termo com as páginas no ar que o usam, e um fio entre
 * dois termos para cada página em que aparecem juntos. A roda segue uma ordem gulosa
 * (o próximo é o mais ligado ao anterior), o que encurta os fios e reduz cruzamentos.
 */
function tecido(termos: No[]): { termos: TermoTecido[]; fios: FioTecido[] } {
  const dados = termos.map((t) => {
    const paginas = usamTermo(t.id.replace(/^g-/, "")).filter((p) => p.status === "publicado");
    return { id: t.id, titulo: t.titulo, resumo: t.resumo, slug: t.slug, paginas: paginas.map((p) => ({ titulo: p.titulo, slug: p.slug })), ids: new Set(paginas.map((p) => p.id)) };
  });
  const peso = (a: number, b: number) => [...dados[a].ids].filter((id) => dados[b].ids.has(id)).length;
  const ordem: number[] = [];
  const resta = new Set(dados.map((_, i) => i));
  let atual = dados.reduce((m, d, i) => (d.ids.size > dados[m].ids.size ? i : m), 0);
  while (resta.size) {
    ordem.push(atual);
    resta.delete(atual);
    let prox = -1;
    for (const j of resta) if (prox < 0 || peso(atual, j) > peso(atual, prox) || (peso(atual, j) === peso(atual, prox) && dados[j].ids.size > dados[prox].ids.size)) prox = j;
    atual = prox;
  }
  const ordenados = ordem.map((i) => dados[i]);
  const fios: FioTecido[] = [];
  for (let a = 0; a < ordenados.length; a++)
    for (let b = a + 1; b < ordenados.length; b++) {
      const w = [...ordenados[a].ids].filter((id) => ordenados[b].ids.has(id)).length;
      if (w > 0) fios.push([a, b, w]);
    }
  return { termos: ordenados.map((t) => ({ id: t.id, titulo: t.titulo, resumo: t.resumo, slug: t.slug, paginas: t.paginas })), fios };
}

function ItemPagina({ n }: { n: No }) {
  const pub = n.status === "publicado";
  return (
    <li className="flex items-baseline justify-between gap-3 border-t border-line py-2 text-[15px]">
      {pub ? (
        <Link href={n.slug} className="font-semibold underline-offset-4 hover:underline">
          {n.titulo}
        </Link>
      ) : (
        <span className="text-ink-2">{n.titulo}</span>
      )}
      {!pub && <span className="shrink-0 font-mono text-[11px] uppercase text-muted">em breve</span>}
    </li>
  );
}

export default function MapaPage() {
  const est = estatisticas();
  const hubs = HUBS.filter((h) => h.id !== "glossario");
  const termos = ARVORE.filter((n) => n.tipo === "glossario");
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-14 sm:px-6">
      <header className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-5">
          <Eyebrow>Mapa do site</Eyebrow>
          <h1 className="font-display text-[clamp(38px,5.6vw,64px)] font-light leading-none">
            Tudo conectado, <span className="marca-texto font-semibold">do zero à chave.</span>
          </h1>
          <p className="max-w-xl text-lg text-ink-2">
            No centro, o simulador que dá o seu número. Em volta, os grandes assuntos. Cada página leva à próxima etapa da compra, a uma ferramenta e aos termos que ela usa.
          </p>
          <dl className="grid grid-cols-3 gap-3">
            {[
              [String(est.paginas), "páginas"],
              [String(est.conexoes), "conexões"],
              [`${(est.buscasMes / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mi`, "buscas/mês"],
            ].map(([v, r]) => (
              <div key={r} className="rounded-xl border border-line bg-surface p-3">
                <dt className="font-mono text-xs text-muted">{r}</dt>
                <dd className="font-display text-3xl font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-2">
            <span className="flex items-center gap-1.5"><i className="size-3 rounded-full bg-mark ring-1 ring-ink" aria-hidden /> núcleo</span>
            <span className="flex items-center gap-1.5"><i className="size-3 rounded-full bg-ink" aria-hidden /> no ar</span>
            <span className="flex items-center gap-1.5"><i className="size-3 rounded-full bg-surface ring-1 ring-ink" aria-hidden /> em breve (tamanho = buscas)</span>
            <span className="flex items-center gap-1.5"><i className="h-0.5 w-5 bg-mark" aria-hidden /> ponte entre assuntos</span>
          </p>
        </div>
        <Card className="bg-planta-grid p-2 sm:p-4">
          <Organismo vivo className="h-auto w-full" />
        </Card>
      </header>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Eyebrow>A coluna vertebral</Eyebrow>
          <h2 className="font-display text-4xl font-light">A jornada, etapa por etapa</h2>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.filter((e) => e.id !== "vender").map((e, i) => {
            const paginas = ARVORE.filter((n) => n.etapa === e.id && n.tipo !== "hub");
            const porta = no(e.porta);
            return (
              <li key={e.id} className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-line bg-surface p-4">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")} · {e.nome}</span>
                <b className="font-display text-xl">{e.pergunta}</b>
                <span className="text-sm text-ink-2">
                  Começa em <span className="font-semibold text-ink">{porta.titulo}</span> · {paginas.length} {paginas.length === 1 ? "página" : "páginas"}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Eyebrow>Os assuntos</Eyebrow>
          <h2 className="font-display text-4xl font-light">Todas as páginas</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hubs.map((h) => {
            const hub = no(h.no);
            return (
              <Card key={h.id} className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.07em] text-muted">{h.id}</span>
                <b className="font-display text-xl">{hub.titulo}</b>
                <span className="text-sm text-ink-2">{hub.resumo}</span>
                <ul className="mt-2">
                  {doHub(h.id)
                    .filter((n) => n.tipo !== "glossario")
                    .map((n) => (
                      <ItemPagina key={n.id} n={n} />
                    ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Eyebrow>O tecido conectivo</Eyebrow>
          <h2 className="font-display text-4xl font-light">Glossário</h2>
          <p className="max-w-2xl text-ink-2">Cada termo de banco tem uma explicação só, sempre a mesma, a um clique de qualquer página que o use. Os fios mostram quais termos andam juntos.</p>
        </div>
        <TecidoGlossario {...tecido(termos)} />
      </section>
    </div>
  );
}
