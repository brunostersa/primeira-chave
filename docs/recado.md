# Recado do João (newsletter)

Um e-mail por semana (toda quinta, 8h) + uma sequência curta pela fase da compra. Coletamos **só o e-mail e a fase**; telefone fica para quando a pessoa pedir para falar com um parceiro (com consentimento à parte). Nada sai sem o ok do Bruno.

## Como funciona

```
site (primeirachave.com.br)                    Hub (customerhub.com.br)                       Resend
───────────────────────────                    ────────────────────────                       ──────
/recado/feed.json  ← conteúdo ───────────────→ lê o feed (5 min de cache)
formulário (simulador, rodapé, /recado/) ────→ POST /api/newsletter/inscrever
                                               ├ newsletter_subscribers
                                               └ boas-vindas: sai na hora se o modelo já foi aprovado ──→ envia
cron diário 8h ──────────────────────────────→ /api/cron/newsletter
                                               ├ sequências que venceram (dias 0, 3, 7)
                                               ├ rascunho do recado (3 dias antes da quinta)
                                               └ envia o que está "agendado" ───────────────────────────→ envia
painel /leads/envios ────────────────────────→ aprovar · ver · teste p/ mim · enviar agora · cancelar
/recado/sair/?t=  e  botão "cancelar inscrição" do Gmail → /api/newsletter/sair
                                               /api/newsletter/webhook ←── entregue, aberto, clicado, devolvido, spam
```

- **O texto mora no site**: `src/lib/recado/sequencias.ts` (as 5 fases e os 3 e-mails de cada) e `src/lib/recado/feed.ts` (número da semana, Duvide, atalhos). O teste `recado.test.ts` falha se um link apontar para página não publicada ou se um assunto não couber no celular.
- **O envio mora no Hub** (`customerhub/siteagencia/lib/newsletter/`): `fila.ts` (planejar, aprovar, disparar), `modelos.ts` (HTML do e-mail), `resend.ts` (API e assinatura do webhook).
- **Aprovação**: o recado de cada semana pede ok. Na sequência, aprovar um e-mail aprova **aquele texto** (os próximos inscritos recebem sem pedir de novo). Mudou o texto em `sequencias.ts`? A versão muda e volta a pedir ok.
- **O recado da semana se monta sozinho** a partir do feed: o número roda pela semana do ano; Duvide e atalho pegam o que ainda não saiu. O "seu próximo passo" muda conforme a fase de quem recebe.
- Cada pessoa recebe o próprio e-mail (link de sair pessoal), com `List-Unsubscribe` de um clique (exigência do Gmail/Yahoo) e UTM `utm_source=recado` em todos os links.
- Quem tem e-mail devolvido de vez ou marca como spam sai da lista sozinho (webhook).

## A régua de boas-vindas (10 e-mails)

Quem se inscreve recebe duas trilhas ao mesmo tempo, além do recado de quinta:

| # | Quando | E-mail | Onde está o texto |
|---|---|---|---|
| 1 | na hora | boas-vindas da fase | `FASES[].sequencia` dia 0 |
| 2 | dia 1, se não clicou no simulador | "Você já sabe o seu número?" | `TRILHA` lembrete-simulador |
| 3 | dia 3 | 2º da fase | `FASES[].sequencia` dia 3 |
| 4 | dia 5 | a armadilha da fase (carta do Duvide) | `FASES[].sequencia` dia 5 |
| 5 | dia 7 | 3º da fase | `FASES[].sequencia` dia 7 |
| 6 | 2 dias depois de clicar no simulador | "Tenho o meu número. E agora?" | `TRILHA` depois-do-simulador |
| 7 | dia 10 (menos juntando e vender) | os custos da compra | `TRILHA` custos |
| 8 | dia 14 | "Em que fase você está agora?" (botões que levam a `/recado/fase/`) | `TRILHA` trocar-fase |
| 9 | 4 e-mails seguidos sem clique, depois de 21 dias | "Ainda quer receber?"; sem clique em 7 dias, sai da lista | `TRILHA` sumiu |
| 10 | dia 30 | um mês de recado | `TRILHA` um-mes |

- **Regras do Hub:** no máximo um e-mail por dia por pessoa e nada além das boas-vindas no dia do recado. O que não cabe hoje sai no dia seguinte.
- **Cliques:** todo link passa por `customerhub.com.br/api/newsletter/ir`, que grava o clique e redireciona (só para o site ou um convite do feed). Clique nos primeiros 2 minutos é de antivírus e é ignorado. O click tracking da Resend fica desligado.
- **Trocar de fase:** cancela o que faltava da fase antiga e recomeça a nova pelo e-mail do dia 3 (as boas-vindas não se repetem).
- **Convites do fim (CTAs):** o catálogo fica em `src/lib/recado/ctas.ts`. Cada e-mail declara `cta: "<id>"` (ou `"proximo"`, o próximo passo da fase). Mudou o texto ou o destino de um convite? Mude só lá. O teste garante que o convite existe e não leva ao mesmo lugar que o botão do e-mail.
- **Aprovação:** a versão de cada e-mail sai só do texto (assunto, prévia, parágrafos e botão). Trocar o convite do fim ou o gatilho não pede novo ok. E-mail novo de fase entra no fim do array, para não mudar o índice (e a aprovação) dos que já existem.

## Onde a pessoa se inscreve

- **Rodapé** (todas as páginas, menos as do Recado): o cartão compacto com o João carteiro e o bando na borda.
- **/recado/**: a mesma linha do rodapé, logo abaixo do título, e um recado de exemplo montado com o feed (o que se vê é o que chega).
- **Convite no fim de um cálculo** (`src/lib/recado/convite.ts` + `<ConviteRecado />` no layout): uma folha que sobe de baixo no celular e um cartão no canto no desktop. Não escurece a página nem prende o foco.
  - Simulador: quando o fim do resultado entra na tela (`<ConvidarAoVer />`, com a fase e o perfil já preenchidos).
  - Calculadoras e mapas: depois de mexer em 2 campos e parar por 5 segundos (`<GatilhoUso />` em `calculos.tsx`).
  - Modelos de contrato: logo depois de clicar em baixar (`<GatilhoUso modo="baixou" />`).
  - Uma vez por visita; "Agora não" pausa por 14 dias; quem se inscreveu não vê mais. Nunca nas páginas do Recado e nunca com a pessoa digitando.

## Para ligar (uma vez)

1. **Banco**: rodar `customerhub/siteagencia/supabase/migrations/20261028_newsletter.sql` no SQL Editor do Supabase (projeto `cuorqtrhrvnpyqzocidf`). Cria as tabelas e liga a newsletter na config da Primeira Chave.
2. **Domínio na Resend**: adicionar `primeirachave.com.br` em Resend → Domains e cadastrar no DNS os registros que ela mostrar (DKIM, SPF e MX do subdomínio `send`). Ligar *open tracking* e *click tracking* no domínio.
3. **Webhook na Resend**: endpoint `https://customerhub.com.br/api/newsletter/webhook`, eventos `email.sent`, `delivered`, `opened`, `clicked`, `bounced`, `complained`, `delivery_delayed`. Copiar o *signing secret*.
4. **Vercel (Hub)**: `RESEND_WEBHOOK_SECRET=<signing secret>` e, depois do domínio verificado, `NEWSLETTER_DOMINIO_OK=1`. O cron `/api/cron/newsletter` já está no `vercel.json`.
5. **Publicar** o Hub e o site.
6. **Aprovar os modelos** em `/leads/envios`: na primeira inscrição de cada fase, o e-mail aparece em "Esperando o seu ok". Use **Teste p/ mim** antes.

Plano da Resend: o grátis manda até 100 e-mails por dia. Com mais de ~100 inscritos, o recado de quinta passa disso: assinar o Pro antes.

## Pendências

- Razão social e CNPJ no rodapé dos e-mails e em `/privacidade/` (hoje: "um projeto da CustomerHub").
- Telefone/WhatsApp só no pedido de contato com parceiro (CCA), com consentimento separado para compartilhar.
- Editor visual: fora de escopo por enquanto (o texto é código, revisado antes de subir).
