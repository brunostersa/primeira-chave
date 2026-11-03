// Envia out/ para a Hostinger por FTP, só o que mudou e vários arquivos ao mesmo tempo (lftp).
//
//   FTP_SERVER=… FTP_USERNAME=… FTP_PASSWORD=… FTP_DIR=… node scripts/deploy-ftp.mjs
//
// Como decide o que enviar: guarda no servidor um manifesto (.deploy-manifesto.json) com o
// sha256 de cada arquivo enviado. A cada deploy compara com o out/ novo e manda só os novos ou
// alterados, 8 por vez. No fim apaga do servidor o que saiu do build (só arquivos que o próprio
// deploy enviou antes; nada fora do manifesto é tocado) e grava o manifesto novo.
// Na primeira vez aproveita o estado da action antiga (.ftp-deploy-sync-state-v3.json), que usa
// o mesmo sha256, para não reenviar o site inteiro.
//
// FTP_PARALELO muda quantos arquivos vão ao mesmo tempo (padrão 8). FTP_SECO=1 só mostra o plano.

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

const OUT = "out";
const MANIFESTO = ".deploy-manifesto.json";
const ESTADO_ANTIGO = ".ftp-deploy-sync-state-v3.json";
// Rotas internas que só existem para gerar imagens e o guia de marca (fora do robots.txt).
const FORA = [/^figura\//, /^carta\//, /^molde\//, /^marca\//, /(^|\/)\.git/];

const { FTP_SERVER, FTP_USERNAME, FTP_PASSWORD } = process.env;
const DIR = (process.env.FTP_DIR || "./").replace(/\/?$/, "/");
const PARALELO = Number(process.env.FTP_PARALELO || 8);
const SECO = process.env.FTP_SECO === "1";
if (!FTP_SERVER || !FTP_USERNAME || !FTP_PASSWORD) throw new Error("Faltam FTP_SERVER, FTP_USERNAME ou FTP_PASSWORD.");

const tmp = mkdtempSync(join(tmpdir(), "deploy-"));

/** Roda comandos do lftp já conectado e dentro da pasta do site. A senha vai por variável, não pela linha de comando. */
function lftp(comandos, { falhaPara = true } = {}) {
  const script = [
    "set cmd:fail-exit " + (falhaPara ? "yes" : "no"),
    "set net:max-retries 3",
    "set net:timeout 30",
    // FTP simples, como a action anterior (FTP-Deploy-Action, protocol ftp).
    "set ftp:ssl-allow no",
    `cd "${DIR}"`,
    ...comandos,
  ].join("\n");
  const arq = join(tmp, "comandos.lftp");
  writeFileSync(arq, script);
  const [host, porta] = FTP_SERVER.split(":");
  const args = ["--env-password", "-u", FTP_USERNAME, ...(porta ? ["-p", porta] : []), "-e", `source "${arq}"; bye`, host];
  return execFileSync("lftp", args, {
    env: { ...process.env, LFTP_PASSWORD: FTP_PASSWORD },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
}

/** Baixa um arquivo do servidor; se não existir, devolve null. */
function baixar(nome) {
  const destino = join(tmp, nome);
  try {
    lftp([`get "${nome}" -o "${destino}"`]);
    return readFileSync(destino, "utf8");
  } catch {
    return null;
  }
}

function listar(pasta) {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((e) => {
    const p = join(pasta, e.name);
    return e.isDirectory() ? listar(p) : [relative(OUT, p).split("\\").join("/")];
  });
}

// 1. O que o build gerou.
const atual = {};
for (const f of listar(OUT)) {
  if (FORA.some((r) => r.test(f))) continue;
  atual[f] = createHash("sha256").update(readFileSync(join(OUT, f))).digest("hex");
}

// 2. O que já está no servidor.
let anterior = {};
const manifesto = baixar(MANIFESTO);
if (manifesto) anterior = JSON.parse(manifesto);
else {
  const estado = baixar(ESTADO_ANTIGO);
  if (estado) for (const d of JSON.parse(estado).data ?? []) if (d.type === "file") anterior[d.name] = d.hash;
  console.log(estado ? `Sem manifesto: usando o estado da action antiga (${Object.keys(anterior).length} arquivos).` : "Primeiro envio: vai tudo.");
}

const enviar = Object.keys(atual).filter((f) => anterior[f] !== atual[f]);
const apagar = Object.keys(anterior).filter((f) => !(f in atual) && !FORA.some((r) => r.test(f)));
console.log(`${Object.keys(atual).length} arquivos no build: ${enviar.length} para enviar, ${apagar.length} para apagar.`);
if (SECO) {
  console.log([...enviar.map((f) => "+ " + f), ...apagar.map((f) => "- " + f)].join("\n"));
  process.exit(0);
}

// 3. Envia em lotes, cada lote em paralelo. -d cria as pastas que faltarem.
const q = (f) => `"${f.replace(/"/g, '\\"')}"`;
const LOTE = 200;
for (let i = 0; i < enviar.length; i += LOTE) {
  const lote = enviar.slice(i, i + LOTE);
  lftp([`lcd "${OUT}"`, `mput -d -P ${PARALELO} ${lote.map(q).join(" ")}`]);
  console.log(`enviados ${Math.min(i + LOTE, enviar.length)}/${enviar.length}`);
}

// 4. Grava o manifesto novo antes de apagar: se a limpeza falhar, o próximo deploy não reenvia nada à toa.
writeFileSync(join(tmp, MANIFESTO), JSON.stringify(atual));
lftp([`put "${join(tmp, MANIFESTO)}" -o "${MANIFESTO}"`]);

// 5. Apaga o que saiu do build (falhar aqui não derruba o deploy: o site novo já está no ar).
for (let i = 0; i < apagar.length; i += LOTE) {
  lftp(apagar.slice(i, i + LOTE).map((f) => `rm ${q(f)}`), { falhaPara: false });
}
console.log("Deploy concluído.");
