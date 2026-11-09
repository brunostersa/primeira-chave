import { conhecimento } from "@/lib/joao/conhecimento";
import { fonteDoTexto, ultimaAlteracao } from "@/lib/ultima-alteracao";

export const dynamic = "force-static";

/** /joao/conhecimento.json: as páginas em trechos, lidas pelo Hub para o João buscar e citar. */
export function GET() {
  return Response.json(conhecimento((n) => {
    const fonte = fonteDoTexto(n.id);
    return fonte ? ultimaAlteracao(fonte) : undefined;
  }));
}
