"use client";

import type React from "react";
import { useState, useSyncExternalStore } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/utils";
import { CampoDinheiro } from "@/components/simulador/campos";
import { custosDaCompra, TABELAS_REGISTRO, type Uf } from "@/lib/financiamento/custos";
import { ganhoDeCapital, type Mes, type ResultadoGanho } from "@/lib/financiamento/ganho-capital";
import { PARAMS } from "@/lib/financiamento/params";
import { brl } from "@/lib/format";

/** Calculadora de ITBI: valor × alíquota da cidade. A base é o maior entre preço e valor venal. */
export function CalculadoraItbi({ aliquotaPadrao }: { aliquotaPadrao: number }) {
  const [valor, setValor] = useState(250_000);
  const [aliquota, setAliquota] = useState(aliquotaPadrao);
  const itbi = (valor * aliquota) / 100;
  return (
    <Card variant="strong" className="grid gap-5 md:grid-cols-[1fr_1fr]">
      <div className="flex flex-col gap-4">
        <CampoDinheiro id="itbi-valor" rotulo="Valor do imóvel (o maior entre o preço e o valor da prefeitura)" valor={valor} onChange={setValor} />
        <div className="flex flex-col gap-2">
          <label htmlFor="itbi-aliquota" className="text-[15px] font-semibold">
            Alíquota da sua cidade (%)
          </label>
          <input
            id="itbi-aliquota"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={aliquota}
            onChange={(e) => setAliquota(Number(e.target.value) || 0)}
            className="w-32 rounded-xl border-[1.5px] border-ink bg-surface px-4 py-3 font-display text-2xl"
          />
          <span className="text-sm text-ink-2">A maioria das cidades cobra entre 2% e 3%. Confira no site da prefeitura.</span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-1 rounded-xl bg-mark p-5">
        <span className="text-sm">ITBI a pagar</span>
        <b className="font-display text-5xl leading-none tabular-nums">{brl(itbi)}</b>
        <span className="text-sm">O FGTS não paga o ITBI: esse valor sai do seu bolso.</span>
      </div>
    </Card>
  );
}

const mesTexto = (m: Mes) => `${m.ano}-${String(m.mes).padStart(2, "0")}`;
const lerMes = (v: string): Mes | null => {
  const [ano, mes] = v.split("-").map(Number);
  return ano > 1900 && mes >= 1 && mes <= 12 ? { ano, mes } : null;
};
const semAssinatura = () => () => {};
const MES_DO_BUILD: Mes = { ano: 2026, mes: 11 };
let hojeCache: Mes | null = null;
const mesDeHoje = () => {
  const d = new Date();
  if (!hojeCache || hojeCache.ano !== d.getFullYear() || hojeCache.mes !== d.getMonth() + 1) hojeCache = { ano: d.getFullYear(), mes: d.getMonth() + 1 };
  return hojeCache;
};
const mesDoBuild = () => MES_DO_BUILD;
const pct = (x: number) => `${Math.round(x * 100)}%`;

function CampoMes({ id, rotulo, valor, onChange }: { id: string; rotulo: string; valor: Mes; onChange: (m: Mes) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {rotulo}
      </label>
      <input
        id={id}
        type="month"
        min="1950-01"
        value={mesTexto(valor)}
        onChange={(e) => {
          const m = lerMes(e.target.value);
          if (m) onChange(m);
        }}
        className="h-[62px] w-full max-w-xs rounded-xl border-[1.5px] border-ink bg-surface px-4 font-display text-xl"
      />
    </div>
  );
}

/** Uma etapa da conta, numerada e separada da anterior por um traço. */
function Grupo({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-line [&:not(:first-child)]:border-t [&:not(:first-child)]:pt-6">
      {/* float + w-full: a legend vira bloco normal e fica dentro do traço do separador */}
      <legend className="float-left mb-4 flex w-full items-center gap-3">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs text-paper">{n}</span>
        <span className="font-display text-xl font-semibold leading-tight">{titulo}</span>
      </legend>
      <div className="clear-left flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}

/** ITBI + escritura e registro da compra, estimados pelos padrões do simulador. */
const PCT_CUSTOS_COMPRA = PARAMS.itbi + PARAMS.cartorio;

/** Caixa de marcar que, marcada, abre o campo que depende dela. */
function Marcar({ marcado, onChange, extra, children }: { marcado: boolean; onChange: (v: boolean) => void; extra?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-start gap-3 text-[15px]">
        <input type="checkbox" checked={marcado} onChange={(e) => onChange(e.target.checked)} className="mt-1 size-5 shrink-0 accent-ink" />
        <span>{children}</span>
      </label>
      {marcado && extra}
    </div>
  );
}

type LinhaConta = { sinal: "" | "−" | "=" | "×"; rotulo: string; valor?: number; detalhe?: string; final?: boolean };

/** A conta "de armar": sinal à esquerda, valores alinhados à direita e um traço antes de cada resultado. */
function Conta({ linhas }: { linhas: LinhaConta[] }) {
  return (
    <div className="mt-1 flex flex-col rounded-lg bg-paper/60 px-4 py-3 text-[15px]" role="table" aria-label="A conta do imposto">
      {linhas.map((l, i) => {
        const resultado = l.sinal === "=";
        return (
          <div
            key={i}
            role="row"
            className={cn(
              "grid grid-cols-[1.25rem_minmax(0,1fr)_auto] items-baseline gap-x-2 py-1",
              resultado && "mt-1 border-t-[1.5px] border-ink pt-2 font-semibold",
              l.final && "border-double border-t-4",
            )}
          >
            <span role="cell" aria-hidden className="font-mono text-lg leading-none text-ink-2">
              {l.sinal}
            </span>
            <span role="cell">
              {l.rotulo}
              {l.detalhe && <span className="block text-xs font-normal text-ink-2">{l.detalhe}</span>}
            </span>
            <span role="cell" className={cn("text-right font-mono tabular-nums", l.final && "text-lg")}>
              {l.valor === undefined ? "" : brl(l.valor)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const MOTIVO: Record<NonNullable<ResultadoGanho["isencao"]>, string> = {
  "pequeno-valor": "Venda de até R$ 35 mil no mês é isenta.",
  "unico-imovel": "Único imóvel vendido por até R$ 440 mil: isento.",
  reaplicacao: "Todo o dinheiro vai para outro residencial em 180 dias: isento.",
  "antes-1969": "Imóvel comprado até 1969 tem redução de 100%: isento.",
};

/**
 * Estimativa do imposto sobre ganho de capital na venda (pessoa física). Tudo o que a Receita
 * deixa abater do custo e da venda, os redutores por tempo de posse e as isenções; regras e
 * fontes em src/lib/financiamento/ganho-capital.ts.
 */
export function CalculadoraGanhoCapital() {
  const [compra, setCompra] = useState(180_000);
  const [aquisicao, setAquisicao] = useState<Mes>({ ano: 2016, mes: 6 });
  const [reformas, setReformas] = useState(30_000);
  const [venda, setVenda] = useState(280_000);
  const [pagouCustos, setPagouCustos] = useState(true);
  const [corretorVenda, setCorretorVenda] = useState(true);
  const [pctCorretorVenda, setPctCorretorVenda] = useState(6);
  const [unico, setUnico] = useState(false);
  const [recompra, setRecompra] = useState(false);
  const [reaplicado, setReaplicado] = useState(0);
  // A venda é "este mês" para quem abre a página, não o mês do build estático.
  const alienacao = useSyncExternalStore(semAssinatura, mesDeHoje, mesDoBuild);

  const custosCompra = pagouCustos ? Math.round((compra * PCT_CUSTOS_COMPRA) / 100) : 0;
  const corretagemVenda = corretorVenda ? (venda * pctCorretorVenda) / 100 : 0;
  const r = ganhoDeCapital({
    compra,
    custosCompra,
    corretagemCompra: 0,
    reformas,
    juros: 0,
    venda,
    corretagemVenda,
    aquisicao,
    alienacao,
    unicoImovel: unico,
    reaplicado: recompra ? reaplicado : 0,
  });
  // A conta armada, de cima para baixo: cada "=" fecha a subtração de cima.
  const conta: LinhaConta[] = [{ sinal: "", rotulo: "Venda", valor: venda }];
  if (corretagemVenda > 0) conta.push({ sinal: "−", rotulo: `Corretagem (${String(pctCorretorVenda).replace(".", ",")}%)`, valor: corretagemVenda });
  conta.push({ sinal: "−", rotulo: "Custo do imóvel", valor: r.custo, detalhe: [`compra ${brl(compra)}`, reformas > 0 && `reformas ${brl(reformas)}`, custosCompra > 0 && `ITBI e cartório ${brl(custosCompra)}`].filter(Boolean).join(" + ") });
  conta.push({ sinal: "=", rotulo: "Lucro (ganho de capital)", valor: r.ganho });
  if (!r.isencao) {
    const reducao = r.ganho * r.reducaoTempo;
    const isentoNovo = (r.ganho - reducao) * r.isentoReaplicacao;
    if (reducao >= 1 || isentoNovo >= 1) {
      if (reducao >= 1) conta.push({ sinal: "−", rotulo: `Desconto por tempo de posse (${pct(r.reducaoTempo)})`, valor: reducao });
      if (isentoNovo >= 1) conta.push({ sinal: "−", rotulo: `Parte isenta pelo novo imóvel (${pct(r.isentoReaplicacao)})`, valor: isentoNovo });
      conta.push({ sinal: "=", rotulo: "Base do imposto", valor: r.base });
    }
    conta.push({ sinal: "×", rotulo: r.base > 5_000_000 ? "Alíquota (15% a 22,5%, por faixa)" : "Alíquota de 15%" });
    conta.push({ sinal: "=", rotulo: "Imposto", valor: r.imposto, final: true });
  }

  return (
    <Card variant="strong" className="grid gap-6 md:grid-cols-[1fr_1fr]">
      <div className="flex flex-col gap-6">
        <Grupo n={1} titulo="Na compra">
          <CampoDinheiro id="gc-compra" rotulo="Quanto você pagou no imóvel" ajuda="O que consta na matrícula ou na escritura" valor={compra} onChange={setCompra} />
          <CampoMes id="gc-aquisicao" rotulo="Quando comprou" valor={aquisicao} onChange={setAquisicao} />
          <CampoDinheiro id="gc-reforma" rotulo="Reformas e obras com nota fiscal" valor={reformas} onChange={setReformas} />
          <Marcar marcado={pagouCustos} onChange={setPagouCustos}>
            Paguei ITBI, escritura e registro <span className="text-ink-2">(estimamos {brl(Math.round((compra * PCT_CUSTOS_COMPRA) / 100))})</span>
          </Marcar>
        </Grupo>
        <Grupo n={2} titulo="Na venda">
          <CampoDinheiro id="gc-venda" rotulo="Por quanto vai vender" valor={venda} onChange={setVenda} />
          <Marcar marcado={corretorVenda} onChange={setCorretorVenda} extra={
              <div className="max-w-xs">
                <div className="flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="gc-pct-venda" className="text-[15px] font-semibold">
                      Comissão do corretor
                    </label>
                    <output htmlFor="gc-pct-venda" className="font-display text-xl font-semibold tabular-nums">
                      {String(pctCorretorVenda).replace(".", ",")}% · {brl(corretagemVenda)}
                    </output>
                  </div>
                  <input
                    id="gc-pct-venda"
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={pctCorretorVenda}
                    onChange={(e) => setPctCorretorVenda(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer accent-ink"
                  />
                  <div className="flex justify-between font-mono text-xs text-muted">
                    <span>0%</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>
            }
          >
            Vou pagar corretor
          </Marcar>
        </Grupo>
        <Grupo n={3} titulo="Possíveis cenários de isenção">
          <Marcar marcado={unico} onChange={setUnico}>
            É meu único imóvel e não vendi outro nos últimos 5 anos
          </Marcar>
          <Marcar
            marcado={recompra}
            onChange={(v) => {
              setRecompra(v);
              if (v && !reaplicado) setReaplicado(Math.round(venda - corretagemVenda));
            }}
            extra={<CampoDinheiro id="gc-reaplicado" rotulo="Quanto vai usar nele (a isenção é proporcional)" valor={reaplicado} onChange={setReaplicado} />}
          >
            Vou comprar outro imóvel residencial em até 180 dias <span className="text-ink-2">(uma vez a cada 5 anos)</span>
          </Marcar>
        </Grupo>
        <span className="text-sm text-ink-2">Custos, comissão e reformas só abatem com comprovante e se estiverem na sua declaração do imposto de renda. Corretor pago na compra e juros do financiamento também podem abater: confirme com um contador.</span>
      </div>
      <div className="flex flex-col justify-start gap-3 self-start rounded-xl bg-mark p-5 md:sticky md:top-24">
        <span className="text-sm">Imposto estimado</span>
        <b className="font-display text-5xl leading-none tabular-nums">{r.isencao ? "Isento" : brl(r.imposto)}</b>
        <span className="text-sm">{r.isencao ? MOTIVO[r.isencao] : "Se vender este mês. A conta:"}</span>
        <Conta linhas={conta} />
        <span className="text-sm">Estimativa com as regras da Receita. Confirme com um contador antes de vender e pague por DARF até o último dia útil do mês seguinte.</span>
      </div>
    </Card>
  );
}

/**
 * Custos da compra além da entrada: ITBI + registro pela tabela do estado + avaliação.
 * SP e GO com tabela oficial; os demais estados ficam na estimativa do motor.
 */
export function CalculadoraCustos() {
  const [uf, setUf] = useState<Uf | "outro">("SP");
  const [valor, setValor] = useState(300_000);
  const [financiado, setFinanciado] = useState(240_000);
  const [itbiPct, setItbiPct] = useState(PARAMS.itbi);
  const [primeiro, setPrimeiro] = useState(false);
  const c = custosDaCompra({ uf, valor, financiado, itbiPct, primeiroImovelSfh: primeiro });
  const t = uf === "outro" ? null : TABELAS_REGISTRO[uf];
  const desconto = primeiro && financiado > 0;
  const linhas: [string, number][] = [
    ["ITBI", c.itbi],
    [desconto ? "Cartório (−50%)" : "Cartório", c.registro],
    ["Avaliação do banco", c.avaliacao],
  ];
  return (
    <Card variant="strong" className="grid gap-5 md:grid-cols-[1fr_1fr]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="custos-uf" className="text-[15px] font-semibold">
            Estado do imóvel
          </label>
          <select
            id="custos-uf"
            value={uf}
            onChange={(e) => setUf(e.target.value as Uf | "outro")}
            className="h-12 rounded-xl border-[1.5px] border-ink bg-surface px-4 text-[17px]"
          >
            <option value="SP">São Paulo</option>
            <option value="GO">Goiás</option>
            <option value="outro">Outro estado (estimativa)</option>
          </select>
        </div>
        <CampoDinheiro id="custos-valor" rotulo="Valor do imóvel" valor={valor} onChange={setValor} />
        <CampoDinheiro id="custos-financiado" rotulo="Quanto o banco vai financiar (0 se for à vista)" valor={financiado} onChange={setFinanciado} />
        <div className="flex flex-col gap-2">
          <label htmlFor="custos-itbi" className="text-[15px] font-semibold">
            ITBI da sua cidade (%)
          </label>
          <input
            id="custos-itbi"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={itbiPct}
            onChange={(e) => setItbiPct(Number(e.target.value) || 0)}
            className="w-32 rounded-xl border-[1.5px] border-ink bg-surface px-4 py-3 font-display text-2xl"
          />
        </div>
        <label className="flex items-start gap-3 text-[15px]">
          <input type="checkbox" checked={primeiro} onChange={(e) => setPrimeiro(e.target.checked)} className="mt-1 size-5 accent-ink" />
          É o meu primeiro imóvel residencial e vou financiar pelo SFH
        </label>
      </div>
      <div className="flex flex-col justify-center gap-3 rounded-xl bg-mark p-5">
        <span className="text-sm">Separe, além da entrada</span>
        <b className="font-display text-5xl leading-none tabular-nums">{brl(c.total)}</b>
        <span className="text-sm">{c.pct.toFixed(1).replace(".", ",")}% do valor do imóvel</span>
        <dl className="flex flex-col gap-1 border-t border-ink/20 pt-3 text-[15px]">
          {linhas.map(([rotulo, v]) => (
            <div key={rotulo} className="flex justify-between gap-3">
              <dt>{rotulo}</dt>
              <dd className="font-semibold tabular-nums">{brl(v)}</dd>
            </div>
          ))}
        </dl>
        <span className="text-sm">
          {t ? `Tabela de ${t.estado} 2026, com taxas.` : "Cartório estimado: confira no da sua cidade."}
          {desconto && ` Sem o desconto, ${brl(c.registroSemDesconto)}: peça no cartório.`}
        </span>
      </div>
    </Card>
  );
}
