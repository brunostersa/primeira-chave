# Marca

> **Design system oficial (29/10/2026):** https://claude.ai/artifact/9DKX8Dp5FoZw6tsJMGZtv9
> Tokens, tipografia com as fontes reais, logos, mascote, ícones, componentes e o brand book, num link só para ilustrador, designer, parceiro ou outra sessão do Claude.
> O código continua sendo a fonte da verdade (`src/app/globals.css`, este arquivo, `src/components/ui` e `brand`). Mudou cor, fonte, componente ou regra de marca aqui? Atualize o design system também: ele não se atualiza sozinho. Versão atual feita a partir do commit `99013af`.

## Nome

**Primeira Chave** · domínio único `primeirachave.com.br` (comprado em 26/10/2026). Tudo vira página do mesmo domínio: `/vender`, `/imoveis`, `/parceiros`. Sem domínios extras.

Descartados: nomes com "Claro" (lembra a operadora), portmanteaus ("finimovel"), nomes com Caixa/MCMV (marca do banco/governo, parece site oficial).

Instagram: **@primeirachavebr**. Pendente: busca no INPI.

## Tom de voz

- Fala como quem já comprou e explica pro amigo. Frases curtas. "Você", nunca "o mutuário".
- Todo termo de banco vem traduzido na mesma frase: "renda bruta (o valor do holerite antes dos descontos)".
- Número primeiro, explicação depois. Uma ideia por tela.
- Honesto: diz o que é estimativa e o que precisa confirmar no banco. Nunca promete aprovação.
- "Não sei" é resposta válida.
- **Nunca "criar conta".** Não existe conta de usuário: o convite é aprender e simular ("Simule o seu financiamento", "Faça a simulação", "Aprenda como funciona"). Evite "Faça a sua conta" em botão ou título, que soa como cadastro; dentro da frase, com contexto de cálculo ("a conta do lance"), pode.

## Sistema visual — direção A "Planta" (escolhida em 27/10/2026)

Canvas com as direções: https://claude.ai/artifact/M4bXjVkDfNyVuKd2XCJXcy (a B "Noite" ficou como alternativa).
Referências: StudioSixty (contenção, grid, azul gelo), Flaren (uma cor forte + mono, símbolo vira padrão), Crumbl (personagem em traço único).

- **Conceito:** claro, calmo, construído. Uma planta baixa do primeiro imóvel: papel, grade, linhas de cota.
- **Cores e papéis:**
  - Marca-texto `#F4D23F` = o seu dinheiro (entrada, destaque, o ponto do símbolo).
  - Tinta `#121418` = texto, traço, personagem.
  - Planta `#C6D6E3` = o banco, os papéis, a casa.
  - Papel `#F2F3F1` = fundo. Cinza de apoio `#5A6069`.
  - Hachurado = custos (ITBI, cartório).
- **Tipografia:** Outfit (títulos, fina 300 + 600 no destaque), Figtree (texto), IBM Plex Mono (dados e cotas).
- **Símbolo:** a chave que é um "1" — argola = a casa, haste = o número 1, ponto amarelo = o seu dinheiro.
- **Logo:** símbolo + "Primeira **Chave**" (Primeira em 300, Chave em 600 com faixa de marca-texto).
- **Personagem: o João-de-barro.** Pássaro brasileiro que constrói a própria casa, barro por barro — "junte a sua entrada de bico em bico". Desenhado em traço único tinta; a bolinha de barro/dinheiro no bico é amarela; o ninho é azul planta. Rascunho atual é simples: pedir a um ilustrador para refinar antes de virar mascote oficial.

## Biblioteca (no código, visível em /marca)

- **Mascote com ângulos:** `pose` perfil · frente · voando · bicando · comemora; `carga` chave · barro; `virado` espelha; `giro` inclina (`src/components/brand/JoaoDeBarro.tsx`).
- **Cenas** (`src/components/brand/ilustracoes.tsx`): juntar-entrada, avaliacao, documentos, banco, fgts, nome-limpo, assinatura, a-chave, negado, vender, calcular, prazo. Uma por assunto do site/SEO.
- **Imóveis (27/10/2026)** (`src/components/brand/imoveis.tsx`): casa e prédio de apartamentos em fachada moderna (laje plana, volumes retos, ripado), no traço do pássaro. Nada de casinha de telhado. Azul planta = a casa; amarelo só no puxador e na etiqueta de preço. `<Imovel tipo="casa|apartamento" />` sozinho, ou `CasaForma`/`ApartamentoForma` nas cenas `casa`, `apartamento` e `sem-entrada`. Dá ao João um cenário: ele pousa na laje, na varanda, na etiqueta.
- **Ícones** (`src/components/brand/icones.tsx`): 16 ícones em traço 1,75, detalhe amarelo onde há dinheiro.
- **Moldes** (`src/components/moldes/moldes.tsx`, rota `/molde/<slug>/` em tamanho real): post o segredo, post quanto preciso ganhar (números do motor), carrossel capa e miolo, story, imagem de compartilhamento (OG), avatar.
- **Deslizador lúdico:** o João-de-barro com a chave é o puxador e a trilha enche de marca-texto (`.deslizador` em `globals.css`). O puxador é um círculo tradicional (branco, borda tinta, miolo amarelo) centrado na trilha, com o pássaro pousado em cima. O rosto reage ao resultado via `humor` (feliz com entrada zero, triste com avaliação abaixo do preço, surpreso quando a renda limita). Os puxadores são gerados por `node scripts/gerar-passaro-deslizador.mjs`.
- **Ícone / favicon (27/10/2026):** a chave-1 apoiada no círculo amarelo (`src/app/icon.svg`, `<Icone />`). O pássaro ficou ilegível em 16–48 px, então ele é só avatar de rede social (`<Icone simbolo="passaro" />`, 40 px ou mais).
- **Rosto e humor (27/10/2026):** o sentimento mora nos olhos. `humor` = gentil (padrão: pálpebra suave + brilho) · feliz · curioso · pensativo · surpreso · triste · piscando. Bochecha cor de barro (`--barro #EEB194`), marca registrada do rosto, só aparece nele. Cada cena já usa o humor do assunto (triste no "negado", piscando ao passar a chave, pensativo na conta…).
