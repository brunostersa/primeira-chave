export const brl = (v: number) => "R$ " + Math.round(v).toLocaleString("pt-BR");

export const pct = (v: number, casas = 2) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas }) + "%";

/** Só os dígitos de um campo de dinheiro digitado ("R$ 6.000" → 6000). */
export const digitos = (v: string) => Number(v.replace(/\D/g, "")) || 0;

export const milhar = (n: number) => (n ? n.toLocaleString("pt-BR") : "");
