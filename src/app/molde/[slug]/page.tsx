import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOLDES } from "@/components/moldes/moldes";

export const metadata: Metadata = { title: "Molde", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return MOLDES.map((m) => ({ slug: m.slug }));
}

/** Molde em tamanho real, sem cabeçalho: pronto para virar PNG. */
export default async function MoldePage({ params }: PageProps<"/molde/[slug]">) {
  const { slug } = await params;
  const molde = MOLDES.find((m) => m.slug === slug);
  if (!molde) notFound();
  const { Componente } = molde;
  return (
    <div id="molde" style={{ width: molde.w, height: molde.h }}>
      <Componente />
    </div>
  );
}
