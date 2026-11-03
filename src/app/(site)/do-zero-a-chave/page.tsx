import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Download } from "lucide-react";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { BaixarGuia } from "@/components/recado/BaixarGuia";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { metadadosPagina } from "@/lib/seo";

export const metadata: Metadata = metadadosPagina({
  titulo: "Do zero à chave: o guia grátis do primeiro imóvel (PDF)",
  descricao:
    "A compra do primeiro imóvel em 5 fases, com as regras da Caixa explicadas em palavras que dá pra entender. 36 páginas, os checklists das 5 fases e as armadilhas que ninguém conta. Grátis.",
  slug: "/do-zero-a-chave/",
});

/**
 * LP da AMOSTRA do guia "Do zero à chave" (36 páginas; o livro sai de infoproduto/gerar.mjs amostra).
 * Grátis em troca do e-mail, que entra no Recado do João. O CTA do fim do simulador aponta para cá.
 * O guia completo (79 páginas) vem depois: não coloque o PDF completo em public/.
 * Ao regerar a amostra, copie para public/guia/ e refaça as prévias (pdftoppm -jpeg -r 110).
 */

const LEVA = [
  "36 páginas, com a fase 1 inteira",
  "Os checklists das 5 fases",
  "3 frases para desconfiar",
];

const FASES = [
  {
    n: 1,
    titulo: "Antes de começar",
    texto:
      "Quanto a sua renda compra, quanto juntar de entrada e se o Minha Casa Minha Vida é para você.",
  },
  {
    n: 2,
    titulo: "Aprovar o crédito",
    texto:
      "Os documentos de cada tipo de renda, o score e o que fazer se o banco disser não.",
  },
  {
    n: 3,
    titulo: "Escolher o imóvel",
    texto:
      "A avaliação do banco, a matrícula e o segredo para pagar menos entrada.",
  },
  {
    n: 4,
    titulo: "Contrato e chaves",
    texto:
      "Assinatura, ITBI, cartório e registro: quem paga o quê e em que ordem.",
  },
  {
    n: 5,
    titulo: "Depois da chave",
    texto: "Usar o FGTS para abater a dívida e quando vale amortizar.",
  },
];

const DENTRO = [
  "Os dez números que decidem a compra, conferidos no simulador da Caixa",
  "O mapa das 5 fases, do primeiro cálculo até a chave",
  "A fase 1 inteira: quanto ganhar, faixas do Minha Casa Minha Vida, FGTS e documentos",
  "Os checklists das 5 fases, para marcar e levar ao banco",
  "3 frases para desconfiar, do Duvide",
];

const PAGINAS = [
  {
    src: "/guia/pagina-4.jpg",
    alt: "Página com os dez números que decidem a compra",
  },
  {
    src: "/guia/pagina-6.jpg",
    alt: "Página com o mapa das cinco fases da compra",
  },
  {
    src: "/guia/pagina-25.jpg",
    alt: "Página com o checklist da fase Antes de começar",
  },
];

const PERGUNTAS = [
  {
    q: "É grátis mesmo?",
    a: "É. Você deixa o seu e-mail, baixa o PDF na hora e passa a receber o Recado do João, um e-mail curto por semana. Para sair, é um clique.",
  },
  {
    q: "O que tem no guia que não está no site?",
    a: "O conteúdo é o mesmo do site. A diferença é a ordem: tudo num lugar só, fase por fase, com checklist, para ler no celular ou imprimir.",
  },
  {
    q: "Tem a versão completa?",
    a: "Tem: as 5 fases inteiras, com 79 páginas. Ela sai em breve, e quem recebe o Recado do João fica sabendo primeiro.",
  },
  {
    q: "Serve para quem não vai pela Caixa?",
    a: "Serve. As regras de renda, avaliação, documentos e cartório valem para os bancos em geral. Onde a Caixa é diferente, o guia avisa.",
  },
];

/** Mockup da cartilha: a capa amarela com uma casa de verdade (foto Unsplash, licença livre). */
function CapaGuia({ className }: { className?: string }) {
  return (
    <div className={`@container ${className ?? ""}`}>
      <div className="flex aspect-[909/1287] flex-col gap-[5cqw] rounded-[5cqw] border-[1.5px] border-ink bg-mark p-[8cqw] shadow-[4px_4px_0_var(--ink)]">
        <span className="font-mono text-[5cqw] font-semibold uppercase tracking-[0.08em]">primeira chave · guia</span>
        <b className="font-display text-[16cqw] font-semibold leading-[0.95]">
          Do zero
          <br />à chave.
        </b>
        <Image src="/guia/casa.webp" alt="" width={800} height={600} priority className="aspect-[4/3] w-full rounded-[3cqw] border border-ink object-cover" />
        <span className="mt-auto truncate rounded-[2cqw] bg-ink px-[4cqw] py-[2.5cqw] font-mono text-[5cqw] uppercase tracking-[0.08em] text-mark">5 fases da compra</span>
      </div>
    </div>
  );
}

/** Selo redondo com o texto girando em volta da seta de baixar (gira só se a pessoa não pediu menos movimento). */
function SeloGratis({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`grid place-items-center rounded-full border-[1.5px] border-ink bg-ink text-mark shadow-[3px_3px_0_var(--mark)] ${className ?? ""}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full motion-safe:animate-[spin_16s_linear_infinite]">
        <defs>
          <path id="selo-gratis" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
        </defs>
        <text className="fill-current font-mono text-[10.5px] font-semibold uppercase">
          <textPath href="#selo-gratis" textLength="230">
            Grátis · PDF · 36 páginas ·
          </textPath>
        </text>
      </svg>
      <span className="grid size-9 place-items-center rounded-full bg-mark text-ink">
        <Download className="size-5" />
      </span>
    </div>
  );
}

export default function DoZeroAChavePage() {
  return (
    <article className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-10 pt-10 sm:px-6 sm:pt-12">
      <header id="topo-guia" className="grid scroll-mt-24 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div className="relative flex flex-col gap-5">
          {/* A cartilha pequena ao lado das duas primeiras linhas do título (as curtas). */}
          <div aria-hidden className="absolute -top-2 right-1 w-[84px] rotate-[6deg] sm:right-4 sm:w-[110px] lg:-top-4 lg:right-0 lg:w-[124px]">
            <CapaGuia />
          </div>
          <Eyebrow className="pr-24 sm:pr-0">Amostra grátis · PDF · 36 páginas</Eyebrow>
          <h1 className="font-display text-[clamp(40px,6vw,64px)] font-light leading-[1.02]">
            Cartilha
            <br />
            grátis,
            <br />
            <span className="marca-texto whitespace-nowrap font-semibold">do zero à chave.</span>
          </h1>
          <p className="max-w-xl text-lg text-ink-2">
            A compra do primeiro imóvel em 5 fases, com as regras da Caixa explicadas em palavras que dá pra entender. Do primeiro cálculo até o dia de pegar a chave.
          </p>
          <ul className="flex flex-col gap-2.5">
            {LEVA.map((l) => (
              <li key={l} className="flex items-center gap-2.5 text-[16px]">
                <Check aria-hidden className="size-5 shrink-0 rounded-full bg-mark p-0.5" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        {/* O selo de grátis na borda de cima do formulário, metade para fora: centralizado no celular, no canto direito a partir do sm. */}
        <div className="relative">
          <SeloGratis className="absolute -top-10 left-1/2 z-10 size-[80px] -translate-x-1/2 sm:-right-6 sm:-top-12 sm:left-auto sm:size-[96px] sm:translate-x-0" />
          <BaixarGuia className="pt-14 sm:pt-16" />
        </div>
      </header>

      <section aria-labelledby="fases" className="flex flex-col gap-6">
        <h2 id="fases" className="font-display text-3xl font-semibold">
          O caminho, fase por fase
        </h2>
        <p className="-mt-3 max-w-2xl text-ink-2">Na amostra, a fase 1 vem inteira e as outras quatro vêm com o checklist. O guia completo, com as 5 fases detalhadas, sai em breve.</p>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {FASES.map((f) => (
            <li
              key={f.n}
              className="flex flex-col gap-2 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-4"
            >
              <span className="grid size-9 place-items-center rounded-full bg-mark font-mono text-sm font-semibold">
                {f.n}
              </span>
              <b className="font-display text-lg leading-tight">{f.titulo}</b>
              <span className="text-[15px] text-ink-2">{f.texto}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="dentro"
        className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
      >
        <div className="flex flex-col gap-5">
          <h2 id="dentro" className="font-display text-3xl font-semibold">
            O que vem dentro
          </h2>
          <ul className="flex flex-col gap-3">
            {DENTRO.map((d) => (
              <li key={d} className="flex gap-3 text-[16px]">
                <Check
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 rounded-full bg-mark p-0.5"
                />
                {d}
              </li>
            ))}
          </ul>
          <p className="text-[15px] text-ink-2">
            Cada guia tem o link da ferramenta certa no site: o{" "}
            <Link
              href="/simulador-financiamento-caixa/"
              className="underline underline-offset-4"
            >
              simulador
            </Link>
            , as calculadoras e os modelos de contrato.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PAGINAS.map((p) => (
            <Image
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={909}
              height={1287}
              className="h-auto w-full rounded-md border border-line shadow-sm"
            />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="perguntas"
        className="mx-auto flex w-full max-w-3xl flex-col gap-4"
      >
        <h2 id="perguntas" className="font-display text-3xl font-semibold">
          Perguntas rápidas
        </h2>
        <dl className="divide-y divide-line border-y border-line">
          {PERGUNTAS.map((p) => (
            <div key={p.q} className="flex flex-col gap-1 py-4">
              <dt className="font-semibold">{p.q}</dt>
              <dd className="text-ink-2">{p.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] bg-ink px-6 py-10 text-center text-paper">
        <JoaoDeBarro pose="chave" humor="feliz" className="h-20 w-auto" />
        <h2 className="font-display text-3xl font-semibold">
          Comece pela fase 1 hoje.
        </h2>
        <p className="max-w-md text-paper/80">
          O guia é grátis. O primeiro passo também: ver quanto a sua renda
          compra.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="mark" size="lg">
            <a href="#topo-guia">Baixar o guia</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-paper bg-transparent text-paper hover:bg-paper/10"
          >
            <Link href="/simulador-financiamento-caixa/">Simular agora</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
