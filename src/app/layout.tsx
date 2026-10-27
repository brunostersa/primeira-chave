import type { Metadata } from "next";
import Script from "next/script";
import { Figtree, IBM_Plex_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { FUNDADOR, SITE } from "@/lib/site-config";

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
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png`, width: 512, height: 512 },
      founder: {
        "@type": "Person",
        "@id": `${SITE.url}/sobre/#fundador`,
        name: FUNDADOR.nome,
        jobTitle: FUNDADOR.cargo,
        image: `${SITE.url}${FUNDADOR.foto}`,
        url: `${SITE.url}/sobre/`,
        sameAs: [FUNDADOR.perfil],
        description: "Compra imóveis usados, reforma e revende, e arremata imóveis em leilão. Trabalhou com experiência do cliente no setor financeiro.",
      },
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Primeira Chave: financiamento do primeiro imóvel, explicado" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  // Prévia grande de imagem e trecho completo: é o que o Google usa no Discover e nos resultados ricos.
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  applicationName: SITE.nome,
  category: "finance",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${figtree.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtm}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">
          {`if(location.hostname.endsWith(${JSON.stringify(new URL(SITE.url).hostname)})){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(SITE.gtm)});}`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }} />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
