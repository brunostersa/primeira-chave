import type { No } from "../arvore";
import type { Texto } from "../tipos";
import { MODELOS } from "../../modelos/modelos";
import { TEXTOS_ATALHOS } from "./atalhos";
import { TEXTOS_COMPRAR } from "./comprar";
import { TEXTOS_FERRAMENTAS } from "./ferramentas";
import { TEXTOS_FINANCIAR } from "./financiar";
import { TEXTOS_LEILAO } from "./leilao";
import { TEXTOS_MERCADO } from "./mercado";
import { TEXTOS_PROGRAMAS } from "./programas";
import { TEXTOS_VENDER } from "./vender";

import { GLOSSARIO_TEXTOS } from "./glossario";
import { HUBS_TEXTOS } from "./hubs";

export { GLOSSARIO_TEXTOS, HUBS_TEXTOS };

/** Conteúdo de cada guia, atalho e ferramenta, por id da árvore. */
export const TEXTOS: Record<string, Texto> = {
  ...TEXTOS_COMPRAR,
  ...TEXTOS_FINANCIAR,
  ...TEXTOS_PROGRAMAS,
  ...TEXTOS_LEILAO,
  ...TEXTOS_VENDER,
  ...TEXTOS_ATALHOS,
  ...TEXTOS_FERRAMENTAS,
  ...TEXTOS_MERCADO,
};

/** Páginas com rota própria escrita à mão (fora da rota única). */
export const PAGINAS_PROPRIAS = new Set(["inicio", "simulador", "guias", "sem-entrada-casa", "modelos-de-contrato", ...MODELOS.map((m) => m.id)]);

/** A página é montada pela rota única (conteúdo como dados)? */
export function naRotaUnica(n: No) {
  if (n.status !== "publicado" || PAGINAS_PROPRIAS.has(n.id)) return false;
  if (n.id === "glossario") return true;
  if (n.tipo === "glossario") return !!GLOSSARIO_TEXTOS[n.id.replace(/^g-/, "")];
  if (n.tipo === "hub") return !!HUBS_TEXTOS[n.id];
  return !!TEXTOS[n.id];
}
