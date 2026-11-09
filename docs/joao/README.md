# João, o agente da Primeira Chave

Roadmap e decisões: https://claude.ai/artifact/Vn3S1DSXYMkYzHYbWyk28E

```
/joao/ (site estático)                    Hub (customerhub.com.br)                 Anthropic
conversa + Meu plano      ── POST ──→  /api/joao: limite, busca, conferência ─→ claude-sonnet-5-5
motor no navegador           ←─ pendentes ┘
/joao/conhecimento.json ─────── lido a cada 5 min pelo Hub
link da compra ─────────────── POST ──→   /api/joao/compra → joao_compras
                                          lacunas → joao_lacunas → /leads/joao
```

- **Conhecimento:** `src/lib/joao/conhecimento.ts`. Publicou, entrou. O teste falha se uma página publicada ficar de fora.
- **Números:** só do motor, pela ferramenta `calcular_plano` (`src/lib/joao/estado.ts`). A conferência do Hub (`lib/joao/conferir.ts`) recusa número que não veio do motor, dos trechos ou da pessoa.
- **Jornada:** `src/lib/joao/jornada.ts`. Só educa, organiza e acompanha: quem marca é a pessoa, e cada etapa diz quem confirma.
- **Link:** o token fica depois do `#`, e o banco guarda só o hash.
- **Teste sem modelo:** com `JOAO_SIMULADO=1`, fora de produção, o Hub responde com o primeiro trecho achado.
- **Perguntas-teste:** `docs/joao/perguntas-teste.json`. Rodar antes de mudar prompt, modelo ou regra: `node scripts/joao/teste.mjs` no Hub, que gasta API.

## Para ligar

1. Revisar e aprovar a página de privacidade.
2. Rodar `supabase/migrations/20261105_joao.sql` no Supabase do Hub.
3. Criar `ANTHROPIC_API_KEY` no Hub, com limite de gasto no painel da Anthropic.
4. Conferir se `https://primeirachave.com.br` está nas origens do cliente no Hub.
5. Rodar as perguntas-teste.
