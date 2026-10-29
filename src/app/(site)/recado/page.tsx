import type { Metadata } from "next";
import Link from "next/link";
import { JoaoCarteiro } from "@/components/brand/JoaoCarteiro";
import { InscricaoRecado } from "@/components/recado/InscricaoRecado";
import { feedRecado } from "@/lib/recado/feed";
import { FASES } from "@/lib/recado/sequencias";
import { metadadosPagina } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = metadadosPagina({
  titulo: "Recado do João: a newsletter do primeiro imóvel",
  descricao: "Um e-mail curto por semana sobre a compra do primeiro imóvel: um número, uma armadilha e um atalho. Grátis, sem economês, e você sai com um clique.",
  slug: "/recado/",
});

/**
 * A página do Recado: uma coluna, o formulário logo no topo e um recado de exemplo montado
 * com o mesmo feed que o Hub usa para enviar (o que se vê aqui é o que chega).
 */
export default function RecadoPage() {
  const feed = feedRecado();
  const exemplo = { numero: feed.numeros[0], duvide: feed.duvide[0], atalho: feed.paginas.find((p) => p.tipo === "atalho") ?? feed.paginas[0] };

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-16 px-4 pb-6 pt-14 sm:px-6 sm:pt-20">
      <header className="flex flex-col items-center gap-5 text-center">
        <JoaoCarteiro className="h-16 w-auto" />
        <p className="font-mono text-xs uppercase tracking-[0.07em] text-muted">Recado do João · grátis, toda quinta</p>
        <h1 className="font-display text-[clamp(38px,7vw,60px)] font-light leading-[1.02]">
          O primeiro imóvel, <span className="marca-texto font-semibold">de bico em bico.</span>
        </h1>
        <p className="max-w-lg text-lg text-ink-2">Um e-mail curto por semana: um número, uma armadilha e um atalho. Sem economês e sem ninguém tentando te vender nada.</p>
        {/* O mesmo cartão do rodapé (com o bando pousado na borda), sem repetir o título. */}
        {SITE.recado && <InscricaoRecado origem="recado" compacto cabecalho={false} className="mt-6 w-full text-left" />}
      </header>

      <section aria-labelledby="exemplo" className="flex flex-col gap-4">
        <h2 id="exemplo" className="font-mono text-xs uppercase tracking-[0.07em] text-muted">
          Um recado, de verdade
        </h2>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <Linha rotulo="O número da semana">
            <p className="font-display text-4xl font-semibold leading-none">
              <span className="marca-texto">{exemplo.numero.valor}</span>
            </p>
            <p className="text-ink-2">{exemplo.numero.texto.charAt(0).toUpperCase() + exemplo.numero.texto.slice(1)}</p>
          </Linha>
          <Linha rotulo={`Duvide · ${exemplo.duvide.rotulo}`} planta>
            <p className="font-display text-xl font-semibold leading-snug">“{exemplo.duvide.frase}”</p>
            <p className="text-ink-2">{exemplo.duvide.resumo}</p>
          </Linha>
          <Linha rotulo="O atalho">
            <p className="font-semibold">{exemplo.atalho.titulo}</p>
            <p className="text-ink-2">{exemplo.atalho.resumo}</p>
          </Linha>
          <Linha rotulo="Seu próximo passo">
            <p className="text-ink-2">Muda conforme a fase em que você está.</p>
          </Linha>
        </div>
      </section>

      <section aria-labelledby="fases" className="flex flex-col gap-4">
        <h2 id="fases" className="font-mono text-xs uppercase tracking-[0.07em] text-muted">
          E nos primeiros dias, três e-mails da sua fase
        </h2>
        <dl className="divide-y divide-line border-y border-line">
          {FASES.map((f) => (
            <div key={f.id} className="grid gap-1 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
              <dt className="font-semibold">{f.rotulo}</dt>
              <dd className="text-[15px] text-ink-2">{f.sequencia.map((p) => p.assunto).join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-center text-sm text-muted">
        Só o e-mail e a fase. Nada de telefone nem ligação, e você sai com um clique.{" "}
        <Link href="/privacidade/" className="underline underline-offset-2">
          Como cuidamos dos seus dados
        </Link>
        .
      </p>
    </article>
  );
}

function Linha({ rotulo, planta, children }: { rotulo: string; planta?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 border-b border-line p-5 last:border-b-0 sm:p-6 ${planta ? "bg-planta" : ""}`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-muted">{rotulo}</p>
      {children}
    </div>
  );
}
