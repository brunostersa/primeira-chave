import type { ReactNode } from "react";
import { Icone, LogoNome } from "@/components/brand/Logo";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { cn } from "@/components/ui/utils";
import type { Esquema, Figura, Tom } from "@/lib/conteudo/tipos";

/**
 * Infográfico no tamanho de exportação (1200x675, 16:9): o mesmo quadro serve de
 * imagem no meio do texto, no Google Imagens e de capa nas redes (og:image).
 * Linguagem da marca: papel com grade, etiqueta em mono, manchete com grifo,
 * cotas de planta e o João-de-barro de canto. Sem números soltos: tudo vem dos dados.
 */

export const FIGURA_W = 1200;
export const FIGURA_H = 675;

const FUNDO: Record<Tom, string> = { planta: "bg-planta", mark: "bg-mark", bad: "bg-bad", ink: "bg-ink" };
const SUAVE: Record<Tom, string> = { planta: "bg-planta/45", mark: "bg-mark-soft", bad: "bg-bad-soft", ink: "bg-grid" };
const TEXTO_SOBRE: Record<Tom, string> = { planta: "text-ink", mark: "text-ink", bad: "text-surface", ink: "text-surface" };

export function Infografico({ figura }: { figura: Figura }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden bg-paper bg-[length:40px_40px] bg-planta-grid px-[64px] pb-[40px] pt-[52px] text-ink"
      style={{ width: FIGURA_W, height: FIGURA_H }}
    >
      <p className="flex items-center gap-3 font-mono text-[19px] uppercase tracking-[0.12em] text-ink-2">
        <Icone className="w-[30px]" />
        {figura.etiqueta}
      </p>
      <h2 className="mt-4 max-w-[980px] font-display text-[52px] leading-[1.02]">
        <span className="font-light">{figura.titulo}</span>
        {figura.destaque && (
          <>
            {" "}
            <span className="marca-texto font-semibold">{figura.destaque}</span>
          </>
        )}
      </h2>
      <div className="mt-8 flex min-h-0 flex-1 items-center">
        <Desenho esquema={figura.esquema} />
      </div>
      <div className="mt-6 flex items-end justify-between border-t-[1.5px] border-ink/15 pt-4">
        <span className="text-[26px]">
          <LogoNome />
        </span>
        <span className="font-mono text-[17px] text-ink-2">primeirachave.com.br</span>
      </div>
      <JoaoDeBarro pose="perfil" humor="curioso" className="absolute right-[56px] top-[40px] w-[96px]" />
    </div>
  );
}

function Desenho({ esquema }: { esquema: Esquema }) {
  switch (esquema.tipo) {
    case "linha":
      return <Linha {...esquema} />;
    case "passos":
      return <Passos {...esquema} />;
    case "comparar":
      return <Comparar {...esquema} />;
    case "numeros":
      return <Numeros {...esquema} />;
    case "barras":
      return <Barras {...esquema} />;
    case "divisao":
      return <Divisao {...esquema} />;
  }
}

/** Marco numerado: o círculo de tinta com número, como nas plantas. */
function Bolinha({ n, tom = "ink" }: { n: number | string; tom?: Tom }) {
  return (
    <span
      className={cn(
        "flex size-[54px] shrink-0 items-center justify-center rounded-full border-[3px] border-ink font-display text-[24px] font-semibold",
        tom === "mark" ? "bg-mark" : "bg-surface",
      )}
    >
      {n}
    </span>
  );
}

/** Linha do tempo: marcos nas pontas dos trechos (trechos = marcos - 1). */
function Linha({ marcos, trechos }: Extract<Esquema, { tipo: "linha" }>) {
  return (
    <div className="w-full">
      <div className="flex">
        {trechos.map((t, i) => (
          <p key={i} className="flex-1 pb-3 text-center font-mono text-[19px] text-ink-2">
            {t.rotulo}
          </p>
        ))}
      </div>
      <div className="relative flex items-center">
        {marcos.map((m, i) => (
          <div key={i} className={cn("flex items-center", i < marcos.length - 1 && "flex-1")}>
            <Bolinha n={i + 1} tom={i === marcos.length - 1 ? "mark" : "ink"} />
            {i < trechos.length && <span className={cn("h-[14px] flex-1 border-y-[3px] border-ink", FUNDO[trechos[i].tom])} />}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        {marcos.map((m, i) => (
          <div key={i} className={cn("flex flex-col gap-1", i < marcos.length - 1 ? "flex-1" : "w-[220px] items-end text-right")}>
            <b className="text-[24px] leading-tight">{m.rotulo}</b>
            {m.detalhe && <span className="max-w-[260px] text-[19px] leading-snug text-ink-2">{m.detalhe}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Passos({ itens }: Extract<Esquema, { tipo: "passos" }>) {
  return (
    <ol className="grid w-full gap-5" style={{ gridTemplateColumns: `repeat(${itens.length}, minmax(0, 1fr))` }}>
      {itens.map((p, i) => (
        <li key={i} className="flex flex-col gap-3 rounded-[18px] border-[2.5px] border-ink bg-surface p-6 shadow-[6px_6px_0_var(--ink)]">
          <Bolinha n={i + 1} tom={i === itens.length - 1 ? "mark" : "ink"} />
          <b className="text-[25px] leading-tight">{p.titulo}</b>
          <span className="text-[19px] leading-snug text-ink-2">{p.texto}</span>
        </li>
      ))}
    </ol>
  );
}

function Comparar({ colunas }: Extract<Esquema, { tipo: "comparar" }>) {
  return (
    <div className="grid w-full items-stretch gap-6" style={{ gridTemplateColumns: colunas.map(() => "minmax(0,1fr)").join(" auto ") }}>
      {colunas.flatMap((c, i) => {
        const coluna = (
          <div key={c.titulo} className={cn("flex flex-col gap-3 rounded-[18px] border-[2.5px] border-ink p-6", SUAVE[c.tom])}>
            <b className={cn("self-start rounded-full px-4 py-1 text-[24px]", FUNDO[c.tom], TEXTO_SOBRE[c.tom])}>{c.titulo}</b>
            <ul className="flex flex-col gap-2">
              {c.itens.map((t) => (
                <li key={t} className="flex gap-3 text-[21px] leading-snug">
                  <span aria-hidden className="mt-[10px] size-[9px] shrink-0 rounded-full bg-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        );
        return i === 0 ? [coluna] : [<span key={`x${i}`} className="self-center font-display text-[40px] font-light text-ink-2">×</span>, coluna];
      })}
    </div>
  );
}

function Numeros({ itens }: Extract<Esquema, { tipo: "numeros" }>) {
  return (
    <div className="grid w-full gap-6" style={{ gridTemplateColumns: `repeat(${itens.length}, minmax(0, 1fr))` }}>
      {itens.map((n, i) => (
        <div key={i} className="flex flex-col gap-2 border-l-[3px] border-ink pl-5">
          <span className={cn("self-start font-display text-[60px] font-semibold leading-none tabular-nums", n.tom === "mark" && "marca-texto")}>{n.valor}</span>
          <span className="text-[21px] leading-snug text-ink-2">{n.rotulo}</span>
        </div>
      ))}
    </div>
  );
}

function Barras({ itens }: Extract<Esquema, { tipo: "barras" }>) {
  const max = Math.max(...itens.map((i) => i.valor));
  return (
    <div className="flex w-full flex-col gap-4">
      {itens.map((b, i) => (
        <div key={i} className="grid grid-cols-[260px_minmax(0,1fr)] items-center gap-5">
          <b className="text-right text-[22px] leading-tight">{b.rotulo}</b>
          <div className="flex items-center gap-4">
            <span className={cn("h-[40px] rounded-r-[10px] border-[2.5px] border-ink", FUNDO[b.tom ?? "planta"])} style={{ width: `${(b.valor / max) * 78}%` }} />
            <span className="whitespace-nowrap font-display text-[26px] font-semibold tabular-nums">{b.texto}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Uma barra dividida (ex.: preço = financiado + entrada), com cota por baixo. */
function Divisao({ partes, total }: Extract<Esquema, { tipo: "divisao" }>) {
  // Fatia pequena (ex.: 5% de ITBI) ganha largura mínima para o texto caber; as outras se ajustam.
  const brutas = partes.map((p) => p.valor / partes.reduce((s, x) => s + x.valor, 0));
  const minimas = brutas.map((b) => Math.max(b, 0.17));
  const largura = (i: number) => `${(minimas[i] / minimas.reduce((s, x) => s + x, 0)) * 100}%`;
  return (
    <div className="w-full">
      {total && <Cota texto={total} />}
      <div className="mt-3 flex h-[86px] overflow-hidden rounded-[14px] border-[3px] border-ink">
        {partes.map((p, i) => (
          <div
            key={i}
            className={cn("flex items-center justify-center px-3 text-center font-display text-[26px] font-semibold", FUNDO[p.tom], TEXTO_SOBRE[p.tom], i > 0 && "border-l-[3px] border-ink")}
            style={{ width: largura(i) }}
          >
            {p.texto}
          </div>
        ))}
      </div>
      <div className="mt-3 flex">
        {partes.map((p, i) => (
          <p key={i} className="px-2 text-center text-[20px] leading-snug text-ink-2" style={{ width: largura(i) }}>
            {p.rotulo}
          </p>
        ))}
      </div>
    </div>
  );
}

/** Cota de planta: o traço com as duas pontas e o texto no meio. */
function Cota({ texto }: { texto: ReactNode }) {
  return (
    <div className="relative flex h-[30px] items-center border-x-[3px] border-ink">
      <span className="h-[3px] flex-1 bg-ink" />
      <span className="mx-4 font-mono text-[20px]">{texto}</span>
      <span className="h-[3px] flex-1 bg-ink" />
    </div>
  );
}
