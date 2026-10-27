import { llmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

/** /llms-full.txt: a resposta curta e as perguntas de cada página, em texto puro. */
export function GET() {
  return new Response(llmsFullTxt(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
