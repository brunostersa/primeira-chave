"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { cn } from "@/components/ui/utils";
import { jaInscrito, marcarInscrito } from "@/lib/recado/convite";
import { inscrever } from "@/lib/recado/inscrever";
import { FASES, type FaseId } from "@/lib/recado/sequencias";
import { SITE } from "@/lib/site-config";

export const PDF_GUIA = "/guia/do-zero-a-chave-amostra.pdf";

/** Só as fases de quem compra: o guia não fala de venda. */
const FASES_COMPRA = FASES.filter((f) => f.id !== "vender");

/**
 * O card de download do guia "Do zero à chave": grátis, em troca do e-mail, que entra no Recado do João
 * (origem "guia-pdf"). Formulário próprio, em dois passos, de propósito diferente do formulário do rodapé.
 * Quem já assina, ou sem o Recado ligado, baixa direto.
 */
export function BaixarGuia({ className }: { className?: string }) {
  const id = useId();
  const [assinante, setAssinante] = useState(false);
  const [fase, setFase] = useState<FaseId | null>(null);
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok">(
    SITE.recado ? "livre" : "ok",
  );
  const [erro, setErro] = useState("");
  // localStorage só existe no navegador: ler depois de montar evita diferença com o HTML estático.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setAssinante(jaInscrito()), []);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fase) return setErro("Escolha em que fase você está.");
    setErro("");
    setEstado("enviando");
    try {
      await inscrever({ email: email.trim(), fase, origem: "guia-pdf", site });
      marcarInscrito();
      setEstado("ok");
    } catch (err) {
      setErro((err as Error).message);
      setEstado("livre");
    }
  };

  const liberado = estado === "ok" || assinante;

  return (
    <div
      className={cn(
        "flex flex-col justify-center rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5 shadow-[6px_6px_0_var(--ink)] sm:p-6",
        className,
      )}
    >
      {liberado ? (
        <div role="status" className="flex flex-col gap-4 momento-entra">
          <p className="font-display text-2xl font-semibold leading-tight">
            {estado === "ok" && !assinante
              ? "Pronto, o guia é seu."
              : "Você já recebe o Recado do João, então o guia já é seu."}
          </p>
          {estado === "ok" && !assinante && SITE.recado && (
            <p className="text-[15px] text-ink-2">
              E o primeiro recado chega no seu e-mail em breve. Se não aparecer,
              olhe a caixa de promoções.
            </p>
          )}
          <a
            href={PDF_GUIA}
            download
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-ink bg-mark px-5 text-lg font-semibold shadow-[3px_3px_0_var(--ink)] hover:translate-y-px"
          >
            <Download aria-hidden className="size-5" /> Baixar o PDF (4,5 MB)
          </a>
        </div>
      ) : (
        <form onSubmit={enviar} className="flex flex-col gap-5">
          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 flex items-center gap-2 text-[15px] font-semibold">
              <span className="grid size-6 place-items-center rounded-full bg-ink font-mono text-xs text-paper">
                1
              </span>
              Em que fase você está?
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {FASES_COMPRA.map((f) => (
                <label
                  key={f.id}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center justify-center rounded-xl border-[1.5px] px-3 text-center text-[15px] leading-tight transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                    fase === f.id
                      ? "border-ink bg-mark font-semibold"
                      : "border-line bg-paper hover:border-ink",
                  )}
                >
                  <input
                    type="radio"
                    name={`${id}-fase`}
                    value={f.id}
                    checked={fase === f.id}
                    onChange={() => setFase(f.id)}
                    className="sr-only"
                  />
                  {f.rotulo}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-2.5">
            <span className="flex items-center gap-2 text-[15px] font-semibold">
              <span className="grid size-6 place-items-center rounded-full bg-ink font-mono text-xs text-paper">
                2
              </span>
              Para qual e-mail mandamos?
            </span>
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

          {/* Campo-isca: invisível para pessoas, robôs preenchem. */}
          <input
            type="text"
            name="site"
            tabIndex={-1}
            autoComplete="off"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            aria-hidden
            className="hidden"
          />
          <button
            type="submit"
            disabled={estado === "enviando"}
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border-[1.5px] border-ink bg-mark px-5 text-lg font-semibold shadow-[3px_3px_0_var(--ink)] hover:translate-y-px disabled:opacity-60"
          >
            <Download aria-hidden className="size-5" />{" "}
            {estado === "enviando" ? "Enviando…" : "Baixar o guia grátis"}
          </button>

          {erro && (
            <p role="alert" className="-mt-2 text-sm text-bad">
              {erro}
            </p>
          )}
          <p className="-mt-1 text-xs text-muted">
            Você também passa a receber o Recado do João, um e-mail curto por
            semana. Sem spam nem ligação, sai com um clique.{" "}
            <Link href="/privacidade/" className="underline underline-offset-2">
              Como cuidamos dos seus dados
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
