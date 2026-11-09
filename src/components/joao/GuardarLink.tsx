"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apagarLink, CONSENTIMENTO_LINK, criarLink, type Compra } from "@/lib/joao/api";

/** Guardar é escolha da pessoa: nada vai para o servidor antes deste aceite. */
export function GuardarLink({ token, compra, aoMudar }: { token: string | null; compra: () => Compra; aoMudar: (t: string | null) => void }) {
  const [aberto, setAberto] = useState(false);
  const [aceite, setAceite] = useState(false);
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState(false);

  const criar = async () => {
    setErro("");
    try {
      const r = await criarLink(compra());
      aoMudar(r.token);
      setAberto(false);
    } catch (e) {
      setErro((e as Error).message);
    }
  };
  const apagar = async () => {
    if (!token || !window.confirm("Apagar a conversa, o plano e o link? Não dá para desfazer.")) return;
    setErro("");
    try {
      await apagarLink(token);
      aoMudar(null);
    } catch (e) {
      setErro((e as Error).message);
    }
  };
  const copiar = async () => {
    await navigator.clipboard.writeText(location.href);
    setCopiado(true);
  };

  if (token) {
    return (
      <div className="flex flex-col gap-2 rounded-xl bg-paper p-3 text-sm">
        <p>A sua compra está guardada neste endereço. Quem tiver o link consegue abrir.</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={copiar}>
            {copiado ? "Link copiado" : "Copiar o link"}
          </Button>
          <Button size="sm" variant="ghost" onClick={apagar}>
            Apagar tudo
          </Button>
        </div>
        {erro && <p className="text-bad">{erro}</p>}
      </div>
    );
  }
  if (!aberto) {
    return (
      <Button size="sm" variant="outline" onClick={() => setAberto(true)}>
        Guardar a minha compra
      </Button>
    );
  }
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-paper p-3 text-sm">
      <label className="flex items-start gap-2">
        <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} className="mt-1 accent-[var(--ink)]" />
        <span>{CONSENTIMENTO_LINK}</span>
      </label>
      <div className="flex gap-2">
        <Button size="sm" disabled={!aceite} onClick={criar}>
          Gerar o meu link
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setAberto(false)}>
          Agora não
        </Button>
      </div>
      {erro && <p className="text-bad">{erro}</p>}
    </div>
  );
}
