import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Ilustracao } from "@/components/brand/ilustracoes";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/badge";
import { ETAPAS } from "@/lib/conteudo/arvore";
import { CartaoPagina } from "./pecas";
import { ferramenta, hubDe, no, proximoPasso, relacionados } from "@/lib/conteudo/links";
import { PARAMS_ATUALIZADOS_EM } from "@/lib/financiamento/params";
import { SITE } from "@/lib/site-config";

/**
 * Modelo de todo guia: tudo o que liga a página ao organismo (breadcrumb, próximo
 * passo, ferramenta, relacionados, glossário, dados estruturados) vem da árvore.
 * A página só escreve o conteúdo.
 */

export type Pergunta = { q: string; a: string };
export { Aviso, LinkNo, Secao, Termo } from "./pecas";

const mes = (ym: string) => new Date(`${ym}-01T12:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

export function Guia({
  id,
  resposta,
  faq,
  children,
}: {
  id: string;
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: n.titulo,
        description: n.resumo,
        inLanguage: "pt-BR",
        dateModified: `${PARAMS_ATUALIZADOS_EM}-01`,
        mainEntityOfPage: `${SITE.url}${n.slug}`,
        publisher: { "@id": `${SITE.url}/#org` },
        about: n.termos.slice(0, 3).map(([t]) => t),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
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
            <h1 className="font-display text-[clamp(34px,5.4vw,58px)] font-light leading-[1.02]">{n.titulo}</h1>
            <p className="text-lg text-ink-2">{n.resumo}</p>
            {n.tipo !== "atalho" && (
              <p className="font-mono text-xs text-muted">Regras de {mes(PARAMS_ATUALIZADOS_EM)} · conferidas no simulador da Caixa</p>
            )}
          </div>
          {n.ilustracao && <Ilustracao nome={n.ilustracao} className="max-w-md justify-self-center" />}
        </header>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex min-w-0 flex-col gap-12">
            <Card variant="strong" className="flex flex-col gap-2">
              <Eyebrow>Resposta curta</Eyebrow>
              <div className="text-[19px] leading-relaxed [&_b]:font-semibold">{resposta}</div>
            </Card>

            {children}

            <section className="flex flex-col gap-3">
              <h2 className="font-display text-[clamp(26px,3.4vw,34px)] font-light">Perguntas que todo mundo faz</h2>
              <div className="flex flex-col divide-y divide-line border-y border-line">
                {faq.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span aria-hidden className="font-mono transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-ink-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            <Card variant="mark" className="flex flex-col gap-3">
              <JoaoDeBarro pose="frente" humor="feliz" className="h-20 w-auto self-start" />
              <b className="font-display text-xl leading-tight">Faça a sua conta</b>
              <span className="text-[15px]">{tool.resumo}</span>
              <Button asChild className="self-start">
                <Link href={tool.slug}>{tool.id === "simulador" ? "Abrir o simulador" : tool.titulo}</Link>
              </Button>
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
