import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Ilustracao } from "@/components/brand/ilustracoes";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { cardDe, ehFoto, todosOsCards, type CardFoto, type Fundo } from "@/lib/recado/imagens";

export const metadata: Metadata = { title: "Card do e-mail", robots: { index: false, follow: false } };
export const dynamicParams = false;

export function generateStaticParams() {
  return todosOsCards().map(({ id }) => ({ id }));
}

const FUNDO: Record<Fundo, string> = { planta: "bg-planta", marca: "bg-mark-soft", papel: "bg-paper" };

/** A onda de baixo (curva Niemeyer): branco do cartão do e-mail, com borda amarela e traço tinta. */
const CURVA = "M0 272 C90 250 170 296 280 278 C380 262 460 242 560 262";
const ONDA = `${CURVA} V300 H0 Z`;

function CardComFoto({ card }: { card: CardFoto }) {
  const { joao } = card;
  return (
    <div id="figura" className="relative h-[300px] w-[560px] overflow-hidden bg-planta">
      {/* eslint-disable-next-line @next/next/no-img-element -- rota só para o print */}
      <img
        src={`/figura/fotos/${card.foto}.jpg`}
        alt=""
        className="absolute inset-0 size-full object-cover"
        style={{ objectPosition: card.foco ?? "50% 50%", filter: card.tom === "planta" ? "grayscale(1) contrast(1.1) brightness(1.1)" : undefined }}
      />
      {card.tom === "planta" && (
        <>
          <div aria-hidden="true" className="absolute inset-0 mix-blend-color" style={{ background: "var(--planta-deep)" }} />
          <div aria-hidden="true" className="absolute inset-0 bg-planta opacity-60 mix-blend-multiply" />
        </>
      )}
      <svg aria-hidden="true" viewBox="0 0 560 300" className="absolute inset-0 size-full">
        <path d={ONDA} transform="translate(0 -7)" fill="var(--mark)" />
        <path d={ONDA} fill="var(--surface)" />
        <path d={CURVA} fill="none" stroke="var(--ink)" strokeWidth="2" />
      </svg>
      <div className="absolute drop-shadow-[0_2px_0_rgba(18,20,24,.18)]" style={{ left: joao.x, top: joao.y, width: joao.largura }}>
        <JoaoDeBarro pose={joao.pose} carga={joao.carga} humor={joao.humor} virado={joao.virado} giro={joao.giro} className="w-full" />
      </div>
    </div>
  );
}

/**
 * O card de imagem do topo dos e-mails do Recado, em 560×300 (o script exporta em 2x).
 * Com foto: foto cheia, onda embaixo e o João por cima. Só cena: o desenho sobre a faixa de ladrilho.
 */
export default async function CardEmailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = cardDe(id);
  if (!card) notFound();
  if (ehFoto(card)) return <CardComFoto card={card} />;
  return (
    <div id="figura" className={`relative h-[300px] w-[560px] overflow-hidden ${FUNDO[card.fundo]}`}>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-7 bg-ladrilho" />
      <div className="absolute bottom-7 left-1/2 w-[360px] -translate-x-1/2">
        <Ilustracao nome={card.cena} />
      </div>
    </div>
  );
}
