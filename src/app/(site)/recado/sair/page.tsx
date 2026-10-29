import type { Metadata } from "next";
import { SairDaLista } from "@/components/recado/SairDaLista";

export const metadata: Metadata = { title: "Sair da lista do Recado do João", robots: { index: false, follow: false } };

/** Link "sair da lista" dos e-mails. O token vem na URL (?t=) e é lido no navegador (site estático). */
export default function SairPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-start gap-5 px-4 py-16 sm:px-6">
      <SairDaLista />
    </section>
  );
}
