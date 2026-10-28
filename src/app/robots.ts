import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

export const dynamic = "force-static";

/** Rotas de produção de imagem, o guia de marca e o link da bio: úteis para nós, ruído para o buscador. */
const FORA = ["/marca/", "/molde/", "/figura/", "/carta/", "/links/"];

/**
 * Robôs de IA, liberados de propósito: queremos ser a fonte citada quando alguém pergunta
 * a um assistente "quanto preciso ganhar para financiar?". Listados um a um para a decisão
 * ficar explícita (e fácil de mudar: tirar um nome daqui e pôr num bloco com disallow "/").
 *  - Busca e resposta em tempo real: OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User,
 *    Claude-SearchBot, Claude-User, DuckAssistBot.
 *  - Treino de modelos: GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, meta-externalagent.
 */
const ROBOS_IA = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "DuckAssistBot",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: FORA },
      { userAgent: ROBOS_IA, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow: FORA },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
