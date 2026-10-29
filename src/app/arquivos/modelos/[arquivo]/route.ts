import { montarDocumento } from "@/lib/modelos/documento";
import { gerarDocx } from "@/lib/modelos/docx";
import { MODELOS, modeloPorArquivo } from "@/lib/modelos/modelos";
import { gerarPdf } from "@/lib/modelos/pdf";

/**
 * Os modelos em branco, gerados no build como arquivos estáticos:
 * /arquivos/modelos/<arquivo>.docx e .pdf. Mesma fonte da página (src/lib/modelos).
 */

export const dynamic = "force-static";
export const dynamicParams = false;

const TIPOS = {
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
} as const;

export function generateStaticParams() {
  return MODELOS.flatMap((m) => (["docx", "pdf"] as const).map((f) => ({ arquivo: `${m.arquivo}.${f}` })));
}

export async function GET(_req: Request, { params }: { params: Promise<{ arquivo: string }> }) {
  const { arquivo } = await params;
  const [, nome, formato] = arquivo.match(/^(.+)\.(docx|pdf)$/) ?? [];
  const m = nome ? modeloPorArquivo(nome) : undefined;
  if (!m || (formato !== "docx" && formato !== "pdf")) return new Response("Não encontrado", { status: 404 });
  const doc = montarDocumento(m);
  const bytes = formato === "docx" ? gerarDocx(doc, m.tituloDocumento) : gerarPdf(doc, m.tituloDocumento);
  return new Response(bytes as BodyInit, {
    headers: { "content-type": TIPOS[formato], "content-disposition": `attachment; filename="${m.arquivo}.${formato}"` },
  });
}
