import { SITE } from "@/lib/site-config";
import type { FaseId } from "./sequencias";

/**
 * O convite do Recado no fim de um cálculo: quem termina uma conta (simulador, calculadora,
 * modelo baixado) chama `convidar()`, e um único <ConviteRecado /> no layout decide se mostra.
 *
 * Regras, para não virar pop-up chato:
 * - só depois que a pessoa USOU a ferramenta (nunca ao abrir a página);
 * - uma vez por visita; quem fechou não vê de novo por 14 dias; quem se inscreveu nunca mais;
 * - não aparece na página do próprio Recado e espera a pessoa parar de digitar.
 * Tudo isso mora no navegador (localStorage); se ele estiver bloqueado, o convite só não aparece.
 */

export type Convite = {
  /** De onde veio, como na inscrição: "simulador:resultado", "calculadora:calculadora-itbi"… */
  origem: string;
  /** A frase do topo, ligada ao que a pessoa acabou de fazer. */
  titulo?: string;
  fase?: FaseId;
  perfil?: object;
  /** Espera antes de aparecer (ms): dá tempo de ler o resultado. */
  espera?: number;
};

export const EVENTO = "recado:convite";
const INSCRITO = "recado:inscrito";
const FECHOU = "recado:fechou-em";
const VISTO = "recado:visto";
const PAUSA = 14 * 86400_000;

const ler = (s: Storage | undefined, k: string) => {
  try {
    return s?.getItem(k) ?? null;
  } catch {
    return null;
  }
};
const gravar = (s: Storage | undefined, k: string, v: string) => {
  try {
    s?.setItem(k, v);
  } catch {
    /* navegador sem armazenamento: segue sem lembrar */
  }
};
const local = () => (typeof window === "undefined" ? undefined : window.localStorage);
const sessao = () => (typeof window === "undefined" ? undefined : window.sessionStorage);

/** Pode mostrar agora? (inscrito, fechou há pouco ou já viu nesta visita = não) */
export function podeConvidar() {
  if (typeof window === "undefined" || !SITE.recado) return false;
  if (location.pathname.startsWith("/recado")) return false;
  if (ler(local(), INSCRITO)) return false;
  if (ler(sessao(), VISTO)) return false;
  const fechou = Number(ler(local(), FECHOU) || 0);
  return Date.now() - fechou > PAUSA;
}

export function convidar(c: Convite) {
  if (!podeConvidar()) return;
  window.dispatchEvent(new CustomEvent<Convite>(EVENTO, { detail: c }));
}

export const marcarVisto = () => gravar(sessao(), VISTO, "1");
export const marcarFechou = () => gravar(local(), FECHOU, String(Date.now()));
export const marcarInscrito = () => gravar(local(), INSCRITO, "1");

/** Títulos por tipo de ferramenta: o convite conversa com o que a pessoa acabou de fazer. */
export const TITULOS = {
  simulador: "Agora você tem o número. Quer o caminho, semana a semana?",
  calculadora: "Conta feita. Quer receber as próximas, uma por semana?",
  modelo: "Modelo baixado. Quer saber o que conferir antes de assinar?",
  mapa: "Quer acompanhar os preços e as regras, uma vez por semana?",
} as const;
