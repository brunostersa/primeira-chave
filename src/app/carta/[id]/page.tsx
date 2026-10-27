import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartaPost } from "@/components/duvide/CartaPost";
import { CARTAS, cartaPorId } from "@/lib/conteudo/duvide";

export const metadata: Metadata = { title: "Carta", robots: { index: false, follow: false } };
export const dynamicParams = false;

export function generateStaticParams() {
  return CARTAS.map((c) => ({ id: c.id }));
}

/** A carta do "Duvide." em tamanho de post, sem cabeçalho: o script tira o print. */
export default async function CartaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const carta = cartaPorId(id);
  if (!carta) notFound();
  return <CartaPost carta={carta} />;
}
