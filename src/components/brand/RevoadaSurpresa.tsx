"use client";

import { useEffect, useRef, useState } from "react";
import { AveSilhueta, batida, bica, controlaAve, decola, pousado, sorteio, tela, voo, type Ave } from "@/components/brand/AveSilhueta";
import { criaKonami } from "@/lib/konami";
import { arco, lerp, pousosAoLongo, type P } from "@/lib/poleiro";

/**
 * O easter egg do site: a revoada. Cinco cliques rápidos num `data-revoada` (o João e o
 * © do rodapé) ou o código Konami no teclado soltam um bando de joões-de-barro: entram
 * juntos por um lado, pousam lado a lado nos poleiros, cartões e títulos à vista, cada
 * um com sua poeirinha, olham em volta e vão embora juntos pelo outro lado. No fim, um
 * aviso: "Você achou a revoada."
 *
 * Os pássaros só existem no DOM enquanto a revoada dura (uns 8 s). Não bloqueia clique,
 * some para leitores de tela (só o aviso é lido) e, para quem pede menos movimento,
 * aparece só o aviso.
 */

const BANDO = 18;
const BANDO_CELULAR = 10; // até 640 px de largura
const ONDE_POUSA = "[data-poleiro], [data-slot=card], main h1, main h2";
const ESPACO = 44; // px entre um pássaro e outro no mesmo poleiro
const SAIDA = [5.2, 5.9]; // s desde o início: hora de cada um ir embora
const AVISO = [2.6, 7.5]; // s: quando o aviso aparece e some

type Plano = {
  ave: Ave;
  atraso: number;
  de: P;
  /** Poleiro (elemento e deslocamento dos pés), ou nada: só atravessa. */
  pouso?: { el: Element; dx: number };
  chegada: number;
  saida: number;
  partida: number;
  bicada: number;
  olhada: number;
  /** Curva de saída, montada na hora de partir. */
  rota?: P[];
  y: number;
};

const embaralha = <T,>(xs: T[]) => {
  for (let i = xs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [xs[i], xs[j]] = [xs[j], xs[i]];
  }
  return xs;
};

/** Pontos de pouso à vista, lado a lado, sem dois colados (um cartão dentro do outro, por exemplo). */
function pousosAVista(): { el: Element; ponto: P }[] {
  const t = tela();
  const todos = [...document.querySelectorAll(ONDE_POUSA)].flatMap((el) => pousosAoLongo(el.getBoundingClientRect(), t, ESPACO).map((ponto) => ({ el, ponto })));
  const livres: typeof todos = [];
  for (const p of embaralha(todos)) if (livres.every((q) => Math.hypot(q.ponto.x - p.ponto.x, q.ponto.y - p.ponto.y) > 34)) livres.push(p);
  return livres;
}

export function RevoadaSurpresa() {
  const raiz = useRef<HTMLDivElement>(null);
  const [bando, setBando] = useState(0);
  const [aviso, setAviso] = useState(false);
  const rodando = useRef(false);

  // Gatilhos: código Konami e cinco cliques rápidos num [data-revoada].
  useEffect(() => {
    let avisoIda: ReturnType<typeof setTimeout>;
    let avisoVolta: ReturnType<typeof setTimeout>;
    const solta = () => {
      if (rodando.current) return;
      rodando.current = true;
      const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
      avisoIda = setTimeout(() => setAviso(true), quieto ? 0 : AVISO[0] * 1000);
      avisoVolta = setTimeout(
        () => {
          setAviso(false);
          if (quieto) rodando.current = false;
        },
        quieto ? 4000 : AVISO[1] * 1000,
      );
      if (!quieto) setBando(innerWidth < 640 ? BANDO_CELULAR : BANDO);
    };

    const konami = criaKonami();
    const aoTeclar = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement | null;
      if (alvo?.closest("input, textarea, select, [contenteditable]")) return;
      if (konami(e.key)) solta();
    };
    let cliques: number[] = [];
    const aoClicar = (e: MouseEvent) => {
      if (!(e.target as Element | null)?.closest?.("[data-revoada]")) return;
      const agora = performance.now();
      cliques = [...cliques.filter((c) => agora - c < 2500), agora];
      if (cliques.length >= 5) {
        cliques = [];
        solta();
      }
    };
    addEventListener("keydown", aoTeclar);
    document.addEventListener("click", aoClicar);
    return () => {
      removeEventListener("keydown", aoTeclar);
      document.removeEventListener("click", aoClicar);
      clearTimeout(avisoIda);
      clearTimeout(avisoVolta);
    };
  }, []);

  // O motor: um requestAnimationFrame para o bando inteiro, enquanto ele existe.
  useEffect(() => {
    if (!bando || !raiz.current) return;
    const aves = [...raiz.current.querySelectorAll<HTMLDivElement>(":scope > [data-ave-solta]")].map(controlaAve);
    const daDireita = Math.random() < 0.5;
    const lado = (direita: boolean) => (direita ? innerWidth + 60 + Math.random() * 140 : -60 - Math.random() * 140);
    const pousos = pousosAVista();

    const planos: Plano[] = aves.map((ave, i) => {
      const lugar = pousos[i];
      const de = { x: lado(daDireita), y: innerHeight * sorteio([0.05, 0.5]) };
      return {
        ave,
        atraso: i * 0.07 + Math.random() * 0.3,
        de,
        pouso: lugar && { el: lugar.el, dx: lugar.ponto.x - lugar.el.getBoundingClientRect().left },
        chegada: sorteio([1.8, 2.6]),
        saida: sorteio(SAIDA),
        partida: sorteio([1.4, 2]),
        bicada: sorteio([0.6, 2]),
        olhada: Math.random() < 0.5 ? sorteio([0.8, 2]) : -1,
        y: de.y,
      };
    });

    let quadro = 0;
    const t0 = performance.now();
    let antes = t0;
    const laco = (agora: number) => {
      const seg = Math.max(0, agora - t0) / 1000;
      const dt = Math.max(0, Math.min(0.05, (agora - antes) / 1000));
      antes = agora;
      let vivos = 0;
      for (const p of planos) {
        const s = seg - p.atraso;
        if (s < 0) {
          vivos++;
          continue;
        }
        const { ave } = p;
        if (!p.pouso) {
          // Sem lugar para pousar: atravessa em onda junto com o bando.
          const k = s / 4.2;
          if (k >= 1) {
            ave.mostra(false);
            continue;
          }
          vivos++;
          ave.mostra(true);
          ave.vira(daDireita);
          const onda = Math.sin(k * Math.PI * 5);
          ave.desenha(lerp(p.de.x, daDireita ? -80 : innerWidth + 80, k), p.y + onda * 14, Math.cos(k * Math.PI * 5) * 8);
          ave.asa(Math.cos(k * Math.PI * 5) > 0.35 ? "plana" : batida(s, 0.08));
          ave.venta(s);
          continue;
        }
        const r = p.pouso.el.getBoundingClientRect();
        const pes = { x: r.left + p.pouso.dx, y: r.top };
        const saiEm = p.saida - p.atraso; // s desde a largada deste pássaro
        if (s < p.chegada) {
          vivos++;
          ave.mostra(true);
          voo(ave, arco(p.de, pes, Math.min(140, Math.abs(pes.x - p.de.x) * 0.3) + 20), s / p.chegada, s);
        } else if (s < saiEm) {
          vivos++;
          const ps = s - p.chegada;
          if (p.olhada > 0 && ps >= p.olhada && ps - dt < p.olhada) {
            ave.vira(!ave.virado);
            ave.olhaLogo();
          }
          pousado(ave, pes, ps, dt, bica(ps, p.bicada));
        } else {
          if (!p.rota) {
            // Vão embora juntos, para o lado de onde o bando ia.
            ave.vira(daDireita);
            ave.gira(0);
            ave.poeira(1);
            p.rota = arco(pes, { x: lado(!daDireita), y: Math.max(-80, pes.y - sorteio([150, 320])) }, sorteio([30, 80]));
          }
          const k = (s - saiEm) / p.partida;
          if (decola(ave, p.rota, Math.min(1, k), s)) {
            ave.mostra(false);
            continue;
          }
          vivos++;
        }
      }
      if (vivos) quadro = requestAnimationFrame(laco);
      else {
        rodando.current = false;
        setBando(0);
      }
    };
    quadro = requestAnimationFrame(laco);
    return () => {
      cancelAnimationFrame(quadro);
      rodando.current = false;
    };
  }, [bando]);

  return (
    <>
      <div ref={raiz}>
        {Array.from({ length: bando }, (_, i) => (
          <AveSilhueta key={i} solta />
        ))}
      </div>
      <p
        role="status"
        className={`pointer-events-none fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-ink bg-surface px-4 py-2 font-mono text-xs shadow-[3px_3px_0_var(--ink)] transition-all duration-500 ${aviso ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        {aviso && (
          <>
            <i className="size-2.5 rounded-full bg-mark ring-1 ring-ink" aria-hidden />
            Você achou a revoada. Barro por barro.
          </>
        )}
      </p>
    </>
  );
}
