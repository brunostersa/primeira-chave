"use client";

import { useEffect, useRef } from "react";
import { AveSilhueta, batida, bica, controlaAve, decola, limita, pousado, sorteio, tela, voo } from "@/components/brand/AveSilhueta";
import { arco, escolhePoleiro, fracaoDoPoleiro, type P } from "@/lib/poleiro";

/**
 * De vez em quando um João-de-barro passa voando pela tela. É o mesmo João da revoada
 * do topo da home: silhueta batendo as asas, com planadas curtas na descida da onda e
 * risquinhos de vento atrás da cauda.
 *
 * Se houver um poleiro à vista (qualquer elemento com `data-poleiro`: a laje das casas,
 * um cartão de destaque, a etiqueta de preço, o botão Simular), ele chega em arco, freia,
 * pousa na borda de cima levantando uma poeirinha, olha em volta, dá umas bicadas e volta
 * a voar, seguindo para o lado de onde ia. Rolar a página para longe ou chegar perto dele
 * com o mouse o espanta antes. Sem poleiro à vista, só atravessa.
 *
 * Só identidade: não bloqueia clique, some para leitores de tela e não aparece para quem
 * pede menos movimento. Um requestAnimationFrame mexe direto no DOM (sem re-render do
 * React) e só roda enquanto ele está na tela.
 */

const PRIMEIRA = [6, 14]; // s até a primeira passagem
const ENTRE = [35, 80]; // s entre uma passagem e outra
const TRAVESSIA = [5.5, 8]; // s para cruzar a tela
const ONDAS = 3; // sobe e desce quantas vezes na travessia
const ALTURA_ONDA = 16; // px
const CHANCE_POUSO = 0.7; // das passagens com poleiro à vista
const CHEGADA = [2.2, 3]; // s do voo até o poleiro
const POUSADO = [4, 8]; // s parado no poleiro
const PARTIDA = [1.6, 2.2]; // s do poleiro até sair da tela
const SUSTO = 110; // px: mouse mais perto que isso espanta
const ROLADA = 60; // px: rolar mais que isso com ele pousado espanta

type Fase = "chega" | "pousado" | "parte";

export function PassaroDePassagem() {
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = caixa.current;
    if (!el) return;
    const ave = controlaAve(el);

    let espera: ReturnType<typeof setTimeout>;
    let quadro = 0;
    let solta = () => {}; // tira os ouvintes de susto do pouso em curso

    const agendar = (faixa: number[]) => {
      espera = setTimeout(passar, sorteio(faixa) * 1000);
    };
    const some = () => {
      ave.mostra(false);
      agendar(ENTRE);
    };

    const atravessa = () => {
      const daDireita = Math.random() < 0.5;
      ave.vira(daDireita);
      const w = innerWidth;
      const y = innerHeight * sorteio([0.12, 0.55]);
      const ini = daDireita ? w + 80 : -80;
      const fim = daDireita ? -80 : w + 80;
      const dur = sorteio(TRAVESSIA);
      const t0 = performance.now();
      ave.mostra(true);

      const laco = (agora: number) => {
        // O 1º quadro pode vir com horário anterior ao t0: o tempo nunca anda para trás.
        const seg = Math.max(0, agora - t0) / 1000;
        const p = seg / dur;
        if (p >= 1) return some();
        const fase = p * Math.PI * 2 * ONDAS;
        const descendo = Math.cos(fase) > 0.35; // na descida da onda ele plana
        ave.desenha(ini + (fim - ini) * p, y + Math.sin(fase) * ALTURA_ONDA, Math.cos(fase) * 8);
        ave.venta(seg);
        ave.asa(descendo ? "plana" : batida(seg, 0.08));
        quadro = requestAnimationFrame(laco);
      };
      quadro = requestAnimationFrame(laco);
    };

    const pousa = (poleiro: Element, alvo: P) => {
      // Os pés ficam presos ao poleiro, que anda se a página rolar.
      const dx = alvo.x - poleiro.getBoundingClientRect().left;
      const pes = (): P | null => {
        if (!poleiro.isConnected) return null;
        const r = poleiro.getBoundingClientRect();
        return { x: r.left + dx, y: r.top };
      };
      const daDireita = alvo.x > innerWidth / 2 ? Math.random() < 0.75 : Math.random() < 0.25;
      const de: P = { x: daDireita ? innerWidth + 80 : -80, y: limita(alvo.y - sorteio([120, 260]), 30, innerHeight * 0.5) };
      let fase: Fase = "chega";
      let t = 0;
      let dur = sorteio(CHEGADA);
      let relogio = 0;
      let antes = performance.now();
      let saida: P[] = [];
      let bicadas: number[] = [];
      let olhada = 0;
      let ultimo: P = de;
      let pouso: P = alvo;
      ave.vira(daDireita);
      ave.mostra(true);

      const espanta = (longeDe?: number) => {
        if (fase !== "pousado") return;
        // Foge para o lado oposto ao mouse; sem mouse, segue para onde ia.
        const praEsquerda = longeDe !== undefined ? longeDe > ultimo.x : daDireita;
        ave.vira(praEsquerda);
        const fim: P = { x: praEsquerda ? -80 : innerWidth + 80, y: Math.max(-60, ultimo.y - sorteio([120, 260])) };
        saida = arco(ultimo, fim, sorteio([30, 70]));
        fase = "parte";
        ave.gira(0); // em voo a cabeça fica firme
        ave.poeira(1);
        t = 0;
        dur = sorteio(PARTIDA);
        desliga();
      };
      // Rolada curta ele aguenta (os pés seguem o poleiro); longa, ou o poleiro indo
      // para baixo do cabeçalho, espanta.
      const aoRolar = () => {
        const p = pes();
        if (!p || Math.abs(p.y - pouso.y) > ROLADA || p.y < tela().topo + 10) espanta();
      };
      const aoRedimensionar = () => espanta();
      const aoMexer = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && Math.hypot(e.clientX - ultimo.x, e.clientY - ultimo.y) < SUSTO) espanta(e.clientX);
      };
      const liga = () => {
        addEventListener("scroll", aoRolar, { passive: true });
        addEventListener("resize", aoRedimensionar);
        addEventListener("pointermove", aoMexer, { passive: true });
      };
      const desliga = () => {
        removeEventListener("scroll", aoRolar);
        removeEventListener("resize", aoRedimensionar);
        removeEventListener("pointermove", aoMexer);
      };
      solta = desliga;

      const laco = (agora: number) => {
        const dt = limita((agora - antes) / 1000, 0, 0.05); // o 1º quadro pode vir "antes" do início
        antes = agora;
        relogio += dt;
        t = Math.min(1, t + dt / dur);

        if (fase === "chega") {
          const para = pes();
          if (!para) return some();
          const p = voo(ave, arco(de, para, Math.min(140, Math.abs(para.x - de.x) * 0.3) + 20), t, relogio);
          ultimo = p;
          if (t >= 1) {
            fase = "pousado";
            t = 0;
            dur = sorteio(POUSADO);
            bicadas = [sorteio([0.2, 0.35]), sorteio([0.55, 0.75])];
            olhada = sorteio([0.4, 0.5]);
            pouso = p;
            liga();
          }
        } else if (fase === "pousado") {
          const p = pes();
          if (!p) {
            desliga();
            return some();
          }
          const s = t * dur; // segundos desde o pouso
          if (t > olhada && t - dt / dur <= olhada) {
            ave.vira(!ave.virado); // olha para o outro lado
            ave.olhaLogo();
          }
          const bicada = bica(s, bicadas[0] * dur) + bica(s, bicadas[1] * dur);
          pousado(ave, p, s, dt, bicada);
          ultimo = p;
          if (t >= 1) espanta();
        } else {
          if (decola(ave, saida, t, relogio)) return some();
        }
        quadro = requestAnimationFrame(laco);
      };
      quadro = requestAnimationFrame(laco);
    };

    const passar = () => {
      if (document.hidden) return agendar(ENTRE);
      const poleiros = [...document.querySelectorAll<HTMLElement | SVGElement>("[data-poleiro]")];
      const escolha =
        Math.random() < CHANCE_POUSO
          ? escolhePoleiro(
              poleiros.map((p) => ({ caixa: p.getBoundingClientRect(), fracao: fracaoDoPoleiro(p.dataset.poleiro) })),
              tela(),
            )
          : null;
      if (escolha) pousa(poleiros[escolha.i], escolha.ponto);
      else atravessa();
    };

    agendar(PRIMEIRA);
    return () => {
      clearTimeout(espera);
      cancelAnimationFrame(quadro);
      solta();
    };
  }, []);

  return <AveSilhueta ref={caixa} />;
}
