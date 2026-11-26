# Reels de busca: 8 copies para revisar

Leva de 26/11/2026. O gancho usa as palavras de quem busca, cada Reel tem uma resposta direta e um número só, e o fecho é sempre o mesmo.

- **Fecho:** "E no seu caso? Descubra no link da bio."
- **Duração:** uns 20 s, cerca de 50 a 60 palavras faladas.
- **Na tela:** a pergunta e, no máximo, 2 números. Nada de jargão.
- **Ainda não feito:** voz e motion só depois da aprovação.

Os números saem do motor (`src/lib/financiamento/engine.ts` e `custos.ts`, regras de outubro/2026) ou de uma regra publicada. Quando a resposta depende de uma regra que eu não consegui confirmar, o texto avisa e não chuta.

Aviso legal, que vai em toda legenda com valores:

> Valores estimados com base nas regras de financiamento da Caixa (Minha Casa Minha Vida) vigentes em novembro de 2026. As regras podem mudar a qualquer momento. Não é aprovação de crédito.

---

## 1. "Dá pra financiar casa com nome sujo?"

**Narração**
> Dá pra financiar casa com nome sujo? Na prática, não: com o nome negativado, o banco nega. Mas tem saída. Negocia a dívida, paga ou parcela, e guarda o comprovante. Depois de pagar, quem negativou tem cinco dias úteis pra tirar o seu nome. Aí sim você pede o financiamento. E no seu caso? Descubra no link da bio.

**Tela**
1. Dá pra financiar casa com **nome sujo**?
2. Nome negativado: o banco nega.
3. Pagou? Em **5 dias úteis** o nome tem que sair.
4. E no seu caso? Link na bio.

**Legenda**
> Dá pra financiar casa com nome sujo? Na prática, não: com restrição no nome, o banco nega o crédito.
>
> O caminho: negocie a dívida, pague ou parcele, e guarde o comprovante. Depois do pagamento, quem negativou tem 5 dias úteis para tirar o seu nome. Confira no Registrato (é de graça, do Banco Central) se não sobrou nada antes de pedir o financiamento.
>
> E no seu caso? Descubra no link da bio.
>
> Conteúdo educativo. Cada banco faz a sua análise. Não é aprovação de crédito.

**Fonte:** os 5 dias úteis vêm da Súmula 548 do STJ (prazo do credor para tirar o nome depois da quitação). "O banco nega" é a prática de mercado: não tem número.

---

## 2. "Dá pra comprar casa sem entrada?"

**Narração**
> Dá pra comprar casa sem entrada? Dá, num caso. O banco empresta até 80% do valor que ele avalia, não do preço. Se uma casa de 200 mil for avaliada em 250 mil, 80% disso já é os 200 mil. Entrada zero. Só que o cartório e o imposto continuam por sua conta. E no seu caso? Descubra no link da bio.

**Tela**
1. Dá pra comprar casa **sem entrada**?
2. Preço R$ 200 mil · banco avaliou R$ 250 mil
3. 80% de 250 mil = **R$ 200 mil**: entrada zero
4. Cartório e imposto: por sua conta.
5. E no seu caso? Link na bio.

**Legenda**
> Dá pra comprar casa sem entrada? Dá, quando o banco avalia o imóvel 25% ou mais acima do preço.
>
> O banco empresta até 80% da avaliação. Uma casa de R$ 200 mil avaliada em R$ 250 mil: 80% de R$ 250 mil são os R$ 200 mil inteiros. Com renda a partir de uns R$ 4.500, a parcela fica perto de R$ 1.336.
>
> O cartório e o ITBI continuam por sua conta. E combinar com o vendedor um preço maior no papel é fraude: quem diz quanto vale é o engenheiro do banco.
>
> E no seu caso? Descubra no link da bio.
>
> [aviso legal]

**Fonte:** LTV de 80% em `params.ts` e `previaPrecoAvaliacao` com preço de R$ 200 mil e avaliação de 125%. A renda de R$ 4.500 zera a entrada e dá parcela de R$ 1.336 (MCMV Faixa 2). Com R$ 4.000, ainda sobram R$ 20.963 de entrada.

---

## 3. "Autônomo consegue financiar?"

**Narração**
> Autônomo consegue financiar? Consegue. O banco não pede holerite, pede prova. Seis meses de extrato e a declaração do imposto de renda. MEI leva também os comprovantes do DAS. O que pega é o dinheiro que não passa pela conta: pro banco, ele não existe. Se você comprova 3 mil, a parcela pode ir até 900. E no seu caso? Descubra no link da bio.

**Tela**
1. **Autônomo** consegue financiar?
2. Sim, se provar a renda: extratos de 6 meses + imposto de renda
3. Comprova R$ 3.000 → parcela até **R$ 900**
4. E no seu caso? Link na bio.

**Legenda**
> Autônomo consegue financiar? Consegue, se provar a renda.
>
> Leve os extratos bancários dos últimos 6 meses e a declaração do imposto de renda. MEI leva também os comprovantes do DAS. A renda que não aparece na conta não conta: se você recebe em dinheiro vivo, comece a depositar já.
>
> Quem comprova R$ 3.000 por mês pode ter parcela de até R$ 900 (30% da renda).
>
> E no seu caso? Descubra no link da bio.
>
> [aviso legal]

**Fonte:** a parcela máxima de 30% da renda bruta está em `params.ts` (comp: 30). Os documentos repetem o carrossel 39 (MEI e autônomo), que já está aprovado.

---

## 4. "Primeiro imóvel tem desconto no cartório?"

**Narração**
> Primeiro imóvel tem desconto no cartório? Tem. Se é o seu primeiro imóvel pra morar e você está financiando, o registro sai pela metade. Num imóvel de 200 mil em São Paulo, cai de uns 4.400 pra uns 2.200 reais. Não precisa pedir nada especial: confira na guia se veio pela metade. E no seu caso? Descubra no link da bio.

**Tela**
1. Primeiro imóvel tem **desconto no cartório**?
2. Primeiro imóvel pra morar + financiado = **metade**
3. Imóvel de R$ 200 mil (SP): ~R$ 4.400 → **~R$ 2.200**
4. E no seu caso? Link na bio.

**Legenda**
> Primeiro imóvel tem desconto no cartório? Tem: 50% no registro, quando é o seu primeiro imóvel para morar e a compra é financiada.
>
> Num imóvel de R$ 200 mil em São Paulo, financiando R$ 160 mil, o registro cai de uns R$ 4.400 para uns R$ 2.200.
>
> Confira na guia do cartório se o desconto veio. O ITBI é outra coisa: é da prefeitura.
>
> E no seu caso? Descubra no link da bio.
>
> [aviso legal]

**Fonte:** `custosDaCompra` com a tabela de SP, imóvel de R$ 200 mil e R$ 160 mil financiados: R$ 4.377,97 sem desconto e R$ 2.188,99 com. Em Goiás fica R$ 6.790 → R$ 3.395. A regra é a Lei 6.015/73, art. 290. Na tela não aparecem "emolumentos", "SFH" nem o número da lei.

---

## 5. "Primeiro imóvel paga ITBI?"

**Narração**
> Primeiro imóvel paga ITBI? Paga. O desconto do primeiro imóvel é no cartório, não no imposto. O ITBI é da prefeitura, e cada cidade tem a sua regra. Numa cidade que cobra 3%, um imóvel de 200 mil paga 6 mil. Algumas prefeituras cobram menos de quem financia: pergunte na sua antes de fechar. E no seu caso? Descubra no link da bio.

**Tela**
1. Primeiro imóvel paga **ITBI**?
2. Paga. O desconto é no cartório, não no imposto.
3. Cidade que cobra 3%: imóvel de R$ 200 mil → **R$ 6 mil**
4. Cada cidade tem a sua regra: pergunte na sua.
5. E no seu caso? Link na bio.

**Legenda**
> Primeiro imóvel paga ITBI? Paga. O desconto de primeiro imóvel é no cartório, não no imposto.
>
> O ITBI é da prefeitura e cada cidade tem a sua alíquota. Numa cidade que cobra 3%, um imóvel de R$ 200 mil paga R$ 6 mil. Algumas prefeituras cobram menos na parte financiada ou em programas habitacionais: pergunte na sua antes de fechar.
>
> Separe esse dinheiro junto com a entrada: o ITBI não entra no financiamento.
>
> E no seu caso? Descubra no link da bio.
>
> [aviso legal]

**Fonte:** 3% é o ITBI padrão do motor (`params.ts`, itbi: 3, "varia por cidade"). R$ 6 mil é só 3% de R$ 200 mil.

**Atenção, não confirmei:**
- Não confirmei, cidade a cidade, quais prefeituras dão alíquota menor. Por isso o texto diz "algumas" e não cita nenhuma.
- A frase "o ITBI não entra no financiamento" vem da página do site sobre entrada zero, que diz que ITBI e cartório saem do seu bolso.

---

## 6. "Minha Casa Minha Vida vale pra imóvel usado?"

**Narração**
> Minha Casa Minha Vida vale pra imóvel usado? Vale. O programa financia usado, desde que o preço caiba no limite da sua faixa. Quem ganha até 9.600 pode comprar imóvel de até 400 mil. E o banco avalia o imóvel do mesmo jeito que avaliaria um novo. E no seu caso? Descubra no link da bio.

**Tela**
1. Minha Casa Minha Vida vale pra **imóvel usado**?
2. Vale, se o preço couber na sua faixa.
3. Renda até R$ 9.600 → imóvel até **R$ 400 mil**
4. E no seu caso? Link na bio.

**Legenda**
> Minha Casa Minha Vida vale pra imóvel usado? Vale, desde que o preço caiba no limite da sua faixa.
>
> Renda até R$ 3.200 ou R$ 5.000: imóvel de até R$ 210 mil (em algumas cidades o limite é maior).
> Renda até R$ 9.600: até R$ 400 mil.
> Renda até R$ 13.000: até R$ 600 mil.
>
> O banco avalia o usado do mesmo jeito: empresta até 80% do valor que ele encontrar.
>
> E no seu caso? Descubra no link da bio.
>
> [aviso legal]

**Fonte:** rendas e tetos das faixas estão em `params.ts` (Portaria MCID 333/2026 e Conselho Curador do FGTS 03/2026), e o motor não diferencia novo de usado. Os R$ 210 mil "variam por município (R$ 210–275 mil)", segundo o próprio `params.ts`.

**Atenção, não confirmei:** se o subsídio (o desconto do governo) vale para usado em todas as faixas. Por isso a copy não fala em subsídio. Lembrete do "Novo ou usado" reprovado: aqui não existe nenhum "só o novo faz X".

---

## 7. "Comprar na planta vale a pena?"

**Narração**
> Comprar na planta vale a pena? Pode valer. O preço costuma ser menor, e a entrada você paga em parcelas direto com a construtora durante a obra. Mas essas parcelas sobem com a correção da obra. E o banco analisa o seu crédito de novo na entrega. Antes de assinar, peça a matrícula com o registro da incorporação. E no seu caso? Descubra no link da bio.

**Tela**
1. Comprar **na planta** vale a pena?
2. A favor: entrada parcelada com a construtora
3. Contra: a parcela sobe com a correção da obra
4. Antes de assinar: peça o registro da incorporação.
5. E no seu caso? Link na bio.

**Legenda**
> Comprar na planta vale a pena? Pode valer, se você souber o que muda.
>
> A favor: preço de lançamento e entrada parcelada direto com a construtora durante a obra.
> Contra: essas parcelas são corrigidas por um índice da construção (o INCC), e o banco analisa o seu crédito de novo na entrega das chaves. Se a sua renda ou o seu nome mudarem até lá, o financiamento pode travar.
>
> Antes de assinar, peça a matrícula com o registro da incorporação: é o que mostra que o prédio pode ser vendido na planta.
>
> E no seu caso? Descubra no link da bio.
>
> Conteúdo educativo. Cada construtora e cada banco têm as suas regras. Não é aprovação de crédito.

**Fonte:**
- **Sem número:** o motor não calcula obra nem INCC, e eu não inventaria um.
- **Regras de mercado:** a correção pelo INCC durante a obra e a análise de crédito na entrega são prática comum. O registro da incorporação é exigido pela Lei 4.591/64.
- **Atenção:** hoje "compra na planta" está no seu carrossel 25 (a carta "o preço que assinei"). Este Reel complementa aquele.

---

## 8. "Vale a pena financiar ou continuar no aluguel?"

**Narração**
> Vale a pena financiar ou continuar no aluguel? Faz uma conta. Um imóvel de 200 mil, pelo Minha Casa Minha Vida, dá uma parcela de uns 860 reais. Se o seu aluguel é parecido e você pretende ficar anos, financiar costuma fazer sentido. Mas antes você precisa ter uns 50 mil: entrada e custos da compra. E no seu caso? Descubra no link da bio.

**Tela**
1. Financiar ou continuar no **aluguel**?
2. Imóvel de R$ 200 mil → parcela de ~**R$ 860**
3. Antes: ~**R$ 50 mil** (entrada + custos)
4. E no seu caso? Link na bio.

**Legenda**
> Vale a pena financiar ou continuar no aluguel? Compare com números.
>
> Um imóvel de R$ 200 mil pelo Minha Casa Minha Vida dá uma parcela de uns R$ 860, em 35 anos. Se o seu aluguel está nessa faixa e você pretende ficar anos, financiar costuma fazer sentido.
>
> Mas tem o antes: uns R$ 40 mil de entrada e uns R$ 10 mil de ITBI e cartório. Se esse dinheiro ainda não existe, o aluguel compra tempo para juntar.
>
> E no seu caso? Descubra no link da bio.
>
> [aviso legal]

**Fonte:** `calcular` com imóvel de R$ 200 mil, renda de R$ 2.880, MCMV Faixa 1, 35 anos e tabela Price. A parcela é de R$ 862, a entrada de R$ 40.000 e os custos de R$ 10.000 (5%). A renda mínima é a de `rendaMinimaPara(200000)` (R$ 2.880).

**Atenção:** o valor do aluguel não aparece em lugar nenhum, porque não temos fonte para ele. A pessoa compara com o dela.
