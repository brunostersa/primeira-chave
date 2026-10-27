"use client";

import dynamic from "next/dynamic";

/**
 * Os mapas carregam os próprios dados (desenho + números): só baixam nas páginas que
 * os mostram, e não em todo guia que usa a tabela de cálculos.
 */
export const MapaCapitais = dynamic(() => import("./MapaCapitais").then((m) => m.MapaCapitais));
export const MapaSaoPaulo = dynamic(() => import("./MapaSaoPaulo").then((m) => m.MapaSaoPaulo));
