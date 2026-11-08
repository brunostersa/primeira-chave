// Gera a camada fixa (PNG transparente 1080×1920): FERRAMENTAS=… node sobreposicao.mjs [pagina] [saida.png]
import { createRequire } from "node:module";
import { resolve } from "node:path";
const require = createRequire(process.env.FERRAMENTAS + "/");
const puppeteer = require("puppeteer-core");
const [pagina = "index.html", saida = "sobreposicao.png"] = process.argv.slice(2);
const nav = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--allow-file-access-from-files"] });
const pg = await nav.newPage();
await pg.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
pg.on("pageerror", (e) => console.log("ERRO", e.message));
await pg.goto("file://" + resolve(pagina));
await pg.evaluate(() => document.fonts.ready);
await pg.screenshot({ path: saida, type: "png", omitBackground: true });
await nav.close();
console.log("ok", saida);
