import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Aviso, Guia, Secao } from "@/components/conteudo/Guia";
import { BaixarModelo, ModeloLido } from "@/components/conteudo/ModeloContrato";
import { PromptIA } from "@/components/conteudo/PromptIA";
import { Rico } from "@/components/conteudo/Rico";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/badge";
import { no } from "@/lib/conteudo/links";
import { MODELOS } from "@/lib/modelos/modelos";
import { gerarPrompt } from "@/lib/modelos/prompt";
import { metadadosPagina } from "@/lib/seo";

/** Uma página por modelo de contrato: o modelo lido com as notas e o download em Word e PDF. */

export const dynamicParams = false;
type Props = { params: Promise<{ modelo: string }> };

const pedaco = (id: string) => no(id).slug.split("/").filter(Boolean).pop()!;
const porPedaco = (p: string) => MODELOS.find((m) => pedaco(m.id) === p);

export function generateStaticParams() {
  return MODELOS.map((m) => ({ modelo: pedaco(m.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = porPedaco((await params).modelo);
  if (!m) return {};
  return metadadosPagina({ titulo: m.seo.titulo, descricao: m.seo.descricao, slug: no(m.id).slug });
}

export default async function PaginaModelo({ params }: Props) {
  const m = porPedaco((await params).modelo);
  if (!m) notFound();
  const indice = ["Baixe o modelo", "Preencha com uma IA", "Quando usar", "O modelo, cláusula por cláusula", "Base legal"];

  return (
    <Guia id={m.id} h1={m.seo.h1} faq={m.faq} indice={indice} resposta={<Rico texto={m.seo.resposta} />}>
      <Secao titulo="Baixe o modelo">
        <Card variant="strong" className="flex flex-col gap-4">
          <BaixarModelo modelo={m} />
          <p className="text-[15px] text-ink-2">
            Grátis, sem cadastro. Os campos a preencher vêm <mark className="rounded-sm bg-mark px-0.5 text-ink">grifados</mark>, e as notas de cada cláusula ficam
            num anexo no fim do arquivo.
          </p>
        </Card>
        <Aviso titulo="Modelo educativo, não parecer jurídico">
          Serve para um negócio simples entre pessoas. Em negócio de valor alto, com sinal grande, imóvel com pendência, inventário ou empresa de um dos lados, peça a
          revisão de um advogado antes de assinar: custa menos que um problema.
        </Aviso>
      </Secao>

      <Secao titulo="Preencha com uma IA">
        <p>
          Prefere conversar a preencher campo por campo? Copie o prompt abaixo e cole no ChatGPT, no Claude ou no Gemini. Ele já leva o texto do modelo: a IA faz as
          perguntas, confere as contas e devolve o documento pronto para colar no Word.
        </p>
        <PromptIA prompt={gerarPrompt(m)} />
        <p className="text-sm">
          Antes de colar, pense no que você manda: a IA guarda a conversa conforme as regras dela. Se preferir, deixe CPF e RG para escrever direto no arquivo. E leia o
          resultado inteiro antes de assinar: IA também erra.
        </p>
      </Secao>

      <Secao titulo="Quando usar">
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="flex flex-col gap-1">
            <Eyebrow>Use quando</Eyebrow>
            <p>{m.quando}</p>
          </Card>
          <Card variant="bad" className="flex flex-col gap-1">
            <Eyebrow>Não use quando</Eyebrow>
            <p>{m.naoUse}</p>
          </Card>
        </div>
      </Secao>

      <Secao titulo="O modelo, cláusula por cláusula">
        <ModeloLido modelo={m} />
      </Secao>

      <Secao titulo="Base legal">
        <ul className="list-disc pl-5">
          {m.base.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="text-sm text-ink-2">Texto das leis no site do Planalto (planalto.gov.br). Lei muda: confira a versão em vigor antes de assinar.</p>
      </Secao>
    </Guia>
  );
}
