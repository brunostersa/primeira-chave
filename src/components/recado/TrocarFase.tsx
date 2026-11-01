"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Button } from "@/components/ui/button";
import { trocarFase } from "@/lib/recado/inscrever";
import { FASES, type FaseId } from "@/lib/recado/sequencias";
import { cn } from "@/components/ui/utils";

/**
 * Trocar de fase no Recado do João. O e-mail traz um botão por fase; aqui a pessoa confirma
 * com um clique (antivírus de e-mail abrem todos os links sozinhos, então o link só não basta).
 */
const nada = () => () => {};
const lerUrl = () => {
  const q = new URLSearchParams(location.search);
  return `${q.get("t") ?? ""}|${q.get("f") ?? ""}`;
};

export function TrocarFase() {
  // null no servidor (site estático); no navegador, "token|fase" do link.
  const url = useSyncExternalStore(nada, lerUrl, () => null);
  const [token, sugerida] = url === null ? [null, ""] : url.split("|");
  const [escolha, setEscolha] = useState<FaseId | null>(null);
  const fase = escolha ?? (FASES.some((f) => f.id === sugerida) ? (sugerida as FaseId) : null);
  const [estado, setEstado] = useState<"livre" | "salvando" | "ok" | "erro">("livre");
  const [erro, setErro] = useState("");

  const salvar = async () => {
    if (!token || !fase) return;
    setEstado("salvando");
    try {
      await trocarFase(token, fase);
      setEstado("ok");
    } catch (e) {
      setErro((e as Error).message);
      setEstado("erro");
    }
  };

  if (estado === "ok") {
    const f = FASES.find((x) => x.id === fase);
    return (
      <>
        <JoaoDeBarro pose="comemora" humor="feliz" className="h-20 w-auto" />
        <h1 className="font-display text-4xl font-light">Pronto, anotado.</h1>
        <p className="text-lg text-ink-2">
          Os próximos recados vão falar de <b>{f?.rotulo.toLowerCase()}</b>. O primeiro chega em breve.
        </p>
        <Button asChild variant="outline">
          <Link href="/">Voltar para a Primeira Chave</Link>
        </Button>
      </>
    );
  }

  if (token === "") {
    return (
      <>
        <JoaoDeBarro pose="frente" humor="pensativo" className="h-20 w-auto" />
        <h1 className="font-display text-4xl font-light">Em que fase você está?</h1>
        <p className="text-lg text-ink-2">Este link está incompleto. Use o botão de um dos recados, ou responda um deles contando a sua fase.</p>
      </>
    );
  }

  return (
    <>
      <JoaoDeBarro pose="frente" humor="curioso" className="h-20 w-auto" />
      <h1 className="font-display text-4xl font-light">Em que fase você está?</h1>
      <p className="text-lg text-ink-2">Eu ajusto os próximos e-mails para a sua fase. O recado de quinta continua igual.</p>
      <fieldset className="flex w-full flex-col gap-2">
        <legend className="sr-only">A sua fase</legend>
        {FASES.map((f) => (
          <label
            key={f.id}
            className={cn(
              "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-3",
              fase === f.id ? "border-ink bg-mark" : "border-line bg-paper hover:border-ink",
            )}
          >
            <input type="radio" name="fase" value={f.id} checked={fase === f.id} onChange={() => setEscolha(f.id)} className="sr-only" />
            <b>{f.rotulo}</b>
            <span className="text-sm text-ink-2">{f.pergunta}</span>
          </label>
        ))}
      </fieldset>
      <Button onClick={salvar} disabled={!token || !fase || estado === "salvando"}>
        {estado === "salvando" ? "Salvando…" : "Mudar a minha fase"}
      </Button>
      {estado === "erro" && (
        <p role="alert" className="text-sm text-bad">
          {erro}
        </p>
      )}
    </>
  );
}
