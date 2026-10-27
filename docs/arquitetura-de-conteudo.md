# Arquitetura de conteúdo — o organismo

A Primeira Chave não é um blog com posts soltos. É **um organismo**: um núcleo (o simulador), órgãos (os hubs), uma coluna vertebral (a jornada do zero à chave), um tecido conectivo (o glossário) e sistemas que o mantêm vivo (dados, Search Console, perguntas dos leads).

A fonte única é `src/lib/conteudo/arvore.ts`. Toda página do site nasce ali; links, breadcrumbs, "próximo passo", relacionados, sitemap e o mapa visual (`/mapa`) são **derivados** dela. Ninguém escreve link interno à mão sem ele existir na árvore.

## 1. Anatomia

| Parte | O que é | Exemplo |
|---|---|---|
| **Núcleo** | A ferramenta que dá o número da pessoa. Toda página aponta pra ele. | `/simulador-financiamento-caixa/` (~1 mi buscas/mês no cluster; único simulador do site) |
| **Hubs (órgãos)** | 7 portas de entrada, cada uma responde a uma grande dúvida. | Comprar · Financiar · Programas · Leilão e imóveis Caixa · Vender · Atalhos · Ferramentas |
| **Guias** | Uma intenção de busca por página, sempre com o número da pessoa no topo. | `/financiar-casa-sem-entrada/` |
| **Ferramentas** | Calculadoras que respondem com números. Atraem link e tráfego. | simulador MCMV, ITBI, ganho de capital |
| **Atalhos** | O link difícil + passo a passo + "o que fazer com isso". | `/atalhos/registrato/` (823 mil/mês) |
| **Glossário (tecido)** | Cada termo de banco tem página própria e liga todas as páginas que o usam. | `/glossario/avaliacao/` |
| **Programáticas** | Páginas geradas pelo motor em série. | `/quanto-preciso-ganhar-para-financiar/imovel-de-300-mil/` |
| **Local** | A mesma resposta com o dado da cidade. | `/goiania/itbi/` |

## 2. A coluna vertebral: a jornada

Toda página pertence a **uma etapa**. É isso que cria o "próximo passo" automático e impede que a pessoa fique perdida.

```
descobrir → preparar → aprovar → escolher → avaliar → contratar → registrar → depois da chave
(quanto      (nome,     (documentos, (usado, novo,  (laudo,    (contrato,   (ITBI,       (SAC/PRICE,
 posso)       FGTS,      score,       leilão, sem    preço ×    cartório)    registro,    amortizar,
              reserva)   negado)      entrada)       avaliação)               chaves)      portabilidade)
```

O vendedor tem a jornada própria (`vender`), que **cruza** a do comprador em três pontos: avaliação do banco do comprador, documentos e contrato. Esses cruzamentos são os links mais valiosos do site, porque explicam o mercado dos dois lados.

## 3. Regras de ligação (todas verificadas por teste)

Cada página publicada precisa ter:

1. **1 link pra cima** — o hub dela (e o breadcrumb).
2. **1 próximo passo** — a página principal da etapa seguinte da jornada.
3. **1 ferramenta** — o simulador ou a calculadora do assunto.
4. **2 a 4 laterais** — irmãs do mesmo hub ou ligações explícitas (`liga`).
5. **Termos do glossário** — a primeira menção de cada termo vira link.
6. **Pelo menos 2 links chegando** de outras páginas (sem órfãs).
7. Estar a **no máximo 3 cliques** da home.

O teste `arvore.test.ts` falha se alguma regra quebrar.

## 4. Como ele se mantém vivo

| Ciclo | Frequência | O que muda |
|---|---|---|
| **Dados → páginas** | quando a regra muda | `params.ts` atualiza juros, tetos e LTV; todas as páginas com número recalculam no próximo build |
| **Search Console → prioridade** | a cada 2 semanas | páginas que começam a ranquear ganham reforço (mais links chegando, FAQ, versão casa/apartamento) |
| **Trends + autocomplete → novas folhas** | a cada trimestre | termos que sobem viram páginas novas na árvore (status `planejado`) |
| **Perguntas dos leads → FAQ** | contínuo | dúvida repetida no WhatsApp/lead vira pergunta de FAQ ou página |
| **Glossário → links** | automático | todo termo novo passa a ligar as páginas que o mencionam |

## 5. Por que isso traz clareza ao mercado

- Ninguém cai numa página sem saber **onde está** (hub e etapa) e **pra onde ir** (próximo passo).
- Todo termo difícil tem **uma** explicação, sempre a mesma, a um clique.
- Comprador e vendedor leem **o mesmo mapa**: o vendedor entende a avaliação do banco do comprador; o comprador entende por que o vendedor pede a matrícula.
- O Google entende o site como autoridade no tema, porque os assuntos se reforçam em vez de competir.

## Estado inicial (27/10/2026)

75 páginas na árvore (2 no ar: home e simulador), 521 conexões (média de 6,9 links por página), 3,4 milhões de buscas/mês cobertas pelos termos-alvo. Distância da home: 8 páginas a 1 clique, 56 a 2, 10 a 3. Visual em `/mapa`.

**Para criar uma página nova:** adicione o nó em `arvore.ts` (hub, etapa, termos com volume, `liga`, `glossario`), rode `npm test` (o teste aponta órfã, link quebrado ou distância > 3) e só então escreva a página em `src/app/(site)/<slug>/page.tsx`, usando `saindo(n)`, `proximoPasso(n)` e `relacionados(n)` para os links. Ao publicar, troque `status` para `"publicado"`: ela entra sozinha no sitemap, no rodapé e no mapa.

## Componentes e conteúdo como dados (27/10/2026)

Nenhuma página escreve layout próprio. Uma página nova é **só dados**:

| Peça | Arquivo | Papel |
|---|---|---|
| Rota única | `src/app/(site)/[...caminho]/page.tsx` | Monta toda página publicada da árvore com o molde do tipo dela |
| Moldes | `components/conteudo/Guia.tsx`, `HubPagina.tsx`, `TermoPagina.tsx` | Guia, hub e termo; herdam breadcrumb, próximo passo, ferramenta, relacionados, JSON-LD |
| Blocos | `components/conteudo/Blocos.tsx` | p, lista, passos, aviso, tabela, cálculo |
| Texto rico | `components/conteudo/Rico.tsx` | `**negrito**`, `[rótulo](#id)`, `[rótulo](g:termo)`, link externo |
| Cálculos | `components/conteudo/calculos.tsx` | faixas-mcmv, renda-por-valor, custos-da-compra, sac-x-price, prazos, calculadora-itbi, calculadora-ganho-capital, simulador — todos do motor validado |
| Peças | `components/conteudo/pecas.tsx` | LinkNo, Termo, Secao, Aviso, CartaoPagina |
| Textos | `src/lib/conteudo/textos/*.ts` | Um arquivo por hub + glossário + hubs |

**Para criar uma página:** escreva o texto em `src/lib/conteudo/textos/<hub>.ts` (tipo `Texto`), marque `status: "publicado"` na árvore e rode `npm test`. Os testes garantem: conteúdo existe, todo `#id` e `g:termo` citado existe, sem órfãs, ≤ 3 cliques. Ela entra sozinha na rota, no sitemap, no rodapé, no mapa e no /guias.

Estado: 75 páginas publicadas + /mapa no sitemap. Falta: `/goiania/itbi/` (aguardando alíquota oficial confirmada).
