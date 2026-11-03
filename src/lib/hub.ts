/**
 * Hub da CustomerHub (customerhub.com.br/leads): os relatos de erro e as sugestões do site
 * caem na tabela `leads` compartilhada, como os leads dos clientes, com channel "feedback".
 * A chave é a pública (anon) do projeto: só permite inserir, a leitura fica protegida por RLS.
 */
export const HUB = {
  url: "https://cuorqtrhrvnpyqzocidf.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1b3JxdHJocnZucHlxem9jaWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MDM5OTYsImV4cCI6MjA5ODk3OTk5Nn0.3p0Rco1LwJNeWdJHTjMrlOjH-UEyKlwqa9-QQOd1ALM",
  /** Linha da Primeira Chave em `clients` no Supabase do Hub. */
  clientId: "f3414369-0662-4bfa-b1fd-46c128bbac54",
} as const;

export type TipoRelato = "erro" | "sugestao";

export async function enviarRelato({ tipo, texto, email, contexto }: { tipo: TipoRelato; texto: string; email?: string; contexto: string }) {
  const u = new URL(location.href);
  const utm = (k: string) => u.searchParams.get(k) || null;
  const r = await fetch(`${HUB.url}/rest/v1/leads`, {
    method: "POST",
    headers: { apikey: HUB.anonKey, Authorization: `Bearer ${HUB.anonKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      client_id: HUB.clientId,
      phone: "",
      message: texto,
      source: tipo === "erro" ? "reportar_erro" : "sugerir_ideia",
      channel: "feedback",
      page_url: location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      customer_email: email || null,
      extra: { tipo, contexto },
      utm_source: utm("utm_source"),
      utm_medium: utm("utm_medium"),
      utm_campaign: utm("utm_campaign"),
      utm_content: utm("utm_content"),
    }),
  });
  if (!r.ok) throw new Error(`Hub respondeu ${r.status}`);
}

/** WhatsApp para link wa.me: só dígitos, com o 55 do Brasil. */
export const linkWhatsapp = (numero: string, texto: string) => `https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;

/**
 * Interesse num imóvel de ouro: vira lead no Hub (channel "whatsapp", source "imovel_de_ouro")
 * antes de a pessoa seguir para o WhatsApp de quem vende.
 */
export async function enviarLeadImovel({ nome, telefone, imovel, mensagem, extra }: { nome: string; telefone: string; imovel: string; mensagem: string; extra?: object }) {
  const u = new URL(location.href);
  const utm = (k: string) => u.searchParams.get(k) || null;
  const r = await fetch(`${HUB.url}/rest/v1/leads`, {
    method: "POST",
    keepalive: true,
    headers: { apikey: HUB.anonKey, Authorization: `Bearer ${HUB.anonKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      client_id: HUB.clientId,
      phone: "",
      customer_name: nome,
      customer_phone: telefone,
      message: mensagem,
      source: "imovel_de_ouro",
      channel: "whatsapp",
      page_url: location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      extra: { imovel, ...extra },
      utm_source: utm("utm_source"),
      utm_medium: utm("utm_medium"),
      utm_campaign: utm("utm_campaign"),
      utm_content: utm("utm_content"),
    }),
  });
  if (!r.ok) throw new Error(`Hub respondeu ${r.status}`);
}
