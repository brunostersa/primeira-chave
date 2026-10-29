"use client";

import { cn } from "@/components/ui/utils";

/**
 * O e-mail oficial, assinado pelo João-de-barro. No HTML o endereço sai partido em pedaços
 * (o robô que lê o código atrás de e-mail não acha); o mailto só é montado quando a pessoa
 * chega no link (mouse, toque ou teclado).
 */
const USUARIO = "joao";
const DOMINIO = "primeirachave.com.br";

const montar = (e: { currentTarget: HTMLAnchorElement }) => {
  e.currentTarget.href = `mailto:${USUARIO}@${DOMINIO}`;
};

export function EmailJoao({ className }: { className?: string }) {
  return (
    <a href="#" onMouseEnter={montar} onFocus={montar} onTouchStart={montar} className={cn("underline-offset-4 hover:underline", className)}>
      {USUARIO}
      <span>@</span>
      {DOMINIO}
    </a>
  );
}
