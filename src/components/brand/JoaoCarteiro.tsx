"use client";

import { useEffect, useRef } from "react";
import { ASAS, BATIDA, CorpoSilhueta, QUADROS, type Quadro } from "@/components/conteudo/Revoada";

/**
 * O João carteiro: a silhueta animada do João voando parada no lugar, com uma carta no
 * bico (azul planta, a cor dos papéis). Bate as asas, plana um instante, sobe e desce de
 * leve, com risquinhos de vento atrás da cauda. Para o Recado do João.
 *
 * Um requestAnimationFrame mexe direto no SVG, só com ele na tela e a aba à vista. Para
 * quem pede menos movimento, fica parado de asa aberta.
 */

const CICLO = 2.6; // s: bate as asas e depois plana
const BATENDO = 1.8; // s do ciclo batendo as asas
const VENTO = [-3, 3, 8];

export function JoaoCarteiro({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const corpo = svg.querySelector<SVGGElement>("[data-corpo]")!;
    const asas = new Map(QUADROS.map((q) => [q, svg.querySelector<SVGElement>(`[data-q="${q}"]`)!]));
    const ventos = [...svg.querySelectorAll<SVGElement>("[data-vento]")];
    let atual: Quadro = "meio";
    const asa = (q: Quadro) => {
      if (q === atual) return;
      asas.get(atual)!.setAttribute("display", "none");
      asas.get(q)!.removeAttribute("display");
      atual = q;
    };

    let quadro = 0;
    let t0 = performance.now();
    let visivel = false;
    const laco = (agora: number) => {
      const seg = Math.max(0, agora - t0) / 1000;
      const noCiclo = seg % CICLO;
      const planando = noCiclo > BATENDO;
      asa(planando ? "plana" : BATIDA[Math.floor(noCiclo / 0.09) % BATIDA.length]);
      // Batendo, sobe um tico a cada batida; planando, desce devagar.
      const y = planando ? ((noCiclo - BATENDO) / (CICLO - BATENDO)) * 3 - 1.5 : -1.5 + Math.sin(seg * 2 * Math.PI * 2.8) * 1.2;
      const giro = planando ? 4 : -3 + Math.sin(seg * 2 * Math.PI * 1.4) * 2;
      corpo.setAttribute("transform", `translate(0 ${y.toFixed(2)}) rotate(${giro.toFixed(1)} 0 -15)`);
      ventos.forEach((v, i) => {
        const k = (seg * 1.6 + i / ventos.length) % 1;
        v.setAttribute("transform", `translate(${(-27 - k * 16).toFixed(1)} ${VENTO[i]})`);
        v.setAttribute("opacity", (Math.sin(k * Math.PI) * (planando ? 0.25 : 0.4)).toFixed(2));
      });
      quadro = requestAnimationFrame(laco);
    };
    const liga = () => {
      cancelAnimationFrame(quadro);
      if (visivel && !document.hidden) {
        t0 = performance.now();
        quadro = requestAnimationFrame(laco);
      }
    };
    const olho = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      liga();
    });
    olho.observe(svg);
    document.addEventListener("visibilitychange", liga);
    return () => {
      cancelAnimationFrame(quadro);
      olho.disconnect();
      document.removeEventListener("visibilitychange", liga);
    };
  }, []);

  return (
    <svg ref={ref} viewBox="-54 -45 94 52" overflow="visible" aria-hidden="true" className={className}>
      <g data-corpo>
        <g transform="translate(0 -15)">
          {VENTO.map((y) => (
            <path key={y} data-vento d="M0 0 H-9" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" opacity="0" />
          ))}
          <CorpoSilhueta />
          {/* A carta, presa pela ponta no bico. */}
          <g transform="translate(21 -8.5) rotate(16)" stroke="var(--ink)" strokeLinejoin="round">
            <rect width="15" height="10" rx="1.2" fill="var(--planta)" strokeWidth="1.4" />
            <path d="M0.9 1.1 L7.5 6 L14.1 1.1" fill="none" strokeWidth="1.2" />
          </g>
          {QUADROS.map((q) => (
            <path key={q} data-q={q} d={ASAS[q]} fill="var(--ink)" stroke="var(--surface)" strokeWidth="1.3" strokeLinejoin="round" display={q === "meio" ? undefined : "none"} />
          ))}
        </g>
      </g>
    </svg>
  );
}
