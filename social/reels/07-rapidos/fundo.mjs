// Gera o fundo (PNG opaco 1080×1920) com a cena da marca: FERRAMENTAS=… node fundo.mjs assinatura prazo …
import { createRequire } from "node:module";
import { resolve } from "node:path";
const require = createRequire(process.env.FERRAMENTAS + "/");
const puppeteer = require("puppeteer-core");
const nav = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--allow-file-access-from-files"] });
const pg = await nav.newPage();
await pg.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });
pg.on("pageerror", (e) => console.log("ERRO", e.message));
for (const c of process.argv.slice(2)) {
  await pg.goto("file://" + resolve("fundo.html") + "?c=" + c);
  await pg.screenshot({ path: `fundo-${c}.png`, type: "png" });
  console.log("ok", c);
}
await nav.close();
