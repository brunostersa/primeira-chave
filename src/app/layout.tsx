import type { Metadata } from "next";
import { Figtree, IBM_Plex_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site-config";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--font-outfit", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-figtree", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#org`,
      name: SITE.nome,
      url: SITE.url,
      description: SITE.descricao,
      sameAs: [SITE.instagram],
      parentOrganization: { "@type": "Organization", name: "CustomerHub", url: "https://customerhub.com.br" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#site`,
      name: SITE.nome,
      url: SITE.url,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE.url}/#org` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Primeira Chave · Financiamento do primeiro imóvel, explicado",
    template: "%s · Primeira Chave",
  },
  description: SITE.descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.nome,
    url: SITE.url,
    title: "Primeira Chave · Financiamento do primeiro imóvel, explicado",
    description: SITE.descricao,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${figtree.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }} />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
