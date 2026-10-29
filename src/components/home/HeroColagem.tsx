import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { cn } from "@/components/ui/utils";

/**
 * Imagem da primeira dobra (o mapa inteiro foi para /mapa/): três fachadas em pílulas,
 * cada uma com uma pílula de cor da marca atrás, e uns rabiscos à mão. O rastro tracejado
 * é o voo do João, que chega com a chave entre as fotos.
 */

type Pilula = { src: string; alt: string; cor: string; caixa: string; pos?: string; prioridade?: boolean };

const PILULAS: Pilula[] = [
  {
    src: "/fotos/volumes-em-degrau.webp",
    alt: "Fachada moderna em degraus, vista de baixo contra o céu",
    cor: "bg-mark",
    caixa: "left-[13%] top-[15%] h-[80%] w-[44%]",
    prioridade: true,
  },
  { src: "/fotos/telhado-e-ceu.webp", alt: "", cor: "bg-mark", caixa: "left-[66%] top-0 h-[44%] w-[31%]", pos: "center 60%" },
  { src: "/fotos/fachada-amarela.webp", alt: "", cor: "bg-planta", caixa: "left-[67%] top-[52%] h-[44%] w-[31%]" },
];

/** Estrela de oito pontas, rabiscada. */
function Brilho({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("absolute", className)}>
      <path d="M20 2 L23 15 L35 8 L26 19 L38 22 L25 25 L30 37 L20 28 L10 37 L15 25 L2 22 L14 19 L5 8 L17 15 Z" fill="var(--mark)" />
    </svg>
  );
}

export function HeroColagem({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-[10/9] w-full max-w-lg md:mr-0", className)}>
      {PILULAS.map((p) => (
        <div key={p.src} className={cn("absolute", p.caixa)}>
          <div aria-hidden className={cn("absolute inset-0 -translate-x-3.5 -translate-y-2.5 sm:-translate-x-5 sm:-translate-y-3.5 rounded-full", p.cor)} />
          <div className="relative size-full overflow-hidden rounded-full border-[1.5px] border-ink">
            {/* eslint-disable-next-line @next/next/no-img-element -- export estático, imagens já otimizadas em webp */}
            <img
              src={p.src}
              alt={p.alt}
              fetchPriority={p.prioridade ? "high" : undefined}
              loading={p.prioridade ? undefined : "lazy"}
              decoding="async"
              className="size-full object-cover"
              style={{ objectPosition: p.pos ?? "center" }}
            />
          </div>
        </div>
      ))}

      {/* O voo do João: um rastro tracejado que dá uma volta e chega entre as fotos. */}
      <svg viewBox="0 0 100 90" aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
        <path
          d="M1 44 C6 30 16 30 15 38 C14 46 4 44 8 34 C12 24 26 16 40 12 C48 10 54 9 58 9"
          fill="none"
          stroke="var(--planta-deep)"
          strokeWidth="0.7"
          strokeDasharray="1.6 1.6"
          strokeLinecap="round"
        />
        {/* Raios de "chegou!" no pé, entre as pílulas. */}
        <g stroke="var(--ink)" strokeWidth="0.8" strokeLinecap="round">
          <path d="M60 78 L64 81 M58 83 L63 84 M60 88 L64 86 M65 74 L66 79 M70 89 L68 85" />
        </g>
      </svg>
      <JoaoDeBarro pose="voando" carga="chave" humor="feliz" className="absolute left-[48%] -top-[1%] w-[20%]" />

      <Brilho className="left-[2%] top-[4%] w-[11%]" />
      <Brilho className="left-[4%] top-[80%] w-[6%]" />
    </div>
  );
}
