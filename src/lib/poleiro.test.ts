import { describe, expect, it } from "vitest";
import { arco, escolhePoleiro, fracaoDoPoleiro, ponto, pontoDePouso, pousosAoLongo } from "./poleiro";

const tela = { largura: 400, altura: 800, topo: 64 };

describe("onde o João de passagem pousa", () => {
  it("pousa na borda de cima, no ponto pedido", () => {
    expect(pontoDePouso({ left: 100, top: 300, width: 200, height: 50 }, tela, 0.5)).toEqual({ x: 200, y: 300 });
  });

  it("não pousa escondido atrás do cabeçalho nem colado no rodapé da tela", () => {
    expect(pontoDePouso({ left: 100, top: 80, width: 200, height: 50 }, tela, 0.5)).toBeNull();
    expect(pontoDePouso({ left: 100, top: 700, width: 200, height: 50 }, tela, 0.5)).toBeNull();
  });

  it("não pousa fora da tela: puxa o ponto para dentro, ou desiste", () => {
    expect(pontoDePouso({ left: 300, top: 300, width: 300, height: 50 }, tela, 0.9)!.x).toBe(372);
    expect(pontoDePouso({ left: 390, top: 300, width: 200, height: 50 }, tela, 0.5)).toBeNull();
  });

  it("lê o data-poleiro: fração de 0 a 1, o resto sorteia", () => {
    expect(fracaoDoPoleiro("0.85")).toBe(0.85);
    expect(fracaoDoPoleiro("")).toBeUndefined();
    expect(fracaoDoPoleiro("2")).toBeUndefined();
  });

  it("escolhe só entre os poleiros visíveis", () => {
    const candidatos = [
      { caixa: { left: 0, top: -200, width: 200, height: 40 } },
      { caixa: { left: 50, top: 400, width: 100, height: 40 }, fracao: 0.5 },
    ];
    expect(escolhePoleiro(candidatos, tela, () => 0.99)).toEqual({ i: 1, fracao: 0.5, ponto: { x: 100, y: 400 } });
    expect(escolhePoleiro([candidatos[0]], tela)).toBeNull();
  });

  it("o voo começa e termina nos pontos certos e sobe no meio", () => {
    const a = { x: 0, y: 300 };
    const b = { x: 300, y: 300 };
    const c = arco(a, b, 100);
    expect(ponto(c, 0)).toEqual(a);
    expect(ponto(c, 1)).toEqual(b);
    expect(ponto(c, 0.5).y).toBeLessThan(300);
  });

  it("o bando pousa lado a lado, sem um em cima do outro", () => {
    const pontos = pousosAoLongo({ left: 40, top: 300, width: 300, height: 50 }, tela, 40);
    expect(pontos.length).toBe(7);
    for (let k = 1; k < pontos.length; k++) expect(pontos[k].x - pontos[k - 1].x).toBeGreaterThanOrEqual(40);
    expect(pontos.every((p) => p.y === 300 && p.x >= 28 && p.x <= 372)).toBe(true);
    expect(pousosAoLongo({ left: 40, top: 10, width: 300, height: 50 }, tela, 40)).toEqual([]);
  });
});
