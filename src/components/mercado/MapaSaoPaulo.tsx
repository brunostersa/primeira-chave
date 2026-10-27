"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import { brl } from "@/lib/format";
import { ITBI_SP, mesAno, tom } from "@/lib/mercado";

const COM_DADO = ITBI_SP.distritos.filter((d) => d.m2).sort((a, b) => a.m2! - b.m2!);
const MIN = COM_DADO[0].m2!;
const MAX = COM_DADO[COM_DADO.length - 1].m2!;

/** Mapa de calor dos distritos de São Paulo pelo preço REAL (ITBI pago), não de anúncio. */
export function MapaSaoPaulo() {
  const [sel, setSel] = useState<string | null>(null);
  const d = ITBI_SP.distritos.find((x) => x.nome === sel);
  const cid = ITBI_SP.cidade;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <svg viewBox={`0 0 ${ITBI_SP.largura} ${ITBI_SP.altura}`} className="mx-auto h-auto w-full max-w-sm" role="img" aria-label="Mapa dos distritos de São Paulo pelo preço do m² pago">
          {ITBI_SP.distritos.map((x) => (
            <path
              key={x.nome}
              d={x.d}
              fill={x.m2 ? `var(--calor-${tom(x.m2, MIN, MAX)})` : "var(--grid)"}
              stroke={x.nome === sel ? "var(--ink)" : "var(--surface)"}
              strokeWidth={x.nome === sel ? 3 : 0.8}
              className="cursor-pointer"
              onClick={() => setSel(x.nome)}
              onMouseEnter={() => setSel(x.nome)}
            >
              <title>{x.m2 ? `${x.nome}: ${brl(x.m2)}/m²` : `${x.nome}: poucas compras`}</title>
            </path>
          ))}
        </svg>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5" aria-live="polite">
            <Eyebrow>{d ? `${d.nome} · zona ${d.regiao.toLowerCase()}` : "Cidade de São Paulo"}</Eyebrow>
            {d && !d.m2 ? (
              <p className="text-[15px] text-ink-2">Poucas compras registradas no período ({d.n}): a mediana não seria confiável.</p>
            ) : (
              <>
                <p className="font-display text-[clamp(30px,4.4vw,42px)] font-semibold leading-tight tabular-nums">{brl((d ?? cid).m2!)}/m²</p>
                <p className="text-[15px] text-ink-2">
                  metade das compras saiu por menos que isso. Imóvel típico: <b className="text-ink">{brl((d ?? cid).valor!)}</b>.{" "}
                  {(d ?? cid).financiado}% foram financiados. {(d ?? cid).n.toLocaleString("pt-BR")} compras de casa e apartamento.
                </p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted" aria-hidden>
            <span>{brl(MIN)}</span>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <span key={n} className="h-3 flex-1 rounded-sm" style={{ background: `var(--calor-${n})` }} />
            ))}
            <span>{brl(MAX)}/m²</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-[15px]">
        {[
          { titulo: "Mais em conta", lista: COM_DADO.slice(0, 6) },
          { titulo: "Mais caros", lista: COM_DADO.slice(-6).reverse() },
        ].map((g) => (
          <div key={g.titulo} className="flex flex-col gap-1">
            <b className="text-sm text-muted">{g.titulo}</b>
            {g.lista.map((x) => (
              <button
                key={x.nome}
                type="button"
                onClick={() => setSel(x.nome)}
                className={cn("flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-left hover:bg-grid", x.nome === sel && "bg-mark-soft")}
              >
                <span className="truncate">{x.nome}</span>
                <span className="font-mono text-xs tabular-nums">{brl(x.m2!)}</span>
              </button>
            ))}
          </div>
        ))}
      </div>


      <p className="text-xs text-muted">
        Mediana do valor declarado nas guias de ITBI pagas de {mesAno(ITBI_SP.periodo.de)} a {mesAno(ITBI_SP.periodo.ate)} (Prefeitura de São Paulo):
        compra e venda do imóvel inteiro, casas e apartamentos. O m² usa a área construída do IPTU, que inclui parte das áreas comuns: por isso fica abaixo
        do m² de anúncio, que usa a área privativa. Distritos do GeoSampa.
      </p>
    </div>
  );
}
