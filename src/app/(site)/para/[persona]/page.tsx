import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvatarPersona } from "@/components/personas/Avatar";
import { faqJsonLd, Perguntas, Secao } from "@/components/conteudo/pecas";
import { CartaMini } from "@/components/duvide/Grade";
import { CARTAS } from "@/lib/conteudo/duvide";
import { PERSONAS, personaPorId } from "@/lib/conteudo/personas";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

type Props = { params: Promise<{ persona: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return PERSONAS.map((p) => ({ persona: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = personaPorId((await params).persona);
  if (!p) return {};
  return metadadosPagina({ titulo: p.tituloSeo, descricao: p.descricao, slug: `/para/${p.id}/` });
}

export default async function PersonaPage({ params }: Props) {
  const p = personaPorId((await params).persona);
  if (!p) notFound();
  const cartas = p.cartas.map((id) => CARTAS.find((c) => c.id === id)!);
  const outras = PERSONAS.filter((x) => x.id !== p.id);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: p.titulo, description: p.descricao, url: `${SITE.url}/para/${p.id}/`, inLanguage: "pt-BR", publisher: { "@id": `${SITE.url}/#org` } },
      faqJsonLd(p.faq),
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
            <Link href="/para/" className="underline-offset-4 hover:underline">Quem é quem</Link> <span aria-hidden>/</span>
          </li>
          <li aria-current="page">{p.nome}</li>
        </ol>
      </nav>
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 pb-10 pt-8 sm:px-6">
        <header className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>{p.quem}</Eyebrow>
            <h1 className="font-display text-[clamp(34px,5.4vw,56px)] font-light leading-[1.04]">{p.titulo}</h1>
            <p className="max-w-xl text-lg text-ink-2">
              <b className="text-ink">{p.papel}</b> {p.promessa}
            </p>
          </div>
          <AvatarPersona id={p.id} className="w-40 justify-self-center md:w-56" />
        </header>

        <div className="grid gap-10 lg:grid-cols-2">
          <Secao titulo="O que trava hoje">
            <ul className="flex flex-col gap-3">
              {p.trava.map((t) => (
                <li key={t} className="grid grid-cols-[28px_1fr] gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-bad-soft text-bad">
                    <X aria-hidden className="size-4" strokeWidth={2.5} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Secao>
          <Secao titulo="No dia a dia">
            <ol className="flex flex-col gap-3">
              {p.passos.map((s, i) => (
                <li key={s.titulo} className="grid grid-cols-[32px_1fr] gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-mark font-display font-semibold text-ink">{i + 1}</span>
                  <span>
                    <b className="block text-ink">{s.titulo}</b>
                    {s.texto}
                  </span>
                </li>
              ))}
            </ol>
          </Secao>
        </div>

        <Secao titulo="O que a Primeira Chave entrega para você">
          <ul className="grid gap-4 sm:grid-cols-2">
            {p.ajuda.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className="group flex h-full flex-col gap-1 rounded-[var(--radius-card)] border border-line bg-surface p-5 hover:border-ink">
                  <b className="flex items-center gap-2 font-display text-xl text-ink">
                    {a.titulo} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </b>
                  <span>{a.texto}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Secao>

        <Secao titulo="Cartas para mandar ao cliente">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cartas.map((c) => (
              <li key={c.id}>
                <CartaMini carta={c} />
              </li>
            ))}
          </ul>
          <p>
            Todas as cartas e os posts prontos estão em <Link href="/duvide/corretor/" className="font-semibold text-ink underline underline-offset-4">posts para corretor</Link>.
          </p>
        </Secao>

        <div className="flex flex-col items-start gap-4 rounded-[var(--radius-card)] bg-mark p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <b className="font-display text-2xl leading-tight">Quer trabalhar junto?</b>
            <span>Estamos montando a rede de parceiros da Primeira Chave. Fale com a gente.</span>
          </div>
          <Button asChild>
            <a href={SITE.instagram} rel="noopener">
              Falar pelo Instagram
            </a>
          </Button>
        </div>

        <div className="max-w-3xl">
          <Perguntas faq={p.faq} />
        </div>

        <nav aria-label="Outros profissionais" className="flex flex-col gap-3">
          <Eyebrow>Outros profissionais</Eyebrow>
          <ul className="flex flex-wrap gap-2">
            {outras.map((o) => (
              <li key={o.id}>
                <Link href={`/para/${o.id}/`} className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold hover:border-ink">
                  {o.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
