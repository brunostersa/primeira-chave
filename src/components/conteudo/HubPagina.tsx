import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Ilustracao } from "@/components/brand/ilustracoes";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { ETAPAS } from "@/lib/conteudo/arvore";
import { CartaoPagina } from "./pecas";
import { doHub, ferramenta, no } from "@/lib/conteudo/links";
import { Rico } from "./Rico";

/**
 * Molde de hub: abertura, ferramenta do assunto e as páginas do hub agrupadas
 * pela etapa da jornada. `extra` entra antes da lista (ex.: tabela de faixas).
 */
export function HubPagina({ id, intro, extra }: { id: string; intro: string; extra?: ReactNode }) {
  const n = no(id);
  const paginas = doHub(n.hub!).filter((x) => x.tipo !== "glossario" && x.id !== n.id);
  const tool = ferramenta(n);
  const grupos = [...ETAPAS.map((e) => ({ chave: e.id, nome: e.nome, itens: paginas.filter((p) => p.etapa === e.id) })), { chave: "outros", nome: "Mais", itens: paginas.filter((p) => !p.etapa) }].filter(
    (g) => g.itens.length,
  );

  return (
    <>
      <Breadcrumbs id={id} />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-10 pt-8 sm:px-6">
        <header className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>{n.titulo}</Eyebrow>
            <h1 className="font-display text-[clamp(36px,5.6vw,60px)] font-light leading-[1.02]">{n.resumo}</h1>
            <p className="text-lg text-ink-2">
              <Rico texto={intro} />
            </p>
            <Button asChild variant="mark" className="self-start">
              <Link href={tool.slug}>{tool.id === "simulador" ? "Simular agora" : tool.titulo}</Link>
            </Button>
          </div>
          {n.ilustracao && <Ilustracao nome={n.ilustracao} className="max-w-md justify-self-center" />}
        </header>
        {extra}
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
      </div>
    </>
  );
}
