import type { Veredito } from "@/lib/conteudo/duvide";

/** O carimbo do veredito: vermelho para armadilha, marca-texto para segredo, planta para verdade. */
export const CARIMBO: Record<Veredito, string> = {
  armadilha: "bg-bad text-surface",
  segredo: "bg-mark text-ink",
  verdade: "bg-planta text-ink",
};
