"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site-config";
import { InscricaoRecado } from "./InscricaoRecado";

/** O formulário compacto do rodapé. Some nas páginas do próprio Recado (lá ele já está no topo, ou a pessoa está saindo). */
export function RecadoRodape() {
  const caminho = usePathname();
  if (!SITE.recado || caminho?.startsWith("/recado")) return null;
  return <InscricaoRecado origem="rodape" compacto />;
}
