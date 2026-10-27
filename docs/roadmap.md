# Roadmap — Primeira Chave

Aposta: **lowticket no curto prazo** (caixa e validação em semanas) e **SEO no médio prazo** (tráfego orgânico em 3–9 meses).
Base da pesquisa: `docs/pesquisa/como-as-pessoas-buscam.md`.

## Já feito

- [x] Simulador guiado validado contra a Caixa, com "o segredo" (entrada zero) e simulador preço × avaliação
- [x] Nome e domínio: primeirachave.com.br
- [x] Direção visual A "Planta" + João-de-barro + explorações de logo (canvas)
- [x] Pesquisa de como as pessoas buscam

## Os 4 pilares do site

| Pilar | Quem | Páginas âncora |
|---|---|---|
| **Comprar** | primeiro comprador | simulador, sem entrada, avaliação, documentos, prazos, financiamento negado |
| **Vender** | dono de usado | vender financiado, documentos, imposto/ganho de capital, contrato modelo, quanto vale |
| **Atalhos** | todos | o link certo + passo a passo (FGTS, Registrato, certidões, boleto Caixa, ITBI, cartórios) |
| **Ferramentas** | todos | simulador, renda × valor, ITBI, ganho de capital, FGTS na amortização |

---

## Fase 0 — Fundação (semanas 1–2)

- [x] Sistema da marca no código + guia vivo `/marca` (logo, assinatura, ícone, mascote, cores, tipografia, componentes, voz)
- [ ] Ilustrador refinar o João-de-barro
- [ ] Conferir parâmetros do simulador (juros SBPE/MCMV, tetos, ITBI Goiânia) — `regras-financiamento.md`
- [x] App Next 16 (padrão Busta): home + simulador na direção Planta, motor em TypeScript com testes
- [ ] Publicar no domínio (Vercel ou Hostinger) — decidir hospedagem
- [x] SEO técnico base: metadata, canonical, sitemap, robots, JSON-LD (Organization, WebSite, WebApplication, FAQPage)
- [ ] Favicon/ícone de app e imagem de compartilhamento (OG) com o João-de-barro
- [ ] Simulador: gráfico SAC × PRICE e parâmetros editáveis (estavam no protótipo, ainda não portados)
- [ ] Medição: GA4 + Search Console ligados no hub de relatórios do Bruno; evento de "simulação concluída" e "lead"
- [ ] Captura de lead no resultado do simulador (e-mail/WhatsApp para receber o plano)
- [ ] Instagram @primeirachave com o avatar do João-de-barro

## Fase 1 — Lowtickets (semanas 2–6) · curto prazo

Dois produtos, mesmo formato: página de vendas + PDF/área simples + checklist.

1. **Primeira Chave — Do zero à chave** (comprador) · R$ 27–47
   - Trilha das 7 etapas, checklist de documentos, o segredo da entrada zero, como pedir avaliação, o que fazer se negarem
2. **Vender sem Susto** (vendedor de usado) · R$ 37–67
   - Documentos, imóvel financiado, imposto/ganho de capital (isenções), preço de venda × avaliação do banco do comprador, modelo de contrato

- [ ] Escolher checkout (Hotmart/Kiwify/Mercado Pago) e entrega
- [ ] Páginas de venda `/primeira-chave` e `/vender`
- [ ] Tráfego pago pequeno (R$ 20–50/dia) com o post "o segredo" e "quanto preciso ganhar" → simulador → oferta
- [ ] Meta: primeiras 30 vendas validam preço e mensagem

## Fase 2 — SEO, primeira onda (mês 1–3) · médio prazo

> Prioridade definida em `docs/pesquisa/mapa-de-conteudo.md` (Google Trends 5 anos + autocomplete).
> Revisado com volumes reais do Google Ads (`docs/pesquisa/volumes-google-ads-2026-10.tsv`). P1, nesta ordem: **simulador** (~1 mi buscas/mês: simulador caixa, simulação financiamento caixa…) · simulador MCMV · **atalhos** (registrato 823 mil, FGTS, boleto, matrícula) · **leilão/imóveis Caixa** (~615 mil) · Minha Casa Minha Vida · sem entrada (volume menor, conversão alta).
> As programáticas "quanto preciso ganhar" caem para P3 (20–90 buscas cada).

**a) Páginas programáticas (o maior ativo)** — geradas pelo motor do simulador:
- [ ] `/quanto-preciso-ganhar-para-financiar/imovel-de-300-mil` … de 150 mil a 1 milhão (≈20 páginas), cada uma com renda mínima, entrada, parcela SAC/PRICE, MCMV ou SBPE, e o caminho sem entrada
- [ ] Inverso: `/quanto-consigo-financiar/renda-de-5-mil` (≈15 páginas)

**b) Guias pilar (comprador)**
- [ ] Como financiar uma casa pela Caixa (passo a passo)
- [ ] Como financiar sem entrada (o segredo da avaliação)
- [ ] Avaliação do imóvel: quem faz, quem paga, e se vier abaixo/acima
- [ ] Documentos para financiamento (Caixa / MCMV / usado) — checklist interativo
- [ ] Quanto tempo demora o financiamento
- [ ] Financiamento negado: por quê, o que fazer, quando tentar de novo
- [ ] Primeiro imóvel tem desconto no registro e no ITBI?
- [ ] SAC ou PRICE · Usar FGTS para amortizar

**c) Atalhos (links difíceis)** — curtos, um por intenção, ótimos para ranquear rápido:
- [ ] Consultar saldo do FGTS · Registrato (consultar CPF no Banco Central) · Simulador da Caixa (e como ler o resultado) · 2ª via do boleto Habitação Caixa · Certidão de matrícula online · Ônus × matrícula × inteiro teor (é a mesma coisa?)

## Fase 3 — Vendedor + local (mês 3–6)

- [ ] Guias do vendedor: vender imóvel financiado · documentos para vender · imposto e ganho de capital (isenção até R$ 440 mil, imóvel único, reinvestimento) · vender sem corretor · casos (usufruto, inquilino, IPTU atrasado)
- [ ] Modelo de contrato de compra e venda grátis (isca de lead) — revisado por advogado
- [ ] Ferramentas: calculadora de ITBI, calculadora de ganho de capital, "quanto vale meu imóvel" (faixa por m² + aviso)
- [ ] **SEO local Goiânia e região**: `/goiania/itbi`, `/goiania/cartorios-de-registro`, `/aparecida-de-goiania/…`, IPTU 2ª via, certidões por cidade — depois replicar para outras capitais
- [ ] Comparativo de bancos para imóvel usado (neutro)
- [ ] Glossário visual

## Fase 4 — Escala e novos negócios (mês 6–12)

- [ ] Cofre de documentos (checklist que guarda e confere)
- [ ] `/imoveis` — imóveis reformados do Bruno, com "avaliação acima do preço" quando houver
- [ ] Parcerias: correspondentes Caixa recebem leads qualificados (simulação + documentos em ordem) — possível receita por lead
- [ ] "Selo Primeira Chave" para imóveis e parceiros
- [ ] Vídeos curtos com o João-de-barro reaproveitando os guias
- [ ] **"Pergunta pro João"**: tela de conversa que responde qualquer dúvida do caminho até a chave, com o João-de-barro como personagem principal
  - Responde só com base no nosso core: guias, Duvide, personas, glossário e motor do simulador (o mesmo conteúdo do `llms-full.txt`). Quando o core não cobre, diz que não sabe e aponta o guia ou o profissional certo
  - Tom próprio da marca (`docs/marca.md`), linguagem fácil, frases curtas, sem juridiquês
  - Toda resposta vem com uma ilustração: pose/humor do João-de-barro conforme o assunto (assustado na faixa estourada, piscando no segredo…) e, quando houver, o infográfico da página de origem
  - Cita a fonte: link do guia usado na resposta, para continuar lendo
  - Números sempre do motor (renda, parcela, faixa MCMV), nunca inventados pelo modelo
  - Guardrails: nunca se passar por Caixa/banco, nada de "preço por fora" ou atalho fora da regra, sem aconselhamento jurídico/financeiro individual; ao fim, convite para simular ou falar com um parceiro (gancho de lead)
  - Técnico: o site é estático, então precisa de um backend pequeno (função serverless) chamando a API do Claude com o conteúdo como contexto; limite de uso por pessoa e registro das perguntas para virar pauta de SEO

## Ideias de mercado a avaliar

- **Lead qualificado vale dinheiro**: quem terminou o simulador + checklist é ouro para correspondente bancário e imobiliária.
- **Ferramentas atraem links**: calculadoras boas ganham backlinks de blogs e fóruns — melhor que post genérico.
- **"Taxas do mês"**: página/newsletter mensal com juros dos bancos — motivo para voltar e para o Google rastrear sempre.
- **Antes e depois**: anúncio comparando a explicação do banco com a da Primeira Chave.
- **PR digital (avaliar depois)**: virar fonte de jornalista com dado próprio — "m² pago (ITBI) × m² anunciado", "quanto precisa ganhar em cada capital", termômetro mensal do IVG-R — numa página `/dados/` com metodologia + release. Links de portal valem mais que meses de conteúdo.

## Regras do jogo

- Nunca parecer site oficial da Caixa/governo; sempre "como funciona", nunca "faça aqui".
- Todo número vem do motor ou de fonte citada, com data de atualização.
- Uma intenção por página; título com a frase que a pessoa digita.
- Medir no Search Console a cada 2 semanas e reforçar o que começa a ranquear.
