import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

export const dynamic = "force-static";

/** Manifesto do site: nome, cores e ícones quando salvo na tela inicial do celular. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.nome}: financiamento do primeiro imóvel, explicado`,
    short_name: SITE.nome,
    description: SITE.descricao,
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f3f1",
    theme_color: "#f4d23f",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icone-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icone-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
    ],
  };
}
