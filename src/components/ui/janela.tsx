"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "./utils";

/**
 * Janela modal da marca: no celular sobe de baixo como uma folha; do sm em diante, um cartão
 * no meio da tela. Para o que a PESSOA abriu (ex.: "Sugerir uma ideia"); convite que aparece
 * sozinho não usa esta (ver ConviteRecado, que não bloqueia a página).
 *
 * Acessível: role="dialog" + aria-modal, foco vai para dentro e fica preso, Esc e o fundo
 * fecham, o foco volta para quem abriu, a página atrás não rola. Portal no <body> para
 * não ficar presa num pai com transform ou backdrop-filter.
 */
export function Janela({ aberta, aoFechar, titulo, children, className }: { aberta: boolean; aoFechar: () => void; titulo: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fechar = useRef(aoFechar);
  useEffect(() => {
    fechar.current = aoFechar;
  });

  useEffect(() => {
    if (!aberta) return;
    const antes = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Foco no primeiro campo (ou no fechar, se não houver).
    const el = ref.current;
    (el?.querySelector<HTMLElement>("textarea, input:not([type=hidden]), select") ?? el?.querySelector<HTMLElement>("button"))?.focus();

    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        fechar.current();
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const focaveis = [...el.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea, input:not([type=hidden]):not([tabindex='-1']), select")].filter((x) => x.offsetParent !== null);
      if (!focaveis.length) return;
      const [primeiro, ultimo] = [focaveis[0], focaveis[focaveis.length - 1]];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = overflow;
      antes?.focus();
    };
  }, [aberta]);

  if (!aberta) return null;
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden onClick={() => fechar.current()} className="absolute inset-0 bg-ink/40 momento-entra" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className={cn(
          "relative max-h-[90vh] w-full overflow-y-auto rounded-t-[20px] bg-surface px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_40px_-24px_rgb(18_20_24/0.45)] momento-sobe sm:max-w-md sm:rounded-[var(--radius-card)] sm:border-[1.5px] sm:border-ink sm:p-6",
          className,
        )}
      >
        <div aria-hidden className="mx-auto mb-3 h-1 w-10 rounded-full bg-line sm:hidden" />
        <button
          type="button"
          onClick={() => fechar.current()}
          aria-label="Fechar"
          className="absolute right-2 top-2 inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
        >
          <X aria-hidden strokeWidth={1.75} className="size-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
