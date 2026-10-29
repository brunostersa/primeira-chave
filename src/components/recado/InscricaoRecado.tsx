"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { BandoNaBorda } from "@/components/brand/BandoNaBorda";
import { JoaoCarteiro } from "@/components/brand/JoaoCarteiro";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { marcarInscrito } from "@/lib/recado/convite";
import { inscrever } from "@/lib/recado/inscrever";
import { FASES, type FaseId } from "@/lib/recado/sequencias";

/**
 * Inscrição no Recado do João: e-mail + a fase da compra (é ela que decide os e-mails).
 * Sem telefone e sem cadastro: o convite é aprender. `origem` diz de onde veio
 * ("simulador:resultado", "rodape", "recado"); `perfil` são faixas do simulador, se houver.
 * `compacto` (rodapé): o João carteiro animado à esquerda, cinco joões pousados na borda e uma linha só, com a fase num menu de escolha.
 * `convite` (a janela do fim de um cálculo): o mesmo formulário compacto, sem moldura nem bando, com o `titulo` do momento.
 */
export function InscricaoRecado({
  origem,
  fase: faseInicial,
  perfil,
  compacto = false,
  convite = false,
  titulo,
  cabecalho = true,
  aoInscrever,
  className,
}: {
  origem: string;
  fase?: FaseId;
  perfil?: object;
  compacto?: boolean;
  convite?: boolean;
  titulo?: string;
  /** false: sem a sobrancelha e o título (a página /recado/ já tem o h1). */
  cabecalho?: boolean;
  aoInscrever?: () => void;
  className?: string;
}) {
  const id = useId();
  const [fase, setFase] = useState<FaseId | null>(faseInicial ?? null);
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok">("livre");
  const [erro, setErro] = useState("");

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fase) return setErro("Escolha em que fase você está.");
    setErro("");
    setEstado("enviando");
    try {
      await inscrever({ email: email.trim(), fase, origem, perfil, site });
      marcarInscrito();
      setEstado("ok");
      aoInscrever?.();
    } catch (err) {
      setErro((err as Error).message);
      setEstado("livre");
    }
  };

  if (estado === "ok") {
    return (
      <div role="status" className={cn("flex items-center gap-4 momento-entra", !convite && "rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5", className)}>
        <JoaoDeBarro pose="chave" humor="feliz" className="h-14 w-auto shrink-0" />
        <p className="text-[15px]">
          <b>Pronto, você está na lista.</b> O primeiro recado chega no seu e-mail em breve. Se não aparecer, olhe a caixa de promoções.
        </p>
      </div>
    );
  }

  const campoEmail = (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="sr-only">Seu e-mail</span>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        inputMode="email"
        placeholder="seu@email.com"
        className="h-12 w-full min-w-0 rounded-xl border-[1.5px] border-line bg-paper px-4 text-base outline-none focus:border-ink"
      />
    </label>
  );
  const enviarBotao = (
    <>
      {/* Campo-isca: invisível para pessoas, robôs preenchem. */}
      <input type="text" name="site" tabIndex={-1} autoComplete="off" value={site} onChange={(e) => setSite(e.target.value)} aria-hidden className="hidden" />
      <Button type="submit" variant="mark" disabled={estado === "enviando"} className="sm:self-stretch">
        {estado === "enviando" ? "Enviando…" : "Receber o recado"}
      </Button>
    </>
  );
  const rodape = (
    <>
      {erro && (
        <p role="alert" className="text-sm text-bad">
          {erro}
        </p>
      )}
      <p className="text-xs text-muted">
        Só o seu e-mail e a fase, para mandar o conteúdo certo. Nada de spam nem ligação, e você sai com um clique.{" "}
        <Link href="/privacidade/" className="underline underline-offset-2">
          Como cuidamos dos seus dados
        </Link>
        .
      </p>
    </>
  );

  // Compacto (rodapé): o João à esquerda e uma linha só, com a fase num menu de escolha.
  if (compacto || convite) {
    return (
      <form
        onSubmit={enviar}
        aria-labelledby={cabecalho ? `${id}-titulo` : undefined}
        aria-label={cabecalho ? undefined : "Receber o Recado do João"}
        className={cn(
          "relative grid items-center gap-x-6 gap-y-3",
          !convite && "rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-4 sm:p-5",
          !convite && cabecalho && "sm:grid-cols-[auto_minmax(0,1fr)]",
          className,
        )}
      >
        {!convite && <BandoNaBorda />}
        {!convite && cabecalho && <JoaoCarteiro className="hidden h-20 w-auto sm:block" />}
        <div className="flex flex-col gap-3">
          <div className={cn("flex flex-col gap-0.5", !cabecalho && "hidden")}>
            <p className="font-mono text-xs uppercase tracking-[0.07em] text-muted">Recado do João · grátis, toda quinta</p>
            <h2 id={`${id}-titulo`} className={cn("font-display font-semibold leading-tight", convite ? "pr-10 text-[22px]" : "text-xl")}>
              {titulo ?? (
                <>
                  Um <span className="marca-texto">recado por semana</span> sobre a sua compra
                </>
              )}
            </h2>
          </div>
          <div className={cn("flex flex-col gap-2", !convite && "sm:flex-row")}>
            <label className={cn("relative", !convite && "sm:w-56")}>
              <span className="sr-only">Em que fase você está?</span>
              <select
                required
                value={fase ?? ""}
                onChange={(e) => setFase(e.target.value as FaseId)}
                className="h-12 w-full appearance-none rounded-xl border-[1.5px] border-line bg-paper pl-4 pr-10 text-base outline-none invalid:text-muted focus:border-ink"
              >
                <option value="" disabled>
                  Qual a sua fase?
                </option>
                {FASES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.rotulo}
                  </option>
                ))}
              </select>
              <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 w-3 -translate-y-1/2" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1.5 6 6.5 11 1.5" />
              </svg>
            </label>
            {campoEmail}
            {enviarBotao}
          </div>
          {rodape}
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={enviar}
      aria-labelledby={`${id}-titulo`}
      className={cn("flex flex-col gap-4 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5 sm:p-6", className)}
    >
      <div className="flex items-start gap-4">
        <JoaoDeBarro pose="barro" className="hidden h-16 w-auto shrink-0 sm:block" />
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-[0.07em] text-muted">Recado do João · grátis, toda quinta</p>
          <h2 id={`${id}-titulo`} className="font-display text-2xl font-semibold leading-tight">
            Um <span className="marca-texto">recado por semana</span> sobre a sua compra
          </h2>
          <p className="text-[15px] text-ink-2">Um número, uma armadilha e um atalho, no tamanho de um café. E os e-mails certos para a fase em que você está.</p>
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold">Em que fase você está?</legend>
        <div className="flex flex-wrap gap-2">
          {FASES.map((f) => (
            <label
              key={f.id}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] px-4 text-[15px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                fase === f.id ? "border-ink bg-mark font-semibold" : "border-line bg-paper hover:border-ink",
              )}
            >
              <input type="radio" name={`${id}-fase`} value={f.id} checked={fase === f.id} onChange={() => setFase(f.id)} className="sr-only" />
              {f.rotulo}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2 sm:flex-row">
        {campoEmail}
        {enviarBotao}
      </div>

      {rodape}
    </form>
  );
}
