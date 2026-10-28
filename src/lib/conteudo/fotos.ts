/**
 * Fotos de arquitetura (Pexels, licença livre para uso comercial) que dão "tom de realidade"
 * ao lado dos desenhos. Sempre recortadas à la Niemeyer (arco ou onda) e com o desenho da
 * marca pousado nelas: a foto não substitui o João, faz companhia.
 * Arquivos em public/fotos/ (webp). Créditos em social/_fotos/CREDITOS.md.
 */

import type { NomeCena } from "@/components/brand/ilustracoes";

export type Foto = {
  src: string;
  alt: string;
  /** object-position da imagem dentro do recorte */
  pos?: string;
  /** Cena que pousa no arco, quando a da página tem texto (ilegível sobre a foto). */
  cena?: NomeCena;
};

/** Foto do topo de cada página, pelo id do nó em arvore.ts. */
export const FOTOS: Record<string, Foto> = {
  "leilao-caixa": { src: "/fotos/casa-isolada.webp", alt: "Casa de tijolos sozinha na beira da água", pos: "center 45%", cena: "documentos" },
  "minha-casa-minha-vida": { src: "/fotos/fachada-amarela.webp", alt: "Fachada amarela de prédio residencial com janelas" },
  "como-financiar-apartamento": { src: "/fotos/grade-de-janelas.webp", alt: "Fachada de prédio de tijolos com janelas em grade" },
  "sem-entrada-casa": { src: "/fotos/telhado-e-ceu.webp", alt: "Beiral de telhado de casa contra o céu", pos: "center 60%", cena: "casa" },
  "sac-ou-price": { src: "/fotos/volumes-em-degrau.webp", alt: "Volumes de um prédio em degrau, de baixo para cima" },
  "imovel-usado": { src: "/fotos/beiral-laranja.webp", alt: "Canto de uma casa antiga com beiral e janela de madeira", pos: "center 30%" },
  "avaliacao-do-imovel": { src: "/fotos/duas-faces.webp", alt: "Quina de um prédio: um lado de telha, o outro de metal", cena: "a-chave" },
};

/** Faixa de foto da home. */
export const FOTO_HOME: Foto = { src: "/fotos/varandas-amarelas.webp", alt: "Fachada amarela com varandas em balanço", pos: "center 40%" };
