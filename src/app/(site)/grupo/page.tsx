import type { Metadata } from "next";
import Link from "next/link";
import { Ilustracao } from "@/components/brand/ilustracoes";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = metadadosPagina({
  titulo: "Comunidade da Primeira Chave para corretores e correspondentes",
  descricao: "Um card pronto por semana para mandar ao cliente e um grupo para tirar dúvida de financiamento. Para corretores e correspondentes. Grátis, no WhatsApp.",
  slug: "/grupo/",
});

const SEMANA = [
  { titulo: "Toda segunda, um card pronto", texto: "Tabela de renda, faixas do Minha Casa Minha Vida, prazos, o que o banco olha. Para mandar ao cliente ou repostar no status." },
  { titulo: "Um grupo para tirar dúvida", texto: "Faixa, avaliação, documento, FGTS. Corretor pergunta, correspondente responde, e a melhor pergunta vira o card da semana." },
  { titulo: "Os números conferidos", texto: "Tudo sai do simulador da Primeira Chave, com as regras da Caixa conferidas no simulador oficial." },
];

const REGRAS = ["Aqui não se anuncia imóvel.", "Nada de prometer aprovação nem “aprovo por fora”.", "Sem política, corrente ou spam."];

/**
 * Porta da comunidade no WhatsApp. O QR code e os cards apontam para cá, não para o convite
 * direto: se o link do WhatsApp mudar, troca só SITE.comunidadeWhatsapp.
 */
export default function GrupoPage() {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-14 px-4 pb-6 pt-14 sm:px-6 sm:pt-20">
      <header className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <Eyebrow>Comunidade no WhatsApp · grátis</Eyebrow>
          <h1 className="font-display text-[clamp(36px,6vw,56px)] font-light leading-[1.03]">
            Para quem atende quem vai <span className="marca-texto font-semibold">financiar.</span>
          </h1>
          <p className="text-lg text-ink-2">Corretores e correspondentes, juntos: um card pronto por semana e um grupo para tirar dúvida de financiamento.</p>
          <div className="flex flex-col items-start gap-2">
            <Button asChild size="lg">
              <a href={SITE.comunidadeWhatsapp} rel="noopener">
                Entrar na comunidade
              </a>
            </Button>
            <p className="text-sm text-muted">A entrada é aprovada à mão, para manter o grupo só com profissionais.</p>
          </div>
        </div>
        <Ilustracao nome="apartamento" className="max-w-xs justify-self-center" />
      </header>

      <section aria-labelledby="semana" className="flex flex-col gap-4">
        <h2 id="semana" className="font-mono text-xs uppercase tracking-[0.07em] text-muted">
          O que você recebe
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {SEMANA.map((s) => (
            <li key={s.titulo} className="grid gap-1 py-4 sm:grid-cols-[230px_minmax(0,1fr)] sm:gap-6">
              <b>{s.titulo}</b>
              <span className="text-[15px] text-ink-2">{s.texto}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="regras" className="flex flex-col gap-4">
        <h2 id="regras" className="font-mono text-xs uppercase tracking-[0.07em] text-muted">
          Os combinados
        </h2>
        <ol className="flex flex-col gap-3">
          {REGRAS.map((r, i) => (
            <li key={r} className="grid grid-cols-[32px_1fr] items-center gap-3 text-[17px]">
              <span className="flex size-8 items-center justify-center rounded-full bg-mark font-display font-semibold">{i + 1}</span>
              {r}
            </li>
          ))}
        </ol>
      </section>

      <p className="text-center text-sm text-muted">
        Como em todo grupo de WhatsApp, quem participa da conversa vê o número dos outros participantes. Prefere só receber as dicas?{" "}
        <a href={SITE.canalWhatsapp} rel="noopener" className="underline underline-offset-2">
          Siga o canal do Recado do João
        </a>
        . A Primeira Chave é conteúdo educativo: não é banco nem correspondente.{" "}
        <Link href="/para/" className="underline underline-offset-2">
          Quem é quem no financiamento
        </Link>
        .
      </p>
    </article>
  );
}
