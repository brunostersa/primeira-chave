import { cn } from "@/components/ui/utils";
import { JoaoDeBarro } from "./JoaoDeBarro";

/**
 * Sistema do logo (ver /marca):
 * - LogoNome: o logo principal. Cabeçalho, rodapé, documentos.
 * - LogoAssinatura: o pássaro entre as palavras, pousado na cota. Momentos de destaque.
 * - Icone: o pássaro com a chave. Avatar, favicon, selo.
 */

export function LogoNome({ className, cota = false, icone = false }: { className?: string; cota?: boolean; icone?: boolean }) {
  const nome = (
    <span className={cn("inline-flex flex-col font-display leading-none", !icone && className)}>
      <span className="whitespace-nowrap">
        <span className="font-light">primeira</span> <span className="marca-texto font-semibold">chave</span>
      </span>
      {cota && <Cota className="mt-1.5" />}
    </span>
  );
  if (!icone) return nome;
  // Com o ícone (chave no círculo) à esquerda: o mesmo símbolo do favicon, para o topo bater com a aba.
  return (
    <span className={cn("inline-flex items-center gap-[0.38em]", className)}>
      <Icone className="w-[1.45em] shrink-0" />
      {nome}
    </span>
  );
}

export function LogoAssinatura({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col font-display leading-none", className)}>
      <span className="flex items-end gap-[0.12em] whitespace-nowrap">
        <span className="font-light leading-[0.82]">primeira</span>
        <JoaoDeBarro pose="chave" className="mb-[-0.05em] w-[1.45em]" />
        <span className="marca-texto font-semibold leading-[0.82]">chave</span>
      </span>
      <Cota className="mt-[0.1em]" />
    </span>
  );
}

/**
 * Ícone da marca. `simbolo="chave"` (padrão) é a chave-1 apoiada no círculo: favicon,
 * Google, ícone de app — lê bem até 16 px. `simbolo="passaro"` é para avatar de rede social.
 */
export function Icone({ className, tom = "mark", simbolo = "chave" }: { className?: string; tom?: "mark" | "ink"; simbolo?: "chave" | "passaro" }) {
  return (
    <span
      className={cn(
        "relative inline-flex aspect-square items-center justify-center",
        tom === "mark" ? "rounded-full bg-mark" : "rounded-[22%] bg-ink",
        className,
      )}
    >
      {simbolo === "chave" ? (
        <ChaveUm
          tom={tom === "mark" ? "claro" : "escuro"}
          className="absolute left-1/2 top-1/2 h-[56%] w-auto -translate-x-1/2 -translate-y-1/2"
          titulo="Primeira Chave"
        />
      ) : (
        <JoaoDeBarro pose="chave" pequeno tom={tom === "mark" ? "claro" : "escuro"} className="w-[78%]" titulo="Primeira Chave" />
      )}
    </span>
  );
}

/** A chave que é um "1": argola = a casa, haste = o número 1. Um só desenho: argola vazada, só muda a cor do traço. */
export function ChaveUm({ className, tom = "claro", titulo }: { className?: string; tom?: "claro" | "escuro"; titulo?: string }) {
  const traco = tom === "claro" ? "var(--ink)" : "var(--paper)";
  return (
    <svg
      viewBox="12 2 40 60"
      className={cn("h-auto", className)}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <g fill="none" stroke={traco} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="45" r="10" />
        <path d="M32 34V7L22 15M32 20h7M32 27h5" />
      </g>
    </svg>
  );
}

/** Linha de cota (medida de planta baixa). Com rótulo opcional no meio. */
export function Cota({ className, rotulo }: { className?: string; rotulo?: string }) {
  return (
    <span className={cn("relative block h-2 border-x-[1.5px] border-t-[1.5px] border-muted", className)} aria-hidden={!rotulo}>
      {rotulo && (
        <span className="absolute -top-[0.65em] left-1/2 -translate-x-1/2 bg-paper px-1.5 font-mono text-[11px] leading-none text-ink">
          {rotulo}
        </span>
      )}
    </span>
  );
}
