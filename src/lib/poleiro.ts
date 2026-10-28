/**
 * Onde o João-de-barro de passagem pode pousar. Qualquer elemento com `data-poleiro`
 * vira poleiro: ele pousa na borda de cima, com os pés na linha. O valor do atributo
 * (0 a 1) fixa o ponto da borda; vazio, o ponto é sorteado entre 20% e 80%.
 *
 * Tudo aqui é conta pura (coordenadas da tela, em px), para testar sem navegador.
 */

export type P = { x: number; y: number };
export type Caixa = { left: number; top: number; width: number; height: number };
/** `topo`: onde termina o cabeçalho fixo (o pássaro não pousa escondido atrás dele). */
export type Tela = { largura: number; altura: number; topo: number };

/** Folga acima da borda para caber o pássaro (≈ 26 px de altura) sem cortar. */
const FOLGA_CIMA = 40;
/** Distância mínima das laterais da tela. */
const MARGEM = 28;

/** Lê o valor de `data-poleiro`: número entre 0 e 1, ou nada (sorteia). */
export function fracaoDoPoleiro(valor: string | undefined): number | undefined {
  if (!valor) return undefined;
  const n = Number(valor);
  return Number.isFinite(n) && n >= 0 && n <= 1 ? n : undefined;
}

/** Ponto de pouso na borda de cima da caixa, ou null se ela não está num lugar bom da tela. */
export function pontoDePouso(c: Caixa, tela: Tela, fracao: number): P | null {
  if (c.width < 12 || c.height < 4) return null;
  if (c.top < tela.topo + FOLGA_CIMA || c.top > tela.altura * 0.8) return null;
  const min = Math.max(c.left + 6, MARGEM);
  const max = Math.min(c.left + c.width - 6, tela.largura - MARGEM);
  if (max < min) return null;
  return { x: Math.min(max, Math.max(min, c.left + c.width * fracao)), y: c.top };
}

/** Sorteia um poleiro visível entre os candidatos. Devolve o índice e o ponto. */
export function escolhePoleiro(
  candidatos: { caixa: Caixa; fracao?: number }[],
  tela: Tela,
  sorte: () => number = Math.random,
): { i: number; fracao: number; ponto: P } | null {
  const bons = candidatos.flatMap((c, i) => {
    const fracao = c.fracao ?? 0.2 + sorte() * 0.6;
    const ponto = pontoDePouso(c.caixa, tela, fracao);
    return ponto ? [{ i, fracao, ponto }] : [];
  });
  return bons.length ? bons[Math.floor(sorte() * bons.length)] : null;
}

/* Curva de voo: sobe e desce, como passarinho de verdade (nunca em linha reta). */

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Bézier de a até b com a corcova `h` px acima da reta. */
export function arco(a: P, b: P, h: number): P[] {
  return [a, { x: lerp(a.x, b.x, 0.25), y: lerp(a.y, b.y, 0.25) - h }, { x: lerp(a.x, b.x, 0.8), y: lerp(a.y, b.y, 0.8) - h * 0.7 }, b];
}

export function ponto([p0, p1, p2, p3]: P[], u: number): P {
  const v = 1 - u;
  return {
    x: v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x,
    y: v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y,
  };
}

/**
 * Vários pontos de pouso ao longo da borda de cima, um a cada `passo` px (para um bando
 * pousar lado a lado sem um pássaro em cima do outro). Vazio se a caixa não está num
 * lugar bom da tela.
 */
export function pousosAoLongo(c: Caixa, tela: Tela, passo: number): P[] {
  if (!pontoDePouso(c, tela, 0.5)) return [];
  const n = Math.max(1, Math.floor((c.width - 12) / passo));
  const sobra = c.width - (n - 1) * passo;
  return Array.from({ length: n }, (_, k) => pontoDePouso(c, tela, (sobra / 2 + k * passo) / c.width)).filter((p): p is P => p !== null);
}
