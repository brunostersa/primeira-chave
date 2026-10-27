import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const cardVariants = cva("rounded-[var(--radius-card)] p-5 sm:p-6", {
  variants: {
    variant: {
      default: "bg-surface border border-line",
      /** Destaque: contorno em tinta (ex.: "Seu próximo passo"). */
      strong: "bg-surface border-[1.5px] border-ink",
      /** "O segredo" e conquistas: marca-texto cheio. Uma por página. */
      mark: "bg-mark text-ink",
      /** Assuntos do banco e documentos. */
      planta: "bg-planta text-ink",
      /** Alerta de bloqueio. */
      bad: "bg-bad-soft text-ink",
    },
  },
  defaultVariants: { variant: "default" },
});

function Card({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return <div data-slot="card" className={cn(cardVariants({ variant }), className)} {...props} />;
}

export { Card, cardVariants };
