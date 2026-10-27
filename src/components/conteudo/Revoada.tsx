"use client";

import { useEffect, useRef } from "react";

/**
 * A revoada do organismo: joões-de-barro saem do ninho no centro (o simulador),
 * voam em arco até uma página, bicam o barro, voltam e constroem o ninho. Com o
 * ninho pronto, a chave aparece, eles comemoram e a obra recomeça.
 *
 * Passar o mouse numa página chama o próximo João livre até ela. O motor roda em
 * requestAnimationFrame mexendo direto no SVG (sem re-render do React), pausa fora
 * da tela e com a aba escondida, e fica parado (ninho pronto) para quem pede menos
 * movimento.
 */

export type Alvo = { id: string; x: number; y: number; r: number };

type P = { x: number; y: number };

const C = 500;
const ESCALA = 1.2;
const ENTREGAS = 9;
const BANDO = 3;
/** Pés de cada João no ninho (borda da cúpula). */
const POLEIROS: P[] = [
  { x: C - 26, y: C - 20 },
  { x: C, y: C - 28 },
  { x: C + 26, y: C - 20 },
];
/** De onde o barro cai no ninho. */
const BOCA: P = { x: C, y: C - 6 };

/* ---------------------------------------------------------------- desenho */

/** Asas por quadro, presas no ombro (≈ 2, -3) com o corpo centrado em (0, 0). */
const ASAS: Record<Quadro, string> = {
  cima: "M3 -4 C0 -15 -8 -24 -19 -27 C-14 -18 -10 -9 -5 -1 Z",
  meio: "M3 -3 C-5 -9 -15 -11 -26 -9 C-18 -4 -10 0 -4 1 Z",
  baixo: "M3 -2 C-2 5 -8 13 -16 19 C-15 11 -10 4 -6 0 Z",
  plana: "M3 -3 C-6 -7 -18 -8 -30 -5 C-20 -1 -11 1 -4 1 Z",
  dobrada: "M-9 -1 C-3 -5 6 -3 9 2 C3 5 -4 4 -9 -1 Z",
};
type Quadro = "cima" | "meio" | "baixo" | "plana" | "dobrada";
const QUADROS = Object.keys(ASAS) as Quadro[];
const BATIDA: Quadro[] = ["cima", "meio", "baixo", "meio"];

/** O João em silhueta, desenhado para ficar legível com 20px. Origem nos pés. */
function Ave({ i }: { i: number }) {
  const p = POLEIROS[i];
  return (
    <g data-ave transform={`translate(${p.x} ${p.y}) scale(${i === 0 ? -ESCALA : ESCALA} ${ESCALA})`}>
      <g data-corpo>
        <g transform="translate(0 -15)">
          <path d="M-14 2 L-27 -4 L-24 3 L-28 9 L-13 7 Z" fill="var(--ink)" />
          <path d="M-16 4 C-12 -6 0 -9 9 -6 C14 -4 16 0 14 5 C10 11 -6 12 -16 4 Z" fill="var(--ink)" />
          <circle cx="11" cy="-8" r="6.6" fill="var(--ink)" />
          <path d="M16.5 -10 L25 -7.6 L16.5 -5 Z" fill="var(--ink)" />
          <path d="M15 -3.5 C14 1 10 4 5 4.5" fill="none" stroke="var(--surface)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="13" cy="-9.2" r="1.9" fill="var(--surface)" />
          {QUADROS.map((q) => (
            <path key={q} data-q={q} d={ASAS[q]} fill="var(--ink)" stroke="var(--surface)" strokeWidth="1.3" strokeLinejoin="round" display={q === "dobrada" ? undefined : "none"} />
          ))}
          <circle data-barro cx="26" cy="-7.4" r="3.9" fill="var(--mark)" stroke="var(--ink)" strokeWidth="1.6" display="none" />
        </g>
        <path data-pernas d="M-2 -5 L-3 0 M3 -5 L4 0 M-6 0 H0 M1 0 H7" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Cúpula do ninho (quadro 96×70 do NinhoForma), com a obra cortada por um retângulo. */
function Obra() {
  return (
    <g data-ninho transform={`translate(${C - 48} ${C - 36})`} stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <clipPath id="revoada-obra">
          <rect data-corte x="-4" y="60" width="104" height="80" />
        </clipPath>
      </defs>
      <path d="M6 66 Q6 8 48 8 Q90 8 90 66" fill="var(--surface)" fillOpacity="0.7" strokeDasharray="3 5" stroke="var(--muted)" strokeWidth="1.6" />
      <g clipPath="url(#revoada-obra)">
        <path d="M6 66 Q6 8 48 8 Q90 8 90 66 Z" fill="var(--planta)" />
        <path d="M14 32 Q30 22 50 21 M9 48 Q44 39 88 43 M12 58 Q48 52 89 56" fill="none" strokeWidth="1.5" />
        <path d="M38 66 Q38 42 50 42 Q62 42 62 66 Z" fill="var(--ink)" />
      </g>
      <path d="M2 66 H94" />
    </g>
  );
}

function Chave() {
  return (
    <g data-chave transform={`translate(${C} ${C - 104}) scale(0)`} stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle data-brilho r="20" fill="var(--mark)" stroke="none" opacity="0.35" />
      <circle cy="-6" r="8.5" fill="var(--mark)" />
      <circle cy="-6" r="2.8" fill="var(--surface)" />
      <path d="M0 2.5 V20 M0 13 H6 M0 18 H5" fill="none" />
    </g>
  );
}

/* ---------------------------------------------------------------- motor */

type Fase = "ninho" | "ida" | "bico" | "volta" | "entrega";

type Joao = {
  el: SVGGElement;
  asas: Map<Quadro, SVGElement>;
  barro: SVGElement;
  pernas: SVGElement;
  flash: SVGCircleElement;
  gota: SVGCircleElement;
  poleiro: P;
  fase: Fase;
  t: number;
  dur: number;
  de: P;
  para: P;
  alvo?: Alvo;
  virado: boolean;
  quadro?: Quadro;
};

const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const limita = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Arco de voo: sobe e desce, como passarinho de verdade (nunca em linha reta). */
function arco(a: P, b: P) {
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  const h = Math.min(150, d * 0.42) + 24;
  return [a, { x: lerp(a.x, b.x, 0.2), y: lerp(a.y, b.y, 0.2) - h }, { x: lerp(a.x, b.x, 0.78), y: lerp(a.y, b.y, 0.78) - h * 0.75 }, b];
}
function ponto([p0, p1, p2, p3]: P[], u: number): P {
  const v = 1 - u;
  return {
    x: v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x,
    y: v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y,
  };
}
const pousoEm = (a: Alvo): P => ({ x: a.x, y: a.y - a.r + 1 });

export function Revoada({ alvos, rota }: { alvos: Alvo[]; rota: string[] }) {
  const raiz = useRef<SVGGElement>(null);

  useEffect(() => {
    const g = raiz.current;
    const svg = g?.ownerSVGElement;
    if (!g || !svg) return;
    const porId = new Map(alvos.map((a) => [a.id, a]));
    const corte = g.querySelector<SVGRectElement>("[data-corte]")!;
    const chave = g.querySelector<SVGGElement>("[data-chave]")!;
    const brilho = g.querySelector<SVGCircleElement>("[data-brilho]")!;
    const anel = g.querySelector<SVGCircleElement>("[data-anel]")!;

    const joaos: Joao[] = [...g.querySelectorAll<SVGGElement>("[data-ave]")].map((el, i) => ({
      el,
      asas: new Map(QUADROS.map((q) => [q, el.querySelector<SVGElement>(`[data-q="${q}"]`)!])),
      barro: el.querySelector<SVGElement>("[data-barro]")!,
      pernas: el.querySelector<SVGElement>("[data-pernas]")!,
      flash: g.querySelectorAll<SVGCircleElement>("[data-flash]")[i],
      gota: g.querySelectorAll<SVGCircleElement>("[data-gota]")[i],
      poleiro: POLEIROS[i],
      fase: "ninho",
      t: 0,
      dur: 0.5 + i * 0.9,
      de: POLEIROS[i],
      para: POLEIROS[i],
      virado: i === 0,
    }));

    let obra = 0; // entregas feitas
    let obraVista = 0; // altura desenhada (persegue `obra`)
    let festa = -1; // segundos desde que o ninho ficou pronto (-1 = em obra)
    let relogio = 0;
    let fila = 0;
    let chamado: string | null = null;

    const mostra = (el: SVGElement, sim: boolean) => (sim ? el.removeAttribute("display") : el.setAttribute("display", "none"));
    const desenhaObra = () => corte.setAttribute("y", (66 - 60 * (obraVista / ENTREGAS)).toFixed(2));

    const proximoAlvo = (): Alvo => {
      if (chamado && porId.has(chamado)) {
        const a = porId.get(chamado)!;
        chamado = null;
        return a;
      }
      const ocupados = new Set(joaos.map((j) => j.alvo?.id));
      for (let k = 0; k < rota.length; k++) {
        const id = rota[(fila + k) % rota.length];
        if (!ocupados.has(id)) {
          fila = (fila + k + 1) % rota.length;
          return porId.get(id)!;
        }
      }
      return porId.get(rota[0])!;
    };

    const parte = (j: Joao) => {
      const a = proximoAlvo();
      j.alvo = a;
      j.fase = "ida";
      j.de = j.poleiro;
      j.para = pousoEm(a);
      j.t = 0;
      j.dur = 1 + Math.hypot(j.para.x - j.de.x, j.para.y - j.de.y) / 330;
      if (a.id === anel.dataset.id) anel.setAttribute("opacity", "0");
    };

    const desenha = (j: Joao, x: number, y: number, giro: number, piv: number, achata = 1) => {
      const sx = (j.virado ? -1 : 1) * ESCALA;
      j.el.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${sx} ${(ESCALA * achata).toFixed(3)}) rotate(${giro.toFixed(1)} 0 ${piv})`);
    };
    const asa = (j: Joao, q: Quadro) => {
      if (j.quadro === q) return;
      if (j.quadro) mostra(j.asas.get(j.quadro)!, false);
      mostra(j.asas.get(q)!, true);
      j.quadro = q;
      mostra(j.pernas, q === "dobrada");
    };

    const voa = (j: Joao, dt: number) => {
      j.t = Math.min(1, j.t + dt / j.dur);
      const curva = arco(j.de, j.para);
      const u = suave(j.t);
      const p = ponto(curva, u);
      const q = ponto(curva, Math.min(1, u + 0.02));
      const vx = q.x - p.x;
      const vy = q.y - p.y;
      if (Math.abs(vx) > 0.4) j.virado = vx < 0;
      let giro = limita((Math.atan2(vy, Math.abs(vx) + 0.001) * 180) / Math.PI, -32, 32);
      let quadro: Quadro;
      if (j.t < 0.14) quadro = BATIDA[Math.floor(relogio / 0.07) % 4];
      else if (j.t > 0.84) {
        quadro = BATIDA[Math.floor(relogio / 0.06) % 4];
        giro = -22; // freia de peito aberto antes de pousar
      } else if (vy > 0 && j.t > 0.42) quadro = "plana";
      else quadro = BATIDA[Math.floor(relogio / 0.1) % 4];
      asa(j, quadro);
      desenha(j, p.x, p.y, giro, -15);
      return j.t >= 1;
    };

    const passo = (dt: number) => {
      relogio += dt;
      for (const j of joaos) {
        j.t += j.fase === "ida" || j.fase === "volta" ? 0 : dt;
        switch (j.fase) {
          case "ninho": {
            asa(j, "dobrada");
            const pula = festa >= 0 ? Math.abs(Math.sin(relogio * 7 + j.poleiro.x)) * 7 : 0;
            desenha(j, j.poleiro.x, j.poleiro.y - pula, 0, 0);
            if (festa < 0 && j.t >= j.dur) parte(j);
            break;
          }
          case "ida":
          case "volta":
            if (voa(j, dt)) {
              j.t = 0;
              if (j.fase === "ida") {
                j.fase = "bico";
                j.dur = 1.15;
              } else {
                j.fase = "entrega";
                j.dur = 0.75;
              }
            }
            break;
          case "bico": {
            asa(j, "dobrada");
            const a = j.alvo!;
            j.virado = a.x > C; // olha de volta pro centro enquanto bica
            const bica = (s: number) => (j.t > s && j.t < s + 0.22 ? Math.sin(((j.t - s) / 0.22) * Math.PI) * 34 : 0);
            const achata = j.t < 0.18 ? 1 - 0.16 * Math.sin((j.t / 0.18) * Math.PI) : 1;
            desenha(j, j.para.x, j.para.y, bica(0.28) + bica(0.62), 0, achata);
            const f = limita((j.t - 0.3) / 0.6, 0, 1);
            j.flash.setAttribute("cx", String(a.x));
            j.flash.setAttribute("cy", String(a.y));
            j.flash.setAttribute("r", (a.r + 4 + f * 16).toFixed(1));
            j.flash.setAttribute("opacity", (f > 0 && f < 1 ? 0.75 * (1 - f) : 0).toFixed(2));
            mostra(j.barro, j.t > 0.72);
            if (j.t >= j.dur) {
              j.fase = "volta";
              j.de = j.para;
              j.para = j.poleiro;
              j.t = 0;
              j.dur = 1 + Math.hypot(j.para.x - j.de.x, j.para.y - j.de.y) / 330;
            }
            break;
          }
          case "entrega": {
            asa(j, "dobrada");
            const achata = j.t < 0.18 ? 1 - 0.16 * Math.sin((j.t / 0.18) * Math.PI) : 1;
            desenha(j, j.poleiro.x, j.poleiro.y, j.t > 0.12 && j.t < 0.34 ? 30 : 0, 0, achata);
            // A gota de barro cai do bico para dentro do ninho.
            const f = limita((j.t - 0.18) / 0.3, 0, 1);
            if (j.t > 0.18) mostra(j.barro, false);
            const bico = { x: j.poleiro.x + (j.virado ? -1 : 1) * 26 * ESCALA, y: j.poleiro.y - 22 * ESCALA };
            j.gota.setAttribute("cx", lerp(bico.x, BOCA.x, f).toFixed(1));
            j.gota.setAttribute("cy", lerp(bico.y, BOCA.y, f * f).toFixed(1));
            j.gota.setAttribute("opacity", f > 0 && f < 1 ? "1" : "0");
            if (j.t >= 0.48 && j.alvo) {
              j.alvo = undefined;
              if (festa < 0) obra = Math.min(ENTREGAS, obra + 1);
            }
            if (j.t >= j.dur) {
              j.fase = "ninho";
              j.t = 0;
              j.dur = 0.3 + Math.random() * 1.1;
            }
            break;
          }
        }
      }

      // O ninho cresce suave atrás das entregas; pronto, vem a chave e a festa.
      obraVista += (obra - obraVista) * Math.min(1, dt * 5);
      desenhaObra();
      if (festa < 0 && obra >= ENTREGAS && obraVista > ENTREGAS - 0.05) festa = 0;
      if (festa >= 0) {
        festa += dt;
        const s = festa < 0.35 ? 1.25 * Math.sin((festa / 0.35) * (Math.PI / 2)) : festa < 0.6 ? lerp(1.25, 1, (festa - 0.35) / 0.25) : 1;
        const sai = festa > 3.4 ? limita(1 - (festa - 3.4) / 0.4, 0, 1) : 1;
        chave.setAttribute("transform", `translate(${C} ${C - 104 - Math.sin(festa * 3) * 3}) scale(${(s * sai).toFixed(3)})`);
        brilho.setAttribute("r", (20 + 10 * Math.abs(Math.sin(festa * 4))).toFixed(1));
        if (festa > 3.8) {
          festa = -1;
          obra = 0; // a obra recomeça (o ninho desce suave)
          for (const j of joaos) if (j.fase === "ninho") j.dur = j.t + 0.4 + Math.random() * 0.8;
        }
      }
      // Anel de "chamado" pulsando na página que a pessoa apontou.
      if (anel.getAttribute("opacity") !== "0") anel.setAttribute("stroke-width", (2 + Math.abs(Math.sin(relogio * 6)) * 2.5).toFixed(2));
    };

    // Passar o mouse numa página chama um João livre até ela.
    const aoApontar = (e: PointerEvent) => {
      const id = (e.target as Element).closest<SVGGElement>("[data-no]")?.dataset.no;
      const a = id ? porId.get(id) : undefined;
      if (!a || joaos.some((j) => j.alvo?.id === a.id)) return;
      chamado = a.id;
      anel.dataset.id = a.id;
      anel.setAttribute("cx", String(a.x));
      anel.setAttribute("cy", String(a.y));
      anel.setAttribute("r", String(a.r + 7));
      anel.setAttribute("opacity", "1");
      const livre = joaos.find((j) => j.fase === "ninho");
      if (livre && festa < 0) parte(livre);
    };

    // Menos movimento: o ninho fica pronto, com a chave, e os joões pousados.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      corte.setAttribute("y", "6");
      chave.setAttribute("transform", `translate(${C} ${C - 104}) scale(1)`);
      return;
    }

    let quadroId = 0;
    let antes = 0;
    let visivel = false;
    const laco = (agora: number) => {
      const dt = Math.min(0.05, (agora - antes) / 1000);
      antes = agora;
      passo(dt);
      quadroId = requestAnimationFrame(laco);
    };
    const liga = () => {
      cancelAnimationFrame(quadroId);
      if (visivel && !document.hidden) {
        antes = performance.now();
        quadroId = requestAnimationFrame(laco);
      }
    };
    const olho = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      liga();
    });
    olho.observe(svg);
    document.addEventListener("visibilitychange", liga);
    svg.addEventListener("pointerover", aoApontar);
    return () => {
      cancelAnimationFrame(quadroId);
      olho.disconnect();
      document.removeEventListener("visibilitychange", liga);
      svg.removeEventListener("pointerover", aoApontar);
    };
  }, [alvos, rota]);

  return (
    <g ref={raiz} aria-hidden>
      <circle data-anel r="0" fill="none" stroke="var(--mark)" opacity="0" />
      {Array.from({ length: BANDO }, (_, i) => (
        <circle key={`f${i}`} data-flash r="0" fill="var(--mark)" opacity="0" />
      ))}
      <Obra />
      <Chave />
      {Array.from({ length: BANDO }, (_, i) => (
        <circle key={`g${i}`} data-gota r="3.6" fill="var(--mark)" stroke="var(--ink)" strokeWidth="1.4" opacity="0" />
      ))}
      {Array.from({ length: BANDO }, (_, i) => (
        <Ave key={i} i={i} />
      ))}
    </g>
  );
}
