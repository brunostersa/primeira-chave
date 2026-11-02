import { CENAS, type NomeCena } from "@/components/brand/ilustracoes";
import type { Carga, Humor, Pose } from "@/components/brand/JoaoDeBarro";

/**
 * Os cards de imagem dos e-mails do Recado do João: a faixa cheia no topo de cada e-mail.
 * O padrão é foto cheia do banco (Pexels, ver social/_fotos/CREDITOS.md) cortada embaixo por
 * uma onda com borda amarela, e o João grande no céu ou na fachada. Nos e-mails mais sérios
 * (crédito negado, nome sujo, banco) a foto vira duotone no azul planta.
 * Viram JPG em public/email/cards/<id>.jpg com `npm run figuras -- email`
 * (rota /figura/email/<id>/); o e-mail aponta o id (`imagem` em sequencias.ts).
 *
 * Além destes, toda cena tem um card só com o desenho: "cena-<nome>" (é o que o recado
 * semanal usa no atalho da semana, pela ilustração da página).
 */
export type Fundo = "planta" | "marca" | "papel";

/** As fotos ficam em public/figura/fotos/<nome>.jpg (fora do FTP: só servem para gerar os cards). */
export type Foto =
  | "fachada-marrom"
  | "telhado-ceu"
  | "telhado-azul"
  | "grade-bege"
  | "fachada-amarela"
  | "ceu-azul"
  | "varandas-amarelas"
  | "cubos"
  | "empena-tijolo"
  | "beiral-laranja";

export type CardFoto = {
  foto: Foto;
  /** object-position da foto (o que fica no quadro). */
  foco?: string;
  /** "cor" = a foto como é; "planta" = duotone no azul da marca, para os assuntos sérios. */
  tom?: "cor" | "planta";
  joao: { pose: Pose; carga?: Carga; humor?: Humor; virado?: boolean; giro?: number; x: number; y: number; largura: number };
  alt: string;
};

export type CardCena = { cena: NomeCena; fundo: Fundo; alt: string };
export type CardEmail = CardFoto | CardCena;

export const CARDS = {
  simular: { foto: "varandas-amarelas", foco: "50% 40%", joao: { pose: "voando", humor: "curioso", x: 330, y: 40, largura: 150 }, alt: "O João voando diante de um prédio de varandas amarelas" },
  renda: { foto: "fachada-amarela", foco: "50% 50%", joao: { pose: "frente", humor: "pensativo", x: 222, y: 96, largura: 120 }, alt: "O João pensando na parcela, numa janela de prédio amarelo" },
  "sem-entrada": { foto: "empena-tijolo", foco: "50% 30%", joao: { pose: "voando", humor: "surpreso", x: 60, y: 40, largura: 150 }, alt: "O João voando ao lado de uma casa de tijolo" },
  score: { foto: "grade-bege", tom: "planta", joao: { pose: "frente", humor: "curioso", x: 220, y: 96, largura: 120 }, alt: "O João conferindo o próprio nome diante de um prédio" },
  fgts: { foto: "ceu-azul", foco: "50% 70%", joao: { pose: "voando", carga: "barro", humor: "gentil", x: 70, y: 40, largura: 170 }, alt: "O João voando no céu azul com um barro no bico" },
  juntar: { foto: "fachada-marrom", foco: "50% 40%", joao: { pose: "voando", carga: "barro", humor: "feliz", x: 330, y: 30, largura: 150, virado: true }, alt: "O João trazendo barro para a obra" },
  custos: { foto: "beiral-laranja", foco: "50% 20%", joao: { pose: "perfil", humor: "pensativo", x: 380, y: 26, largura: 120, virado: true }, alt: "O João pensativo no beiral de uma casa laranja" },
  documentos: { foto: "grade-bege", foco: "50% 70%", joao: { pose: "bicando", carga: null, humor: "curioso", x: 220, y: 150, largura: 120 }, alt: "O João conferindo os papéis diante de um prédio" },
  banco: { foto: "cubos", tom: "planta", foco: "50% 40%", joao: { pose: "frente", humor: "gentil", x: 220, y: 116, largura: 120 }, alt: "O João diante de um prédio geométrico" },
  negado: { foto: "fachada-marrom", tom: "planta", foco: "50% 40%", joao: { pose: "perfil", humor: "triste", x: 70, y: 120, largura: 120 }, alt: "O João pensativo depois de um não do banco" },
  avaliacao: { foto: "telhado-azul", foco: "50% 30%", joao: { pose: "voando", humor: "curioso", x: 360, y: 120, largura: 130 }, alt: "O João sobrevoando um telhado para a avaliação" },
  apartamento: { foto: "fachada-amarela", foco: "50% 30%", joao: { pose: "voando", carga: "chave", humor: "feliz", x: 330, y: 50, largura: 150 }, alt: "O João chegando a um prédio de apartamentos com a chave" },
  casa: { foto: "telhado-ceu", foco: "50% 50%", joao: { pose: "voando", carga: "chave", humor: "feliz", x: 330, y: 30, largura: 160 }, alt: "O João voando com a chave sobre o telhado de uma casa" },
  chave: { foto: "empena-tijolo", foco: "50% 45%", joao: { pose: "comemora", humor: "feliz", x: 372, y: 70, largura: 140 }, alt: "O João comemorando com a chave diante de uma casa" },
  vender: { foto: "cubos", foco: "50% 40%", joao: { pose: "frente", humor: "piscando", x: 220, y: 116, largura: 120 }, alt: "O João diante de um prédio de cubos amarelos" },
} satisfies Record<string, CardFoto>;

export type IdCard = keyof typeof CARDS | `cena-${NomeCena}`;

export const ehFoto = (c: CardEmail): c is CardFoto => "foto" in c;

/** Todos os cards a gerar: os escolhidos e um só com o desenho para cada cena. */
export function todosOsCards(): { id: string; card: CardEmail }[] {
  const escolhidos = Object.entries(CARDS).map(([id, card]) => ({ id, card: card as CardEmail }));
  const cenas = (Object.keys(CENAS) as NomeCena[]).map((cena) => ({ id: `cena-${cena}`, card: { cena, fundo: "planta" as Fundo, alt: CENAS[cena].titulo } }));
  return [...escolhidos, ...cenas];
}

export const cardDe = (id: string) => todosOsCards().find((c) => c.id === id)?.card;
