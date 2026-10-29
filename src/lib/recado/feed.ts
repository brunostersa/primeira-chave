import { ARVORE } from "@/lib/conteudo/arvore";
import { CARTAS, VEREDITOS } from "@/lib/conteudo/duvide";
import { no } from "@/lib/conteudo/links";
import { PARAMS, PARAMS_ATUALIZADOS_EM } from "@/lib/financiamento/params";
import { brl, pct } from "@/lib/format";
import { SITE } from "@/lib/site-config";
import { FASES } from "./sequencias";

/**
 * O feed do Recado do João (/recado/feed.json). É o contrato com o Hub da CustomerHub
 * (customerhub/siteagencia/lib/newsletter/tipos.ts): o Hub não conhece a árvore, só este JSON.
 * Mudou o formato? Suba `versao` e ajuste o Hub junto.
 */

export type Link = { titulo: string; url: string };

const url = (slug: string) => `${SITE.url}${slug}`;

/** Link para um nó da árvore. Falha no build se o nó não estiver publicado (nada de link quebrado no e-mail). */
export function linkDe(id: string): Link {
  const n = no(id);
  if (n.status !== "publicado") throw new Error(`Recado: "${id}" ainda não está publicado`);
  return { titulo: n.titulo, url: url(n.slug) };
}

/** Juros nominais ao ano → efetivos (o número que o banco mostra). */
const efetivo = (nominal: number) => (Math.pow(1 + nominal / 1200, 12) - 1) * 100;

/** O "número da semana": uma regra do motor, com a fonte em params.ts. Rodam em ordem, uma por semana. */
function numeros() {
  const f3 = PARAMS.faixas[2];
  const f4 = PARAMS.faixas[3];
  return [
    { id: "comprometimento", valor: `${PARAMS.comp}%`, texto: "é quanto da sua renda bruta a parcela pode ocupar.", link: linkDe("quanto-preciso-ganhar") },
    { id: "cota", valor: `${PARAMS.sbpeLtvUsado}%`, texto: "da avaliação do banco é o máximo que ele empresta, sem passar do preço.", link: linkDe("sem-entrada-casa") },
    {
      id: "sbpe",
      valor: `${pct(efetivo(PARAMS.sbpeJuros))} ao ano`,
      texto: `são os juros de mercado (SBPE) que a Caixa mostra hoje, para quem não entra no Minha Casa Minha Vida.`,
      link: linkDe("como-financiar-casa-caixa"),
    },
    { id: "mcmv-f3", valor: brl(f3.rendaAte), texto: `é a renda máxima da faixa 3 do Minha Casa Minha Vida, para imóvel de até ${brl(f3.tetoImovel)}.`, link: linkDe("mcmv-faixas") },
    { id: "mcmv-f4", valor: brl(f4.rendaAte), texto: `é a renda máxima da faixa 4, que financia imóvel de até ${brl(f4.tetoImovel)}.`, link: linkDe("mcmv-faixas") },
    { id: "itbi", valor: `${PARAMS.itbi}%`, texto: "do preço é perto do que você paga de ITBI na maioria das cidades. Sai do seu bolso, à vista.", link: linkDe("calculadora-itbi") },
    { id: "prazo", valor: `${PARAMS.prazoMax / 12} anos`, texto: `é o prazo máximo, desde que a sua idade mais o prazo não passe de ${Math.floor(PARAMS.idadeLimite)} anos e meio.`, link: linkDe("simulador") },
  ];
}

export function feedRecado() {
  const publicadas = ARVORE.filter((n) => n.status === "publicado");
  return {
    versao: 1,
    geradoEm: new Date().toISOString(),
    nome: "Recado do João",
    site: SITE.url,
    regrasAtualizadasEm: PARAMS_ATUALIZADOS_EM,
    fases: FASES.map((f) => ({
      id: f.id,
      rotulo: f.rotulo,
      pergunta: f.pergunta,
      proximo: linkDe(f.proximo),
      sequencia: f.sequencia.map((p) => ({ ...p, link: { ...linkDe(p.link), botao: p.botao } })),
    })),
    numeros: numeros(),
    duvide: CARTAS.map((c) => ({
      id: c.id,
      veredito: c.veredito,
      rotulo: VEREDITOS[c.veredito].rotulo,
      frase: c.frase,
      pergunta: c.pergunta,
      resumo: c.resumo,
      url: url(`/duvide/${c.id}/`),
    })),
    // O "atalho da semana" sai daqui: atalhos e guias mais buscados primeiro.
    paginas: publicadas
      .filter((n) => ["atalho", "guia", "ferramenta"].includes(n.tipo))
      .sort((a, b) => a.prioridade - b.prioridade)
      .map((n) => ({ id: n.id, titulo: n.titulo, resumo: n.resumo, url: url(n.slug), tipo: n.tipo, etapa: n.etapa, prioridade: n.prioridade })),
  };
}

export type FeedRecado = ReturnType<typeof feedRecado>;
