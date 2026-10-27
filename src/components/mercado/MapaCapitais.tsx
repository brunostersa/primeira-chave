"use client";

import { useState } from "react";
import { Deslizador } from "@/components/simulador/campos";
import { Eyebrow } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import { brl, pct } from "@/lib/format";
import { capitais, FIPEZAP, imovelQueARendaCompra, ITBI_CAPITAIS, MAPA_BRASIL, mesAno, momentoDaRenda, RENDA, tom } from "@/lib/mercado";
import { MomentoRenda } from "./MomentoRenda";

const CAPS = capitais().sort((a, b) => a.m2 - b.m2);
const MIN = CAPS[0].m2;
const MAX = CAPS[CAPS.length - 1].m2;
const porUf = Object.fromEntries(CAPS.map((c) => [c.uf, c]));

/**
 * O número que vale é o valor do imóvel que o banco financia (motor validado).
 * Traduzir em m²: pelo preço REAL (ITBI) onde a prefeitura publica; o m² de anúncio
 * (FipeZap, apartamentos) fica como referência, com aviso.
 */
export function MapaCapitais() {
  const [renda, setRenda] = useState(6000);
  const [sel, setSel] = useState("São Paulo");
  const compra = imovelQueARendaCompra(renda);
  const momento = momentoDaRenda(renda);
  const valor = compra?.valor ?? 0;
  const c = CAPS.find((x) => x.nome === sel)!;
  const real = ITBI_CAPITAIS[c.nome];
  const cabe = (m2: number) => Math.floor(valor / m2);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
        <Deslizador
          id="renda-mapa"
          rotulo="Renda bruta da família, por mês"
          saida={brl(renda)}
          min={RENDA.min}
          max={RENDA.max}
          step={RENDA.passo}
          valor={renda}
          onChange={setRenda}
          humor={momento.puxador}
        />
        {compra ? (
          <div className="flex flex-col gap-1">
            <Eyebrow>Imóvel que o banco financia</Eyebrow>
            <p className="font-display text-[clamp(34px,5vw,48px)] font-semibold leading-none tabular-nums">até {brl(valor)}</p>
            <p className="text-[15px] text-ink-2">
              {compra.programa.curto}
              {compra.noTeto && ", no teto da faixa"} · com {pct((1 - compra.programa.ltv) * 100, 0)} de entrada · pelas regras da Caixa
            </p>
          </div>
        ) : null}
        <MomentoRenda momento={momento} />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <svg viewBox={`0 0 ${MAPA_BRASIL.largura} ${MAPA_BRASIL.altura}`} className="h-auto w-full" role="img" aria-label="Mapa do Brasil com o preço do m² de anúncio nas capitais">
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
                <title>{cap ? `${cap.nome}: ${brl(cap.m2)}/m² no anúncio` : `${u.uf}: sem dado`}</title>
              </path>
            );
          })}
          {CAPS.map((x) => {
            const [cx, cy] = MAPA_BRASIL.capitais[x.nome];
            const ativo = x.nome === sel;
            return (
              <g key={x.nome} className="cursor-pointer" onClick={() => setSel(x.nome)}>
                {ITBI_CAPITAIS[x.nome] && !ativo && <circle cx={cx} cy={cy} r={7} fill="none" stroke="var(--ink)" strokeWidth="2" />}
                <circle cx={cx} cy={cy} r={ativo ? 9 : 4} fill={ativo ? "var(--surface)" : "var(--ink)"} stroke="var(--ink)" strokeWidth={ativo ? 3 : 0} />
                {ativo && <circle cx={cx} cy={cy} r={3.5} fill="var(--ink)" />}
              </g>
            );
          })}
        </svg>

        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5" aria-live="polite">
          <Eyebrow>
            {c.nome} · {c.uf}
          </Eyebrow>
          {real && compra && (
            <div className="flex flex-col gap-1">
              <p className="font-display text-[clamp(28px,4vw,38px)] font-semibold leading-tight tabular-nums">≈ {cabe(real.m2)} m²</p>
              <p className="text-[15px] text-ink-2">
                pelo <b className="text-ink">preço pago de verdade</b>: {brl(real.m2)}/m² na metade das compras registradas no ITBI ({mesAno(real.periodo.de)} a{" "}
                {mesAno(real.periodo.ate)}).
              </p>
            </div>
          )}
          {!real && (
            <p className="text-[15px] text-ink-2">
              A prefeitura de {c.nome} não publica as compras registradas no ITBI: aqui só temos o preço de anúncio, que costuma ficar <b className="text-ink">acima</b> do que
              se paga de verdade.
            </p>
          )}
          <div className="flex flex-col gap-1 border-t border-line pt-3">
            <p className="text-[15px] tabular-nums text-ink-2">{compra ? `≈ ${cabe(c.m2)} m²` : "—"} no anúncio médio</p>
            <p className="text-sm text-muted">
              a {brl(c.m2)}/m² (2 quartos: {brl(c.quartos["2"] ?? c.m2)}/m²). É preço pedido em anúncio de apartamento, puxado pelos bairros mais procurados: casas e
              bairros mais simples saem bem mais em conta.
            </p>
          </div>
        </div>
      </div>

      <ol className="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-0.5 text-[15px] sm:grid-cols-2" aria-label="Capitais pelo m² de anúncio, da mais barata à mais cara">
        {CAPS.map((x) => (
          <li key={x.nome}>
            <button
              type="button"
              onClick={() => setSel(x.nome)}
              aria-pressed={x.nome === sel}
              className={cn("flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1 text-left hover:bg-grid", x.nome === sel && "bg-mark-soft")}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden className="size-3 shrink-0 rounded-sm" style={{ background: `var(--calor-${tom(x.m2, MIN, MAX)})` }} />
                {x.nome}
                {ITBI_CAPITAIS[x.nome] && <span className="rounded-full border border-ink px-1.5 font-mono text-[10px] uppercase leading-4">real</span>}
              </span>
              <span className="font-mono text-sm tabular-nums text-ink-2">{brl(x.m2)}/m²</span>
            </button>
          </li>
        ))}
      </ol>

      <p className="text-xs text-muted">
        Cores e lista: preço médio de <b>anúncio</b> de apartamentos (Índice FipeZAP, {mesAno(FIPEZAP.ref)}, média de 3 meses). Marcadas com “real”: capitais
        cuja prefeitura publica as compras registradas no ITBI (São Paulo: valor declarado e área do IPTU; Recife: valor avaliado pela prefeitura; Porto Alegre:
        base de cálculo e área privativa). Financiamento pelas regras da Caixa conferidas no simulador, para quem tem 30 anos e nenhuma outra dívida. Estados
        em cinza: a capital não entra no índice.
      </p>
    </div>
  );
}
