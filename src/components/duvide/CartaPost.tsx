import { Icone, LogoNome } from "@/components/brand/Logo";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { cn } from "@/components/ui/utils";
import { VEREDITOS, type Carta } from "@/lib/conteudo/duvide";
import { CARIMBO } from "./carimbo";

/**
 * A carta do "Duvide." no formato de post (1080x1350, 4:5 do Instagram). Vira imagem
 * pelo mesmo gerador dos infográficos e serve de capa da página de cada carta.
 */

export const CARTA_W = 1080;
export const CARTA_H = 1350;

const HUMOR = { armadilha: "surpreso", segredo: "piscando", verdade: "feliz" } as const;

export function CartaPost({ carta }: { carta: Carta }) {
  const v = VEREDITOS[carta.veredito];
  return (
    <div
      className="relative flex flex-col overflow-hidden bg-paper bg-[length:54px_54px] bg-planta-grid px-[84px] pb-[64px] pt-[72px] text-ink"
      style={{ width: CARTA_W, height: CARTA_H }}
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-4 font-mono text-[28px] uppercase tracking-[0.14em] text-ink-2">
          <Icone className="w-[44px]" />
          Duvide.
        </p>
        <span className={cn("-rotate-3 rounded-[10px] border-[4px] border-ink px-6 py-2 font-display text-[34px] font-semibold uppercase tracking-wide", CARIMBO[carta.veredito])}>
          {v.rotulo}
        </span>
      </div>

      <p className="mt-[88px] font-mono text-[26px] uppercase tracking-[0.1em] text-muted">Dizem por aí:</p>
      <blockquote className="mt-4 font-display text-[80px] font-light leading-[1.03]">“{carta.frase}”</blockquote>

      <div className="mt-auto flex flex-col gap-6">
        <p className={cn("self-start font-display text-[96px] font-semibold leading-none", carta.veredito === "segredo" && "marca-texto")}>{v.rotulo}.</p>
        <p className="max-w-[820px] text-[38px] leading-[1.3] text-ink-2">{carta.resumo}</p>
      </div>

      <div className="mt-[56px] flex items-end justify-between border-t-[2px] border-ink/15 pt-6">
        <span className="text-[38px]">
          <LogoNome />
        </span>
        <span className="font-mono text-[24px] text-ink-2">primeirachave.com.br/duvide</span>
      </div>
      <JoaoDeBarro pose="frente" humor={HUMOR[carta.veredito]} className="absolute bottom-[420px] right-[84px] w-[230px]" />
    </div>
  );
}
