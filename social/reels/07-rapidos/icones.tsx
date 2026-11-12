// Exporta os ícones da marca (src/components/brand/icones.tsx) para os Reels: npx tsx --tsconfig tsconfig.json social/reels/07-rapidos/icones.tsx
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
import { IconeLinha, NOMES_ICONES } from "@/components/brand/icones";
const out: Record<string, string> = {};
for (const n of NOMES_ICONES) out[n] = renderToStaticMarkup(<IconeLinha nome={n} />);
writeFileSync("social/reels/07-rapidos/icones.js", "window.ICONE=" + JSON.stringify(out) + ";\n");
console.log(Object.keys(out).join(" "));
