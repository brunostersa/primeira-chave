import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-colors disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      variant: {
        /** Ação principal: tinta sobre papel. */
        default: "bg-ink text-paper hover:bg-ink-2",
        /** Ação de dinheiro/conquista: marca-texto. Use no máximo uma por tela. */
        mark: "bg-mark text-ink hover:bg-[#e8c62f]",
        outline: "border-[1.5px] border-ink bg-surface text-ink hover:bg-paper",
        ghost: "text-ink hover:bg-ink/5",
        link: "text-ink underline underline-offset-4 decoration-1 hover:decoration-2 px-0",
      },
      size: {
        default: "h-12 px-5 text-[15px]",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

Button.displayName = "Button";

export { Button, buttonVariants };
