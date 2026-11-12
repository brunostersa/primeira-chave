// Exporta as cenas da marca (src/components/brand/ilustracoes.tsx) como SVG para os fundos: npx tsx social/reels/07-rapidos/cenas.tsx
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "node:fs";
import { Ilustracao } from "@/components/brand/ilustracoes";
const cenas = ["assinatura", "prazo", "calcular", "banco", "negado", "casa", "apartamento", "a-chave"] as const;
const out: Record<string, string> = {};
for (const c of cenas) out[c] = renderToStaticMarkup(<Ilustracao nome={c} />);
writeFileSync("social/reels/07-rapidos/cenas.js", "window.CENA=" + JSON.stringify(out) + ";\n");
console.log(Object.keys(out).join(" "));
