import type { Metadata } from "next";
import { TrocarFase } from "@/components/recado/TrocarFase";

export const metadata: Metadata = { title: "Mudar a sua fase no Recado do João", robots: { index: false, follow: false } };

/** Link "Em que fase você está agora?" dos e-mails. Token (?t=) e fase sugerida (?f=) são lidos no navegador (site estático). */
export default function FasePage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-start gap-5 px-4 py-16 sm:px-6">
      <TrocarFase />
    </section>
  );
}
