"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Menu as IconeMenu, X } from "lucide-react";
import { LogoNome } from "@/components/brand/Logo";
import { EmBreve } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import type { GrupoNav, ItemNav, SecaoNav } from "@/lib/navegacao";

type Props = { secoes: SecaoNav[]; simular: { href: string; titulo: string } };

/** Clique num link dentro do menu: hora de fechar. */
const clicouEmLink = (e: MouseEvent) => !!(e.target as HTMLElement).closest("a");

export function Menu({ secoes, simular }: Props) {
  return (
    <>
      <MenuDesktop secoes={secoes} />
      <Button asChild variant="mark" className="ml-auto h-11 px-4 lg:ml-0">
        <Link href={simular.href}>Simular</Link>
      </Button>
      <MenuMobile secoes={secoes} simular={simular} />
    </>
  );
}

/* ——— peças comuns ——————————————————————————————————————————————————————————— */

/** Uma página no menu: título forte e o resumo de uma linha. Planejada vira texto "em breve". */
function LinkPagina({ i, comResumo = true }: { i: ItemNav; comResumo?: boolean }) {
  if (!i.href)
    return (
      <span className="block rounded-lg px-3 py-2 text-muted">
        {i.titulo} <EmBreve className="ml-1 align-[0.15em]" />
      </span>
    );
  return (
    <Link href={i.href} className="group/item flex min-h-11 flex-col justify-center rounded-lg px-3 py-2 hover:bg-ink/5">
      <span className="font-semibold leading-snug underline-offset-4 group-hover/item:underline">{i.titulo}</span>
      {comResumo && i.resumo && <span className="line-clamp-1 text-sm text-ink-2">{i.resumo}</span>}
    </Link>
  );
}

function VerTodos({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 px-3 font-semibold underline underline-offset-4">
      {children}
      <ArrowRight aria-hidden strokeWidth={1.75} className="size-4" />
    </Link>
  );
}

/* ——— desktop: 5 portas; cada uma abre um painel. "Comprar" é cascata: fase → páginas */

function MenuDesktop({ secoes }: { secoes: SecaoNav[] }) {
  const [aberto, setAberto] = useState<SecaoNav["id"] | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const base = useId();

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setAberto(null);
    };
    document.addEventListener("pointerdown", fora);
    return () => document.removeEventListener("pointerdown", fora);
  }, [aberto]);

  const teclado = (e: KeyboardEvent) => {
    if (e.key !== "Escape" || !aberto) return;
    navRef.current?.querySelector<HTMLButtonElement>(`[data-secao="${aberto}"]`)?.focus();
    setAberto(null);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Principal"
      className="ml-auto hidden lg:block"
      onKeyDown={teclado}
      onBlur={(e) => {
        if (!navRef.current?.contains(e.relatedTarget as Node)) setAberto(null);
      }}
    >
      <ul className="flex items-center gap-0.5">
        {secoes.map((s) => {
          const id = `${base}-${s.id}`;
          const estaAberto = aberto === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                data-secao={s.id}
                aria-expanded={estaAberto}
                aria-controls={id}
                onClick={() => setAberto(estaAberto ? null : s.id)}
                className={cn("inline-flex h-11 items-center gap-1 rounded-lg px-3 text-[15px] font-semibold text-ink hover:bg-ink/5", estaAberto && "bg-ink/5")}
              >
                {s.rotulo}
                <ChevronDown aria-hidden strokeWidth={1.75} className={cn("size-4 transition-transform", estaAberto && "rotate-180")} />
              </button>
              <div
                id={id}
                hidden={!estaAberto}
                onClick={(e) => clicouEmLink(e) && setAberto(null)}
                className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_18px_40px_-24px_rgb(18_20_24/0.35)]"
              >
                <div className="mx-auto max-w-6xl px-6 py-7">{s.grupos ? <PainelCascata secao={s} /> : <PainelLista secao={s} />}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Comprar: à esquerda as fases (passar o mouse, focar ou clicar troca); no meio, só as páginas da fase. */
function PainelCascata({ secao }: { secao: SecaoNav }) {
  const grupos = secao.grupos!;
  const [ativo, setAtivo] = useState(grupos[0].id);
  const g = grupos.find((x) => x.id === ativo)!;
  return (
    <div className="grid grid-cols-[15rem_minmax(0,1fr)_14rem] gap-8">
      <ol className="flex flex-col gap-1" aria-label="Fases da compra">
        {grupos.map((x, i) => (
          <li key={x.id}>
            <button
              type="button"
              aria-pressed={x.id === ativo}
              onClick={() => setAtivo(x.id)}
              onMouseEnter={() => setAtivo(x.id)}
              onFocus={() => setAtivo(x.id)}
              className={cn(
                "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left font-semibold",
                x.id === ativo ? "bg-mark-soft text-ink" : "text-ink-2 hover:bg-ink/5",
              )}
            >
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{x.rotulo}</span>
              <ChevronRight aria-hidden strokeWidth={1.75} className={cn("size-4", x.id === ativo ? "opacity-100" : "opacity-30")} />
            </button>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-2 border-l border-line pl-8" aria-live="polite">
        <p className="px-3 font-display text-2xl font-light leading-tight">{g.pergunta}</p>
        <ul className="grid grid-cols-2 gap-x-4">
          {g.itens.map((i) => (
            <li key={i.id}>
              <LinkPagina i={i} />
            </li>
          ))}
        </ul>
        <VerTodos href={g.href}>{g.total > g.itens.length ? `Ver as ${g.total} páginas desta fase` : "Ver esta fase nos guias"}</VerTodos>
      </div>

      <div className="flex flex-col gap-1 rounded-[var(--radius-card)] bg-surface p-3">
        <p className="px-3 pb-1 font-mono text-xs uppercase tracking-[0.07em] text-muted">Por assunto</p>
        {secao.extras.map((i) => (
          <LinkPagina key={i.id} i={i} comResumo={false} />
        ))}
        {secao.href && <VerTodos href={secao.href}>O caminho completo</VerTodos>}
      </div>
    </div>
  );
}

/** Demais portas: a promessa à esquerda e no máximo 6 páginas; o resto em "Ver tudo". */
function PainelLista({ secao }: { secao: SecaoNav }) {
  return (
    <div className="grid grid-cols-[15rem_minmax(0,1fr)] gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.07em] text-muted">{secao.rotulo}</p>
        <p className="font-display text-2xl font-light leading-tight">{secao.resumo}</p>
        {secao.href && (
          <div className="-mx-3">
            <VerTodos href={secao.href}>Ver tudo</VerTodos>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 border-l border-line pl-8">
        <ul className="grid grid-cols-2 gap-x-4">
          {secao.itens.map((i) => (
            <li key={i.id}>
              <LinkPagina i={i} />
            </li>
          ))}
        </ul>
        {secao.extras.length > 0 && (
          <ul className="flex flex-wrap gap-2 border-t border-line pt-3">
            {secao.extras.map((i) =>
              i.href ? (
                <li key={i.id}>
                  <Link href={i.href} className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold hover:border-ink">
                    {i.titulo}
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ——— mobile: tela cheia (diálogo modal) com navegação em níveis: porta → fase → páginas */

type Nivel = { secao: SecaoNav; grupo?: GrupoNav } | null;

function MenuMobile({ secoes, simular }: Props) {
  const [aberto, setAberto] = useState(false);
  const [nivel, setNivel] = useState<Nivel>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const base = useId();

  const fechar = (devolverFoco = true) => {
    setAberto(false);
    setNivel(null);
    if (devolverFoco) botaoRef.current?.focus();
  };

  // A cada nível novo, o foco vai para o título (leitor de tela anuncia onde a pessoa está).
  useEffect(() => {
    if (aberto && nivel) tituloRef.current?.focus();
  }, [aberto, nivel]);

  useEffect(() => {
    if (!aberto) return;
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    painelRef.current?.querySelector<HTMLElement>("[data-fechar]")?.focus();
    const largo = window.matchMedia("(min-width: 1024px)");
    const aoMudar = () => largo.matches && setAberto(false);
    largo.addEventListener("change", aoMudar);
    return () => {
      document.body.style.overflow = antes;
      largo.removeEventListener("change", aoMudar);
    };
  }, [aberto]);

  const voltar = () => setNivel(nivel?.grupo ? { secao: nivel.secao } : null);

  const teclado = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      fechar();
      return;
    }
    if (e.key !== "Tab" || !painelRef.current) return;
    const focaveis = [...painelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  };

  const linhaBotao = "flex min-h-14 w-full items-center justify-between gap-4 border-b border-line py-3 text-left";

  return (
    <>
      <button
        ref={botaoRef}
        type="button"
        aria-expanded={aberto}
        aria-controls={aberto ? `${base}-menu` : undefined}
        onClick={() => setAberto(true)}
        className="-mr-2 inline-flex h-11 items-center gap-1.5 rounded-lg px-2 text-[15px] font-semibold hover:bg-ink/5 lg:hidden"
      >
        <IconeMenu aria-hidden strokeWidth={1.75} className="size-6" />
        Menu
      </button>
      {/* Portal: o backdrop-blur do header vira bloco de contenção e prenderia o `fixed` nos 64 px dele. */}
      {aberto &&
        createPortal(
          <div
            ref={painelRef}
            id={`${base}-menu`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onKeyDown={teclado}
            onClick={(e) => clicouEmLink(e) && fechar(false)}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-paper lg:hidden"
          >
            <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line bg-paper px-4 sm:px-6">
              {nivel ? (
                <button type="button" onClick={voltar} className="-ml-2 inline-flex h-11 items-center gap-1.5 rounded-lg px-2 text-[15px] font-semibold hover:bg-ink/5">
                  <ArrowLeft aria-hidden strokeWidth={1.75} className="size-5" />
                  {nivel.grupo ? nivel.secao.rotulo : "Menu"}
                </button>
              ) : (
                <Link href="/" aria-label="Primeira Chave, página inicial" className="text-[20px] no-underline">
                  <LogoNome icone />
                </Link>
              )}
              <button
                type="button"
                data-fechar
                onClick={() => fechar()}
                className="-mr-2 inline-flex h-11 items-center gap-1.5 rounded-lg px-2 text-[15px] font-semibold hover:bg-ink/5"
              >
                <X aria-hidden strokeWidth={1.75} className="size-6" />
                Fechar
              </button>
            </div>

            <nav aria-label="Principal" className="flex flex-col gap-5 px-4 py-6 sm:px-6">
              {!nivel && (
                <>
                  <Button asChild variant="mark" size="lg" className="w-full">
                    <Link href={simular.href}>Simular meu financiamento</Link>
                  </Button>
                  <ul className="border-t border-line">
                    {secoes.map((s) => (
                      <li key={s.id}>
                        <button type="button" onClick={() => setNivel({ secao: s })} className={linhaBotao}>
                          <span className="flex flex-col">
                            <span className="font-display text-xl font-semibold">{s.rotulo}</span>
                            <span className="text-sm text-ink-2">{s.resumo}</span>
                          </span>
                          <ChevronRight aria-hidden strokeWidth={1.75} className="size-5 shrink-0" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {nivel && !nivel.grupo && (
                <>
                  <h2 ref={tituloRef} tabIndex={-1} className="font-display text-3xl font-light leading-tight outline-none">
                    {nivel.secao.grupos ? "Em que fase você está?" : nivel.secao.resumo}
                  </h2>
                  {nivel.secao.grupos ? (
                    <ol className="border-t border-line">
                      {nivel.secao.grupos.map((g, i) => (
                        <li key={g.id}>
                          <button type="button" onClick={() => setNivel({ secao: nivel.secao, grupo: g })} className={linhaBotao}>
                            <span className="flex items-baseline gap-3">
                              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                              <span className="flex flex-col">
                                <span className="text-lg font-semibold">{g.rotulo}</span>
                                <span className="text-sm text-ink-2">{g.pergunta}</span>
                              </span>
                            </span>
                            <ChevronRight aria-hidden strokeWidth={1.75} className="size-5 shrink-0" />
                          </button>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="-mx-3">
                      {nivel.secao.itens.map((i) => (
                        <li key={i.id}>
                          <LinkPagina i={i} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {nivel.secao.extras.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <p className="font-mono text-xs uppercase tracking-[0.07em] text-muted">{nivel.secao.grupos ? "Por assunto" : "Também"}</p>
                      <ul className="-mx-3">
                        {nivel.secao.extras.map((i) => (
                          <li key={i.id}>
                            <LinkPagina i={i} comResumo={false} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {nivel.secao.href && (
                    <div className="-mx-3">
                      <VerTodos href={nivel.secao.href}>Ver tudo de {nivel.secao.rotulo}</VerTodos>
                    </div>
                  )}
                </>
              )}

              {nivel?.grupo && (
                <>
                  <h2 ref={tituloRef} tabIndex={-1} className="font-display text-3xl font-light leading-tight outline-none">
                    {nivel.grupo.pergunta}
                  </h2>
                  <ul className="-mx-3">
                    {nivel.grupo.itens.map((i) => (
                      <li key={i.id}>
                        <LinkPagina i={i} />
                      </li>
                    ))}
                  </ul>
                  <div className="-mx-3">
                    <VerTodos href={nivel.grupo.href}>{nivel.grupo.total > nivel.grupo.itens.length ? `Ver as ${nivel.grupo.total} páginas desta fase` : "Ver esta fase nos guias"}</VerTodos>
                  </div>
                </>
              )}
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
