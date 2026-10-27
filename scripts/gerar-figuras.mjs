// Gera os infográficos das páginas como WebP 1200x675 (public/figuras/<pagina>-<id>.webp).
//
//   npm run figuras            # build + todas as figuras
//   node scripts/gerar-figuras.mjs simulador   # só as de uma página (precisa de out/ atualizado)
//
// Cada figura tem uma rota /figura/<pagina>/<id>/ no build estático (noindex). O script serve
// a pasta out/, tira o print com o Chrome sem janela e converte com o cwebp. Também copia o
// arquivo para out/figuras/, para o build atual já sair com as imagens.

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { copyFileSync, createReadStream, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { tmpdir } from "node:os";

const RAIZ = new URL("..", import.meta.url).pathname;
const OUT = join(RAIZ, "out");
const DESTINO = join(RAIZ, "public", "figuras");
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORTA = 3555;
const so = process.argv[2];
// Assíncrono de propósito: o servidor das páginas roda neste mesmo processo, e uma chamada
// síncrona travaria o servidor enquanto o Chrome espera por ele.
const rodar = promisify(execFile);

if (!existsSync(join(OUT, "figura"))) {
  console.error("Sem out/figura: rode `npm run build` antes (ou `npm run figuras`).");
  process.exit(1);
}

const TIPOS = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".json": "application/json", ".txt": "text/plain" };
const servidor = createServer((req, res) => {
  let caminho = join(OUT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (existsSync(caminho) && statSync(caminho).isDirectory()) caminho = join(caminho, "index.html");
  if (!existsSync(caminho)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": TIPOS[extname(caminho)] ?? "application/octet-stream" });
  createReadStream(caminho).pipe(res);
});
await new Promise((ok) => servidor.listen(PORTA, ok));

mkdirSync(DESTINO, { recursive: true });
mkdirSync(join(OUT, "figuras"), { recursive: true });
const tmp = join(tmpdir(), "pc-figuras");
mkdirSync(tmp, { recursive: true });
// Perfil próprio: sem isso o Chrome sem janela disputa o perfil do Chrome aberto e trava.
const perfil = join(tmpdir(), "pc-figuras-perfil");

let feitas = 0;
for (const pagina of readdirSync(join(OUT, "figura"))) {
  if (so && pagina !== so) continue;
  for (const id of readdirSync(join(OUT, "figura", pagina))) {
    const nome = `${pagina}-${id}`;
    const png = join(tmp, `${nome}.png`);
    const webp = join(DESTINO, `${nome}.webp`);
    await rodar(CHROME, [
      "--headless=new",
      `--user-data-dir=${perfil}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "--hide-scrollbars",
      "--window-size=1200,675",
      "--virtual-time-budget=3000",
      `--screenshot=${png}`,
      `http://localhost:${PORTA}/figura/${pagina}/${id}/`,
    ], { timeout: 60_000 });
    await rodar("cwebp", ["-quiet", "-q", "82", png, "-o", webp]);
    copyFileSync(webp, join(OUT, "figuras", `${nome}.webp`));
    rmSync(png);
    feitas++;
    console.log(`  ${nome}.webp  ${Math.round(statSync(webp).size / 1024)} KB`);
  }
}
servidor.close();
console.log(`${feitas} figura(s) em public/figuras/`);
