import type { ReactNode } from "react";
import type { Perfil } from "@/lib/financiamento/engine";

export type Opcao = { valor: string; rotulo: string; sub?: string };

type Base = {
  chave: string;
  pergunta: (p: Perfil) => string;
  ajuda: (p: Perfil) => ReactNode;
  pular?: (p: Perfil) => boolean;
};

export type Pergunta =
  | (Base & {
      tipo: "escolha";
      campo: keyof Perfil;
      opcoes: Opcao[];
      /** Se a opção `abreCom` for escolhida, pede um valor em reais em `campoValor`. */
      valor?: { campo: keyof Perfil; abreCom: string; rotulo: string };
    })
  | (Base & { tipo: "idade"; rotulo: string })
  | (Base & { tipo: "dinheiro"; campo: keyof Perfil; rotulo: string })
  | (Base & { tipo: "imovel" });

const junto = (p: Perfil) => p.quem === "junto";

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
    chave: "dividas",
    tipo: "escolha",
    campo: "dividasOpt",
    pergunta: (p) => (junto(p) ? "Vocês pagam alguma parcela hoje?" : "Você paga alguma parcela hoje?"),
    ajuda: () => <>Carro, empréstimo, consignado, cartão parcelado. <b>O banco desconta isso</b> do que sobra pra parcela da casa.</>,
    opcoes: [
      { valor: "nao", rotulo: "Não pago nenhuma" },
      { valor: "sim", rotulo: "Sim, pago parcelas", sub: "Vou dizer quanto somam" },
    ],
    valor: { campo: "dividas", abreCom: "sim", rotulo: "Quanto somam essas parcelas por mês?" },
  },
  {
    chave: "reserva",
    tipo: "escolha",
    campo: "reservaOpt",
    pergunta: () => "Tem dinheiro guardado pra essa compra?",
    ajuda: () => <>Poupança, investimentos, qualquer valor que você usaria na entrada. <b>Pode ser pouco</b>, a gente monta o plano.</>,
    opcoes: [
      { valor: "nada", rotulo: "Ainda não guardei nada" },
      { valor: "sim", rotulo: "Tenho um valor guardado", sub: "Vou dizer quanto" },
    ],
    valor: { campo: "reserva", abreCom: "sim", rotulo: "Quanto você tem guardado?" },
  },
  {
    chave: "fgts",
    tipo: "escolha",
    campo: "fgtsOpt",
    pergunta: () => "Você tem saldo de FGTS?",
    ajuda: () => <>Na compra, o FGTS pode virar parte da entrada. Depois, ele ainda ajuda a pagar a dívida. O saldo aparece no <b>app FGTS</b>, da Caixa.</>,
    opcoes: [
      { valor: "sim", rotulo: "Sim, sei o saldo" },
      { valor: "naosei", rotulo: "Tenho, mas não sei quanto", sub: "Tudo bem, vira uma tarefa no seu plano" },
      { valor: "nao", rotulo: "Não tenho", sub: "Ou sou autônomo" },
    ],
    valor: { campo: "fgts", abreCom: "sim", rotulo: "Saldo do FGTS" },
  },
  {
    chave: "fgts3",
    tipo: "escolha",
    campo: "fgts3",
    pular: (p) => p.fgtsOpt === "nao",
    pergunta: () => "Somando todos os empregos, você tem 3 anos ou mais de carteira assinada?",
    ajuda: () => <>É a regra pra <b>usar o FGTS na compra</b>. Também dá um desconto nos juros do Minha Casa Minha Vida.</>,
    opcoes: [
      { valor: "sim", rotulo: "Sim" },
      { valor: "nao", rotulo: "Não" },
      { valor: "naosei", rotulo: "Não sei", sub: "Dá pra ver na Carteira de Trabalho Digital" },
    ],
  },
  {
    chave: "imovel",
    tipo: "escolha",
    campo: "imovel",
    pergunta: (p) => (junto(p) ? "Algum de vocês já tem imóvel no nome?" : "Você já tem algum imóvel no seu nome?"),
    ajuda: () => <>Quem já tem imóvel <b>não entra no Minha Casa Minha Vida</b> e, em geral, não pode usar o FGTS.</>,
    opcoes: [
      { valor: "nao", rotulo: "Não tenho" },
      { valor: "sim", rotulo: "Sim, tenho" },
    ],
  },
  {
    chave: "nome",
    tipo: "escolha",
    campo: "nome",
    pergunta: () => "Seu nome está limpo?",
    ajuda: () => <>Com o nome negativado, <b>o banco recusa o crédito</b>. Dá pra consultar de graça.</>,
    opcoes: [
      { valor: "sim", rotulo: "Sim, está limpo" },
      { valor: "nao", rotulo: "Tenho alguma restrição" },
      { valor: "naosei", rotulo: "Não sei", sub: "A gente te mostra como ver" },
    ],
  },
  {
    chave: "achou",
    tipo: "escolha",
    campo: "achou",
    pergunta: () => "Você já achou o imóvel?",
    ajuda: () => <>Se ainda está procurando, a gente calcula <b>até quanto você pode buscar</b>.</>,
    opcoes: [
      { valor: "nao", rotulo: "Ainda estou procurando" },
      { valor: "sim", rotulo: "Já achei", sub: "Vou contar sobre ele" },
    ],
  },
  {
    chave: "imovelDados",
    tipo: "imovel",
    pular: (p) => p.achou !== "sim",
    pergunta: () => "Me conta sobre esse imóvel",
    ajuda: () => <>Use o preço que o vendedor está pedindo. Se o banco já avaliou, informe também: <b>ele financia com base na avaliação</b>, sem passar do preço.</>,
  },
];

export const perguntasVisiveis = (p: Perfil) => PERGUNTAS.filter((q) => !q.pular?.(p));

export function respondida(q: Pergunta, p: Perfil): boolean {
  switch (q.tipo) {
    case "idade":
      return p.idade !== null && p.idade >= 18 && p.idade <= 80;
    case "dinheiro":
      return (p[q.campo] as number) > 0;
    case "imovel":
      return p.valor >= 30000 && (!p.avaliou || p.avalReal > 0);
    case "escolha": {
      const v = p[q.campo];
      if (!v) return false;
      if (q.valor && v === q.valor.abreCom) return (p[q.valor.campo] as number) > 0;
      return true;
    }
  }
}
