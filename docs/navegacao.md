# Navegação e sitemap

Header, rodapé, breadcrumbs e `sitemap.xml` são **derivados da árvore** (`src/lib/conteudo/arvore.ts`). Ninguém escreve item de menu à mão: publicar um nó (`status: "publicado"`) faz ele virar link no menu, no rodapé, no breadcrumb e no sitemap no próximo build.

| Peça | Arquivo | De onde vem |
|---|---|---|
| Dados de navegação | `src/lib/navegacao.ts` | `ARVORE`, `HUBS`, `ETAPAS` + `links.ts` (`doHub`, `hubDe`, `trilha`) |
| Header + CTA | `src/components/layout/Header.tsx` (servidor) | `menuPrincipal()`, `nucleo()` |
| Menu (desktop e mobile) | `src/components/layout/Menu.tsx` (cliente) | props do Header |
| Rodapé | `src/components/layout/Footer.tsx` | `colunasRodape()`, `glossarioNav()` |
| Breadcrumb + JSON-LD | `src/components/layout/Breadcrumbs.tsx` | `migalhas(id)` |
| Sitemap | `src/app/sitemap.ts` | `ARVORE` filtrado por `publicado` |

## Regra de ouro: nada de link quebrado

Página `planejado` aparece como **texto + selo "em breve"** (`<EmBreve />` em `components/ui/badge.tsx`), nunca como `<a>`. Vale para menu, rodapé e breadcrumb. Hoje só `/` e `/simulador-financiamento-caixa/` estão publicadas, então quase tudo aparece "em breve": é honesto e mostra o tamanho do que vem.

## O que adotamos (e por quê)

### Header
- **Sticky**, 64 px, fundo papel quase opaco com blur. 86% do tráfego previsto é celular: o "Simular" tem que estar sempre a um toque.
- **Hubs da jornada no menu**: Comprar · Financiar · Minha Casa Minha Vida · Leilão · Vender · Atalhos. Ferramentas e Glossário ficam no rodapé (o núcleo já tem CTA próprio).
- **CTA "Simular"** (`Button variant="mark"`) visível em **todas as larguras**, inclusive no celular ao lado do "Menu". É a única cor marca-texto do header (regra da marca: uma ação de dinheiro por tela).
- **Desktop (≥ 1024 px)**: cada hub é um **botão de disclosure** (padrão WAI-ARIA *Disclosure Navigation*), não `role="menu"`/`menubar` — esses papéis são para aplicativos, escondem títulos e textos do leitor de tela e exigem setas. Abre **no clique**, não no hover (hover some quando o mouse escorrega, o que fere WCAG 1.4.13, e não existe no toque). `aria-expanded` + `aria-controls`; **Esc** fecha e devolve o foco ao botão; clicar fora ou tirar o foco do menu fecha.
- **Painel largo (mega-menu leve)**: à esquerda a pergunta que o hub responde (`resumo` do nó) e "Ver tudo sobre…" se o hub estiver publicado; à direita as páginas em 2 colunas, **na ordem da jornada** (etapa, depois prioridade).
- Entre 1024 e 1279 px o hub do programa aparece como `<abbr title="Minha Casa Minha Vida">MCMV</abbr>`; de 1280 px em diante, por extenso. Sem isso o menu não cabe em notebook de 1024.

### Menu mobile (< 1024 px)
- Botão com **ícone + palavra "Menu"** (o rótulo aumenta descoberta frente ao ícone sozinho) e `aria-expanded`.
- Abre **tela cheia** como `role="dialog"` + `aria-modal="true"`, renderizado num **portal no `<body>`** (o `backdrop-filter` do header cria bloco de contenção e prenderia o `position: fixed` nos 64 px dele).
- **Foco preso** (Tab/Shift+Tab circulam dentro), foco inicial no "Fechar", **Esc fecha** e devolve o foco ao botão "Menu", rolagem da página travada enquanto aberto, fecha ao clicar num link e se a tela crescer para desktop.
- Hubs em **acordeão** (disclosure), alvos de 56 px; CTA "Simular meu financiamento" no topo do menu.

### Rodapé
- **Rodapé "gordo"**: uma coluna por hub (os 6 do menu + Ferramentas) com **todas** as páginas da árvore. É onde o Google e a pessoa perdida acham tudo, e garante que cada página publicada recebe link de todo o site.
- No celular cada coluna é um `<details>` fechado (sem JS); do `md` em diante as colunas ficam abertas via `::details-content { content-visibility: visible }`. Navegador antigo sem `::details-content` mostra as colunas fechadas, ainda clicáveis.
- Linha final: Glossário (em breve até publicar), **Mapa do site** (`/mapa/`), Instagram, ©. Aviso "não somos banco nem correspondente" mantido.

### Breadcrumbs
- `<nav aria-label="Você está em">` + `<ol>`, último item com `aria-current="page"` e **sem link**, separador `/` decorativo (`aria-hidden`).
- Trilha: **Início → hub → página**. O hub só entra se estiver **publicado** — hub planejado seria link quebrado e item sem URL no JSON-LD. Exemplo atual: `Início / Simulador de financiamento` (o hub Ferramentas ainda não existe).
- **JSON-LD `BreadcrumbList`** gerado da mesma trilha que aparece na tela (o Google exige que a marcação descreva o que está visível); o último item vai sem `item`, como a documentação permite.
- Não aparece na home. Toda página nova da árvore deve renderizar `<Breadcrumbs id="<id-do-nó>" />` logo abaixo do header.

### Sitemap
- Só entra nó `publicado` **e** com `src/app/(site)<slug>page.tsx` existente (um nó marcado publicado sem página não vira 404 no sitemap).
- `lastModified` = data do último commit da página (lógica antiga mantida; sem git, o campo some).
- `changeFrequency` por tipo (glossário anual, hubs semanais, resto mensal) e `priority` pela `prioridade` do nó (home 1, núcleo 0,9, depois 0,8 / 0,6 / 0,4). O Google ignora os dois, mas não custam nada.
- `/mapa/` (Mapa do site, indexável) entra como rota fixa (`FIXAS` em `sitemap.ts`), porque não é nó da árvore. `/marca/` e `/molde/` ficam fora (bloqueados no `robots.ts`).

### Acessibilidade e toque (WCAG 2.2 AA)
- Alvos de toque **≥ 44 px** no header, menu e links do rodapé no celular (WCAG 2.5.8 pede 24 px; 44 é o mínimo da Apple, 48 do Material).
- `html { scroll-padding-top: 5rem }` para o header fixo não cobrir âncoras nem o foco (WCAG 2.4.11 Focus Not Obscured).
- Link "Pular para o conteúdo" já existia no `layout.tsx` e foi mantido.
- Cada `<nav>` tem `aria-label` próprio: "Principal", "Mapa do site", "Você está em".
- Verificado de 360 a 1440 px sem rolagem horizontal.

## Pedidos para a árvore (não editei `arvore.ts`)

1. **`rotulo` (e `curto`) em `HUBS`**: hoje o rótulo do menu está em `ROTULOS` dentro de `src/lib/navegacao.ts`, porque o `titulo` do nó do hub é a manchete da página ("Do zero à chave"), longa demais para o menu.
2. **`menu: boolean` (ou `ordem`) em `HUBS`**: hoje a lista dos hubs do menu (`MENU`) e do rodapé (`RODAPE`) também está em `navegacao.ts`.
3. **Título curto opcional nos nós (`tituloCurto`)**: títulos como "Contrato de compra e venda de imóvel (modelo)" ficam longos no menu e no breadcrumb.
4. Se `links.ts` mudar o nome de `doHub`, `hubDe` ou `trilha`, ajustar `src/lib/navegacao.ts` (é o único consumidor na navegação).

## Referências

- W3C WAI-ARIA APG, *Disclosure Navigation Menu* — disclosure em vez de menubar para navegação de site.
- WCAG 2.2: 2.5.8 Target Size (Minimum), 2.4.11 Focus Not Obscured (Minimum), 1.4.13 Content on Hover or Focus.
- Google Search Central, *Breadcrumb (BreadcrumbList) structured data*.
- Level Access, *Accessible navigation menus: pitfalls and best practices* (aria-expanded só em quem tem submenu; `aria-label` distinto por `<nav>`).
