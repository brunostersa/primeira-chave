import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Secoes } from "@/components/conteudo/Blocos";
import { faqJsonLd, Perguntas } from "@/components/conteudo/pecas";
import { Simulador } from "@/components/simulador/Simulador";
import { no } from "@/lib/conteudo/links";
import { TEXTOS } from "@/lib/conteudo/textos";
import { SITE } from "@/lib/site-config";

/** O simulador único do site: a ferramenta em cima, as regras da Caixa e as perguntas embaixo. */

const n = no("simulador");
const texto = TEXTOS.simulador;

export const metadata: Metadata = {
  title: texto.tituloSeo ?? n.titulo,
  description: texto.descricao,
  alternates: { canonical: n.slug },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Simulador de financiamento Primeira Chave",
      url: `${SITE.url}${n.slug}`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      publisher: { "@id": `${SITE.url}/#org` },
    },
    faqJsonLd(texto.faq),
  ],
};

export default function SimuladorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Breadcrumbs id="simulador" />
      <Simulador />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 pb-20 sm:px-6">
        <Secoes secoes={texto.secoes} />
        <Perguntas faq={texto.faq} />
      </div>
    </>
  );
}
