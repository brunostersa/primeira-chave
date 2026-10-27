import type { Bloco } from "@/lib/conteudo/tipos";
import { Aviso, Secao } from "./pecas";
import { Calculo } from "./calculos";
import { Rico } from "./Rico";

/** Um bloco de conteúdo → componente. Mudar aqui muda todas as páginas. */
export function BlocoConteudo({ bloco }: { bloco: Bloco }) {
  if ("p" in bloco)
    return (
      <p>
        <Rico texto={bloco.p} />
      </p>
    );
  if ("lista" in bloco) {
    const Tag = bloco.ordenada ? "ol" : "ul";
    return (
      <Tag className={`ml-5 flex flex-col gap-2 ${bloco.ordenada ? "list-decimal" : "list-disc"}`}>
        {bloco.lista.map((item, i) => (
          <li key={i}>
            <Rico texto={item} />
          </li>
        ))}
      </Tag>
    );
  }
  if ("passos" in bloco)
    return (
      <ol className="flex flex-col gap-3">
        {bloco.passos.map((p, i) => (
          <li key={p.titulo} className="grid grid-cols-[32px_1fr] gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-mark font-display font-semibold text-ink">{i + 1}</span>
            <span>
              <b className="block text-ink">{p.titulo}</b>
              <Rico texto={p.texto} />
            </span>
          </li>
        ))}
      </ol>
    );
  if ("aviso" in bloco)
    return (
      <Aviso titulo={bloco.aviso.titulo} tom={bloco.aviso.tom}>
        <Rico texto={bloco.aviso.texto} />
      </Aviso>
    );
  if ("tabela" in bloco)
    return (
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
        <table className="w-full min-w-[460px] text-left text-[15px]">
          <thead className="text-sm text-muted">
            <tr>
              {bloco.tabela.cabecalho.map((c) => (
                <th key={c} className="p-3 font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloco.tabela.linhas.map((l, i) => (
              <tr key={i} className="border-t border-line">
                {l.map((c, j) => (
                  <td key={j} className={j === 0 ? "p-3 font-semibold text-ink" : "p-3 text-ink-2"}>
                    <Rico texto={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return <Calculo nome={bloco.calculo} />;
}

/** As seções de um texto, cada uma com seus blocos. */
export function Secoes({ secoes }: { secoes: { titulo: string; blocos: Bloco[] }[] }) {
  return (
    <>
      {secoes.map((s) => (
        <Secao key={s.titulo} titulo={s.titulo}>
          {s.blocos.map((b, i) => (
            <BlocoConteudo key={i} bloco={b} />
          ))}
        </Secao>
      ))}
    </>
  );
}
