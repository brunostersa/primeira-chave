import { ARVORE, type No } from "@/lib/conteudo/arvore";
import { CARTAS, VEREDITOS } from "@/lib/conteudo/duvide";
import { GLOSSARIO_TEXTOS, HUBS_TEXTOS, TEXTOS } from "@/lib/conteudo/textos";
import type { Bloco } from "@/lib/conteudo/tipos";
import { PARAMS_ATUALIZADOS_EM } from "@/lib/financiamento/params";
import { puro } from "@/lib/llms";
import { MODELOS } from "@/lib/modelos/modelos";
import { SITE } from "@/lib/site-config";

/**
 * O conhecimento do João: as páginas publicadas em trechos, para o Hub buscar e citar.
 * Publicou, entrou. Imóveis ficam de fora: por enquanto o João não sugere imóvel.
 * Números não moram aqui como verdade: quem responde número é o motor.
 */
export type Trecho = {
  id: string;
  pagina: string;
  titulo: string;
  secao: string;
  url: string;
  etapa: string | null;
  texto: string;
  atualizadoEm?: string;
};

function textoDoBloco(b: Bloco): string {
  if ("p" in b) return puro(b.p);
  if ("lista" in b) return b.lista.map((i) => `- ${puro(i)}`).join("\n");
  if ("passos" in b) return b.passos.map((p, i) => `${i + 1}. ${p.titulo}: ${puro(p.texto)}`).join("\n");
  if ("aviso" in b) return `${b.aviso.titulo}: ${puro(b.aviso.texto)}`;
  if ("tabela" in b) return [b.tabela.cabecalho.join(" | "), ...b.tabela.linhas.map((l) => l.map(puro).join(" | "))].join("\n");
  if ("figura" in b) return b.figura.legenda ? `${b.figura.alt} ${puro(b.figura.legenda)}` : b.figura.alt;
  return "";
}

const textoDosBlocos = (blocos: Bloco[]) => blocos.map(textoDoBloco).filter(Boolean).join("\n\n");

function trechosDaPagina(n: No): Trecho[] {
  const base = { pagina: n.id, titulo: n.titulo, url: `${SITE.url}${n.slug}`, etapa: n.etapa };
  const trecho = (parte: string, secao: string, texto: string): Trecho => ({ ...base, id: `${n.id}#${parte}`, secao, texto });
  const texto = TEXTOS[n.id] ?? HUBS_TEXTOS[n.id];
  const glossario = n.tipo === "glossario" ? GLOSSARIO_TEXTOS[n.id.replace(/^g-/, "")] : undefined;
  if (glossario) {
    const partes = [...glossario.explicacao, glossario.exemplo, glossario.cuidado].filter((p): p is string => !!p);
    return [trecho("termo", n.titulo, partes.map(puro).join("\n\n"))];
  }
  if (!texto) return [];
  const abertura = TEXTOS[n.id]?.resposta ?? HUBS_TEXTOS[n.id].intro;
  const secoes = (texto.secoes ?? [])
    .map((s, i) => trecho(`s${i + 1}`, s.titulo, textoDosBlocos(s.blocos)))
    .filter((t) => t.texto);
  const faq = texto.faq?.length ? [trecho("faq", "Perguntas frequentes", texto.faq.map((f) => `P: ${f.q}\nR: ${f.a}`).join("\n\n"))] : [];
  return [trecho("resposta", "Resposta curta", puro(abertura)), ...secoes, ...faq];
}

function trechosDoDuvide(): Trecho[] {
  return CARTAS.map((c) => ({
    id: `duvide-${c.id}#carta`,
    pagina: `duvide-${c.id}`,
    titulo: c.pergunta,
    secao: VEREDITOS[c.veredito].rotulo,
    url: `${SITE.url}/duvide/${c.id}/`,
    etapa: null,
    texto: [c.resumo, ...c.explicacao.map(puro), ...c.fazer.map((f) => `- ${puro(f)}`)].join("\n\n"),
  }));
}

function trechosDosModelos(): Trecho[] {
  const nos = new Map(ARVORE.map((n) => [n.id, n]));
  return MODELOS.filter((m) => nos.get(m.id)?.status === "publicado").map((m) => {
    const n = nos.get(m.id)!;
    return {
      id: `${m.id}#uso`,
      pagina: m.id,
      titulo: n.titulo,
      secao: "Quando usar e o que conferir",
      url: `${SITE.url}${n.slug}`,
      etapa: n.etapa,
      texto: [`Quando usar: ${m.quando}`, `Quando não usar: ${m.naoUse}`, ...m.conferir.map((c) => `- ${c}`), ...m.clausulas.map((c) => `${c.titulo}: ${c.nota}`)].join("\n\n"),
    };
  });
}

export function conhecimento(dataDaPagina: (n: No) => Date | undefined = () => undefined) {
  const paginas = ARVORE.filter((n) => n.status === "publicado" && n.tipo !== "modelo").flatMap((n) => {
    const atualizadoEm = dataDaPagina(n)?.toISOString().slice(0, 10);
    return trechosDaPagina(n).map((t) => (atualizadoEm ? { ...t, atualizadoEm } : t));
  });
  return { regrasDe: PARAMS_ATUALIZADOS_EM, trechos: [...paginas, ...trechosDoDuvide(), ...trechosDosModelos()] };
}
