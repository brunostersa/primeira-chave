# Amparo técnico e jurídico do simulador (Caixa)

Pesquisa feita em 27/10/2026. Escopo: só Caixa. Compara as fontes oficiais com `src/lib/financiamento/params.ts` e `engine.ts`.

**Como ler:** ✅ confirmado em fonte oficial (lei, normativo, página da Caixa ou dado do Bacen) · ⚠️ só em imprensa ou blog, sem fonte oficial · ❌ não foi possível confirmar.

> Observação de método: em outubro de 2026, por causa do período eleitoral, algumas páginas do governo estão fora do ar (Agência Gov: "temporariamente indisponível") e o site da Caixa barra downloads automáticos (cartilha e tabela de tarifas em PDF). Esses itens ficaram marcados como "a confirmar", com o link para conferir à mão.

---

## 1. Resumo do que precisa mudar no motor

Em ordem de impacto:

1. **Faixas do MCMV desatualizadas.** As rendas-limite e os tetos de imóvel em `params.ts` são de 2025. A Portaria MCID 333/2026 (em vigor desde 01/04/2026) mudou as faixas para **3.200 / 5.000 / 9.600 / 13.000**, e o Conselho Curador do FGTS subiu os tetos da F3 para **R$ 400 mil** e da F4 para **R$ 600 mil**. Hoje uma família com renda de R$ 9.000 cai na Faixa 4 do simulador, mas na regra real ela está na Faixa 3.
2. **Os juros das Faixas 1 e 2 variam por sub-faixa de renda, e não por faixa.** A IN MCID 48/2022 (versão compilada de 09/04/2026) traz uma tabela com seis degraus de renda até R$ 5.000. A taxa final é essa taxa-base mais o diferencial do banco (até 2,16 p.p.), menos 0,5 p.p. para quem é cotista. As taxas fixas de 4,5% e 6,5% que usamos provavelmente estão **acima** da realidade da Faixa 2.
3. **TR = 0 subestima a parcela ao longo do contrato.** A TR está entre 0,10% e 0,17% ao mês em out/2026 (cerca de 1,2% a 2% ao ano, pela série SGS 226 do Bacen). Não muda a primeira parcela, mas corrige o saldo devedor todo mês.
4. **Teto de imóvel das Faixas 1 e 2 depende do município** (de R$ 210 mil a R$ 275 mil). Hoje usamos R$ 264 mil para todo o país.
5. **A cota da Tabela Price e a cota de usado na Faixa 4 devem ser menores que 80%** (⚠️ imprensa). Os relatos citam 70% para SBPE na Price e, em 2025, 60% para usado na F4 no Sul e no Sudeste. Hoje o motor usa 80% em tudo.
6. **O subsídio das Faixas 1 e 2 não entra na conta** (até R$ 55 mil, ⚠️). É uma omissão conservadora: o simulador mostra que a pessoa precisa de mais entrada do que de fato precisa.
7. **A regra do FGTS ("não ter imóvel") é mais ampla do que a regra oficial.** Pela Caixa, só impede ter imóvel residencial **no município onde a pessoa mora ou trabalha** (incluindo municípios vizinhos e a região metropolitana) ou ter um financiamento ativo pelo SFH em qualquer lugar do país.

---

## 2. Parâmetro × valor vigente × fonte × diferença

| Parâmetro (`params.ts`) | Nosso valor | Valor vigente | Fonte (data) | Status | Diferença / ação |
|---|---|---|---|---|---|
| `comp` (parcela máx. da renda) | 30% | "até 30% da sua renda familiar bruta" | [Caixa, Financiamento de Imóveis](https://www.caixa.gov.br/voce/habitacao/financiamento-de-imoveis/Paginas/default.aspx) (lida em 27/10/2026) | ✅ | Igual. A Res. CMN 4.676, art. 11, deixa a análise da capacidade de pagamento a cargo do banco, então 30% é prática da Caixa, não regra legal. |
| `prazoMax` | 420 meses | "até 35 anos para pagar" | Mesma página da Caixa; Lei 8.036/90, art. 9º, IV, citada na IN 48, art. 43 | ✅ | Igual. |
| `idadeLimite` (idade + prazo) | 80,5 anos | 80 anos e 6 meses (prática da Caixa, ligada à apólice MIP) | Não achei normativo público; aparece na cartilha da Caixa, que não deu para baixar ([cartilha](https://www.caixa.gov.br/Downloads/habitacao-documentos-gerais/passos_indexadores_amortizacao.pdf)) | ❌ | Manter e conferir na cartilha. |
| Faixa 1: `rendaAte` | 2.850 | **3.200** | [Portaria MCID 333, de 30/03/2026, DOU de 01/04/2026, art. 1º, I, a](https://www.gov.br/cidades/pt-br/acesso-a-informacao/institucional/base-juridica/portarias/PORTARIAMCIDN333DE30DEMARODE2026PORTARIAMCIDN333DE30DEMARODE2026DOUImprensaNacional.pdf) | ✅ | **Atualizar.** |
| Faixa 2: `rendaAte` | 4.700 | **5.000** | Portaria MCID 333/2026, art. 1º, I, b | ✅ | **Atualizar.** |
| Faixa 3: `rendaAte` | 8.600 | **9.600** | Portaria MCID 333/2026, art. 1º, I, c | ✅ | **Atualizar.** |
| Faixa 4: `rendaAte` | 12.000 | **13.000** | Portaria MCID 333/2026, art. 1º, caput (limite geral urbano) | ✅ | **Atualizar.** |
| Faixas 1 e 2: `tetoImovel` | 264.000 | **210 mil a 275 mil, conforme o município** (inalterados em 2026) | [Secom, 04/2026](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2026/04/nova-portaria-atualiza-limites-de-renda-bruta-familiar-admitidos-para-familias-atendidas-pelo-minha-casa-minha-vida); base: Res. CCFGTS 702/2012, art. 20, e IN 48, arts. 20 e 22 (enquadramento do município) | ✅ intervalo / ❌ tabela por município | Teto fixo de 264 mil é aproximação. Pedir a cidade, ou usar o mínimo de 210 mil com aviso. |
| Faixa 3: `tetoImovel` | 350.000 | **400.000** | Conselho Curador do FGTS, reunião de 24/03/2026 ([Portas](https://portas.com.br/noticias/minha-casa-minha-vida-renda-teto/); Secom, 04/2026) | ✅ (governo) / ❌ número da resolução | **Atualizar.** Achar o número da resolução CCFGTS. |
| Faixa 4: `tetoImovel` | 500.000 | **600.000** | Mesma decisão do CCFGTS (24/03/2026); a Caixa passou a operar em 22/04/2026 ([Caixa Notícias](https://caixanoticias.caixa.gov.br/Paginas/Not%C3%ADcias/2026/04-ABRIL/CAIXA-inicia-opera%C3%A7%C3%A3o-das-novas-condi%C3%A7%C3%B5es-do-Minha-Casa,-Minha-Vida-na-pr%C3%B3xima-quarta-feira-(22).aspx), página fora do ar em 27/10) | ✅ (governo) | **Atualizar.** |
| Faixa 1: `juros` | 4,5% | **Taxa-base de 3,90% a 3,97%** (renda até 3.200) **+ diferencial do banco de até 2,16 p.p. − 0,5 p.p. para cotista**. A imprensa cita taxa final de 4,00% (N/NE) a 4,25% (demais regiões) | [IN MCID 48/2022, compilada em 09/04/2026, art. 38, I e II, §§1º e 2º](https://www.gov.br/cidades/pt-br/acesso-a-informacao/institucional/base-juridica/instrucoes-normativas/IN_48_de_19.12.22__compilada_em_09.04.2026_.pdf) (redação da IN MCID 4, de 08/04/2026) | ✅ base / ⚠️ taxa final | Provavelmente um pouco acima da realidade. **A taxa final da Caixa por região e sub-faixa só aparece no simulador da Caixa.** |
| Faixa 2: `juros` | 6,5% | Taxa-base de **3,92%** (renda de 3.200,01 a 4.000) e **4,84%** (de 4.000,01 a 5.000), + diferencial − cotista. Imprensa: taxa final de 4,75% a 7% | IN 48, art. 38 (idem) | ✅ base / ⚠️ final | **Provavelmente alto demais**, principalmente para renda até 4 mil. Trocar por uma tabela por sub-faixa. |
| Faixa 3: `juros` | 8,16% | **6% + 2,16% = 8,16%** (não cotista); cotista: **7,66%** | IN 48, art. 38, III e §§1º e 2º | ✅ | Igual, desde que a Caixa use o diferencial máximo (é o que a imprensa relata). |
| Faixa 4: `juros` | 10,5% | 10% a.a. (lançamento em 05/2025); em 2026 a imprensa cita entre 10% e 10,5% | [Mercado & Consumo, 06/05/2025](https://mercadoeconsumo.com.br/06/05/2025/economia/caixa-inicia-operacao-da-faixa-4-do-minha-casa-minha-vida-voltada-a-classe-media/) | ⚠️ | Não achei normativo. A F4 não está na IN 48 (que vai até renda de 9.600). Conferir no simulador. |
| `cotistaDesc` | 0,5 p.p. (F1–F3) | **0,5 p.p.** para quem tem conta no FGTS com 3 anos ou mais de trabalho | IN 48, art. 38, §1º; Res. CCFGTS 702/2012, art. 32, §1º | ✅ | Igual. |
| `mcmvLtv` | 80% | **Contrapartida mínima de 20%** (cota máxima de 80%), **reduzível a 10% no SAC** (cota de até 90%) | IN 48, art. 34, II e §1º; Res. CMN 4.676, art. 6º, I e §1º | ✅ teto normativo / ❌ prática da Caixa | O normativo permite até 90% no SAC. A cota que a Caixa pratica por faixa e por tipo (novo/usado) precisa ser conferida. F4 usado: 60% no Sul e Sudeste (⚠️, 2025). |
| Subsídio F1/F2 | não modelado | Até R$ 55 mil (até R$ 65 mil no Norte) | Só imprensa ([CNN Brasil](https://www.cnnbrasil.com.br/branded-content/economia/negocios/guia-minha-casa-minha-vida-2026-regras-valores-e-quem-pode-participar/)); base: Res. CCFGTS 702, arts. 29 e 30, e IN 48, art. 32, I | ⚠️ | Omissão conservadora. Avisar no resultado que pode haver subsídio. |
| `sbpeJuros` | 11,49% + TR | Balcão de 11,19% a 11,49% + TR (blogs). Média de mercado contratada na Caixa em set/2026: **12,05% a.a.** (taxas de mercado, pós-fixada em TR, que inclui o SFI) e **7,98% a.a.** (taxas reguladas, TR, que mistura FGTS e SFH) | [Bacen, dados abertos: Taxas de juros por instituição](https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes?$format=json&$filter=cnpj8%20eq%20'00360305'), consulta em 27/10/2026 | ⚠️ balcão / ✅ médias | Plausível, mas sem fonte oficial da taxa de balcão. As médias do Bacen não servem como parâmetro direto (misturam linhas), mas servem de alarme. |
| Teto de custo no SFH | não modelado | **Custo efetivo máximo de 12% a.a.** (juros, comissões e encargos) | [Res. CMN 4.676/2018, art. 13, II](https://normativos.bcb.gov.br/Lists/Normativos/Attachments/50628/Res_4676_v17_P.pdf) (versão 17) | ✅ | Validar que juros SBPE + TA nunca passem de 12% a.a. no SFH. |
| `sbpeLtvUsado` / `sbpeLtvNovo` | 80 / 80 | Teto normativo de **80%, ou 90% no SAC/Sacre**. A Caixa voltou a 80% no SAC; na **Price, cerca de 70%** (⚠️) | Res. CMN 4.676, art. 6º, I e §1º (redação da Res. CMN 5.197/2024); [CNN Brasil](https://www.cnnbrasil.com.br/economia/money/macroeconomia/credito-imobiliario-caixa-volta-a-financiar-ate-80-do-valor-de-imoveis/) | ✅ teto / ⚠️ prática | **O motor aplica a mesma cota na Price e no SAC.** Separar `ltvPrice` e `ltvSac`. |
| Base da cota (avaliação × preço) | % da avaliação, limitado ao preço | Pela Res. 4.676, a "cota de crédito" é calculada sobre o **valor de avaliação**, e inclui **principal + despesas acessórias**. A IN 48, art. 34, §3º, fala em "menor dos valores entre venda, investimento e avaliação" (imóveis retomados) | Res. CMN 4.676, art. 1º, XI (Res. 5.197/2024); IN 48, art. 34, §3º | ✅ teto / ❌ regra "limitado ao preço" na Caixa | A regra do Bruno é coerente com o normativo (que se apoia na avaliação). O limite pelo preço é política do banco. Confirmar por escrito com um correspondente. |
| `sfhTeto` | 2.250.000 | **R$ 2.250.000** (avaliação) | Res. CMN 4.676, art. 13, I (redação da [Res. CMN 5.255, de 10/10/2025](https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Resolu%C3%A7%C3%A3o%20CMN&p2=5255)) | ✅ | Igual. |
| Indexador / TR | TR = 0 | TR diária entre **0,096% e 0,17% ao mês** (períodos de 18 a 23/10/2026). MCMV/FGTS: corrige pelo índice das contas do FGTS (TR) | [Bacen SGS 226](https://api.bcb.gov.br/dados/serie/bcdata.sgs.226/dados/ultimos/6?formato=json); IN 48, art. 41; Res. 4.676, art. 13, III | ✅ | **Divergência.** Mostrar um cenário "com TR atual" ou ao menos o custo total com TR. Selic: 13,75% (SGS 432). |
| `taxaAdm` | R$ 25/mês | Tarifa de Administração de Contrato (TA), cobrada todo mês nas operações SFH, "conforme Tabela de Tarifas" | [Caixa, Financiamento de Imóveis, seção Tarifas](https://www.caixa.gov.br/voce/habitacao/financiamento-de-imoveis/Paginas/default.aspx); [Tabela de Tarifas PF](https://www.caixa.gov.br/Downloads/tabelas-tarifas-pessoa-fisica-pessoa-juridica/tabela-de-tarifas-pessoa-fisica.pdf) (não deu para baixar) | ✅ existência / ❌ valor | Conferir o valor na tabela. No FGTS, a taxa de administração segue a Res. CCFGTS 702, art. 38 (IN 48, art. 39). |
| `dfi` / `mipRate` | 0,0071% do imóvel/mês; MIP por idade (estimado) | MIP e DFI são **obrigatórios** (IN 48, art. 45; Res. 4.676, art. 5º, IV). **Não há tabela pública oficial**: o prêmio depende da apólice (a Caixa como estipulante) e a pessoa pode trazer uma apólice própria (IN 48, art. 45, §3º, II) | IN 48, art. 45 | ✅ obrigatoriedade / ❌ taxas | Calibrar com casos do simulador da Caixa por idade (ver seção 5). |
| `avaliacao` | 0,5% do imóvel | Tarifa de avaliação permitida (Res. CMN 4.925/2021), com **valor fixo** na Tabela de Tarifas da Caixa | Caixa, seção Tarifas | ✅ existência / ❌ valor | Trocar o percentual pelo valor em reais da tabela. |
| `itbi` | 3% | Imposto municipal (CF, art. 156, II). A alíquota varia por cidade | — | ✅ natureza | Pedir a cidade ou mostrar como premissa editável (já é). |
| `cartorio` | 1,5% | Emolumentos estaduais (tabelas de cada TJ). Podem entrar no financiamento como "despesas acessórias", dentro da cota (Res. 4.676, art. 1º, XI e art. 6º) | Res. CMN 4.676 | ✅ base legal / ❌ prática atual da Caixa (ITBI + registro) | Hoje o simulador conta isso do bolso, o que é conservador. Confirmar se a Caixa financia ITBI e registro e qual o limite. |
| FGTS na compra | entrada; exige 3 anos de FGTS e "não ter imóvel" | 3 anos de FGTS (somados); **sem financiamento SFH ativo no país**; **sem imóvel residencial no município de residência ou de trabalho** (e vizinhos/região metropolitana); imóvel residencial urbano para moradia própria; avaliação até R$ 2,25 mi; o imóvel não pode ter usado FGTS há menos de 3 anos | [Caixa, Utilização do FGTS](https://www.caixa.gov.br/voce/habitacao/Paginas/utilizacao-fgts.aspx) (lida em 27/10/2026); Manual de Moradia Própria (Agente Operador) | ✅ | **A pergunta "já tem imóvel no nome" está ampla demais.** Perguntar "na cidade onde mora ou trabalha". Atenção: o MCMV tem regra própria de não ter imóvel (ver item 7). |
| FGTS depois da compra | amortiza a cada 2 anos; paga parte da prestação | Amortizar e liquidar: sim. **Pagar até 80% da prestação por 12 meses seguidos** (créditos futuros também) | Mesma página da Caixa | ✅ / ❌ intervalo de 2 anos (está no Manual) | Ajustar o texto: "até 80% da prestação por 12 meses". |
| FGTS paga ITBI/cartório | não | O FGTS entra só no preço do imóvel (aquisição) | Manual de Moradia Própria | ❌ (não foi possível ler o manual) | Conferir no manual. |

### Regras do MCMV que o motor ainda não trata (a confirmar)

- **Não ter imóvel nem financiamento habitacional em qualquer lugar do país.** É uma regra do MCMV, diferente da regra do FGTS. Base: Lei 14.620/2023 e regulamentação. ❌ Não confirmei o artigo exato.
- **Fases 1, 2 e 3 da taxa (só imóveis novos, renda até 5 mil).** A taxa sobe conforme o FGTS cumpre as metas físicas do orçamento (IN 48, art. 38, I, e §3º). Para usados, vale uma tabela única (art. 38, II).
- **Taxa por região (N/NE × demais).** Aparece na imprensa, mas não está na IN 48. Indica que o diferencial cobrado pela Caixa varia por região. ⚠️

---

## 3. Riscos jurídicos e recomendações

| # | Risco | Base | Gravidade | Recomendação |
|---|---|---|---|---|
| 1 | **Oferta ou publicidade que vincula ou engana.** Uma frase como "você consegue financiar R$ X" pode ser lida como promessa. Omitir premissas (TR, cota da Price, avaliação) pode ser "publicidade enganosa por omissão". | CDC, arts. 6º, III; 30; 31; 37, §1º | Alta | Sempre usar "estimativa" ou "simulação". Mostrar as premissas ao lado do número (taxa, cota, TR, data dos parâmetros). Nunca usar "aprovado", "garantido" ou "pré-aprovado". |
| 2 | **Regras de oferta de crédito (superendividamento).** Valem para o "fornecedor ou intermediário" de crédito: informar CET, taxa mensal e encargos de atraso; proibido sugerir que sai "sem consulta ao SPC" ou "sem análise"; proibido ocultar riscos ou pressionar. | CDC, arts. 52, 54-B, 54-C (II, III, IV) e 54-D (Lei 14.181/2021) | Média hoje / Alta se virarmos intermediário (lead pago por banco ou correspondente) | Não somos fornecedores de crédito, mas adotar o padrão desde já: mostrar a taxa mensal e anual e o custo total estimado, explicar a inadimplência e a retomada do imóvel (alienação fiduciária), sem urgência artificial. **Cuidado com o "segredo da entrada zero"**: não pode soar como atalho para fugir da análise do banco (art. 54-C, II e III). |
| 3 | **CET.** Só o banco calcula o CET oficial. Se publicarmos um número chamado "CET", ele pode ser cobrado como se fosse oficial. | Res. CMN 4.881/2020, arts. 1º a 4º (obrigação das instituições financeiras) | Média | Usar o nome "custo total estimado" (não "CET") e dizer que o CET oficial vem no documento do banco. Opcional: calcular uma "taxa total aproximada" com seguros e TA, explicando a diferença. |
| 4 | **Atuar como correspondente sem contrato.** "Recepção e encaminhamento de propostas de operações de crédito" é atividade de correspondente e exige contrato com o banco, **equipe certificada** e identificação ao cliente. Também é proibido usar logomarca ou visual parecido com o do banco. | Res. CMN 4.935/2021, arts. 2º, 12, V, 14, II e III, e 16 | Alta se encaminharmos propostas ou documentos para a Caixa; baixa enquanto só educarmos | Enquanto não houver contrato: **não coletar documentos, não montar dossiê, não "enviar para análise"**. A pessoa vai por conta própria à agência ou ao correspondente. Repassar lead com remuneração por contrato fechado tende a parecer "captação" (a Res. 4.935 trata a remuneração do correspondente pela originação da operação): precisa de parecer. |
| 5 | **Uso das marcas "Caixa" e "Minha Casa, Minha Vida".** "CAIXA" é marca registrada. O MCMV é programa federal instituído em lei, e a marca pode ter registro no INPI. Pode haver confusão com canal oficial e com golpes de "inscrição no MCMV". | Lei 9.279/96 (LPI), arts. 129, 130, III, 131 e 132, IV (uso em publicação sem conotação comercial); CDC, art. 37; Res. 4.935, art. 14, II (por analogia) | Média | Uso **nominativo e descritivo** ("simulação com as regras públicas da Caixa e do Minha Casa, Minha Vida"). **Nunca** usar logotipo, as cores ou a tipografia da Caixa, nem "Caixa" no domínio, no nome do produto ou no nome de perfil. Aviso fixo "não somos a Caixa nem órgão do governo". **Não vender nada que pareça inscrição ou acesso ao MCMV** (lowticket com "MCMV" no título é o maior risco). Anúncios: políticas de marca do Google Ads e da Meta. |
| 6 | **LGPD na coleta de lead.** Renda, idade, dívidas, FGTS e situação do CPF são dados pessoais, e juntos formam um perfil financeiro (não são "sensíveis" pelo art. 5º, II, mas pedem cuidado). | Lei 13.709/2018, arts. 6º (finalidade, necessidade, transparência), 7º, I e IX, e §5º, 8º, 9º, 10, 18, 37, 41 e 46; Res. CD/ANPD 2/2022 (agente de pequeno porte); Marco Civil, art. 15 (guarda de logs por 6 meses) | Média | **Simular sem identificação** (as contas no navegador, nada salvo). Pedir nome, e-mail ou WhatsApp só depois, com finalidade clara. Base legal: consentimento para marketing e para compartilhar com terceiros (consentimento **específico** para repassar a correspondente, art. 7º, §5º). Publicar política de privacidade, ter canal do titular e prazo de retenção. Não colocar dados em URL. Registrar consentimento (data, texto, versão). |
| 7 | **Desatualização dos parâmetros.** Um número velho (como as faixas de 2025, que temos hoje) vira informação incorreta. | CDC, arts. 31 e 37 | Média | Mostrar "regras de [mês/ano]" em todas as telas (já existe `PARAMS_ATUALIZADOS_EM`). Rotina de revisão mensal (seção 5). Registrar a fonte de cada parâmetro no código. |
| 8 | **Aparência de consultoria financeira personalizada.** Os "próximos passos" ("quite suas dívidas", "peça aprovação") são orientação genérica. | Não há regra específica para educação financeira. A CVM (Res. 19/2021, consultoria de valores mobiliários) não se aplica a crédito imobiliário | Baixa | Manter tom educativo, sem recomendar banco ou produto específico mediante pagamento sem dizer que é publicidade. |
| 9 | **Responsabilidade por dano** (a pessoa paga sinal confiando no simulador). | CDC, arts. 14 e 20 (serviço); Código Civil, art. 927 | Média | Aviso e a tarefa "peça a avaliação antes de pagar sinal", que já existe e é uma boa defesa. Termos de uso com limitação razoável (cláusula abusiva não vale: CDC, art. 51, I). |

---

## 4. Texto de aviso sugerido

**Curto (rodapé do resultado e de toda página com número):**

> Simulação educativa, com as regras públicas da Caixa e do Minha Casa, Minha Vida vigentes em [mês/ano]. Não é proposta, pré-aprovação nem garantia de crédito. A aprovação, a taxa, a cota financiada e o valor da parcela são definidos pelo banco depois da análise de crédito e da avaliação do imóvel. A Primeira Chave não é banco, correspondente bancário nem órgão do governo, e não tem vínculo com a Caixa.

**Longo (página "Como calculamos" + termos de uso):**

> **O que é esta simulação.** Uma estimativa feita com regras públicas: limites de renda e de imóvel do Minha Casa, Minha Vida (Portaria MCID nº 333/2026 e decisões do Conselho Curador do FGTS), taxas de juros do FGTS (IN MCID nº 48/2022), limites do Sistema Financeiro da Habitação (Resolução CMN nº 4.676/2018) e condições divulgadas pela Caixa. As referências usadas estão listadas nesta página, com a data.
>
> **O que ela não considera.** A análise do seu CPF e da sua renda pelo banco; o valor real de avaliação do imóvel; a variação da TR depois da contratação; subsídios do programa; o valor exato dos seguros (MIP e DFI), que depende da sua idade e da seguradora; e as alíquotas de ITBI e cartório da sua cidade. Por isso, o resultado pode ser diferente do que o banco vai oferecer.
>
> **Custo total.** O "custo total estimado" mostrado aqui não é o Custo Efetivo Total (CET). O CET oficial é calculado pelo banco e precisa constar na proposta antes da contratação.
>
> **Quem somos.** A Primeira Chave é um serviço independente de educação financeira. Não somos a Caixa Econômica Federal, não somos correspondente bancário nem representamos o Ministério das Cidades. "CAIXA" e "Minha Casa, Minha Vida" são citados apenas para identificar as regras públicas usadas no cálculo. Nenhum programa do governo cobra taxa de inscrição: desconfie de quem cobrar.
>
> **Seus dados.** A simulação pode ser feita sem identificação. Se você deixar seu contato, usaremos os dados só para [finalidade], conforme a nossa Política de Privacidade. Você pode pedir a exclusão a qualquer momento.

**Frases a evitar:** "aprovado", "pré-aprovado", "garantido", "sem consulta ao SPC", "sem burocracia", "parceiro oficial da Caixa", "inscrição no Minha Casa Minha Vida", "simulador Caixa" (como nome do produto).

---

## 5. Caminhos de parceria e validação

### Dados abertos que dá para automatizar (sem login, uso público)

| Dado | Fonte | Uso no projeto |
|---|---|---|
| TR diária ou mensal | [Bacen SGS série 226](https://api.bcb.gov.br/dados/serie/bcdata.sgs.226/dados/ultimos/12?formato=json) | Cenário "com TR atual" e custo total. |
| Meta Selic | [SGS 432](https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json) | Contexto nos guias. |
| Taxas médias por banco e modalidade (mensal) | [Olinda, `taxaJuros/v2`, `TaxasJurosMensalPorMes`, filtro `cnpj8 eq '00360305'`](https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes?$format=json&$filter=cnpj8%20eq%20'00360305') | Alarme: se a média da Caixa (mercado, TR) se afastar mais que X p.p. do `sbpeJuros`, revisar. São médias contratadas, não a taxa de balcão. |
| Normativos CMN/Bacen | [API de normativos do Bacen](https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Resolu%C3%A7%C3%A3o%20CMN&p2=4676) e versões consolidadas em `normativos.bcb.gov.br` | Checar se a Res. 4.676 ganhou nova versão (hoje é a v17). |
| Portarias, INs e resoluções do CCFGTS | [Base jurídica do Ministério das Cidades](https://www.gov.br/cidades/pt-br/acesso-a-informacao/institucional/base-juridica) e DOU (busca por "Minha Casa, Minha Vida" e "Conselho Curador") | Revisão mensal. A IN 48 compilada traz a data da última alteração no nome do arquivo. |

**Não existe API pública da Caixa** para simulação ou taxas. O [simulador habitacional](https://simuladorhabitacao.caixa.gov.br/home) é a referência, mas automatizá-lo (robô) **não é recomendado**: o site tem proteção contra bots, e contornar isso viola os termos de uso e cria risco. A validação deve ser manual.

### Validação periódica contra o simulador oficial (proposta)

1. **Casos de referência (8 a 12)**, guardados em `tests/` como os atuais: Faixa 1, 2 e 3 (cotista e não cotista, N/NE e SE), Faixa 4 novo e usado, SBPE SAC e Price, idades de 25, 40 e 55 anos (para calibrar o MIP) e imóvel de R$ 600 mil (para calibrar o DFI).
2. **Todo mês, e sempre que sair portaria ou resolução**, alguém roda os casos à mão no simulador da Caixa e guarda o PDF ou print com data (pasta `docs/validacao/AAAA-MM/`).
3. **Teste automatizado** compara a 1ª parcela, o valor financiado e a taxa com uma tolerância (por exemplo, ±2% na parcela e ±R$ 1 mil no financiado). Se falhar, o build quebra e mostra qual parâmetro revisar.
4. **Registro no código:** cada campo de `params.ts` com comentário `// fonte: … (data)`, e a página "Como calculamos" gerada a partir disso.

### Parceria

| Caminho | O que é | Prós | Contras e cuidados |
|---|---|---|---|
| **Virar correspondente Caixa Aqui** | Contrato de correspondente (Res. 4.935) para recepção e encaminhamento de propostas de crédito habitacional | Remuneração por contrato; acesso a taxas e cotas reais; validação "de dentro" | Pede pessoa jurídica, equipe certificada (art. 16), credenciamento pela Caixa ([página Caixa Aqui](https://www.caixa.gov.br/atendimento/caixa-aqui/Paginas/default.aspx), ❌ não lida) e diretrizes da Caixa. **Conflita com o posicionamento "independente"**, e as regras do art. 14 limitam a marca. |
| **Parceria com um correspondente já credenciado** | Indicação de clientes (a pessoa escolhe ser encaminhada) | Rápido, sem certificação própria; o correspondente valida casos reais | A remuneração por indicação pode configurar "captação" ou subcontratação (Res. 4.935: ver regras de substabelecimento). Exige consentimento LGPD específico para compartilhar dados. **Precisa de parecer.** |
| **Só educativo + afiliados neutros** | Conteúdo e lowtickets; a pessoa procura o banco sozinha | Menor risco regulatório; posição de independência | Monetização menor. |
| **Validação informal** | Um correspondente ou gerente da Caixa confere os casos de referência por mês | Barato; dá amparo prático às regras de cota, avaliação e ITBI | Sem valor jurídico; registrar por escrito (e-mail). |

---

## 6. O que precisa de advogado ou contador validar

**Advogado (direito do consumidor, bancário e propriedade intelectual):**

1. Se o modelo de lead (repassar contato a correspondente ou banco, com ou sem remuneração) configura atividade de correspondente (Res. CMN 4.935, art. 12, V) ou intermediação de crédito sujeita aos arts. 54-B a 54-D do CDC.
2. Uso de "Caixa" e "Minha Casa, Minha Vida" em títulos de páginas, URLs, anúncios (palavra-chave e texto) e no **nome de lowtickets**. Consultar registros no INPI.
3. Revisão do aviso, dos termos de uso e da política de privacidade (cláusulas de limitação de responsabilidade e o art. 51 do CDC).
4. Se o "segredo da entrada zero" (avaliação ≥ preço ÷ 0,8) pode ser lido como incentivo a superavaliar o imóvel ou a uma prática irregular com o vendedor (ex.: "preço por fora"). Definir como comunicar isso sem risco (CDC, art. 54-C, III; e a esfera penal se houver declaração falsa ao banco).
5. LGPD: base legal por finalidade, texto de consentimento, prazo de retenção, contrato com operadores (CRM, WhatsApp) e se precisamos de encarregado (Res. CD/ANPD 2/2022).

**Contador ou especialista em crédito imobiliário (ou correspondente de confiança):**

6. Valores da Tabela de Tarifas da Caixa: TA mensal (hoje R$ 25) e tarifa de avaliação (hoje 0,5%).
7. Se a Caixa financia hoje ITBI e registro (despesas acessórias) e até que limite.
8. Cotas praticadas pela Caixa por linha: MCMV F1 a F4 (novo e usado, por região), SBPE SAC × Price.
9. Taxa final da Caixa nas Faixas 1 e 2 por sub-faixa de renda e região, e a taxa da Faixa 4 em 2026.
10. Regra prática "financiamento limitado ao menor valor entre avaliação e preço" na Caixa (fora o caso de imóvel retomado).
11. Idade + prazo (80 anos e 6 meses) e taxas MIP/DFI da apólice da Caixa.
12. Enquadramento tributário dos lowtickets e do eventual recebimento de comissões (o contador da empresa).

---

## 7. Não foi possível confirmar

- O número da resolução do CCFGTS de 24/03/2026 (tetos de R$ 400 mil e R$ 600 mil). Confirmei a decisão pelo governo e pela imprensa, não o texto.
- A tabela de teto de imóvel por município das Faixas 1 e 2.
- As taxas finais da Caixa nas F1/F2 por região, a taxa da F4 em 2026 e a cota de usado na F4 em 2026.
- A taxa de balcão do SBPE na Caixa (11,19% a 11,49% só aparece em blogs).
- O valor da TA, da tarifa de avaliação, e os prêmios MIP/DFI (a Tabela de Tarifas e a cartilha da Caixa não baixaram).
- A regra do MCMV de não ter imóvel em nenhum lugar do país (o artigo exato da Lei 14.620/2023 e da regulamentação).
- O intervalo de 2 anos para amortizar com FGTS e a proibição de usar FGTS para ITBI e cartório (estão no Manual de Moradia Própria, que não li).
- O valor do subsídio das F1/F2 em 2026 (até R$ 55 mil ou R$ 65 mil, segundo a imprensa).
