import { feedRecado } from "@/lib/recado/feed";

export const dynamic = "force-static";

/** /recado/feed.json: o conteúdo do Recado do João, lido pelo Hub que monta e envia os e-mails. */
export function GET() {
  return Response.json(feedRecado());
}
