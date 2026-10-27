"use client";

import { useState } from "react";
import { BotaoOpcao, CampoDinheiro, Deslizador } from "@/components/simulador/campos";
import { brl } from "@/lib/format";

/** Exemplos interativos dos campos do simulador, para o guia da marca. */
export function DemosCampos() {
  const [opcao, setOpcao] = useState("sim");
  const [valor, setValor] = useState(6000);
  const [aval, setAval] = useState(125);
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="flex flex-col gap-2">
        <BotaoOpcao rotulo="Sim, sei o saldo" selecionado={opcao === "sim"} onClick={() => setOpcao("sim")} />
        <BotaoOpcao rotulo="Não sei" sub="Tudo bem, vira uma tarefa no seu plano" selecionado={opcao === "naosei"} onClick={() => setOpcao("naosei")} />
      </div>
      <CampoDinheiro id="demo-dinheiro" rotulo="Renda por mês" valor={valor} onChange={setValor} />
      <Deslizador id="demo-aval" rotulo="O banco avaliou em" saida={brl(1000 * aval)} min={80} max={150} step={1} valor={aval} onChange={setAval} humor={aval >= 125 ? "feliz" : aval < 100 ? "triste" : "gentil"} />
    </div>
  );
}
