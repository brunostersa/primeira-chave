import Link from "next/link";
import { LogoNome } from "@/components/brand/Logo";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { EmBreve } from "@/components/ui/badge";
import { colunasRodape, nucleo, type ItemNav } from "@/lib/navegacao";
import { SITE } from "@/lib/site-config";

/**
 * Rodapé enxuto: as mesmas 5 portas do menu, só o primeiro nível de cada
 * (em "Comprar", as fases). Todas as páginas ficam a um clique no Mapa do site.
 * No celular cada coluna é um <details> fechado; do md em diante, tudo aberto.
 */
export function Footer() {
  const colunas = colunasRodape();
  const simulador = nucleo();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-4">
            <span className="text-[26px]">
              <LogoNome cota icone />
            </span>
            <p className="max-w-sm text-sm text-ink-2">
              Do zero à chave do seu primeiro imóvel. Conteúdo educativo: não somos banco nem correspondente, e nada aqui é aprovação de crédito.
            </p>
            <Link href={simulador.slug} className="w-fit font-semibold underline underline-offset-4">
              Simular quanto você pode comprar
            </Link>
            <JoaoDeBarro pose="barro" className="mt-2 hidden w-20 md:block" />
          </div>

          <nav aria-label="Rodapé" className="border-t border-line md:border-0">
            <div className="grid md:grid-cols-3 md:gap-x-8 md:gap-y-8 lg:grid-cols-5">
              {colunas.map((c) => (
                <details key={c.id} className="group border-b border-line md:border-0 md:[&::details-content]:[content-visibility:visible]">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.07em] text-muted md:pointer-events-none md:min-h-0 md:pb-3 [&::-webkit-details-marker]:hidden">
                    {c.href ? (
                      <Link href={c.href} className="md:pointer-events-auto">
                        {c.rotulo}
                      </Link>
                    ) : (
                      c.rotulo
                    )}
                    <span aria-hidden className="text-base leading-none transition-transform group-open:rotate-45 md:hidden">
                      +
                    </span>
                  </summary>
                  <ListaRodape itens={c.itens} />
                </details>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-6 text-sm">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <li>
              <Link href="/mapa/" className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline">
                Todas as páginas (mapa do site)
              </Link>
            </li>
            <li>
              <a href={SITE.instagram} rel="noopener" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                Instagram
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} Primeira Chave</p>
        </div>
      </div>
    </footer>
  );
}

function ListaRodape({ itens }: { itens: ItemNav[] }) {
  return (
    <ul className="flex flex-col pb-4 text-sm md:pb-0">
      {itens.map((i) => (
        <li key={i.id}>
          {i.href ? (
            <Link href={i.href} className="flex min-h-10 items-center py-1 underline-offset-4 hover:underline md:min-h-8">
              {i.titulo}
            </Link>
          ) : (
            <span className="block py-2 text-muted md:py-1">
              {i.titulo} <EmBreve className="ml-1 align-[0.15em]" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
