import { ARVORE, HUBS, type No } from "@/lib/conteudo/arvore";
import { no, saindo } from "@/lib/conteudo/links";

/**
 * O organismo desenhado: o simulador no centro, os hubs em volta, as páginas
 * agrupadas no setor do hub e o glossário na borda. Calculado no build (SVG estático).
 */

const C = 500;
const R_HUB = 165;
const R_PAG = 315;
const R_GLO = 440;

type Ponto = { x: number; y: number; n: No };

const polar = (r: number, a: number) => ({ x: C + r * Math.cos(a), y: C + r * Math.sin(a) });
const volume = (n: No) => n.termos.reduce((s, [, v]) => s + v, 0);
const raio = (n: No) => 4 + Math.min(14, Math.log10(volume(n) + 10) * 2.6);

function layout(): Map<string, Ponto> {
  const pos = new Map<string, Ponto>();
  pos.set("simulador", { x: C, y: C, n: no("simulador") });
  const hubs = HUBS.filter((h) => h.id !== "glossario");
  const passo = (2 * Math.PI) / hubs.length;
  hubs.forEach((h, i) => {
    const a = -Math.PI / 2 + i * passo;
    pos.set(h.no, { ...polar(R_HUB, a), n: no(h.no) });
    const filhos = ARVORE.filter((n) => n.hub === h.id && !pos.has(n.id) && n.tipo !== "hub" && n.tipo !== "glossario");
    filhos.forEach((n, k) => {
      const abertura = passo * 0.82;
      const ak = a - abertura / 2 + (abertura * (k + 0.5)) / Math.max(filhos.length, 1);
      const r = R_PAG + (k % 2 === 0 ? -22 : 22);
      pos.set(n.id, { ...polar(r, ak), n });
    });
  });
  const glossario = ARVORE.filter((n) => n.tipo === "glossario");
  glossario.forEach((n, k) => pos.set(n.id, { ...polar(R_GLO, -Math.PI / 2 + (k * 2 * Math.PI) / glossario.length), n }));
  pos.set("glossario", { ...polar(R_GLO + 38, Math.PI * 0.79), n: no("glossario") });
  return pos;
}

export function Organismo({ className }: { className?: string }) {
  const pos = layout();
  const arestas: { a: Ponto; b: Ponto; cruza: boolean }[] = [];
  const vistas = new Set<string>();
  for (const n of ARVORE) {
    const a = pos.get(n.id);
    if (!a) continue;
    for (const v of saindo(n)) {
      const b = pos.get(v.id);
      const chave = [n.id, v.id].sort().join("|");
      if (!b || vistas.has(chave)) continue;
      vistas.add(chave);
      arestas.push({ a, b, cruza: !!n.hub && !!v.hub && n.hub !== v.hub && v.tipo !== "glossario" && n.tipo !== "glossario" });
    }
  }
  const curva = (a: Ponto, b: Ponto) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const cx = mx + (C - mx) * 0.35;
    const cy = my + (C - my) * 0.35;
    return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  };

  return (
    <svg viewBox="0 0 1000 1000" className={className} role="img" aria-label="Mapa das páginas da Primeira Chave e como elas se conectam">
      <circle cx={C} cy={C} r={R_HUB} fill="none" stroke="var(--grid)" strokeWidth="1" />
      <circle cx={C} cy={C} r={R_PAG} fill="none" stroke="var(--grid)" strokeWidth="1" />
      <circle cx={C} cy={C} r={R_GLO} fill="none" stroke="var(--grid)" strokeWidth="1" strokeDasharray="2 6" />
      <g fill="none" strokeLinecap="round">
        {arestas
          .filter((e) => !e.cruza)
          .map((e, i) => (
            <path key={`d${i}`} d={curva(e.a, e.b)} stroke="var(--planta-deep)" strokeOpacity="0.18" strokeWidth="1" />
          ))}
        {arestas
          .filter((e) => e.cruza)
          .map((e, i) => (
            <path key={`c${i}`} d={curva(e.a, e.b)} stroke="#d9b520" strokeOpacity="0.45" strokeWidth="1.3" />
          ))}
      </g>
      {[...pos.values()].map(({ x, y, n }) => {
        const hub = n.tipo === "hub" || n.tipo === "nucleo";
        const r = n.tipo === "nucleo" ? 26 : n.tipo === "hub" ? 15 : n.tipo === "glossario" ? 3.5 : raio(n);
        const pub = n.status === "publicado";
        return (
          <g key={n.id}>
            <title>{`${n.titulo}${volume(n) ? ` · ${volume(n).toLocaleString("pt-BR")} buscas/mês` : ""}${pub ? "" : " · em breve"}`}</title>
            <circle
              cx={x}
              cy={y}
              r={r}
              fill={n.tipo === "nucleo" ? "var(--mark)" : pub ? "var(--ink)" : n.tipo === "glossario" ? "var(--planta-deep)" : "var(--surface)"}
              stroke="var(--ink)"
              strokeWidth={hub ? 2.4 : n.tipo === "glossario" ? 0 : 1.4}
            />
            {(hub || volume(n) > 50000) && (
              <text
                x={x}
                y={y + r + 15}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={hub ? 13 : 11}
                fontWeight={hub ? 600 : 400}
                fill="var(--ink)"
                paintOrder="stroke"
                stroke="var(--paper)"
                strokeWidth="4"
              >
                {rotuloCurto(n)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function rotuloCurto(n: No) {
  const curtos: Record<string, string> = {
    simulador: "simulador",
    comprar: "comprar",
    "financiamento-imobiliario": "financiar",
    "minha-casa-minha-vida": "minha casa minha vida",
    "leilao-caixa": "leilão",
    vender: "vender",
    atalhos: "atalhos",
    ferramentas: "ferramentas",
    glossario: "glossário",
    registrato: "registrato",
    "imoveis-caixa": "imóveis caixa",
  };
  return curtos[n.id] ?? n.titulo.toLowerCase();
}
