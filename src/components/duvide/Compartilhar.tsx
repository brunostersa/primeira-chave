"use client";

import { useState } from "react";
import { Check, Copy, Download, Link2, Share2 } from "lucide-react";
import { cn } from "@/components/ui/utils";

const botao = "inline-flex min-h-11 items-center gap-2 rounded-xl border-[1.5px] border-ink bg-surface px-4 text-[15px] font-semibold hover:bg-ink/5";

/** Ícone do WhatsApp (as marcas não vêm no lucide). */
function Whats() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[18px] fill-current">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

/**
 * Compartilhar uma carta: WhatsApp, link, imagem (download) e o menu nativo do celular
 * (que manda a imagem junto, quando o aparelho permite).
 */
export function Compartilhar({ url, texto, imagem, nome }: { url: string; texto: string; imagem: string; nome: string }) {
  const [copiado, setCopiado] = useState(false);
  const absoluta = () => new URL(url, window.location.origin).toString();

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(absoluta());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sem permissão de área de transferência: o link continua visível na barra */
    }
  };

  const nativo = async () => {
    if (!("share" in navigator)) return copiar();
    try {
      const blob = await (await fetch(imagem)).blob();
      const arquivo = new File([blob], `${nome}.jpg`, { type: blob.type });
      const dados = { title: texto, text: texto, url: absoluta(), files: [arquivo] };
      if (navigator.canShare?.(dados)) await navigator.share(dados);
      else await navigator.share({ title: texto, text: texto, url: absoluta() });
    } catch {
      /* a pessoa fechou o menu */
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <a href={`https://wa.me/?text=${encodeURIComponent(`${texto} ${url.startsWith("http") ? url : `https://primeirachave.com.br${url}`}`)}`} target="_blank" rel="noopener" className={cn(botao, "border-ok text-ok")}>
        <Whats />
        WhatsApp
      </a>
      <button type="button" onClick={copiar} className={botao} aria-live="polite">
        {copiado ? <Check aria-hidden className="size-4" /> : <Link2 aria-hidden className="size-4" />}
        {copiado ? "Link copiado" : "Copiar link"}
      </button>
      <a href={imagem} download={`${nome}.jpg`} className={botao}>
        <Download aria-hidden className="size-4" />
        Baixar imagem
      </a>
      <button type="button" onClick={nativo} className={botao}>
        <Share2 aria-hidden className="size-4" />
        Mais opções
      </button>
    </div>
  );
}

/** Copiar a legenda sugerida (ambiente do corretor). */
export function CopiarLegenda({ legenda }: { legenda: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      type="button"
      className={botao}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(legenda);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 2000);
        } catch {
          /* sem permissão: a legenda está visível para copiar à mão */
        }
      }}
    >
      {copiado ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      {copiado ? "Legenda copiada" : "Copiar legenda"}
    </button>
  );
}
