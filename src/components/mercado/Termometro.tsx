import { Eyebrow } from "@/components/ui/badge";
import { pct } from "@/lib/format";
import { IVGR, mesAno, variacaoIvgr } from "@/lib/mercado";

/** O termômetro do mercado: quanto as avaliações dos bancos subiram (IVG-R, Banco Central). */
export function Termometro() {
  const ano = variacaoIvgr(12);
  const cinco = variacaoIvgr(60);
  const pontos = IVGR.serie.slice(-61).map(([, v]) => v);
  const min = Math.min(...pontos);
  const max = Math.max(...pontos);
  const L = 320;
  const A = 72;
  const linha = pontos.map((v, i) => `${((i / (pontos.length - 1)) * L).toFixed(1)},${(A - ((v - min) / (max - min)) * A).toFixed(1)}`).join(" ");
  const sinal = (v: number) => (v >= 0 ? "+" : "") + pct(v, 1);

  return (
    <figure className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:flex-row sm:items-center sm:gap-8">
      <div className="flex flex-col gap-1">
        <Eyebrow>Termômetro das avaliações</Eyebrow>
        <p className="font-display text-[clamp(34px,5vw,46px)] font-semibold leading-none tabular-nums">{sinal(ano.pct)}</p>
        <p className="text-[15px] text-ink-2">
          em 12 meses no valor de avaliação dos imóveis financiados · <b className="text-ink">{sinal(cinco.pct)}</b> em 5 anos
        </p>
      </div>
      <svg viewBox={`-2 -4 ${L + 4} ${A + 8}`} className="h-20 w-full max-w-xs flex-1" role="img" aria-label={`IVG-R dos últimos 5 anos, até ${mesAno(ano.ate)}`}>
        <polyline points={linha} fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={L} cy={A - ((pontos[pontos.length - 1] - min) / (max - min)) * A} r="4.5" fill="var(--mark)" stroke="var(--ink)" strokeWidth="2" />
      </svg>
      <figcaption className="text-xs text-muted sm:max-w-[11rem]">
        Fonte: Banco Central, IVG-R, até {mesAno(ano.ate)}. É o valor que o engenheiro do banco dá ao imóvel: é sobre ele que o banco empresta.
      </figcaption>
    </figure>
  );
}
