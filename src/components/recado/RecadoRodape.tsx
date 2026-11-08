"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site-config";
import { InscricaoRecado } from "./InscricaoRecado";

/** Páginas que já pedem o e-mail no corpo: o Recado (topo ou saída) e a LP do guia (BaixarGuia inscreve no Recado). */
const JA_INSCREVEM = ["/recado", "/do-zero-a-chave"];

/** O formulário compacto do rodapé. Some onde a página já tem a inscrição, para não pedir o e-mail duas vezes. */
export function RecadoRodape() {
  const caminho = usePathname();
  if (!SITE.recado || JA_INSCREVEM.some((p) => caminho?.startsWith(p))) return null;
  return <InscricaoRecado origem="rodape" compacto />;
}
