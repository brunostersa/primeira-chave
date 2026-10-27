import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Fica fora do grupo (site), então monta o cabeçalho e o rodapé por conta própria.
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        <section className="mx-auto flex max-w-xl flex-col items-start gap-5 px-4 py-24 sm:px-6">
          <JoaoDeBarro pose="frente" className="w-32" />
          <h1 className="font-display text-4xl font-light">Essa porta não abre.</h1>
          <p className="text-ink-2">A página que você procurou não existe ou mudou de endereço.</p>
          <Button asChild>
            <Link href="/">Voltar ao início</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
