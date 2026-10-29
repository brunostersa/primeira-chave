import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TopoDaPagina } from "@/components/brand/FotoRecorte";
import { Poupando } from "@/components/brand/Poupando";
import { FOTO_HOME } from "@/lib/conteudo/fotos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/badge";
import { ETAPAS } from "@/lib/conteudo/arvore";
import { CartaoPagina, faqJsonLd, Perguntas, slugSecao, type Pergunta } from "./pecas";
import { capaDe } from "@/lib/conteudo/figuras";
import { ferramenta, hubDe, no, proximoPasso, relacionados } from "@/lib/conteudo/links";
import { PARAMS_ATUALIZADOS_EM } from "@/lib/financiamento/params";
import { SITE } from "@/lib/site-config";

/**
 * Modelo de todo guia: tudo o que liga a página ao organismo (breadcrumb, próximo
 * passo, ferramenta, relacionados, glossário, dados estruturados) vem da árvore.
 * A página só escreve o conteúdo.
 */

export { Aviso, LinkNo, Secao, Termo, type Pergunta } from "./pecas";

const mes = (ym: string) => new Date(`${ym}-01T12:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

export function Guia({
  id,
  resposta,
  faq,
  indice = [],
  h1,
  children,
}: {
  id: string;
  /** H1 com a palavra-chave, quando o título da árvore é curto demais. */
  h1?: string;
  /** Títulos das seções: viram o índice "Nesta página" (a partir de 3). */
  indice?: string[];
  /** A resposta curta, logo abaixo do título: número primeiro. */
  resposta: ReactNode;
  faq: Pergunta[];
  children: ReactNode;
}) {
  const n = no(id);
  const hub = hubDe(n);
  const etapa = ETAPAS.find((e) => e.id === n.etapa);
  const prox = proximoPasso(n);
  const tool = ferramenta(n);
  const rel = relacionados(n, 3);
  const termos = n.glossario.map((g) => no(`g-${g}`));
  const capa = capaDe(id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: h1 ?? n.titulo,
        description: n.resumo,
        inLanguage: "pt-BR",
        dateModified: `${PARAMS_ATUALIZADOS_EM}-01`,
        mainEntityOfPage: `${SITE.url}${n.slug}`,
        ...(capa && { image: `${SITE.url}${capa.url}` }),
        author: { "@id": `${SITE.url}/#org` },
        publisher: { "@id": `${SITE.url}/#org` },
        about: n.termos.slice(0, 3).map(([t]) => t),
      },
      faqJsonLd(faq),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs id={id} />
      <article className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-10 pt-8 sm:px-6">
        <header className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>
              {hub?.titulo}
              {etapa && ` · etapa ${ETAPAS.indexOf(etapa) + 1}: ${etapa.nome}`}
            </Eyebrow>
            <h1 className="font-display text-[clamp(34px,5.4vw,58px)] font-light leading-[1.02]">{h1 ?? n.titulo}</h1>
            <p className="text-lg text-ink-2">{n.resumo}</p>
            {n.tipo !== "atalho" && n.tipo !== "modelo" && (
              <p className="font-mono text-xs text-muted">Regras de {mes(PARAMS_ATUALIZADOS_EM)} · conferidas no simulador da Caixa</p>
            )}
          </div>
          <TopoDaPagina id={n.id} ilustracao={n.ilustracao} className="max-w-md justify-self-center" />
        </header>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex min-w-0 flex-col gap-12">
            <Card variant="strong" className="flex flex-col gap-2">
              <Eyebrow>Resposta curta</Eyebrow>
              <div className="text-[19px] leading-relaxed [&_b]:font-semibold">{resposta}</div>
            </Card>

            {indice.length >= 3 && (
              <nav aria-label="Nesta página" className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-line p-5">
                <Eyebrow>Nesta página</Eyebrow>
                <ol className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                  {[...indice, "Perguntas que todo mundo faz"].map((t, i) => (
                    <li key={t}>
                      <a href={`#${i === indice.length ? "perguntas" : slugSecao(t)}`} className="flex min-h-10 items-baseline gap-3 py-1 underline-offset-4 hover:underline">
                        <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-semibold">{t}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {children}

            <Perguntas faq={faq} />
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            {/* Duas colunas quando o card tem espaço (no celular); na coluna estreita, a foto vai em cima. */}
            <Card variant="mark" className="@container overflow-hidden p-0 sm:p-0">
              <div className="grid @md:grid-cols-2">
                <div className="flex flex-col gap-3 p-5 sm:p-6">
                  <Poupando className="h-28 w-auto max-w-full self-start" />
                  <b className="font-display text-xl leading-tight">{tool.id === "simulador" ? "Simule o seu financiamento" : "Calcule o seu caso"}</b>
                  <span className="text-[15px]">{tool.resumo}</span>
                  <Button asChild className="h-auto min-h-11 self-start whitespace-normal py-2.5 text-left">
                    <Link href={tool.slug}>{tool.id === "simulador" ? "Abrir o simulador" : tool.titulo}</Link>
                  </Button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element -- export estático, imagens já otimizadas em webp */}
                <img
                  src={FOTO_HOME.src}
                  alt={FOTO_HOME.alt}
                  loading="lazy"
                  decoding="async"
                  className="-order-1 aspect-[16/9] w-full object-cover @md:order-none @md:aspect-auto @md:h-full"
                  style={{ objectPosition: FOTO_HOME.pos ?? "center" }}
                />
              </div>
            </Card>
            {termos.length > 0 && (
              <Card className="flex flex-col gap-2">
                <Eyebrow>Termos desta página</Eyebrow>
                <dl className="flex flex-col gap-2 text-sm">
                  {termos.map((t) => (
                    <div key={t.id}>
                      <dt className="font-semibold">{t.titulo}</dt>
                      <dd className="text-ink-2">{t.resumo}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            )}
          </aside>
        </div>

        <nav aria-label="Continue a jornada" className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {prox && <CartaoPagina n={prox} rotulo="Próximo passo" />}
          {rel.map((r) => (
            <CartaoPagina key={r.id} n={r} rotulo="Leia também" />
          ))}
        </nav>
      </article>
    </>
  );
}
