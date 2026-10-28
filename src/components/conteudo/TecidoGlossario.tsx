"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/components/ui/utils";

export type TermoTecido = {
  id: string;
  titulo: string;
  resumo: string;
  slug: string;
  paginas: { titulo: string; slug: string }[];
};

/** Ligação entre dois termos (índices em `termos`): `peso` = páginas que usam os dois. */
export type FioTecido = [number, number, number];

/**
 * "O tecido conectivo": os termos do glossário numa roda e um fio entre cada dois que aparecem
 * juntos numa mesma página. Passar o mouse (ou o foco) num termo acende os fios dele e mostra
 * o que ele quer dizer e onde aparece. Os chips embaixo fazem o mesmo e são o caminho no celular.
 */
export function TecidoGlossario({ termos, fios }: { termos: TermoTecido[]; fios: FioTecido[] }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const C = 500;
  const R = 285;
  const ang = (i: number) => (i / termos.length) * Math.PI * 2 - Math.PI / 2;
  const ponto = (i: number, r = R) => [C + Math.cos(ang(i)) * r, C + Math.sin(ang(i)) * r] as const;
  const maxPeso = Math.max(1, ...fios.map((f) => f[2]));

  const vizinhos = new Set<number>();
  if (ativo !== null) for (const [a, b] of fios) if (a === ativo) vizinhos.add(b); else if (b === ativo) vizinhos.add(a);
  const t = ativo !== null ? termos[ativo] : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <svg viewBox="-75 -75 1150 1150" className="h-auto w-full" role="img" aria-label="Mapa de conexões entre os termos do glossário" onMouseLeave={() => setAtivo(null)}>
          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="2 8" />
          {/* fios */}
          {fios.map(([a, b, peso]) => {
            const [x1, y1] = ponto(a, R - 10);
            const [x2, y2] = ponto(b, R - 10);
            const aceso = ativo !== null && (a === ativo || b === ativo);
            return (
              <path
                key={`${a}-${b}`}
                d={`M${x1} ${y1} Q${C} ${C} ${x2} ${y2}`}
                fill="none"
                stroke={aceso ? "var(--ink)" : "var(--planta-deep)"}
                strokeWidth={1 + (peso / maxPeso) * (aceso ? 6 : 4)}
                strokeLinecap="round"
                opacity={ativo === null ? 0.18 + (peso / maxPeso) * 0.4 : aceso ? 0.85 : 0.05}
                className="transition-opacity duration-200"
              />
            );
          })}
          {/* nós e rótulos */}
          {termos.map((termo, i) => {
            const [x, y] = ponto(i);
            const graus = (ang(i) * 180) / Math.PI;
            const esquerda = graus > 90 && graus < 270;
            const destaque = ativo === i;
            const apagado = ativo !== null && !destaque && !vizinhos.has(i);
            const r = 5 + Math.sqrt(termo.paginas.length) * 2.2;
            return (
              <Link key={termo.id} href={termo.slug} onMouseEnter={() => setAtivo(i)} onFocus={() => setAtivo(i)} onBlur={() => setAtivo(null)} aria-label={`${termo.titulo}: ${termo.resumo}`}>
                <g className={cn("transition-opacity duration-200", apagado && "opacity-30")}>
                  <circle cx={x} cy={y} r={r} fill={destaque ? "var(--mark)" : "var(--surface)"} stroke="var(--ink)" strokeWidth={destaque ? 3 : 2} />
                  <text
                    transform={`translate(${x} ${y}) rotate(${esquerda ? graus + 180 : graus}) translate(${esquerda ? -(r + 10) : r + 10} 0)`}
                    textAnchor={esquerda ? "end" : "start"}
                    dominantBaseline="central"
                    fontSize="21"
                    fontFamily="var(--font-sans)"
                    fontWeight={destaque || vizinhos.has(i) ? 600 : 400}
                    fill="var(--ink)"
                  >
                    {termo.titulo}
                  </text>
                </g>
              </Link>
            );
          })}
          <text x={C} y={C - 8} textAnchor="middle" fontFamily="var(--font-display)" fontSize="58" fontWeight="600" fill="var(--ink)">
            {termos.length}
          </text>
          <text x={C} y={C + 26} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="17" fill="var(--muted)">
            termos · {fios.length} fios
          </text>
        </svg>

        <div className="min-h-[260px] rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-6" aria-live="polite">
          {t ? (
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.07em] text-muted">Termo</span>
              <b className="font-display text-3xl font-semibold leading-tight">
                <span className="marca-texto">{t.titulo}</span>
              </b>
              <p className="text-ink-2">{t.resumo}</p>
              <span className="font-mono text-xs uppercase tracking-[0.07em] text-muted">
                Aparece em {t.paginas.length} {t.paginas.length === 1 ? "página" : "páginas"} · liga com {vizinhos.size} {vizinhos.size === 1 ? "termo" : "termos"}
              </span>
              <ul className="flex flex-col gap-1 text-[15px]">
                {t.paginas.slice(0, 6).map((p) => (
                  <li key={p.slug}>
                    <Link href={p.slug} className="font-semibold underline-offset-4 hover:underline">
                      {p.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.07em] text-muted">Como ler</span>
              <p className="font-display text-2xl font-light leading-snug">
                Cada fio liga dois termos que aparecem <span className="marca-texto font-semibold">na mesma página</span>.
              </p>
              <p className="text-ink-2">Quanto mais grosso, mais páginas em comum. Passe o mouse num termo para ver o que ele quer dizer e onde aparece.</p>
            </div>
          )}
        </div>
      </div>

      <ul className="flex flex-wrap gap-2">
        {termos.map((termo, i) => (
          <li key={termo.id}>
            <Link
              href={termo.slug}
              title={termo.resumo}
              onMouseEnter={() => setAtivo(i)}
              onFocus={() => setAtivo(i)}
              className={cn("block rounded-full border px-3 py-1.5 text-sm transition-colors", ativo === i ? "border-ink bg-mark" : "border-line bg-surface hover:border-ink")}
            >
              {termo.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
