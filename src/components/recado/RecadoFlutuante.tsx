"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { JoaoCarteiro } from "@/components/brand/JoaoCarteiro";
import { EVENTO, marcarFechou, podeConvidar } from "@/lib/recado/convite";
import { ESPERA_MINIMA, QUIS, leuOBastante } from "@/lib/recado/cartao";

/**
 * O cartão flutuante do Recado: um aviso que leva ao formulário do rodapé (não tem formulário próprio).
 * - aparece depois de 8 s e de 40% da página lida; some quando o rodapé entra na tela e volta se a pessoa subir;
 * - desktop: cartão no canto de baixo; celular: faixa de uma linha encostada embaixo (o "Simular" fica no topo);
 * - × ou Esc fecham por 14 dias (a mesma marca do ConviteRecado: fechar um silencia os dois);
 * - "Quero receber" desce até o rodapé, põe o foco na fase e não volta nesta visita.
 * Nunca junto com o convite do fim de um cálculo, nem para quem já se inscreveu.
 */
export function RecadoFlutuante() {
  const caminho = usePathname();
  const [liberado, setLiberado] = useState(false);
  const [noRodape, setNoRodape] = useState(false);
  const [fora, setFora] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const veioDe = useRef<HTMLElement | null>(null);

  // Libera uma vez: passou o tempo mínimo E leu o bastante.
  useEffect(() => {
    if (liberado || fora) return;
    let tempo = false;
    const checar = () => {
      if (!tempo || !leuOBastante(scrollY, document.documentElement.scrollHeight, innerHeight)) return;
      let quis = false;
      try {
        quis = !!sessionStorage.getItem(QUIS);
      } catch {
        /* sem armazenamento: segue */
      }
      if (podeConvidar() && !quis) setLiberado(true);
    };
    const t = window.setTimeout(() => {
      tempo = true;
      checar();
    }, ESPERA_MINIMA);
    addEventListener("scroll", checar, { passive: true });
    return () => {
      window.clearTimeout(t);
      removeEventListener("scroll", checar);
    };
  }, [liberado, fora]);

  // Perto do rodapé o formulário de verdade já está à vista: o cartão sai da frente.
  useEffect(() => {
    const rodape = document.querySelector("footer");
    if (!rodape) return;
    const obs = new IntersectionObserver(([e]) => setNoRodape(e.isIntersecting));
    obs.observe(rodape);
    return () => obs.disconnect();
  }, []);

  // O convite do fim de um cálculo tem prioridade: se ele vier, o cartão sai de vez.
  useEffect(() => {
    const ao = () => setFora(true);
    addEventListener(EVENTO, ao);
    return () => removeEventListener(EVENTO, ao);
  }, []);

  const visivel = liberado && !fora && !noRodape && !caminho?.startsWith("/recado");

  const sair = () => {
    // Se o foco estava no cartão, devolve para onde a pessoa estava (sem pular a página).
    if (ref.current?.contains(document.activeElement)) veioDe.current?.focus({ preventScroll: true });
    setFora(true);
  };

  const fechar = () => {
    marcarFechou();
    sair();
  };

  // Esc fecha, de qualquer lugar da página, desde que nenhuma janela modal esteja aberta.
  useEffect(() => {
    if (!visivel) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || document.querySelector("[aria-modal='true']")) return;
      fechar();
    };
    addEventListener("keydown", tecla);
    return () => removeEventListener("keydown", tecla);
  });

  const quero = () => {
    try {
      sessionStorage.setItem(QUIS, "1");
    } catch {
      /* sem armazenamento: segue */
    }
    const form = document.querySelector<HTMLFormElement>("footer form:has(input[type=email])");
    setFora(true);
    if (!form) return;
    const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
    form.scrollIntoView({ behavior: calmo ? "auto" : "smooth", block: "center" });
    (form.querySelector<HTMLElement>("select, input[type=email]"))?.focus({ preventScroll: true });
  };

  if (!visivel) return null;
  return (
    <aside
      ref={ref}
      aria-label="Recado do João"
      onFocusCapture={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) veioDe.current = e.relatedTarget as HTMLElement | null;
      }}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t-[1.5px] border-ink bg-surface py-1.5 pl-4 pr-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_-14px_30px_-22px_rgb(18_20_24/0.45)] momento-sobe sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[360px] sm:items-start sm:gap-4 sm:rounded-[var(--radius-card)] sm:border-[1.5px] sm:p-5 sm:pr-12"
    >
      <JoaoCarteiro className="h-8 w-auto shrink-0 sm:mt-1 sm:h-12" />
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
        <p className="hidden font-mono text-xs uppercase tracking-[0.07em] text-muted sm:block">Recado do João · grátis</p>
        <p className="min-w-0 flex-1 text-sm leading-tight sm:flex-none sm:font-display sm:text-lg sm:font-semibold">
          <span className="flex flex-col sm:hidden">
            <b>Recado do João</b>
            <span className="text-ink-2">um e&#8209;mail por semana</span>
          </span>
          <span className="hidden sm:inline">O caminho da sua primeira chave, no seu e-mail</span>
        </p>
        <p className="hidden text-sm text-ink-2 sm:block">Um número, uma armadilha e um atalho por semana, para a fase em que você está.</p>
        <button
          type="button"
          onClick={quero}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 font-semibold underline-offset-4 hover:underline sm:mt-1 sm:min-h-0 sm:py-1"
        >
          <span className="sm:hidden">Quero</span>
          <span className="hidden sm:inline">Quero receber</span>
          <ArrowRight aria-hidden strokeWidth={1.75} className="size-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={fechar}
        aria-label="Fechar o aviso do Recado"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink sm:absolute sm:right-2 sm:top-2"
      >
        <X aria-hidden strokeWidth={1.75} className="size-5" />
      </button>
    </aside>
  );
}
