# Fontes de dados de imóveis (cenários, m² e mapa)

Levantamento de 27/10/2026 para o projeto "Quanto sua renda compra na sua cidade" + mapa de calor. Tudo abaixo foi conferido na fonte (API respondendo ou arquivo aberto), salvo onde está marcado "a confirmar".

## Resumo

| Fonte | O que dá | Abrangência | Atualização | Acesso | Licença | Uso no site |
|---|---|---|---|---|---|---|
| **Lista de imóveis da Caixa** | preço, **avaliação**, desconto, aceita financiamento, área privativa, quartos, bairro | **todo o Brasil**, por UF | diária (arquivo traz "data de geração") | CSV por UF: `venda-imoveis.caixa.gov.br/listaweb/Lista_imoveis_{UF}.csv` (latin1, `;`) | pública; termos a confirmar | mapa de descontos; m² da avaliação por cidade; exemplos reais |
| **ITBI pago — São Paulo** | **valor real da compra**, data, área, uso, bairro, CEP | capital SP, ~2,7 mi transações desde 2006 | mensal | xlsx/ods por ano na Fazenda SP | sem licença declarada (a confirmar) | m² real por bairro em SP; "por quanto vendeu" |
| **ITBI pago — Recife** | transações com ITBI, características do imóvel | capital PE, 2015+ | anual (atualizado mar/2026) | CSV no portal de dados abertos | **ODbL** | idem SP |
| **ITBI pago — Porto Alegre** | endereço, base de cálculo, % transmitido, área | capital RS, 2020–2025 | publicado dez/2025 | portal de dados abertos POA | a confirmar | idem SP |
| ITBI — Belo Horizonte | relatos de ~500 mil transações publicadas desde 2008 | capital MG | — | **a confirmar** no portal da PBH | — | — |
| **IVG-R (Banco Central)** | índice do valor de **avaliação** dos imóveis financiados | **só nacional** (13 regiões metropolitanas compõem, sem série por cidade) | mensal, desde 2001 | API SGS 21340 (JSON/CSV) | **ODbL** | tendência: "imóveis subiram X% em 12 meses" |
| FipeZap | m² médio de anúncio (venda e aluguel) | 56 cidades | mensal | informes PDF da Fipe/DataZAP | **a confirmar** (dado de anúncio, de terceiro) | referência citada, não base própria |

## Os dois que você destacou

### IVG-R — relevante, mas como termômetro, não como mapa
- É feito com as **avaliações dos bancos** nos financiamentos (alienação fiduciária e hipoteca), exatamente o valor que decide quanto a pessoa consegue financiar. Casa com o nosso "segredo" da avaliação.
- Limite: é **um índice nacional** (base mar/2001 = 100), não R$/m² e não por cidade. Não alimenta mapa.
- Números de hoje (API, conferidos): jul/2026 = 790,08; jul/2025 = 750,48 → **+5,3% em 12 meses**; jul/2021 = 636,54 → **+24% em 5 anos**.
- Uso: um bloco vivo "As avaliações dos bancos subiram 5,3% no último ano" no simulador e nos guias de avaliação, atualizado sozinho no build. Licença aberta (ODbL), citar "Banco Central, IVG-R".

### ITBI pago — o dado mais forte que existe
- É o **preço de verdade** das compras registradas, não preço de anúncio. Nenhum portal de anúncio tem isso.
- Só existe em algumas capitais: **SP** (o melhor: mensal, desde 2006, com área → dá m² por bairro), **Recife** (CSV aberto, ODbL), **Porto Alegre** (2020–2025); **BH a confirmar**.
- Uso: páginas de cidade/bairro com "m² que as pessoas pagaram de verdade" e o mapa de calor por bairro, começando por SP.
- Cuidado: SP não declara licença; antes de publicar, confirmar termos (ou tratar como dado público citado com fonte). Nunca mostrar endereço completo de uma transação: só agregados (mediana por bairro/mês).

## O achado que não estava no plano: a lista da Caixa
O CSV abriu sem login e cobre **o Brasil inteiro**, com **preço e avaliação lado a lado**. Isso permite:
- m² da avaliação por cidade, em qualquer estado (não só onde há ITBI aberto);
- mapa de desconto médio por cidade;
- exemplos reais e datados ("em Águas Lindas, um apê de 74 m² avaliado em R$ 156 mil estava à venda por R$ 38 mil").

Cuidado já registrado em `regras-financiamento.md`: nos imóveis da Caixa o financiamento usa o **menor** entre preço e avaliação. Esse mapa é de **oportunidade**, nunca de "entrada zero". E muitos imóveis vêm com "Financiamento: Não".

**Revisão (27/10/2026, experiência do Bruno como arrematante):** a lista **não mede mercado**. O preço é de imóvel retomado (ocupação, estado e débitos desconhecidos) e a avaliação da Caixa costuma estar descolada do mercado. Logo: **fora** do m² e do mapa de "quanto sua renda compra". Fica só no hub de leilão, como **estoque** (quantos imóveis por cidade, modalidade, quantos aceitam financiamento, faixa de preço) e como material educativo ("desconto sobre uma avaliação que pode não valer"). O m² de mercado vem do ITBI pago (onde há) + IVG-R (tendência) + FipeZap (referência citada).

## Plano sugerido (MVP)
1. **Script mensal** (`scripts/dados/`) que baixa: IVG-R (API), CSVs da Caixa (27 UFs), ITBI SP do ano corrente. Gera JSON agregado em `src/data/` (mediana de m², contagem, desconto médio por cidade/bairro), com fonte e data de cada número.
2. **"Quanto sua renda compra"**: renda → nosso motor validado → valor financiável → m² que cabem, por cidade.
3. **Mapa de calor** em SVG próprio (UFs e capitais), cores da marca; depois, bairros de SP.
4. Página por cidade só onde houver dado real suficiente (evitar página rasa).

## Fontes
- [IVG-R no portal de dados abertos do BCB](https://dadosabertos.bcb.gov.br/dataset/21340-indice-de-valores-de-garantia-de-imoveis-residenciais-financiados-ivg-r) · API: `api.bcb.gov.br/dados/serie/bcdata.sgs.21340/dados?formato=json`
- [Transações imobiliárias com ITBI — Fazenda SP](https://prefeitura.sp.gov.br/web/fazenda/w/acesso_a_informacao/31501)
- [ITBI no portal de dados abertos do Recife](https://dados.recife.pe.gov.br/dataset/imposto-sobre-transmissao-de-bens-imoveis-itbi)
- [Porto Alegre publica ITBI em dados abertos](https://prefeitura.poa.br/smf/noticias/prefeitura-publica-informacoes-de-itbi-em-plataforma-de-dados-abertos)
- [dadosimob (leitor do ITBI SP, MIT)](https://github.com/Rafaxdz-1000/dadosimob)
- [Informe FipeZap venda residencial](https://www.datazap.com.br/wp-content/uploads/2026/02/fipezap-202601-residencial-venda-.pdf)
- Lista de imóveis da Caixa: `venda-imoveis.caixa.gov.br/listaweb/Lista_imoveis_GO.csv` (aberto em 27/10/2026, gerado em 26/10/2026)

## Implementado (27/10/2026)
- `scripts/dados/atualizar.py` → `src/data/mercado/` (`ivgr.json`, `fipezap.json`, `mapa-brasil.json`, `itbi-sp.json`).
- **FipeZap**: a Fipe publica a série completa em planilha (`downloads.fipe.org.br/indices/fipezap/fipezap-serieshistoricas.xlsx`), com m² por número de quartos. 22 capitais no índice (faltam Porto Velho, Rio Branco, Macapá, Boa Vista e Palmas).
- **ITBI SP**: o campo "Bairro" vem sujo (nome de condomínio, "BLOCO 5", abreviações). Agregamos por **distrito**: o SQL começa com setor + quadra fiscal, e cada quadra fiscal do GeoSampa (WFS `geoportal:quadra_fiscal`) cai num dos 96 distritos (`geoportal:distrito_municipal`). 99,99% das compras localizadas. Filtro: compra e venda, 100% transmitido, apartamento ou residência, 20–600 m², R$ 1.500–60.000/m². Distrito com menos de 30 compras fica sem número.
- O m² do ITBI usa a **área construída do IPTU** (inclui parte das áreas comuns), por isso fica abaixo do m² de anúncio. Dito na página.
- O ITBI também traz **tipo de financiamento e valor financiado**: 39% das compras residenciais de imóvel inteiro foram financiadas (set/2025–ago/2026); MCMV 3,5%.
- Páginas: `/quanto-minha-renda-compra/` (mapa das capitais + renda → m² pelo motor) e `/metro-quadrado-sao-paulo/` (mapa por distrito). Termômetro do IVG-R nas duas.
- Próximo passo possível: Recife (CSV ODbL) e Porto Alegre pelo mesmo caminho; volumes de busca das novas páginas ainda não levantados no Planejador.

## Revisão do mapa das capitais (27/10/2026)
O Bruno notou que "R$ 14 mil de renda para 55 m²" não reflete a realidade. Duas causas:
1. **O FipeZap acompanha anúncios de apartamentos prontos**, concentrados nos bairros mais procurados. Comparação com o preço pago (ITBI): SP R$ 12.206 × R$ 4.970; Recife R$ 9.045 × R$ 4.480; Porto Alegre R$ 7.545 × R$ 5.120 (POA usa área privativa, então a diferença lá é quase toda de preço).
2. **Real:** o crédito trava acima do MCMV. R$ 8 mil → R$ 400 mil; R$ 14 mil → R$ 447 mil (SBPE 11,49%, SAC). Virou seção "Ganhar mais nem sempre compra mais".

Mudança: o destaque passa a ser o **valor do imóvel** (motor validado); m² **real** (ITBI) onde existe; m² de anúncio sempre secundário e com aviso.

ITBI por capital (`itbi-capitais` no script, 12 últimos meses completos):
- **Recife** (CKAN, ODbL): CSV anual; campo `valor_avaliacao` = avaliação da prefeitura para o ITBI (não o declarado); área construída.
- **Porto Alegre** (CKAN `dadosabertos.poa.br`, CC-BY): ZIP anual com CSV; `base_de_calculo` da guia paga (`data_pagamento` preenchida); tem `area_constr_privativa`.
