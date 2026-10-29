"use client";

import { useEffect, useRef } from "react";
import { ASAS, BATIDA, CorpoSilhueta, PESCOCO, QUADROS, type Quadro } from "@/components/conteudo/Revoada";
import { arco, ponto, suave, type P } from "@/lib/poleiro";

/**
 * Cinco joões pousados na borda de cima de um cartão (o Recado do rodapé), juntinhos como
 * passarinho em fio. Cada um olha em volta com a cabeça, às vezes vira para o outro lado
 * ou dá uma ajeitada.
 * Chegou perto com o mouse, o bando inteiro levanta voo; uns segundos depois voltam, um a
 * um, e pousam de novo no mesmo lugar.
 *
 * Vai dentro de um pai `relative`. Não bloqueia clique e some para leitores de tela. Um
 * requestAnimationFrame só roda com o cartão na tela; para quem pede menos movimento, ficam
 * parados.
 */

/** Juntinhos, como em fio: px a partir do canto direito (`DIREITA`) e para que lado olha. */
const DIREITA = "10%";
const BANDO = [
  { dx: 142, virado: false },
  { dx: 108, virado: true },
  { dx: 70, virado: false },
  { dx: 36, virado: true },
  { dx: 0, virado: false },
];
const OLHARES = [-22, -10, 0, 0, 8, 16];
const SUSTO = 90; // px: mouse mais perto que isso de um deles espanta o bando
const FUGA = [0.9, 1.3]; // s até sumir
const LONGE = [3.5, 6]; // s longe antes de voltar
const VOLTA = [1.3, 1.7]; // s voltando até pousar

const sorteio = ([a, b]: number[]) => a + Math.random() * (b - a);
const limita = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

type Fase = "pousado" | "foge" | "longe" | "volta";

export function BandoNaBorda() {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const aves = [...el.querySelectorAll<HTMLDivElement>("[data-pouso]")].map((caixa, i) => ({
      caixa,
      espelho: caixa.querySelector<SVGGElement>("[data-espelho]")!,
      corpo: caixa.querySelector<SVGGElement>("[data-corpo]")!,
      cabeca: caixa.querySelector<SVGGElement>("[data-cabeca]")!,
      asas: new Map(QUADROS.map((q) => [q, caixa.querySelector<SVGElement>(`[data-q="${q}"]`)!])),
      pernas: caixa.querySelector<SVGElement>("[data-pernas]")!,
      quadro: "dobrada" as Quadro,
      virado: BANDO[i].virado,
      olhar: 0,
      alvo: 0,
      proximo: sorteio([0.2, 1.4]),
      vira: sorteio([4, 12]),
      ajeita: sorteio([3, 9]),
      fase: "pousado" as Fase,
      t: 0,
      dur: 1,
      rota: [] as P[],
    }));
    type Joao = (typeof aves)[number];
    let relogio = 0;

    const vira = (a: Joao, v: boolean) => {
      if (v !== a.virado) a.espelho.setAttribute("transform", v ? "scale(-1 1)" : "");
      a.virado = v;
    };
    const asa = (a: Joao, q: Quadro) => {
      if (q === a.quadro) return;
      a.asas.get(a.quadro)!.setAttribute("display", "none");
      a.asas.get(q)!.removeAttribute("display");
      if (q === "dobrada") a.pernas.removeAttribute("display");
      else if (a.quadro === "dobrada") a.pernas.setAttribute("display", "none");
      a.quadro = q;
    };
    /** Posição em px relativa ao poleiro; `giro` no referencial do pássaro (positivo = bico para baixo). */
    const move = (a: Joao, p: P, giro: number, opacidade: number) => {
      a.caixa.style.transform = p.x || p.y || giro ? `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) rotate(${(a.virado ? -giro : giro).toFixed(1)}deg)` : "";
      a.caixa.style.opacity = opacidade.toFixed(2);
    };
    const inclinacao = (p: P, q: P) => limita((Math.atan2(q.y - p.y, Math.abs(q.x - p.x) + 0.001) * 180) / Math.PI, -32, 32);

    // O bando inteiro levanta voo, para longe do mouse.
    const espanta = (mouseX: number) => {
      for (const a of aves) {
        const r = a.caixa.getBoundingClientRect();
        const lado = mouseX < r.left ? 1 : -1;
        const longe = { x: lado * sorteio([140, 280]), y: -sorteio([150, 260]) };
        a.rota = arco({ x: 0, y: 0 }, longe, sorteio([10, 40]));
        a.fase = "foge";
        a.t = -sorteio([0, 0.2]); // não saem todos no mesmo instante
        a.dur = sorteio(FUGA);
        a.corpo.removeAttribute("transform"); // sem agachadinho no voo
      }
    };
    const aoMexer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || aves.some((a) => a.fase !== "pousado")) return;
      const perto = aves.some((a) => {
        const r = a.caixa.getBoundingClientRect();
        return Math.hypot(e.clientX - r.left, e.clientY - r.top + 12) < SUSTO;
      });
      if (perto) espanta(e.clientX);
    };

    const voa = (a: Joao, u: number, frear: boolean) => {
      const p = ponto(a.rota, u);
      const q = ponto(a.rota, Math.min(1, u + 0.02));
      if (Math.abs(q.x - p.x) > 0.4) vira(a, q.x < p.x);
      asa(a, frear ? BATIDA[Math.floor(relogio / 0.06) % 4] : BATIDA[Math.floor(relogio / 0.07) % 4]);
      a.cabeca.removeAttribute("transform"); // em voo a cabeça fica firme
      return { p, giro: frear ? -22 : inclinacao(p, q) };
    };

    let quadro = 0;
    let antes = 0;
    let visivel = false;
    const laco = (agora: number) => {
      const dt = limita((agora - antes) / 1000, 0, 0.05);
      antes = agora;
      relogio += dt;
      // Todo mundo longe: depois de um tempo, voltam um a um.
      if (aves.every((a) => a.fase === "longe" && a.t >= a.dur)) {
        aves.forEach((a, i) => {
          a.rota = arco(a.rota[3], { x: 0, y: 0 }, sorteio([20, 50]));
          a.fase = "volta";
          a.t = -i * 0.25 - sorteio([0, 0.2]);
          a.dur = sorteio(VOLTA);
        });
      }

      for (const a of aves) {
        if (a.fase !== "pousado") {
          a.t += dt;
          if (a.t < 0) continue;
          const k = Math.min(1, a.t / a.dur);
          if (a.fase === "foge") {
            const { p, giro } = voa(a, k * k * (1.6 - 0.6 * k), false); // arranca e acelera
            move(a, p, k < 0.15 ? -28 : giro, k < 0.55 ? 1 : 1 - (k - 0.55) / 0.45);
            if (k >= 1) {
              a.fase = "longe";
              a.t = 0;
              a.dur = sorteio(LONGE);
            }
          } else if (a.fase === "volta") {
            const { p, giro } = voa(a, suave(k), k > 0.84);
            move(a, p, giro, Math.min(1, k / 0.3));
            if (k >= 1) {
              a.fase = "pousado";
              asa(a, "dobrada");
              vira(a, BANDO[aves.indexOf(a)].virado);
              a.ajeita = -0.0001; // agachadinho do pouso
              move(a, { x: 0, y: 0 }, 0, 1);
            }
          }
          continue;
        }
        // A cabeça para num olhar e dá um tranco rápido até o próximo.
        a.proximo -= dt;
        if (a.proximo <= 0) {
          const outros = OLHARES.filter((o) => o !== a.alvo);
          a.alvo = outros[Math.floor(Math.random() * outros.length)];
          a.proximo = sorteio([0.4, 1.6]);
        }
        a.olhar += (a.alvo - a.olhar) * Math.min(1, dt * 24);
        a.cabeca.setAttribute("transform", `rotate(${a.olhar.toFixed(1)} ${PESCOCO.x} ${PESCOCO.y})`);
        a.vira -= dt;
        if (a.vira <= 0) {
          vira(a, !a.virado);
          a.vira = sorteio([5, 14]);
        }
        // Ajeitada: um agachadinho.
        a.ajeita -= dt;
        if (a.ajeita <= -0.25) a.ajeita = sorteio([4, 10]);
        const agacha = a.ajeita < 0 ? Math.sin((-a.ajeita / 0.25) * Math.PI) * 0.12 : 0;
        a.corpo.setAttribute("transform", agacha ? `scale(1 ${(1 - agacha).toFixed(3)})` : "");
      }
      quadro = requestAnimationFrame(laco);
    };
    const liga = () => {
      cancelAnimationFrame(quadro);
      removeEventListener("pointermove", aoMexer);
      if (visivel && !document.hidden) {
        antes = performance.now();
        quadro = requestAnimationFrame(laco);
        addEventListener("pointermove", aoMexer, { passive: true });
      }
    };
    const olho = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      liga();
    });
    olho.observe(el.parentElement ?? el);
    document.addEventListener("visibilitychange", liga);
    return () => {
      cancelAnimationFrame(quadro);
      olho.disconnect();
      document.removeEventListener("visibilitychange", liga);
      removeEventListener("pointermove", aoMexer);
    };
  }, []);

  return (
    <div ref={raiz} aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-px">
      {BANDO.map((b, i) => (
        <div key={i} className="absolute top-0" style={{ right: `calc(${DIREITA} + ${b.dx}px)` }}>
          {/* A caixa que voa; a origem é o pé do pássaro. */}
          <div data-pouso className="absolute left-0 top-0" style={{ willChange: "transform" }}>
            {/* O SVG recua 34/64 da largura e 46/52 da altura para o pé cair na origem. */}
            <svg viewBox="-34 -46 64 52" overflow="visible" className="absolute h-auto w-8 sm:w-9" style={{ transform: "translate(-53.125%, -88.46%)" }}>
              <g data-espelho transform={b.virado ? "scale(-1 1)" : undefined}>
                <g data-corpo>
                  <g transform="translate(0 -15)">
                    <CorpoSilhueta />
                    {QUADROS.map((q) => (
                      <path key={q} data-q={q} d={ASAS[q]} fill="var(--ink)" stroke="var(--surface)" strokeWidth="1.3" strokeLinejoin="round" display={q === "dobrada" ? undefined : "none"} />
                    ))}
                  </g>
                  <path data-pernas d="M-2 -5 L-3 0 M3 -5 L4 0 M-6 0 H0 M1 0 H7" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
