import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { brl } from "@/lib/format";
import { IMOVEIS_DE_OURO, seloAprovado, slugImovel } from "@/lib/imoveis-de-ouro";

/** Cartão de um imóvel de ouro nas vitrines (geral e por cidade). */
export function CartaoImovel({ id }: { id: string }) {
  const i = IMOVEIS_DE_OURO.find((x) => x.id === id)!;
  return (
    <Link href={slugImovel(i)} className="group flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-3 hover:border-ink">
      <Image src={i.fotos[0].arquivo} alt={i.fotos[0].legenda} width={600} height={400} className="aspect-[3/2] w-full rounded-lg object-cover" />
      <div className="flex flex-col gap-2 px-1 pb-1">
        <Badge tone={seloAprovado(i) ? "ok" : "warn"} className="self-start">
          {seloAprovado(i) ? "João aprova" : "Selo em análise"}
        </Badge>
        <b className="text-lg leading-snug group-hover:underline">{i.titulo}</b>
        <span className="text-sm text-ink-2">
          {i.bairro} · {brl(i.preco)} · avaliação {i.avaliacao.banco} {brl(i.avaliacao.valor)}
        </span>
      </div>
    </Link>
  );
}
