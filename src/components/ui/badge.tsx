import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

/** Sinal de situação ("Parcela: cabe na renda"). A cor vem do ponto, não do fundo. */
const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink",
  {
    variants: {
      tone: {
        neutral: "[&_i]:bg-muted",
        ok: "[&_i]:bg-ok",
        warn: "[&_i]:bg-warn",
        bad: "[&_i]:bg-bad",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

function Badge({ className, tone, children, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      <i aria-hidden className="size-2 rounded-full" />
      {children}
    </span>
  );
}

/** Rótulo em mono, maiúsculo (sobrancelha de seção). */
function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("font-mono text-xs uppercase tracking-[0.07em] text-muted", className)} {...props} />;
}

/** Página planejada na árvore: aparece como texto, nunca como link quebrado. */
function EmBreve({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase leading-none tracking-[0.07em] text-muted",
        className,
      )}
      {...props}
    >
      em breve
    </span>
  );
}

export { Badge, badgeVariants, EmBreve, Eyebrow };
