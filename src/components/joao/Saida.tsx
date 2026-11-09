import { ArrowUpRight } from "lucide-react";
import { SAIDAS, type TipoSaida } from "@/lib/joao/saidas";

/** Para onde ir quando o João não é a ajuda certa. */
export function Saida({ tipo }: { tipo: TipoSaida }) {
  const s = SAIDAS[tipo];
  return (
    <div className="joao-entra ml-11 flex max-w-[85%] flex-col gap-2 rounded-2xl border border-planta-deep bg-paper p-3.5 text-sm">
      <p className="font-semibold">{s.titulo}</p>
      <p className="text-ink-2">{s.texto}</p>
      <ul className="flex flex-col gap-2">
        {s.canais.map((c) => (
          <li key={c.nome} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-line pt-2">
            <span className="min-w-0 flex-1 basis-40">
              <b className="block">{c.nome}</b>
              <span className="text-xs text-ink-2">{c.para}</span>
            </span>
            <a href={c.url} {...(c.url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} className="inline-flex min-h-9 items-center gap-1 rounded-full bg-surface px-3 text-xs font-semibold hover:bg-grid">
              {c.rotulo}
              <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
