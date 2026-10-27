# Primeira Chave

**primeirachave.com.br** · financiamento do primeiro imóvel, em palavras que dá pra entender.

Produto educativo (lowticket + SEO) que traduz o financiamento habitacional para quem vai comprar o primeiro imóvel e para quem vai vender um usado.

## Stack

Mesmo padrão do site da Busta (`customerhub/clientes/bustaeamaralsite`):

- **Next.js 16** (App Router) + **React 19** + **TypeScript**, export estático (`out/`) — serve em Vercel ou Hostinger
- **Tailwind 4** com os tokens da marca em `@theme` (`src/app/globals.css`)
- Componentes base no padrão shadcn (`cva` + `cn`) em `src/components/ui`
- Fontes via `next/font`: Outfit (títulos), Figtree (texto), IBM Plex Mono (dados)
- **Vitest** para o motor de cálculo

## Estrutura

```
src/
  app/
    page.tsx              home
    simulador/            simulador guiado (client component)
    marca/                guia vivo da marca (noindex) — cores, tipografia, logo, mascote, componentes, voz
    mapa/                 mapa do site com o "organismo" (grafo das páginas)
    sitemap.ts robots.ts  SEO técnico (lastModified pelo git)
  components/
    ui/                   Button, Card, Badge/Eyebrow
    brand/                LogoNome, LogoAssinatura, Icone, Cota, JoaoDeBarro, Ninho
    simulador/            perguntas (dados), campos, Simulador, Resultado
    layout/               Header, Menu, Footer, Breadcrumbs (derivados da árvore — docs/navegacao.md)
  lib/
    financiamento/        params.ts (regras), engine.ts (motor) + engine.test.ts
    conteudo/             arvore.ts (TODAS as páginas: hub, etapa, termos, ligações) + links.ts (motor de links) + arvore.test.ts (sem órfãs, ≤3 cliques)
    conteudo/             arvore.ts (fonte única de páginas), links.ts
    navegacao.ts          menu, rodapé e breadcrumb a partir da árvore
    format.ts site-config.ts
docs/                     negócio, marca, regras, jornada, roadmap, pesquisa de busca
prototipo/                o simulador em HTML único (referência histórica)
referencias/              material público usado como fonte
```

## Comandos

```bash
npm run dev        # http://localhost:3000 (no workspace: preview "primeira-chave", porta 3520)
npm test           # motor de cálculo (bate com o simulador da Caixa)
npm run build      # gera out/
npm run lint
```

Regras do motor e o que falta conferir: `docs/regras-financiamento.md`. Padrões visuais: abrir `/marca`.
