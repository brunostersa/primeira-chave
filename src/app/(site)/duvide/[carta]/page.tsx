import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import { Rico } from "@/components/conteudo/Rico";
import { LinkNo } from "@/components/conteudo/pecas";
import { CARIMBO } from "@/components/duvide/carimbo";
import { Compartilhar } from "@/components/duvide/Compartilhar";
import { CartaMini } from "@/components/duvide/Grade";
import { CARTAS, cartaPorId, VEREDITOS } from "@/lib/conteudo/duvide";
import { no } from "@/lib/conteudo/links";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

type Props = { params: Promise<{ carta: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return CARTAS.map((c) => ({ carta: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = cartaPorId((await params).carta);
  if (!c) return {};
  return metadadosPagina({
    titulo: c.pergunta,
    descricao: `${c.pergunta} ${VEREDITOS[c.veredito].rotulo}: ${c.resumo}`.slice(0, 158),
    slug: `/duvide/${c.id}/`,
    capa: { url: `/cartas/${c.id}.jpg`, alt: `${c.frase} ${VEREDITOS[c.veredito].rotulo}.`, width: 1080, height: 1350 },
  });
}

export default async function CartaDuvide({ params }: Props) {
  const c = cartaPorId((await params).carta);
  if (!c) notFound();
  const v = VEREDITOS[c.veredito];
  const guia = no(c.guia);
  const outras = CARTAS.filter((x) => x.id !== c.id && x.publico.some((p) => c.publico.includes(p))).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: c.pergunta, inLanguage: "pt-BR", image: `${SITE.url}/cartas/${c.id}.webp`, mainEntityOfPage: `${SITE.url}/duvide/${c.id}/`, publisher: { "@id": `${SITE.url}/#org` } },
      { "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: c.pergunta, acceptedAnswer: { "@type": "Answer", text: `${v.rotulo}. ${c.resumo}` } }] },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Você está em" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-ink-2 sm:px-6">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="underline-offset-4 hover:underline">Início</Link> <span aria-hidden>/</span>
          </li>
          <li>
            <Link href="/duvide/" className="underline-offset-4 hover:underline">Duvide</Link> <span aria-hidden>/</span>
          </li>
          <li aria-current="page">{c.pergunta}</li>
        </ol>
      </nav>
      <article className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="flex min-w-0 flex-col gap-8">
          <header className="flex flex-col gap-4">
            <span className={cn("-rotate-2 self-start rounded-md border-2 border-ink px-3 py-1 font-display font-semibold uppercase", CARIMBO[c.veredito])}>{v.rotulo}</span>
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-light leading-[1.05]">{c.pergunta}</h1>
            <p className="text-lg text-ink-2">
              Dizem por aí: <i>“{c.frase}”</i>
            </p>
          </header>
          <div className="rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5 text-[19px] leading-relaxed">
            <Eyebrow>Resposta curta</Eyebrow>
            <p className="mt-2">
              <b>{v.rotulo}.</b> {c.resumo}
            </p>
          </div>
          <section className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-2 [&_b]:font-semibold [&_b]:text-ink">
            <h2 className="font-display text-[clamp(26px,3.4vw,34px)] font-light text-ink">Por quê</h2>
            {c.explicacao.map((p, i) => (
              <p key={i}>
                <Rico texto={p} />
              </p>
            ))}
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="font-display text-[clamp(26px,3.4vw,34px)] font-light">O que fazer</h2>
            <ol className="flex flex-col gap-3">
              {c.fazer.map((f, i) => (
                <li key={f} className="grid grid-cols-[32px_1fr] gap-3 text-[17px]">
                  <span className="flex size-8 items-center justify-center rounded-full bg-mark font-display font-semibold">{i + 1}</span>
                  <span className="pt-1">{f}</span>
                </li>
              ))}
            </ol>
            <p className="text-[17px]">
              Para entender a fundo: <LinkNo id={guia.id}>{guia.titulo}</LinkNo>.
            </p>
          </section>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <Image src={`/cartas/${c.id}.webp`} alt={`Carta Duvide: “${c.frase}” ${v.rotulo}. ${c.resumo}`} width={1080} height={1350} sizes="(min-width: 1024px) 420px, 100vw" className="h-auto w-full rounded-[var(--radius-card)] border border-line" priority />
          <p className="text-sm font-semibold">Mande para quem precisa ver:</p>
          <Compartilhar url={`/duvide/${c.id}/`} texto={`${c.pergunta} ${v.rotulo}.`} imagem={`/cartas/${c.id}.jpg`} nome={`primeira-chave-${c.id}`} />
        </aside>

        {outras.length > 0 && (
          <section className="flex flex-col gap-4 lg:col-span-2">
            <h2 className="font-display text-[clamp(26px,3.4vw,34px)] font-light">Duvide também</h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {outras.map((o) => (
                <li key={o.id}>
                  <CartaMini carta={o} />
                </li>
              ))}
            </ul>
            <Link href="/duvide/" className="font-semibold underline underline-offset-4">
              Ver todas as cartas
            </Link>
          </section>
        )}
      </article>
    </>
  );
}
