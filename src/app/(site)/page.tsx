import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/badge";
import { Organismo } from "@/components/conteudo/Organismo";
import { DuvideFaixa, Ferramentas, GuiasDestaque, LinhaDoTempo, Numeros, Portas, QuemEQuem, QuemFaz } from "@/components/home/secoes";
import { estatisticas } from "@/lib/conteudo/links";
import { FaixaFotoOnda } from "@/components/brand/FotoRecorte";
import { Ilustracao } from "@/components/brand/ilustracoes";
import { FOTO_HOME } from "@/lib/conteudo/fotos";

const FAQ = [
  {
    q: "Dá pra financiar um imóvel sem entrada?",
    a: "Dá, em um caso específico: o banco empresta até 80% do valor que ele avaliar, sem passar do preço de venda. Se o imóvel for avaliado em 25% ou mais acima do preço, o banco financia o preço inteiro. Os custos de ITBI e cartório continuam por sua conta.",
  },
  {
    q: "Quanto da minha renda pode ir pra parcela?",
    a: "Em geral, até 30% da renda bruta, já descontando outras parcelas que você paga (carro, empréstimo, cartão parcelado).",
  },
  {
    q: "O FGTS pode pagar o ITBI e o cartório?",
    a: "Não. Na compra, o FGTS só entra na entrada. Depois, ele pode abater a dívida a cada 2 anos ou pagar parte das prestações.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  const est = estatisticas();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />

      <section className="bg-planta-grid border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.25fr_1fr] md:py-24">
          <div className="flex flex-col gap-7">
            <Eyebrow>Financiamento do primeiro imóvel, explicado</Eyebrow>
            <h1 className="font-display text-[clamp(40px,6.4vw,72px)] font-light leading-[0.98]">
              Do zero à chave do seu <span className="marca-texto font-semibold">primeiro imóvel.</span>
            </h1>
            <p className="max-w-xl text-lg text-ink-2">
              Descubra quanto você pode comprar, quanto precisa de entrada e qual o seu próximo passo. Sem juridiquês, sem letra miúda de banco.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/simulador-financiamento-caixa/">Simular agora, de graça</Link>
              </Button>
              <Link href="#segredo" className="font-semibold underline underline-offset-4">
                Dá pra comprar sem entrada?
              </Link>
            </div>
            <ul className="flex flex-wrap gap-2 font-mono text-[13px]">
              {["Regras conferidas no simulador da Caixa", `${est.paginas} respostas, um caminho só`, "Dados do Banco Central e das prefeituras"].map((t) => (
                <li key={t} className="rounded-full border border-line bg-surface px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/mapa/"
            className="group relative mx-auto block w-full max-w-md md:mr-0"
            aria-label={`Ver o mapa do caminho até a chave: ${est.paginas} respostas ligadas em volta do simulador`}
          >
            <Organismo vivo className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]" />
            <span className="absolute bottom-1 right-1 flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-surface px-3 py-1.5 font-mono text-xs shadow-[3px_3px_0_var(--ink)] transition-transform group-hover:-translate-y-0.5">
              <i className="size-2.5 rounded-full bg-mark ring-1 ring-ink" aria-hidden />
              o mapa do caminho até a chave →
            </span>
          </Link>
        </div>
      </section>

      <Portas />

      <section id="segredo" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6">
        <Card variant="mark" className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-5">
            <p className="font-mono text-xs uppercase tracking-[0.07em]">O segredo que pouca gente conta</p>
            <h2 className="font-display text-[clamp(34px,5vw,56px)] font-semibold leading-none">Dá pra comprar sem entrada.</h2>
            <p className="text-lg">
              O banco empresta 80% do valor que <b>ele avaliar</b>, até o limite do preço. Um imóvel de R$ 100 mil avaliado em R$ 125 mil é financiado inteiro: você paga
              só ITBI e cartório.
            </p>
            <Button asChild variant="default" className="self-start">
              <Link href="/simulador-financiamento-caixa/">Ver se dá no meu caso</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3 rounded-xl bg-white/55 p-5 font-mono text-[15px]">
            <div className="flex justify-between"><span>preço de venda</span><span className="whitespace-nowrap">R$ 100.000</span></div>
            <div className="flex justify-between"><span>banco avaliou em</span><span className="whitespace-nowrap">R$ 125.000</span></div>
            <div className="flex justify-between border-b border-ink/30 pb-3"><span>banco empresta 80%</span><span className="whitespace-nowrap">R$ 100.000</span></div>
            <div className="flex items-center justify-between">
              <span>sua entrada</span>
              <span className="rounded bg-ink px-2 py-0.5 font-display text-2xl font-semibold text-mark">R$ 0</span>
            </div>
          </div>
        </Card>
      </section>

      <FaixaFotoOnda foto={FOTO_HOME} id="home" className="mb-16">
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-10 sm:px-6">
          <Ilustracao nome="casa" className="absolute -top-8 right-4 w-56 sm:right-10 sm:w-72 md:-top-12 md:w-80" />
          <Card className="relative max-w-md bg-paper">
            <p className="font-mono text-xs uppercase tracking-[0.07em]">Barro por barro</p>
            <p className="mt-2 font-display text-3xl font-light leading-tight">
              A casa própria não vem de uma vez. <span className="marca-texto font-semibold">Vem da conta certa.</span>
            </p>
            <Link href="/simulador-financiamento-caixa/" className="mt-4 inline-block font-semibold underline underline-offset-4">
              Fazer a minha conta
            </Link>
          </Card>
        </div>
      </FaixaFotoOnda>

      <LinhaDoTempo />
      <Ferramentas />
      <Numeros />
      <DuvideFaixa />
      <QuemEQuem />
      <GuiasDestaque />
      <QuemFaz />

      <section className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <Eyebrow>Perguntas que todo mundo faz</Eyebrow>
        <div className="mt-4 flex flex-col divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="font-mono transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
