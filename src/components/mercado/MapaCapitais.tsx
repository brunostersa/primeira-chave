"use client";

import { useState } from "react";
import { Deslizador } from "@/components/simulador/campos";
import { Eyebrow } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import { brl, pct } from "@/lib/format";
import { capitais, FIPEZAP, imovelQueARendaCompra, MAPA_BRASIL, mesAno, tom } from "@/lib/mercado";

const CAPS = capitais().sort((a, b) => a.m2 - b.m2);
const MIN = CAPS[0].m2;
const MAX = CAPS[CAPS.length - 1].m2;
const porUf = Object.fromEntries(CAPS.map((c) => [c.uf, c]));

/**
 * Mapa de calor das capitais: a cor é o m² de anúncio (FipeZap); a renda escolhida
 * vira "quantos m² cabem" pelo motor do simulador.
 */
export function MapaCapitais() {
  const [renda, setRenda] = useState(6000);
  const [sel, setSel] = useState("Goiânia");
  const compra = imovelQueARendaCompra(renda);
  const valor = compra?.valor ?? 0;
  const c = CAPS.find((x) => x.nome === sel)!;
  const m2Cabe = (m2: number) => Math.floor(valor / m2);
  const maxCabe = m2Cabe(MIN);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
        <Deslizador
          id="renda-mapa"
          rotulo="Renda bruta da família, por mês"
          saida={brl(renda)}
          min={2000}
          max={20000}
          step={250}
          valor={renda}
          onChange={setRenda}
          humor={m2Cabe(c.m2) >= 50 ? "feliz" : m2Cabe(c.m2) >= 30 ? "gentil" : "triste"}
        />
        <p className="mt-3 text-[15px] text-ink-2">
          {compra ? (
            <>
              O banco financia um imóvel de até <b className="text-ink">{brl(valor)}</b> ({compra.programa.curto}
              {compra.noTeto && ", no teto da faixa"}), com {pct((1 - compra.programa.ltv) * 100, 0)} de entrada.
            </>
          ) : (
            "Com essa renda, a parcela ainda não cabe: suba a renda ou some a de quem compra junto."
          )}
        </p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <svg viewBox={`0 0 ${MAPA_BRASIL.largura} ${MAPA_BRASIL.altura}`} className="h-auto w-full" role="img" aria-label="Mapa do Brasil com o preço do m² nas capitais">
          {MAPA_BRASIL.ufs.map((u) => {
            const cap = porUf[u.uf];
            return (
              <path
                key={u.uf}
                d={u.d}
                fill={cap ? `var(--calor-${tom(cap.m2, MIN, MAX)})` : "var(--grid)"}
                stroke="var(--surface)"
                strokeWidth="1.2"
                className={cn(cap && "cursor-pointer")}
                onClick={() => cap && setSel(cap.nome)}
              >
                <title>{cap ? `${cap.nome}: ${brl(cap.m2)}/m²` : `${u.uf}: sem dado`}</title>
              </path>
            );
          })}
          {CAPS.map((x) => {
            const [cx, cy] = MAPA_BRASIL.capitais[x.nome];
            const ativo = x.nome === sel;
            return (
              <g key={x.nome} className="cursor-pointer" onClick={() => setSel(x.nome)}>
                <circle cx={cx} cy={cy} r={ativo ? 9 : 4} fill={ativo ? "var(--surface)" : "var(--ink)"} stroke="var(--ink)" strokeWidth={ativo ? 3 : 0} />
                {ativo && <circle cx={cx} cy={cy} r={3.5} fill="var(--ink)" />}
              </g>
            );
          })}
        </svg>

        <div className="flex flex-col gap-1 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5">
          <Eyebrow>
            {c.nome} · {c.uf}
          </Eyebrow>
          <p className="font-display text-[clamp(30px,4.4vw,42px)] font-semibold leading-tight tabular-nums">
            {compra ? `≈ ${m2Cabe(c.m2)} m²` : "—"}
          </p>
          <p className="text-[15px] text-ink-2">
            cabem no financiamento de {brl(valor)}, a <b className="text-ink">{brl(c.m2)}/m²</b> no anúncio
            {c.quartos["2"] && <> (2 quartos: {brl(c.quartos["2"])}/m²)</>}. {c.var12 >= 0 ? "Subiu" : "Caiu"} {pct(Math.abs(c.var12), 1)} em 12 meses.
          </p>
        </div>
      </div>

      <ol className="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-1 text-[15px] sm:grid-cols-2" aria-label="Capitais, da mais barata à mais cara">
        {CAPS.map((x) => (
          <li key={x.nome}>
            <button
              type="button"
              onClick={() => setSel(x.nome)}
              aria-pressed={x.nome === sel}
              className={cn("grid w-full grid-cols-[1fr_auto] items-center gap-x-3 rounded-lg px-2 py-1 text-left hover:bg-grid", x.nome === sel && "bg-mark-soft")}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden className="size-3 shrink-0 rounded-sm" style={{ background: `var(--calor-${tom(x.m2, MIN, MAX)})` }} />
                {x.nome}
              </span>
              <span className="font-mono text-sm tabular-nums">
                {brl(x.m2)}/m² {compra && <b className="ml-2 inline-block w-14 text-right">{m2Cabe(x.m2)} m²</b>}
              </span>
              {compra && (
                <span aria-hidden className="col-span-2 mt-1 h-1 rounded-full bg-grid">
                  <span className="block h-1 rounded-full bg-ink" style={{ width: `${(m2Cabe(x.m2) / maxCabe) * 100}%` }} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>

      <p className="text-xs text-muted">
        Preço médio de <b>anúncio</b> (não de venda) do Índice FipeZAP, {mesAno(FIPEZAP.ref)}, média de 3 meses. Financiamento pelas regras da Caixa
        conferidas no simulador, para quem tem 30 anos e nenhuma outra dívida. Estados em cinza: a capital não entra no índice.
      </p>
    </div>
  );
}
