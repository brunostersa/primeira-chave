import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Ilustracao } from "@/components/brand/ilustracoes";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { ETAPAS } from "@/lib/conteudo/arvore";
import { CartaoPagina, faqJsonLd, Perguntas, slugSecao } from "./pecas";
import { doHub, ferramenta, no } from "@/lib/conteudo/links";
import { capaDe } from "@/lib/conteudo/figuras";
import type { TextoHub } from "@/lib/conteudo/textos/hubs";
import { SITE } from "@/lib/site-config";
import { Secoes } from "./Blocos";
import { Rico } from "./Rico";

/**
 * Molde de hub: abertura, ferramenta do assunto e as páginas do hub agrupadas
 * pela etapa da jornada. `extra` entra antes da lista (ex.: tabela de faixas).
 * Se o texto do hub tiver seções e FAQ, elas vêm depois da lista, com índice:
 * o hub vira a página completa do assunto (é ele que disputa a busca grande).
 */
export function HubPagina({ id, texto, extra }: { id: string; texto: TextoHub; extra?: ReactNode }) {
  const intro = texto.intro;
  const secoes = texto.secoes ?? [];
  const faq = texto.faq ?? [];
  const capa = capaDe(id);
  const n = no(id);
  const paginas = doHub(n.hub!).filter((x) => x.tipo !== "glossario" && x.id !== n.id);
  const tool = ferramenta(n);
  const grupos = [...ETAPAS.map((e) => ({ chave: e.id, nome: e.nome, itens: paginas.filter((p) => p.etapa === e.id) })), { chave: "outros", nome: "Mais", itens: paginas.filter((p) => !p.etapa) }].filter(
    (g) => g.itens.length,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: n.titulo,
        description: texto.descricao,
        inLanguage: "pt-BR",
        url: `${SITE.url}${n.slug}`,
        publisher: { "@id": `${SITE.url}/#org` },
        ...(capa && { image: `${SITE.url}${capa.url}` }),
        hasPart: paginas.filter((p) => p.status === "publicado").map((p) => ({ "@type": "WebPage", name: p.titulo, url: `${SITE.url}${p.slug}` })),
      },
      ...(faq.length ? [faqJsonLd(faq)] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs id={id} />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-10 pt-8 sm:px-6">
        <header className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>{n.resumo}</Eyebrow>
            <h1 className="font-display text-[clamp(36px,5.6vw,60px)] font-light leading-[1.02]">{n.titulo}</h1>
            <p className="text-lg text-ink-2">
              <Rico texto={intro} />
            </p>
            <Button asChild variant="mark" className="self-start">
              <Link href={tool.slug}>{tool.id === "simulador" ? "Simular agora" : tool.titulo}</Link>
            </Button>
          </div>
          {n.ilustracao && <Ilustracao nome={n.ilustracao} className="max-w-md justify-self-center" />}
        </header>
        {secoes.length >= 2 && (
          <nav aria-label="Nesta página" className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-line p-5">
            <Eyebrow>Nesta página</Eyebrow>
            <ol className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...secoes.map((x) => x.titulo), "Todos os guias do assunto", ...(faq.length ? ["Perguntas que todo mundo faz"] : [])].map((t, i) => (
                <li key={t}>
                  <a
                    href={`#${t === "Todos os guias do assunto" ? "guias-do-assunto" : t === "Perguntas que todo mundo faz" ? "perguntas" : slugSecao(t)}`}
                    className="flex min-h-10 items-baseline gap-3 py-1 underline-offset-4 hover:underline"
                  >
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold">{t}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {extra}
        {secoes.length > 0 && (
          <div className="flex max-w-3xl flex-col gap-12">
            <Secoes secoes={secoes} pagina={id} />
          </div>
        )}
        <h2 id="guias-do-assunto" className="scroll-mt-24 font-display text-[clamp(26px,3.4vw,34px)] font-light">
          Todos os guias do assunto
        </h2>
        {grupos.map((g) => (
          <section key={g.chave} className="flex flex-col gap-3">
            <Eyebrow>{g.nome}</Eyebrow>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.itens.map((p) => (
                <CartaoPagina key={p.id} n={p} />
              ))}
            </div>
          </section>
        ))}
        {faq.length > 0 && (
          <div className="max-w-3xl">
            <Perguntas faq={faq} />
          </div>
        )}
      </div>
    </>
  );
}
