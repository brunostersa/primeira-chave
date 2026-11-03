"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { custosDaCompra, type Uf } from "@/lib/financiamento/custos";
import { calcular, PERFIL_VAZIO } from "@/lib/financiamento/engine";
import { brl } from "@/lib/format";

/** Régua nativa do navegador, sem o pássaro: o arrasto que a pessoa já conhece. */
function Regua({ id, rotulo, saida, min, max, step, valor, onChange }: { id: string; rotulo: string; saida: string; min: number; max: number; step: number; valor: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[15px]">
          {rotulo}
        </label>
        <output htmlFor={id} className="font-display text-xl font-semibold tabular-nums">
          {saida}
        </output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={valor} onChange={(e) => onChange(Number(e.target.value))} className="h-8 w-full cursor-pointer accent-[var(--ink)]" />
    </div>
  );
}

type Props = { preco: number; avaliacao: number; tipo: "usado" | "novo"; uf: Uf; itbiPct: number; rendaMinima: number | null };

/**
 * "Cabe no seu bolso?" com o preço desta casa já preenchido: a pessoa mexe na renda,
 * no FGTS e na idade e vê na hora a entrada, a parcela e o dinheiro que precisa ter.
 */
export function SimuladorCasa({ preco, avaliacao, tipo, uf, itbiPct, rendaMinima }: Props) {
  const [renda, setRenda] = useState(6000);
  const [fgts, setFgts] = useState(0);
  const [idade, setIdade] = useState(30);

  const conta = useMemo(() => {
    const r = calcular({
      ...PERFIL_VAZIO,
      idade,
      renda,
      dividasOpt: "nao",
      reservaOpt: "nada",
      fgtsOpt: fgts > 0 ? "sim" : "nao",
      fgts,
      fgts3: fgts > 0 ? "sim" : "nao",
      imovel: "nao",
      achou: "sim",
      valor: preco,
      tipo,
      avaliou: true,
      avalReal: avaliacao,
    });
    if (r.blocked) return { bloqueio: r.blocked } as const;
    const custos = custosDaCompra({ uf, valor: preco, financiado: r.P, itbiPct, primeiroImovelSfh: true });
    const fgtsNaEntrada = Math.min(r.fgtsUse, r.entrada);
    return {
      bloqueio: null,
      r,
      custos,
      fgtsNaEntrada,
      naMao: r.entrada - fgtsNaEntrada + custos.total,
      limitadoPelaRenda: r.extraRenda > 1,
      /** Entrada acima de 35% do preço: na prática, ainda não é a casa para essa renda. */
      entradaAlta: r.entrada > preco * 0.35,
      pctRenda: (r.price.first.pg / renda) * 100,
    } as const;
  }, [renda, fgts, idade, preco, avaliacao, tipo, uf, itbiPct]);

  return (
    <div className="grid gap-8 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-7">
        <Regua id="casa-renda" rotulo="Renda bruta da família, por mês" saida={brl(renda)} min={2000} max={20000} step={100} valor={renda} onChange={setRenda} />
        <Regua id="casa-fgts" rotulo="FGTS que dá para usar" saida={fgts ? brl(fgts) : "não vou usar"} min={0} max={80000} step={1000} valor={fgts} onChange={setFgts} />
        <Regua id="casa-idade" rotulo="Idade de quem é mais velho" saida={`${idade} anos`} min={18} max={70} step={1} valor={idade} onChange={setIdade} />
        <p className="text-sm text-muted">Sem outras dívidas. Renda bruta é o valor do holerite antes dos descontos; quem compra junto soma as rendas.</p>
      </div>

      <div aria-live="polite" className="flex flex-col gap-5">
        {!conta.bloqueio && conta.entradaAlta ? (
          <>
            <Badge tone="bad" className="self-start">
              Ainda não cabe
            </Badge>
            <p className="font-display text-3xl font-light leading-tight">
              Com essa renda o banco empresta só {brl(conta.r.P)}, e a entrada iria para {brl(conta.r.entrada)}.
            </p>
            <p className="text-ink-2">
              {conta.r.saiuMcmv && "O Minha Casa Minha Vida dessa faixa de renda só vai até um teto menor que o preço desta casa, então a conta vai pela linha de mercado, com juros maiores. "}
              {rendaMinima && <>A partir de {brl(rendaMinima)} de renda da família, a entrada volta para {brl(preco - avaliacao * 0.8)}.</>}
            </p>
          </>
        ) : conta.bloqueio ? (
          <>
            <Badge tone="bad" className="self-start">
              Ainda não cabe
            </Badge>
            <p className="font-display text-3xl font-light leading-tight">
              {conta.bloqueio === "idade" ? "Com essa idade o prazo fica curto demais para o banco." : "Com essa renda o banco ainda não empresta para esta casa."}
            </p>
            <p className="text-ink-2">Arraste a renda para a direita e veja a partir de quanto ela passa a caber.</p>
          </>
        ) : (
          <>
            <Badge tone={conta.limitadoPelaRenda ? "warn" : "ok"} className="self-start">
              {conta.limitadoPelaRenda ? "Cabe, com entrada maior" : "Cabe no seu bolso"}
            </Badge>
            <div>
              <p className="text-sm text-ink-2">Dinheiro na mão para pegar a chave</p>
              <p className="font-display text-[clamp(40px,5vw,64px)] font-semibold leading-none tabular-nums">
                <span className="marca-texto">{brl(conta.naMao)}</span>
              </p>
              <p className="mt-2 text-sm text-ink-2">
                Entrada {brl(conta.r.entrada)}
                {conta.fgtsNaEntrada > 0 && ` menos ${brl(conta.fgtsNaEntrada)} do FGTS`} + custos {brl(conta.custos.total)} (ITBI, cartório e avaliação).
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-paper p-4">
                <dt className="text-sm text-ink-2">Parcela PRICE estimada</dt>
                <dd className="font-display text-2xl font-semibold tabular-nums">{brl(conta.r.price.first.pg)}</dd>
                <dd className="text-xs text-muted">{Math.round(conta.pctRenda)}% da renda</dd>
              </div>
              <div className="rounded-xl bg-paper p-4">
                <dt className="text-sm text-ink-2">Parcela SAC estimada</dt>
                <dd className="font-display text-2xl font-semibold tabular-nums">{brl(conta.r.sac.first.pg)}</dd>
                <dd className="text-xs text-muted">cai até {brl(conta.r.sac.last)}</dd>
              </div>
              <div className="rounded-xl bg-paper p-4">
                <dt className="text-sm text-ink-2">O banco financia</dt>
                <dd className="font-display text-2xl font-semibold tabular-nums">{brl(conta.r.P)}</dd>
              </div>
              <div className="rounded-xl bg-paper p-4">
                <dt className="text-sm text-ink-2">Linha e prazo</dt>
                <dd className="font-display text-lg font-semibold">{conta.r.prog.curto}</dd>
                <dd className="text-xs text-muted">
                  {conta.r.prog.juros.toLocaleString("pt-BR")}% ao ano · {Math.round(conta.r.n / 12)} anos
                </dd>
              </div>
            </dl>
            <p className="rounded-xl border border-line px-4 py-3 text-sm text-ink-2">
              <b>Parcelas estimadas</b>, com as regras da {conta.r.prog.curto}. A casa aceita financiamento pela Caixa ou por outros bancos: cada um tem juros, seguros e laudo próprios, então a parcela final sai da proposta do banco que você escolher.
            </p>
            {conta.limitadoPelaRenda && (
              <p className="text-sm text-ink-2">
                Com essa renda o banco empresta {brl(conta.r.P)}, menos que os {brl(conta.r.P + conta.r.extraRenda)} que a casa permite. A diferença entra na entrada.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
