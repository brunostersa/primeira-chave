"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { brl, digitos, milhar } from "@/lib/format";
import { aplicar, rotaDePreparo, type Estado, type Momento, type Parada } from "@/lib/joao/estado";
import { Numeros } from "./Painel";

const MOMENTOS: { id: Momento; rotulo: string }[] = [
  { id: "pesquisando", rotulo: "Só estou pesquisando" },
  { id: "dividas", rotulo: "Tenho dívida ou nome sujo" },
  { id: "entrada", rotulo: "Estou juntando a entrada" },
  { id: "imovel", rotulo: "Já achei um imóvel" },
  { id: "banco", rotulo: "Já estou falando com o banco" },
];
/** O meio de cada faixa: basta para a primeira estimativa, e a pessoa troca quando quiser. */
const FAIXAS = [
  { rotulo: "Até R$ 3 mil", valor: 2500 },
  { rotulo: "De R$ 3 a 5 mil", valor: 4000 },
  { rotulo: "De R$ 5 a 8 mil", valor: 6500 },
  { rotulo: "De R$ 8 a 12 mil", valor: 10000 },
  { rotulo: "Mais de R$ 12 mil", valor: 14000 },
];
const opcao = "flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-line px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:border-ink";
const campo = "h-12 w-full rounded-xl border-[1.5px] border-line bg-surface px-3 text-base outline-none focus:border-ink";

type Passo = "momento" | "renda" | "idade" | "reserva" | "preco" | "resultado";
type Props = {
  estado: Estado;
  mudar: (e: Estado) => void;
  atual?: Parada;
  guardar: ReactNode;
  pular: () => void;
  terminar: (destino: "conversa" | "plano") => void;
};

type Pergunta = { titulo: string; motivo: string; dinheiro?: boolean; valor: string; mudarValor: (v: string) => void; enviar: (e: FormEvent) => void; children?: ReactNode };

function Pergunta({ titulo, motivo, dinheiro, valor, mudarValor, enviar, children }: Pergunta) {
  return (
    <form onSubmit={enviar} className="joao-entra flex w-full flex-col gap-3">
      <div>
        <h2 className="font-display text-xl font-semibold">{titulo}</h2>
        <p className="mt-1 text-sm text-ink-2">{motivo}</p>
      </div>
      {children}
      <input
        aria-label={titulo}
        inputMode="numeric"
        placeholder={dinheiro ? "R$" : "Anos"}
        value={valor}
        onChange={(e) => mudarValor(dinheiro ? milhar(digitos(e.target.value)) : e.target.value.replace(/\D/g, "").slice(0, 3))}
        className={campo}
      />
      <Button type="submit" disabled={!digitos(valor)}>
        Continuar
        <ArrowRight />
      </Button>
    </form>
  );
}

/** Primeira visita: o momento da pessoa, três dados com motivo e o primeiro número. Tudo pode ser pulado. */
export function Comeco({ estado, mudar, atual, guardar, pular, terminar }: Props) {
  const [passo, setPasso] = useState<Passo>("momento");
  const [faixa, setFaixa] = useState(false);
  const [valor, setValor] = useState("");
  const ordem: Passo[] = ["momento", "renda", "idade", "reserva", ...(estado.momento === "imovel" ? (["preco"] as const) : []), "resultado"];
  const posicao = ordem.indexOf(passo);
  const topo = useRef<HTMLDivElement>(null);

  // Cada passo abre do começo, mesmo que o anterior tenha precisado de rolagem.
  useEffect(() => {
    topo.current?.parentElement?.scrollTo({ top: 0 });
  }, [passo]);

  const ir = (p: Passo) => {
    setValor("");
    setPasso(p);
  };
  const avancar = () => ir(ordem[posicao + 1]);

  const escolher = (momento: Momento) => {
    const nome = momento === "dividas" && !estado.perfil.nome ? "naosei" : estado.perfil.nome;
    mudar({ ...estado, momento, perfil: { ...estado.perfil, nome } });
    ir("renda");
  };
  const salvar = (e: FormEvent, p: Exclude<Passo, "momento" | "resultado">) => {
    e.preventDefault();
    const n = digitos(valor);
    if (!n) return;
    if (p === "renda") setFaixa(false);
    mudar(aplicar(estado, p === "renda" ? { renda: n } : p === "idade" ? { idade: n } : p === "reserva" ? { reserva: n } : { preco_imovel: n }));
    avancar();
  };

  const rota = rotaDePreparo(estado)[0];
  return (
    <div ref={topo} className="m-auto flex w-full max-w-md flex-col gap-4 py-2">
      {passo !== "momento" && (
        <div className="flex items-center justify-between gap-3 text-sm">
          <button type="button" onClick={() => ir(ordem[posicao - 1])} className="inline-flex min-h-9 items-center gap-1 font-semibold">
            <ArrowLeft className="size-4" aria-hidden />
            Voltar
          </button>
          <span className="font-mono text-xs text-ink-2">
            {posicao} de {ordem.length - 1}
          </span>
        </div>
      )}

      {passo === "momento" && (
        <div className="joao-entra flex flex-col items-center gap-3 text-center">
          <JoaoDeBarro pose="frente" humor="gentil" className="w-12" />
          <p className="text-sm leading-relaxed">Oi, eu sou o João, uma inteligência artificial da Primeira Chave. Explico a compra do imóvel em Goiânia. Não sou banco e não aprovo crédito.</p>
          <h2 className="font-display text-xl font-semibold">Em que momento você está?</h2>
          <div className="flex w-full flex-col gap-2">
            {MOMENTOS.map((m) => (
              <button key={m.id} type="button" onClick={() => escolher(m.id)} className={opcao}>
                {m.rotulo}
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-2">Sem cadastro. Não peço documentos: evite escrever CPF aqui.</p>
        </div>
      )}

      {passo === "renda" && (
        <Pergunta key="renda" valor={valor} mudarValor={setValor} enviar={(e) => salvar(e, "renda")} titulo="Qual a renda da família por mês?" motivo="Uso a renda só para estimar a parcela. Vale o valor antes dos descontos, somando quem vai comprar junto." dinheiro>
          <div className="grid grid-cols-2 gap-2">
            {FAIXAS.map((f) => (
              <button
                key={f.valor}
                type="button"
                onClick={() => {
                  setFaixa(true);
                  mudar(aplicar(estado, { renda: f.valor }));
                  avancar();
                }}
                className={`${opcao} justify-center`}
              >
                {f.rotulo}
              </button>
            ))}
          </div>
          <p className="text-sm text-ink-2">Ou digite o valor:</p>
        </Pergunta>
      )}

      {passo === "idade" && <Pergunta key="idade" valor={valor} mudarValor={setValor} enviar={(e) => salvar(e, "idade")} titulo="Qual a idade de quem é mais velho?" motivo="A idade define o prazo máximo do financiamento, e o prazo muda a parcela." />}

      {passo === "reserva" && (
        <Pergunta key="reserva" valor={valor} mudarValor={setValor} enviar={(e) => salvar(e, "reserva")} titulo="Quanto você tem guardado?" motivo="Serve para ver o que falta para a entrada e os custos. O FGTS entra depois, no plano." dinheiro>
          <button
            type="button"
            onClick={() => {
              mudar(aplicar(estado, { reserva: 0 }));
              avancar();
            }}
            className={`${opcao} justify-center`}
          >
            Ainda não tenho nada guardado
          </button>
          <p className="text-sm text-ink-2">Ou digite o valor:</p>
        </Pergunta>
      )}

      {passo === "preco" && (
        <Pergunta key="preco" valor={valor} mudarValor={setValor} enviar={(e) => salvar(e, "preco")} titulo="Qual o preço do imóvel?" motivo="Com o preço, a conta passa a ser a desse imóvel. Sem ele, mostro o que a renda alcança." dinheiro>
          <button type="button" onClick={avancar} className={`${opcao} justify-center`}>
            Ainda não sei o preço
          </button>
          <p className="text-sm text-ink-2">Ou digite o valor:</p>
        </Pergunta>
      )}

      {passo === "resultado" && (
        <div className="joao-entra flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold">Seu primeiro número</h2>
          <Numeros estado={estado} />
          {faixa && <p className="text-xs text-ink-2">Usei {brl(estado.perfil.renda)}, o meio da faixa. Troque pelo valor certo em Seus dados.</p>}
          <div className="rounded-xl bg-mark-soft p-3 text-sm">
            <b className="block">{rota ? `Próximo passo: ${rota.titulo}` : `Próximo passo: ${atual?.nome ?? "seu plano"}`}</b>
            {rota?.texto}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => terminar("conversa")}>Conversar com o João</Button>
            <Button variant="outline" onClick={() => terminar("plano")}>
              Ver meu plano
            </Button>
          </div>
          <div className="border-t border-line pt-3">
            <p className="mb-2 text-sm text-ink-2">Quer voltar depois de outro celular?</p>
            {guardar}
          </div>
        </div>
      )}

      {passo !== "resultado" && (
        <button type="button" onClick={pular} className="self-center text-sm text-ink-2 underline underline-offset-2 hover:text-ink">
          Prefiro perguntar direto
        </button>
      )}
    </div>
  );
}
