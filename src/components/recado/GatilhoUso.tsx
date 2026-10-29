"use client";

import { useRef, type ReactNode } from "react";
import { convidar, type Convite } from "@/lib/recado/convite";

/**
 * Envolve uma ferramenta e chama o convite do Recado quando a pessoa termina de usá-la:
 * - `modo="conta"` (calculadoras, mapas): mexeu em 2 campos ou mais e parou;
 * - `modo="baixou"` (modelos): clicou em um link de download.
 * Não muda nada na ferramenta: só escuta os eventos que sobem dela.
 */
export function GatilhoUso({ children, modo = "conta", ...convite }: Convite & { children: ReactNode; modo?: "conta" | "baixou" }) {
  const usos = useRef(0);
  const parou = useRef<number | undefined>(undefined);

  const mexeu = () => {
    usos.current += 1;
    window.clearTimeout(parou.current);
    if (usos.current >= 2) parou.current = window.setTimeout(() => convidar({ espera: 0, ...convite }), 5000);
  };

  return (
    <div
      onChangeCapture={modo === "conta" ? mexeu : undefined}
      onInputCapture={modo === "conta" ? mexeu : undefined}
      onClickCapture={(e) => {
        const alvo = e.target as HTMLElement;
        if (modo === "baixou" && alvo.closest("a[download]")) convidar({ espera: 1500, ...convite });
        if (modo === "conta" && alvo.closest("button, [role=button], path, a")) mexeu();
      }}
    >
      {children}
    </div>
  );
}
