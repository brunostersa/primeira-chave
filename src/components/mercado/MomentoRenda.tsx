import Link from "next/link";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { cn } from "@/components/ui/utils";
import { no } from "@/lib/conteudo/links";
import type { Momento } from "@/lib/mercado";

/** O balão do João-de-barro: reage à renda escolhida (degrau, teto, faixa nova…). */
export function MomentoRenda({ momento }: { momento: Momento }) {
  const susto = momento.passaro === "surpreso";
  return (
    <div className="flex items-end gap-3" aria-live="polite">
      <JoaoDeBarro key={`p-${momento.id}`} pose="frente" humor={momento.passaro} className={cn("momento-entra h-14 w-auto shrink-0", susto && "momento-susto")} />
      <p
        key={momento.id}
        className={cn(
          "momento-entra relative rounded-[var(--radius-card)] rounded-bl-sm border-[1.5px] px-4 py-2.5 text-[15px] leading-snug",
          susto ? "border-ink bg-mark-soft text-ink" : "border-line bg-paper text-ink-2",
        )}
      >
        {momento.texto}
        {momento.simulador && (
          <>
            {" "}
            <Link href={no("simulador").slug} className="font-semibold underline decoration-planta-deep underline-offset-4">
              Abrir o simulador
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
