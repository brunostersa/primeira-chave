"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/components/ui/utils";
import { SITE } from "@/lib/site-config";

/**
 * Gerador do link do parceiro (mídia kit). Cada CCA ou corretor tem o próprio link curto,
 * primeirachave.com.br/p/<parceiro>[/<destino>], que o public/.htaccess redireciona para a página
 * com utm_source=parceiro, utm_medium=indicacao, utm_campaign=<parceiro>, utm_content=<destino>.
 * No GA4, o relatório de campanhas mostra quantas pessoas cada parceiro trouxe e para onde.
 * Destino novo aqui precisa de uma regra nova no .htaccess.
 */

const DESTINOS = [
  { curto: "", rotulo: "Simulador" },
  { curto: "inicio", rotulo: "Página inicial" },
  { curto: "documentos", rotulo: "Documentos para financiar" },
  { curto: "mcmv", rotulo: "Minha Casa Minha Vida" },
  { curto: "sem-entrada", rotulo: "Financiar sem entrada" },
  { curto: "quanto-ganhar", rotulo: "Quanto preciso ganhar" },
];

/** "Imobiliária São José — Goiânia" → "imobiliaria-sao-jose-goiania" */
const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

const campo = "h-12 rounded-xl border-[1.5px] border-ink bg-surface px-4 text-[15px] outline-none focus:shadow-[3px_3px_0_var(--ink)]";

export function LinkParceiro() {
  const [nome, setNome] = useState("");
  const [destino, setDestino] = useState(DESTINOS[0]);
  const [copiado, setCopiado] = useState<string | null>(null);
  const id = slugify(nome);
  const link = id ? `${SITE.url.replace(/^https?:\/\//, "")}/p/${id}${destino.curto ? `/${destino.curto}` : ""}` : "";
  const mensagem = link
    ? `Antes de procurar imóvel, faça a simulação: quanto você pode financiar, quanto precisa de entrada e qual o próximo passo. É grátis e sem cadastro: ${link}`
    : "";

  const copiar = async (texto: string, qual: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(qual);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      /* sem permissão: o texto continua visível para copiar à mão */
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-[1.3fr_1fr]">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Seu nome ou da sua empresa</span>
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: CCA Goiânia Centro" className={campo} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Para onde o link leva</span>
          <select value={destino.curto} onChange={(e) => setDestino(DESTINOS.find((d) => d.curto === e.target.value) ?? DESTINOS[0])} className={campo}>
            {DESTINOS.map((d) => (
              <option key={d.rotulo} value={d.curto}>
                {d.rotulo}
              </option>
            ))}
          </select>
        </label>
      </div>

      {link ? (
        <div className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-mark p-4 momento-entra">
          <p className="break-all font-mono text-[13px]">{link}</p>
          <div className="flex flex-wrap gap-2">
            <BotaoCopiar ativo={copiado === "link"} onClick={() => copiar(link, "link")} rotulo="Copiar link" />
            <BotaoCopiar ativo={copiado === "msg"} onClick={() => copiar(mensagem, "msg")} rotulo="Copiar mensagem pronta" />
            <a
              href={`https://wa.me/?text=${encodeURIComponent(mensagem)}`}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center rounded-xl border-[1.5px] border-ink bg-surface px-4 text-[15px] font-semibold hover:bg-paper"
            >
              Mandar no WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Escreva o seu nome para gerar o link. Use sempre o mesmo nome: é ele que identifica as suas indicações.</p>
      )}
    </div>
  );
}

function BotaoCopiar({ ativo, onClick, rotulo }: { ativo: boolean; onClick: () => void; rotulo: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      className={cn("inline-flex min-h-11 items-center gap-2 rounded-xl border-[1.5px] border-ink bg-surface px-4 text-[15px] font-semibold hover:bg-paper")}
    >
      {ativo ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      {ativo ? "Copiado" : rotulo}
    </button>
  );
}
