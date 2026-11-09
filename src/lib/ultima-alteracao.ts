import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";

/**
 * Data do último commit que mexeu na página. Usar a data do build faria todo
 * deploy anunciar ao Google que todas as páginas mudaram.
 */
export function ultimaAlteracao(caminho: string): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", caminho], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

/** Páginas da rota única: o texto mora em src/lib/conteudo/textos/<arquivo>.ts. */
const PASTA_TEXTOS = "src/lib/conteudo/textos";
const TEXTOS_FONTE = readdirSync(PASTA_TEXTOS).map((f) => ({ f: `${PASTA_TEXTOS}/${f}`, s: readFileSync(`${PASTA_TEXTOS}/${f}`, "utf8") }));
export const fonteDoTexto = (id: string) => TEXTOS_FONTE.find(({ s }) => new RegExp(`\\n  "?${id.replace(/^g-/, "")}"?: \\{`).test(s))?.f;
