// Renderiza os quadros de um Reel de motion.html: FERRAMENTAS=… node capturar.mjs <r> <pasta> [fps] [t1,t2…]
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const require = createRequire(process.env.FERRAMENTAS + "/");
const puppeteer = require("puppeteer-core");
const [r, saida, fpsArg, tempos] = process.argv.slice(2);
const fps = Number(fpsArg || 30);
mkdirSync(saida, { recursive: true });
const nav = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--allow-file-access-from-files"] });
const pg = await nav.newPage();
await pg.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
pg.on("pageerror", (e) => console.log("ERRO", e.message));
await pg.goto("file://" + resolve("motion.html") + "?r=" + r);
await pg.evaluate(() => document.fonts.ready);
const dur = await pg.evaluate(() => window.DUR);
const lista = tempos ? tempos.split(",").map(Number) : Array.from({ length: Math.round(dur * fps) }, (_, i) => i / fps);
for (let i = 0; i < lista.length; i++) {
  await pg.evaluate((t) => window.render(t), lista[i]);
  const nome = tempos ? `t${lista[i].toFixed(1)}.jpg` : `q${String(i).padStart(5, "0")}.jpg`;
  await pg.screenshot({ path: `${saida}/${nome}`, type: "jpeg", quality: 92 });
}
writeFileSync(`${saida}/golpes.json`, JSON.stringify(await pg.evaluate(() => window.GOLPES)));
await nav.close();
