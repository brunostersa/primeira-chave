import Link from "next/link";
import { LogoNome } from "@/components/brand/Logo";
import { menuPrincipal, nucleo } from "@/lib/navegacao";
import { Menu } from "./Menu";

/** Cabeçalho fixo no topo. Os hubs vêm da árvore de conteúdo; o CTA leva ao núcleo (simulador). */
export function Header() {
  const simulador = nucleo();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Link href="/" aria-label="Primeira Chave, página inicial" className="shrink-0 text-[19px] no-underline sm:text-[22px]">
          <LogoNome />
        </Link>
        <Menu hubs={menuPrincipal()} simular={{ href: simulador.slug, titulo: simulador.titulo }} />
      </div>
    </header>
  );
}
