import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { EmBreve } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import type { No } from "@/lib/conteudo/arvore";
import { no } from "@/lib/conteudo/links";

/** Peças pequenas que todos os moldes de página (Guia, HubPagina, TermoPagina) usam. */

/** Link para outra página da árvore: vira texto quando ela ainda não está no ar. */
export function LinkNo({ id, children, className }: { id: string; children?: ReactNode; className?: string }) {
  const n = no(id);
  const texto = children ?? n.titulo;
  if (n.status !== "publicado") return <span className={className}>{texto}</span>;
  return (
    <Link href={n.slug} className={cn("font-semibold underline decoration-planta-deep underline-offset-4 hover:decoration-ink", className)}>
      {texto}
    </Link>
  );
}

/** Termo do glossário: sublinhado pontilhado com a definição de uma frase ao passar o mouse. */
export function Termo({ id, children }: { id: string; children: ReactNode }) {
  const n = no(`g-${id}`);
  const classe = "underline decoration-dotted decoration-muted underline-offset-4";
  return n.status === "publicado" ? (
    <Link href={n.slug} title={n.resumo} className={classe}>
      {children}
    </Link>
  ) : (
    <abbr title={n.resumo} className={cn(classe, "no-underline [text-decoration-line:underline]")}>
      {children}
    </abbr>
  );
}

/** Âncora estável de uma seção a partir do título ("O que olhar" → "o-que-olhar"). */
export const slugSecao = (titulo: string) =>
  titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function Secao({ titulo, children, id }: { titulo: string; children: ReactNode; id?: string }) {
  return (
    <section id={id ?? slugSecao(titulo)} className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="font-display text-[clamp(26px,3.4vw,34px)] font-light leading-tight">{titulo}</h2>
      <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-2 [&_b]:font-semibold [&_b]:text-ink [&_strong]:text-ink">{children}</div>
    </section>
  );
}

export function Aviso({ titulo, children, tom = "planta" }: { titulo: string; children: ReactNode; tom?: "planta" | "mark" | "bad" }) {
  return (
    <Card variant={tom} className="flex flex-col gap-1.5 text-[16px]">
      <b className="font-display text-lg">{titulo}</b>
      <div className="[&_b]:font-semibold">{children}</div>
    </Card>
  );
}

/** Cartão de uma página dentro de uma lista (hub, glossário, guias). */
export function CartaoPagina({ n, rotulo }: { n: No; rotulo?: string }) {
  const pub = n.status === "publicado";
  const corpo = (
    <>
      {rotulo && <span className="font-mono text-xs uppercase tracking-[0.07em] text-muted">{rotulo}</span>}
      <b className="font-display text-lg leading-snug">{n.titulo}</b>
      <span className="text-sm text-ink-2">{n.resumo}</span>
      {!pub && <EmBreve className="mt-1 self-start" />}
    </>
  );
  return pub ? (
    <Link href={n.slug} className="flex h-full flex-col gap-1 rounded-[var(--radius-card)] border border-line bg-surface p-4 no-underline hover:border-ink">
      {corpo}
    </Link>
  ) : (
    <div className="flex h-full flex-col gap-1 rounded-[var(--radius-card)] border border-dashed border-line p-4">{corpo}</div>
  );
}


export type Pergunta = { q: string; a: string };

/** "Perguntas que todo mundo faz": FAQ em sanfona, a mesma em todo molde. */
export function Perguntas({ faq }: { faq: Pergunta[] }) {
  return (
    <section id="perguntas" className="flex scroll-mt-24 flex-col gap-3">
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
  );
}

/** O FAQ em dados estruturados (schema.org FAQPage). */
export const faqJsonLd = (faq: Pergunta[]) => ({
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
