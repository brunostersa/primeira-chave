"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";

type Foto = { arquivo: string; legenda: string };

/** Fotos em tela cheia: setas do teclado, Esc fecha, contador "3 de 16". */
function Visor({ fotos, inicio, fechar }: { fotos: Foto[]; inicio: number; fechar: () => void }) {
  const [k, setK] = useState(inicio);
  const ir = useCallback((d: number) => setK((x) => (x + d + fotos.length) % fotos.length), [fotos.length]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    document.addEventListener("keydown", tecla);
    const corpo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = corpo;
    };
  }, [fechar, ir]);

  // No celular, arrastar o dedo para o lado troca a foto.
  const toque = useRef<number | null>(null);
  const f = fotos[k];
  return (
    <div role="dialog" aria-modal="true" aria-label="Fotos da casa" className="fixed inset-0 z-[60] flex flex-col bg-ink text-paper">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-mono text-sm">
          {k + 1} de {fotos.length} · {f.legenda}
        </span>
        <button type="button" onClick={fechar} aria-label="Fechar" className="rounded-full p-2 hover:bg-paper/10">
          <X className="size-6" />
        </button>
      </div>
      <div
        className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-2 pb-2 sm:px-16"
        onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toque.current === null) return;
          const dx = e.changedTouches[0].clientX - toque.current;
          toque.current = null;
          if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- tamanho natural da foto no visor */}
        <img src={f.arquivo} alt={f.legenda} className="size-full rounded-lg object-contain" />
        <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior" className="absolute left-2 rounded-full bg-paper/10 p-3 hover:bg-paper/20 sm:left-4">
          <ChevronLeft className="size-6" />
        </button>
        <button type="button" onClick={() => ir(1)} aria-label="Próxima foto" className="absolute right-2 rounded-full bg-paper/10 p-3 hover:bg-paper/20 sm:right-4">
          <ChevronRight className="size-6" />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 sm:px-6">
        {fotos.map((x, j) => (
          <button key={x.arquivo} type="button" onClick={() => setK(j)} aria-label={x.legenda} className={j === k ? "rounded-md ring-2 ring-mark" : "rounded-md opacity-60 hover:opacity-100"}>
            <Image src={x.arquivo} alt="" width={96} height={72} className="h-14 w-20 rounded-md object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Capa em mosaico, de borda a borda: a foto principal grande e mais quatro. */
export function MosaicoCapa({ fotos, children }: { fotos: Foto[]; children?: React.ReactNode }) {
  const [aberta, setAberta] = useState<number | null>(null);
  const fechar = useCallback(() => setAberta(null), []);
  const [atual, setAtual] = useState(0);
  const [capa, ...resto] = fotos;

  return (
    <div className="relative">
      {/* Celular: as fotos passam para o lado com o dedo. */}
      <div
        className="flex h-[min(60vh,520px)] min-h-[320px] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => setAtual(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
      >
        {fotos.map((f, j) => (
          <button key={f.arquivo} type="button" onClick={() => setAberta(j)} className="relative w-full shrink-0 snap-center" aria-label={`Abrir foto: ${f.legenda}`}>
            <Image src={f.arquivo} alt={f.legenda} fill priority={j === 0} sizes="100vw" className="object-cover" />
          </button>
        ))}
      </div>
      <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-xs text-paper md:hidden">
        {atual + 1} / {fotos.length}
      </span>
      <div className="hidden h-[min(60vh,620px)] min-h-[360px] grid-cols-4 grid-rows-2 gap-2 md:grid">
        <button type="button" onClick={() => setAberta(0)} className="relative col-span-4 row-span-2 overflow-hidden md:col-span-2">
          <Image src={capa.arquivo} alt={capa.legenda} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
        </button>
        {resto.slice(0, 4).map((f, j) => (
          <button key={f.arquivo} type="button" onClick={() => setAberta(j + 1)} className="relative hidden overflow-hidden md:block">
            <Image src={f.arquivo} alt={f.legenda} fill sizes="25vw" className="object-cover transition-transform duration-700 hover:scale-[1.05]" />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setAberta(0)}
        className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-surface px-4 py-2 text-sm font-semibold hover:bg-paper"
      >
        <Images className="size-4" /> Ver as {fotos.length} fotos
      </button>
      {children}
      {aberta !== null && <Visor fotos={fotos} inicio={aberta} fechar={fechar} />}
    </div>
  );
}

/** Grade das fotos dentro da seção "A casa"; cada uma abre o visor. */
export function GradeFotos({ fotos }: { fotos: Foto[] }) {
  const [aberta, setAberta] = useState<number | null>(null);
  const fechar = useCallback(() => setAberta(null), []);
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 2xl:grid-cols-4">
        {fotos.map((f, j) => (
          <button key={f.arquivo} type="button" onClick={() => setAberta(j)} className="group flex flex-col gap-1 text-left">
            <span className="relative block aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={f.arquivo} alt={f.legenda} fill sizes="(min-width: 1536px) 20vw, (min-width: 640px) 30vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </span>
            <span className="text-xs text-muted">{f.legenda}</span>
          </button>
        ))}
      </div>
      {aberta !== null && <Visor fotos={fotos} inicio={aberta} fechar={fechar} />}
    </>
  );
}
