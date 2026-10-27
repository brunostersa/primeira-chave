import { llmsTxt } from "@/lib/llms";

export const dynamic = "force-static";

/** /llms.txt: o mapa do site para assistentes de IA (llmstxt.org). */
export function GET() {
  return new Response(llmsTxt(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
