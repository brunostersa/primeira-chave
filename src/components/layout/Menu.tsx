"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown, Menu as IconeMenu, X } from "lucide-react";
import { LogoNome } from "@/components/brand/Logo";
import { EmBreve } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import type { HubNav, ItemNav } from "@/lib/navegacao";

type Props = { hubs: HubNav[]; simular: { href: string; titulo: string } };

/** Clique num link dentro do menu: hora de fechar. */
const clicouEmLink = (e: MouseEvent) => !!(e.target as HTMLElement).closest("a");

export function Menu({ hubs, simular }: Props) {
  return (
    <>
      <MenuDesktop hubs={hubs} />
      <Button asChild variant="mark" className="ml-auto h-11 px-4 lg:ml-0">
        <Link href={simular.href}>Simular</Link>
      </Button>
      <MenuMobile hubs={hubs} simular={simular} />
    </>
  );
}

/* ——— desktop: disclosure por hub (padrão WAI-ARIA), abre no clique, painel largo */

function MenuDesktop({ hubs }: { hubs: HubNav[] }) {
  const [aberto, setAberto] = useState<HubNav["id"] | null>(null);
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
    navRef.current?.querySelector<HTMLButtonElement>(`[data-hub="${aberto}"]`)?.focus();
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
        {hubs.map((h) => {
          const id = `${base}-${h.id}`;
          const estaAberto = aberto === h.id;
          return (
            <li key={h.id}>
              <button
                type="button"
                data-hub={h.id}
                aria-expanded={estaAberto}
                aria-controls={id}
                onClick={() => setAberto(estaAberto ? null : h.id)}
                className={cn(
                  "inline-flex h-11 items-center gap-1 rounded-lg px-2.5 text-[15px] font-semibold text-ink hover:bg-ink/5",
                  estaAberto && "bg-ink/5",
                )}
              >
                <RotuloHub hub={h} />
                <ChevronDown aria-hidden strokeWidth={1.75} className={cn("size-4 transition-transform", estaAberto && "rotate-180")} />
              </button>
              <div
                id={id}
                hidden={!estaAberto}
                onClick={(e) => clicouEmLink(e) && setAberto(null)}
                className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_18px_40px_-24px_rgb(18_20_24/0.35)]"
              >
                <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-10 px-6 py-8">
                  <div className="flex flex-col gap-3">
                    <p className="font-mono text-xs uppercase tracking-[0.07em] text-muted">{h.rotulo}</p>
                    <p className="font-display text-2xl font-light leading-tight">{h.resumo}</p>
                    {h.href && (
                      <Link href={h.href} className="font-semibold underline underline-offset-4">
                        Ver tudo sobre {h.rotulo}
                      </Link>
                    )}
                  </div>
                  <ListaItens itens={h.itens} className="grid-cols-2" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function RotuloHub({ hub }: { hub: HubNav }) {
  if (!hub.curto) return <>{hub.rotulo}</>;
  return (
    <>
      <abbr title={hub.rotulo} className="no-underline xl:hidden">
        {hub.curto}
      </abbr>
      <span className="hidden xl:inline">{hub.rotulo}</span>
    </>
  );
}

/** Lista de páginas de um hub. Planejadas viram texto com "em breve", sem link. */
function ListaItens({ itens, className }: { itens: ItemNav[]; className?: string }) {
  return (
    <ul className={cn("grid gap-x-6", className)}>
      {itens.map((i) => (
        <li key={i.id}>
          {i.href ? (
            <Link href={i.href} className="flex min-h-11 items-center rounded-lg py-1.5 font-semibold underline-offset-4 hover:underline">
              {i.titulo}
            </Link>
          ) : (
            <span className="block py-2.5 text-muted">
              {i.titulo} <EmBreve className="ml-1 align-[0.15em]" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ——— mobile: tela cheia como diálogo modal, foco preso, Esc fecha, hubs em acordeão */

function MenuMobile({ hubs, simular }: Props) {
  const [aberto, setAberto] = useState(false);
  const [hubAberto, setHubAberto] = useState<HubNav["id"] | null>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const base = useId();

  const fechar = (devolverFoco = true) => {
    setAberto(false);
    if (devolverFoco) botaoRef.current?.focus();
  };

  useEffect(() => {
    if (!aberto) return;
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    painelRef.current?.querySelector<HTMLElement>("[data-fechar]")?.focus();
    // Se a tela crescer até o menu de desktop, o diálogo some sozinho.
    const largo = window.matchMedia("(min-width: 1024px)");
    const aoMudar = () => largo.matches && setAberto(false);
    largo.addEventListener("change", aoMudar);
    return () => {
      document.body.style.overflow = antes;
      largo.removeEventListener("change", aoMudar);
    };
  }, [aberto]);

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
              <Link href="/" aria-label="Primeira Chave, página inicial" className="text-[20px] no-underline">
                <LogoNome />
              </Link>
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

            <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
              <Button asChild variant="mark" size="lg" className="w-full">
                <Link href={simular.href}>Simular meu financiamento</Link>
              </Button>

              <nav aria-label="Principal">
                <ul className="border-t border-line">
                  {hubs.map((h) => {
                    const id = `${base}-${h.id}`;
                    const estaAberto = hubAberto === h.id;
                    return (
                      <li key={h.id} className="border-b border-line">
                        <button
                          type="button"
                          aria-expanded={estaAberto}
                          aria-controls={id}
                          onClick={() => setHubAberto(estaAberto ? null : h.id)}
                          className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left font-display text-xl font-semibold"
                        >
                          {h.rotulo}
                          <ChevronDown
                            aria-hidden
                            strokeWidth={1.75}
                            className={cn("size-5 shrink-0 transition-transform", estaAberto && "rotate-180")}
                          />
                        </button>
                        <div id={id} hidden={!estaAberto} className="pb-4">
                          <p className="mb-2 text-sm text-ink-2">{h.resumo}</p>
                          {h.href && (
                            <Link href={h.href} className="flex min-h-11 items-center font-semibold underline underline-offset-4">
                              Ver tudo sobre {h.rotulo}
                            </Link>
                          )}
                          <ListaItens itens={h.itens} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
