/**
 * Evento de análise para o GTM (window.dataLayer). Fora do domínio de produção o GTM
 * não carrega e a chamada não faz nada. Nunca mandar valores da pessoa (renda, saldo):
 * só o que aconteceu e em que etapa.
 */
export function evento(nome: string, dados: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push({ event: nome, ...dados });
}
