"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import {
  PERFIL_EXEMPLO,
  PERFIL_VAZIO,
  type Perfil,
} from "@/lib/financiamento/engine";
import { BotaoOpcao, CampoDinheiro, LinhaComAcao } from "./campos";
import { fecharResposta, PERGUNTAS, respondida, type Pergunta } from "./perguntas";
import { Resultado } from "./Resultado";
import { evento } from "@/lib/evento";

type Tela = "inicio" | "pergunta" | "resultado";

/** `titulo`: o H1 da página (com a palavra-chave), discreto em cima da manchete. */
export function Simulador({ titulo }: { titulo?: string }) {
  const [tela, setTela] = useState<Tela>("inicio");
  const [perfil, setPerfil] = useState<Perfil>(PERFIL_VAZIO);
  const [passo, setPasso] = useState(0);
  const [exemplo, setExemplo] = useState(false);

  const visiveis = PERGUNTAS;
  const atual = visiveis[passo];

  const irPara = (t: Tela) => {
    setTela(t);
    window.scrollTo({ top: 0 });
  };

  // Recebe o perfil já atualizado quando quem chama acabou de mudar a resposta (clique numa opção).
  const avancar = (p: Perfil = perfil) => {
    const lista = PERGUNTAS;
    const q = lista[passo];
    if (!q || !respondida(q, p)) return;
    setPerfil(fecharResposta(q, p));
    evento("sim_pergunta", { passo: passo + 1, pergunta: q.chave });
    if (passo >= lista.length - 1) {
      evento("sim_resultado", { origem: "perguntas" });
      irPara("resultado");
    } else {
      setPasso(passo + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const mudar = (patch: Partial<Perfil>) =>
    setPerfil((p) => ({ ...p, ...patch }));

  if (tela === "inicio") {
    return (
      <section className="mx-auto flex max-w-3xl flex-col gap-7 px-4 py-14 sm:px-6 sm:py-20">
        {titulo ? (
          <h1 className="font-mono text-xs uppercase tracking-[0.07em] text-ink-2">
            {titulo}
          </h1>
        ) : (
          <Eyebrow>Primeiro imóvel · financiamento</Eyebrow>
        )}
        <p className="font-display text-[clamp(36px,6vw,60px)] font-light leading-[1.02]">
          Descubra quanto você pode comprar,{" "}
          <span className="marca-texto font-semibold">
            em palavras que dá pra entender.
          </span>
        </p>
        <p className="max-w-xl text-lg text-ink-2">
          4 perguntas rápidas e você já vê o número, o que ele significa e o
          seu próximo passo. Depois, se quiser, completa o resto ali mesmo.
        </p>
        <ul className="flex flex-wrap gap-2 font-mono text-[13px]">
          {["1 minuto", "Sem cadastro", "“Não sei” vale como resposta"].map(
            (t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-surface px-3 py-1.5"
              >
                {t}
              </li>
            ),
          )}
        </ul>
        <div className="flex flex-wrap items-center gap-5">
          <Button
            size="lg"
            onClick={() => {
              setPerfil(PERFIL_VAZIO);
              setExemplo(false);
              setPasso(0);
              evento("sim_inicio");
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
              evento("sim_resultado", { origem: "exemplo" });
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
        mudar={(patch) => {
          // Mexeu no exemplo: a partir daí os números são os da pessoa.
          setExemplo(false);
          mudar(patch);
        }}
        onRefazer={() => {
          evento("sim_refazer");
          setPasso(0);
          setExemplo(false);
          if (exemplo) setPerfil(PERFIL_VAZIO);
          irPara("pergunta");
        }}
      />
    );
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => (passo === 0 ? irPara("inicio") : setPasso(passo - 1))}
          className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-[15px] font-semibold hover:bg-ink/5"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {passo === 0 ? "Início" : "Voltar"}
        </button>
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={visiveis.length}
          aria-valuenow={passo + 1}
          aria-label="Progresso"
        >
          <div
            className="h-full rounded-full bg-ink transition-[width]"
            style={{ width: `${(passo / visiveis.length) * 100}%` }}
          />
        </div>
        <span className="font-mono text-[13px] text-muted">
          {passo + 1} de {visiveis.length}
        </span>
      </div>

      <h1 className="font-display text-[clamp(28px,4.4vw,40px)] font-normal leading-[1.1]">
        {atual.pergunta(perfil)}
      </h1>
      <p className="text-[17px] text-ink-2 [&_b]:font-semibold [&_b]:text-ink">
        {atual.ajuda(perfil)}
      </p>

      {/* Pergunta de um campo só: o "Continuar" vai colado nele, na mesma linha. Nas outras, logo abaixo, à esquerda. */}
      {(() => {
        const continuar = (
          <Button
            size="lg"
            onClick={() => avancar()}
            disabled={!respondida(atual, perfil)}
          >
            {passo === visiveis.length - 1 ? "Ver meu resultado" : "Continuar"}
          </Button>
        );
        const umCampo = atual.tipo === "idade" || atual.tipo === "dinheiro";
        return (
          <>
            <CorpoPergunta
              q={atual}
              perfil={perfil}
              mudar={mudar}
              avancar={avancar}
              acao={umCampo ? continuar : undefined}
            />
            {!umCampo && <div className="mt-1">{continuar}</div>}
          </>
        );
      })()}
    </section>
  );
}

function CorpoPergunta({
  q,
  perfil,
  mudar,
  avancar,
  acao,
}: {
  q: Pergunta;
  perfil: Perfil;
  mudar: (p: Partial<Perfil>) => void;
  avancar: (p?: Perfil) => void;
  acao?: ReactNode;
}) {
  if (q.tipo === "escolha") {
    const escolhido = perfil[q.campo] as string | null;
    return (
      <div className="flex flex-col gap-5">
        <div
          role="group"
          aria-label={q.pergunta(perfil)}
          className="grid gap-2.5 sm:grid-cols-2"
        >
          {q.opcoes.map((o) => (
            <BotaoOpcao
              key={o.valor}
              rotulo={o.rotulo}
              sub={o.sub}
              selecionado={escolhido === o.valor}
              onClick={() => {
                const novo = { ...perfil, [q.campo]: o.valor } as Perfil;
                mudar({ [q.campo]: o.valor } as Partial<Perfil>);
                setTimeout(() => avancar(novo), 160);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (q.tipo === "idade") {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor="campo-idade" className="text-[15px] font-semibold">
          {q.rotulo}
        </label>
        <LinhaComAcao acao={acao}>
          <input
            id="campo-idade"
            type="number"
            inputMode="numeric"
            min={18}
            max={80}
            autoFocus
            value={perfil.idade ?? ""}
            onChange={(e) =>
              mudar({ idade: e.target.value ? Number(e.target.value) : null })
            }
            onKeyDown={(e) => e.key === "Enter" && avancar()}
            className="w-32 min-w-0 rounded-xl border-[1.5px] border-ink bg-surface px-4 py-3 font-display text-2xl"
          />
        </LinhaComAcao>
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
        acao={acao}
      />
    );
  }
  // "guardado": dinheiro guardado e FGTS na mesma tela; zero vale.
  return <CorpoGuardado perfil={perfil} mudar={mudar} avancar={avancar} />;
}

function CorpoGuardado({ perfil, mudar, avancar }: { perfil: Perfil; mudar: (p: Partial<Perfil>) => void; avancar: () => void }) {
  const naoSei = perfil.fgtsOpt === "naosei";
  return (
    <div className="flex flex-col gap-6">
      <CampoDinheiro
        id="campo-reserva"
        rotulo="Dinheiro guardado"
        ajuda="Poupança e investimentos que você usaria na entrada. Deixe em branco se for zero."
        valor={perfil.reserva}
        onChange={(v) => mudar({ reserva: v })}
        onEnter={() => avancar()}
        autoFocus
      />
      <div className="flex flex-col gap-2">
        <CampoDinheiro
          id="campo-fgts"
          rotulo="Saldo do FGTS"
          ajuda="Aparece no app FGTS. Deixe em branco se não tiver."
          valor={perfil.fgts}
          onChange={(v) => mudar({ fgts: v, fgtsOpt: v > 0 ? "sim" : null })}
          onEnter={() => avancar()}
        />
        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[15px]">
          <input
            type="checkbox"
            checked={naoSei}
            onChange={(e) => mudar({ fgtsOpt: e.target.checked ? "naosei" : null, fgts: 0 })}
            className="size-5 accent-[var(--ink)]"
          />
          Tenho FGTS, mas não sei o saldo
        </label>
      </div>
      {(perfil.fgts > 0 || naoSei) && (
        <div role="group" aria-labelledby="fgts3-rotulo" className="flex flex-col gap-2">
          <span id="fgts3-rotulo" className="text-[15px] font-semibold">
            Somando todos os empregos, tem 3 anos ou mais de carteira assinada?
          </span>
          <span className="-mt-1 text-sm text-ink-2">É a regra pra usar o FGTS na compra.</span>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["sim", "Sim"],
                ["nao", "Não"],
                ["naosei", "Não sei"],
              ] as const
            ).map(([v, t]) => (
              <BotaoOpcao key={v} rotulo={t} selecionado={perfil.fgts3 === v} onClick={() => mudar({ fgts3: v })} className="min-h-11 py-2" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
