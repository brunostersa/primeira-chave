# Mapa de conteúdo (Google Trends + autocomplete)

Fontes:
- Google Trends, Brasil, 26/10/2021 → 26/10/2026, consultas relacionadas a 4 temas (`trends/*.csv`): financiar casa, como financiar imóvel, comprar imóvel, financiar apartamento.
- Autocomplete do Google (`autocomplete-google-2026-10-27.txt`, análise em `como-as-pessoas-buscam.md`).

Como ler o Trends: o "interesse" (0–100) é relativo **dentro de cada relatório** — não compare números de relatórios diferentes. A "variação" mostra o que está crescendo. Volume absoluto: validar no Planejador de Palavras-chave do Google Ads.

## O que os relatórios dizem

1. **O núcleo é "financiar casa/apartamento pela Caixa".** "financiar uma casa" (100), "casa para financiar" (70), "como financiar casa" (60), "financiar casa caixa" (56), "financiar um apartamento" (100 no relatório de apartamento), "como financiar um imóvel pela caixa" (76). Casa e apartamento têm buscas separadas → páginas separadas.
2. **"Sem entrada" é o que mais cresce no nosso tema:** "como financiar uma casa sem entrada" **+100%**, "financiar casa sem entrada" **+70% a +120%**, "financiar apartamento sem entrada" **+90%**. O "segredo" da Primeira Chave está na crista da onda.
3. **"Como fazer"** sobe forte: "como fazer financiamento pela caixa" **+110%**, "como financiar uma casa pela caixa" **+30% a +70%**, "como fazer um financiamento" +40%.
4. **Leilão disparou:** "como comprar imóvel de leilão" **+160%**, "leilão caixa" **+160% a +180%**. Encaixa no negócio do Bruno (compra usado, reforma) — pilar novo.
5. **Minha Casa Minha Vida** sobe em todos os relatórios (+20% a +40%). **"Casa Verde e Amarela"** ainda é buscado e sobe (+50% a +170%) — gente procurando o nome antigo do programa.
6. Sinais secundários que crescem: "quanto custa financiar um apartamento" +80%, "como funciona um consórcio de imóvel" +70%, "consórcio" +30%, "score" +40%, "ITBI" +20%, "apartamento na planta" +20%, "empréstimo com garantia de imóvel" +300% (adjacente, fora do foco agora).
7. Estáveis mas fundamentais: "o que precisa para financiar" (documentos), "como funciona um financiamento", "financiamento caixa imóvel usado", "simulador caixa".

Ruído a ignorar: carro, aluguel, marcas de construtora (MRV, Tenda), "caixa" sozinho.

## Volumes reais (Google Ads, Brasil, out/2025–set/2026)

Arquivo: `volumes-google-ads-2026-10.tsv` (129 termos, média mensal, concorrência, lance máximo do topo da página).
Termos com 0 foram agrupados pelo Google numa variante próxima (ex.: "como financiar uma casa" entra em "como financiar casa").

| Cluster | Soma/mês | Principais termos (volume · concorrência · lance topo) |
|---|---|---|
| **Simulador** | **~1 milhão** | simulador caixa habitação 301 mil · baixa · R$ 3,94 — simulador caixa 201 mil · baixa — simulação financiamento caixa 165 mil · baixa — financiamento caixa 135 mil · média — simulador de financiamento 74 mil · alta — simulador de financiamento caixa 74 mil (+22%) · baixa — MCMV simulação 60,5 mil — simular financiamento 40,5 mil — simulação financiamento imóvel 14,8 mil |
| **Atalhos (links difíceis)** | ~862 mil | registrato 823 mil (+22%) · baixa — consultar fgts pelo cpf 22 mil — habitação caixa 2ª via boleto 8,1 mil (**+83%**) — certidão de matrícula online 320 (**+129%**) |
| **Leilão / imóveis Caixa** | ~615 mil | leilão caixa 368 mil · baixa — imóveis caixa 246 mil · baixa — como comprar imóvel de leilão 590 |
| **Minha Casa Minha Vida** | ~312 mil | minha casa minha vida 301 mil · média — financiamento MCMV 9,9 mil — casa verde e amarela 2,9 mil (somando variantes) |
| **ITBI** | ~59 mil | itbi 49,5 mil · baixa · R$ 0,64 — itbi o que é 8,1 mil — itbi goiânia 1,6 mil |
| **Financiar (guias)** | ~45 mil | financiamento imobiliário 18 mil · alta · R$ 12 — financiar casa caixa 9,9 mil — financiamento de casa 8,1 mil — financiar (um) apartamento 4,4 mil · alta · R$ 10,8 — financiamento caixa imóvel usado 4,4 mil — financiar imóvel 3,6 mil — financiar casa pela caixa 3,6 mil — como funciona o financiamento da caixa 2,9 mil — como fazer financiamento pela caixa 2,4 mil |
| **Vendedor** | ~16 mil | contrato de compra e venda de imóvel 14,8 mil · média — quanto vale meu imóvel 390 · **R$ 27** — ganho de capital 390 — como vender imóvel financiado 260 · **R$ 134** |
| **Sem entrada** | ~4,6 mil | financiar casa sem entrada 1,9 mil · alta · R$ 11,50 — financiamento sem entrada casa 1,9 mil — sem entrada imóvel 480 — apartamento sem entrada 390 · R$ 12,35 |
| **Consórcio, SAC/PRICE, alugar** | ~5 mil | consórcio de imóvel 2,4 mil (+26%) · R$ 10,40 — sac ou price 1,3 mil (+30%) — consórcio ou financiamento 880 — alugar ou financiar 260 |
| Quanto preciso ganhar / renda para | ~500 | 20 a 90 cada — vale só como páginas geradas em massa |

Leitura do lance: onde o lance é alto (financiamento imobiliário R$ 12, sem entrada R$ 11,50, vender financiado R$ 134, quanto vale R$ 27) há **dinheiro** — bom para lead e lowticket. Onde o volume é enorme e a concorrência baixa (simulador, registrato, leilão), há **tráfego** barato de conquistar no orgânico.

## Prioridade (revisada com os volumes)

| # | Página | Termos-alvo | Prioridade | Ilustração | Converte para |
|---|---|---|---|---|---|
| 1 | `/simulador/` (otimizar) + `/simulador-financiamento-caixa/` | simulador caixa (habitação) · simulação financiamento caixa · simulador de financiamento (caixa) · simular financiamento | **P1** | `calcular` | lead + lowticket |
| 2 | `/simulador-minha-casa-minha-vida/` | minha casa minha vida simulação · renda para MCMV | **P1** | `fgts` | lead |
| 3 | `/atalhos/registrato/`, `/atalhos/consultar-fgts/`, `/atalhos/boleto-habitacao-caixa/`, `/atalhos/certidao-de-matricula/` | registrato · consultar fgts pelo cpf · habitação caixa 2 via boleto · certidão de matrícula online | **P1** (rápidas) | `nome-limpo`, `fgts`, `documentos` | simulador |
| 4 | `/leilao-caixa/` + `/imoveis-caixa/` | leilão caixa · imóveis caixa · como comprar imóvel de leilão | **P1** | nova cena "leilão" | lead + imóveis do Bruno |
| 5 | `/minha-casa-minha-vida/` | minha casa minha vida · financiamento MCMV · casa verde e amarela | **P1** | `fgts` | simulador MCMV |
| 6 | `/financiar-casa-sem-entrada/` (+ apartamento) | financiar casa sem entrada · financiamento sem entrada casa/imóvel | **P1** (conversão) | `avaliacao` | lowticket |
| 7 | `/itbi/` (calculadora) + `/goiania/itbi/` | itbi · itbi o que é · itbi goiânia | P2 | `assinatura` | simulador |
| 8 | `/financiamento-imobiliario/` (pilar) | financiamento imobiliário (caixa) · financiamento de casa · como funciona | P2 | `banco` | simulador |
| 9 | `/como-financiar-uma-casa-pela-caixa/` · `/como-financiar-um-apartamento/` · `/financiar-imovel-usado/` | financiar casa caixa · financiar apartamento · financiamento caixa imóvel usado | P2 | `banco`, `avaliacao` | simulador |
| 10 | `/contrato-de-compra-e-venda/` (modelo grátis) | contrato de compra e venda de imóvel | P2 (vendedor) | `assinatura` | lead do vendedor |
| 11 | `/consorcio-ou-financiamento/` · `/sac-ou-price/` · `/alugar-ou-financiar/` | consórcio de imóvel · sac ou price · alugar ou financiar | P3 | `calcular` | simulador |
| 12 | `/vender-imovel-financiado/` · `/quanto-vale-meu-imovel/` | como vender imóvel financiado · quanto vale meu imóvel | P3 (lance alto) | `vender` | lowticket vendedor |
| 13 | `/quanto-preciso-ganhar-para-financiar/...` (programática) | quanto preciso ganhar / renda para financiar imóvel de X | P3 | `calcular` | simulador |
| 14 | `/documentos-para-financiar-imovel/` · `/score-para-financiamento/` · `/financiamento-negado/` | documentos, score, negado | P3 (volume baixo, apoio da trilha) | `documentos`, `nome-limpo`, `negado` | trilha |

## Regras de escrita (SEO + marca)

- Título com a frase que a pessoa digita, sem parecer site oficial: "Como financiar uma casa pela Caixa (passo a passo, sem juridiquês)".
- Toda página abre com **o número da pessoa** (mini-simulador ou exemplo calculado pelo motor) e termina no simulador.
- Casa e apartamento: páginas separadas quando a busca é separada; regras iguais explicadas uma vez e linkadas.
- Uma ilustração da biblioteca por página (coluna "Ilustração"); FAQ no fim com dados estruturados.
- Data de atualização visível ("regras de out/2026").
