import { describe, expect, it } from "vitest";
import { leuOBastante } from "./cartao";

describe("cartão flutuante do Recado", () => {
  it("só aparece depois de 40% da página", () => {
    expect(leuOBastante(0, 3000, 800)).toBe(false);
    expect(leuOBastante(870, 3000, 800)).toBe(false);
    expect(leuOBastante(880, 3000, 800)).toBe(true);
  });

  it("página que cabe na tela conta como lida", () => {
    expect(leuOBastante(0, 700, 800)).toBe(true);
  });
});
