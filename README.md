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

## Publicação (Hostinger)

Cada push na `main` roda `.github/workflows/deploy.yml`: testes, build estático e envio da pasta `out/` por FTP para a Hostinger (só os arquivos que mudaram). Sem os segredos configurados, o workflow testa e gera o build, mas não publica nada.

Segredos em GitHub → Settings → Secrets and variables → Actions:

| Segredo | Onde achar |
|---|---|
| `FTP_SERVER` | hPanel → Arquivos → Contas FTP (IP ou host) |
| `FTP_USERNAME` | mesma tela (ex.: `u123456789`) |
| `FTP_PASSWORD` | senha da conta FTP |
| `FTP_DIR` | pasta do site, terminando em `/` (ex.: `domains/primeirachave.com.br/public_html/` ou `public_html/`, conforme a raiz da conta FTP) |

Também dá para publicar sem push: aba Actions → Deploy Hostinger → Run workflow.

## Dados de mercado (1x por mês)

Mapas e números de mercado vêm de `src/data/mercado/*.json`, gerados por:

```bash
python3 scripts/dados/atualizar.py
```

Baixa o IVG-R (Banco Central), a série do FipeZAP, a malha das UFs (IBGE) as guias de ITBI pagas de São Paulo (com os distritos do GeoSampa) e o ITBI de Recife e Porto Alegre, e grava só os agregados. Os arquivos brutos ficam em `.cache/` (fora do git). Precisa de `pandas`, `openpyxl` e `shapely`. Depois: `npm test && npm run build`, revisar as páginas `/quanto-minha-renda-compra/` e `/metro-quadrado-sao-paulo/` e commitar os JSONs. Fontes e cuidados em `docs/pesquisa/fontes-de-dados-imoveis.md`.
