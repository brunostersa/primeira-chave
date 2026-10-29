import type { Metadata } from "next";
import Link from "next/link";
import { LogoNome } from "@/components/brand/Logo";
import { Poupando } from "@/components/brand/Poupando";
import { IconeLinha } from "@/components/brand/icones";
import { EmailJoao } from "@/components/brand/EmailJoao";
import { Relatar } from "@/components/conteudo/Relatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

/**
 * Link da bio do Instagram. Fora do layout do site (sem menu nem rodapé): é uma tela só, para o celular.
 * A bio aponta para /links/?utm_source=instagram&utm_medium=social&utm_campaign=bio, e cada botão
 * repete a mesma origem com utm_content = qual botão, para o GA4 mostrar o que foi clicado.
 * Fora do Google (noindex): não é página de conteúdo.
 */

export const metadata: Metadata = {
  ...metadadosPagina({
    titulo: "Primeira Chave: links",
    descricao: "Simule o seu financiamento e veja os guias da Primeira Chave.",
    slug: "/links/",
  }),
  robots: { index: false, follow: true },
};

const UTM = { utm_source: "instagram", utm_medium: "social", utm_campaign: "bio" };

const comUtm = (slug: string, conteudo: string) => `${slug}?${new URLSearchParams({ ...UTM, utm_content: conteudo })}`;

const LINKS: { slug: string; utm: string; titulo: string; texto: string; destaque?: boolean }[] = [
  { slug: "/simulador-financiamento-caixa/", utm: "simulador", titulo: "Simule o seu financiamento", texto: "Quanto você pode comprar, quanto falta e o próximo passo.", destaque: true },
  { slug: "/financiar-casa-sem-entrada/", utm: "sem-entrada", titulo: "Dá pra financiar sem entrada?", texto: "O segredo da avaliação acima do preço." },
  { slug: "/quanto-preciso-ganhar-para-financiar/", utm: "quanto-ganhar", titulo: "Quanto preciso ganhar?", texto: "A renda mínima para cada valor de imóvel." },
  { slug: "/documentos-para-financiar-imovel/", utm: "documentos", titulo: "Documentos para financiar", texto: "CLT, MEI, autônomo ou dono de empresa." },
  { slug: "/minha-casa-minha-vida/", utm: "mcmv", titulo: "Minha Casa Minha Vida", texto: "Faixas, juros e quem pode participar." },
  { slug: "/duvide/", utm: "duvide", titulo: "Duvide", texto: "Os mitos do financiamento, desmontados." },
  { slug: "/guias/", utm: "guias", titulo: "Todos os guias", texto: "Na ordem da compra, do quanto posso à chave." },
];

export default function LinksPage() {
  return (
    <main id="conteudo" className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-10">
      <header className="flex flex-col items-center gap-3 text-center">
        <Link href={comUtm("/", "logo")} aria-label="Primeira Chave: página inicial">
          <LogoNome icone className="text-3xl" />
        </Link>
        <p className="text-[15px] text-ink-2">O financiamento do primeiro imóvel, em palavras que dá pra entender.</p>
      </header>

      <Poupando className="mx-auto h-28 w-auto max-w-full" />

      <nav aria-label="Links" className="flex flex-col gap-3">
        {LINKS.map((l) => (
          <Link
            key={l.utm}
            href={comUtm(l.slug, l.utm)}
            data-link-bio={l.utm}
            className={cn(
              buttonVariants({ variant: l.destaque ? "mark" : "outline" }),
              "group h-auto justify-between gap-4 whitespace-normal px-5 py-3.5 text-left",
              l.destaque && "border-[1.5px] border-ink py-4",
            )}
          >
            <span className="flex flex-col gap-0.5">
              <span className={cn("font-display leading-tight", l.destaque ? "text-xl" : "text-base")}>{l.titulo}</span>
              <span className="text-[13px] font-normal text-ink-2">{l.texto}</span>
            </span>
            <IconeLinha nome="seta" className={cn("transition-transform group-hover:translate-x-1", l.destaque ? "size-7" : "size-5")} />
          </Link>
        ))}
      </nav>

      <Relatar contexto="links" tipos={["sugestao"]} className="justify-center" />

      <footer className="mt-auto flex flex-col items-center gap-1 pt-4 text-center font-mono text-xs text-muted">
        <span>Conteúdo educativo. Não somos banco nem correspondente bancário.</span>
        <span className="flex gap-3">
          <EmailJoao className="underline underline-offset-2" />
          <a href={SITE.instagram} className="underline underline-offset-2">@primeirachavebr</a>
        </span>
      </footer>
    </main>
  );
}
