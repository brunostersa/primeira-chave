"use client";

import { useEffect, useState } from "react";
import { NinhoForma, Passaro, type Humor } from "./JoaoDeBarro";

/**
 * O João-de-barro leva moedas até a casinha de barro: o valor soma e a casinha sobe.
 * Um relógio só (requestAnimationFrame) move as moedas e conta, para nunca descasar.
 * Com movimento reduzido, mostra a casinha pronta e o total, parado.
 */

const POR_MOEDA = 500; // R$
const MOEDAS = 12; // por ciclo
const VOO = 1.1; // s de cada moeda no ar
const INTERVALO = 0.7; // s entre uma moeda e outra
const COMEMORA = 0.9; // s comemorando com a chave
const VOO_CASA = 1.3; // s do voo até a porta
const PAUSA = COMEMORA + VOO_CASA + 0.7; // s depois da última moeda, antes de recomeçar
const CICLO = (MOEDAS - 1) * INTERVALO + VOO + PAUSA;

// Do bico do pássaro até a porta da casinha, num arco.
const DE = { x: 90, y: 62 };
const ATE = { x: 172, y: 94 };
const CONTROLE = { x: 130, y: 0 };

const arco = (p: number) => {
  const q = 1 - p;
  return {
    x: q * q * DE.x + 2 * q * p * CONTROLE.x + p * p * ATE.x,
    y: q * q * DE.y + 2 * q * p * CONTROLE.y + p * p * ATE.y,
  };
};

// O voo final: do lugar do pássaro (centro do quadro) até a porta, encolhendo.
const voo = (p: number) => {
  const q = 1 - p;
  const e = p * p * (3 - 2 * p); // começa e chega devagar
  return {
    x: q * q * 51 + 2 * q * p * 112 + p * p * 174,
    y: q * q * 67 + 2 * q * p * -14 + p * p * 92,
    s: 0.95 - 0.7 * e,
  };
};

const reais = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;

export function Poupando({ className }: { className?: string }) {
  const [t, setT] = useState<number | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let quadro = 0;
    const inicio = performance.now();
    const passo = (agora: number) => {
      setT(((agora - inicio) / 1000) % CICLO);
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, []);

  // Sem animação (servidor, primeiro quadro ou movimento reduzido): a casinha pronta.
  const parado = t === null;
  const chegaram = parado ? MOEDAS : Math.min(MOEDAS, Math.max(0, Math.floor((t - VOO) / INTERVALO) + 1));
  const noAr = parado
    ? []
    : Array.from({ length: MOEDAS }, (_, k) => (t - k * INTERVALO) / VOO).filter((p) => p > 0 && p < 1);
  const ultima = parado ? -1 : t - VOO - (chegaram - 1) * INTERVALO; // s desde a última chegada
  const construido = 0.2 + 0.8 * (chegaram / MOEDAS);

  // A cara acompanha a obra: começa pensando, anima com o valor e comemora a casinha pronta.
  const pronta = chegaram === MOEDAS;
  const depois = parado ? 0 : t - VOO - (MOEDAS - 1) * INTERVALO; // s desde a casinha pronta
  const voando = pronta && depois >= COMEMORA;
  const dentro = pronta && depois >= COMEMORA + VOO_CASA;
  const humor: Humor = pronta ? "feliz" : chegaram < 2 ? "pensativo" : chegaram < 5 ? "curioso" : chegaram < 8 ? "gentil" : chegaram < 11 ? "feliz" : "piscando";

  return (
    <svg viewBox="0 0 220 110" className={className} role="img" aria-label={`O João-de-barro leva o dinheiro até a casinha: ${reais(MOEDAS * POR_MOEDA)} guardados`}>
      <path d="M4 104 H216" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      {!voando && <Passaro pose={pronta ? "comemora" : "perfil"} humor={humor} transform="translate(-6 24.2) scale(0.95)" />}
      <NinhoForma construido={construido} transform="translate(124 38)" />

      {voando && !dentro && (() => {
        const { x, y, s } = voo((depois - COMEMORA) / VOO_CASA);
        return <Passaro pose="voando" humor="feliz" transform={`translate(${x - 60 * s} ${y - 45 * s}) scale(${s})`} />;
      })()}

      {noAr.map((p, k) => {
        const { x, y } = arco(p);
        return (
          <g key={k} transform={`translate(${x} ${y}) rotate(${p * 360})`}>
            <circle r="6.5" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.6" />
            <path d="M0 -2.8 V2.8" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
          </g>
        );
      })}

      <text x="172" y="26" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="600" fill="var(--ink)">
        {reais(chegaram * POR_MOEDA)}
      </text>
      {ultima >= 0 && ultima < 0.6 && chegaram > 0 && (
        <text x="204" y={14 - ultima * 10} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)" opacity={1 - ultima / 0.6}>
          +{POR_MOEDA}
        </text>
      )}
    </svg>
  );
}
