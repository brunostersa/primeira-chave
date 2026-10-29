"use client";

import { useEffect, useRef } from "react";
import { convidar, TITULOS, type Convite } from "@/lib/recado/convite";

/**
 * Marcador invisível no fim de um resultado: quando ele entra na tela (a pessoa rolou até
 * o fim da resposta), chama o convite do Recado. Uma vez só por montagem.
 */
export function ConvidarAoVer({ tipo, ...convite }: Convite & { tipo: keyof typeof TITULOS }) {
  const ref = useRef<HTMLSpanElement>(null);
  const dados = useRef(convite);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      convidar({ titulo: TITULOS[tipo], espera: 2500, ...dados.current });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [tipo]);

  return <span ref={ref} aria-hidden className="block h-px" />;
}
