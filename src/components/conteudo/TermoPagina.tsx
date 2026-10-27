import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/badge";
import { ARVORE } from "@/lib/conteudo/arvore";
import { no, usamTermo } from "@/lib/conteudo/links";
import { GLOSSARIO_TEXTOS } from "@/lib/conteudo/textos/glossario";
import { CartaoPagina } from "./pecas";
import { Rico } from "./Rico";

/** Molde de um termo do glossário: definição, explicação, exemplo, cuidado e as páginas que o usam. */
export function TermoPagina({ id }: { id: string }) {
  const n = no(id);
  const termo = id.replace(/^g-/, "");
  const t = GLOSSARIO_TEXTOS[termo];
  const usam = usamTermo(termo).filter((x) => x.tipo !== "glossario");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: n.titulo,
    description: n.resumo,
    inDefinedTermSet: { "@type": "DefinedTermSet", name: "Glossário do financiamento — Primeira Chave" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs id={id} />
      <article className="mx-auto flex max-w-3xl flex-col gap-8 px-4 pb-10 pt-8 sm:px-6">
        <header className="flex flex-col gap-4">
          <Eyebrow>Glossário</Eyebrow>
          <h1 className="font-display text-[clamp(36px,5.6vw,56px)] font-light leading-none">{n.titulo}</h1>
          <p className="text-xl">
            <span className="marca-texto">{n.resumo}</span>
          </p>
        </header>
        <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-2">
          {t.explicacao.map((p, i) => (
            <p key={i}>
              <Rico texto={p} />
            </p>
          ))}
        </div>
        {t.exemplo && (
          <Card variant="planta" className="text-[16px]">
            <b className="font-display text-lg">Exemplo</b>
            <p className="mt-1">
              <Rico texto={t.exemplo} />
            </p>
          </Card>
        )}
        {t.cuidado && (
          <Card variant="strong" className="text-[16px]">
            <Rico texto={t.cuidado} />
          </Card>
        )}
        {usam.length > 0 && (
          <section className="flex flex-col gap-3">
            <Eyebrow>Onde esse termo aparece</Eyebrow>
            <div className="grid gap-3 sm:grid-cols-2">
              {usam.map((u) => (
                <CartaoPagina key={u.id} n={u} />
              ))}
            </div>
          </section>
        )}
        <Button asChild variant="link" className="self-start">
          <Link href="/glossario/">Ver todos os termos</Link>
        </Button>
      </article>
    </>
  );
}

/** Índice do glossário. */
export function GlossarioIndice() {
  const termos = ARVORE.filter((n) => n.tipo === "glossario").sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));
  return (
    <>
      <Breadcrumbs id="glossario" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-10 pt-8 sm:px-6">
        <header className="flex flex-col gap-4">
          <Eyebrow>Glossário</Eyebrow>
          <h1 className="font-display text-[clamp(36px,5.6vw,60px)] font-light leading-none">
            Cada termo de banco, <span className="marca-texto font-semibold">em uma frase.</span>
          </h1>
          <p className="max-w-2xl text-lg text-ink-2">A mesma explicação, sempre, a um clique de qualquer página que use o termo.</p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {termos.map((t) => (
            <CartaoPagina key={t.id} n={t} />
          ))}
        </div>
      </div>
    </>
  );
}
