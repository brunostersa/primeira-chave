# Calculadora de custos da compra: pesquisa e plano

Pesquisa de 28/10/2026. Objetivo: trocar o "cartório = 1,5% fixo" do motor (`params.ts`) por custo real por estado, e publicar uma calculadora "quanto custa comprar além da entrada".

## Demanda (Planejador do Google Ads, Brasil, média mensal)

| Termo | Buscas/mês | Concorrência |
|---|---|---|
| calculadora registro de imoveis | 1.900 | Baixa |
| quanto custa registro de imovel | 480 | Baixa |
| tabela de emolumentos registro de imoveis | 260 | Baixa |
| valor registro imovel | 170 | Baixa |
| quanto custa a documentação de um apartamento | 110 | Baixa |
| calculadora registro de imóveis sp | 50 | Baixa |
| custo cartorio compra imovel | 50 | Baixa |
| quanto custa escritura e registro de imovel | 50 | Baixa |
| quanto custa itbi e registro de imovel | 50 | Baixa |
| calculadora registro de imóveis goiás | 30 | Baixa |
| custo transferencia imovel | 30 | Baixa |
| custo cartorio registro imovel / taxas para comprar imovel | 20 cada | Baixa |
| custos para comprar imovel / quanto custa transferir imovel / custo escritura e registro imovel | 10 cada | — |

Total ≈ 3,3 mil/mês. Pequeno perto do ITBI (57 mil), mas o autocomplete mostra cauda por cidade ("valor registro imovel sp / df / rj / bh / goiania", "quanto custa a documentação de uma casa de 200 mil") e por estado ("calculadora registro de imóveis goiás / sp / sc / pe / rj").

Concorrente direto: a calculadora oficial do ONR / Registro de Imóveis do Brasil ("calculadora registro onr" aparece no autocomplete). Ela dá o emolumento do ato; nosso diferencial é o **custo total da compra** (ITBI + registro + avaliação), com o desconto de primeiro imóvel e em português claro.

## Tabelas 2026 (fonte oficial)

### São Paulo — Tabela II (Registro de Imóveis), item 1 "registro com valor declarado"
Fonte: ARISP, tabela vigente desde 08/01/2026 (`arisp.com.br/wp-content/uploads/2026/01/0.pdf`). Total já inclui Oficial + Estado + Sefaz + Registro Civil + TJ + MP; **ISS municipal à parte** (2% na capital).

| Faixa (valor do título) | Total |
|---|---|
| 115.260,01 a 192.100,00 | 1.901,09 |
| 192.100,01 a 230.520,00 | 2.311,88 |
| 230.520,01 a 268.940,00 | 2.516,87 |
| 268.940,01 a 307.360,00 | 2.723,02 |
| 307.360,01 a 345.780,00 | 2.870,61 |
| 345.780,01 a 384.200,00 | 2.945,43 |
| 384.200,01 a 768.400,00 | 3.284,18 |
| 768.400,01 a 1.152.600,00 | 3.846,10 |
| 1.152.600,01 a 1.536.800,00 | 4.427,79 |

Prenotação R$ 79,16 · certidão R$ 75,60. Faixas menores e maiores no PDF (a até z22).

### Goiás — Tabela XIV (Atos dos Oficiais de Registro de Imóveis), item 76
Fonte: TJGO, Provimento Conjunto 179/2025, publicado 19/12/2025, vigente em 2026. Valores = **só emolumentos**.

| Faixa (valor do documento) | Emolumentos |
|---|---|
| até 104.609,47 | 1.294,60 |
| até 156.914,21 | 1.945,88 |
| até 261.523,68 | 2.620,98 |
| até 392.285,51 | 3.441,04 |
| até 523.047,35 | 4.054,59 |
| até 784.571,03 | 4.866,70 |
| até 1.176.856,54 | 5.831,70 |
| até 1.569.142,07 | 6.780,81 |
| acima | 7.407,33 |

Prenotação R$ 11,14 · matrícula R$ 57,53 · averbação com valor = 30% do item 76.
**Por cima dos emolumentos**, em Goiás entram fundos e ISS. Na referência que achamos (certidão de 2020): fundos estaduais de 24,25% desde 24/03/2025 (Funcomp passou de 3% para 6%, Lei 23.163/2024) e ISS 5% em Goiânia ≈ **+29,25%**, mais taxa judiciária. **Conferir os percentuais de 2026** com o 1º RI de Goiânia antes de publicar.

## Desconto de primeiro imóvel (art. 290 da Lei 6.015/73)

50% nos emolumentos dos atos da **primeira aquisição residencial financiada pelo SFH**. Decisão do CNJ de maio/2025 uniformizou a leitura literal: só perde quem já teve imóvel financiado pelo SFH. Não vale para SFI (alienação fiduciária fora do SFH) segundo parte dos tribunais: tratar como "pode não valer". A pessoa precisa **pedir** no cartório.

## Exemplo: imóvel de R$ 300 mil, financiamento de R$ 240 mil (dois registros: compra e venda + alienação fiduciária)

| | SP (capital) | Goiânia |
|---|---|---|
| Registro da compra (300 mil) | 2.723,02 | 3.441,04 |
| Registro da alienação (240 mil) | 2.516,87 | 2.620,98 |
| Prenotação | 79,16 | 11,14 |
| Fundos/ISS | ~2% ISS ≈ 106 | 29,25% (fundos 24,25% + ISS 5%) ≈ 1.776 |
| **Registro total** | **≈ R$ 5,4 mil (1,8%)** | **≈ R$ 7,8 mil (2,6%)** |
| Com desconto de 1º imóvel (50%) | ≈ R$ 2,7 mil | ≈ R$ 3,8 mil |

O motor hoje usa 1,5% (R$ 4,5 mil): **subestima** quem não tem desconto, sobretudo em Goiás.

## Plano

1. **Motor** (`src/lib/financiamento/`): novo módulo `custos.ts` com `registro(uf, valorCompra, valorFinanciado, primeiroImovelSFH)` lendo tabelas por UF (`tabelas/registro-sp-2026.ts`, `registro-go-2026.ts`), com faixas, fonte, data e % de acréscimos. Testes com os exemplos acima.
2. **Cobertura**: SP e GO exatos no lançamento; demais UFs com faixa estimada ("entre R$ X e R$ Y; confira no cartório") até ganharem tabela. Próximas pela demanda e população: MG, RJ, PR, DF, SC, BA, PE.
3. **Página** `/custos-para-comprar-imovel/` (título: "Quanto custa comprar um imóvel além da entrada"), tipo `ferramenta`, família "Calculadoras", etapa `registrar`. Entradas: estado, cidade (para o ITBI), valor do imóvel, valor financiado, "é o seu primeiro imóvel financiado?". Saída: ITBI + registro (com e sem desconto) + tarifa de avaliação = total em R$ e em %, e o aviso "FGTS não paga".
4. **Seções de SEO** na própria página: tabela de emolumentos de SP e de GO 2026 (atende "tabela de emolumentos" e "calculadora registro de imóveis sp/goiás"), como pedir o desconto de 50%, e FAQ ("quanto custa a documentação de um apartamento de 200 mil").
5. **Simulador**: trocar o 1,5% fixo pelo cálculo real quando a pessoa informar o estado; manter 1,5% como padrão sem estado.
6. **Ligações**: calculadora de ITBI, "Registro, ITBI e chaves", "Primeiro imóvel tem desconto", glossário (emolumentos, registro, alienação fiduciária).
7. **Manutenção**: tabelas mudam todo janeiro; lembrete anual para atualizar (junto com a "Taxas do mês").

Riscos: percentuais de fundos de GO 2026 não confirmados; regra do desconto no SFI controversa — mostrar como "pode valer, peça no cartório".
