import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Infografico } from "@/components/conteudo/Infografico";
import { todasAsFiguras } from "@/lib/conteudo/figuras";

export const metadata: Metadata = { title: "Figura", robots: { index: false, follow: false } };
export const dynamicParams = false;

export function generateStaticParams() {
  return todasAsFiguras().map(({ pagina, figura }) => ({ pagina, id: figura.id }));
}

/** O infográfico em tamanho real, sem cabeçalho: o script tira o print e vira WebP. */
export default async function FiguraPage({ params }: { params: Promise<{ pagina: string; id: string }> }) {
  const { pagina, id } = await params;
  const item = todasAsFiguras().find((f) => f.pagina === pagina && f.figura.id === id);
  if (!item) notFound();
  return (
    <div id="figura">
      <Infografico figura={item.figura} />
    </div>
  );
}
