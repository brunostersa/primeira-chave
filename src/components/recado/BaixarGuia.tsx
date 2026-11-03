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
 * Botão de baixar com progresso de verdade: o PDF tem 4,5 MB e, sem retorno, o clique parecia travado.
 * Baixa em segundo plano (fetch, lendo os pedaços para medir), mostra a porcentagem e salva o arquivo no fim.
 * Se o navegador não der conta disso, o link normal faz o download.
 */
function BotaoPdf() {
  const [pct, setPct] = useState<number | null>(null);
  const [pronto, setPronto] = useState(false);

  const baixar = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pct !== null || typeof ReadableStream === "undefined") return;
    e.preventDefault();
    setPronto(false);
    setPct(0);
    try {
      const r = await fetch(PDF_GUIA);
      if (!r.ok || !r.body) throw new Error(String(r.status));
      const total = Number(r.headers.get("content-length")) || 4_528_661;
      const leitor = r.body.getReader();
      const pedacos: Uint8Array[] = [];
      let lidos = 0;
      for (;;) {
        const { done, value } = await leitor.read();
        if (done) break;
        pedacos.push(value);
        lidos += value.length;
        setPct(Math.min(99, Math.round((lidos / total) * 100)));
      }
      const url = URL.createObjectURL(new Blob(pedacos as BlobPart[], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = PDF_GUIA.split("/").pop()!;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setPronto(true);
    } catch {
      // É o arquivo PDF, não uma página do Next: abrir direto é o plano B do download.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = PDF_GUIA;
    } finally {
      setPct(null);
    }
  };

  const baixando = pct !== null;
  return (
    <div className="flex flex-col gap-2">
      <a
        href={PDF_GUIA}
        download
        onClick={baixar}
        aria-busy={baixando}
        className={cn(
          "relative inline-flex min-h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border-[1.5px] border-ink bg-mark px-5 text-lg font-semibold shadow-[3px_3px_0_var(--ink)] hover:translate-y-px",
          baixando && "cursor-progress bg-mark/40",
        )}
      >
        {baixando && <span aria-hidden className="absolute inset-y-0 left-0 bg-mark transition-[width] duration-200" style={{ width: `${pct}%` }} />}
        <span className="relative inline-flex items-center gap-2">
          {baixando ? (
            <>
              <span aria-hidden className="size-5 animate-spin rounded-full border-2 border-ink border-t-transparent" />
              Baixando… {pct}%
            </>
          ) : (
            <>
              <Download aria-hidden className="size-5" /> {pronto ? "Baixar de novo" : "Baixar o PDF (4,5 MB)"}
            </>
          )}
        </span>
      </a>
      <p aria-live="polite" className="min-h-5 text-center text-sm text-ink-2">
        {baixando ? "São 36 páginas, leva alguns segundos." : pronto ? "Pronto! O PDF está nos seus downloads." : ""}
      </p>
    </div>
  );
}

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
          <BotaoPdf />
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
