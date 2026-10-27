"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { PERFIL_EXEMPLO, PERFIL_VAZIO, type Perfil } from "@/lib/financiamento/engine";
import { BotaoOpcao, CampoDinheiro } from "./campos";
import { perguntasVisiveis, respondida, type Pergunta } from "./perguntas";
import { Resultado } from "./Resultado";

type Tela = "inicio" | "pergunta" | "resultado";

export function Simulador() {
  const [tela, setTela] = useState<Tela>("inicio");
  const [perfil, setPerfil] = useState<Perfil>(PERFIL_VAZIO);
  const [passo, setPasso] = useState(0);
  const [exemplo, setExemplo] = useState(false);

  const visiveis = perguntasVisiveis(perfil);
  const atual = visiveis[passo];

  const irPara = (t: Tela) => {
    setTela(t);
    window.scrollTo({ top: 0 });
  };

  // A resposta pode abrir ou fechar perguntas (ex.: "Já achei" abre a do imóvel),
  // então o "próximo" é calculado com o perfil já atualizado.
  const avancar = (p: Perfil = perfil) => {
    const lista = perguntasVisiveis(p);
    const q = lista[passo];
    if (!q || !respondida(q, p)) return;
    if (passo >= lista.length - 1) irPara("resultado");
    else {
      setPasso(passo + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const mudar = (patch: Partial<Perfil>) => setPerfil((p) => ({ ...p, ...patch }));

  if (tela === "inicio") {
    return (
      <section className="mx-auto flex max-w-3xl flex-col gap-7 px-4 py-14 sm:px-6 sm:py-20">
        <Eyebrow>Primeiro imóvel · financiamento</Eyebrow>
        <h1 className="font-display text-[clamp(36px,6vw,60px)] font-light leading-[1.02]">
          Descubra quanto você pode comprar, <span className="marca-texto font-semibold">em palavras que dá pra entender.</span>
        </h1>
        <p className="max-w-xl text-lg text-ink-2">
          Umas 10 perguntas simples. No fim você recebe um número, o que ele significa e o seu próximo passo.
        </p>
        <ul className="flex flex-wrap gap-2 font-mono text-[13px]">
          {["2 minutos", "Sem cadastro", "“Não sei” vale como resposta"].map((t) => (
            <li key={t} className="rounded-full border border-line bg-surface px-3 py-1.5">
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-5">
          <Button
            size="lg"
            onClick={() => {
              setPerfil(PERFIL_VAZIO);
              setExemplo(false);
              setPasso(0);
              irPara("pergunta");
            }}
          >
            Começar
          </Button>
          <Button
            variant="link"
            onClick={() => {
              setPerfil(PERFIL_EXEMPLO);
              setExemplo(true);
              irPara("resultado");
            }}
          >
            Ver um resultado de exemplo
          </Button>
        </div>
        <JoaoDeBarro pose="barro" className="mt-4 w-40 self-end" />
      </section>
    );
  }

  if (tela === "resultado") {
    return (
      <Resultado
        perfil={perfil}
        exemplo={exemplo}
        onRefazer={() => {
          setPasso(0);
          setExemplo(false);
          if (exemplo) setPerfil(PERFIL_VAZIO);
          irPara("pergunta");
        }}
        onInformarPreco={() => {
          setPasso(perguntasVisiveis(perfil).findIndex((q) => q.chave === "imovelDados"));
          irPara("pergunta");
        }}
      />
    );
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={1} aria-valuemax={visiveis.length} aria-valuenow={passo + 1} aria-label="Progresso">
          <div className="h-full rounded-full bg-ink transition-[width]" style={{ width: `${(passo / visiveis.length) * 100}%` }} />
        </div>
        <span className="font-mono text-[13px] text-muted">
          {passo + 1} de {visiveis.length}
        </span>
      </div>

      <h1 className="font-display text-[clamp(28px,4.4vw,40px)] font-normal leading-[1.1]">{atual.pergunta(perfil)}</h1>
      <p className="text-[17px] text-ink-2 [&_b]:font-semibold [&_b]:text-ink">{atual.ajuda(perfil)}</p>

      <CorpoPergunta q={atual} perfil={perfil} mudar={mudar} avancar={avancar} />

      <div className="mt-2 flex items-center justify-between gap-4">
        <Button variant="link" onClick={() => (passo === 0 ? irPara("inicio") : setPasso(passo - 1))}>
          {passo === 0 ? "Voltar ao início" : "Voltar"}
        </Button>
        <Button onClick={() => avancar()} disabled={!respondida(atual, perfil)}>
          {passo === visiveis.length - 1 ? "Ver meu resultado" : "Continuar"}
        </Button>
      </div>
    </section>
  );
}

function CorpoPergunta({
  q,
  perfil,
  mudar,
  avancar,
}: {
  q: Pergunta;
  perfil: Perfil;
  mudar: (p: Partial<Perfil>) => void;
  avancar: (p?: Perfil) => void;
}) {
  if (q.tipo === "escolha") {
    const escolhido = perfil[q.campo] as string | null;
    return (
      <div className="flex flex-col gap-5">
        <div role="group" aria-label={q.pergunta(perfil)} className="grid gap-2.5 sm:grid-cols-2">
          {q.opcoes.map((o) => (
            <BotaoOpcao
              key={o.valor}
              rotulo={o.rotulo}
              sub={o.sub}
              selecionado={escolhido === o.valor}
              onClick={() => {
                const novo = { ...perfil, [q.campo]: o.valor } as Perfil;
                mudar({ [q.campo]: o.valor } as Partial<Perfil>);
                if (!(q.valor && o.valor === q.valor.abreCom)) setTimeout(() => avancar(novo), 160);
              }}
            />
          ))}
        </div>
        {q.valor && escolhido === q.valor.abreCom && (
          <CampoDinheiro
            id={`campo-${q.chave}`}
            rotulo={q.valor.rotulo}
            valor={perfil[q.valor.campo] as number}
            onChange={(v) => mudar({ [q.valor!.campo]: v } as Partial<Perfil>)}
            onEnter={() => avancar()}
            autoFocus
          />
        )}
      </div>
    );
  }
  if (q.tipo === "idade") {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor="campo-idade" className="text-[15px] font-semibold">
          {q.rotulo}
        </label>
        <input
          id="campo-idade"
          type="number"
          inputMode="numeric"
          min={18}
          max={80}
          autoFocus
          value={perfil.idade ?? ""}
          onChange={(e) => mudar({ idade: e.target.value ? Number(e.target.value) : null })}
          onKeyDown={(e) => e.key === "Enter" && avancar()}
          className="w-40 rounded-xl border-[1.5px] border-ink bg-surface px-4 py-3 font-display text-2xl"
        />
      </div>
    );
  }
  if (q.tipo === "dinheiro") {
    return (
      <CampoDinheiro
        id={`campo-${q.chave}`}
        rotulo={q.rotulo}
        valor={perfil[q.campo] as number}
        onChange={(v) => mudar({ [q.campo]: v } as Partial<Perfil>)}
        onEnter={() => avancar()}
        autoFocus
      />
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <CampoDinheiro id="campo-preco" rotulo="Preço pedido pelo vendedor" valor={perfil.valor} onChange={(v) => mudar({ valor: v })} onEnter={() => avancar()} autoFocus />
      <div className="flex flex-col gap-2">
        <span className="text-[15px] font-semibold">Ele é</span>
        <div role="group" aria-label="Tipo do imóvel" className="flex gap-2.5">
          {(["usado", "novo"] as const).map((t) => (
            <BotaoOpcao key={t} rotulo={t === "usado" ? "Usado" : "Novo"} selecionado={perfil.tipo === t} onClick={() => mudar({ tipo: t })} className="min-w-28" />
          ))}
        </div>
      </div>
      <label className="flex items-center gap-3 text-[15px]">
        <input type="checkbox" checked={perfil.avaliou} onChange={(e) => mudar({ avaliou: e.target.checked })} className="size-5 accent-ink" />
        O banco já avaliou esse imóvel
      </label>
      {perfil.avaliou && (
        <CampoDinheiro id="campo-laudo" rotulo="Valor da avaliação (está no laudo)" valor={perfil.avalReal} onChange={(v) => mudar({ avalReal: v })} onEnter={() => avancar()} autoFocus />
      )}
    </div>
  );
}
