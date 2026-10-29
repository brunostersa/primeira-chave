import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import type { MetadataRoute } from "next";
import { CARTAS } from "@/lib/conteudo/duvide";
import { PERSONAS } from "@/lib/conteudo/personas";
import { ARVORE, type No } from "@/lib/conteudo/arvore";
import { naRotaUnica } from "@/lib/conteudo/textos";
import { arquivoFigura, figurasDe } from "@/lib/conteudo/figuras";
import { SITE } from "@/lib/site-config";
import { MODELOS } from "@/lib/modelos/modelos";

export const dynamic = "force-static";

type Frequencia = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/** Arquivo da página no app: "/atalhos/registrato/" → src/app/(site)/atalhos/registrato/page.tsx */
const arquivo = (slug: string) => `src/app/(site)${slug.replace(/\/$/, "")}/page.tsx`;

/**
 * Data do último commit que mexeu na página. Usar a data do build faria todo
 * deploy anunciar ao Google que todas as páginas mudaram.
 */
function ultimaAlteracao(caminho: string): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", caminho], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

/** Páginas da rota única: o texto mora em src/lib/conteudo/textos/<arquivo>.ts. */
const PASTA_TEXTOS = "src/lib/conteudo/textos";
const TEXTOS_FONTE = readdirSync(PASTA_TEXTOS).map((f) => ({ f: `${PASTA_TEXTOS}/${f}`, s: readFileSync(`${PASTA_TEXTOS}/${f}`, "utf8") }));
const fonteDoTexto = (id: string) => TEXTOS_FONTE.find(({ s }) => new RegExp(`\\n  "?${id.replace(/^g-/, "")}"?: \\{`).test(s))?.f;

/** Modelos de contrato: uma rota dinâmica (modelos-de-contrato/[modelo]) monta cada um. */
const ehModelo = (n: No) => n.tipo === "modelo" && MODELOS.some((m) => m.id === n.id);

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
  modelo: "monthly",
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
  ...(SITE.recado ? [{ slug: "/recado/", tipo: "hub" as const, prioridade: 2 as const }] : []),
  { slug: "/privacidade/", tipo: "glossario", prioridade: 3 },
  { slug: "/duvide/", tipo: "hub", prioridade: 2 },
  { slug: "/duvide/corretor/", tipo: "hub", prioridade: 3 },
  ...CARTAS.map((c) => ({ slug: `/duvide/${c.id}/`, tipo: "guia" as const, prioridade: 2 as const })),
  { slug: "/para/", tipo: "hub", prioridade: 2 },
  ...PERSONAS.map((p) => ({ slug: `/para/${p.id}/`, tipo: "guia" as const, prioridade: 3 as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  // As rotas fixas existem por construção (página própria ou rota dinâmica com generateStaticParams).
  const daArvore = ARVORE.filter((n) => n.status === "publicado").filter((n) => existsSync(arquivo(n.slug)) || naRotaUnica(n) || ehModelo(n));
  const absoluta = (url: string) => `${SITE.url}${url}`;
  return [
    ...daArvore.map((n) => ({
      // trailingSlash: true no next.config — a URL canônica termina em "/".
      url: absoluta(n.slug),
      lastModified: ultimaAlteracao(ehModelo(n) ? "src/lib/modelos/modelos.ts" : existsSync(arquivo(n.slug)) ? arquivo(n.slug) : (fonteDoTexto(n.id) ?? arquivo(n.slug))),
      changeFrequency: FREQUENCIA[n.tipo],
      priority: prioridade(n),
      // Infográficos da página: entram no Google Imagens ligados a ela.
      images: figurasDe(n.id).map((f) => absoluta(arquivoFigura(n.id, f.id))),
    })),
    ...FIXAS.map((n) => {
      const carta = n.slug.match(/^\/duvide\/([\w-]+)\/$/)?.[1];
      const ehCarta = carta && carta !== "corretor";
      return {
        url: absoluta(n.slug),
        lastModified: ultimaAlteracao(ehCarta ? "src/lib/conteudo/duvide.ts" : n.slug.startsWith("/para/") ? "src/lib/conteudo/personas.ts" : arquivo(n.slug)),
        changeFrequency: FREQUENCIA[n.tipo],
        priority: prioridade(n),
        images: ehCarta ? [absoluta(`/cartas/${carta}.jpg`)] : n.slug === "/duvide/corretor/" ? CARTAS.map((c) => absoluta(`/cartas/${c.id}.jpg`)) : [],
      };
    }),
  ];
}
