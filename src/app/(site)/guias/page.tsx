import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EmBreve, Eyebrow } from "@/components/ui/badge";
import { ARVORE, ETAPAS, type No } from "@/lib/conteudo/arvore";
import { no } from "@/lib/conteudo/links";

const n = no("guias");

export const metadata: Metadata = {
  title: "Guias do financiamento do primeiro imóvel",
  description: "Todos os guias da Primeira Chave, na ordem da compra: quanto posso, preparar, aprovar o crédito, escolher o imóvel, avaliação, contrato e chaves.",
  alternates: { canonical: n.slug },
};

const GUIAS: No["tipo"][] = ["guia", "atalho", "ferramenta", "nucleo", "local", "programatica"];

function Item({ g }: { g: No }) {
  const pub = g.status === "publicado";
  return (
    <li className="border-t border-line">
      {pub ? (
        <Link href={g.slug} className="flex flex-col gap-0.5 py-3 no-underline hover:underline">
          <b>{g.titulo}</b>
          <span className="text-sm text-ink-2">{g.resumo}</span>
        </Link>
      ) : (
        <div className="flex flex-col gap-0.5 py-3 text-ink-2">
          <span className="flex flex-wrap items-center gap-2">
            {g.titulo} <EmBreve />
          </span>
        </div>
      )}
    </li>
  );
}

export default function GuiasPage() {
  return (
    <>
      <Breadcrumbs id="guias" />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-4">
          <Eyebrow>Guias</Eyebrow>
          <h1 className="font-display text-[clamp(38px,5.6vw,60px)] font-light leading-none">
            Tudo sobre o primeiro imóvel, <span className="marca-texto font-semibold">na ordem da compra.</span>
          </h1>
          <p className="max-w-2xl text-lg text-ink-2">Cada guia responde uma pergunta, com números conferidos no simulador da Caixa, e te leva ao próximo passo.</p>
        </header>
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {ETAPAS.map((e, i) => {
            const itens = ARVORE.filter((x) => x.etapa === e.id && GUIAS.includes(x.tipo)).sort(
              (a, b) => Number(b.status === "publicado") - Number(a.status === "publicado") || a.prioridade - b.prioridade,
            );
            if (!itens.length) return null;
            return (
              <section key={e.id} className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.07em] text-muted">
                  {String(i + 1).padStart(2, "0")} · {e.nome}
                </span>
                <h2 className="font-display text-2xl font-semibold">{e.pergunta}</h2>
                <ul>
                  {itens.map((g) => (
                    <Item key={g.id} g={g} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
