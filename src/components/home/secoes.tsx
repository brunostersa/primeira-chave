import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconeLinha, type NomeIcone } from "@/components/brand/icones";
import { JoaoDeBarro, Ninho, type Carga, type Humor, type Pose } from "@/components/brand/JoaoDeBarro";
import { Eyebrow } from "@/components/ui/badge";
import { cn } from "@/components/ui/utils";
import { Termometro } from "@/components/mercado/Termometro";
import { CartaMini } from "@/components/duvide/Grade";
import { AvatarPersona } from "@/components/personas/Avatar";
import { CARTAS } from "@/lib/conteudo/duvide";
import { capaDe } from "@/lib/conteudo/figuras";
import { no } from "@/lib/conteudo/links";
import { PERSONAS } from "@/lib/conteudo/personas";
import { brl, pct } from "@/lib/format";
import { capitais, imovelQueARendaCompra, ITBI_CAPITAIS, ITBI_SP, variacaoIvgr } from "@/lib/mercado";
import { secoesMenu } from "@/lib/navegacao";

/**
 * As seções da home: cada uma é uma porta para uma parte do ecossistema (jornada,
 * ferramentas, dados, Duvide, profissionais, guias). Tudo vem dos mesmos dados do site.
 */

function Titulo({ eyebrow, children, id }: { eyebrow: string; children: ReactNode; id?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="font-display text-[clamp(30px,4.4vw,48px)] font-light leading-tight">
        {children}
      </h2>
    </div>
  );
}

function VerMais({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline underline-offset-4">
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}

/* ——— Por onde começar: três portas, pela intenção ———————————————————————————— */

const PORTAS: { titulo: string; texto: string; href: string; cta: string; pose: Pose; humor?: Humor; carga?: Carga; fundo: string }[] = [
  { titulo: "Vou comprar", texto: "Quanto posso, quanto falta de entrada e a ordem de tudo, do CPF à chave.", href: "/comprar/", cta: "Começar pela compra", pose: "voando", carga: "barro", fundo: "bg-mark" },
  { titulo: "Vou vender", texto: "Documentos, preço que cabe na avaliação do comprador e o imposto da venda.", href: "/vender/", cta: "Ver como vender", pose: "comemora", fundo: "bg-mark-soft" },
  { titulo: "Trabalho com imóvel", texto: "Corretor, correspondente, investidor, construtor: o que tem aqui para você.", href: "/para/", cta: "Quem é quem", pose: "chave", humor: "piscando", fundo: "bg-planta" },
];

export function Portas() {
  return (
    <section aria-labelledby="portas" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Titulo eyebrow="Por onde começar" id="portas">
        Qual é <span className="font-semibold">o seu caso?</span>
      </Titulo>
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {PORTAS.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="group flex h-full flex-col gap-4 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-6 shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5">
              <span className={cn("flex h-32 items-end justify-center rounded-xl border border-ink/15", p.fundo)}>
                <JoaoDeBarro pose={p.pose} humor={p.humor} carga={p.carga} className="h-24 w-auto" />
              </span>
              <b className="font-display text-2xl">{p.titulo}</b>
              <span className="text-ink-2">{p.texto}</span>
              <span className="mt-auto inline-flex items-center gap-1.5 font-semibold underline underline-offset-4">
                {p.cta} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ——— A jornada em 5 fases: linha do tempo com o João-de-barro ———————————————— */

const FASE_DESENHO: { pose: Pose; humor?: Humor; carga?: Carga; ninho?: number }[] = [
  { pose: "voando", carga: "barro" },
  { pose: "frente", humor: "pensativo" },
  { pose: "parado", ninho: 0.6 },
  { pose: "chave" },
  { pose: "comemora", ninho: 1 },
];

export function LinhaDoTempo() {
  const fases = secoesMenu()[0].grupos!;
  return (
    <section aria-labelledby="jornada" className="border-y border-line bg-planta-grid">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Titulo eyebrow="A jornada" id="jornada">
            Do zero à chave, <span className="font-semibold">em 5 fases.</span>
          </Titulo>
          <p className="max-w-sm text-ink-2">Do pedido de crédito à chave, de 30 a 90 dias. Cada fase responde uma pergunta e leva à próxima.</p>
        </div>
        <ol className="relative mt-10 grid gap-8 lg:grid-cols-5 lg:gap-5">
          <span aria-hidden className="absolute left-[27px] top-0 h-full w-[3px] bg-ink/15 lg:left-0 lg:top-[142px] lg:h-[3px] lg:w-full" />
          {fases.map((f, i) => {
            const d = FASE_DESENHO[i];
            return (
              <li key={f.id} className="relative grid grid-cols-[56px_1fr] gap-4 lg:flex lg:flex-col lg:gap-3">
                <span className="hidden h-28 items-end gap-1 lg:flex">
                  {d.ninho !== undefined && <Ninho construido={d.ninho} className="w-16" />}
                  <JoaoDeBarro pose={d.pose} humor={d.humor} carga={d.carga} className="h-24 w-auto" />
                </span>
                <span className={cn("relative z-10 flex size-14 items-center justify-center rounded-full border-[3px] border-ink font-display text-xl font-semibold", i === fases.length - 1 ? "bg-mark" : "bg-surface")}>
                  {i + 1}
                </span>
                <span className="flex flex-col gap-1.5">
                  <b className="font-display text-xl leading-tight">{f.rotulo}</b>
                  <span className="text-[15px] text-ink-2">{f.pergunta}</span>
                  <ul className="flex flex-col gap-1 pt-1 text-[15px]">
                    {f.itens.filter((x) => x.href).slice(0, 2).map((x) => (
                      <li key={x.id}>
                        <Link href={x.href!} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                          {x.titulo}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={f.href} className="pt-1 text-sm font-semibold underline underline-offset-4">
                    Ver a fase ({f.total})
                  </Link>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ——— Ferramentas ————————————————————————————————————————————————————————————— */

const FERRAMENTAS: { id: string; icone: NomeIcone; destaque?: boolean }[] = [
  { id: "simulador", icone: "calculadora", destaque: true },
  { id: "quanto-minha-renda-compra", icone: "local" },
  { id: "metro-quadrado-sao-paulo", icone: "medida" },
  { id: "quanto-preciso-ganhar", icone: "moeda" },
  { id: "calculadora-itbi", icone: "carimbo" },
  { id: "calculadora-ganho-capital", icone: "cofre" },
];

export function Ferramentas() {
  return (
    <section aria-labelledby="ferramentas" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Titulo eyebrow="Ferramentas" id="ferramentas">
        Respostas com <span className="font-semibold">o seu número.</span>
      </Titulo>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FERRAMENTAS.map((f) => {
          const n = no(f.id);
          return (
            <li key={f.id}>
              <Link
                href={n.slug}
                className={cn(
                  "group flex h-full items-start gap-4 rounded-[var(--radius-card)] border-[1.5px] p-5 transition-colors",
                  f.destaque ? "border-ink bg-mark" : "border-line bg-surface hover:border-ink",
                )}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-ink bg-surface">
                  <IconeLinha nome={f.icone} className="w-7" />
                </span>
                <span className="flex flex-col gap-1">
                  <b className="font-display text-lg leading-tight">{n.titulo}</b>
                  <span className="text-[15px] text-ink-2">{n.resumo}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6">
        <Termometro />
      </div>
    </section>
  );
}

/* ——— Números que pouca gente sabe ——————————————————————————————————————————— */

export function Numeros() {
  const ivgr = variacaoIvgr(12);
  const r13 = imovelQueARendaCompra(13000)!;
  const r13mais = imovelQueARendaCompra(13250)!;
  const sp = ITBI_SP.cidade;
  const spReal = ITBI_CAPITAIS["São Paulo"];
  const spAnuncio = capitais().find((c) => c.nome === "São Paulo")!;
  const abaixo = Math.round((1 - spReal.m2 / spAnuncio.m2) * 100);
  const fatos = [
    { valor: `${ivgr.pct >= 0 ? "+" : ""}${pct(ivgr.pct, 1)}`, texto: "nas avaliações dos bancos em 12 meses", fonte: "Banco Central, IVG-R", href: "/quanto-minha-renda-compra/" },
    { valor: `${sp.financiado}%`, texto: "das compras de casa e apê em São Paulo foram financiadas", fonte: "ITBI pago, Prefeitura de SP", href: "/metro-quadrado-sao-paulo/" },
    { valor: `−${brl(r13.valor - r13mais.valor)}`, texto: "de crédito para quem passa de R$ 13.000 para R$ 13.250 de renda", fonte: "regras da Caixa, no simulador", href: "/quanto-minha-renda-compra/" },
    { valor: brl(spReal.m2), texto: `é o m² pago de verdade em SP: ${abaixo}% abaixo do preço de anúncio`, fonte: "ITBI × FipeZAP", href: "/metro-quadrado-sao-paulo/" },
  ];
  return (
    <section aria-labelledby="numeros" className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.07em] text-mark">Dados, não achismo</p>
          <h2 id="numeros" className="font-display text-[clamp(30px,4.4vw,48px)] font-light leading-tight">
            Números que <span className="font-semibold text-mark">pouca gente sabe.</span>
          </h2>
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {fatos.map((f) => (
            <li key={f.texto} className="flex flex-col gap-2 border-l-[3px] border-mark pl-5">
              <span className="font-display text-[clamp(32px,4vw,44px)] font-semibold leading-none tabular-nums">{f.valor}</span>
              <span className="text-paper/85">{f.texto}</span>
              <span className="font-mono text-xs text-paper/55">{f.fonte}</span>
              <Link href={f.href} className="text-sm font-semibold text-mark underline underline-offset-4">
                Ver de onde vem
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ——— Duvide: as cartas, em faixa rolável ————————————————————————————————————— */

export function DuvideFaixa() {
  const escolhidas = ["contrato-de-gaveta", "avaliacao-acima-zera-entrada", "agio", "preco-por-fora", "quitar-parcela-pequena", "sinal-garante"].map((id) => CARTAS.find((c) => c.id === id)!);
  return (
    <section aria-labelledby="duvide" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Titulo eyebrow="Duvide" id="duvide">
          Ouviu falar? <span className="marca-texto font-semibold">Duvide.</span>
        </Titulo>
        <p className="max-w-sm text-ink-2">Contrato de gaveta, ágio, preço por fora: o que é armadilha e o que é segredo. Cada carta vira imagem para mandar no WhatsApp.</p>
      </div>
      <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
        {escolhidas.map((c) => (
          <li key={c.id} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
            <CartaMini carta={c} />
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap gap-x-6">
        <VerMais href="/duvide/">Ver as {CARTAS.length} cartas</VerMais>
        <VerMais href="/duvide/corretor/">Posts prontos para corretor</VerMais>
      </div>
    </section>
  );
}

/* ——— Quem é quem na fila do pão: os avatares ——————————————————————————————— */

export function QuemEQuem() {
  return (
    <section aria-labelledby="quem-e-quem" className="border-y border-line bg-mark-soft">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Titulo eyebrow="O mercado, papel por papel" id="quem-e-quem">
          Quem é quem <span className="font-semibold">na fila do pão?</span>
        </Titulo>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
          {PERSONAS.map((p) => (
            <li key={p.id}>
              <Link href={`/para/${p.id}/`} className="group flex flex-col items-center gap-3 text-center">
                <AvatarPersona id={p.id} className="w-28 transition-transform group-hover:-translate-y-1" />
                <b className="text-[15px] leading-tight underline-offset-4 group-hover:underline">{p.quem.replace("Quem é ", "").replace("?", "")}</b>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ——— Guias mais procurados, com o infográfico de cada um ————————————————————— */

const DESTAQUES = ["leilao-caixa", "minha-casa-minha-vida", "registrato", "financiamento-imobiliario", "imoveis-caixa", "como-financiar-casa-caixa"];

export function GuiasDestaque() {
  return (
    <section aria-labelledby="guias-destaque" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Titulo eyebrow="Mais procurados" id="guias-destaque">
          Os guias que <span className="font-semibold">todo mundo abre.</span>
        </Titulo>
        <VerMais href="/guias/">Todos os guias</VerMais>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DESTAQUES.map((id) => {
          const n = no(id);
          const capa = capaDe(id);
          return (
            <li key={id}>
              <Link href={n.slug} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface hover:border-ink">
                {capa && <Image src={capa.url} alt={capa.alt} width={1200} height={675} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="h-auto w-full border-b border-line" />}
                <span className="flex flex-col gap-1 p-5">
                  <b className="font-display text-xl leading-tight group-hover:underline">{n.titulo}</b>
                  <span className="text-[15px] text-ink-2">{n.resumo}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ——— Quem faz ————————————————————————————————————————————————————————————————— */

export function QuemFaz() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="grid items-center gap-6 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-8">
        <JoaoDeBarro pose="frente" humor="feliz" className="h-24 w-auto justify-self-center" />
        <div className="flex flex-col gap-2">
          <Eyebrow>Quem faz</Eyebrow>
          <p className="text-lg">
            Feito por quem compra, reforma e vende imóvel, e arremata em leilão. Uma iniciativa do Bruno, com a CustomerHub, para traduzir o mercado para quem está
            comprando o primeiro imóvel.
          </p>
        </div>
        <VerMais href="/sobre/">Conheça a história</VerMais>
      </div>
    </section>
  );
}
