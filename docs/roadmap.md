# Roadmap — Primeira Chave

Aposta: **lowticket no curto prazo** (caixa e validação em semanas) e **SEO no médio prazo** (tráfego orgânico em 3–9 meses).
Base da pesquisa: `docs/pesquisa/como-as-pessoas-buscam.md`.

## Já feito

- [x] Simulador guiado validado contra a Caixa, com "o segredo" (entrada zero) e simulador preço × avaliação
- [x] Nome e domínio: primeirachave.com.br
- [x] Direção visual A "Planta" + João-de-barro + explorações de logo (canvas)
- [x] Pesquisa de como as pessoas buscam
- [x] Modelos de contrato para baixar (`/modelos-de-contrato/`): compra e venda financiada e à vista, recibo de sinal, aluguel, distrato e declaração de primeiro imóvel, em Word e PDF, com notas por cláusula e prompt para preencher com IA

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
- [ ] Instagram @primeirachavebr com o avatar do João-de-barro

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

**d) Modelos de contrato: editor no navegador**
- [ ] Formulário com os campos de cada modelo (nomes, CPF, endereço, valores, datas) que preenche o modelo e gera o .docx e o PDF no próprio navegador, sem enviar nada a servidor. Esforço estimado: meio dia (3 a 5 h): os geradores de `src/lib/modelos/` já aceitam os valores. Falta o formulário por grupo, as máscaras de CPF, valor e data, o valor por extenso, a prévia ao vivo e o rascunho salvo no navegador.

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
- [ ] **Link da compra (acompanhar junto)** — ideia de 28/10/2026: qualquer pessoa gera um link da própria compra e a jornada fica viva nele (fase, checklist feito, números do simulador, documentos que faltam, próximos passos)
  - Sem conta nem senha: o link é a chave, como um documento compartilhado; recupera pelo e-mail. O convite é "guardar e compartilhar a sua compra", nunca "criar conta"
  - Gente junto desde o início: cônjuge, quem compõe renda, os pais que ajudam com a entrada. Todos abrem o mesmo link e veem o mesmo plano
  - Chamar ajuda depois: a pessoa convida um consultor (corretor, correspondente, advogado, despachante) para acompanhar a jornada inteira ou só um trecho, e escolhe o que ele vê
  - Reunir na hora: botão "chamar para conversar agora" abre uma conversa ao vivo (vídeo ou chat) com quem está no link, com a tela da compra aberta para todos
  - Liga com o que já existe: o Recado do João manda o e-mail da fase em que o link está; os consultores convidados viram a porta das Parcerias acima (receita por lead ou plano do consultor)
  - Cuidados: só o mínimo de dado pessoal (renda e documentos são sensíveis, LGPD); o dono do link decide quem entra e pode tirar o acesso; link longo e imprevisível, com prazo e PIN opcional; deixar claro quem é quem (o consultor convidado não é a Primeira Chave, e não somos banco nem correspondente)

## Ideias de mercado a avaliar

- **Lead qualificado vale dinheiro**: quem terminou o simulador + checklist é ouro para correspondente bancário e imobiliária.
- **Ferramentas atraem links**: calculadoras boas ganham backlinks de blogs e fóruns — melhor que post genérico.
- **"Taxas do mês"**: página/newsletter mensal com juros dos bancos — motivo para voltar e para o Google rastrear sempre.
- **Antes e depois**: anúncio comparando a explicação do banco com a da Primeira Chave.
- **PR digital (avaliar depois)**: virar fonte de jornalista com dado próprio — "m² pago (ITBI) × m² anunciado", "quanto precisa ganhar em cada capital", termômetro mensal do IVG-R — numa página `/dados/` com metodologia + release. Links de portal valem mais que meses de conteúdo.

### Microrrelatórios pagos ("pague para ver o resultado") — ideia de 28/10/2026

Referência: um site que mostra o processo judicial com as respostas travadas ("O que já aconteceu? Qual a situação atual? Próximos passos?") e libera o resumo por IA num Pix de R$ 9,90. Ele consome uma API de dados públicos e fica com a diferença entre o preço e o custo da consulta. O formato combina com a Primeira Chave: a pessoa já está ansiosa com uma decisão grande, o resultado parcial aparece de graça e o detalhe custa pouco.

O que o João poderia vender no nosso ecossistema (do mais encaixado para o menos):

| Ideia | O que a pessoa recebe | Fonte de dados | Por que encaixa |
|---|---|---|---|
| **Raio-X do imóvel de leilão** | Resumo do processo de onde o imóvel saiu: fase, ocupação, dívidas, recursos pendentes, riscos de anulação | Processo pelo número (DataJud, a API pública do CNJ) + edital | É o print de referência aplicado ao leilão. Bruno arremata e conhece os riscos; já temos o guia de leilão Caixa |
| **Avaliação provável do imóvel** | Faixa em que o banco deve avaliar, com vendas reais da região e o efeito na entrada ("o segredo") | ITBI pago (já usamos em SP), dados de anúncio | Liga direto ao simulador: avaliação ≥ preço ÷ 0,8 zera a entrada |
| **Raio-X da matrícula** | A pessoa sobe a certidão de matrícula; a IA traduz ônus, penhoras, usufruto e o que travaria o financiamento | PDF que a própria pessoa envia (sem API) | Custo quase zero; resolve a dúvida nº 1 antes do sinal |
| **Checagem do vendedor** | Processos em andamento contra o vendedor que podem ameaçar a venda (fraude contra credores) | APIs de tribunais/consulta por nome (avaliar fornecedor e custo) | Complementa o checklist de documentos; alto valor percebido |
| **Plano até a chave em PDF** | O resultado do simulador vira um plano mês a mês (quanto guardar, o que regularizar, quando pedir o crédito) | O nosso motor | É o lowtick mais simples: não depende de terceiro |

Modelo: R$ 9,90 a R$ 29,90 por relatório, Pix único, prévia grátis com os tópicos travados (como no print). Margem = preço − custo da API/IA − taxa do Pix. Os pedidos e os pagamentos entram no Hub como os leads (channel próprio), o que também mede a conversão.

Cuidados antes de lançar (validar com o advogado e o contador, ver `docs/pesquisa/amparo-tecnico-juridico-caixa.md`):
- Resumo de processo não pode virar consultoria jurídica: aviso "não substitui advogado nem a certidão/autos", sem recomendação de "compre/não compre".
- Consulta por nome de pessoa (vendedor) é tratamento de dado pessoal: base legal da LGPD, finalidade clara e não guardar além do necessário.
- Venda online exige CNPJ, endereço e contato visíveis (Decreto 7.962/2013), política de reembolso e nota fiscal.
- Conferir custo e termos de uso de cada API (DataJud é gratuita, mas tem limite e regras de uso; fornecedores de consulta por nome são pagos).

## Regras do jogo

- Nunca parecer site oficial da Caixa/governo; sempre "como funciona", nunca "faça aqui".
- Todo número vem do motor ou de fonte citada, com data de atualização.
- Uma intenção por página; título com a frase que a pessoa digita.
- Medir no Search Console a cada 2 semanas e reforçar o que começa a ranquear.
