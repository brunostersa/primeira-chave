import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Eyebrow } from "@/components/ui/badge";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { CopiarLegenda } from "@/components/duvide/Compartilhar";
import { CARTAS, VEREDITOS } from "@/lib/conteudo/duvide";
import { metadadosPagina } from "@/lib/seo";

export const metadata: Metadata = metadadosPagina({
  titulo: "Posts prontos para corretor: imóvel e financiamento",
  descricao: "Posts prontos para corretor de imóveis: cards sobre financiamento, contrato de gaveta, ágio e avaliação, com legenda para copiar e imagem para baixar.",
  slug: "/duvide/corretor/",
  capa: { url: "/cartas/aprovado-fechado.jpg", alt: "Post para corretor: crédito aprovado é venda fechada? Armadilha.", width: 1080, height: 1350 },
});

/** O ambiente do corretor: as cartas como posts prontos, com legenda e imagem para baixar. */
export default function CorretorPage() {
  const ordem = [...CARTAS].sort((a, b) => Number(b.publico.includes("corretor")) - Number(a.publico.includes("corretor")));
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-10 pt-12 sm:px-6">
      <header className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <Eyebrow>Para corretores</Eyebrow>
          <h1 className="font-display text-[clamp(36px,5.6vw,60px)] font-light leading-[1.02]">
            Posts prontos que <span className="marca-texto font-semibold">educam o seu cliente.</span>
          </h1>
          <p className="max-w-xl text-lg text-ink-2">
            Cliente que entende financiamento fecha mais rápido. Baixe o card (1080×1350, no formato do Instagram), copie a legenda e poste. Pode usar à vontade: a
            marca no card leva o cliente às explicações completas.
          </p>
          <p className="text-[15px]">
            Veja também{" "}
            <Link href="/para/corretor/" className="font-semibold underline underline-offset-4">
              o que mais a Primeira Chave tem para o corretor
            </Link>
            .
          </p>
          <ul className="flex flex-wrap gap-2 font-mono text-[13px]">
            {["Formato 4:5 do feed", "Legenda pronta", "Grátis, sem cadastro"].map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface px-3 py-1.5">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <JoaoDeBarro pose="comemora" humor="feliz" className="w-40 justify-self-center md:w-52" />
      </header>

      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {ordem.map((c) => (
          <li key={c.id} className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-4">
            <Link href={`/duvide/${c.id}/`}>
              <Image src={`/cartas/${c.id}.webp`} alt={`Post: “${c.frase}” ${VEREDITOS[c.veredito].rotulo}.`} width={1080} height={1350} sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="h-auto w-full rounded-xl border border-line" />
            </Link>
            <details className="group">
              <summary className="cursor-pointer list-none text-sm font-semibold underline underline-offset-4 [&::-webkit-details-marker]:hidden">Ver a legenda</summary>
              <p className="mt-2 whitespace-pre-line text-sm text-ink-2">{c.legenda}</p>
            </details>
            <div className="mt-auto flex flex-wrap gap-2">
              <a href={`/cartas/${c.id}.jpg`} download={`primeira-chave-${c.id}.jpg`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border-[1.5px] border-ink bg-mark px-4 text-[15px] font-semibold">
                <Download aria-hidden className="size-4" />
                Baixar
              </a>
              <CopiarLegenda legenda={c.legenda} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
