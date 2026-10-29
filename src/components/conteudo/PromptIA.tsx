"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * O prompt para preencher o modelo com uma IA: texto à mostra (dá para ler antes de
 * colar) e botão de copiar. Sem a API de área de transferência, seleciona o texto.
 */
export function PromptIA({ prompt }: { prompt: string }) {
  const [copiado, setCopiado] = useState(false);
  const id = "prompt-ia";

  async function copiar() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      const el = document.getElementById(id) as HTMLTextAreaElement | null;
      el?.focus();
      el?.select();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={copiar} aria-describedby={`${id}-status`}>
          {copiado ? <Check aria-hidden /> : <Copy aria-hidden />}
          {copiado ? "Copiado" : "Copiar o prompt"}
        </Button>
        <span id={`${id}-status`} role="status" className="text-sm text-ink-2">
          {copiado ? "Agora cole na IA que você usa." : "Cole no ChatGPT, Claude ou Gemini e responda às perguntas."}
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Prompt para preencher o modelo com uma IA
      </label>
      <textarea
        id={id}
        readOnly
        value={prompt}
        rows={12}
        className="w-full resize-y rounded-[var(--radius-card)] border border-line bg-surface p-4 font-mono text-[13px] leading-relaxed text-ink"
      />
    </div>
  );
}
