"use client";

import type React from "react";

import { cn } from "@/components/ui/utils";
import { digitos, milhar } from "@/lib/format";

export function CampoDinheiro({
  id,
  rotulo,
  valor,
  onChange,
  onEnter,
  autoFocus,
}: {
  id: string;
  rotulo: string;
  valor: number;
  onChange: (v: number) => void;
  onEnter?: () => void;
  autoFocus?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {rotulo}
      </label>
      <div className="flex max-w-xs items-center rounded-xl border-[1.5px] border-ink bg-surface focus-within:outline focus-within:outline-[2.5px] focus-within:outline-offset-2 focus-within:outline-ink">
        <span className="pl-4 font-mono text-lg text-muted">R$</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          autoFocus={autoFocus}
          value={milhar(valor)}
          onChange={(e) => onChange(digitos(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
          className="w-full bg-transparent px-3 py-3.5 font-display text-2xl outline-none"
        />
      </div>
    </div>
  );
}

export function BotaoOpcao({
  selecionado,
  rotulo,
  sub,
  onClick,
  className,
}: {
  selecionado: boolean;
  rotulo: string;
  sub?: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selecionado}
      onClick={onClick}
      className={cn(
        "flex min-h-14 flex-col items-start justify-center gap-0.5 rounded-xl border-[1.5px] px-4 py-3 text-left transition-colors",
        selecionado ? "border-ink bg-mark" : "border-line bg-surface hover:border-ink",
        className,
      )}
    >
      <span className="text-base font-semibold">{rotulo}</span>
      {sub && <span className="text-sm text-ink-2">{sub}</span>}
    </button>
  );
}

export function Deslizador({
  id,
  rotulo,
  saida,
  min,
  max,
  step,
  valor,
  onChange,
  humor = "gentil",
}: {
  id: string;
  rotulo: string;
  saida: string;
  min: number;
  max: number;
  step: number;
  valor: number;
  onChange: (v: number) => void;
  /** O rosto do João-de-barro no puxador reage ao resultado. */
  humor?: "gentil" | "feliz" | "triste" | "surpreso";
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[15px]">
          {rotulo}
        </label>
        <output htmlFor={id} className="font-display text-xl font-semibold tabular-nums">
          {saida}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="deslizador"
        data-humor={humor}
        style={{ "--pct": `${((valor - min) / (max - min)) * 100}%` } as React.CSSProperties}
      />
    </div>
  );
}
