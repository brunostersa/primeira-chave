import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { camposUsados, formatarData, montarDocumento, preencherTexto } from "./documento";
import { gerarDocx } from "./docx";
import { MODELOS } from "./modelos";
import { gerarPdf } from "./pdf";
import { gerarPrompt } from "./prompt";
import { crc32 } from "./zip";

/** Lê o diretório central de um ZIP e devolve os nomes dos arquivos. */
function nomesNoZip(z: Uint8Array) {
  const dv = new DataView(z.buffer, z.byteOffset, z.byteLength);
  const fim = z.length - 22;
  expect(dv.getUint32(fim, true)).toBe(0x06054b50);
  const total = dv.getUint16(fim + 10, true);
  let p = dv.getUint32(fim + 16, true);
  const nomes: string[] = [];
  for (let i = 0; i < total; i++) {
    expect(dv.getUint32(p, true)).toBe(0x02014b50);
    const n = dv.getUint16(p + 28, true);
    nomes.push(new TextDecoder().decode(z.subarray(p + 46, p + 46 + n)));
    p += 46 + n;
  }
  return nomes;
}

describe("modelos de contrato", () => {
  it("ids e arquivos são únicos", () => {
    expect(new Set(MODELOS.map((m) => m.id)).size).toBe(MODELOS.length);
    expect(new Set(MODELOS.map((m) => m.arquivo)).size).toBe(MODELOS.length);
  });

  it("todo campo citado existe e todo campo existe para ser citado", () => {
    for (const m of MODELOS) {
      const usados = camposUsados(m);
      for (const c of m.campos) expect(usados.has(c.id), `${m.id}: campo ${c.id} sem uso`).toBe(true);
      expect(() => montarDocumento(m)).not.toThrow();
    }
  });

  it("toda cláusula tem nota, todo modelo tem aviso, base e FAQ em texto puro", () => {
    for (const m of MODELOS) {
      for (const c of m.clausulas) expect(c.nota.length, `${m.id}: ${c.titulo}`).toBeGreaterThan(20);
      expect(m.base.length).toBeGreaterThan(0);
      expect(montarDocumento(m)[0].tipo).toBe("aviso");
      for (const f of m.faq) expect(/\*\*|\]\(/.test(f.q + f.a)).toBe(false);
    }
  });

  it("nada de atalho fora da regra", () => {
    const tudo = JSON.stringify(MODELOS).toLowerCase();
    expect(tudo).not.toMatch(/contrato de gaveta/);
    for (const m of MODELOS) expect(m.id).not.toMatch(/gaveta|cessao/);
  });

  it("campo vazio vira [rótulo] marcado; preenchido entra no texto", () => {
    const m = MODELOS[0];
    expect(preencherTexto("Preço: R$ {{preco}}.", m)).toEqual([{ t: "Preço: R$ " }, { t: "[preço total]", vazio: true }, { t: "." }]);
    expect(preencherTexto("{{preco}}", m, { preco: "300.000,00" })).toEqual([{ t: "300.000,00" }]);
    expect(formatarData("2026-10-28")).toBe("28 de outubro de 2026");
  });

  it("o prompt para IA leva o modelo inteiro, todos os campos e as regras da marca", () => {
    for (const m of MODELOS) {
      const p = gerarPrompt(m);
      expect(m.conferir.length, m.id).toBeGreaterThan(0);
      for (const c of m.campos) expect(p, `${m.id}: ${c.rotulo}`).toContain(c.rotulo);
      for (const c of m.clausulas) expect(p).toContain(c.titulo.toUpperCase());
      expect(p).toMatch(/preço por fora/);
      expect(p).not.toMatch(/\{\{/);
    }
  });

  it("CRC32 confere com o valor conhecido", () => {
    expect(crc32(new TextEncoder().encode("123456789"))).toBe(0xcbf43926);
  });

  it("gera .docx (zip válido) e PDF (xref correto) de cada modelo", () => {
    const saida = process.env.MODELOS_SAIDA;
    if (saida) mkdirSync(saida, { recursive: true });
    for (const m of MODELOS) {
      const doc = montarDocumento(m);
      const docx = gerarDocx(doc, m.tituloDocumento);
      expect(nomesNoZip(docx)).toContain("word/document.xml");
      const pdf = gerarPdf(doc, m.tituloDocumento);
      const texto = String.fromCharCode(...pdf.subarray(0, 8));
      expect(texto).toBe("%PDF-1.4");
      const bruto = Array.from(pdf, (b) => String.fromCharCode(b)).join("");
      const xref = Number(bruto.match(/startxref\n(\d+)/)![1]);
      expect(bruto.slice(xref, xref + 4)).toBe("xref");
      const primeiro = Number(bruto.slice(xref).match(/\n(\d{10}) 00000 n/)![1]);
      expect(bruto.slice(primeiro, primeiro + 7)).toBe("1 0 obj");
      if (saida) {
        writeFileSync(join(saida, `${m.arquivo}.docx`), docx);
        writeFileSync(join(saida, `${m.arquivo}.pdf`), pdf);
      }
    }
  });
});
