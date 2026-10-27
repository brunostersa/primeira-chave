import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/badge";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { AvatarPersona } from "@/components/personas/Avatar";
import { PERSONAS } from "@/lib/conteudo/personas";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = metadadosPagina({
  titulo: "Quem é quem na fila do pão? Profissionais do imóvel",
  descricao: "Corretor, correspondente, agente de financiamento, investidor, construtor e imobiliária: o que a Primeira Chave entrega para quem trabalha com o comprador.",
  slug: "/para/",
});

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Quem é quem na fila do pão?",
  url: `${SITE.url}/para/`,
  inLanguage: "pt-BR",
  hasPart: PERSONAS.map((p) => ({ "@type": "WebPage", name: p.titulo, url: `${SITE.url}/para/${p.id}/` })),
};

export default function ParaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-10 pt-12 sm:px-6">
        <header className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>O mercado imobiliário, papel por papel</Eyebrow>
            <h1 className="font-display text-[clamp(38px,5.8vw,64px)] font-light leading-[1.02]">
              Quem é quem <span className="marca-texto font-semibold">na fila do pão?</span>
            </h1>
            <p className="max-w-xl text-lg text-ink-2">
              Corretor, correspondente, agente de financiamento, investidor, construtor, imobiliária: cada um tem um papel na compra do imóvel. Quem trabalha com o
              comprador ganha tempo aqui, porque o cliente que entende financiamento chega pronto e não derruba o negócio na reta final. Escolha o seu papel.
            </p>
          </div>
          <JoaoDeBarro pose="chave" className="w-40 justify-self-center md:w-56" />
        </header>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PERSONAS.map((p) => (
            <li key={p.id}>
              <Link
                href={`/para/${p.id}/`}
                className="group flex h-full flex-col gap-3 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5 shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
              >
                <AvatarPersona id={p.id} className="w-20" />
                <b className="font-display text-2xl leading-tight">{p.quem}</b>
                <span className="text-[15px] text-ink">{p.papel}</span>
                <span className="text-[15px] text-ink-2">{p.promessa}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 font-semibold underline underline-offset-4">
                  Ver o que tem para você <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
