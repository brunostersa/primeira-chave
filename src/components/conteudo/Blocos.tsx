import Image from "next/image";
import { arquivoFigura } from "@/lib/conteudo/figuras";
import type { Bloco, Figura } from "@/lib/conteudo/tipos";
import { Aviso, Secao, slugSecao } from "./pecas";
import { Calculo } from "./calculos";
import { Rico } from "./Rico";

/** Um bloco de conteúdo → componente. Mudar aqui muda todas as páginas. */
export function BlocoConteudo({ bloco, pagina }: { bloco: Bloco; pagina: string }) {
  if ("figura" in bloco) return <FiguraPagina figura={bloco.figura} pagina={pagina} />;
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

/** O infográfico na página: imagem com texto alternativo e legenda (o arquivo vem do script). */
export function FiguraPagina({ figura, pagina }: { figura: Figura; pagina: string }) {
  return (
    <figure className="flex flex-col gap-2">
      <Image
        src={arquivoFigura(pagina, figura.id)}
        alt={figura.alt}
        width={1200}
        height={675}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="h-auto w-full rounded-[var(--radius-card)] border border-line"
      />
      {figura.legenda && (
        <figcaption className="text-sm text-muted">
          <Rico texto={figura.legenda} />
        </figcaption>
      )}
    </figure>
  );
}

/** As seções de um texto, cada uma com seus blocos. O id de cada seção alimenta o índice. */
export function Secoes({ secoes, pagina }: { secoes: { titulo: string; blocos: Bloco[] }[]; pagina: string }) {
  return (
    <>
      {secoes.map((s) => (
        <Secao key={s.titulo} id={slugSecao(s.titulo)} titulo={s.titulo}>
          {s.blocos.map((b, i) => (
            <BlocoConteudo key={i} bloco={b} pagina={pagina} />
          ))}
        </Secao>
      ))}
    </>
  );
}
