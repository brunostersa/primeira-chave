import type { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

/**
 * Ícones da marca: quadro 24×24, traço 1.75 arredondado, como o João-de-barro.
 * Onde há dinheiro, um detalhe em marca-texto (`.ic-mark`).
 */
const M = "var(--mark)";

const ICONES = {
  casa: <><path d="M3.5 11 12 4l8.5 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-5h4v5" /></>,
  chave: <><circle cx="8" cy="8" r="4.5" fill={M} /><path d="M11.2 11.2 20 20M16 16l2-2M18.5 18.5l1.6-1.6" /></>,
  documento: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></>,
  banco: <><path d="M3 9 12 4l9 5z" /><path d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" /></>,
  cofre: <><rect x="3.5" y="5" width="17" height="14" rx="2.5" fill={M} /><circle cx="12" cy="12" r="3.5" /><path d="M12 10.5V12l1 .8M6 19v2M18 19v2" /></>,
  calendario: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /><circle cx="15.5" cy="15" r="2" fill={M} /></>,
  cpf: <><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><circle cx="8" cy="11" r="2" /><path d="M5.5 15.5c.8-1.4 4.2-1.4 5 0M13.5 10h5M13.5 13.5h3.5" /></>,
  lupa: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5.5 5.5" /></>,
  calculadora: <><rect x="5" y="2.5" width="14" height="19" rx="2.5" /><rect x="8" y="5.5" width="8" height="4" rx="1" /><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01" /><circle cx="15.5" cy="16.5" r="1.2" fill={M} /></>,
  carimbo: <><path d="M9.5 11V7a2.5 2.5 0 0 1 5 0v4" /><path d="M5 11h14v4H5zM4 19h16" /></>,
  local: <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  moeda: <><circle cx="12" cy="12" r="8.5" fill={M} /><path d="M14.5 9.2c-.6-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-1.9-.4-2.5-1.2M12 6.5V8M12 16v1.5" /></>,
  alerta: <><path d="M12 3.5 21.5 20h-19z" /><path d="M12 10v4.5M12 17.5h.01" /></>,
  ok: <><circle cx="12" cy="12" r="8.5" /><path d="m8.3 12.2 2.6 2.6 5-5.4" /></>,
  seta: <><path d="M4 12h15M14 6.5 19.5 12 14 17.5" /></>,
  medida: <><path d="M3 12h18M3 8.5v7M21 8.5v7" /><path d="M8 12V10M12 12V9.5M16 12V10" /></>,
} satisfies Record<string, ReactNode>;

export type NomeIcone = keyof typeof ICONES;
export const NOMES_ICONES = Object.keys(ICONES) as NomeIcone[];

export function IconeLinha({ nome, className, titulo }: { nome: NomeIcone; className?: string; titulo?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6 shrink-0", className)}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      {ICONES[nome]}
    </svg>
  );
}
