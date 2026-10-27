import Link from "next/link";
import { cn } from "@/components/ui/utils";
import { migalhas } from "@/lib/navegacao";
import { SITE } from "@/lib/site-config";

/**
 * Breadcrumb visível + JSON-LD BreadcrumbList, os dois da mesma trilha
 * (início → hub → página). Hub planejado fica de fora até ser publicado.
 */
export function Breadcrumbs({ id, className }: { id: string; className?: string }) {
  const trilha = migalhas(id);
  if (trilha.length < 2) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trilha.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.titulo,
      ...(i < trilha.length - 1 && { item: `${SITE.url}${m.href}` }),
    })),
  };

  return (
    <nav aria-label="Você está em" className={cn("mx-auto max-w-6xl px-4 pt-4 sm:px-6", className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted">
        {trilha.map((m, i) => {
          const ultimo = i === trilha.length - 1;
          return (
            <li key={m.id} className="flex min-w-0 items-center gap-1.5">
              {ultimo ? (
                <span aria-current="page" className="text-ink">
                  {m.titulo}
                </span>
              ) : (
                <>
                  <Link href={m.href!} className="inline-flex min-h-6 items-center underline underline-offset-4 decoration-line hover:decoration-ink">
                    {m.titulo}
                  </Link>
                  <span aria-hidden className="font-mono text-xs">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
