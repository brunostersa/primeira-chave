// FERRAMENTAS=… node texto.mjs → texto-<r>.png (transparente)
import { createRequire } from "node:module";
import { resolve } from "node:path";
const require = createRequire(process.env.FERRAMENTAS + "/");
const puppeteer = require("puppeteer-core");
const nav = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--allow-file-access-from-files"] });
const pg = await nav.newPage();
await pg.setViewport({ width: 1080, height: 1920 });
for (const r of ["visita", "namao", "sinal", "depois", "descontos"]) {
  await pg.goto("file://" + resolve("texto.html") + "?r=" + r);
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: `texto-${r}.png`, omitBackground: true });
}
await nav.close();
