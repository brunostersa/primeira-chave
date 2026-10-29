import type { Modelo, Valores } from "./tipos";

/**
 * O modelo preenchido como uma lista de blocos neutros, que a página, o .docx e o PDF
 * desenham cada um do seu jeito. Campo vazio vira "[rótulo]" marcado (`vazio`), para
 * aparecer grifado de marca-texto e ninguém assinar com lacuna escondida.
 */

export type Trecho = { t: string; vazio?: boolean; negrito?: boolean };

export type BlocoDoc =
  | { tipo: "aviso"; trechos: Trecho[] }
  | { tipo: "titulo"; trechos: Trecho[] }
  | { tipo: "clausula"; trechos: Trecho[] }
  | { tipo: "p"; trechos: Trecho[] }
  | { tipo: "item"; trechos: Trecho[] }
  | { tipo: "assinatura"; trechos: Trecho[] }
  | { tipo: "quebra" }
  | { tipo: "anexo"; trechos: Trecho[] };

export const AVISO =
  "Modelo educativo da Primeira Chave (primeirachave.com.br). Não é parecer jurídico. Preencha os campos grifados, apague o que não se aplica e, em negócio de valor alto ou com pendência, peça a revisão de um advogado. Apague este aviso e o anexo antes de assinar.";

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

/** "2026-10-28" (input de data) → "28 de outubro de 2026"; o resto passa como veio. */
export function formatarData(v: string) {
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${Number(m[3])} de ${MESES[Number(m[2]) - 1]} de ${m[1]}` : v;
}

/** Troca cada {{campo}} pelo valor, ou por "[rótulo]" marcado quando vazio. */
export function preencherTexto(texto: string, modelo: Modelo, valores: Valores = {}): Trecho[] {
  const trechos: Trecho[] = [];
  let resto = 0;
  for (const m of texto.matchAll(/\{\{(\w+)\}\}/g)) {
    if (m.index! > resto) trechos.push({ t: texto.slice(resto, m.index) });
    const campo = modelo.campos.find((c) => c.id === m[1]);
    if (!campo) throw new Error(`${modelo.id}: campo {{${m[1]}}} sem definição`);
    const v = (valores[campo.id] ?? "").trim();
    trechos.push(v ? { t: campo.tipo === "data" ? formatarData(v) : v } : { t: `[${campo.rotulo}]`, vazio: true });
    resto = m.index! + m[0].length;
  }
  if (resto < texto.length) trechos.push({ t: texto.slice(resto) });
  return trechos;
}

/** Campos citados nos textos do modelo (para o teste de integridade). */
export function camposUsados(modelo: Modelo) {
  const textos = [...modelo.abertura, ...modelo.clausulas.flatMap((c) => c.texto), `{{${modelo.local.cidade}}} {{${modelo.local.data}}}`];
  return new Set(textos.flatMap((t) => [...t.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1])));
}

const ORDINAL = (i: number) => `${i + 1}ª`;
const paragrafo = (texto: string, modelo: Modelo, valores: Valores): BlocoDoc =>
  texto.startsWith("- ")
    ? { tipo: "item", trechos: preencherTexto(texto.slice(2), modelo, valores) }
    : { tipo: "p", trechos: preencherTexto(texto, modelo, valores) };

/** O documento inteiro: aviso, título, partes, cláusulas, assinaturas e o anexo com as notas. */
export function montarDocumento(modelo: Modelo, valores: Valores = {}, { anexo = true } = {}): BlocoDoc[] {
  const blocos: BlocoDoc[] = [
    { tipo: "aviso", trechos: [{ t: AVISO }] },
    { tipo: "titulo", trechos: [{ t: modelo.tituloDocumento.toUpperCase() }] },
    ...modelo.abertura.map((t) => paragrafo(t, modelo, valores)),
  ];
  modelo.clausulas.forEach((c, i) => {
    blocos.push({ tipo: "clausula", trechos: [{ t: `Cláusula ${ORDINAL(i)} · ${c.titulo}` }] });
    blocos.push(...c.texto.map((t) => paragrafo(t, modelo, valores)));
  });
  blocos.push({ tipo: "p", trechos: preencherTexto(`{{${modelo.local.cidade}}}, {{${modelo.local.data}}}.`, modelo, valores) });
  for (const a of modelo.assinaturas) blocos.push({ tipo: "assinatura", trechos: [{ t: a }] });
  if (modelo.testemunhas) {
    blocos.push({ tipo: "assinatura", trechos: [{ t: "TESTEMUNHA 1 · nome e CPF" }] });
    blocos.push({ tipo: "assinatura", trechos: [{ t: "TESTEMUNHA 2 · nome e CPF" }] });
  }
  if (anexo) {
    blocos.push({ tipo: "quebra" });
    blocos.push({ tipo: "anexo", trechos: [{ t: "ANEXO · O QUE CADA CLÁUSULA FAZ (APAGUE ANTES DE ASSINAR)" }] });
    modelo.clausulas.forEach((c, i) => {
      blocos.push({ tipo: "p", trechos: [{ t: `Cláusula ${ORDINAL(i)} · ${c.titulo}. `, negrito: true }, { t: c.nota }] });
    });
    blocos.push({ tipo: "p", trechos: [{ t: "Base legal: ", negrito: true }, { t: modelo.base.join("; ") + "." }] });
    blocos.push({ tipo: "p", trechos: [{ t: "Mais explicações, passo a passo, em primeirachave.com.br." }] });
  }
  return blocos;
}
