import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PassaroDePassagem } from "@/components/brand/PassaroDePassagem";
import { RevoadaSurpresa } from "@/components/brand/RevoadaSurpresa";
import { RecadoFlutuante } from "@/components/recado/RecadoFlutuante";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
      <PassaroDePassagem />
      <RevoadaSurpresa />
      <RecadoFlutuante />
    </>
  );
}
