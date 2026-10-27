// Gera os puxadores do <Deslizador /> (o João-de-barro com a chave) em cada humor,
// como data-URIs para o globals.css. Rodar de novo se o desenho mudar:
//   node scripts/gerar-passaro-deslizador.mjs
import { readFileSync, writeFileSync } from "node:fs";

const TINTA = "#121418", BRANCO = "#ffffff", AMARELO = "#F4D23F", BARRO = "#EEB194";
const corpo = `<g stroke='${TINTA}' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'>`
  + `<path d='M57 63 L55 80 M67 62 L69 80' fill='none'/>`
  + `<path d='M36 55 L11 42 L15 51 L8 55 L33 62 Z' fill='${BRANCO}'/>`
  + `<path d='M30 58 C24 48 34 36 50 34 C57 33 63 31 67 25 C71 17 83 13 89 21 C93 27 91 35 87 40 C85 52 77 62 62 64 C50 66 38 64 30 58 Z' fill='${BRANCO}'/>`
  + `<path d='M88 22 Q98 24 106 28 Q97 30 88 33' fill='${BRANCO}'/>`
  + `<path d='M43 43 C53 37 66 41 71 52 C61 55 50 52 43 43 Z' fill='${BRANCO}'/>`
  + `<path d='M108 40 V60 M108 51 H114' fill='none'/>`
  + `<circle cx='108' cy='34' r='6.5' fill='${AMARELO}'/></g>`
  + `<ellipse cx='77' cy='31' rx='4.6' ry='2.8' fill='${BARRO}'/>`;

const pupila = (cx, cy, r) => `<circle cx='${cx}' cy='${cy}' r='${r}' fill='${TINTA}'/><circle cx='${cx + r * 0.35}' cy='${cy - r * 0.35}' r='${r * 0.38}' fill='${BRANCO}'/>`;
const traco = (d, w) => `<path d='${d}' fill='none' stroke='${TINTA}' stroke-width='${w}' stroke-linecap='round'/>`;

const OLHOS = {
  gentil: pupila(82, 24.4, 3.1) + traco("M78 22.2 Q82 18.6 86 22.2", 2.2),
  feliz: traco("M78.4 25.4 Q82 20 85.6 25.4", 3.4),
  triste: pupila(82, 25, 2.8) + traco("M78 19.8 L85.8 16.8", 2.6),
  surpreso: `<circle cx='82' cy='24' r='4.4' fill='${BRANCO}' stroke='${TINTA}' stroke-width='2.4'/>` + `<circle cx='82' cy='24' r='1.9' fill='${TINTA}'/>` + traco("M78.6 16.2 Q82 13.8 85.4 16.2", 2.4),
};

const uri = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, "%27")}")`;
// O puxador redondo tradicional (onde o dedo pega), com o pássaro pousado em cima.
const apoio = `<circle cx='62' cy='108' r='21' fill='${BRANCO}' stroke='${TINTA}' stroke-width='5'/><circle cx='62' cy='108' r='7' fill='${AMARELO}'/>`;
const svg = (olho) => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -2 128 142'>${apoio}${corpo}${olho}</svg>`;

const css = ["/* gerado por scripts/gerar-passaro-deslizador.mjs */", ".deslizador {"]
  .concat(Object.entries(OLHOS).map(([h, o]) => `  --passaro-${h}: ${uri(svg(o))};`))
  .concat(["  --passaro: var(--passaro-gentil);", "}"])
  .concat(Object.keys(OLHOS).filter((h) => h !== "gentil").map((h) => `.deslizador[data-humor="${h}"] {\n  --passaro: var(--passaro-${h});\n}`))
  .join("\n");

const arquivo = "src/app/globals.css";
const atual = readFileSync(arquivo, "utf8");
const inicio = "/* PASSARO-DESLIZADOR:INICIO */";
const fim = "/* PASSARO-DESLIZADOR:FIM */";
const bloco = `${inicio}\n${css}\n${fim}`;
const novo = atual.includes(inicio)
  ? atual.replace(new RegExp(`${inicio.replace(/[*/]/g, "\\$&")}[\\s\\S]*?${fim.replace(/[*/]/g, "\\$&")}`), bloco)
  : atual + "\n" + bloco + "\n";
writeFileSync(arquivo, novo);
console.log("ok:", Object.keys(OLHOS).join(", "));
