import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/badge";
import { JoaoDeBarro, Ninho } from "@/components/brand/JoaoDeBarro";
import { Cota, LogoAssinatura } from "@/components/brand/Logo";

const ETAPAS = [
  { n: "01", titulo: "Você junta a entrada", texto: "De bico em bico. Ou zera ela, se a avaliação vier 25% acima do preço.", pose: "voando" as const, carga: "barro" as const },
  { n: "02", titulo: "O banco mede o imóvel", texto: "Um engenheiro vistoria e dá o valor de avaliação. É sobre ele que o banco empresta.", pose: "parado" as const },
  { n: "03", titulo: "Você assina o contrato", texto: "Comprador e vendedor juntos, no dia marcado pelo banco.", pose: "frente" as const },
  { n: "04", titulo: "A chave é sua", texto: "Registrado o contrato (até 30 dias), o banco paga o vendedor.", pose: "comemora" as const },
];

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
                <Link href="/simulador/">Simular agora, de graça</Link>
              </Button>
              <Link href="#segredo" className="font-semibold underline underline-offset-4">
                Dá pra comprar sem entrada?
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <span className="text-[clamp(40px,6vw,64px)]">
              <LogoAssinatura />
            </span>
          </div>
        </div>
      </section>

      <section id="segredo" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <Card variant="mark" className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-5">
            <p className="font-mono text-xs uppercase tracking-[0.07em]">O segredo que pouca gente conta</p>
            <h2 className="font-display text-[clamp(34px,5vw,56px)] font-semibold leading-none">Dá pra comprar sem entrada.</h2>
            <p className="text-lg">
              O banco empresta 80% do valor que <b>ele avaliar</b>, até o limite do preço. Um imóvel de R$ 100 mil avaliado em R$ 125 mil é financiado inteiro: você paga
              só ITBI e cartório.
            </p>
            <Button asChild variant="default" className="self-start">
              <Link href="/simulador/">Ver se dá no meu caso</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3 rounded-xl bg-white/55 p-5 font-mono text-[15px]">
            <div className="flex justify-between"><span>preço de venda</span><span>R$ 100.000</span></div>
            <div className="flex justify-between"><span>banco avaliou em</span><span>R$ 125.000</span></div>
            <div className="flex justify-between border-b border-ink/30 pb-3"><span>banco empresta 80%</span><span>R$ 100.000</span></div>
            <div className="flex items-center justify-between">
              <span>sua entrada</span>
              <span className="rounded bg-ink px-2 py-0.5 font-display text-2xl font-semibold text-mark">R$ 0</span>
            </div>
          </div>
        </Card>
      </section>

      <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-3">
          <Eyebrow>Do sinal à chave</Eyebrow>
          <h2 className="font-display text-[clamp(30px,4.4vw,48px)] font-light leading-tight">
            O caminho do dinheiro, <span className="font-semibold">em 4 passos.</span>
          </h2>
        </div>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((e) => (
            <li key={e.n} className="flex flex-col gap-2">
              <div className="flex h-36 items-end gap-2">
                <JoaoDeBarro pose={e.pose} carga={"carga" in e ? e.carga : undefined} className="h-28 w-auto" />
                {e.n === "02" && <Ninho className="w-20" />}
              </div>
              <span className="font-mono text-sm">{e.n}</span>
              <b className="text-lg">{e.titulo}</b>
              <span className="text-[15px] text-ink-2">{e.texto}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 hidden grid-cols-4 gap-8 font-mono text-xs text-ink-2 lg:grid">
          <Cota rotulo="5 a 15 dias de crédito" />
          <Cota rotulo="7 a 15 dias de vistoria" />
          <Cota rotulo="análise e contrato" />
          <Cota rotulo="até 30 dias de registro" />
        </div>
      </section>

      <section id="vender" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="strong" className="flex flex-col gap-3">
            <Eyebrow>Vai comprar</Eyebrow>
            <h2 className="font-display text-3xl font-semibold">Seu número em 2 minutos</h2>
            <p className="text-ink-2">Quanto o banco empresta, quanto falta de entrada, e o que fazer primeiro.</p>
            <Button asChild className="mt-2 self-start">
              <Link href="/simulador/">Abrir o simulador</Link>
            </Button>
          </Card>
          <Card variant="planta" className="flex flex-col gap-3">
            <Eyebrow className="text-ink-2">Vai vender · em breve</Eyebrow>
            <h2 className="font-display text-3xl font-semibold">Vender um usado sem susto</h2>
            <p>Documentos, imóvel financiado, imposto sobre o ganho e como a avaliação do banco do comprador mexe no seu preço.</p>
          </Card>
        </div>
      </section>

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
