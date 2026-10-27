import { Fragment, type ReactNode } from "react";
import { LinkNo, Termo } from "./pecas";
import type { Rico as RicoTexto } from "@/lib/conteudo/tipos";

const PADRAO = /\*\*(.+?)\*\*|\[(.+?)\]\((#[\w-]+|g:[\w-]+|https?:\/\/[^\s)]+)\)/g;

/** Renderiza o texto rico do conteúdo: negrito, link interno (#id), termo (g:id) e link externo. */
export function Rico({ texto }: { texto: RicoTexto }) {
  const partes: ReactNode[] = [];
  let ultimo = 0;
  let k = 0;
  for (const m of texto.matchAll(PADRAO)) {
    if (m.index! > ultimo) partes.push(texto.slice(ultimo, m.index));
    if (m[1] !== undefined) partes.push(<b key={k++}>{m[1]}</b>);
    else {
      const [rotulo, alvo] = [m[2], m[3]];
      if (alvo.startsWith("#")) partes.push(<LinkNo key={k++} id={alvo.slice(1)}>{rotulo}</LinkNo>);
      else if (alvo.startsWith("g:")) partes.push(<Termo key={k++} id={alvo.slice(2)}>{rotulo}</Termo>);
      else
        partes.push(
          <a key={k++} href={alvo} rel="noopener" target="_blank" className="font-semibold underline decoration-planta-deep underline-offset-4 hover:decoration-ink">
            {rotulo}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>,
        );
    }
    ultimo = m.index! + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return (
    <>
      {partes.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}
