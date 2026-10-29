import type { BlocoDoc, Trecho } from "./documento";
import { zip } from "./zip";

/**
 * .docx mínimo (WordprocessingML): abre no Word, no LibreOffice e no Google Docs.
 * Campo vazio sai grifado de amarelo, a cor marca-texto, para achar o que falta preencher.
 */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const FONTE = '<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>';

function run(t: Trecho, { tamanho = 22, negrito = false, italico = false } = {}) {
  const props = [FONTE, negrito || t.negrito ? "<w:b/>" : "", italico ? "<w:i/>" : "", t.vazio ? '<w:highlight w:val="yellow"/>' : "", `<w:sz w:val="${tamanho}"/>`].join("");
  return `<w:r><w:rPr>${props}</w:rPr><w:t xml:space="preserve">${esc(t.t)}</w:t></w:r>`;
}

function paragrafo(b: BlocoDoc): string {
  switch (b.tipo) {
    case "quebra":
      return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
    case "aviso":
      return `<w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="999999"/><w:bottom w:val="single" w:sz="4" w:space="4" w:color="999999"/></w:pBdr><w:spacing w:after="240"/></w:pPr>${b.trechos.map((t) => run(t, { tamanho: 18, italico: true })).join("")}</w:p>`;
    case "titulo":
      return `<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="240"/></w:pPr>${b.trechos.map((t) => run(t, { tamanho: 26, negrito: true })).join("")}</w:p>`;
    case "anexo":
      return `<w:p><w:pPr><w:spacing w:after="200"/></w:pPr>${b.trechos.map((t) => run(t, { tamanho: 24, negrito: true })).join("")}</w:p>`;
    case "clausula":
      return `<w:p><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/></w:pPr>${b.trechos.map((t) => run(t, { negrito: true })).join("")}</w:p>`;
    case "item":
      return `<w:p><w:pPr><w:ind w:left="567" w:hanging="283"/><w:jc w:val="both"/><w:spacing w:after="80"/></w:pPr>${run({ t: "•\t" })}${b.trechos.map((t) => run(t)).join("")}</w:p>`;
    case "assinatura":
      return `<w:p><w:pPr><w:keepLines/><w:spacing w:before="560" w:after="0"/></w:pPr>${run({ t: "_____________________________________________" })}</w:p><w:p><w:pPr><w:spacing w:after="120"/></w:pPr>${b.trechos.map((t) => run(t, { tamanho: 20 })).join("")}</w:p>`;
    case "p":
      return `<w:p><w:pPr><w:jc w:val="both"/><w:spacing w:after="120"/></w:pPr>${b.trechos.map((t) => run(t)).join("")}</w:p>`;
  }
}

export function gerarDocx(blocos: BlocoDoc[], titulo: string): Uint8Array {
  const enc = new TextEncoder();
  const corpo = blocos.map(paragrafo).join("");
  const documento = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${corpo}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1418" w:right="1418" w:bottom="1418" w:left="1418" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const tipos = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`;
  const docRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`;
  const core = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>${esc(titulo)}</dc:title><dc:creator>Primeira Chave</dc:creator><dc:language>pt-BR</dc:language></cp:coreProperties>`;
  return zip([
    { nome: "[Content_Types].xml", dados: enc.encode(tipos) },
    { nome: "_rels/.rels", dados: enc.encode(rels) },
    { nome: "word/document.xml", dados: enc.encode(documento) },
    { nome: "word/_rels/document.xml.rels", dados: enc.encode(docRels) },
    { nome: "docProps/core.xml", dados: enc.encode(core) },
  ]);
}
