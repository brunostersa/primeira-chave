"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enviarLeadImovel, linkWhatsapp } from "@/lib/hub";

const digitos = (v: string) => v.replace(/\D/g, "");

/** Máscara (62) 98205-8386 enquanto digita. */
function mascara(v: string) {
  const d = digitos(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
}

/**
 * Quero esta casa: nome e WhatsApp entram na base de leads (Hub) e, em seguida, a conversa
 * abre no WhatsApp de quem atende, já com a casa na mensagem. Se o Hub falhar, a pessoa
 * segue para o WhatsApp mesmo assim: não perdemos o interessado por um erro nosso.
 */
export function ContatoImovel({ imovelId, titulo, whatsapp, tom = "escuro" }: { imovelId: string; titulo: string; whatsapp: string; tom?: "escuro" | "claro" }) {
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const escuro = tom === "escuro";

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (nome.trim().length < 2) return setErro("Escreva o seu nome.");
    if (digitos(tel).length < 10) return setErro("Confira o seu WhatsApp, com DDD.");
    setErro("");
    setEnviando(true);
    const mensagem = `Oi! Sou ${nome.trim()} e vi na Primeira Chave a ${titulo}. Quero saber mais e agendar uma visita.`;
    try {
      await enviarLeadImovel({ nome: nome.trim(), telefone: digitos(tel), imovel: imovelId, mensagem });
    } catch {
      // segue para o WhatsApp mesmo sem o registro
    }
    location.href = linkWhatsapp(whatsapp, mensagem);
  }

  const campo = escuro ? "border-paper/30 bg-paper/10 text-paper placeholder:text-paper/50" : "border-line bg-surface text-ink placeholder:text-muted";
  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-3">
      <label className="sr-only" htmlFor={`nome-${tom}`}>
        Seu nome
      </label>
      <input id={`nome-${tom}`} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" autoComplete="name" className={`h-12 rounded-xl border-[1.5px] px-4 text-base ${campo}`} />
      <label className="sr-only" htmlFor={`tel-${tom}`}>
        Seu WhatsApp
      </label>
      <input
        id={`tel-${tom}`}
        value={tel}
        onChange={(e) => setTel(mascara(e.target.value))}
        placeholder="Seu WhatsApp com DDD"
        inputMode="tel"
        autoComplete="tel-national"
        className={`h-12 rounded-xl border-[1.5px] px-4 text-base tabular-nums ${campo}`}
      />
      {erro && (
        <p role="alert" className={escuro ? "text-sm text-mark" : "text-sm text-bad"}>
          {erro}
        </p>
      )}
      <Button type="submit" size="lg" variant="mark" disabled={enviando} className="h-auto min-h-12 py-3 whitespace-normal">
        <MessageCircle className="size-5" />
        {enviando ? "Abrindo o WhatsApp…" : "Quero esta casa: chamar no WhatsApp"}
      </Button>
      <p className={escuro ? "text-xs text-paper/70" : "text-xs text-muted"}>
        Seu nome e WhatsApp ficam com a Primeira Chave só para o atendimento desta casa.{" "}
        <Link href="/privacidade/" className="underline underline-offset-2">
          Privacidade
        </Link>
        .
      </p>
    </form>
  );
}

/** Balão do WhatsApp para dúvidas ou sugestões, no canto esquerdo (o direito é do convite do Recado). */
export function BalaoWhatsapp({ whatsapp, texto, className }: { whatsapp: string; texto: string; className?: string }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className={`fixed left-4 z-40 flex flex-col items-start gap-2 ${className ?? "bottom-4"}`}>
      {aberto && (
        <div className="momento-sobe w-64 rounded-2xl border-[1.5px] border-ink bg-surface p-4 shadow-[4px_4px_0_var(--ink)]">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold">Dúvida ou sugestão?</p>
            <button type="button" onClick={() => setAberto(false)} aria-label="Fechar" className="-m-1 rounded-full p-1 hover:bg-paper">
              <X className="size-4" />
            </button>
          </div>
          <p className="mt-1 text-sm text-ink-2">Fale com a gente no WhatsApp. Respondemos em horário comercial.</p>
          <a href={linkWhatsapp(whatsapp, texto)} rel="noopener" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-ink hover:brightness-95">
            <MessageCircle className="size-4" /> Abrir o WhatsApp
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-label="Dúvidas ou sugestões pelo WhatsApp"
        className="flex size-14 items-center justify-center rounded-full border-[1.5px] border-ink bg-[#25D366] text-ink shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="size-7" />
      </button>
    </div>
  );
}
