# Regras de financiamento usadas no simulador

> **Validado em 27/10/2026 contra o simulador oficial da Caixa** (simulação rápida "pela renda", 6 perfis de R$ 2.800 a R$ 15.000): diferença de 0,00% a 0,03% em imóvel, valor financiado e 1ª parcela. Os casos estão em `src/lib/financiamento/engine.test.ts`; rodar de novo todo mês. Faixas 2026: rendas até 3.200 / 5.000 / 9.600 / 13.000; tetos F1-F2 R$ 210 mil (sem cidade), F3 R$ 400 mil, F4 R$ 600 mil; juros nominais 5 / 7 / 8,16 / 10%; SBPE 10,93% nominal (11,49% efetivo) em SAC. Fontes normativas: `docs/pesquisa/amparo-tecnico-juridico-caixa.md`.

Fonte dos valores: objeto `PARAMS` em `site/simulador.html` (editáveis também na camada "Ver todos os detalhes").

## Confirmadas

| Regra | Valor | Fonte |
|---|---|---|
| Parcela máxima | 30% da renda bruta, menos outras parcelas | prática de mercado |
| Idade + prazo | até 80,5 anos; prazo máx. 420 meses | cartilha Caixa (420 meses) |
| Base do financiamento | **% do valor de avaliação, limitado ao preço de venda** | Bruno (prática) |
| Entrada zero | avaliação ≥ preço ÷ 0,8 (≈ 125% do preço), se a renda aguentar | consequência da regra acima |
| SBPE usado | financia 80% | Bruno (prática) |
| MCMV | financia 80% | — |
| Motor validado | parcela R$ 1.800 / imóvel ~R$ 299 mil, igual ao simulador Caixa | teste em `tests/` |
| Composição da prestação | amortização + juros + seguros (MIP, DFI) + taxa adm. R$ 25 | cartilha Caixa |
| FGTS na compra | só entra na entrada; não paga ITBI nem cartório; exige 3 anos de carteira e não ter imóvel | — |
| FGTS depois | amortiza/quita a cada 2 anos; paga parte da prestação | cartilha Caixa |
| Cartório | pode ser incluído no financiamento (o simulador ainda conta do bolso) | cartilha Caixa |
| Indexador | MCMV e SBPE: TR. O simulador considera TR = 0 e avisa | cartilha Caixa |

## A conferir antes de lançar

- [ ] Juros SBPE (hoje 11,49% a.a.)
- [ ] Juros MCMV Faixa 2 (6,5%) e demais faixas
- [ ] Rendas-limite e tetos de imóvel por faixa do MCMV
- [ ] ITBI da cidade (hoje 3%) — varia por município
- [ ] Seguros MIP/DFI (estimados por idade)
- [ ] Se a regra "avaliação limitada ao preço" vale igual em outros bancos
- [ ] Se o ITBI também pode ser financiado
