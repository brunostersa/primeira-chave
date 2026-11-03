import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { cn } from "@/components/ui/utils";
import type { Tabela } from "@/lib/financiamento/engine";
import { brl } from "@/lib/format";

/** Carimbo do selo: círculo com o texto em volta e o João-de-barro no meio. */
export function Carimbo({ aprovado, className }: { aprovado: boolean; className?: string }) {
  const texto = aprovado ? "JOÃO APROVA · PRIMEIRA CHAVE · JOÃO APROVA · PRIMEIRA CHAVE · " : "EM ANÁLISE · PRIMEIRA CHAVE · EM ANÁLISE · PRIMEIRA CHAVE · ";
  return (
    <div className={cn("relative aspect-square w-36 -rotate-[10deg] rounded-full border-[3px] border-ink bg-mark shadow-[6px_6px_0_var(--ink)]", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="carimbo-volta" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="64" fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="3 5" />
        <text fontFamily="var(--font-plex-mono), monospace" fontSize="14.5" fontWeight="600" letterSpacing="2" fill="var(--ink)">
          <textPath href="#carimbo-volta">{texto}</textPath>
        </text>
      </svg>
      <JoaoDeBarro pose={aprovado ? "comemora" : "parado"} carga={aprovado ? "chave" : null} humor={aprovado ? "feliz" : "curioso"} className="absolute inset-[24%]" titulo={aprovado ? "Selo João aprova" : "Selo em análise"} />
    </div>
  );
}

/**
 * A conta do preço numa barra: o que o banco paga (planta), a entrada (marca-texto, o seu
 * dinheiro) e, passando do preço, os custos da compra (hachurado).
 */
export function BarraDaConta({ preco, financiado, custos }: { preco: number; financiado: number; custos: number }) {
  const total = preco + custos;
  const entrada = preco - financiado;
  const pct = (v: number) => `${(v / total) * 100}%`;
  const partes = [
    { rotulo: "O banco financia", valor: financiado, classe: "bg-planta", w: pct(financiado) },
    { rotulo: "Entrada", valor: entrada, classe: "bg-mark", w: pct(entrada) },
    { rotulo: "Custos da compra", valor: custos, classe: "bg-hachura", w: pct(custos) },
  ];
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex h-16 overflow-hidden rounded-xl border-[1.5px] border-ink sm:h-20" role="img" aria-label={partes.map((p) => `${p.rotulo}: ${brl(p.valor)}`).join("; ")}>
        {partes.map((p, k) => (
          <div key={p.rotulo} className={cn(p.classe, k > 0 && "border-l-[1.5px] border-ink")} style={{ width: p.w }} />
        ))}
      </div>
      <figcaption className="grid gap-3 @xl:grid-cols-3">
        {partes.map((p) => (
          <div key={p.rotulo} className="flex items-start gap-2">
            <i aria-hidden className={cn("mt-1 size-4 shrink-0 rounded border-[1.5px] border-ink", p.classe)} />
            <span>
              <span className="block text-sm text-ink-2">{p.rotulo}</span>
              <b className="font-display text-xl tabular-nums">{brl(p.valor)}</b>
            </span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}

/** As duas parcelas ao longo dos anos: a PRICE quase reta, a SAC descendo. */
export function GraficoParcelas({ price, sac, meses }: { price: Tabela; sac: Tabela; meses: number }) {
  const W = 640;
  const H = 260;
  const m = { l: 56, r: 16, t: 16, b: 32 };
  const max = Math.ceil(Math.max(...sac.pts.map((p) => p[1]), ...price.pts.map((p) => p[1])) / 500) * 500;
  const x = (mes: number) => m.l + ((mes - 1) / (meses - 1)) * (W - m.l - m.r);
  const y = (v: number) => m.t + (1 - v / max) * (H - m.t - m.b);
  const linha = (t: Tabela) => t.pts.map(([mes, v], k) => `${k ? "L" : "M"}${x(mes).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const anos = Array.from({ length: Math.floor(meses / 60) + 1 }, (_, k) => k * 5).filter((a) => a * 12 <= meses);
  const passos = [0, max / 2, max];

  return (
    <figure className="flex flex-col gap-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Parcela PRICE começa em ${brl(price.first.pg)}; a SAC começa em ${brl(sac.first.pg)} e termina em ${brl(sac.last)}.`}>
        {passos.map((v) => (
          <g key={v}>
            <line x1={m.l} x2={W - m.r} y1={y(v)} y2={y(v)} stroke="var(--grid)" />
            <text x={m.l - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--muted)" fontFamily="var(--font-plex-mono), monospace">
              {v ? `${(v / 1000).toLocaleString("pt-BR")} mil` : "0"}
            </text>
          </g>
        ))}
        {anos.map((a) => (
          <text key={a} x={x(Math.max(1, a * 12))} y={H - 10} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--font-plex-mono), monospace">
            {a ? `${a} anos` : "início"}
          </text>
        ))}
        <path d={linha(price)} fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        <path d={linha(sac)} fill="none" stroke="var(--planta-deep)" strokeWidth="3" strokeDasharray="7 5" strokeLinejoin="round" />
      </svg>
      <figcaption className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-2">
          <i aria-hidden className="h-[3px] w-6 bg-ink" /> PRICE: {brl(price.first.pg)} do começo ao fim · total {brl(price.total)}
        </span>
        <span className="flex items-center gap-2">
          <i aria-hidden className="h-[3px] w-6 border-t-[3px] border-dashed border-planta-deep" /> SAC: de {brl(sac.first.pg)} até {brl(sac.last)} · total {brl(sac.total)}
        </span>
      </figcaption>
    </figure>
  );
}
