"use client";

import { useEffect, useId, useRef, useState } from "react";

/** O "(?)" ao lado de um número: toque ou clique abre a explicação; Esc ou tocar fora fecha. */
export function Ajuda({ rotulo, lado = "esquerda", children }: { rotulo: string; lado?: "esquerda" | "direita"; children: React.ReactNode }) {
  const [aberta, setAberta] = useState(false);
  const caixa = useRef<HTMLSpanElement>(null);
  const id = useId();

  useEffect(() => {
    if (!aberta) return;
    const fora = (e: PointerEvent) => !caixa.current?.contains(e.target as Node) && setAberta(false);
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAberta(false);
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", tecla);
    };
  }, [aberta]);

  return (
    <span ref={caixa} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setAberta((a) => !a)}
        aria-expanded={aberta}
        aria-controls={id}
        aria-label={rotulo}
        className="flex size-5 items-center justify-center rounded-full border border-current font-sans text-[11px] font-bold normal-case tracking-normal hover:bg-ink hover:text-paper"
      >
        ?
      </button>
      {aberta && (
        <span
          id={id}
          role="note"
          className={`momento-sobe absolute top-7 z-50 w-72 max-w-[calc(100vw-2rem)] rounded-xl border-[1.5px] border-ink bg-surface p-4 font-sans text-sm normal-case leading-relaxed tracking-normal text-ink shadow-[4px_4px_0_var(--ink)] ${lado === "direita" ? "right-0" : "left-0"}`}
        >
          {children}
        </span>
      )}
    </span>
  );
}
