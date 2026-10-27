import { IconeLinha, type NomeIcone } from "@/components/brand/icones";
import { JoaoDeBarro, Ninho, type Carga, type Humor, type Pose } from "@/components/brand/JoaoDeBarro";
import { cn } from "@/components/ui/utils";

/**
 * Avatar de cada persona: o João-de-barro no papel dela, num círculo da marca, com um
 * selo do que ela faz. O construtor carrega barro (é o que o joão-de-barro faz); a
 * imobiliária é o ninho pronto; o agente vai de banco em banco, voando.
 */

type Desenho = { pose: Pose; humor?: Humor; carga?: Carga; virado?: boolean; dupla?: boolean; ninho?: number; selo: NomeIcone; fundo: string };

const AVATARES: Record<string, Desenho> = {
  corretor: { pose: "chave", selo: "casa", fundo: "bg-mark" },
  "corretor-parceiro": { pose: "perfil", humor: "feliz", dupla: true, selo: "chave", fundo: "bg-mark-soft" },
  cca: { pose: "frente", humor: "pensativo", selo: "documento", fundo: "bg-planta" },
  "agente-financiamento": { pose: "voando", humor: "curioso", selo: "banco", fundo: "bg-planta" },
  investidor: { pose: "bicando", selo: "medida", fundo: "bg-mark-soft" },
  construtor: { pose: "barro", ninho: 0.5, selo: "casa", fundo: "bg-mark" },
  imobiliaria: { pose: "parado", humor: "feliz", ninho: 1, selo: "local", fundo: "bg-planta" },
};

export function AvatarPersona({ id, className }: { id: string; className?: string }) {
  const d = AVATARES[id] ?? AVATARES.corretor;
  return (
    <span className={cn("relative inline-flex aspect-square items-center justify-center rounded-full border-[1.5px] border-ink", d.fundo, className)} aria-hidden>
      <span className="flex w-[76%] items-end justify-center">
        {d.ninho !== undefined && <Ninho construido={d.ninho} className="mr-[-8%] w-[46%]" />}
        <JoaoDeBarro pose={d.pose} humor={d.humor} carga={d.carga} virado={d.virado} pequeno className={d.ninho !== undefined || d.dupla ? "w-[58%]" : "w-full"} />
        {d.dupla && <JoaoDeBarro pose={d.pose} humor={d.humor} virado pequeno className="ml-[-6%] w-[58%]" />}
      </span>
      <span className="absolute -bottom-1 -right-1 flex size-[34%] items-center justify-center rounded-full border-[1.5px] border-ink bg-surface">
        <IconeLinha nome={d.selo} className="w-[62%]" />
      </span>
    </span>
  );
}
