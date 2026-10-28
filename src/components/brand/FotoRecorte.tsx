import type { ReactNode } from "react";
import { cn } from "@/components/ui/utils";
import { Ilustracao, type NomeCena } from "@/components/brand/ilustracoes";
import { FOTOS, type Foto } from "@/lib/conteudo/fotos";

/**
 * Fotos com recorte à la Niemeyer, sempre em companhia de um desenho da marca.
 * - FotoArco: janela em arco pleno com moldura de concreto (papel + traço tinta);
 *   o desenho (`children`) pousa no pé do arco, metade dentro, metade fora.
 * - FaixaFotoOnda: seção inteira com a borda de cima em curva livre e uma marquise branca.
 */

export function FotoArco({ foto, children, className }: { foto: Foto; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-md pb-6 pl-6", className)}>
      <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-t-full shadow-[0_0_0_10px_var(--paper),0_0_0_13px_var(--ink)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- export estático, imagens já otimizadas em webp */}
        <img src={foto.src} alt={foto.alt} loading="lazy" decoding="async" className="size-full object-cover" style={{ objectPosition: foto.pos ?? "center" }} />
      </div>
      {children && <div className="absolute -bottom-2 left-0 w-[64%]">{children}</div>}
    </div>
  );
}

/** Curva da borda de cima, em coordenadas 0–1 (objectBoundingBox). */
const ONDA = "M0 0.22 C0.2 0.02 0.4 0 0.55 0.16 S0.84 0.36 1 0.12";

export function FaixaFotoOnda({ foto, id, children, className }: { foto: Foto; id: string; children?: ReactNode; className?: string }) {
  const clip = `onda-${id}`;
  return (
    <section className={cn("relative h-[520px] md:h-[600px]", className)}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <clipPath id={clip} clipPathUnits="objectBoundingBox">
          <path d={`${ONDA} L1 1 L0 1 Z`} />
        </clipPath>
      </svg>
      <div className="absolute inset-0" style={{ clipPath: `url(#${clip})` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- export estático, imagens já otimizadas em webp */}
        <img src={foto.src} alt={foto.alt} loading="lazy" decoding="async" className="size-full object-cover" style={{ objectPosition: foto.pos ?? "center" }} />
      </div>
      <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <path d={ONDA} fill="none" stroke="var(--ink)" strokeWidth="16" vectorEffect="non-scaling-stroke" />
        <path d={ONDA} fill="none" stroke="var(--paper)" strokeWidth="10" vectorEffect="non-scaling-stroke" />
      </svg>
      {children}
    </section>
  );
}

/**
 * Topo das páginas: com foto cadastrada em FOTOS, o arco com a cena do assunto pousada no pé;
 * sem foto, só a cena, como sempre foi.
 */
export function TopoDaPagina({ id, ilustracao, className }: { id: string; ilustracao?: NomeCena; className?: string }) {
  const foto = FOTOS[id];
  if (!foto) return ilustracao ? <Ilustracao nome={ilustracao} className={className} /> : null;
  const cena = foto.cena ?? ilustracao;
  return <FotoArco foto={foto} className={className}>{cena && <Ilustracao nome={cena} />}</FotoArco>;
}
