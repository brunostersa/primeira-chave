import { describe, expect, it } from "vitest";
import { ARVORE } from "@/lib/conteudo/arvore";
import { aplicar, contaDoPlano, contaParaOJoao, ESTADO_VAZIO, fases, linhaDoTempo, resumoDoPlano, rotaDePreparo } from "./estado";
import { JORNADA } from "./jornada";
import { mascarar } from "./mascara";
import { deuVoltas, saidaPorRegra } from "./saidas";

describe("jornada", () => {
  it("todo item tem etapa com quem confirma e página publicada", () => {
    for (const e of JORNADA) {
      expect(e.confirma).toBeTruthy();
      expect(ARVORE.find((n) => n.id === e.pagina)?.status, e.pagina).toBe("publicado");
      expect(e.itens.length).toBeGreaterThan(0);
    }
  });
  it("os ids dos itens são únicos", () => {
    const ids = JORNADA.flatMap((e) => e.itens.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("nenhum texto diz que a Primeira Chave aprova", () => {
    expect(JSON.stringify(JORNADA)).not.toMatch(/validad|aprovad/i);
  });
});

describe("plano", () => {
  const com = aplicar(ESTADO_VAZIO, { renda: 6000, idade: 31, fgts: 18000, fgts_3_anos: true, tem_imovel_no_nome: false, reserva: 25000 });

  it("pede o que falta antes de calcular", () => {
    expect(contaDoPlano(ESTADO_VAZIO)).toEqual({ pronta: false, falta: ["renda", "idade"] });
  });
  it("sem imóvel, mostra o que a renda alcança", () => {
    const c = contaDoPlano(com);
    expect(c.pronta && c.temImovel).toBe(false);
    expect(c.pronta && c.imovel).toBeGreaterThan(0);
  });
  it("com imóvel, soma os custos de Goiás e avisa que é estimativa", () => {
    const e = aplicar(com, { preco_imovel: 245000, avaliacao_imovel: 244000 });
    const c = contaDoPlano(e);
    expect(c.pronta && c.custos?.exato).toBe(true);
    const j = contaParaOJoao(e);
    expect(j.status).toBe("estimativa");
    expect(JSON.stringify(j)).toMatch(/Não é aprovação de crédito/);
  });
  it("campo desconhecido não entra", () => {
    const e = aplicar(ESTADO_VAZIO, { cpf: "1" } as never);
    expect(JSON.stringify(e)).not.toContain("cpf");
  });
});

describe("linha do tempo", () => {
  const atual = (e: typeof ESTADO_VAZIO) => linhaDoTempo(e).find((p) => p.atual)?.id;
  const comDados = aplicar(ESTADO_VAZIO, { renda: 6000, idade: 31 });

  it("começa pelos dados e pede o imóvel antes da avaliação", () => {
    expect(atual(ESTADO_VAZIO)).toBe("dados");
    expect(atual(comDados)).toBe("preparo");
    const ids = linhaDoTempo(ESTADO_VAZIO).map((p) => p.id);
    expect(ids.slice(0, 3)).toEqual(["dados", "preparo", "documentos"]);
    expect(ids.indexOf("imovel")).toBe(ids.indexOf("avaliacao") - 1);
    expect(ids.at(-1)).toBe("chaves");
  });
  it("quem já está à frente começa dali, sem marcar o que veio antes", () => {
    const noBanco = { ...comDados, momento: "banco" as const };
    expect(atual(noBanco)).toBe("credito");
    expect(linhaDoTempo(noBanco).find((p) => p.id === "preparo")?.feita).toBe(false);
    expect(atual({ ...comDados, momento: "imovel" })).toBe("imovel");
  });
  it("sem renda e idade, os dados vêm primeiro em qualquer momento", () => {
    expect(atual({ ...ESTADO_VAZIO, momento: "banco" })).toBe("dados");
  });
  it("as cinco fases cobrem cada parada uma vez, na mesma ordem", () => {
    const paradas = linhaDoTempo(comDados);
    expect(fases(paradas).flatMap((f) => f.paradas.map((p) => p.id))).toEqual(paradas.map((p) => p.id));
    expect(fases(paradas).find((f) => f.atual)?.id).toBe("preparar");
  });
  it("só anda quando todos os itens da etapa foram resolvidos", () => {
    const preparado = { "cred-nome": "marcou", "prep-dividas": "marcou", "cred-fgts": "banco", "prep-reserva": "marcou" };
    const parcial = { ...comDados, etapas: { ...preparado, "doc-identidade": "marcou", "doc-renda": "banco" } as typeof comDados.etapas };
    expect(atual(parcial)).toBe("documentos");
    expect(atual({ ...parcial, etapas: { ...parcial.etapas, "doc-ir": "marcou" } })).toBe("credito");
  });
  it("item em atenção segura a etapa e fica visível", () => {
    const e = { ...comDados, etapas: { "cred-nome": "marcou", "prep-dividas": "atencao", "cred-fgts": "marcou" } as typeof comDados.etapas };
    const p = linhaDoTempo(e).find((x) => x.id === "preparo");
    expect(p).toMatchObject({ atual: true, atencao: true, feita: false, feitos: 2 });
  });
  it("com tudo marcado não sobra etapa atual", () => {
    const etapas = Object.fromEntries(JORNADA.flatMap((et) => et.itens.map((i) => [i.id, "banco"]))) as typeof comDados.etapas;
    const fim = { ...aplicar(comDados, { preco_imovel: 245000 }), etapas };
    expect(linhaDoTempo(fim).every((p) => p.feita && !p.atual)).toBe(true);
    expect(resumoDoPlano(fim).etapa_atual).toBeNull();
  });
});

describe("preparação", () => {
  const base = aplicar(ESTADO_VAZIO, { renda: 6000, idade: 31, reserva: 5000, fgts: 0, fgts_3_anos: false, tem_imovel_no_nome: false });

  it("só aparece depois de renda e idade", () => {
    expect(rotaDePreparo(ESTADO_VAZIO)).toEqual([]);
  });
  it("nome com restrição vem primeiro", () => {
    expect(rotaDePreparo(aplicar(base, { nome_limpo: false }))[0].titulo).toMatch(/CPF/);
  });
  it("diz quanto falta e em quantos meses com o valor da pessoa", () => {
    const passo = rotaDePreparo({ ...base, guardaMes: 1000 }).find((t) => t.titulo.startsWith("Junte"));
    expect(passo?.texto).toMatch(/Guardando R\$\s1\.000 por mês/);
  });
  it("sem o valor, usa 10% da renda como conta inicial", () => {
    expect(rotaDePreparo(base).find((t) => t.titulo.startsWith("Junte"))?.texto).toMatch(/R\$\s600 por mês/);
  });
  it("renda sem espaço para parcela ganha um caminho, não um fim", () => {
    const e = aplicar(ESTADO_VAZIO, { renda: 2000, idade: 31, dividas_mes: 590 });
    expect(rotaDePreparo(e).some((t) => t.titulo === "Abra espaço na parcela")).toBe(true);
  });
  it("não leva a etapa do banco para a preparação", () => {
    const e = aplicar(base, { preco_imovel: 245000, nome_limpo: true });
    expect(rotaDePreparo(e).some((t) => t.titulo.startsWith("Peça"))).toBe(false);
  });
});

describe("saídas", () => {
  it.each([
    ["quero morrer", "crise"],
    ["fui enganado pelo corretor", "disputa"],
    ["o vendedor não devolve meu sinal", "disputa"],
    ["quero falar com uma pessoa", "humano"],
  ])("%s", (t, tipo) => expect(saidaPorRegra(t)).toBe(tipo));
  it.each(["como evitar golpe na compra?", "quanto tempo o banco leva para processar?", "não aguento mais pagar aluguel", "o que é reclamar da avaliação?"])("não dispara em: %s", (t) => {
    expect(saidaPorRegra(t)).toBeNull();
  });
  it("mostra a saída na segunda resposta sem saber, e só uma vez", () => {
    const joao = (tipo: string) => ({ de: "joao", tipo });
    expect(deuVoltas([joao("nao_sei")])).toBe(false);
    expect(deuVoltas([joao("nao_sei"), { de: "pessoa" }, joao("nao_sei")])).toBe(true);
    expect(deuVoltas([joao("explicacao"), joao("nao_sei")])).toBe(false);
    expect(deuVoltas([joao("nao_sei"), joao("nao_sei"), { de: "saida" }, joao("nao_sei")])).toBe(false);
  });
});

describe("máscara", () => {
  it("tira CPF, e-mail e telefone", () => {
    const t = mascarar("meu cpf 123.456.789-09, ana@x.com, zap (62) 99999-1234");
    expect(t).toBe("meu cpf [CPF removido], [e-mail removido], zap [telefone removido]");
  });
  it("mantém valores em reais", () => {
    expect(mascarar("ganho R$ 6.000 e o imóvel custa 245000")).toBe("ganho R$ 6.000 e o imóvel custa 245000");
  });
});
