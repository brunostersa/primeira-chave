# SEO on-page: o padrão de cada página

Cada página disputa uma busca. O padrão abaixo vale para todas e é **verificado por teste** (`src/lib/conteudo/seo.test.ts`), que roda no `npm test` e no deploy.

## O que o teste garante

| Regra | Onde |
|---|---|
| Palavra-chave principal (1º termo do nó em `arvore.ts`) no **título**, no **H1**, na **descrição** e na **resposta curta** | `tituloSeo`, `h1` (ou `titulo` da árvore), `descricao`, `resposta`/`intro` |
| Título final inteiro no Google (≤ 65 caracteres; o " · Primeira Chave" só entra se couber) | `src/lib/seo.ts` (`tituloFinal`) |
| Descrição entre 110 e 160 caracteres | `descricao` |
| Toda figura com arquivo gerado e texto alternativo de 50 a 180 caracteres | bloco `figura` + `public/figuras/` |

A comparação aceita variações (acentos, plural, "financiar"/"financiamento"): usa o radical das palavras e ignora "de", "para", "o" etc.

## O que o molde entrega sozinho

- **Índice "Nesta página"** com âncoras, a partir dos títulos das seções (guias com 3+ seções; hubs com 2+).
- **Imagens** com `alt`, `width`/`height` e legenda; a primeira figura vira a **capa nas redes** (`og:image`, `twitter:image`) e entra no `Article`/`CollectionPage` do JSON-LD.
- **JSON-LD**: `Article` (guias) ou `CollectionPage` (hubs) + `FAQPage` + `BreadcrumbList`.
- `og:title`/`og:url` próprios de cada página (antes herdavam os da home).
- **Hubs** com H1 = título com palavra-chave e espaço para seções e FAQ (viram a página completa do assunto, não só um índice).

## Figuras (infográficos)

Declaradas como dados no texto da página (`{ figura: { id, alt, etiqueta, titulo, destaque, esquema, legenda } }`). Esquemas: `linha` (linha do tempo), `passos`, `comparar`, `numeros`, `barras`, `divisao`. Números saem do motor ou dos parâmetros sempre que possível (ex.: juros por faixa, imóvel de R$ 300 mil).

Gerar as imagens (WebP 1200×675, ~25–40 KB):

```bash
npm run figuras
```

Faz o build, abre cada `/figura/<pagina>/<id>/` (rota `noindex`, bloqueada no robots) no Chrome sem janela e converte com o `cwebp`. Commitar os arquivos de `public/figuras/`.

## Checklist para aprofundar uma página

1. A resposta curta responde a busca na 1ª frase, com o termo e um número.
2. 4–6 seções com títulos que são perguntas ou tarefas reais (viram o índice).
3. 1–2 figuras: o esquema que explica melhor que o texto.
4. Tabela ou lista quando houver comparação ou passos.
5. 4–6 perguntas frequentes (respostas em texto puro, viram FAQ no Google).
6. Links internos para o próximo passo, a ferramenta e as páginas irmãs.
7. Cuidados jurídicos: nada de "oficial", nada de atalho fora da regra, valores ilustrativos marcados como tal.

## Andamento (27/10/2026)

- **Lote 1** (figuras + seções + FAQ): simulador, Registrato, leilão da Caixa, Minha Casa Minha Vida, imóveis da Caixa, financiamento imobiliário, calculadora de ITBI, consultar FGTS, como financiar casa pela Caixa, contrato de compra e venda.
- **Lote 2**: como financiar apartamento (casa × apê, na planta e INCC), 2ª via do boleto (verdadeiro × golpe), imóvel usado, consórcio, Casa Verde e Amarela (linha do tempo), SAC ou PRICE, documentos, como comprar em leilão (teto do lance), FGTS para amortizar, apartamento sem entrada.

- **Lote 3**: casa sem entrada (página própria: figuras via `textos/proprias.ts`), calculadora de ganho de capital, imposto na venda (isenções), quanto vale meu imóvel (três valores), primeiro imóvel e ITBI, certidão de matrícula, vender financiado, alugar ou financiar, usar FGTS na compra, quanto custa financiar (total em 35 anos pelo motor).

- **Lote 4**: score, financiamento negado, avaliação do imóvel (abaixo × acima), documentos para vender, quanto tempo demora (prazos), antes de financiar, registro (da assinatura à chave), faixas do MCMV (teto por faixa), financiar leilão (comum × retomado), reforma de leilão (folga de 20%).

- **Lote 5**: vender para quem financia, carteira de trabalho (o tempo soma), quanto preciso ganhar (renda por valor, pelo motor) e os hubs Comprar (cinco fases), Vender (quatro passos), Atalhos e Ferramentas (seções e FAQ).

Fila: os 23 termos do glossário (molde próprio, `TermoPagina`) e os mapas (renda × capitais, m² em SP), que já são ferramentas visuais.

## SEO técnico e IA (27/10/2026)

| Arquivo | O que faz |
|---|---|
| `/robots.txt` (`src/app/robots.ts`) | Libera tudo, menos as rotas de produção de imagem. Robôs de IA (OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended, Applebot-Extended, CCBot…) liberados de propósito e listados um a um: para bloquear o treino de um deles, mover para um bloco com `disallow: "/"`. |
| `/sitemap.xml` | 103 URLs, com **imagens** (infográficos e cards: Google Imagens) e `lastmod` real pelo git, inclusive das páginas da rota única (pelo arquivo de texto). |
| `/llms.txt` e `/llms-full.txt` (`src/lib/llms.ts`) | O mapa do site para assistentes de IA (padrão llmstxt.org) e as respostas curtas + perguntas de cada página em texto puro. Gerados da árvore: publicou, entrou. Testados (`llms.test.ts`). |
| Metadados globais | `max-image-preview: large` (Discover), capa padrão `/og.png` em toda página sem figura, `logo` e `founder` no `Organization`, `manifest.webmanifest` e ícones (`npm run figuras` gera `og.png`, `logo.png`, ícones 192/512 e `apple-icon.png` dos moldes). |

Quando o domínio estiver no ar: enviar o sitemap no Google Search Console e no Bing Webmaster Tools (o Bing alimenta o ChatGPT e o Copilot).
