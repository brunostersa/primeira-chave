"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { EVENTO, marcarFechou, marcarVisto, podeConvidar, type Convite } from "@/lib/recado/convite";
import { InscricaoRecado } from "./InscricaoRecado";

/**
 * A janela do Recado no fim de um cálculo. Fica UMA no layout e escuta `convidar()`.
 * Não é modal: não escurece a página, não prende o foco e não cobre o resultado no
 * desktop (canto de baixo); no celular sobe como uma folha de baixo, com "Agora não" à mão.
 * Esc fecha. Fechar conta como "não agora" por 14 dias (regras em lib/recado/convite.ts).
 */
export function ConviteRecado() {
  const [convite, setConvite] = useState<Convite | null>(null);
  const [inscrito, setInscrito] = useState(false);
  const espera = useRef<number | undefined>(undefined);

  useEffect(() => {
    const ao = (e: Event) => {
      const c = (e as CustomEvent<Convite>).detail;
      window.clearTimeout(espera.current);
      // Espera a pessoa ler o resultado e parar de digitar antes de aparecer.
      const tentar = () => {
        const digitando = document.activeElement?.matches("input, select, textarea");
        if (digitando) return (espera.current = window.setTimeout(tentar, 2500));
        if (!podeConvidar()) return;
        marcarVisto();
        setConvite(c);
      };
      espera.current = window.setTimeout(tentar, c.espera ?? 3500);
    };
    window.addEventListener(EVENTO, ao);
    return () => {
      window.removeEventListener(EVENTO, ao);
      window.clearTimeout(espera.current);
    };
  }, []);

  const fechar = () => {
    if (!inscrito) marcarFechou();
    setConvite(null);
  };

  if (!convite) return null;
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Receber o Recado do João"
      onKeyDown={(e) => e.key === "Escape" && fechar()}
      className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[20px] border-t-[1.5px] border-ink bg-surface px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-18px_40px_-24px_rgb(18_20_24/0.45)] momento-sobe sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[420px] sm:rounded-[var(--radius-card)] sm:border-[1.5px] sm:p-5"
    >
      <div aria-hidden className="mx-auto mb-3 h-1 w-10 rounded-full bg-line sm:hidden" />
      <button
        type="button"
        onClick={fechar}
        aria-label={inscrito ? "Fechar" : "Agora não"}
        className="absolute right-2 top-3 inline-flex size-11 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink sm:top-2"
      >
        <X aria-hidden strokeWidth={1.75} className="size-5" />
      </button>
      <InscricaoRecado convite origem={convite.origem} titulo={convite.titulo} fase={convite.fase} perfil={convite.perfil} aoInscrever={() => setInscrito(true)} />
      {!inscrito && (
        <button type="button" onClick={fechar} className="mt-1 inline-flex min-h-11 items-center text-sm text-muted underline underline-offset-4">
          Agora não
        </button>
      )}
    </div>
  );
}
