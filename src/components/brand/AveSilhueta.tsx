import type { Ref } from "react";
import { ASAS, BATIDA, CorpoSilhueta, PESCOCO, QUADROS, type Quadro } from "@/components/conteudo/Revoada";
import { lerp, ponto, suave, type P } from "@/lib/poleiro";

/**
 * O João em silhueta que voa solto pela página (PassaroDePassagem, RevoadaSurpresa):
 * o desenho e os controles que mexem direto no DOM, sem re-render do React.
 *
 * A origem da caixa é o pé do pássaro. Em voo: asas batendo e risquinhos de vento
 * atrás da cauda. Pousado: asa dobrada, pernas, poeirinha no toque e a cabeça girando
 * no pescoço em trancos curtos (em voo ela fica firme, como passarinho de verdade).
 */

/** Graus da cabeça pousado: negativo olha para cima, positivo para baixo. */
const OLHARES = [-22, -10, 0, 0, 8, 16];
const PAUSA_OLHAR = [0.35, 1.2]; // s parado em cada olhar
/** Risquinhos de vento atrás da cauda (y no corpo do pássaro). */
const VENTO = [-3, 3, 8];
/** Grãos da poeira do pouso: para onde cada um espirra (x) e quanto sobe (y), em unidades do desenho. */
const POEIRA = [
  { x: -20, y: -4 },
  { x: -11, y: -9 },
  { x: -3, y: -12 },
  { x: 10, y: -9 },
  { x: 19, y: -4 },
];
const POEIRA_DUR = 0.5; // s

export const sorteio = ([a, b]: number[]) => a + Math.random() * (b - a);
export const limita = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
/** Quadro da batida de asa após `seg` segundos, trocando a cada `passo` s (tempo negativo conta como 0). */
export const batida = (seg: number, passo: number) => BATIDA[Math.floor(Math.max(0, seg) / passo) % BATIDA.length];

/** `solta`: marca a ave de um bando (`data-ave-solta`), para o motor achar todas. */
export function AveSilhueta({ ref, className = "w-8 sm:w-9", solta }: { ref?: Ref<HTMLDivElement>; className?: string; solta?: boolean }) {
  return (
    <div ref={ref} data-ave-solta={solta ? "" : undefined} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40 opacity-0" style={{ willChange: "transform" }}>
      {/* O SVG recua 34/64 da largura e 46/52 da altura para o pé cair na origem da caixa. */}
      <svg viewBox="-34 -46 64 52" overflow="visible" className={`absolute h-auto ${className}`} style={{ transform: "translate(-53.125%, -88.46%)" }}>
        <g data-espelho>
          {POEIRA.map((_, i) => (
            <circle key={i} data-poeira r="0" fill="var(--ink)" opacity="0" />
          ))}
          <g transform="translate(0 -15)">
            {VENTO.map((y) => (
              <path key={y} data-vento d="M0 0 H-9" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" opacity="0" />
            ))}
            <CorpoSilhueta />
            {QUADROS.map((q) => (
              <path key={q} data-q={q} d={ASAS[q]} fill="var(--ink)" stroke="var(--surface)" strokeWidth="1.3" strokeLinejoin="round" display={q === "meio" ? undefined : "none"} />
            ))}
          </g>
          <path data-pernas d="M-2 -5 L-3 0 M3 -5 L4 0 M-6 0 H0 M1 0 H7" fill="none" stroke="var(--ink)" strokeWidth="1.7" strokeLinecap="round" display="none" />
        </g>
      </svg>
    </div>
  );
}

export type Ave = ReturnType<typeof controlaAve>;

/** Os controles de uma AveSilhueta já montada. */
export function controlaAve(el: HTMLElement) {
  const g = el.querySelector<SVGGElement>("[data-espelho]")!;
  const asas = new Map(QUADROS.map((q) => [q, g.querySelector<SVGElement>(`[data-q="${q}"]`)!]));
  const pernas = g.querySelector<SVGElement>("[data-pernas]")!;
  const cabeca = g.querySelector<SVGGElement>("[data-cabeca]")!;
  const ventos = [...g.querySelectorAll<SVGElement>("[data-vento]")];
  const graos = [...g.querySelectorAll<SVGCircleElement>("[data-poeira]")];

  let atual: Quadro = "meio";
  let virado = false;
  let olhar = 0;
  let olharAlvo = 0;
  let proximoOlhar = sorteio(PAUSA_OLHAR);
  let ventando = false;
  let poeirando = false;

  const ave = {
    get virado() {
      return virado;
    },
    asa(q: Quadro) {
      if (q === atual) return;
      asas.get(atual)!.setAttribute("display", "none");
      asas.get(q)!.removeAttribute("display");
      if (q === "dobrada") pernas.removeAttribute("display");
      else if (atual === "dobrada") pernas.setAttribute("display", "none");
      atual = q;
    },
    vira(v: boolean) {
      if (v !== virado) g.setAttribute("transform", v ? "scale(-1 1)" : "");
      virado = v;
    },
    /** Pés em (x, y) na tela. `giro` no referencial do pássaro: positivo = bico para baixo. */
    desenha(x: number, y: number, giro = 0, achata = 1) {
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${(virado ? -giro : giro).toFixed(1)}deg) scale(1, ${achata.toFixed(3)})`;
    },
    mostra(sim: boolean) {
      el.style.opacity = sim ? "1" : "0";
      if (!sim) {
        ave.gira(0);
        ave.venta(0, 0);
        ave.poeira(1);
      }
    },
    gira(graus: number) {
      if (Math.abs(graus - olhar) < 0.05 && graus !== 0) return;
      olhar = graus;
      cabeca.setAttribute("transform", graus ? `rotate(${graus.toFixed(1)} ${PESCOCO.x} ${PESCOCO.y})` : "");
    },
    /** Cabeça inquieta, pousado: para num olhar e dá um tranco rápido até o próximo. Na bicada, acompanha o corpo. */
    olha(dt: number, bicando = false) {
      proximoOlhar -= dt;
      if (proximoOlhar <= 0) {
        const outros = OLHARES.filter((a) => a !== olharAlvo);
        olharAlvo = outros[Math.floor(Math.random() * outros.length)];
        proximoOlhar = sorteio(PAUSA_OLHAR);
      }
      ave.gira(olhar + ((bicando ? 0 : olharAlvo) - olhar) * Math.min(1, dt * 24));
    },
    /** Apressa o próximo olhar (ex.: logo depois de virar o corpo). */
    olhaLogo() {
      proximoOlhar = Math.min(proximoOlhar, 0.15);
    },
    /** Vento em voo: cada risquinho nasce na cauda, corre para trás e some. `forca` 0 esconde. */
    venta(segundos: number, forca = 1) {
      if (forca <= 0) {
        if (ventando) ventos.forEach((v) => v.setAttribute("opacity", "0"));
        ventando = false;
        return;
      }
      ventando = true;
      ventos.forEach((v, i) => {
        const k = (((Math.max(0, segundos) * 1.8 + i / ventos.length) % 1) + 1) % 1;
        v.setAttribute("transform", `translate(${(-27 - k * 16).toFixed(1)} ${VENTO[i]})`);
        v.setAttribute("opacity", (Math.sin(k * Math.PI) * 0.4 * forca).toFixed(2));
      });
    },
    /** Poeirinha do pouso: `k` de 0 (toque) a 1 (assentou). */
    poeira(k: number) {
      if (k >= 1 || k < 0) {
        if (poeirando) graos.forEach((c) => c.setAttribute("opacity", "0"));
        poeirando = false;
        return;
      }
      poeirando = true;
      const sai = 1 - (1 - k) ** 3;
      graos.forEach((c, i) => {
        c.setAttribute("cx", (POEIRA[i].x * sai).toFixed(1));
        c.setAttribute("cy", (POEIRA[i].y * Math.sin(k * Math.PI * 0.85)).toFixed(1));
        c.setAttribute("r", (2.7 - k * 1.4).toFixed(2));
        c.setAttribute("opacity", (0.45 * (1 - k)).toFixed(2));
      });
    },
  };
  return ave;
}

/** Topo útil da tela: onde termina o cabeçalho fixo. */
export const tela = () => ({
  largura: innerWidth,
  altura: innerHeight,
  topo: document.querySelector("header")?.getBoundingClientRect().bottom ?? 0,
});

/* Passos de voo e pouso, para o motor de quem usa a ave (um quadro por chamada). */

const inclinacao = (p: P, q: P) => limita((Math.atan2(q.y - p.y, Math.abs(q.x - p.x) + 0.001) * 180) / Math.PI, -32, 32);

/** Chegada em arco (`t` de 0 a 1): bate as asas, plana na descida e freia de peito aberto. Devolve onde ele está. */
export function voo(ave: Ave, curva: P[], t: number, relogio: number): P {
  const u = suave(t);
  const p = ponto(curva, u);
  const q = ponto(curva, Math.min(1, u + 0.02));
  if (Math.abs(q.x - p.x) > 0.4) ave.vira(q.x < p.x);
  let giro = inclinacao(p, q);
  if (t > 0.84) {
    ave.asa(batida(relogio, 0.06));
    giro = -22; // freia de peito aberto antes de pousar
  } else if (q.y > p.y && t > 0.42) ave.asa("plana");
  else ave.asa(batida(relogio, t < 0.14 ? 0.07 : 0.1));
  ave.desenha(p.x, p.y, giro);
  ave.venta(relogio, t > 0.84 ? (1 - t) / 0.16 : 1); // o vento cai na freada
  return p;
}

/** Bicada que começa em `inicio` s: devolve o giro do corpo agora (`s` s desde o pouso). */
export const bica = (s: number, inicio: number) => {
  const k = s - inicio;
  return k > 0 && k < 0.22 ? Math.sin((k / 0.22) * Math.PI) * 32 : 0;
};

/** Pousado em `p`, `s` s depois do toque: asa dobrada, poeirinha, cabeça inquieta e o giro da bicada. */
export function pousado(ave: Ave, p: P, s: number, dt: number, bicada = 0) {
  ave.asa("dobrada");
  ave.olha(dt, bicada !== 0);
  const achata = s < 0.2 ? 1 - 0.16 * Math.sin((s / 0.2) * Math.PI) : 1;
  ave.desenha(p.x, p.y, bicada, achata);
  ave.venta(0, 0);
  ave.poeira(s / POEIRA_DUR);
}

/** Decolagem pela curva `saida` (`t` de 0 a 1): arranca devagar e acelera. Devolve true quando saiu. */
export function decola(ave: Ave, saida: P[], t: number, relogio: number) {
  const u = t * t * (1.6 - 0.6 * t);
  const p = ponto(saida, Math.min(1, u));
  const q = ponto(saida, Math.min(1, u + 0.02));
  ave.asa(batida(relogio, t < 0.25 ? 0.06 : 0.09));
  ave.desenha(p.x, p.y, lerp(-28, inclinacao(p, q), Math.min(1, t * 4)));
  ave.venta(relogio, Math.min(1, t * 3));
  return t >= 1;
}
