"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/components/ui/utils";
import { PUBLICOS, VEREDITOS, type Carta, type Publico } from "@/lib/conteudo/duvide";
import { CARIMBO } from "./carimbo";

/** A carta na grade: a frase entre aspas, o carimbo e o resumo. Leva à página da carta. */
export function CartaMini({ carta }: { carta: Carta }) {
  return (
    <Link
      href={`/duvide/${carta.id}/`}
      className="group flex h-full flex-col gap-4 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5 shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
    >
      <span className={cn("-rotate-2 self-start rounded-md border-2 border-ink px-2.5 py-0.5 font-display text-sm font-semibold uppercase", CARIMBO[carta.veredito])}>
        {VEREDITOS[carta.veredito].rotulo}
      </span>
      <p className="font-display text-[22px] font-light leading-snug">“{carta.frase}”</p>
      <p className="mt-auto text-[15px] text-ink-2">{carta.resumo}</p>
      <span className="font-semibold underline underline-offset-4 group-hover:decoration-2">Entender e compartilhar</span>
    </Link>
  );
}

const FILTROS: (Publico | "todos")[] = ["todos", "comprador", "vendedor", "corretor"];

/** Todas as cartas, com filtro por quem você é. */
export function Grade({ cartas }: { cartas: Carta[] }) {
  const [filtro, setFiltro] = useState<Publico | "todos">("todos");
  const visiveis = filtro === "todos" ? cartas : cartas.filter((c) => c.publico.includes(filtro));
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por quem você é">
        {FILTROS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filtro === f}
            onClick={() => setFiltro(f)}
            className={cn("min-h-11 rounded-full border-[1.5px] border-ink px-4 text-[15px] font-semibold", filtro === f ? "bg-ink text-paper" : "bg-surface hover:bg-ink/5")}
          >
            {f === "todos" ? `Todas (${cartas.length})` : PUBLICOS[f]}
          </button>
        ))}
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((c) => (
          <li key={c.id}>
            <CartaMini carta={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
