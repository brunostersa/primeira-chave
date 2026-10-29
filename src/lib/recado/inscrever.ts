import type { Perfil } from "@/lib/financiamento/engine";
import { PARAMS } from "@/lib/financiamento/params";
import { HUB } from "@/lib/hub";
import { CONSENTIMENTO, type FaseId } from "./sequencias";

/**
 * Inscrição no Recado do João: vai para a API do Hub (que guarda, confere e envia as boas-vindas).
 * NEXT_PUBLIC_HUB_API troca o endereço para testar com o Hub rodando local.
 */
const API = process.env.NEXT_PUBLIC_HUB_API || "https://customerhub.com.br/api/newsletter";

/** O que o simulador conta da pessoa: só faixas e sim/não, nunca o valor da renda. */
export function perfilDoSimulador(p: Perfil) {
  const faixa = PARAMS.faixas.find((f) => p.renda <= f.rendaAte);
  return {
    programa: p.renda ? (faixa ? `mcmv-f${faixa.faixa}` : "sbpe") : "nao-informado",
    junto: p.quem === "junto",
    tem_fgts: p.fgtsOpt === "sim",
    achou_imovel: p.achou === "sim",
    tipo: p.tipo,
  };
}

/** Fase sugerida a partir das respostas: quem já achou o imóvel está numa etapa à frente. */
export const faseDoSimulador = (p: Perfil): FaseId => (p.achou === "sim" ? "imovel" : "juntando");

export async function inscrever({ email, fase, origem, perfil, site }: { email: string; fase: FaseId; origem: string; perfil?: object; site?: string }) {
  const u = new URL(location.href);
  const utm = Object.fromEntries([...u.searchParams].filter(([k]) => k.startsWith("utm_")));
  const r = await fetch(`${API}/inscrever`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: HUB.clientId,
      email,
      fase,
      origem,
      perfil: perfil || {},
      page_url: location.href,
      utm,
      consentimento: CONSENTIMENTO,
      site,
    }),
  });
  const corpo = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(corpo.error || "Não deu para inscrever agora. Tente de novo em instantes.");
}

export async function sairDaLista(token: string) {
  const r = await fetch(`${API}/sair`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ t: token }) });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Não deu agora. Tente de novo.");
}
