/**
 * O cartão flutuante do Recado (RecadoFlutuante): um aviso que leva ao formulário do rodapé.
 * Usa as mesmas regras do convite (lib/recado/convite.ts): fechar silencia os dois por 14 dias,
 * inscrito nunca mais vê. Aqui ficam só as contas de quando ele aparece.
 */

/** Não aparece antes disso (ms), mesmo que a pessoa role rápido. */
export const ESPERA_MINIMA = 8000;
/** Fração da página lida antes de aparecer. */
export const FRACAO_LIDA = 0.4;
/** Clicou em "Quero receber" e não se inscreveu: não volta nesta visita. */
export const QUIS = "recado:cartao-quis";

/** A pessoa já leu `fracao` da página? Página que cabe na tela conta como lida. */
export function leuOBastante(rolou: number, alturaPagina: number, alturaJanela: number, fracao = FRACAO_LIDA) {
  const total = alturaPagina - alturaJanela;
  if (total <= 0) return true;
  return rolou / total >= fracao;
}
