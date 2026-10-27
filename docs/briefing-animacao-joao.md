# Briefing: animação do João-de-barro (Rive)

Para enviar a ilustrador/motion designer. Objetivo: transformar o João-de-barro, mascote da Primeira Chave, num personagem animado e interativo, usado no site (hero da home e o chat "Pergunta pro João"), em vídeos curtos e no Instagram.

## O projeto em uma frase

A Primeira Chave explica, sem juridiquês, como comprar o primeiro imóvel financiado. O João-de-barro constrói a própria casa barro por barro — como quem junta a entrada "de bico em bico".

## O que já existe (referência, não precisa seguir à risca)

- Rascunho do personagem em traço único: `src/components/brand/JoaoDeBarro.tsx` e o guia `/marca` do site.
- Silhueta pequena e o motor de voo no código (hero da home): `src/components/conteudo/Revoada.tsx`. Mostra o comportamento esperado: sai do ninho, voa em arco, pousa, bica o barro, volta e constrói o ninho; com o ninho pronto aparece a chave.
- Cores: tinta `#121418` (personagem, traço), marca-texto `#F4D23F` (barro/dinheiro, chave), planta `#C6D6E3` (ninho/casa), papel `#F2F3F1` (fundo), bochecha barro `#EEB194` (só no rosto).
- Tom: amigo que já passou por isso. Gentil, esperto, um pouco engraçado; nunca bobo.

## Entregas

### 1. Personagem refinado (estático, vetor)

- Model sheet: perfil, frente, 3/4, costas; proporções e construção.
- Duas versões: **detalhada** (≥ 120 px: rosto, bochecha, asa com penas) e **silhueta** (16–40 px: forma legível só pelo contorno, olho e bico).
- Humores nos olhos: gentil (padrão), feliz, curioso, pensativo, surpreso, triste, piscando, assustado.

### 2. Animações (arquivo Rive `.riv`, com fontes `.rev`)

| # | Animação | Duração | Loop |
|---|---|---|---|
| 1 | Pousado respirando (idle), com piscada aleatória | 2–3 s | sim |
| 2 | Decolar | ~0,4 s | não |
| 3 | Voo batendo asa | ~0,4 s por ciclo | sim |
| 4 | Planar | 1 s | sim |
| 5 | Pousar (freia de peito aberto, amortece) | ~0,4 s | não |
| 6 | Bicar e pegar o barro (2 bicadas) | ~1 s | não |
| 7 | Entregar o barro no ninho | ~0,6 s | não |
| 8 | Comemorar (pulinhos, asa erguida, chave no bico) | 1,5 s | sim |
| 9 | Falar/explicar (bico abrindo, gesto de asa) — para o chat | 1–2 s | sim |
| 10 | Pensando (olhar pro lado, "hmm") — para o chat enquanto carrega | 2 s | sim |
| 11 | Assustado (pulo pra trás, penas arrepiadas) — "renda estourou a faixa" | 0,8 s | não |
| 12 | Ninho sendo construído (0 → 100%) e porta/chave aparecendo | controlado por número | — |

Cada voo em duas versões de carga: **bico vazio** e **com barro** (bolinha amarela). Versão com **chave no bico** para comemorar.

### 3. State machine (Rive)

Entradas que o site vai controlar:

- `estado` (número): 0 pousado · 1 voando · 2 planando · 3 bicando · 4 entregando · 5 comemorando · 6 falando · 7 pensando · 8 assustado
- `carga` (número): 0 nada · 1 barro · 2 chave
- `humor` (número): mapeado para os humores acima
- `obra` (número 0–100): progresso do ninho
- gatilhos: `piscar`, `bicar`, `pousar`

O site cuida da rota (de onde para onde voa); o arquivo cuida do corpo. O pássaro precisa funcionar virado para os dois lados e inclinado até ±30° sem quebrar.

## Requisitos técnicos

- Rive, artboards separados para: pássaro detalhado, pássaro silhueta e ninho.
- Peso do `.riv` final: até 150 KB.
- Leitura a 20 px (silhueta) e a 200 px (detalhado).
- Funcionar em fundo claro (papel) e escuro (tinta) — cores via variáveis/tema do Rive se possível.
- Também exportar: GIF/MP4 de cada animação (para redes) e SVGs estáticos das poses.

## Referências de estilo

- Crumbl Cookies (personagem em traço único, simples e expressivo).
- Duolingo (Duo: personalidade e reações em micro-momentos).
- Headspace (movimento calmo, curvas suaves).
- Evitar: 3D, estilo "mascote de banco", realismo de pássaro.

## Prazo e etapas

1. Model sheet + silhueta (aprovação) — 1 semana
2. Animações 1–8 + ninho (uso na home) — 1 semana
3. Animações 9–11 + state machine completa (uso no chat) — 1 semana

Direitos: cessão total dos direitos patrimoniais do personagem e das animações para a Primeira Chave.
