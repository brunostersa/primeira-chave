// Publica no Instagram o que está aprovado e já venceu em calendario.json, em ordem, e grava o resultado no arquivo.
// Só sai o que tem status "aprovado". Na primeira falha para, para a ordem do feed não embaralhar.
// Uso: node scripts/instagram/publicar.mjs [--simular]. Pede IG_ACCESS_TOKEN e IG_USER_ID no ambiente.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://graph.facebook.com/v25.0";
const ARQUIVO = process.env.IG_CALENDARIO ?? join(dirname(fileURLToPath(import.meta.url)), "calendario.json");
const SIMULAR = process.argv.includes("--simular");
const ESPERA_MS = Number(process.env.IG_ESPERA_MS ?? 3000);
const { IG_ACCESS_TOKEN: TOKEN, IG_USER_ID: CONTA } = process.env;

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

async function graph(caminho, corpo) {
  const res = await fetch(`${API}/${caminho}`, {
    method: corpo ? "POST" : "GET",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: corpo ? new URLSearchParams(corpo) : undefined,
  });
  const dados = await res.json();
  if (!res.ok || dados.error) throw new Error(`${caminho}: ${dados.error?.message ?? res.status}`);
  return dados;
}

// A Meta baixa a imagem (ou o vídeo) do nosso site; se o link falhar aqui, falharia lá.
async function conferirArquivos(post) {
  const lista = post.video ? [[post.video, "video/mp4"]] : post.imagens.map((url) => [url, "image/jpeg"]);
  for (const [url, tipo] of lista) {
    const res = await fetch(url, { method: "HEAD" });
    if (!res.ok || !res.headers.get("content-type")?.includes(tipo)) throw new Error(`arquivo fora do ar: ${url} (${res.status})`);
  }
}

// Vídeo leva minutos para a Meta processar; imagem, segundos.
async function esperarContainer(id, tentativas = 40) {
  for (let i = 0; i < tentativas; i++) {
    const { status_code: estado } = await graph(`${id}?fields=status_code`);
    if (estado === "FINISHED") return;
    if (estado === "ERROR" || estado === "EXPIRED") throw new Error(`container ${id}: ${estado}`);
    await dormir(ESPERA_MS);
  }
  throw new Error(`container ${id}: demorou demais`);
}

async function montarContainer(post) {
  // Reel: thumb_offset (ms) escolhe o quadro da capa.
  if (post.video) return (await graph(`${CONTA}/media`, { media_type: "REELS", video_url: post.video, caption: post.legenda, share_to_feed: "true", ...(post.capa_ms != null && { thumb_offset: String(post.capa_ms) }) })).id;
  if (post.imagens.length === 1) return (await graph(`${CONTA}/media`, { image_url: post.imagens[0], caption: post.legenda })).id;
  const filhos = [];
  for (const image_url of post.imagens) filhos.push((await graph(`${CONTA}/media`, { image_url, is_carousel_item: "true" })).id);
  return (await graph(`${CONTA}/media`, { media_type: "CAROUSEL", children: filhos.join(","), caption: post.legenda })).id;
}

async function publicar(post) {
  await conferirArquivos(post);
  const container = await montarContainer(post);
  await esperarContainer(container, post.video ? 100 : 40);
  const { id } = await graph(`${CONTA}/media_publish`, { creation_id: container });
  return id;
}

const agora = new Date().toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo" }).slice(0, 16);
const calendario = JSON.parse(readFileSync(ARQUIVO, "utf8"));
const salvar = () => writeFileSync(ARQUIVO, JSON.stringify(calendario, null, 2));
const vencidos = calendario.filter((p) => p.status === "aprovado" && `${p.data} ${p.hora}` <= agora).sort((a, b) => a.n - b.n);

console.log(`${agora}: ${vencidos.length} para publicar`);
if (SIMULAR) {
  for (const p of vencidos) console.log(`  ${p.n} ${p.titulo} (${p.video ? "reel" : `${p.imagens.length} imagem/ns`})`);
  process.exit(0);
}
if (vencidos.length === 0) process.exit(0);
if (!TOKEN || !CONTA) throw new Error("faltam IG_ACCESS_TOKEN ou IG_USER_ID");

// Se um envio anterior publicou e não conseguiu gravar, a legenda já está no perfil: não repete.
const recentes = (await graph(`${CONTA}/media?fields=id,caption&limit=25`)).data ?? [];

for (const post of vencidos) {
  const jaSaiu = recentes.find((m) => m.caption === post.legenda);
  post.media_id = jaSaiu?.id ?? (await publicar(post));
  post.status = "publicado";
  salvar();
  console.log(`  ${post.n} ${post.titulo}: publicado (${post.media_id})`);
  if (post.comentario && !jaSaiu) {
    // O comentário é complemento: falhar nele não pode travar o feed.
    await graph(`${post.media_id}/comments`, { message: post.comentario }).catch((e) => console.warn(`  comentário do post ${post.n} falhou: ${e.message}`));
  }
}
