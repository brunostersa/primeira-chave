"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CampoDinheiro } from "@/components/simulador/campos";
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

/**
 * Estimativa do imposto sobre ganho de capital na venda (pessoa física, 15% até R$ 5 mi).
 * Simplificada de propósito: não aplica os fatores de redução por tempo de posse.
 */
export function CalculadoraGanhoCapital() {
  const [compra, setCompra] = useState(180_000);
  const [reforma, setReforma] = useState(30_000);
  const [venda, setVenda] = useState(280_000);
  const [unico, setUnico] = useState(false);
  const [recompra, setRecompra] = useState(false);
  const ganho = Math.max(0, venda - compra - reforma);
  const isento = (unico && venda <= 440_000) || recompra;
  const imposto = isento ? 0 : ganho * 0.15;
  return (
    <Card variant="strong" className="grid gap-5 md:grid-cols-[1fr_1fr]">
      <div className="flex flex-col gap-4">
        <CampoDinheiro id="gc-compra" rotulo="Quanto você pagou (escritura)" valor={compra} onChange={setCompra} />
        <CampoDinheiro id="gc-reforma" rotulo="Reformas com nota fiscal" valor={reforma} onChange={setReforma} />
        <CampoDinheiro id="gc-venda" rotulo="Por quanto vai vender" valor={venda} onChange={setVenda} />
        <label className="flex items-start gap-3 text-[15px]">
          <input type="checkbox" checked={unico} onChange={(e) => setUnico(e.target.checked)} className="mt-1 size-5 accent-ink" />
          É meu único imóvel e não vendi outro nos últimos 5 anos
        </label>
        <label className="flex items-start gap-3 text-[15px]">
          <input type="checkbox" checked={recompra} onChange={(e) => setRecompra(e.target.checked)} className="mt-1 size-5 accent-ink" />
          Vou comprar outro imóvel residencial em até 180 dias com o dinheiro
        </label>
      </div>
      <div className="flex flex-col justify-center gap-2 rounded-xl bg-mark p-5">
        <span className="text-sm">Ganho de capital</span>
        <b className="font-display text-3xl tabular-nums">{brl(ganho)}</b>
        <span className="text-sm">Imposto estimado (15%)</span>
        <b className="font-display text-5xl leading-none tabular-nums">{isento ? "Isento" : brl(imposto)}</b>
        <span className="text-sm">Estimativa simplificada, sem os redutores por tempo de posse. Confirme com um contador antes de vender.</span>
      </div>
    </Card>
  );
}
