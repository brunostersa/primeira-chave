import type { BlocoDoc } from "./documento";

/**
 * PDF mínimo em A4 com as fontes padrão (Helvetica), sem embutir fonte nem depender de
 * biblioteca. Texto em WinAnsi (cobre o português). Campo vazio ganha fundo marca-texto.
 */

// Larguras da Helvetica e da Helvetica-Bold (AFM da Adobe), caracteres 32–126, em 1/1000 em.
const LARG_REG = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667,
  722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556,
  278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];
const LARG_NEG = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611, 975, 722, 722,
  722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556, 333, 556, 611, 556, 611, 556,
  333, 611, 611, 278, 278, 556, 278, 889, 611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

/** Caracteres fora do ASCII que a WinAnsi tem em posição própria. */
const WINANSI: Record<string, number> = { "—": 0x97, "–": 0x96, "“": 0x93, "”": 0x94, "‘": 0x91, "’": 0x92, "•": 0x95, "…": 0x85, "€": 0x80 };
const LARG_ESPECIAL: Record<string, number> = { "—": 1000, "–": 556, "“": 333, "”": 333, "‘": 222, "’": 222, "•": 350, "…": 1000, "€": 556, "º": 365, "ª": 370, "§": 556, "°": 400, "·": 278 };

/** Letra acentuada mede como a letra sem acento (diferença desprezível para quebrar linha). */
const base = (c: string) => c.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function largura(texto: string, negrito: boolean, tamanho: number) {
  const tabela = negrito ? LARG_NEG : LARG_REG;
  let w = 0;
  for (const c of texto) {
    const code = c.charCodeAt(0);
    if (code >= 32 && code <= 126) w += tabela[code - 32];
    else if (LARG_ESPECIAL[c]) w += LARG_ESPECIAL[c];
    else {
      const b = base(c).charCodeAt(0);
      w += b >= 32 && b <= 126 ? tabela[b - 32] : 556;
    }
  }
  return (w * tamanho) / 1000;
}

/** Texto → string literal de PDF em WinAnsi (bytes 0–255 como caracteres). */
function literal(texto: string) {
  let s = "";
  for (const c of texto) {
    const code = c.charCodeAt(0);
    const byte = WINANSI[c] ?? (code < 256 ? code : 63);
    const ch = String.fromCharCode(byte);
    s += ch === "(" || ch === ")" || ch === "\\" ? `\\${ch}` : ch;
  }
  return `(${s})`;
}

const A4 = { w: 595.28, h: 841.89 };
const MARGEM = 62;
const LARGURA_UTIL = A4.w - 2 * MARGEM;
const MARCA = "0.957 0.824 0.247";

type Palavra = { t: string; negrito: boolean; vazio: boolean; w: number };
type Estilo = { tamanho: number; negrito: boolean; italico: boolean; recuo: number; antes: number; depois: number; centro?: boolean };

const ESTILOS: Record<Exclude<BlocoDoc["tipo"], "quebra">, Estilo> = {
  aviso: { tamanho: 8.5, negrito: false, italico: true, recuo: 0, antes: 0, depois: 14 },
  titulo: { tamanho: 12.5, negrito: true, italico: false, recuo: 0, antes: 4, depois: 14, centro: true },
  clausula: { tamanho: 10.5, negrito: true, italico: false, recuo: 0, antes: 12, depois: 4 },
  anexo: { tamanho: 11.5, negrito: true, italico: false, recuo: 0, antes: 0, depois: 10 },
  p: { tamanho: 10.5, negrito: false, italico: false, recuo: 0, antes: 0, depois: 6 },
  item: { tamanho: 10.5, negrito: false, italico: false, recuo: 18, antes: 0, depois: 4 },
  assinatura: { tamanho: 9.5, negrito: false, italico: false, recuo: 0, antes: 30, depois: 6 },
};

export function gerarPdf(blocos: BlocoDoc[], titulo: string): Uint8Array {
  const paginas: string[][] = [[]];
  let y = A4.h - MARGEM;
  const pagina = () => paginas[paginas.length - 1];
  const novaPagina = () => {
    paginas.push([]);
    y = A4.h - MARGEM;
  };

  for (const b of blocos) {
    if (b.tipo === "quebra") {
      novaPagina();
      continue;
    }
    const e = ESTILOS[b.tipo];
    const lh = e.tamanho * 1.38;
    const fonte = (negrito: boolean) => (e.italico ? "F3" : negrito ? "F2" : "F1");

    // Palavras com o estilo de cada trecho; espaço fica colado ao fim da palavra.
    const palavras: Palavra[] = [];
    for (const t of b.trechos) {
      const negrito = e.negrito || !!t.negrito;
      for (const p of t.t.split(/(?<= )/)) if (p) palavras.push({ t: p, negrito, vazio: !!t.vazio, w: largura(p, negrito, e.tamanho) });
    }
    const recuoItem = b.tipo === "item" ? e.recuo : 0;
    const max = LARGURA_UTIL - recuoItem;
    const linhas: Palavra[][] = [[]];
    let usado = 0;
    for (const p of palavras) {
      const semEspaco = largura(p.t.trimEnd(), p.negrito, e.tamanho);
      if (usado + semEspaco > max && linhas[linhas.length - 1].length) {
        linhas.push([]);
        usado = 0;
      }
      linhas[linhas.length - 1].push(p);
      usado += p.w;
    }

    const altura = e.antes + linhas.length * lh + (b.tipo === "assinatura" ? lh : 0);
    // Cláusula e assinatura não ficam sozinhas no pé da página.
    const reserva = b.tipo === "clausula" ? 3 * lh : b.tipo === "assinatura" ? altura : lh;
    if (y - Math.max(reserva, e.antes + lh) < MARGEM + 20) novaPagina();
    y -= e.antes;

    if (b.tipo === "assinatura") {
      y -= lh;
      pagina().push(`0.3 w ${MARGEM} ${y.toFixed(2)} m ${(MARGEM + 260).toFixed(2)} ${y.toFixed(2)} l S`);
    }
    if (b.tipo === "aviso") pagina().push(`0.6 0.6 0.6 RG 0.5 w ${MARGEM} ${(y + 4).toFixed(2)} m ${A4.w - MARGEM} ${(y + 4).toFixed(2)} l S 0 0 0 RG`);

    for (const linha of linhas) {
      if (y - lh < MARGEM + 20) novaPagina();
      y -= lh;
      const total = linha.reduce((s, p) => s + p.w, 0);
      let x = MARGEM + recuoItem + (e.centro ? (max - total) / 2 : 0);
      if (b.tipo === "item" && linha === linhas[0]) pagina().push(`BT /F1 ${e.tamanho} Tf ${(MARGEM + 6).toFixed(2)} ${(y + lh * 0.25).toFixed(2)} Td ${literal("•")} Tj ET`);
      for (const [k, p] of linha.entries()) {
        const linhaBase = y + lh * 0.25;
        if (p.vazio) {
          // O grifo cobre o espaço até a próxima palavra do mesmo campo, sem buracos.
          const w = linha[k + 1]?.vazio ? p.w : largura(p.t.trimEnd(), p.negrito, e.tamanho);
          pagina().push(`${MARCA} rg ${(x - 1).toFixed(2)} ${(linhaBase - e.tamanho * 0.25).toFixed(2)} ${(w + 2).toFixed(2)} ${(e.tamanho * 1.15).toFixed(2)} re f 0 g`);
        }
        pagina().push(`BT /${fonte(p.negrito)} ${e.tamanho} Tf ${x.toFixed(2)} ${linhaBase.toFixed(2)} Td ${literal(p.t)} Tj ET`);
        x += p.w;
      }
    }
    if (b.tipo === "aviso") pagina().push(`0.6 0.6 0.6 RG 0.5 w ${MARGEM} ${(y - 2).toFixed(2)} m ${A4.w - MARGEM} ${(y - 2).toFixed(2)} l S 0 0 0 RG`);
    y -= e.depois;
  }

  // Rodapé de cada página, agora que o total é conhecido.
  paginas.forEach((cmds, i) => {
    const t = `Modelo educativo · primeirachave.com.br · página ${i + 1} de ${paginas.length}`;
    cmds.push(`0.35 0.38 0.41 rg BT /F1 7.5 Tf ${MARGEM} ${MARGEM - 24} Td ${literal(t)} Tj ET 0 g`);
  });

  // Objetos: 1 catálogo, 2 páginas, 3–5 fontes, 6 info, depois (página, conteúdo) por página.
  const objetos: string[] = [];
  const fonteObj = (nome: string) => `<< /Type /Font /Subtype /Type1 /BaseFont /${nome} /Encoding /WinAnsiEncoding >>`;
  const kids = paginas.map((_, i) => `${7 + i * 2} 0 R`).join(" ");
  objetos.push("<< /Type /Catalog /Pages 2 0 R >>");
  objetos.push(`<< /Type /Pages /Kids [${kids}] /Count ${paginas.length} >>`);
  objetos.push(fonteObj("Helvetica"), fonteObj("Helvetica-Bold"), fonteObj("Helvetica-Oblique"));
  objetos.push(`<< /Title ${literal(titulo)} /Author (Primeira Chave) /Producer (primeirachave.com.br) >>`);
  for (const [i, cmds] of paginas.entries()) {
    const conteudo = cmds.join("\n");
    objetos.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4.w} ${A4.h}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${8 + i * 2} 0 R >>`);
    objetos.push(`<< /Length ${conteudo.length} >>\nstream\n${conteudo}\nendstream`);
  }

  // Tudo é byte 0–255 (WinAnsi), então comprimento de string = bytes.
  let saida = "%PDF-1.4\n%\xe2\xe3\xcf\xd3\n";
  const offsets: number[] = [];
  objetos.forEach((o, i) => {
    offsets.push(saida.length);
    saida += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = saida.length;
  saida += `xref\n0 ${objetos.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}`;
  saida += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

  const bytes = new Uint8Array(saida.length);
  for (let i = 0; i < saida.length; i++) bytes[i] = saida.charCodeAt(i) & 0xff;
  return bytes;
}
