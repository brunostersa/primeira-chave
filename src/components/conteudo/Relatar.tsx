"use client";

import { useState } from "react";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Button } from "@/components/ui/button";
import { Janela } from "@/components/ui/janela";
import { cn } from "@/components/ui/utils";
import { enviarRelato, type TipoRelato } from "@/lib/hub";

/**
 * "Algo errado aqui?" e "Sugerir uma ideia": o mesmo formulário curto, nos lugares-chave
 * (fim dos guias, resultado do simulador, rodapé, /links), aberto numa janela. Vai para o Hub da CustomerHub.
 * `contexto` diz de onde veio (ex.: "guia:documentos-financiamento", "simulador:resultado").
 */

const TEXTOS: Record<TipoRelato, { botao: string; titulo: string; dica: string }> = {
  erro: {
    botao: "Algo errado aqui?",
    titulo: "O que está errado?",
    dica: "Um número que não bate com o banco, um link quebrado, uma regra desatualizada…",
  },
  sugestao: {
    botao: "Sugerir uma ideia",
    titulo: "Qual a sua ideia?",
    dica: "Uma pergunta que ficou sem resposta, uma calculadora que faltou, um assunto para explicar…",
  },
};

export function Relatar({ contexto, tipos = ["erro", "sugestao"], className }: { contexto: string; tipos?: TipoRelato[]; className?: string }) {
  const [tipo, setTipo] = useState<TipoRelato | null>(null);
  const [texto, setTexto] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok" | "falhou">("livre");

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipo || texto.trim().length < 3) return;
    setEstado("enviando");
    try {
      await enviarRelato({ tipo, texto: texto.trim(), email: email.trim(), contexto });
      setEstado("ok");
    } catch {
      setEstado("falhou");
    }
  };

  const fechar = () => {
    setTipo(null);
    // Depois de enviado, a próxima abertura começa do zero.
    if (estado === "ok") {
      setTexto("");
      setEstado("livre");
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-x-5 gap-y-1 text-sm", className)}>
      {tipos.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTipo(t)}
          aria-haspopup="dialog"
          className="inline-flex min-h-11 items-center underline underline-offset-4 decoration-1 hover:decoration-2"
        >
          {TEXTOS[t].botao}
        </button>
      ))}

      <Janela aberta={!!tipo} aoFechar={fechar} titulo={tipo ? TEXTOS[tipo].titulo : ""}>
        {tipo && estado === "ok" ? (
          <div role="status" className="flex flex-col items-start gap-4 pt-2">
            <JoaoDeBarro pose="frente" humor="feliz" className="h-16 w-auto" />
            <p className="font-display text-2xl font-semibold leading-tight">Recebido, obrigado!</p>
            <p className="text-[15px] text-ink-2">O João leva isso para a obra.{email.trim() && " Se precisar, respondemos no seu e-mail."}</p>
            <Button onClick={fechar} className="w-full sm:w-auto">
              Fechar
            </Button>
          </div>
        ) : (
          tipo && (
            <form onSubmit={enviar} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 pr-10">
                <p className="font-mono text-xs uppercase tracking-[0.07em] text-muted">{tipo === "erro" ? "Avisar um erro" : "Uma ideia para a Primeira Chave"}</p>
                <h2 className="font-display text-[26px] font-semibold leading-tight">{TEXTOS[tipo].titulo}</h2>
                <p className="text-[15px] text-ink-2">{TEXTOS[tipo].dica}</p>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="sr-only">{TEXTOS[tipo].titulo}</span>
                <textarea
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  required
                  minLength={3}
                  maxLength={2000}
                  rows={4}
                  placeholder="Escreva aqui, do seu jeito."
                  className="resize-none rounded-xl border-[1.5px] border-line bg-paper p-3.5 text-base outline-none focus:border-ink"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold">
                  Seu e-mail <span className="font-normal text-muted">· opcional, se quiser resposta</span>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="seu@email.com"
                  className="h-12 rounded-xl border-[1.5px] border-line bg-paper px-3.5 text-base outline-none focus:border-ink"
                />
              </label>
              {estado === "falhou" && (
                <p role="alert" className="text-sm text-bad">
                  Não deu para enviar agora. Tente de novo em instantes.
                </p>
              )}
              <Button type="submit" size="lg" disabled={estado === "enviando" || texto.trim().length < 3} className="w-full">
                {estado === "enviando" ? "Enviando…" : "Enviar"}
              </Button>
              <p className="text-xs text-muted">Usamos o que você escrever só para melhorar a Primeira Chave. Não escreva CPF, renda ou outros dados pessoais.</p>
            </form>
          )
        )}
      </Janela>
    </div>
  );
}
