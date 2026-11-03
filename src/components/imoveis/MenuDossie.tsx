"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/components/ui/utils";

export type ItemMenu = { id: string; rotulo: string };

/**
 * Menu do dossiê do imóvel: coluna fixa no desktop largo, faixa rolável no resto.
 * Marca a seção que está na tela (IntersectionObserver), sem depender de rolagem manual.
 */
export function MenuDossie({ itens, className }: { itens: ItemMenu[]; className?: string }) {
  const [ativo, setAtivo] = useState(itens[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of itens) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [itens]);

  // Na faixa rolável, o item ativo sempre fica à vista.
  const faixa = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const ol = faixa.current;
    const a = ol?.querySelector<HTMLElement>(`a[href="#${ativo}"]`);
    if (ol && a && ol.scrollWidth > ol.clientWidth) ol.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
  }, [ativo]);

  return (
    <nav aria-label="Nesta página" className={className}>
      <ol ref={faixa} className="relative flex gap-1 overflow-x-auto [scrollbar-width:none] xl:flex-col xl:gap-0 xl:overflow-visible [&::-webkit-scrollbar]:hidden">
        {itens.map((it, k) => (
          <li key={it.id} className="shrink-0">
            <a
              href={`#${it.id}`}
              aria-current={ativo === it.id ? "true" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors xl:rounded-none xl:border-l-2 xl:px-4 xl:py-2.5",
                ativo === it.id ? "bg-ink text-paper xl:border-ink xl:bg-transparent xl:font-semibold xl:text-ink" : "text-ink-2 hover:text-ink xl:border-line",
              )}
            >
              <span className="hidden font-mono text-xs text-muted xl:inline">{String(k + 1).padStart(2, "0")}</span>
              {it.rotulo}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
