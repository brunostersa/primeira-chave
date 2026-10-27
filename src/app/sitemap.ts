import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import type { MetadataRoute } from "next";
import { CARTAS } from "@/lib/conteudo/duvide";
import { PERSONAS } from "@/lib/conteudo/personas";
import { ARVORE, type No } from "@/lib/conteudo/arvore";
import { naRotaUnica } from "@/lib/conteudo/textos";
import { SITE } from "@/lib/site-config";

export const dynamic = "force-static";

type Frequencia = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/** Arquivo da página no app: "/atalhos/registrato/" → src/app/(site)/atalhos/registrato/page.tsx */
const arquivo = (slug: string) => `src/app/(site)${slug.replace(/\/$/, "")}/page.tsx`;

/**
 * Data do último commit que mexeu na página. Usar a data do build faria todo
 * deploy anunciar ao Google que todas as páginas mudaram.
 */
function ultimaAlteracao(slug: string): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", arquivo(slug)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

const FREQUENCIA: Record<No["tipo"], Frequencia> = {
  inicio: "weekly",
  nucleo: "monthly",
  hub: "weekly",
  guia: "monthly",
  ferramenta: "monthly",
  atalho: "monthly",
  programatica: "monthly",
  local: "monthly",
  glossario: "yearly",
};

const prioridade = (n: Pick<No, "tipo" | "prioridade">) => (n.tipo === "inicio" ? 1 : n.tipo === "nucleo" ? 0.9 : { 1: 0.8, 2: 0.6, 3: 0.4 }[n.prioridade]);

/**
 * Derivado da árvore de conteúdo: só entra o que está `publicado` e tem página — page.tsx
 * própria ou conteúdo montado pela rota única (nunca uma URL 404 no sitemap).
 */
/** Páginas que existem fora da árvore e devem ser indexadas. */
const FIXAS: { slug: string; tipo: No["tipo"]; prioridade: No["prioridade"] }[] = [
  { slug: "/mapa/", tipo: "hub", prioridade: 3 },
  { slug: "/sobre/", tipo: "hub", prioridade: 3 },
  { slug: "/duvide/", tipo: "hub", prioridade: 2 },
  { slug: "/duvide/corretor/", tipo: "hub", prioridade: 3 },
  ...CARTAS.map((c) => ({ slug: `/duvide/${c.id}/`, tipo: "guia" as const, prioridade: 2 as const })),
  { slug: "/para/", tipo: "hub", prioridade: 2 },
  ...PERSONAS.map((p) => ({ slug: `/para/${p.id}/`, tipo: "guia" as const, prioridade: 3 as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  // As rotas fixas existem por construção (página própria ou rota dinâmica com generateStaticParams).
  const daArvore = ARVORE.filter((n) => n.status === "publicado").filter((n) => existsSync(arquivo(n.slug)) || naRotaUnica(n));
  return [...daArvore, ...FIXAS].map((n) => ({
    // trailingSlash: true no next.config — a URL canônica termina em "/".
    url: `${SITE.url}${n.slug}`,
    lastModified: ultimaAlteracao(n.slug),
    changeFrequency: FREQUENCIA[n.tipo],
    priority: prioridade(n),
  }));
}
