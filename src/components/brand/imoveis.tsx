import { cn } from "@/components/ui/utils";

/**
 * Os imóveis da marca, no mesmo traço do João-de-barro: fachadas modernas (laje plana,
 * volumes retos, ripado), nada de "casinha de telhado". Cores pelos papéis da marca:
 * azul planta = a casa, branco = volume, amarelo só onde há dinheiro (puxador, etiqueta).
 *
 * Desenhadas no quadro das cenas (240×160, chão em y=150) para compor com o pássaro.
 * Pontos de pouso do pássaro: casa = laje de cima (x 66–172, y 62); apartamento = varandas
 * (y 48, 72, 96) e laje do topo (y 22).
 */

const TINTA = "var(--ink)";
const S = { stroke: TINTA, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const LAJE = { fill: TINTA, stroke: "none" };

/** Sobrado moderno: térreo azul, volume de cima em balanço sobre a garagem, ripado. */
export function CasaForma({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      {/* térreo */}
      <rect x="40" y="104" width="96" height="46" fill="var(--planta)" {...S} />
      {/* volume de cima, em balanço */}
      <rect x="66" y="66" width="102" height="34" fill="var(--surface)" {...S} />
      {/* lajes finas */}
      <rect x="62" y="61" width="111" height="5" rx="1" {...LAJE} />
      <rect x="34" y="100" width="139" height="4.5" rx="1" {...LAJE} />
      {/* pilar da garagem */}
      <path d="M169 104 V150" {...S} strokeWidth={2.8} fill="none" />
      {/* janelão */}
      <rect x="72" y="72" width="64" height="21" rx="1" fill="var(--paper)" {...S} strokeWidth={1.8} />
      <path d="M93 72 V93 M115 72 V93" {...S} strokeWidth={1.6} fill="none" />
      <path d="M76 89 L82 77 M83 89 L87 81" {...S} strokeWidth={1.2} opacity={0.45} fill="none" />
      {/* ripado de madeira */}
      <path d={Array.from({ length: 7 }, (_, k) => `M${142 + k * 4} 70 V96`).join(" ")} {...S} strokeWidth={1.4} fill="none" />
      {/* porta pivotante, puxador em marca-texto */}
      <rect x="46" y="111" width="17" height="39" rx="1" fill="var(--surface)" {...S} strokeWidth={1.8} />
      <path d="M58.5 124 V137" stroke="var(--mark)" strokeWidth={3.2} strokeLinecap="round" />
      {/* janela do térreo */}
      <rect x="72" y="114" width="56" height="22" rx="1" fill="var(--paper)" {...S} strokeWidth={1.8} />
      <path d="M100 114 V136" {...S} strokeWidth={1.6} fill="none" />
      {/* vaso */}
      <path d="M18 150 L20 140 H30 L32 150 Z" fill="var(--surface)" {...S} strokeWidth={1.8} />
      <path d="M25 140 C24 132 21 128 16 126 M25 140 C26 131 29 127 34 125 M25 140 V127" {...S} strokeWidth={1.6} fill="none" />
    </g>
  );
}

/** Prédio baixo e moderno: quatro andares com varanda de vidro, caixa de escada com ripado. */
export function ApartamentoForma({ transform }: { transform?: string }) {
  const andares = [24, 48, 72, 96];
  return (
    <g transform={transform}>
      {/* caixa de escada, azul planta */}
      <rect x="150" y="34" width="34" height="116" fill="var(--planta)" {...S} />
      <path d={Array.from({ length: 6 }, (_, k) => `M${156 + k * 4.5} 46 V138`).join(" ")} {...S} strokeWidth={1.3} fill="none" />
      {/* bloco */}
      <rect x="62" y="24" width="88" height="126" fill="var(--surface)" {...S} />
      {/* lajes e varandas */}
      <rect x="56" y="20" width="98" height="5" rx="1" {...LAJE} />
      {andares.slice(1).map((y) => (
        <g key={y}>
          <rect x="56" y={y} width="98" height="4" rx="1" {...LAJE} />
          {/* guarda-corpo de vidro */}
          <path d={`M56 ${y} V${y - 9} H104 V${y}`} {...S} strokeWidth={1.4} fill="var(--planta)" fillOpacity={0.35} />
        </g>
      ))}
      {/* janelas de cada andar */}
      {andares.map((y) => (
        <g key={y}>
          <rect x="70" y={y + 6} width="26" height={y === 96 ? 16 : 13} rx="1" fill="var(--paper)" {...S} strokeWidth={1.6} />
          <rect x="112" y={y + 6} width="30" height="13" rx="1" fill="var(--paper)" {...S} strokeWidth={1.6} />
          <path d={`M127 ${y + 6} V${y + 19}`} {...S} strokeWidth={1.2} fill="none" />
        </g>
      ))}
      {/* térreo: portaria de vidro */}
      <rect x="62" y="120" width="88" height="4" rx="1" {...LAJE} />
      <rect x="92" y="128" width="30" height="22" rx="1" fill="var(--paper)" {...S} strokeWidth={1.8} />
      <path d="M107 128 V150" {...S} strokeWidth={1.4} fill="none" />
      <path d="M103.5 136 V142" stroke="var(--mark)" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M68 136 H86 M128 136 H144" {...S} strokeWidth={1.4} fill="none" />
      {/* árvore fina */}
      <path d="M32 150 V112" {...S} fill="none" />
      <ellipse cx="32" cy="98" rx="15" ry="22" fill="var(--surface)" {...S} />
      <path d="M32 116 V92 M32 104 L25 97 M32 99 L39 92" {...S} strokeWidth={1.4} fill="none" />
    </g>
  );
}

export type TipoImovel = "casa" | "apartamento";

/** O imóvel sozinho, recortado, para usar fora das cenas (cards, moldes, posts). */
export function Imovel({ tipo, className, titulo }: { tipo: TipoImovel; className?: string; titulo?: string }) {
  const caixa = tipo === "casa" ? "10 54 176 102" : "20 14 170 142";
  return (
    <svg viewBox={caixa} className={cn("h-auto w-full overflow-visible", className)} role={titulo ? "img" : undefined} aria-label={titulo} aria-hidden={titulo ? undefined : true}>
      <path d={tipo === "casa" ? "M10 150 H186" : "M20 150 H190"} {...S} strokeWidth={2} fill="none" />
      {tipo === "casa" ? <CasaForma /> : <ApartamentoForma />}
    </svg>
  );
}
