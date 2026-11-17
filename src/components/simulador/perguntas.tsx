import type { ReactNode } from "react";
import type { Perfil } from "@/lib/financiamento/engine";

export type Opcao = { valor: string; rotulo: string; sub?: string };

type Base = {
  chave: string;
  pergunta: (p: Perfil) => string;
  ajuda: (p: Perfil) => ReactNode;
};

export type Pergunta =
  | (Base & { tipo: "escolha"; campo: keyof Perfil; opcoes: Opcao[] })
  | (Base & { tipo: "idade"; rotulo: string })
  | (Base & { tipo: "dinheiro"; campo: keyof Perfil; rotulo: string })
  | (Base & { tipo: "guardado" });

const junto = (p: Perfil) => p.quem === "junto";

/**
 * A entrada do simulador: só o que muda o número de verdade. O resto (dívidas, carteira,
 * imóvel no nome, nome limpo, o imóvel em vista) a pessoa completa no painel do resultado.
 */
export const PERGUNTAS: Pergunta[] = [
  {
    chave: "quem",
    tipo: "escolha",
    campo: "quem",
    pergunta: () => "Você vai comprar sozinho ou com alguém?",
    ajuda: () => <>Comprar junto permite <b>somar as rendas</b>, e isso aumenta o valor que o banco empresta.</>,
    opcoes: [
      { valor: "sozinho", rotulo: "Sozinho", sub: "Só a minha renda" },
      { valor: "junto", rotulo: "Com outra pessoa", sub: "Cônjuge, parceiro ou parente" },
    ],
  },
  {
    chave: "idade",
    tipo: "idade",
    rotulo: "Idade em anos",
    pergunta: (p) => (junto(p) ? "Qual a idade de quem é mais velho?" : "Quantos anos você tem?"),
    ajuda: () => <>O banco soma a idade ao prazo do financiamento. <b>Quanto mais jovem, mais tempo pra pagar</b> e menor a parcela.</>,
  },
  {
    chave: "renda",
    tipo: "dinheiro",
    campo: "renda",
    rotulo: "Renda por mês",
    pergunta: (p) => (junto(p) ? "Quanto vocês ganham por mês, somando?" : "Quanto você ganha por mês?"),
    ajuda: () => <>Use o valor do holerite <b>antes dos descontos</b>. Se for autônomo, a média do que entra por mês.</>,
  },
  {
    chave: "guardado",
    tipo: "guardado",
    pergunta: () => "Quanto você já tem pra essa compra?",
    ajuda: () => <>Poupança, investimentos e o saldo do FGTS. <b>Pode ser zero</b>: a gente monta o plano a partir daí.</>,
  },
];

export function respondida(q: Pergunta, p: Perfil): boolean {
  switch (q.tipo) {
    case "idade":
      return p.idade !== null && p.idade >= 18 && p.idade <= 80;
    case "dinheiro":
      return (p[q.campo] as number) > 0;
    case "guardado":
      // Zero vale. Com FGTS, a pergunta dos 3 anos de carteira (que aparece logo abaixo) é obrigatória:
      // sem ela o saldo não entra na conta e o número sai baixo à toa.
      return p.fgts > 0 || p.fgtsOpt === "naosei" ? p.fgts3 !== null : true;
    case "escolha":
      return !!p[q.campo];
  }
}

/** Ao sair da pergunta: campos de dinheiro deixados em branco viram "não tenho". */
export function fecharResposta(q: Pergunta, p: Perfil): Perfil {
  if (q.tipo !== "guardado") return p;
  return {
    ...p,
    reservaOpt: p.reserva > 0 ? "sim" : "nada",
    fgtsOpt: p.fgts > 0 ? "sim" : p.fgtsOpt === "naosei" ? "naosei" : "nao",
  };
}
