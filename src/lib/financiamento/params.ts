/**
 * Regras usadas pelo motor. Percentuais em pontos (30 = 30%); juros NOMINAIS ao ano.
 *
 * Fonte de cada valor: o simulador da Caixa (simuladorhabitacao.caixa.gov.br, simulação
 * rápida "pela renda", conferido em 27/10/2026) e, por trás dele, as normas citadas em
 * docs/pesquisa/amparo-tecnico-juridico-caixa.md. Os casos conferidos viram testes em
 * engine.test.ts — se a Caixa mudar, o teste aponta.
 */
export const PARAMS = {
  comp: 30, // parcela máxima, % da renda bruta
  idadeLimite: 80.5, // idade + prazo, em anos
  prazoMax: 420, // meses
  itbi: 3, // % do imóvel (varia por cidade)
  cartorio: 1.5,
  avaliacao: 0.5,
  taxaAdm: 25, // R$/mês
  dfi: 0.0071, // seguro de danos, % do imóvel ao mês
  // Portaria MCID 333/2026 (rendas) e Conselho Curador do FGTS 03/2026 (tetos F3/F4).
  // Teto F1/F2 varia por município (R$ 210–275 mil); a Caixa usa R$ 210 mil sem a cidade.
  // Juros: os que o simulador da Caixa aplica para não cotista (efetivos 5,12 / 7,23 / 8,47 / 10,47%).
  faixas: [
    { faixa: 1, rendaAte: 3200, tetoImovel: 210000, juros: 5.0 },
    { faixa: 2, rendaAte: 5000, tetoImovel: 210000, juros: 7.0 },
    { faixa: 3, rendaAte: 9600, tetoImovel: 400000, juros: 8.16 },
    { faixa: 4, rendaAte: 13000, tetoImovel: 600000, juros: 10.0 },
  ],
  cotistaDesc: 0.5, // p.p. a menos para quem tem 3+ anos de FGTS (faixas 1–3)
  mcmvLtv: 80,
  // SBPE: a Caixa mostra 11,49% a.a. EFETIVOS (10,93% nominais) e simula em SAC.
  sbpeJuros: 10.93,
  sbpeSistema: "sac" as "sac" | "price",
  sbpeLtvUsado: 80,
  sbpeLtvNovo: 80,
  sfhTeto: 2250000,
};

export type Params = typeof PARAMS;

/** Data das referências, mostrada nas páginas. */
export const PARAMS_ATUALIZADOS_EM = "2026-10";
