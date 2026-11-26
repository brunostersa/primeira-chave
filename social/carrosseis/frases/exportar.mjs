// FERRAMENTAS=… node exportar.mjs → c1-01.png … c2-08.png
import { createRequire } from "node:module";
import { resolve } from "node:path";
const require = createRequire(process.env.FERRAMENTAS + "/");
const puppeteer = require("puppeteer-core");
const nav = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--allow-file-access-from-files"] });
const pg = await nav.newPage();
await pg.setViewport({ width: 1080, height: 1350 });
for (const c of [1, 2]) for (let s = 1; s <= 8; s++) {
  await pg.goto("file://" + resolve("frases.html") + `?c=${c}&s=${s}`, { waitUntil: "load" });
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: `c${c}-${String(s).padStart(2, "0")}.png` });
}
await nav.close();
