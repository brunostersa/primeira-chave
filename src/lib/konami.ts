/** O código Konami (↑ ↑ ↓ ↓ ← → ← → B A), o easter egg clássico dos anos 2000. */
export const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

/** Acompanha as teclas: devolve true na tecla que completa o código (olha as últimas 10). */
export function criaKonami() {
  const ultimas: string[] = [];
  return (tecla: string) => {
    ultimas.push(tecla.toLowerCase());
    if (ultimas.length > KONAMI.length) ultimas.shift();
    if (ultimas.length < KONAMI.length || ultimas.some((t, i) => t !== KONAMI[i])) return false;
    ultimas.length = 0;
    return true;
  };
}
