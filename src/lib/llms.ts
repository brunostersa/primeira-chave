import { ARVORE, type No } from "./conteudo/arvore";
import { CARTAS, VEREDITOS } from "./conteudo/duvide";
import { doHub, no } from "./conteudo/links";
import { PERSONAS } from "./conteudo/personas";
import { GLOSSARIO_TEXTOS, HUBS_TEXTOS, TEXTOS } from "./conteudo/textos";
import { PARAMS_ATUALIZADOS_EM } from "./financiamento/params";
import { secoesMenu } from "./navegacao";
import { SITE } from "./site-config";

/**
 * llms.txt (llmstxt.org): o mapa do site para assistentes de IA, em Markdown simples.
 * llms-full.txt: a resposta curta e as perguntas de cada página, para citarem certo.
 * Tudo sai da árvore e dos textos: publicou, entrou.
 */

/** Texto rico → texto puro: tira o negrito e deixa só o rótulo dos links. */
export const puro = (t: string) => t.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((?:#[\w-]+|g:[\w-]+|https?:\/\/[^\s)]+)\)/g, "$1");

const url = (slug: string) => `${SITE.url}${slug}`;
const publicado = (n: No) => n.status === "publicado";
const linha = (n: No) => `- [${n.titulo}](${url(n.slug)}): ${n.resumo}`;

export function llmsTxt() {
  const [comprar, ferramentas, vender, ajuda] = secoesMenu();
  const fases = comprar.grupos!;
  const pub = (ids: string[]) => ids.map(no).filter(publicado);
  const blocos: string[] = [
    `# ${SITE.nome}`,
    `> ${SITE.descricao}`,
    [
      `Site educativo e independente sobre a compra do primeiro imóvel no Brasil, em português claro. Não é banco nem correspondente bancário e não aprova crédito.`,
      `As regras de financiamento (faixas do Minha Casa Minha Vida, juros, prazo, 30% da renda, 80% da avaliação) foram conferidas no simulador oficial da Caixa (${PARAMS_ATUALIZADOS_EM}) e são testadas a cada mudança.`,
      `Regra central: o banco empresta até 80% do valor de avaliação do imóvel, sem passar do preço; se a avaliação vier 25% ou mais acima do preço, a entrada pode zerar (ITBI e cartório continuam por conta do comprador). Em imóveis retomados pela Caixa, vale o menor valor entre preço e avaliação.`,
      `Dados de mercado com fonte e data: IVG-R (Banco Central), FipeZAP (preço de anúncio) e ITBI pago das prefeituras de São Paulo, Recife e Porto Alegre (preço de compra real).`,
    ].join("\n\n"),
    `## Ferramentas\n\n${ferramentas.itens.filter((i) => i.href).map((i) => `- [${i.titulo}](${url(i.href!)}): ${i.resumo ?? ""}`).join("\n")}`,
    `## A compra, fase por fase\n\n${fases
      .map((f) => {
        const todas = ARVORE.filter((n) => publicado(n) && f.itens.some((i) => i.id === n.id));
        return `### ${f.rotulo}: ${f.pergunta}\n\n${todas.map(linha).join("\n")}`;
      })
      .join("\n\n")}`,
    `## Por assunto\n\n${pub(["financiamento-imobiliario", "minha-casa-minha-vida", "mcmv-faixas", "comprar", "guias"]).map(linha).join("\n")}`,
    `## Leilão e imóveis da Caixa\n\n${[no("leilao-caixa"), ...doHub("leilao").filter((n) => n.id !== "leilao-caixa")].filter(publicado).map(linha).join("\n")}`,
    `## Vender\n\n${[no("vender"), ...vender.itens.map((i) => no(i.id))].filter(publicado).map(linha).join("\n")}`,
    `## Atalhos para serviços oficiais\n\n${ajuda.itens.map((i) => no(i.id)).filter(publicado).map(linha).join("\n")}`,
    `## Duvide: armadilhas e segredos\n\n- [Duvide](${url("/duvide/")}): as frases que todo mundo repete na compra e venda de imóvel, com o veredito.\n${CARTAS.map((c) => `- [${c.pergunta}](${url(`/duvide/${c.id}/`)}): ${VEREDITOS[c.veredito].rotulo}. ${c.resumo}`).join("\n")}`,
    `## Para profissionais\n\n- [Quem é quem na fila do pão?](${url("/para/")}): o que o site entrega para cada profissional do mercado.\n${PERSONAS.map((p) => `- [${p.quem}](${url(`/para/${p.id}/`)}): ${p.papel}`).join("\n")}`,
    `## Optional\n\n- [Glossário](${url("/glossario/")}): cada termo do financiamento em uma frase.\n- [Mapa do site](${url("/mapa/")}): todas as páginas, conectadas.\n- [Sobre](${url("/sobre/")}): quem faz e como trabalhamos.\n- [Texto completo para IA](${url("/llms-full.txt")}): a resposta curta e as perguntas frequentes de cada página.`,
  ];
  return blocos.join("\n\n") + "\n";
}

export function llmsFullTxt() {
  const partes: string[] = [`# ${SITE.nome}: respostas de cada página`, `> ${SITE.descricao} Regras conferidas no simulador da Caixa em ${PARAMS_ATUALIZADOS_EM}. Conteúdo educativo: confirme o seu caso com o banco.`];
  for (const n of ARVORE.filter((x) => publicado(x) && x.tipo !== "glossario")) {
    const t = TEXTOS[n.id];
    const h = HUBS_TEXTOS[n.id];
    const abertura = t?.resposta ?? h?.intro;
    if (!abertura) continue;
    const faq = t?.faq ?? h?.faq ?? [];
    partes.push(
      [`## ${t?.h1 ?? n.titulo}`, `URL: ${url(n.slug)}`, puro(abertura), ...(t?.secoes ?? h?.secoes ?? []).map((s) => `- ${s.titulo}`), ...faq.map((f) => `P: ${f.q}\nR: ${f.a}`)].join("\n\n"),
    );
  }
  partes.push(`## Duvide: armadilhas e segredos\n\n${CARTAS.map((c) => `### ${c.pergunta}\n\nURL: ${url(`/duvide/${c.id}/`)}\n\n${VEREDITOS[c.veredito].rotulo}. ${c.resumo}\n\n${c.explicacao.map(puro).join("\n\n")}`).join("\n\n")}`);
  partes.push(
    `## Glossário\n\n${ARVORE.filter((x) => publicado(x) && x.tipo === "glossario")
      .map((x) => `- ${x.titulo} (${url(x.slug)}): ${puro(GLOSSARIO_TEXTOS[x.id.replace(/^g-/, "")]?.explicacao[0] ?? x.resumo)}`)
      .join("\n")}`,
  );
  return partes.join("\n\n") + "\n";
}
