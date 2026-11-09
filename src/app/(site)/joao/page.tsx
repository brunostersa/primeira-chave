import type { Metadata } from "next";
import { Joao } from "@/components/joao/Joao";

export const metadata: Metadata = {
  title: { absolute: "Pergunta pro João · Primeira Chave" },
  description: "Tire dúvidas sobre a compra do imóvel em Goiânia, organize o seu plano e acompanhe cada etapa até as chaves.",
  robots: { index: false, follow: false },
};

/** Beta fechada: fora do menu e do sitemap. Regras e fases em docs/joao/README.md. */
export default function JoaoPage() {
  return <Joao />;
}
