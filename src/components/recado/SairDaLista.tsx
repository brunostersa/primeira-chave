"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Button } from "@/components/ui/button";
import { sairDaLista } from "@/lib/recado/inscrever";

/**
 * Sair do Recado do João. Pede um clique de confirmação de propósito: antivírus de e-mail
 * abrem os links sozinhos, e sair sem querer é pior que um clique a mais.
 */
const nada = () => () => {};

export function SairDaLista() {
  // null no servidor (site estático); no navegador, o ?t= do link.
  const token = useSyncExternalStore(nada, () => new URLSearchParams(location.search).get("t") ?? "", () => null);
  const [estado, setEstado] = useState<"livre" | "saindo" | "ok" | "erro">("livre");
  const [erro, setErro] = useState("");

  const sair = async () => {
    if (!token) return;
    setEstado("saindo");
    try {
      await sairDaLista(token);
      setEstado("ok");
    } catch (e) {
      setErro((e as Error).message);
      setEstado("erro");
    }
  };

  if (estado === "ok") {
    return (
      <>
        <JoaoDeBarro pose="voando" humor="gentil" className="h-20 w-auto" />
        <h1 className="font-display text-4xl font-light">Pronto, você saiu da lista.</h1>
        <p className="text-lg text-ink-2">Não vamos mandar mais nenhum recado. Se mudar de ideia, é só se inscrever de novo. Boa sorte com a casa!</p>
        <Button asChild variant="outline">
          <Link href="/">Voltar para a Primeira Chave</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <JoaoDeBarro pose="frente" humor="pensativo" className="h-20 w-auto" />
      <h1 className="font-display text-4xl font-light">Sair do Recado do João?</h1>
      {token === null || token ? (
        <>
          <p className="text-lg text-ink-2">Você para de receber o recado semanal e os e-mails da sua fase. Dá para voltar quando quiser.</p>
          <Button onClick={sair} disabled={!token || estado === "saindo"}>
            {estado === "saindo" ? "Saindo…" : "Sim, sair da lista"}
          </Button>
          {estado === "erro" && (
            <p role="alert" className="text-sm text-bad">
              {erro}
            </p>
          )}
        </>
      ) : (
        <p className="text-lg text-ink-2">
          Este link está incompleto. Use o link “Sair da lista” no fim de qualquer recado, ou responda um deles pedindo para sair.
        </p>
      )}
    </>
  );
}
