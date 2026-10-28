import { describe, expect, it } from "vitest";
import { criaKonami, KONAMI } from "./konami";

describe("código Konami", () => {
  it("completa só na última tecla", () => {
    const tecla = criaKonami();
    const respostas = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "A"].map(tecla);
    expect(respostas.slice(0, -1).some(Boolean)).toBe(false);
    expect(respostas.at(-1)).toBe(true);
  });

  it("errou, recomeça; um ↑ a mais no começo não estraga", () => {
    const tecla = criaKonami();
    ["ArrowUp", "x", ...KONAMI.slice(0, -1)].forEach(tecla);
    expect(tecla("a")).toBe(true);
    const outra = criaKonami();
    ["ArrowUp", "ArrowUp", ...KONAMI.slice(1, -1)].forEach(outra);
    expect(outra("a")).toBe(true);
  });
});
