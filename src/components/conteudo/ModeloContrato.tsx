import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { GatilhoUso } from "@/components/recado/GatilhoUso";
import { TITULOS } from "@/lib/recado/convite";
import { preencherTexto, type Trecho } from "@/lib/modelos/documento";
import { urlArquivo } from "@/lib/modelos/modelos";
import type { Modelo } from "@/lib/modelos/tipos";

/**
 * Peças dos modelos de contrato: os botões de download e o modelo lido na página,
 * cláusula por cláusula, com a nota "o que isso faz" ao lado. Campo a preencher
 * aparece grifado de marca-texto, igual no .docx e no PDF.
 */

export function BaixarModelo({ modelo, compacto = false }: { modelo: Modelo; compacto?: boolean }) {
  return (
    <GatilhoUso modo="baixou" origem={`modelo:${modelo.id}`} titulo={TITULOS.modelo}>
      <div className="flex flex-wrap gap-2">
        <Button asChild size={compacto ? "sm" : "default"}>
          <a href={urlArquivo(modelo, "docx")} download>
            <Download aria-hidden />
            Baixar em Word
          </a>
        </Button>
        <Button asChild variant="outline" size={compacto ? "sm" : "default"}>
          <a href={urlArquivo(modelo, "pdf")} download>
            <Download aria-hidden />
            Baixar em PDF
          </a>
        </Button>
      </div>
    </GatilhoUso>
  );
}

function Trechos({ trechos }: { trechos: Trecho[] }) {
  return trechos.map((t, i) =>
    t.vazio ? (
      <mark key={i} className="rounded-sm bg-mark px-0.5 text-ink">
        {t.t}
      </mark>
    ) : (
      <span key={i}>{t.t}</span>
    ),
  );
}

/** Parágrafos na ordem do modelo; itens seguidos ("- ...") viram uma lista. */
function Paragrafos({ textos, modelo }: { textos: string[]; modelo: Modelo }) {
  const grupos: string[][] = [];
  for (const t of textos) {
    const ultimo = grupos[grupos.length - 1];
    if (t.startsWith("- ") && ultimo?.[0].startsWith("- ")) ultimo.push(t);
    else grupos.push([t]);
  }
  return grupos.map((g) =>
    g[0].startsWith("- ") ? (
      <ul key={g[0]} className="list-disc pl-5">
        {g.map((t) => (
          <li key={t}>
            <Trechos trechos={preencherTexto(t.slice(2), modelo)} />
          </li>
        ))}
      </ul>
    ) : (
      <p key={g[0]}>
        <Trechos trechos={preencherTexto(g[0], modelo)} />
      </p>
    ),
  );
}

export function ModeloLido({ modelo }: { modelo: Modelo }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5 text-[15px] leading-relaxed sm:p-6">
        <p className="text-center font-semibold uppercase tracking-wide">{modelo.tituloDocumento}</p>
        {modelo.abertura.map((t) => (
          <p key={t}>
            <Trechos trechos={preencherTexto(t, modelo)} />
          </p>
        ))}
      </div>
      {modelo.clausulas.map((c, i) => (
        <section key={c.titulo} className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-6">
          <div className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-line bg-surface p-5 text-[15px] leading-relaxed sm:p-6">
            <h3 className="font-semibold">
              Cláusula {i + 1}ª · {c.titulo}
            </h3>
            <Paragrafos textos={c.texto} modelo={modelo} />
          </div>
          <aside className="flex flex-col gap-1 self-start rounded-[var(--radius-card)] bg-planta/50 p-4 text-[15px]">
            <Eyebrow>O que essa cláusula faz</Eyebrow>
            <p>{c.nota}</p>
          </aside>
        </section>
      ))}
      <p className="text-sm text-ink-2">
        Depois das cláusulas vêm cidade, data e as assinaturas{modelo.testemunhas ? ", com duas testemunhas" : ""}. No arquivo baixado, as notas acima vão num anexo
        no fim: apague antes de assinar.
      </p>
    </div>
  );
}
