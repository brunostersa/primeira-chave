// Gera as camadas fixas (PNG transparente 1080×1920) de cada Reel: FERRAMENTAS=… node sobreposicao.mjs cartorio 35anos simulacao trava
import { createRequire } from "node:module";
import { resolve } from "node:path";
const require = createRequire(process.env.FERRAMENTAS + "/");
const puppeteer = require("puppeteer-core");
const nav = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--allow-file-access-from-files"] });
const pg = await nav.newPage();
await pg.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
pg.on("pageerror", (e) => console.log("ERRO", e.message));
for (const r of process.argv.slice(2)) {
  await pg.goto("file://" + resolve("index.html") + "?r=" + r);
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: `sobreposicao-${r}.png`, type: "png", omitBackground: true });
  console.log("ok", r);
}
await nav.close();
