import type { ReactNode } from "react";
import { cn } from "@/components/ui/utils";
import { NinhoForma, Passaro } from "./JoaoDeBarro";

/**
 * Biblioteca de cenas do João-de-barro (quadro 240×160, chão em y=150).
 * Regra de cor: traço = gente/pássaro; amarelo = dinheiro; azul planta = banco, papéis e a casa.
 */

const TINTA = "var(--ink)";
const S = { stroke: TINTA, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Posiciona o pássaro com os pés no chão (y=150). */
const pe = (x: number, escala = 1, chao = 150) => `translate(${x} ${chao - 84 * escala}) scale(${escala})`;

function Chao() {
  return <path d="M6 150 H234" {...S} strokeWidth={2} fill="none" />;
}

function Papel({ x, y, w = 44, h = 56, rot = 0, linhas = 3 }: { x: number; y: number; w?: number; h?: number; rot?: number; linhas?: number }) {
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x} y={y} width={w} height={h} rx="3" fill="var(--planta)" {...S} />
      {Array.from({ length: linhas }, (_, k) => (
        <path key={k} d={`M${x + 8} ${y + 14 + k * 11} H${x + w - (k === linhas - 1 ? 18 : 8)}`} {...S} strokeWidth={1.6} fill="none" />
      ))}
    </g>
  );
}

function Cena({ children, titulo, className }: { children: ReactNode; titulo?: string; className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={cn("h-auto w-full", className)} role={titulo ? "img" : undefined} aria-label={titulo} aria-hidden={titulo ? undefined : true}>
      {children}
    </svg>
  );
}

export const CENAS = {
  "juntar-entrada": {
    titulo: "Juntando a entrada",
    uso: "Reserva, poupança, plano mês a mês.",
    Desenho: () => (
      <>
        <Chao />
        <NinhoForma construido={0.55} transform="translate(128 80) scale(1.05)" />
        <Passaro pose="voando" carga="barro" humor="feliz" transform="translate(14 22)" />
      </>
    ),
  },
  avaliacao: {
    titulo: "O banco avalia o imóvel",
    uso: "Avaliação, laudo, preço × avaliação.",
    Desenho: () => (
      <>
        <Chao />
        <NinhoForma transform="translate(132 80) scale(1.05)" />
        <g stroke="var(--muted)" strokeWidth="1.4" fill="none">
          <path d="M138 70 H228 M138 64 V76 M228 64 V76" />
        </g>
        <text x="183" y="58" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={TINTA}>
          R$ 125 mil
        </text>
        <Passaro pose="parado" humor="curioso" transform={pe(4)} />
      </>
    ),
  },
  documentos: {
    titulo: "Organizando os documentos",
    uso: "Checklist, documentos do comprador e do vendedor.",
    Desenho: () => (
      <>
        <Chao />
        <Papel x={150} y={84} rot={-8} />
        <Papel x={168} y={78} rot={6} />
        <Papel x={158} y={88} />
        <circle cx="200" cy="90" r="11" fill="var(--mark)" {...S} />
        <path d="M195 90 L199 94 L206 86" {...S} fill="none" />
        <Passaro pose="frente" humor="feliz" transform={pe(20)} />
      </>
    ),
  },
  banco: {
    titulo: "Indo ao banco",
    uso: "Aprovação de crédito, correspondente, agência.",
    Desenho: () => (
      <>
        <Chao />
        <g {...S}>
          <path d="M136 72 L184 48 L232 72 Z" fill="var(--planta)" />
          <rect x="140" y="72" width="88" height="8" fill="var(--planta)" />
          {[150, 170, 190, 210].map((x) => (
            <rect key={x} x={x} y="80" width="8" height="62" fill="var(--surface)" />
          ))}
          <rect x="136" y="142" width="96" height="8" fill="var(--planta)" />
        </g>
        <Passaro pose="barro" humor="curioso" transform={pe(8)} />
      </>
    ),
  },
  fgts: {
    titulo: "O cofre do FGTS",
    uso: "Saldo, uso na entrada, amortização.",
    Desenho: () => (
      <>
        <Chao />
        <g {...S}>
          <rect x="150" y="78" width="76" height="66" rx="8" fill="var(--mark)" />
          <circle cx="188" cy="110" r="15" fill="var(--surface)" />
          <path d="M188 99 V110 L196 116" fill="none" />
          <path d="M160 144 V150 M216 144 V150" fill="none" />
        </g>
        <text x="188" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={TINTA}>
          FGTS
        </text>
        <Passaro pose="frente" carga="barro" humor="surpreso" transform={pe(14)} />
      </>
    ),
  },
  "nome-limpo": {
    titulo: "Conferindo o CPF",
    uso: "Nome limpo, score, Registrato.",
    Desenho: () => (
      <>
        <Chao />
        <g {...S}>
          <rect x="140" y="70" width="88" height="56" rx="6" fill="var(--planta)" />
          <circle cx="160" cy="92" r="9" fill="var(--surface)" />
          <path d="M176 86 H214 M176 98 H204 M150 114 H214" fill="none" strokeWidth={1.6} />
          <circle cx="212" cy="112" r="16" fill="var(--surface)" fillOpacity="0.6" />
          <path d="M224 124 L236 136" fill="none" strokeWidth={3.4} />
        </g>
        <text x="152" y="66" fontFamily="var(--font-mono)" fontSize="10" fill={TINTA}>
          CPF
        </text>
        <Passaro pose="parado" humor="pensativo" transform={pe(8)} />
      </>
    ),
  },
  assinatura: {
    titulo: "Assinando o contrato",
    uso: "Contrato, cartório, escritura.",
    Desenho: () => (
      <>
        <Chao />
        <Papel x={142} y={74} w={64} h={76} linhas={4} />
        <path d="M152 136 C158 126 162 142 168 132 C172 126 176 138 186 130" {...S} fill="none" />
        <g {...S}>
          <path d="M196 132 L222 96 L230 102 L204 138 Z" fill="var(--mark)" />
          <path d="M196 132 L193 142 L204 138" fill="var(--surface)" />
        </g>
        <Passaro pose="parado" humor="feliz" transform={pe(6)} />
      </>
    ),
  },
  "a-chave": {
    titulo: "A chave é sua",
    uso: "Conquista, fim da trilha, depoimentos.",
    Desenho: () => (
      <>
        <Chao />
        <NinhoForma transform="translate(70 80) scale(1.05)" />
        <Passaro pose="comemora" humor="feliz" transform={pe(64, 0.82, 89)} />
      </>
    ),
  },
  negado: {
    titulo: "Crédito negado",
    uso: "Recusa, o que fazer, tentar de novo.",
    Desenho: () => (
      <>
        <Chao />
        <Papel x={150} y={80} w={64} h={64} linhas={3} />
        <g transform="rotate(-14 182 112)">
          <rect x="156" y="100" width="54" height="22" rx="4" fill="none" stroke="var(--bad)" strokeWidth="2.6" />
          <text x="183" y="116" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--bad)">
            NEGADO
          </text>
        </g>
        <g {...S} fill="var(--mark)">
          <path d="M112 146 L118 138 L124 146 Z" />
          <path d="M126 148 L130 141 L136 148 Z" />
        </g>
        <Passaro pose="frente" humor="triste" transform={pe(2)} />
      </>
    ),
  },
  vender: {
    titulo: "Passando a chave",
    uso: "Vender um usado, comprador e vendedor.",
    Desenho: () => (
      <>
        <Chao />
        <Passaro pose="chave" humor="piscando" transform={pe(-2, 0.92)} />
        <Passaro pose="parado" humor="feliz" virado transform={pe(128, 0.92)} />
      </>
    ),
  },
  calcular: {
    titulo: "Fazendo a conta",
    uso: "Simulador, renda, parcela, quanto preciso ganhar.",
    Desenho: () => (
      <>
        <Chao />
        <g {...S}>
          <rect x="160" y="62" width="62" height="86" rx="8" fill="var(--planta)" />
          <rect x="168" y="70" width="46" height="20" rx="3" fill="var(--surface)" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={170 + c * 15} y={98 + r * 15} width="10" height="10" rx="2" fill={r === 2 && c === 2 ? "var(--mark)" : "var(--surface)"} strokeWidth={1.6} />),
          )}
        </g>
        <text x="209" y="85" textAnchor="end" fontFamily="var(--font-mono)" fontSize="11" fill={TINTA}>
          30%
        </text>
        <Passaro pose="frente" humor="pensativo" transform={pe(22)} />
      </>
    ),
  },
  prazo: {
    titulo: "Contando os dias",
    uso: "Quanto tempo demora, prazos de cada etapa.",
    Desenho: () => (
      <>
        <Chao />
        <g {...S}>
          <rect x="146" y="66" width="80" height="78" rx="6" fill="var(--surface)" />
          <path d="M146 84 H226" fill="none" />
          <rect x="146" y="66" width="80" height="18" rx="6" fill="var(--planta)" />
          <path d="M162 60 V72 M210 60 V72" fill="none" />
          {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={160 + c * 17} cy={98 + r * 15} r="2" fill={TINTA} stroke="none" />))}
          <circle cx="194" cy="128" r="8" fill="none" stroke="var(--mark)" strokeWidth="3" />
        </g>
        <Passaro pose="bicando" humor="curioso" transform={pe(8)} />
      </>
    ),
  },
} as const;

export type NomeCena = keyof typeof CENAS;

export function Ilustracao({ nome, className, titulo }: { nome: NomeCena; className?: string; titulo?: string }) {
  const { Desenho } = CENAS[nome];
  return (
    <Cena className={className} titulo={titulo}>
      <Desenho />
    </Cena>
  );
}
