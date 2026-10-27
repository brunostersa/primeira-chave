import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Simulador } from "@/components/simulador/Simulador";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Simulador de financiamento do primeiro imóvel",
  description:
    "Descubra quanto você pode financiar, quanto precisa de entrada e se dá pra comprar sem entrada. Simulação pelas regras da Caixa e do Minha Casa Minha Vida, explicada em português claro.",
  alternates: { canonical: "/simulador/" },
};

const APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Simulador de financiamento Primeira Chave",
  url: `${SITE.url}/simulador/`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  publisher: { "@id": `${SITE.url}/#org` },
};

export default function SimuladorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_JSON_LD) }} />
      <Breadcrumbs id="simulador" />
      <Simulador />
    </>
  );
}
